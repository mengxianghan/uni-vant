import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import autoprefixer from 'autoprefixer'
import postcssRemToResponsivePixel from 'postcss-rem-to-responsive-pixel'
import tailwindcss from 'tailwindcss'
import { defineConfig } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UniLayouts(),
    uni(),
    UnifiedViteWeappTailwindcssPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    strictPort: false,
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
        postcssRemToResponsivePixel({
          rootValue: 16,
          propList: ['*'],
          transformUnit: 'px',
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@packages': resolve(__dirname, '../../packages'),
    },
  },
})
