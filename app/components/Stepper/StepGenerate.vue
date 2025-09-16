//S
<template>
  <div class="flex flex-col items-center space-y-8 mt-5">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 md:mt-16">Generate description & image</h3>

    <div class="flex justify-center gap-4 mb-6 text-sm">
      <UBadge color="primary" variant="soft">
        Style: {{ styleLabel }}
      </UBadge>
      <UBadge color="gray" variant="soft">
        Language: {{ languageLabel }}
      </UBadge>
    </div>

    <UButton
      @click="$emit('startProcessing')"
      :loading="loading"
      :disabled="loading"
      size="lg"
      icon="i-lucide-sparkles"
      :label="loading ? 'Generating...' : 'Generate AI content'"
      class="mb-6 mt-12 "
    />

    <UAlert
      v-if="apiError"
      color="red"
      variant="soft"
      :description="apiError"
      class="mb-6 border-red-500 border"
    />

    <div v-if="file?.description || file?.generatedImage" class="space-y-6">
      <UCard v-if="file?.generatedImage">
        <template #header>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-image" />
              <span class="font-medium">Generated Image</span>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                :color="downloaded ? 'green' : 'gray'"
                size="xs"
                :ui="{ rounded: 'rounded-full' }"
                :icon="downloaded ? 'i-lucide-check' : 'i-lucide-download'"
                :aria-label="downloaded ? 'Downloaded' : 'Download image'"
                @click="onDownloadClick"
              />
            </div>
          </div>
        </template>
        <div class="flex justify-center">
          <img
            :src="file.generatedImage"
            alt="Generated"
            class="rounded-lg shadow-lg max-h-80 object-contain"
          />
        </div>
      </UCard>

      <UCard v-if="file?.description">
        <template #header>
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-file-text" />
              <span class="font-medium">Generated Description</span>
            </div>
            <div class="flex items-center gap-2">
              <UButton
                variant="ghost"
                :color="copied ? 'green' : 'gray'"
                size="xs"
                :ui="{ rounded: 'rounded-full' }"
                :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard-copy'"
                :aria-label="copied ? 'Copied' : 'Copy description'"
                @click="onCopyClick"
              />
            </div>
          </div>
        </template>
        <p class="text-left text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
          {{ file.description }}
        </p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilePreview } from '../../types'
import { ref } from 'vue'

const props = defineProps<{
  file: FilePreview | null
  loading: boolean
  apiError: string | null
  styleLabel: string
  languageLabel: string
}>()

defineEmits(['startProcessing'])

const downloaded = ref(false)
const copied = ref(false)
let resetTimer: number | null = null

function resetIndicators() {
  if (resetTimer) window.clearTimeout(resetTimer)
  resetTimer = window.setTimeout(() => {
    downloaded.value = false
    copied.value = false
  }, 1200) // korte, subtiele bevestiging
}

function onDownloadClick() {
  if (!props.file?.generatedImage) return
  downloadImage(props.file.generatedImage)
  downloaded.value = true
  resetIndicators()
}

function onCopyClick() {
  if (!props.file?.description) return
  copyDescription(props.file.description)
  copied.value = true
  resetIndicators()
}

// Download helper: works for both remote URL and data URL
async function downloadImage(src: string) {
  // If it's already a data URL, download directly
  if (src.startsWith('data:')) {
    const link = document.createElement('a')
    link.href = src
    link.download = 'generated.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return
  }

  // Otherwise, fetch as blob and force download (avoids opening a new tab)
  try {
    const res = await fetch(src, { mode: 'cors' })
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = 'generated-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  } catch (e) {
    // Fallback: still try a direct download
    const link = document.createElement('a')
    link.href = src
    link.download = 'generated-image'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// Clipboard copy helper for description
async function copyDescription(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    // Fallback: use a temporary textarea if clipboard API fails
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
</script>
