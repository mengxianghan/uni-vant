import type { ExtractPropTypes } from 'vue'
import { createNamespace, isObject, numericProp } from '../utils'

export const { name: gridItemName, bem: gridItemBem } = createNamespace('grid-item')

export const gridItemProps = {
  text: String,
  icon: String,
  iconPrefix: String,
  iconColor: String,
  dot: Boolean,
  badge: numericProp,
  badgeProps: Object,
}
export type GridItemProps = ExtractPropTypes<typeof gridItemProps>

export const gridItemEmits = {
  click: (evt: MouseEvent) => isObject(evt),
}
export type GridItemEmits = typeof gridItemEmits
