import type { InjectionKey } from 'vue'
import type { ConfigProviderProvide } from './types'
import { createNamespace } from '../utils'

const { name } = createNamespace('config-provider')

export const CONFIG_PROVIDER_KEY: InjectionKey<ConfigProviderProvide>
  = Symbol(name)
