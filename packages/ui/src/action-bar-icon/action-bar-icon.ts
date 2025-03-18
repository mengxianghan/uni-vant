import type { ExtractPropTypes } from 'vue'
import { createNamespace, isObject, numericProp } from '../utils'

export const { name: actionBarIconName, bem: actionBarIconBem } = createNamespace('action-bar-icon')

export const actionBarIconProps = {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: numericProp,
  badgeProps: Object,
  iconPrefix: String,
}
export type ActionBarIconProps = ExtractPropTypes<typeof actionBarIconProps>

export const actionBarIconEmits = {
  click: (evt: MouseEvent) => isObject(evt),
}
export type ActionBarIconEmits = typeof actionBarIconEmits
