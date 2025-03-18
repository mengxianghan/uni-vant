import type { ExtractPropTypes } from 'vue'
import { createNamespace, numericProp, unknownProp } from '../utils'

export const { name: switchName, bem: switchBem } = createNamespace('switch')

export const switchProps = {
  loading: Boolean,
  disabled: Boolean,
  size: numericProp,
  activeColor: String,
  inactiveColor: String,
  activeValue: {
    type: unknownProp,
    default: true as unknown,
  },
  inactiveValue: {
    type: unknownProp,
    default: false as unknown,
  },
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
