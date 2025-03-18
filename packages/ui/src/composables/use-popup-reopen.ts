import type { InjectionKey } from 'vue'
import { inject, watch } from 'vue'

// eslint-disable-next-line symbol-description
export const POPUP_TOGGLE_KEY: InjectionKey<() => boolean> = Symbol()

export function onPopupReopen(callback: () => void) {
  const popupToggleStatus = inject(POPUP_TOGGLE_KEY, null)

  if (popupToggleStatus) {
    watch(popupToggleStatus, (show) => {
      if (show) {
        callback()
      }
    })
  }
}
