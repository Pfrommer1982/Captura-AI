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
          Terms of Service
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Last updated: {{ lastUpdated }}
        </p>

        <!-- Content -->
        <div class="prose prose-lg prose-neutral dark:prose-invert mt-10 max-w-none">
          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">1. Overview</h2>
          <p class="mt-6">
            Captura AI is a tool that generates AI-assisted image descriptions and AI images based on user uploads. By accessing or using Captura AI, you agree to these Terms of Service.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">2. Acceptable use</h2>
          <ul class="mt-6 space-y-4">
            <li>Only upload content you have the right to use and share.</li>
            <li>Do not upload unlawful, harmful, abusive, or infringing content.</li>
            <li>Do not attempt to disrupt, overload, or reverse-engineer the service.</li>
            <li>Respect rate limits and any fair-use restrictions.</li>
          </ul>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">3. AI-generated content</h2>
          <p class="mt-6">
            Results may be inaccurate or incomplete. AI output should be reviewed before use in any commercial or critical context. You are responsible for how you use the results.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">4. Ownership</h2>
          <ul class="mt-6 space-y-4">
            <li><strong>Your uploads</strong>: You retain the rights to the images you upload. You grant us a limited license to process the images for the sole purpose of providing the service.</li>
            <li><strong>Generated output</strong>: Subject to third-party terms (e.g., OpenAI image/content policies), you may use the generated text and images as permitted by law and relevant provider policies.</li>
          </ul>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">5. Privacy</h2>
          <p class="mt-6">
            Our data practices are described in the <NuxtLink to="/privacy/">Privacy Policy</NuxtLink>. By using the service, you consent to the processing described there.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">6. Third-party services</h2>
          <p class="mt-6">
            We rely on third parties such as OpenAI (for AI generation), ImageKit (for file handling), and Upstash (for rate limiting). Their terms and policies may apply to your use of the service.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">7. Disclaimers</h2>
          <p class="mt-6">
            The service is provided “as is,” without warranties of any kind. We do not guarantee accuracy, availability, or fitness for a particular purpose.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">8. Limitation of liability</h2>
          <p class="mt-6">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">9. Fair use and rate limits</h2>
          <p class="mt-6">
            We may enforce rate limits or other technical measures to maintain service quality and costs. Excessive usage may be blocked temporarily.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">10. Termination</h2>
          <p class="mt-6">
            We may suspend or terminate access if you breach these terms or use the service abusively. You may stop using the service at any time.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">11. Changes to the service or terms</h2>
          <p class="mt-6">
            We may update features or these terms. We will update the “Last updated” date above. If you continue using the service after changes take effect, you accept the updated terms.
          </p>

          <h2 class="mt-12 text-2xl font-bold text-gray-900 dark:text-white">12. Contact</h2>
          <p class="mt-6">
            For questions about these terms, please use the contact link in the footer. If you prefer email, you can use: <a href="mailto:legal@captura.local">legal@captura.local</a> (replace with your actual contact address).
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
