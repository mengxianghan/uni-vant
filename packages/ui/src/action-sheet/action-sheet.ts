import type { ExtractPropTypes } from 'vue'
import type { ActionSheetAction } from './types'
import { createNamespace, makeArrayProp, makeStringProp, numericProp, truthProp, unknownProp } from '../utils'

export const { name: actionSheetName, bem: actionSheetBem } = createNamespace('action-sheet')

export const actionSheetProps = {
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
  actions: makeArrayProp<ActionSheetAction>(),
  closeIcon: makeStringProp('cross'),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp,
}

export type ActionSheetProps = ExtractPropTypes<typeof actionSheetProps>
