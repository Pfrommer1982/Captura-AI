<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <!-- Modal Content -->
      <div class="relative z-10 w-full max-w-2xl">
        <div class="rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl overflow-hidden backdrop-blur-md">

          <!-- Terminal Header -->
          <div class="flex items-center justify-between px-4 py-3 bg-gray-800/80 border-b border-gray-700/50">
            <div class="flex items-center gap-3">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span class="text-sm font-mono text-gray-300">captura-ai-terminal</span>
            </div>
            <div class="text-xs text-gray-400 font-mono tabular-nums">
              {{ Math.min(100, Math.round(progress)) }}%
            </div>
          </div>

          <div class="p-4">
            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex items-center justify-between mb-2 text-sm font-mono">
                <span class="text-green-400">➤ Processing...</span>
                <span class="text-gray-400 tabular-nums">[{{ Math.min(100, Math.round(progress)) }}/100]</span>
              </div>
              <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-green-400 to-blue-500 h-2 transition-all duration-500 ease-out"
                  :style="{ width: `${Math.min(100, progress)}%` }"
                ></div>
              </div>
            </div>

            <!-- Current Status -->
            <div v-if="currentStatus" class="mb-3 p-2 rounded bg-gray-800/60 border-l-4 border-blue-500">
              <p class="text-sm font-mono text-blue-300">
                <span class="text-blue-500">$</span> {{ currentStatus }}
              </p>
            </div>

            <!-- Terminal Log -->
            <div class="bg-black/60 rounded-lg border border-gray-700/50 overflow-hidden">
              <div class="px-3 py-2 bg-gray-800/40 border-b border-gray-700/50">
                <span class="text-xs font-mono text-gray-400">Process Log</span>
              </div>
              <div ref="logContainer" class="max-h-48 overflow-auto p-3 space-y-1">
                <div v-for="(line, idx) in statusLog" :key="idx" class="flex items-start gap-2 font-mono text-xs">
                  <span class="text-gray-500 mt-0.5 select-none">{{ String(idx + 1).padStart(2, '0') }}</span>
                  <span class="text-green-400 select-none">></span>
                  <span class="text-gray-300">{{ line }}</span>
                </div>
                <div v-if="!statusLog.length" class="flex items-start gap-2 font-mono text-xs">
                  <span class="text-gray-500">01</span>
                  <span class="text-green-400">></span>
                  <span class="text-gray-400 animate-pulse">Initializing...</span>
                </div>
                <!-- Cursor -->
                <div class="flex items-start gap-2 font-mono text-xs">
                  <span class="text-gray-500">{{ String(statusLog.length + 1).padStart(2, '0') }}</span>
                  <span class="text-green-400">></span>
                  <span class="bg-green-400 w-2 h-4 animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  visible: boolean
  progress: number
  currentStatus: string
  statusLog: string[]
}>()

// Auto-scroll the log to the bottom when new lines arrive
const logContainer = ref<HTMLDivElement | null>(null)
watch(() => props.statusLog.length, async () => {
  await nextTick()
  const el = logContainer.value
  if (!el) return
  el.scrollTop = el.scrollHeight
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
