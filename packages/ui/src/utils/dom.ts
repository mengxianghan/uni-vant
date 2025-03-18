import { useWindowSize } from '../composables/use-window-size'

export const stopPropagation = (event: Event) => event.stopPropagation()

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

export function getRect(component: any, selector: string): Promise<UniApp.NodeInfo> {
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .in(component)
      .select(selector)
      .boundingClientRect((res) => {
        resolve(res as UniApp.NodeInfo)
      })
      .exec()
  })
}

export const { width: windowWidth, height: windowHeight } = useWindowSize()
