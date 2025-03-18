import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'
import 'virtual:uno.css'

export default {
  // extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {})
  },
} satisfies Theme
