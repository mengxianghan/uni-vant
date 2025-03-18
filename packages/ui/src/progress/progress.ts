import type { ExtractPropTypes } from 'vue'
import { createNamespace, type Numeric, numericProp, truthProp } from '../utils'

export const { name: progressName, bem: progressBem } = createNamespace('progress')

export const progressProps = {
  color: String,
  inactive: Boolean,
  pivotText: String,
  textColor: String,
  showPivot: truthProp,
  pivotColor: String,
  trackColor: String,
  strokeWidth: numericProp,
  percentage: {
    type: numericProp,
    default: 0,
    validator: (value: Numeric) => +value >= 0 && +value <= 100,
  },
}
export type ProgressProps = ExtractPropTypes<typeof progressProps>
