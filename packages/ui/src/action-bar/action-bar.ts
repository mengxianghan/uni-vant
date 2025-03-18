import type { ExtractPropTypes } from 'vue'
import { createNamespace, truthProp } from '../utils'

export const { name: actionBarName, bem: actionBarBem } = createNamespace('action-bar')

export const ACTION_BAR_KEY = Symbol(actionBarName)

export const actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: truthProp,
  fixed: truthProp,
}
export type ActionBarProps = ExtractPropTypes<typeof actionBarProps>
