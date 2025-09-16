import type { StepperItem } from '@nuxt/ui'

export interface FilePreview {
  file: File
  url: string
  name: string
  description?: string
  generatedImage?: string
}

export const descriptionOptions = [
  { label: 'Commercial', value: 'commercial' },
  { label: 'Artistic', value: 'artistic' },
  { label: 'Humorous', value: 'humorous' },
  { label: 'Horrific', value: 'horrific' },
  { label: 'Space-ish', value: 'space-ish' },
  { label: 'Futuristic', value: 'futuristic' }
]

export const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Nederlands', value: 'nl' },
  { label: 'Français', value: 'fr' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Español', value: 'es' },
  { label: 'Português', value: 'pt' },
  { label: 'Polski', value: 'pl' },
  { label: 'Türkçe', value: 'tr' },
  { label: 'Italiano', value: 'it' }
]

export const stepperItems: StepperItem[] = [
  {
    slot: 'choose-style',
    title: 'Choose Style',
    // description alleen tonen vanaf md

    icon: 'i-lucide-palette'
  },
  {
    slot: 'upload-photo',
    title: 'Upload Photo',

    icon: 'i-lucide-upload'
  },
  {
    slot: 'generate',
    title: 'Generate',

    icon: 'i-lucide-sparkles'
  }
]


export function getStyleLabel(value: string) {
  return descriptionOptions.find(opt => opt.value === value)?.label || value
}

export function getLanguageLabel(value: string) {
  return languageOptions.find(opt => opt.value === value)?.label || value
}
