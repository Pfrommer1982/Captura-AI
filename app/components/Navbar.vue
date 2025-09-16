//Navbar
<template>
  <header
    class="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-800/40"
  >
    <nav class="container mx-auto flex items-center justify-between px-6 py-3">
      <!-- Logo -->
      <NuxtLink to="/">
        <div class="flex items-center gap-2">
          <img src="/capturaAI.png" alt="capturaAI logo" class="w-8">
          <h1 class="ml-1 text-2xl font-bold tracking-tight">Captura AI</h1>
        </div>
      </NuxtLink>

      <!-- Right: icons and theme toggle -->
      <div class="flex items-center gap-4">
        <!-- Dynamic Button (desktop only) -->
        <UButton
          :to="isHowItWorksPage ? '/' : '/how-it-works'"
          :icon="isHowItWorksPage ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'"
          :trailing="!isHowItWorksPage"
          :leading="isHowItWorksPage"
          :label="isHowItWorksPage ? 'Back to Home' : 'How it Works'"
          class="px-6 hidden md:flex"
        />

        <!-- GitHub (desktop only) -->
        <a
          href="https://github.com/Pfrommer1982"
          target="_blank"
          rel="noopener"
          class="hidden md:inline-flex text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition "
        >
          <Icon name="codicon:github" size="22" />
        </a>

        <!-- LinkedIn (desktop only) -->
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener"
          class="hidden md:inline-flex text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition "
        >
          <Icon name="akar-icons:linkedinv1-fill" size="22" />
        </a>

        <!-- Mobile hamburger for Footer dropdown -->
        <UColorModeButton class="hover:text-indigo-500 transition hover:bg-transparent -translate-x-1"/>
        <MobileFooterMenu class="md:hidden " />

        <!-- Theme switch -->
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isHowItWorksPage = computed(() => {
  return route.path === '/how-it-works'
})
</script>
