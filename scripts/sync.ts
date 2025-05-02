import chokidar from 'chokidar'
import { consola } from 'consola'
import dayjs from 'dayjs'
import fse from 'fs-extra'
import { debounce } from 'lodash-es'

function sync(name: string, targetPath: string) {
  fse.removeSync(targetPath)
  fse.ensureDirSync(targetPath)
  fse.copySync('example/src/uni_modules/uvant', targetPath)
  consola.success(`[${name}] 同步成功 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`)
}

async function exec() {
  sync('知学', '/Users/mengxianghan/Documents/02-code/07-zhangliping/zhixue/src/uni_modules/uvant')
  sync('53伴学', '/Users/mengxianghan/Documents/02-code/02-quyixian/resource/src/uni_modules/uvant')
  consola.success(`------------------🚧 ${dayjs().format('YYYY-MM-DD HH:mm:ss')} 🚧------------------`)
}

const watcher = chokidar.watch(['example/src/uni_modules/uvant/'], {
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: true,
})

watcher
  .on('change', debounce(exec, 300))

exec()
