import type { ExtractPropTypes } from 'vue'
import { createNamespace, isObject, makeStringProp, numericProp } from '../utils'

export const { name: cardName, bem: cardBem } = createNamespace('card')

export const cardProps = {
  tag: String,
  num: numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: makeStringProp('¥'),
  thumbLink: String,
  originPrice: numericProp,
}
export type CardProps = ExtractPropTypes<typeof cardProps>

export const cardEmits = {
  clickThumb: (evt: MouseEvent) => isObject(evt),
}
export type CardEmits = typeof cardEmits
