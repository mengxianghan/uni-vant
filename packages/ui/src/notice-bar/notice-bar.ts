import type { ExtractPropTypes, PropType } from 'vue'
import type { NoticeBarMode } from './types'
import { createNamespace, isObject, makeNumberProp } from '../utils'

export const { name: noticeBarName, bem: noticeBarBem } = createNamespace('notice-bar')

export const noticeBarProps = {
  text: String,
  mode: String as PropType<NoticeBarMode>,
  color: String,
  delay: makeNumberProp(1),
  speed: makeNumberProp(60),
  leftIcon: String,
  wrapable: Boolean,
  background: String,
  scrollable: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
}
export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>

export const noticeBarEmits = {
  close: (evt: MouseEvent) => isObject(evt),
  replay: () => true,
}
export type NoticeBarEmits = typeof noticeBarEmits
