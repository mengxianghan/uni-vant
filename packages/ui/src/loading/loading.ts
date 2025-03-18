import type { ExtractPropTypes } from 'vue'
import type { LoadingType } from './types'
import { createNamespace, makeStringProp, numericProp } from '../utils'

export const { name: loadingName, bem: loadingBem } = createNamespace('loading')

export const loadingProps = {
  color: String,
  type: makeStringProp<LoadingType>('circular'),
  size: numericProp,
  textSize: numericProp,
  textColor: String,
  vertical: Boolean,
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
