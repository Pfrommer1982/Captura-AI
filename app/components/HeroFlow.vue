<template>
  <section class="relative w-full min-h-[100vh] flex items-center overflow-hidden py-20">

    <RisingStars />
    <!-- Background gradient -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 dark:bg-gradient-to-tl dark:from-pink-700 dark:via-purple-700 dark:to-blue-800 bg-gradient-to-tl  from-pink-200 via-purple-200 to-blue-300
"
    />

    <div class="container mx-auto px-4 opacity-80">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center">
          <h1 class="hidden md:block text-4xl font-bold tracking-tight md:text-6xl">
            Captura AI
          </h1>

          <p
            class="hidden md:block mt-4 leading-8 text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Choose a style, upload a photo, and let AI generate a smart
            <span class="typewriter dark:text-primary text-purple-900 font-extrabold">{{ displayText }}</span>
            description and image.
          </p>
        </div>

        <!-- AI Photo Analyzer Component -->
        <div class=" mt-3 md:mt-10">
          <Stepper
            :initial-style="defaultStyle"
            :initial-language="defaultLanguage"
            @completed="onProcessingCompleted"
            @error="onProcessingError"

          />
        </div>

        <!-- Optional: Alert notification -->
        <UAlert
          v-if="showAlert"
          :type="alertType"
          :title="alertTitle"
          :description="alertDescription"
          @close="showAlert = false"
          class="mt-4"


        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ProcessingResult {
  file: {
    file: File
    url: string
    name: string
    description?: string
    generatedImage?: string
  }
  style: string
  language: string
}

// Default values
const defaultStyle = ref('commercial')
const defaultLanguage = ref('en')

// Alert state
const showAlert = ref(false)
const alertType = ref<'success' | 'error'>('success')
const alertTitle = ref('')
const alertDescription = ref('')

// Event handlers
function onProcessingCompleted(result: ProcessingResult) {
  console.log('Processing completed:', result)
  alertType.value = 'success'
  alertTitle.value = 'Success!'
  alertDescription.value = 'AI content generated successfully'
  showAlert.value = true
}

function onProcessingError(error: string) {
  console.error('Processing error:', error)
  alertType.value = 'error'
  alertTitle.value = 'Error'
  alertDescription.value = error
  showAlert.value = true
}

// -------- TYPEWRITER ANIMATIE ----------
const words = ['commercial', 'artistic', 'humorous', 'horrific', 'space-ish', 'futuristic']
const displayText = ref('')
let wordIndex = 0
let charIndex = 0
let deleting = false

function typeWriter() {
  const currentWord = words[wordIndex]!

  if (!deleting) {
    // typen
    displayText.value = currentWord.substring(0, charIndex + 1)
    charIndex++
    if (charIndex === currentWord.length) {
      // even wachten en dan backspacen
      deleting = true
      setTimeout(typeWriter, 1500)
      return
    }
  } else {
    // backspacen
    displayText.value = currentWord.substring(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) {
      deleting = false
      wordIndex = (wordIndex + 1) % words.length
    }
  }

  // snelheid van typen/backspacen
  const speed = deleting ? 60 : 120
  setTimeout(typeWriter, speed)
}

onMounted(() => {
  typeWriter()
})
</script>

<style scoped>
@media (max-width: 640px) {
  .max-w-4xl {
    max-width: 100% !important;
  }
}

/* cursor animatie voor het typewriter effect */
.typewriter {
  display: inline-block;
  width: 10ch; /* reserveer ruimte voor het langste woord */
  text-align: left;
  overflow: hidden;
  vertical-align: bottom;
}

.typewriter::after {
  content: '|';
  animation: blink 1s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  50.01%, 100% {
    opacity: 0;
  }
}
</style>
