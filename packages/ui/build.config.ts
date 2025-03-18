import dayjs from 'dayjs'
import fse from 'fs-extra'
import { defineBuildConfig } from 'unbuild'

const { remove, copy, ensureDir } = fse
const target = '../../example/src/uni_modules/uvant'

export default defineBuildConfig({
  entries: [
    './src/index.ts',
    {
      builder: 'copy',
      input: './src/',
      outDir: './dist',
      pattern: ['**/*', '!index.ts'],
    },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: ['vue', 'lodash-es', '@uni-helper/uni-app-types'],
  failOnWarn: false,
  hooks: {
    'build:before': () => {
      console.log('[uni-vant-ui] 开始构建')
      // execSync('esno scripts/web-types.ts')
    },
    'build:done': async () => {
      await remove(target)
      await ensureDir(target)
      await copy('./dist', target)
      await copy('./scripts/package.json', `${target}/package.json`)
      await copy('./attributes.json', `${target}/attributes.json`)
      await copy('./tags.json', `${target}/tags.json`)
      await copy('./web-types.json', `${target}/web-types.json`)

      console.log(`[uni-vant-ui] 构建完成，${dayjs().format('YYYY-MM-DD HH:mm:ii')}`)
    },
  },
})
