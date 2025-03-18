import type { ExtractPropTypes } from 'vue'
import type { Numeric } from '../utils'
import { createNamespace, isNumeric, numericProp } from '../utils'

export const { name: sidebarItemName, bem: sidebarItemBem } = createNamespace('sidebar-item')

export const sidebarItemProps = {
  title: String,
  dot: Boolean,
  badge: numericProp,
  badgeProps: Object,
  disabled: Boolean,
}
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>

export const sidebarItemEmits = {
  click: (val: Numeric) => isNumeric(val),
}
export type SidebarItemEmits = typeof sidebarItemEmits
