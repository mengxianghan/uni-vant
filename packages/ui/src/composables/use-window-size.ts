import { ref } from 'vue'
import { getSystemInfoSync, isPC } from '../utils'

export function useWindowSize() {
  const width = ref<number>(0)
  const height = ref<number>(0)

  update()

  const { uniPlatform } = getSystemInfoSync()

  if (uniPlatform === 'web') {
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update, { passive: true })
  }

  if (!isPC && uniPlatform === 'mp-weixin') {
    uni.startDeviceMotionListening({
      success: update,
    })
  }

  function update() {
    const systemInfo = uni.getSystemInfoSync()
    width.value = systemInfo.windowWidth
    height.value = systemInfo.windowHeight
  }

  return { width, height }
}
