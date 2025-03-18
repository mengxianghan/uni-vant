import type { ExtractPropTypes, PropType } from 'vue'
import type { Numeric } from '../utils'
import { createNamespace, makeStringProp } from '../utils'

export const { name: emptyName, bem: emptyBem } = createNamespace('empty')

export const PRESET_IMAGES = {
  error: 'https://img01.yzcdn.cn/vant/empty-image-error.png',
  search: 'https://img01.yzcdn.cn/vant/empty-image-search.png',
  network: 'https://img01.yzcdn.cn/vant/empty-image-network.png',
  default: 'https://img01.yzcdn.cn/vant/empty-image-default.png',
}

export const emptyProps = {
  image: makeStringProp('default'),
  imageSize: [Number, String, Array] as PropType<Numeric | [Numeric, Numeric]>,
  description: String,
}
export type EmptyProps = ExtractPropTypes<typeof emptyProps>
