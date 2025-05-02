import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { navs } from './nav'
import { sidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'uni-vant',
  description: 'vant 风格的轻量级移动端 uniapp 组件库',
  head: [
    ['meta', { property: 'og:text', content: 'uni-vant' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'vant 风格的移动端组件库，完全适配uni-app',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://github.com/mengxianghan/uni-vant' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/logo.svg',
    nav: navs,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    aside: false,
  },
  srcDir: './src',
  // srcExclude: ['packages/uvant/src/locale/**/*.md', 'example'],
  // rewrites: {
  //   'docs/src/(.*)': '(.*)',
  //   'docs/src/guide/(.*)': 'guide/(.*)',
  //   'packages/uvant/src/components/:dirname/(.*)': 'components/:dirname.md',
  // },
  ignoreDeadLinks: true,
  vite: {
    plugins: [UnoCSS()],
    server: {
      port: 9999,
      strictPort: false,
    },
  },
})
