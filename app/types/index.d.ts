// types/index.d.ts

/** File preview state */
export interface FilePreview {
  file: File
  url: string
  name: string
  description?: string
  generatedImage?: string
}

/** Options (style or language) */
export interface Option {
  label: string
  value: string
}
