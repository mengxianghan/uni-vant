import type { ExtractPropTypes, PropType } from 'vue'
import type { TagSize, TagType } from './types'
import { createNamespace, isObject, makeStringProp, truthProp } from '../utils'

export const { name: tagName, bem: tagBem } = createNamespace('tag')

export const tagProps = {
  type: makeStringProp<TagType>('default'),
  size: String as PropType<TagSize>,
  color: String,
  show: truthProp,
  plain: Boolean,
  round: Boolean,
  mark: Boolean,
  textColor: makeStringProp('white'),
  closeable: Boolean,
}
export type TagProps = ExtractPropTypes<typeof tagProps>

export const tagEmits = {
  click: (evt: MouseEvent) => isObject(evt),
  close: (evt: MouseEvent) => isObject(evt),
}
export type TagEmits = typeof tagEmits
