<template>
  <div>
    <Navbar />

    <section class="relative w-full py-20 sm:py-24">
      <!-- Subtle background gradient -->
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-10 dark:bg-gradient-to-tl dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 bg-gradient-to-tl from-pink-100/60 via-purple-100/60 to-blue-100/60"
      />

      <div class="container mx-auto px-6 max-w-4xl">
        <!-- Titel -->
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Last updated: {{ lastUpdated }}
        </p>

        <!-- Content -->
        <div class="prose prose-lg prose-neutral dark:prose-invert mt-10 max-w-none">
          <p>
            Captura AI lets you choose a style, upload an image, and generate an AI-assisted description and an AI image.
            We designed this app to minimize the data we process and retain.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">What we process</h2>
          <ul class="mt-6 space-y-4">
            <li><strong>Uploaded images</strong>: You upload one image per request. We temporarily send it to ImageKit to obtain a URL and process it. The file is deleted from ImageKit once processing is complete.</li>
            <li><strong>Image analysis</strong>: We send the ImageKit URL to OpenAI to generate a textual description (and, if enabled, an AI image based on that description).</li>
            <li><strong>Rate limit metadata</strong>: We store a counter keyed by your IP address in Upstash Redis to protect the service from abuse. This stores only a numeric counter and a short-lived expiry.</li>
            <li><strong>Basic logs</strong>: Server-side error logs may include timestamps and technical details for debugging. We avoid logging your images or descriptions unless necessary to investigate an incident.</li>
          </ul>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Why we process it</h2>
          <p class="mt-6">
            We process your image solely to generate the requested description and  AI image. Rate limiting metadata prevents abuse and keeps the service stable and affordable.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Third parties we use</h2>
          <ul class="mt-6 space-y-4">
            <li><strong>ImageKit</strong> (file handling): Receives your uploaded image to generate a URL for processing. We delete the file from ImageKit after processing is done.</li>
            <li><strong>OpenAI</strong> (AI generation): Receives the image URL and prompt text to generate the description and, if enabled, an AI image.</li>
            <li><strong>Upstash Redis</strong> (rate limiting): Stores a short-lived counter keyed by IP to enforce fair use.</li>
          </ul>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Data retention</h2>
          <ul class="mt-6 space-y-4">
            <li><strong>Uploaded images</strong>: Deleted from ImageKit after processing.</li>
            <li><strong>Generated outputs</strong>: Returned to your browser and not stored server-side by default.</li>
            <li><strong>Rate limit counters</strong>: Automatically expire after a short time window.</li>
            <li><strong>Logs</strong>: Minimal and short-lived; used only to maintain and secure the service.</li>
          </ul>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Cookies and local storage</h2>
          <p class="mt-6">
            The app aims to use minimal client-side storage. Temporary UI preferences or onboarding overlays may use local storage in your browser. We do not set advertising cookies.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Security</h2>
          <p class="mt-6">
            We use reputable infrastructure and follow least-retention principles. However, no method of transmission or storage is 100% secure. Please avoid uploading sensitive or unlawful content.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Your rights</h2>
          <p class="mt-6">
            Depending on your jurisdiction, you may have rights to access, correct, or delete personal data. Because we retain very little, requests usually concern logs or rate-limit metadata. Contact us and we will assist where feasible and legally required.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Children</h2>
          <p class="mt-6">
            The service is not intended for children under 13 (or the minimum age in your jurisdiction). Do not upload images of children without appropriate consent.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">International transfers</h2>
          <p class="mt-6">
            OpenAI, ImageKit, and Upstash may process data in multiple regions. By using the service, you consent to necessary international data transfers for processing your request.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Changes to this policy</h2>
          <p class="mt-6">
            We may update this policy to reflect changes in our service or legal requirements. We will update the “Last updated” date above and encourage you to review it periodically.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">Contact</h2>
          <p class="mt-6">
            For privacy questions, please reach out via the contact link in the footer. If you prefer email, you can use: <a href="mailto:pfrommer1982@gmail.com">pfrommer1982@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const lastUpdated = computed(() => new Date().toISOString().slice(0, 10))

</script>
