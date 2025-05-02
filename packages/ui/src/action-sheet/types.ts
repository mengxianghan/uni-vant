export interface ActionSheetAction {
  icon?: string
  name?: string
  color?: string
  subname?: string
  loading?: boolean
  disabled?: boolean
  callback?: (action: ActionSheetAction) => void
  className?: unknown
}
