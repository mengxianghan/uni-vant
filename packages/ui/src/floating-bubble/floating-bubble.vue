<script lang="ts" setup>
import type { FloatingBubbleBoundary, FloatingBubbleOffset } from './types'
import {
  computed,
  type CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  type PropType,
  ref,
  watch,
} from 'vue'
import { useTouch } from '../composables/use-touch'
import VanIcon from '../icon/icon.vue'
import {
  addUnit,
  closest,
  createUniqueSelector,
  getRect,
  pick,
  stopPropagation,
  windowHeight,
  windowWidth,
} from '../utils'
import { floatingBubbleBem as bem, floatingBubbleEmits, floatingBubbleProps, floatingBubbleName as name } from './floating-bubble'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(floatingBubbleProps)

const emit = defineEmits(floatingBubbleEmits)

const offset = defineModel('offset', {
  type: Object as unknown as PropType<FloatingBubbleOffset>,
  default: () => ({ x: -1, y: -1 }),
})

const [rootSelector] = createUniqueSelector(name)
const touch = useTouch()
const instance = getCurrentInstance()

let prevX = 0
let prevY = 0
let initialized = false
const show = ref(true)
const state = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})
const dragging = ref(false)

const rootStyles = computed(() => {
  const style: CSSProperties = {}

  const x = addUnit(state.value.x)
  const y = addUnit(state.value.y)
  style.transform = `translate3d(${x}, ${y}, 0)`

  if (dragging.value || !initialized) {
    style.transition = 'none'
  }

  return style
})
const boundary = computed<FloatingBubbleBoundary>(() => {
  return {
    top: props.gap,
    right: windowWidth.value - state.value.width - props.gap,
    bottom: windowHeight.value - state.value.height - props.gap,
    left: props.gap,
  }
})

watch([windowWidth, windowHeight, () => props.gap], updateState, { deep: true })

onMounted(() => {
  nextTick(() => {
    updateState()
  })
})

function onTouchStart(evt: TouchEvent) {
  touch.start(evt)
  dragging.value = true

  prevX = state.value.x
  prevY = state.value.y
}

function onTouchMove(evt: TouchEvent) {
  evt.preventDefault()

  touch.move(evt)

  if (props.axis === 'lock')
    return

  if (!touch.isTap.value) {
    if (props.axis === 'x' || props.axis === 'xy') {
      let nextX = prevX + touch.deltaX.value
      if (nextX < boundary.value.left)
        nextX = boundary.value.left
      if (nextX > boundary.value.right)
        nextX = boundary.value.right
      state.value.x = nextX
    }

    if (props.axis === 'y' || props.axis === 'xy') {
      let nextY = prevY + touch.deltaY.value
      if (nextY < boundary.value.top)
        nextY = boundary.value.top
      if (nextY > boundary.value.bottom)
        nextY = boundary.value.bottom
      state.value.y = nextY
    }

    offset.value = pick(state.value, ['x', 'y'])
    updateState()
  }
}

function onTouchEnd() {
  dragging.value = false

  nextTick(() => {
    if (props.magnetic === 'x') {
      state.value.x = closest([boundary.value.left, boundary.value.right], state.value.x)
    }
    if (props.magnetic === 'y') {
      state.value.y = closest([boundary.value.top, boundary.value.bottom], state.value.y)
    }

    if (!touch.isTap.value) {
      const _offset = pick(state.value, ['x', 'y'])
      offset.value = _offset
      updateState()
      if (prevX !== _offset.x || prevY !== _offset.y) {
        emit('offsetChange', _offset)
      }
    }
  })
}

function onClick(evt: MouseEvent) {
  if (touch.isTap.value) {
    emit('click', evt)
  }
  else {
    stopPropagation(evt)
  }
}

function updateState() {
  // onDeactivated with window size change will cause this
  if (!show.value)
    return

  getRect(instance.proxy, `.${rootSelector}`).then((rect) => {
    const { width, height } = rect
    state.value = {
      x: offset.value.x > -1 ? offset.value.x : windowWidth.value - width - props.gap,
      y: offset.value.y > -1 ? offset.value.y : windowHeight.value - height - props.gap,
      width,
      height,
    }

    nextTick(() => {
      initialized = true
    })
  })
}
</script>

<template>
  <view
    v-show="show"
    :class="[bem(), rootSelector]"
    :style="rootStyles"
    @touchstart.passive="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @click.capture="onClick"
  >
    <slot>
      <view :class="bem('icon')">
        <van-icon :name="props.icon" />
      </view>
    </slot>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
