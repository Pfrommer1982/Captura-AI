<template>
  <footer class="py-12 hidden md:block">
    <div class="container mx-auto px-6">
      <!-- Links and Social side-by-side on mobile -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center sm:text-left">
        <!-- Links -->
        <div class="text-left">
          <h3 class="font-semibold mb-4 text-gray-800 dark:text-gray-200">Pages</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500">Home</NuxtLink></li>
            <li><a href="/how-it-works" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500">How it works <span > <Icon name="heroicons:exclaimation-circle" size="12" class="-translate-y-1"/></span></a></li>

          </ul>
        </div>

        <!-- Social Icons -->
        <div>
          <h3 class="font-semibold mb-4 text-gray-800 dark:text-gray-200">Social</h3>
          <div class="flex justify-center sm:justify-start gap-4">
            <a href="https://github.com/in/christoph-pfrommer" target="_blank" rel="noopener" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
              <Icon name="codicon:github" size="24" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
              <Icon name="akar-icons:linkedinv1-fill" size="24" />
            </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener" class="text-gray-600 dark:text-gray-400 hover:text-indigo-500">
              <Icon name="tabler:mail-up" size="26" />
            </a>
          </div>
        </div>

        <!-- Legal - spans full width on mobile -->
        <div class="col-span-2 sm:col-span-1">
          <h3 class="font-semibold mb-4 text-gray-800 dark:text-gray-200">Legal</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            &copy; 2025 Captura AI. All rights reserved.<br />
            Use of this app is at your own risk. <br /> Please read our <NuxtLink to="/privacy" class="text-indigo-500">Privacy Policy</NuxtLink> and <NuxtLink to="/terms" class="text-indigo-500">Terms of Service</NuxtLink>.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom row -->
    <div class="mt-8 text-center text-gray-500 dark:text-gray-400 text-xs">
      Disclaimer: AI-generated descriptions are indicative and may differ from reality.
    </div>
  </footer>
</template>
