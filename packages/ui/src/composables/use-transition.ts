import type { SetupContext } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
import { camelCase, isObject, requestAnimationFrame } from '../utils'

function getClassNames(name: string) {
  return {
    'enter': `${name}-enter ${name}-enter-active`,
    'enter-to': `${name}-enter-to ${name}-enter-active`,
    'leave': `${name}-leave ${name}-leave-active`,
    'leave-to': `${name}-leave-to ${name}-leave-active`,
  }
}

interface UseTransitionProps {
  duration: number | { enter: number, leave: number }
  name: string
  show: boolean
  destroyOnClose: boolean
}

export function useTransition<T extends UseTransitionProps, K extends SetupContext>(props: T, { emit }: K) {
  const initialized = ref(false)
  const display = ref(false)
  const enterPromise = ref<Promise<void> | null>()
  const status = ref()
  const classes = ref('')
  const currentDuration = ref()
  const transitionEnded = ref(false)

  const styles = computed(() => ({
    transitionDuration: `${currentDuration.value}ms`,
    animationDuration: `${currentDuration.value}ms`,
    display: !display.value ? 'none' : '',
  }))

  watch(
    () => props.show,
    (val, oval) => {
      if (val === oval) {
        return
      }

      val ? ensureEnter() : ensureLeave()
    },
  )

  onMounted(() => {
    if (props.show) {
      ensureEnter()
    }
  })

  function ensureEnter() {
    if (enterPromise.value)
      return

    enterPromise.value = new Promise(resolve => enter(resolve))
  }

  function ensureLeave() {
    if (!enterPromise.value)
      return

    enterPromise.value
      .then(() => new Promise(resolve => leave(resolve)))
      .then(() => {
        enterPromise.value = null
      })
  }

  function enter(resolve: () => void) {
    const classNames = getClassNames(props.name)
    const duration = isObject(props.duration)
      ? props.duration.enter
      : props.duration

    if (status.value === 'enter') {
      return
    }

    status.value = 'enter'
    emit('beforeEnter')

    requestAnimationFrame(() => {
      if (status.value !== 'enter') {
        return
      }

      emit('enter')

      initialized.value = true
      display.value = true
      classes.value = classNames.enter
      currentDuration.value = duration

      requestAnimationFrame(() => {
        if (status.value !== 'enter') {
          return
        }

        transitionEnded.value = false

        setTimeout(() => {
          onTransitionEnd()
          resolve()
        }, currentDuration.value)

        classes.value = classNames['enter-to']
      })
    })
  }

  function leave(resolve: (value?: unknown) => void) {
    if (!display.value)
      return

    const classNames = getClassNames(props.name)
    const duration = isObject(props.duration)
      ? props.duration.leave
      : props.duration

    status.value = 'leave'
    emit('beforeLeave')

    requestAnimationFrame(() => {
      if (status.value !== 'leave') {
        return
      }

      emit('leave')

      classes.value = classNames.leave
      currentDuration.value = duration

      requestAnimationFrame(() => {
        if (status.value !== 'leave') {
          return
        }

        transitionEnded.value = false

        setTimeout(() => {
          onTransitionEnd()
          resolve()
        }, currentDuration.value)

        classes.value = classNames['leave-to']
      })
    })
  }

  function onTransitionEnd() {
    if (transitionEnded.value)
      return

    transitionEnded.value = true
    emit(camelCase(`after-${status.value}`))

    if (!props.show && display.value) {
      display.value = false
    }

    if (!props.show && !display.value && props.destroyOnClose) {
      initialized.value = false
    }
  }

  return {
    initialized,
    classes,
    styles,
  }
}
