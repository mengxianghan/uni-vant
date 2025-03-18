import type { ExtractPropTypes, PropType } from 'vue'
import type { Interceptor } from '../utils'
import type { StepperTheme } from './types'
import { createNamespace, makeNumericProp, numericProp, truthProp } from '../utils'

export const { name: stepperName, bem: stepperBem } = createNamespace('stepper')

export const stepperProps = {
  min: makeNumericProp(1),
  max: numericProp,
  autoFixed: truthProp,
  defaultValue: makeNumericProp(1),
  step: makeNumericProp(1),
  name: numericProp,
  inputWidth: numericProp,
  buttonSize: numericProp,
  decimalLength: numericProp,
  theme: String as PropType<StepperTheme>,
  placeholder: String,
  integer: Boolean,
  disabled: Boolean,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function as PropType<Interceptor>,
  showPlus: truthProp,
  showMinus: truthProp,
  showInput: truthProp,
  longPress: truthProp,
  allowEmpty: Boolean,
}
export type StepperProps = ExtractPropTypes<typeof stepperProps>
