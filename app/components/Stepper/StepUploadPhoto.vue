//StepUpload.vue
<template>
  <div class="flex flex-col items-center space-y-8 mt-5">
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 md:mt-16">Upload your photo</h3>

    <!-- Hidden inputs -->
    <input
      ref="fileInputGallery"
      type="file"
      accept="image/*"
      class="hidden"
      @change="$emit('fileChange', $event)"
    />
    <input
      ref="fileInputCamera"
      type="file"
      accept="image/*"
      capture="environment"
      class="hidden"
      @change="$emit('fileChange', $event)"
    />

    <!-- Upload options when no file is selected -->
    <div v-if="!file" class="flex flex-col items-center gap-4">
      <!-- Desktop Drag & Drop -->
      <div class="hidden sm:flex justify-center w-full">
        <label
          for="file-upload-drag"
          class="flex flex-col items-center gap-3 cursor-pointer px-12 py-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors max-w-sm"
        >
          <UIcon name="i-lucide-upload" class="text-2xl text-indigo-500" />
          <div class="text-center">
            <p class="font-medium text-gray-700 dark:text-gray-200">Click to upload</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">or drag and drop</p>
          </div>
          <!-- Honeypot field to mislead bots; will be blocked on server if filled -->
          <input
            type="text"
            name="website"
            autocomplete="off"
            tabindex="-1"
            aria-hidden="true"
            class="hidden"
          />
          <input
            id="file-upload-drag"
            type="file"
            accept="image/*"
            class="hidden"
            @change="$emit('fileChange', $event)"
          />
        </label>
      </div>

      <!-- Mobile Buttons - Nu onder elkaar met consistent UButton design -->
      <div class="flex flex-col sm:hidden gap-3 w-full max-w-xs">
        <!-- Honeypot field to mislead bots on mobile -->
        <input
          type="text"
          name="website"
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
          class="hidden"
        />
        <UButton
          @click="openGallery"
          size="lg"
          icon="i-lucide-folder-open"
          label="Upload from gallery"
          class="flex justify-center"
        />
        <UButton
          @click="openCamera"
          size="lg"
          icon="i-lucide-camera"
          label="Take a photo"
          color="green"
          class="px-6 border  border-gray-500 flex justify-center"
        />
      </div>
    </div>

    <!-- Display uploaded file -->
    <div v-if="file" class="flex flex-col items-center mt-4 gap-4">
      <div class="relative">
        <img
          :src="file.url"
          :alt="file.name"
          class="max-h-64 w-auto rounded-lg mx-auto object-contain bg-gray-100 dark:bg-gray-700/20 border shadow-md"
        />
      </div>

      <!-- File name -->
      <div class="text-sm text-gray-600 dark:text-gray-400 text-center  truncate max-w-xs">
        {{ file.name }}
      </div>

      <!-- Action buttons onder de afbeelding -->
      <div class="flex gap-3 justify-center">
        <UButton
          @click="openGallery"
          icon="i-lucide-edit"
          size="lg"
          color="gray"
          variant="soft"
          label="Replace"
        />
        <UButton
          @click="$emit('removeFile')"
          icon="i-lucide-trash-2"
          size="lg"
          color="red"
          variant="soft"
          label="Remove"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FilePreview } from '../../types'

const fileInputGallery = ref<HTMLInputElement | null>(null)
const fileInputCamera = ref<HTMLInputElement | null>(null)

const props = defineProps<{ file: FilePreview | null }>()
const emit = defineEmits(['fileChange', 'removeFile'])

function openGallery() {
  fileInputGallery.value?.click()
}

function openCamera() {
  fileInputCamera.value?.click()
}
</script>
