import { reactive, ref } from 'vue'
import { deepAssign } from '../utils'
import defaultMessages from './lang/zh-CN'

const lang = ref('zh-CN')

const messages = reactive<Record<string, unknown>>({
  'zh-CN': defaultMessages,
})

export const Locale = {
  messages() {
    return messages[lang.value]
  },

  use(newLang: string, newMessages: Record<string, unknown> = {}) {
    lang.value = newLang
    this.add({ [newLang]: newMessages })
  },

  add(newMessages: Record<string, unknown>) {
    deepAssign(messages, newMessages)
  },
}

export const useCurrentLang = () => lang

export default Locale
