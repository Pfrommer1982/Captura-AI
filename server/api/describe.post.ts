import { defineEventHandler, readMultipartFormData, H3Event, getRequestHeader } from "h3";
import ImageKit from "imagekit";
import OpenAI from "openai";
import fs from "fs";
import { Redis } from "@upstash/redis";
import path from "path";
import os from "os";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ?? "",
});
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" });

// Redis-based rate limiter
const IS_DEV = process.env.NODE_ENV !== 'production';
const RATE_LIMIT_MAX = 5; // max requests per IP
const RATE_LIMIT_WINDOW_SEC = 60 * 60; // 1 hour window for all environments

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

function getClientIp(event: H3Event) {
  const xff = getRequestHeader(event, 'x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (event.node.req.socket.remoteAddress || 'unknown').replace('::ffff:', '');
}

async function checkRateLimitRedis(event: H3Event) {
  try {
    const ip = getClientIp(event);
    const key = `rl:desc:${ip}`;
    // increment and set expiry atomically (Upstash supports EX with first set)
    // We emulate token bucket: allow RATE_LIMIT_MAX within window
    const current = await redis.incr(key);
    if (current === 1) {
      // first hit: set TTL
      await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
    }
    const ttl = await redis.ttl(key);
    const remaining = Math.max(0, RATE_LIMIT_MAX - current);
    return { limited: current > RATE_LIMIT_MAX, remaining, reset: Date.now() + Math.max(ttl, 0) * 1000 };
  } catch (e) {
    console.error('Rate limiter error:', e);
    // Fail-open: allow request if limiter backend fails
    return { limited: false, remaining: RATE_LIMIT_MAX, reset: Date.now() + RATE_LIMIT_WINDOW_SEC * 1000 };
  }
}

const BUDGET_FILE = path.join(process.env.TMPDIR || os.tmpdir(), ".monthlyBudget.json");
const MAX_MONTHLY_SPEND = 1.9;
const ESTIMATED_COST_PER_TEXT = 0.00008;
const ESTIMATED_COST_PER_IMAGE = 0.02;
const MAX_TOKENS_PER_IMAGE = 150;

// Abuse protection: file and payload limits
const MAX_FILES_PER_REQUEST = 1;
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

// Feature flag: enable image generation (defaults to true in dev unless explicitly disabled)
const ENABLE_IMAGE_GENERATION = (
  process.env.ENABLE_IMAGE_GENERATION ?? (IS_DEV ? 'true' : 'false')
) === 'true';

interface BudgetData {
  spend: number;
  month: number;
}
interface FileResult {
  name: string;
  description: string;
  generatedImage?: string;
}

function loadBudget(): BudgetData {
  try {
    if (!fs.existsSync(BUDGET_FILE))
      return { spend: 0, month: new Date().getMonth() };
    const data: BudgetData = JSON.parse(fs.readFileSync(BUDGET_FILE, "utf-8"));
    const currentMonth = new Date().getMonth();
    return data.month !== currentMonth ? { spend: 0, month: currentMonth } : data;
  } catch {
    // Fail-open for serverless environments
    return { spend: 0, month: new Date().getMonth() };
  }
}
function saveBudget(data: BudgetData) {
  try {
    fs.writeFileSync(BUDGET_FILE, JSON.stringify(data));
  } catch (e: any) {
    console.warn("Budget save skipped:", e?.message);
  }
}
function getFieldValue(files: any[], name: string): string | null {
  const field = files.find((f) => f.name === name);
  return field?.data ? field.data.toString("utf-8").trim() : null;
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    // Basic method check (allow OPTIONS for CORS preflight)
    const method = event.node.req.method?.toUpperCase();
    if (method === 'OPTIONS') {
      // will be handled in CORS block below
    } else if (method !== 'POST') {
      event.node.res.statusCode = 405;
      return { error: 'Method Not Allowed' };
    }

    // CORS: allow same-origin automatically + env-configured origins
    const origin = getRequestHeader(event, 'origin') || '';
    const host = getRequestHeader(event, 'host') || '';
    const envOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const allowedOrigins = envOrigins.length ? envOrigins : [
      'http://localhost:3000',
      'http://127.0.0.1:3000'
    ];
    const sameOrigin = (() => {
      try { return origin && new URL(origin).host === host; } catch { return false; }
    })();

    if (origin && (sameOrigin || allowedOrigins.includes(origin))) {
      event.node.res.setHeader('Access-Control-Allow-Origin', origin);
      event.node.res.setHeader('Vary', 'Origin');
      event.node.res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      event.node.res.setHeader('Access-Control-Allow-Credentials', 'true');
      if (method === 'OPTIONS') {
        event.node.res.statusCode = 204;
        return '';
      }
    } else if (origin) {
      return { error: 'Origin not allowed' };
    } else if (!IS_DEV) {
      // In production: reject requests without Origin header (helps prevent abuse)
      return { error: 'Origin header required' };
    }

    // Security headers (API-only)
    event.node.res.setHeader('X-Content-Type-Options', 'nosniff');
    event.node.res.setHeader('X-Frame-Options', 'DENY');
    event.node.res.setHeader('Referrer-Policy', 'no-referrer');
    event.node.res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    event.node.res.setHeader('Cache-Control', 'no-store');

    // Validate critical env vars
    const missingEnv: string[] = [];
    if (!process.env.OPENAI_API_KEY) missingEnv.push('OPENAI_API_KEY');
    if (!process.env.IMAGEKIT_PUBLIC_KEY) missingEnv.push('IMAGEKIT_PUBLIC_KEY');
    if (!process.env.IMAGEKIT_PRIVATE_KEY) missingEnv.push('IMAGEKIT_PRIVATE_KEY');
    if (!process.env.IMAGEKIT_URL_ENDPOINT) missingEnv.push('IMAGEKIT_URL_ENDPOINT');
    if (!process.env.UPSTASH_REDIS_REST_URL) missingEnv.push('UPSTASH_REDIS_REST_URL');
    if (!process.env.UPSTASH_REDIS_REST_TOKEN) missingEnv.push('UPSTASH_REDIS_REST_TOKEN');
    if (missingEnv.length) {
      event.node.res.statusCode = 500;
      return { error: `Server misconfigured. Missing env: ${missingEnv.join(', ')}` };
    }

    // Rate-limit check BEFORE any heavy work (Redis)
    const rl = await checkRateLimitRedis(event);
    if (rl.limited) {
      event.node.res.statusCode = 429;
      return {
        error: "Rate limit exceeded. Please try again later.",
        rateLimit: { remaining: rl.remaining, reset: rl.reset, max: RATE_LIMIT_MAX }
      };
    }

    const formFields = await readMultipartFormData(event);
    if (!formFields?.length) return { error: "No files received", rateLimit: { remaining: rl.remaining, reset: rl.reset, max: RATE_LIMIT_MAX } };

    // Honeypot check: reject if bot filled hidden field
    const honeypot = getFieldValue(formFields as any, 'website');
    if (honeypot) {
      event.node.res.statusCode = 400;
      return { error: 'Bad request' };
    }

    const selectedStyle = getFieldValue(formFields, "style") ?? "commercial";
    const selectedLanguage = getFieldValue(formFields, "language") ?? "en";

    // Extract and validate files
    const files = formFields.filter((f) => f.name === "file" && f.data && f.filename);
    if (!files.length) return { error: "No image files received" };
    if (files.length > MAX_FILES_PER_REQUEST) return { error: `Too many files. Max ${MAX_FILES_PER_REQUEST}.` };

    // Validate file type and size
    for (const f of files) {
      const mime = (f as any).type || (f as any).mimetype || '';
      if (mime && !ALLOWED_MIME.has(mime)) {
        return { error: `Unsupported file type: ${mime}` };
      }
      if ((f.data as Buffer).length > MAX_FILE_BYTES) {
        return { error: `File too large. Max ${(MAX_FILE_BYTES / (1024*1024)).toFixed(0)}MB` };
      }
    }

    const budget = loadBudget();
    if (budget.spend >= MAX_MONTHLY_SPEND) {
      return { error: "Monthly budget reached." };
    }

    const results: FileResult[] = [];
    for (const file of files) {
      const filename = file.filename || file.name || "upload.jpg";

      // check budget (consider feature flag for image)
      const estCost = ESTIMATED_COST_PER_TEXT + (ENABLE_IMAGE_GENERATION ? ESTIMATED_COST_PER_IMAGE : 0);
      if (budget.spend + estCost > MAX_MONTHLY_SPEND) break;

      // upload to imagekit
      let imageUrl = "";
      let fileId = "";
      try {
        const uploadResponse = await new Promise<any>((resolve, reject) => {
          imagekit.upload(
            {
              file: file.data as Buffer,
              fileName: filename,
              useUniqueFileName: true,
              folder: "/uploads",
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
        imageUrl = uploadResponse.url;
        fileId = uploadResponse.fileId ?? "";
      } catch (err: any) {
        console.error("ImageKit upload error:", err);
        results.push({ name: filename, description: "Upload failed: " + err.message });
        continue;
      }

      // style prompt for text
      let stylePrompt = "";
      switch (selectedStyle) {
        case "commercial":
          stylePrompt = `Describe the uploaded image as if it’s for a premium e-commerce product listing in ${selectedLanguage}. Be precise about brand, model, color and visible features.`;
          break;
        case "artistic":
          stylePrompt = `Describe the uploaded image in ${selectedLanguage} as if it’s an artwork — emphasize style, mood, and visual elements.`;
          break;
        case "humorous":
          stylePrompt = `Describe the uploaded image in ${selectedLanguage} in a witty, humorous tone, but still identify the actual object clearly.`;
          break;
        case "horrific":
          stylePrompt = `Describe the uploaded image in ${selectedLanguage} with a suspenseful, eerie horror tone. Use vivid, atmospheric language while accurately identifying what is in the image.`;
          break;
        case "space-ish":
          stylePrompt = `Describe the uploaded image in ${selectedLanguage} with a cosmic, sci-fi space vibe. Highlight futuristic technology, stars, nebulae, or interstellar themes if applicable.`;
          break;
        case "futuristic":
          stylePrompt = `Describe the uploaded image in ${selectedLanguage} with a futuristic, forward-looking tone. Emphasize innovation, sleek design, and advanced features.`;
          break;
        default:
          stylePrompt = `Give a concise, factual description in ${selectedLanguage} of the uploaded image.`;
      }

      // AI text description
      let description = "No description received";
      try {
        const aiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: stylePrompt },
                { type: "image_url", image_url: { url: imageUrl } },
              ],
            },
          ],
          max_tokens: MAX_TOKENS_PER_IMAGE,
        });
        description = aiResponse.choices[0].message?.content ?? description;
      } catch (err: any) {
        console.error("OpenAI text error:", err);
        description = "AI text generation failed: " + err.message;
      }

      // Image generation controlled by top-level feature flag ENABLE_IMAGE_GENERATION

      let generatedImage: string | undefined;
      if (ENABLE_IMAGE_GENERATION) {
        try {
          const tmpFilePath = path.join(os.tmpdir(), filename);
          fs.writeFileSync(tmpFilePath, file.data);

          const imgResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate an image of ${description} in ${selectedStyle} style.`,
            size: "1024x1024",
            n: 1,
            response_format: "b64_json"
          });
          const imageDatum = imgResponse.data?.[0];
          generatedImage = imageDatum?.b64_json
            ? `data:image/png;base64,${imageDatum.b64_json}`
            : (imageDatum?.url ?? undefined);

          fs.unlinkSync(tmpFilePath);
        } catch (err: any) {
          console.error("OpenAI image error:", err);
          generatedImage = undefined;
        }
      }

      results.push({ name: filename, description, generatedImage });

      // delete from imagekit
      if (fileId) {
        try {
          await imagekit.deleteFile(fileId);
        } catch (err) {
          console.error("Delete error:", err);
        }
      }

      // update budget (charge only what you enabled)
      budget.spend += ENABLE_IMAGE_GENERATION ? (ESTIMATED_COST_PER_TEXT + ESTIMATED_COST_PER_IMAGE) : ESTIMATED_COST_PER_TEXT;
    }

    saveBudget(budget);
    return {
      files: results,
      budget: { spent: budget.spend, max: MAX_MONTHLY_SPEND },
      selectedStyle,
      selectedLanguage,
    };
  } catch (err: any) {
    console.error("API handler error:", err);
    return { error: err?.message ?? "Unknown server error" };
  }
});


