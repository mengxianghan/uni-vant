import type { PropType } from 'vue'
import type { Numeric } from '../utils'

export type ConfigProviderTheme = 'light' | 'dark'

export type ConfigProviderThemeVarsScope = 'local' | 'global'

export interface ConfigProviderProvide {
  iconPrefix?: string
}

export type ThemeVars = PropType<Record<string, Numeric>>
