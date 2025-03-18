import type { ExtractPropTypes } from 'vue'
import type { ShareSheetOption } from './types'
import { createNamespace, isNumber, isObject, makeArrayProp, numericProp, truthProp, unknownProp } from '../utils'

export const { name: shareSheetName, bem: shareSheetBem, t: shareSheetT } = createNamespace('share-sheet')

export const shareSheetProps = {
  zIndex: numericProp,
  overlay: truthProp,
  duration: Number,
  lockScroll: truthProp,
  beforeClose: Function,
  overlayStyle: Object,
  overlayClass: unknownProp,
  closeOnClickOverlay: truthProp,
  title: String,
  round: truthProp,
  options: makeArrayProp<ShareSheetOption | ShareSheetOption[]>(),
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  safeAreaInsetBottom: truthProp,
}
export type ShareSheetProps = ExtractPropTypes<typeof shareSheetProps>

export const shareSheetEmits = {
  select: (option: ShareSheetOption, index: number) => isObject(option) && isNumber(index),
  cancel: () => true,
}
export const ShareSheetEmits = typeof shareSheetEmits
