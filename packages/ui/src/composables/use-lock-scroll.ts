import type { Ref } from 'vue'
import { onMounted, onUnmounted, watch } from 'vue'

const LOCK_SCROLL_CLASS = 'van-overflow-hidden'
let locked = false

export function useLockScroll(options: {
  rootRef?: Ref<HTMLElement | undefined>
  shouldLock: () => boolean
}) {
  const { shouldLock } = options

  watch(shouldLock, (value) => {
    value ? lock() : unlock()
  })

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    destroy()
  })

  function lock() {
    if (locked) {
      return
    }

    // #ifdef MP-WEIXIN
    uni.setPageStyle({
      style: {
        overflow: 'hidden',
        height: '100vh',
      },
    })
    // #endif

    // #ifdef H5
    document.body.classList.add(LOCK_SCROLL_CLASS)
    // #endif

    locked = true
  }

  function unlock() {
    if (!locked) {
      return
    }

    // #ifdef MP-WEIXIN
    uni.setPageStyle({
      style: {
        overflow: '',
        height: '',
      },
    })
    // #endif

    // #ifdef H5
    document.body.classList.remove(LOCK_SCROLL_CLASS)
    // #endif

    locked = false
  }

  function init() {
    return shouldLock() && lock()
  }

  function destroy() {
    return shouldLock() && unlock()
  }
}
