export interface ShareSheetOption {
  name: string
  icon: string
  className?: string
  description?: string
}

export type ShareSheetOptions = ShareSheetOption[] | ShareSheetOption[][]
