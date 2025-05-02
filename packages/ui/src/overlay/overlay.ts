import type { ExtractPropTypes } from 'vue'
import { DURATION } from '../constants'
import { createNamespace, makeNumberProp, numericProp, truthProp, unknownProp } from '../utils'

export const { name: overlayName, bem: overlayBem } = createNamespace('overlay')

export const overlayProps = {
  show: Boolean,
  zIndex: numericProp,
  duration: makeNumberProp(DURATION),
  lockScroll: truthProp,
  customClass: unknownProp,
  customStyle: unknownProp,
  destroyOnClose: Boolean,
}
export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}
export type OverlayEmits = typeof overlayEmits
