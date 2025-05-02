import { reactive, ref } from 'vue'
import { camelize, deepAssign } from '../utils'
import defaultMessages from './lang/zh-CN'

const lang = ref('zh-CN')

const messages = reactive<Record<string, unknown>>({
  'zh-CN': defaultMessages,
})

export const locale = {
  messages() {
    return messages[lang.value] || {}
  },

  use(newLang: string, newMessages: Record<string, unknown> = {}) {
    lang.value = newLang
    this.add({ [newLang]: newMessages })
  },

  add(newMessages: Record<string, unknown>) {
    deepAssign(messages, newMessages)
  },
}

export function t(name: string) {
  const prefix = `${camelize(name)}.`

  return (path: string, ...args: unknown[]) => {
    const messages = locale.messages()
    const message = Reflect.get(messages, `${prefix}${path}`) || Reflect.get(messages, path)

    return typeof message === 'function' ? message(...args) : message
  }
}

export default locale
