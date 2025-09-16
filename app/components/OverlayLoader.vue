<template>
  <transition name="fade">
    <!-- fixed overlay, zachte gradient, gecentreerde content -->
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      aria-modal="true"
      role="dialog"
    >
      <!-- solide achtergrond en zachte, ondoorzichtige gradient -->
      <div class="absolute inset-0 bg-slate-950"></div>
      <div class="absolute inset-0 bg-gradient-to-tl from-pink-700 via-purple-700 to-blue-800
 "></div>
      <!-- sterren achter de content -->
      <RisingStars class="absolute inset-0 pointer-events-none" />

      <!-- content-wrapper zonder schaduw -->
      <div class="relative z-10 max-w-3xl w-full text-center text-white px-6 py-10">
        <img src="/capturaAI.png" alt="Captura AI logo" class="mx-auto h-28 md:h-20 mb-6">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-3">Captura AI</h1>
        <p class="mb-8 text-base md:text-lg text-white/90">
          Choose a style, upload a photo, and let AI generate a smart description & image.
        </p>

        <div class="flex items-center justify-center gap-4">
          <UButton
            size="lg"
            color="primary"
            icon="i-lucide-play"
            @click="start"
            label="Start"
            class="px-12"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'start'): void
}>()

const visible = ref(false)

onMounted(() => {
  // show overlay when mounted; parent decides when to render (mobile-only in page)
  visible.value = true
})

function start() {
  visible.value = false
  emit('start')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
