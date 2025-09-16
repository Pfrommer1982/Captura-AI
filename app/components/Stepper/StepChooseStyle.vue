
<template>
  <div class="flex flex-col items-center space-y-8 mt-5">
    <!-- Style Selection -->
    <div class="text-center">
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 md:mt-16">
        Choose a Style
      </h3>

      <!-- flex-col op mobile, row op md+ -->
      <div class="flex flex-col px-10 md:flex-row  flex-wrap justify-center gap-3">
        <UButton
          v-for="option in descriptionOptions"
          :key="option.value"
          @click="selectStyle(option.value)"
          :color="selectedStyle === option.value ? 'primary' : 'gray'"
          :variant="selectedStyle === option.value ? 'solid' : 'soft'"
          size="lg"
          :label="option.label"
          class="w-full md:w-auto border justify-center px-12 border-gray-500"
        />
      </div>
    </div>

    <!-- Language Selection -->
    <div class="w-full max-w-sm text-left">
      <label for="language" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
      <select
        id="language"
        v-model="modelLanguage"
        class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option v-for="opt in languageOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import type { Option } from '../../types'

const props = defineProps<{
  selectedLanguage: string
  languageOptions: Option[]
  selectedStyle: string
  descriptionOptions: Option[]
}>()

const emit = defineEmits<{
  (e: 'selectStyle', value: string): void
  (e: 'update:selectedLanguage', value: string): void
}>()

// Create writable computed properties for v-model
const modelLanguage = computed({
  get: () => props.selectedLanguage,
  set: (val: string) => emit('update:selectedLanguage', val)
})

// Function to handle style selection
const selectStyle = (style: string) => {
  emit('selectStyle', style)
}
</script>
