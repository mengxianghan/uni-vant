import type { Numeric } from '../utils'
import { createNamespace, isNumeric } from '../utils'

export const { name: sidebarName, bem: sidebarBem } = createNamespace('sidebar')

export const SIDEBAR_KEY = Symbol(sidebarName)

export const sidebarEmits = {
  change: (val: Numeric) => isNumeric(val),
}
export type SidebarEmits = typeof sidebarEmits
