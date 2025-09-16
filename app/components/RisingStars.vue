<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full z-0"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D

// Star with parallax layers, drift, twinkle and glow
interface Star {
  x: number
  y: number
  z: number
  size: number
  baseSize: number
  speedY: number
  driftX: number
  phase: number
  glow: number
  lastTwinkleTime: number
  twinkleValue: number
}

let stars: Star[] = []
let animationId: number
let dpr = 1
let t = 0
let lastTime = 0

// Performance optimization vars
let frameCount = 0
let skipFrames = 0
const TARGET_FPS = 60
const MIN_FRAME_TIME = 1000 / TARGET_FPS

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function initStars(total = 300) { // Reduced from 450-480
  if (!canvas.value) return
  const width = canvas.value.width / dpr
  const height = canvas.value.height / dpr

  const nearCount = Math.round(total * 0.2) // Reduced near stars
  const midCount = Math.round(total * 0.35)
  const farCount = total - nearCount - midCount

  const makeStar = (z: number): Star => {
    const base = rand(0.8, 1.8)
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      z,
      size: base,
      baseSize: base,
      speedY: rand(0.1, 0.4) / z, // Slightly slower
      driftX: rand(-0.1, 0.1) / z,
      phase: Math.random() * Math.PI * 2,
      glow: z === 1 ? rand(0.3, 0.8) : z === 2 ? rand(0.2, 0.5) : rand(0.1, 0.3), // Reduced glow
      lastTwinkleTime: 0,
      twinkleValue: 0
    }
  }

  stars = [
    ...Array.from({ length: nearCount }, () => makeStar(1)),
    ...Array.from({ length: midCount }, () => makeStar(2)),
    ...Array.from({ length: farCount }, () => makeStar(3))
  ]
}

function resizeCanvas() {
  if (!canvas.value) return
  const { offsetWidth, offsetHeight } = canvas.value
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.floor(offsetWidth * dpr)
  canvas.value.height = Math.floor(offsetHeight * dpr)
  ctx = (canvas.value.getContext('2d') as CanvasRenderingContext2D)!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // Enable performance optimizations
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'low'

  initStars(280)
}

function drawStar(s: Star, currentTime: number) {
  // Only update twinkle every 100ms instead of every frame
  if (currentTime - s.lastTwinkleTime > 100) {
    s.phase += 0.02 / s.z
    s.twinkleValue = 0.4 * Math.sin(s.phase)
    s.lastTwinkleTime = currentTime
  }

  const radius = Math.max(0.2, (s.baseSize + s.twinkleValue) / s.z)

  // Reduced glow effect - only for nearest stars
  ctx.save()

  if (s.z === 1 && s.glow > 0.5) {
    ctx.shadowColor = 'rgba(255,255,255,0.6)'
    ctx.shadowBlur = Math.min(4, s.glow * 3) // Capped blur
  }

  ctx.fillStyle = `rgba(255,255,255,${Math.min(0.9, 0.7 / s.z)})`
  ctx.beginPath()
  ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

// Pre-create gradients to avoid recreation every frame
let nebulaGradients: CanvasGradient[] = []
let hazeGradient: CanvasGradient | null = null

function createGradients() {
  if (!ctx || !canvas.value) return
  const width = canvas.value.width / dpr
  const height = canvas.value.height / dpr

  // Create haze gradient once
  hazeGradient = ctx.createLinearGradient(0, height, 0, 0)
  hazeGradient.addColorStop(0, 'rgba(0,0,0,0.0)')
  hazeGradient.addColorStop(1, 'rgba(255,255,255,0.012)')
}

function animate(currentTime: number = 0) {
  if (!ctx || !canvas.value) return

  // Frame rate limiting
  if (currentTime - lastTime < MIN_FRAME_TIME) {
    animationId = requestAnimationFrame(animate)
    return
  }

  const deltaTime = currentTime - lastTime
  lastTime = currentTime
  frameCount++

  // Skip heavy operations on some frames if performance is poor
  if (frameCount % 3 === 0 && deltaTime > MIN_FRAME_TIME * 2) {
    skipFrames = Math.min(skipFrames + 1, 2)
  } else if (deltaTime < MIN_FRAME_TIME * 1.2) {
    skipFrames = Math.max(skipFrames - 1, 0)
  }

  const width = canvas.value.width / dpr
  const height = canvas.value.height / dpr

  ctx.clearRect(0, 0, width, height)

  // Only draw nebula every few frames if performance is poor
  if (skipFrames === 0 || frameCount % (skipFrames + 1) === 0) {
    t += 0.002 // Slower animation
    ctx.save()
    ctx.globalCompositeOperation = 'lighter'

    const blobs = [
      { depth: 3,   hue: [117, 48, 209], alpha: 0.035, ampX: 0.15, ampY: 0.10, speed: 0.30, radius: Math.max(width, height) * 0.45 },
      { depth: 2.5, hue: [255,105, 180], alpha: 0.030, ampX: 0.18, ampY: 0.12, speed: 0.40, radius: Math.max(width, height) * 0.38 },
      { depth: 2.0, hue: [ 64,156, 255], alpha: 0.025, ampX: 0.22, ampY: 0.15, speed: 0.50, radius: Math.max(width, height) * 0.32 }
    ]

    for (const b of blobs) {
      const cx = width  * 0.5 + Math.sin(t * b.speed)        * (width  * b.ampX) / b.depth
      const cy = height * 0.5 + Math.cos(t * (b.speed * .8)) * (height * b.ampY) / b.depth
      const r = b.radius / b.depth

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      g.addColorStop(0.00, `rgba(${b.hue[0]}, ${b.hue[1]}, ${b.hue[2]}, ${b.alpha})`)
      g.addColorStop(0.4, `rgba(${b.hue[0]}, ${b.hue[1]}, ${b.hue[2]}, ${b.alpha * 0.4})`)
      g.addColorStop(0.8, `rgba(${b.hue[0]}, ${b.hue[1]}, ${b.hue[2]}, ${b.alpha * 0.1})`)
      g.addColorStop(1.00, 'rgba(0,0,0,0)')

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.restore()

    // Apply haze less frequently
    if (hazeGradient) {
      ctx.fillStyle = hazeGradient
      ctx.fillRect(0, 0, width, height)
    }
  }

  // Update and draw stars with batching
  ctx.save()
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i] as any

    // Update position
    s.y -= s.speedY
    s.x += s.driftX

    // Wrap around
    if (s.y < -5) {
      s.y = height + 5
      s.x = Math.random() * width
    }
    if (s.x < -5) s.x = width + 5
    if (s.x > width + 5) s.x = -5

    drawStar(s, currentTime)
  }
  ctx.restore()

  animationId = requestAnimationFrame(animate)
}

let resizeTimeout: ReturnType<typeof setTimeout> | null = null
function handleResize() {
  if (resizeTimeout !== null) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    resizeCanvas()
    createGradients()
  }, 250)
}

onMounted(() => {
  if (!canvas.value) return
  resizeCanvas()
  createGradients()
  animate()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  if (resizeTimeout !== null) clearTimeout(resizeTimeout)
})
</script>

<style scoped>
canvas {
  background: transparent;
  will-change: auto; /* Remove will-change to reduce GPU memory usage */
}
</style>
