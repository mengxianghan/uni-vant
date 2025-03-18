import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { LoadingType } from '../loading'
import type { ToastPosition, ToastType, ToastWordBreak } from './types'
import { basicProps, createNamespace, makeNumberProp, makeStringProp, numericProp, unknownProp } from '../utils'

export const { name: toastName, bem: toastBem } = createNamespace('toast')

export const toastProps = {
  ...basicProps,
  icon: String,
  show: Boolean,
  type: makeStringProp<ToastType>('text'),
  overlay: Boolean,
  message: String,
  iconSize: numericProp,
  duration: makeNumberProp(2000),
  position: makeStringProp<ToastPosition>('middle'),
  wordBreak: String as PropType<ToastWordBreak>,
  className: unknownProp,
  iconPrefix: String,
  transition: makeStringProp('van-fade'),
  loadingType: String as PropType<LoadingType>,
  forbidClick: Boolean,
  overlayClass: unknownProp,
  overlayStyle: Object as PropType<CSSProperties>,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean,
  zIndex: numericProp,
}
export type ToastProps = ExtractPropTypes<typeof toastProps>

export const toastEmits = {
  'update:show': () => true,
}
export type ToastEmits = typeof toastEmits
