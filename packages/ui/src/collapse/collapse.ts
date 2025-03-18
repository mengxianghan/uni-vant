import type { ExtractPropTypes, InjectionKey } from 'vue'
import type { Numeric } from '../utils'
import { createNamespace, isDef, truthProp } from '../utils'

export const { bem: collapseBem, name: collapseName } = createNamespace('collapse')

export interface CollapseProvide {
  toggle: (name: Numeric, expanded: boolean) => void
  isExpanded: (name: Numeric) => boolean
}

export const COLLAPSE_KEY: InjectionKey<CollapseProvide> = Symbol(collapseName)

export const collapseProps = {
  border: truthProp,
  accordion: Boolean,
}
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseEmits = {
  change: (name: Numeric | Numeric[]) => isDef(name) || name === '',
}
export type CollapseEmits = typeof collapseEmits
