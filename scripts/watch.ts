import { execSync } from 'node:child_process'
import chokidar from 'chokidar'
import { debounce } from 'lodash-es'

function exec() {
  execSync('pnpm --prefix packages/uvant run build:web-types', { stdio: 'inherit' })
  execSync('pnpm --prefix packages/uvant run build', { stdio: 'inherit' })
}

const watcher = chokidar.watch(['./packages/uvant/src/'], {
  persistent: true,
  ignoreInitial: true,
})

watcher
  .on('change', debounce(exec, 300))
  .on('add', debounce(exec, 300))
  .on('unlink', debounce(exec, 300))

exec()
