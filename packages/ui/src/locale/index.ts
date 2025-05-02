import { get, mergeWith, template } from 'lodash-es'
import { reactive, ref } from 'vue'
import zhCN from './lang/zh-CN'

interface Messages {
  [key: string]: Record<string, unknown>
}

const messages: Messages = reactive({
  'zh-CN': zhCN,
})
const locale = ref('zh-CN')

interface Options {
  locale: string
  messages?: Record<string, unknown>
}

const defaultOptions = {
  locale: 'zh-CN',
}

export function createLocale(options: Options = defaultOptions) {
  if (options.locale) {
    locale.value = options.locale
  }

  if (options.messages) {
    mergeWith(messages, options.messages)
  }
}

export function useLocale() {
  function t(key: string, namedValue?: Record<string, unknown>, lang?: string) {
    const message = get(messages, `${lang || locale.value}.${key}`, key) as any
    return typeof message === 'function' ? message(...Object.values(namedValue || {})) : template(message, { interpolate: /\{\{([\s\S]+?)\}\}/g })(namedValue)
  }

  function setLang(lang: string, newMessages?: Record<string, unknown>) {
    if (newMessages) {
      addLang(newMessages)
    }
    locale.value = lang
  }

  function addLang(newMessages: Record<string, unknown>) {
    mergeWith(messages, newMessages)
  }

  return {
    t,
    setLang,
    addLang,
  }
}
