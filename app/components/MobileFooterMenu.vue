<template>
  <div class="relative " data-mobile-footer-menu-root @keydown.esc="close">
    <!-- Toggle button with custom hamburger that morphs to X -->
    <button
      class="relative  inline-flex items-center justify-center w-10 h-10 translate-y-1 transition"
      :aria-label="open ? 'Close menu' : 'Open menu'"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      <!-- 3 bars -->
      <span
        class="absolute left-2 right-2 h-0.5 bg-gray-800 dark:bg-gray-200 rounded origin-center transition-all duration-300"
        :class="open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-3 rotate-0'"
      />
      <span
        class="absolute left-2 right-2 h-0.5 bg-gray-800 dark:bg-gray-200 rounded origin-center transition-all duration-300"
        :class="open ? 'top-1/2 -translate-y-1/2 opacity-0 scale-x-0' : 'top-1/2 -translate-y-1/2 opacity-100 scale-x-100'"
      />
      <span
        class="absolute left-2 right-2 h-0.5 bg-gray-800 dark:bg-gray-200 rounded origin-center transition-all duration-300"
        :class="open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-3 rotate-0'"
      />
    </button>

    <!-- Fullpage overlay navigation -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="open"
          class="fixed inset-0 z-[9999] bg-white dark:bg-gray-900"
          role="dialog"
          aria-modal="true"
        >
          <!-- Close button on overlay -->
          <button
            class="fixed top-4 right-6 z-[10000]  inline-flex items-center justify-center w-10 h-10 transition"
            aria-label="Close menu"
            @click="close"
          >
            <span class="absolute left-2 right-2 h-0.5 bg-gray-800 dark:bg-gray-200 rounded origin-center rotate-45"></span>
            <span class="absolute left-2 right-2 h-0.5 bg-gray-800 dark:bg-gray-200 rounded origin-center -rotate-45"></span>
          </button>

          <!-- Content -->
          <div class="h-full flex flex-col">
            <!-- Navigation blocks -->
            <div class="flex-1 overflow-y-auto px-6 pt-28 pb-10">
              <!-- Pages -->
              <div class="mb-8">
                <h3 class="text-xs font-semibold mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wider">Pages</h3>
                <nav class="space-y-3 text-xl">
                  <NuxtLink @click="close" to="/" class="block text-gray-900 dark:text-gray-100 hover:text-indigo-500">Home</NuxtLink>
                  <NuxtLink @click="close" to="/how-it-works" class="block text-gray-900 dark:text-gray-100 hover:text-indigo-500">How it works</NuxtLink>
                  <NuxtLink @click="close" to="/privacy" class="block text-gray-900 dark:text-gray-100 hover:text-indigo-500">Privacy</NuxtLink>
                  <NuxtLink @click="close" to="/terms" class="block text-gray-900 dark:text-gray-100 hover:text-indigo-500">Terms</NuxtLink>
                </nav>
              </div>

              <!-- Social -->
              <div class="mt-10 ">
                <h3 class="text-xs font-semibold mb-3 text-gray-600 dark:text-gray-400 uppercase tracking-wider">Social</h3>
                <div class="flex gap-12">
                  <a href="https://github.com/in/christoph-pfrommer" target="_blank" rel="noopener" class="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                    <Icon name="codicon:github" size="32" />
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noopener" class="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                    <Icon name="akar-icons:linkedinv1-fill" size="32" />
                  </a>
                  <a href="mailto:info@example.com" class="text-gray-600 dark:text-gray-300 hover:text-indigo-500">
                    <Icon name="tabler:mail-up" size="32" />
                  </a>
                </div>
              </div>

              <!-- Legal / Disclaimer -->
              <div class="fixed bottom-4 left-4 right-4 max-w-prose text-center mx-auto">
                <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  © 2025 Captura AI. Please read our
                  <NuxtLink @click="close" to="/privacy" class="text-indigo-500">Privacy Policy</NuxtLink>
                  and
                  <NuxtLink @click="close" to="/terms" class="text-indigo-500">Terms</NuxtLink>.
                  AI-generated descriptions may differ from reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const open = ref(false)

function toggle() { open.value = !open.value }
function close() { open.value = false }

// Lock body scroll when menu open
let stopWatch: (() => void) | null = null
onMounted(() => {
  stopWatch = watch(open, (v) => {
    document.documentElement.classList.toggle('overflow-hidden', v)
  }, { immediate: true })
})

onBeforeUnmount(() => {
  if (stopWatch) stopWatch()
  document.documentElement.classList.remove('overflow-hidden')
})
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .18s ease }
.fade-enter-from,.fade-leave-to{ opacity: 0 }
</style>
