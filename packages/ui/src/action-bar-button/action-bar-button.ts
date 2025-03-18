import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonType } from '../button'
import { createNamespace, isObject } from '../utils'

export const { name: actionBarButtonName, bem: actionBarButtonBem } = createNamespace('action-bar-button')

export const actionBarButtonProps = {
  text: String,
  type: String as PropType<ButtonType>,
  color: String,
  icon: String,
  disabled: Boolean,
  loading: Boolean,
}
export type ActionBarButtonProps = ExtractPropTypes<typeof actionBarButtonProps>

export const actionBarButtonEmits = {
  click: (evt: MouseEvent) => isObject(evt),
}
export type ActionBarButtonEmits = typeof actionBarButtonEmits
