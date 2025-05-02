import type { ExtractPropTypes } from 'vue'
import type { ImageFit } from './types.ts'
import { createNamespace, makeStringProp, numericProp, truthProp, unknownProp } from '../utils'

export const { name: imageName, bem: imageBem } = createNamespace('image')

export const imageProps = {
  src: String,
  fit: makeStringProp<ImageFit>('scaleToFill'),
  alt: String,
  width: numericProp,
  height: numericProp,
  radius: numericProp,
  round: Boolean,
  block: Boolean,
  lazyLoad: Boolean,
  showError: truthProp,
  showLoading: truthProp,
  errorIcon: makeStringProp('photo-fail'),
  loadingIcon: makeStringProp('photo'),
  iconSize: numericProp,
  iconPrefix: String,
  webp: Boolean,
  aspectRatio: Number,
  autosize: Boolean,
  customClass: unknownProp,
}

export type ImageProps = ExtractPropTypes<typeof imageProps>

export const imageEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
  load: (evt: MouseEvent) => evt instanceof Object,
  error: (evt: MouseEvent) => evt instanceof Object,
}

export type ImageEmits = typeof imageEmits
