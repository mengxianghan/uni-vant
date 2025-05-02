import { computed, ref } from 'vue'
import { defaultTo, isDef, isFunction, type Numeric } from '../utils'

interface OptionCallback {
  onBeforeEnter?: () => void
  onEnter?: () => void
  onAfterEnter?: () => void
  onBeforeLeave?: () => void
  onLeave?: () => void
  onAfterLeave?: () => void
}

type Option = OptionCallback & {
  name: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
  duration?: Numeric
  zIndex?: Numeric
}

export function useCSSAnimation(_options: Option) {
  const options = ref<Option>({
    ..._options,
  })
  const classes = ref('')
  const display = ref(false)
  const visible = ref(false)

  const styles = computed(() => {
    return {
      animationDuration: isDef(options.value.duration)
        ? `${options.value.duration}s`
        : '',
      display: display.value ? 'block' : 'none',
      zIndex: defaultTo(options.value.zIndex, ''),
    }
  })

  function open(_options: Option) {
    setOption(_options)
    if (!isDef(options.value.name)) {
      return
    }
    visible.value = true
    display.value = true
    dispatch('onBeforeEnter')
    classes.value = getClassNames('enter')
  }

  function close() {
    if (!isDef(options.value.name)) {
      return
    }
    visible.value = false
    dispatch('onBeforeLeave')
    classes.value = getClassNames('leave')
  }

  function getClassNames(
    key: 'enter' | 'enter-to' | 'leave' | 'leave-to',
  ): string {
    const classes = {
      'enter': `${options.value.name}-enter-from ${options.value.name}-enter-active`,
      'enter-to': `${options.value.name}-enter-to ${options.value.name}-enter-active`,
      'leave': `${options.value.name}-leave-from ${options.value.name}-leave-active`,
      'leave-to': `${options.value.name}-leave-to ${options.value.name}-leave-active`,
    }

    return classes[key]
  }

  function onAnimationstart() {
    if (visible.value) {
      classes.value = getClassNames('enter-to')
      dispatch('onEnter')
    }
    else {
      classes.value = getClassNames('leave-to')
      dispatch('onLeave')
    }
  }

  function onAnimationend() {
    classes.value = ''
    display.value = visible.value

    if (visible.value) {
      dispatch('onAfterEnter')
    }
    else {
      dispatch('onAfterLeave')
    }
  }

  function setOption(_options = {}) {
    options.value = {
      ...options.value,
      ..._options,
    }
  }

  function dispatch(name: keyof OptionCallback) {
    if (isFunction(options.value[name])) {
      options.value[name]()
    }
  }

  return {
    classes,
    styles,
    onAnimationstart,
    onAnimationend,
    open,
    close,
    setOption,
    visible,
  }
}
