import { createNamespace, unknownProp } from '../utils'

export const vcPlaceholderProps = {
  disabled: Boolean,
  height: unknownProp,
  bem: { type: Function, default: () => {} },
}

export const { name: placeholderName } = createNamespace('placeholder')

export const PLACEHOLDER_KEY = Symbol(placeholderName)
