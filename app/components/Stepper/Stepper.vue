//parent component
<template>
  <div
    class="relative rounded-2xl p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 shadow-md"
  >

    <UStepper
      ref="stepper"
      v-model="currentStep"
      :items="stepperItems"
      :linear="true"
      class="mb-8 mt-4 flex   min-h-[45vh] "
    >

    <template #choose-style>
        <StepChooseStyle
          :selected-style="selectedStyle"
          :selected-language="selectedLanguage"
          :description-options="descriptionOptions"
          :language-options="languageOptions"
          @selectStyle="selectStyle"
          @update:selectedLanguage="selectedLanguage = $event"
        />
      </template>

      <template #upload-photo>
        <StepUploadPhoto
          :file="file"
          @fileChange="onFileChange"
          @removeFile="removeFile"
        />
      </template>


      <template #generate>
        <StepGenerate
          :file="file"
          :loading="loading"
          :api-error="apiError"
          :style-label="getStyleLabel(selectedStyle)"
          :language-label="getLanguageLabel(selectedLanguage)"
          @startProcessing="startProcessing"
        />
      </template>
    </UStepper>


    <div class="flex justify-between gap-8 pt-4 border-t border-gray-500">
      <UButton
        v-if="stepper?.hasPrev"
        @click="stepper?.prev()"
        icon="i-lucide-arrow-left"
        color="gray"

        :disabled="loading"
        label="Back"
        class="px-6 border  border-gray-500"
      />
      <div v-else></div>

      <UButton
        v-if="stepper?.hasNext && canProceedToNext"
        @click="stepper?.next()"
        icon="i-lucide-arrow-right"
        trailing
        :disabled="loading"
        label="Next"
           class="px-6 "
      />
    </div>

    <!-- Loading modal -->
    <LoadingModal
      :visible="loading"
      :progress="progress"
      :current-status="currentStatus"
      :status-log="statusLog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, defineAsyncComponent } from 'vue'
import type { FilePreview } from '../../types'
import { descriptionOptions, languageOptions, stepperItems } from '../../composables/useImageAnalyzer'



// Lazy import step subcomponents for better code-splitting
const StepChooseStyle = defineAsyncComponent(() => import('./StepChooseStyle.vue'))
const StepUploadPhoto = defineAsyncComponent(() => import('./StepUploadPhoto.vue'))
const StepGenerate = defineAsyncComponent(() => import('./StepGenerate.vue'))
const LoadingModal = defineAsyncComponent(() => import('../LoadingModal.vue'))


interface Props {
  initialStyle?: string
  initialLanguage?: string
}

/** === Props & Emits === */
const props = withDefaults(defineProps<Props>(), {
  initialStyle: '',
  initialLanguage: 'en'
})

const emit = defineEmits<{
  completed: [result: { file: FilePreview; style: string; language: string }]
  error: [error: string]
}>()



const selectedStyle = ref<string>(props.initialStyle)
const selectedLanguage = ref(props.initialLanguage)
const file = ref<FilePreview | null>(null)
const loading = ref(false)
const apiError = ref<string | null>(null)
const currentStep = ref(0)
// Stepper reference
const stepper = ref<any>(null)

// Loading modal state
const progress = ref(0)
const statusLog = ref<string[]>([])
const currentStatus = ref('')

const PROCESS_STEPS = [
  { key: 'prepare', label: 'Preparing environment…', target: 3 },
  { key: 'readFile', label: 'Reading file metadata…', target: 6 },
  { key: 'validate', label: 'Validating image type & size…', target: 10 },
  { key: 'upload', label: 'Uploading image…', target: 18 },
  { key: 'queue', label: 'Queueing task for analysis…', target: 24 },
  { key: 'warmup', label: 'Warming up AI models…', target: 34 },
  { key: 'segment', label: 'Detecting subjects & segments…', target: 44 },
  { key: 'features', label: 'Extracting visual features…', target: 56 },
  { key: 'caption', label: 'Drafting description…', target: 66 },
  { key: 'refine', label: 'Refining language & tone…', target: 75 },
  { key: 'imageGen', label: 'Generating enhanced image…', target: 86 },
  { key: 'compose', label: 'Composing final outputs…', target: 94 },
  { key: 'finalize', label: 'Finalizing…', target: 98 },
  { key: 'lastDots', label: 'Ready', target: 100 }
] as const

let progressTimer: number | null = null
let dotsTimer: number | null = null

function clearProgressTimer() {
  if (progressTimer) {
    window.clearInterval(progressTimer)
    progressTimer = null
  }
}

function clearDotsTimer() {
  if (dotsTimer) {
    window.clearInterval(dotsTimer)
    dotsTimer = null
  }
}

function resetProgress() {
  clearProgressTimer()
  clearDotsTimer()
  progress.value = 0
  statusLog.value = []
  currentStatus.value = ''
}

async function animateTo(target: number, duration = 1400) {
  target = Math.max(0, Math.min(100, target))
  const start = progress.value
  const delta = target - start
  if (delta === 0) return
  const interval = 50
  const steps = Math.max(1, Math.round(duration / interval))
  const stepInc = delta / steps

  await new Promise<void>((resolve) => {
    let count = 0
    clearProgressTimer()
    progressTimer = window.setInterval(() => {
      count++
      progress.value = Math.max(0, Math.min(100, start + stepInc * count))
      if (count >= steps) {
        clearProgressTimer()
        progress.value = target
        resolve()
      }
    }, interval)
  })
}

async function simulateProgress(isCancelled: () => boolean) {
  resetProgress()
  for (const step of PROCESS_STEPS) {
    if (isCancelled()) break
    currentStatus.value = step.label
    statusLog.value.push(step.label)

    // slower animation overall; vary slightly per phase
    let duration = 1600
    if (step.key === 'finalize') duration = 1200
    if (step.key === 'lastDots') duration = 1600

    await animateTo(step.target, duration)

    // After reaching 100% (lastDots), animate blinking 1-2-3 dots until cancelled
    if (step.key === 'lastDots' && !isCancelled()) {
      const base = 'Ready'
      let i = 0
      clearDotsTimer()
      dotsTimer = window.setInterval(() => {
        if (isCancelled()) { clearDotsTimer(); return }
        i = (i % 3) + 1
        statusLog.value[statusLog.value.length - 1] = base + '.'.repeat(i)
      }, 500)
    }
  }
}


/** === Stepper Items Config (from composable) === */
// Use stepperItems imported from useImageAnalyzer

/** === Computed: Can go to next === */
const canProceedToNext = computed(() => {
  if (currentStep.value === 0) return selectedStyle.value !== ''
  if (currentStep.value === 1) return file.value !== null
  return false
})

/** === Helpers === */
function getStyleLabel(value: string) {
  return descriptionOptions.find(opt => opt.value === value)?.label || value
}
function getLanguageLabel(value: string) {
  return languageOptions.find(opt => opt.value === value)?.label || value
}
function selectStyle(style: string) {
  selectedStyle.value = style
}

/** === File Handling === */
async function compressImage(input: File, opts?: { maxW?: number; maxH?: number; quality?: number }) {
  const maxW = opts?.maxW ?? 1600
  const maxH = opts?.maxH ?? 1600
  const quality = opts?.quality ?? 0.82

  // If it's already small, skip
  if (input.size <= 1.5 * 1024 * 1024) return input

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(input)
  })

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new Image()
    i.onload = () => resolve(i)
    i.onerror = reject
    i.src = dataUrl
  })

  let { width, height } = img
  const ratio = Math.min(maxW / width, maxH / height, 1)
  const targetW = Math.round(width * ratio)
  const targetH = Math.round(height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = targetW
  canvas.height = targetH
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, 0, 0, targetW, targetH)

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
  )

  if (!blob) return input
  // Only replace if we actually reduced size
  if (blob.size >= input.size) return input

  const safeName = (input.name.replace(/\.(png|jpg|jpeg|webp)$/i, '') || 'photo') + '.jpg'
  return new File([blob], safeName, { type: 'image/jpeg' })
}

async function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const raw = target.files[0] as File

  // Compress big images (especially from mobile camera)
  let selected = raw
  try {
    selected = await compressImage(raw, { maxW: 1600, maxH: 1600, quality: 0.82 })
  } catch (err) {
    console.warn('Compression skipped:', err)
  }

  if (file.value) URL.revokeObjectURL(file.value.url)

  file.value = {
    file: selected,
    url: URL.createObjectURL(selected),
    name: selected.name
  }

  target.value = ''
  apiError.value = null
}


function removeFile() {
  if (file.value) URL.revokeObjectURL(file.value.url)
  file.value = null
  apiError.value = null
}

/** === Start Processing === */
async function startProcessing() {
  apiError.value = null

  if (!file.value) {
    apiError.value = 'Please upload an image first.'
    return
  }

  loading.value = true
  const cancelled = { v: false }
  // Start simulatie van voortgang naast het echte proces
  const progressPromise = simulateProgress(() => cancelled.v)

  try {
    const formData = new FormData()
    formData.append('file', file.value.file, file.value.file.name)
    formData.append('style', selectedStyle.value)
    formData.append('language', selectedLanguage.value)


    const config  = useRuntimeConfig()
    const base = config.public.apiBase || ''
    const res: any = await $fetch(base + '/api/describe', {
      method: 'POST',
      body: formData
    })

    const description = res?.files?.[0]?.description ?? null
    const generatedImage = res?.files?.[0]?.generatedImage ?? null

    if (description) file.value.description = description
    if (generatedImage) file.value.generatedImage = generatedImage

    if (res?.error) {
      apiError.value = res.error
      emit('error', res.error)
    } else {
      emit('completed', {
        file: file.value,
        style: selectedStyle.value,
        language: selectedLanguage.value
      })
    }
  } catch (err: any) {
    console.error('API error:', err)
    const errorMessage = err?.message || 'Something went wrong.'
    apiError.value = errorMessage
    emit('error', errorMessage)
  } finally {
    // Finish: ensure progress ends at 100%, allow the trailing dots to play a bit
    await animateTo(100, 1200)
    await new Promise<void>(r => setTimeout(r, 1200))
    cancelled.v = true
    loading.value = false
    clearProgressTimer()
    clearDotsTimer()
  }
}


onUnmounted(() => {
  if (file.value) {
    URL.revokeObjectURL(file.value.url)
  }
  clearProgressTimer()
})
</script>
