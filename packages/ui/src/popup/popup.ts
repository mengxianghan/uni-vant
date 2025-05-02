import type { ExtractPropTypes } from 'vue'
import type { PopupPosition } from './types.ts'
import { DURATION } from '../constants'
import { createNamespace, makeNumberProp, makeStringProp, numericProp, truthProp, unknownProp } from '../utils'

export const { name: popupName, bem: popupBem } = createNamespace('popup')

export const popupProps = {
  overlay: truthProp,
  position: makeStringProp<PopupPosition>('center'),
  overlayClass: [String, Array, Object],
  overlayStyle: Object,
  duration: makeNumberProp(DURATION),
  zIndex: numericProp,
  round: Boolean,
  lockScroll: truthProp,
  closeOnClickOverlay: truthProp,
  closeable: Boolean,
  closeIcon: makeStringProp('cross'),
  closeIconPosition: makeStringProp('top-right'),
  beforeClose: { type: Function, default: () => true },
  iconPrefix: String,
  transition: String,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: Boolean,
  customClass: unknownProp,
  customStyle: [String, Object],
  destroyOnClose: Boolean,
}

export type PopupProps = ExtractPropTypes<typeof popupProps>

export const popupEmits = {
  open: () => true,
  close: () => true,
  opened: () => true,
  closed: () => true,
  keydown: () => true,
  clickOverlay: (evt: MouseEvent) => evt instanceof Object,
  clickCloseIcon: (evt: MouseEvent) => evt instanceof Object,
}

export type PopupEmits = typeof popupEmits
