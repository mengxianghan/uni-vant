<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useTouch } from '../composables/use-touch'
import {
  addUnit,
  closest,
  defaultTo,
  getSystemInfoSync,
  preventDefault,
} from '../utils'
import { floatingPanelBem as bem, floatingPanelProps, floatingPanelName as name } from './floating-panel'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(floatingPanelProps)

const emit = defineEmits(['heightChange'])

const height = defineModel<number>('height', { default: 0 })
const open = defineModel('open', { type: Boolean })
const touch = useTouch()

let startY: number
let maxScroll: number = -1
const DAMP = 0.2
const dragging = ref(false)
const scrollTop = ref(0)

const boundary = computed(() => {
  const { windowHeight } = getSystemInfoSync()
  return {
    min: defaultTo(props.anchors[0], 100),
    max: defaultTo(props.anchors[props.anchors.length - 1], Math.round(windowHeight * 0.6)),
  }
})
const anchors = computed(() => (props.anchors.length >= 2 ? props.anchors : [boundary.value.min, boundary.value.max]))
const styles = computed(() => ({
  height: addUnit(boundary.value.max),
  transform: `translateY(calc(100% + ${addUnit(-height.value)}))`,
  transition: !dragging.value ? `transform ${props.duration}ms cubic-bezier(0.18, 0.89, 0.32, 1.28)` : 'none',
}))

watch(
  boundary,
  () => {
    height.value = closest(anchors.value, height.value)
  },
  { immediate: true },
)

onMounted(() => {
  if (open.value) {
    toggle(open.value)
  }
})

function ease(moveY: number): number {
  const absDistance = Math.abs(moveY)
  const { min, max } = boundary.value

  if (absDistance > max) {
    return -(max + (absDistance - max) * DAMP)
  }

  if (absDistance < min) {
    return -(min - (min - absDistance) * DAMP)
  }

  return moveY
}

function onTouchstart(e: TouchEvent) {
  touch.start(e)
  dragging.value = true
  startY = -height.value
  maxScroll = -1
}

function onTouchmove(e: TouchEvent) {
  touch.move(e)

  maxScroll = Math.max(maxScroll, scrollTop.value)

  if (-startY < boundary.value.max) {
    preventDefault(e, true)
  }
  else if (!(scrollTop.value <= 0 && touch.deltaY.value > 0) || maxScroll > 0) {
    return
  }

  const moveY = touch.deltaY.value + startY
  height.value = -ease(moveY)
}

function onTouchend() {
  maxScroll = -1
  dragging.value = false
  height.value = closest(anchors.value, height.value)

  if (height.value !== -startY) {
    emit('heightChange', { height: height.value })
  }

  open.value = height.value !== boundary.value.min
}

function onScroll(e) {
  scrollTop.value = e.detail.scrollTop
}

function toggle(visible = !open.value) {
  height.value = visible ? boundary.value.max : boundary.value.min
  open.value = visible
  emit('heightChange', { height: height.value })
}
</script>

<template>
  <view
    :class="[
      bem(),
      {
        'van-safe-area-bottom': props.safeAreaInsetBottom,
      },
    ]"
    :style="styles"
    @touchstart="(evt) => (props.contentDraggable ? onTouchstart(evt) : '')"
    @touchmove="(evt) => (props.contentDraggable ? onTouchmove(evt) : '')"
    @touchend="() => (props.contentDraggable ? onTouchend() : '')"
    @touchcancel="() => (props.contentDraggable ? onTouchend() : '')"
  >
    <view
      :class="bem('header')"
      @touchstart="(evt) => (!props.contentDraggable ? onTouchstart(evt) : '')"
      @touchmove="(evt) => (!props.contentDraggable ? onTouchmove(evt) : '')"
      @touchend="() => (!props.contentDraggable ? onTouchend() : '')"
      @touchcancel="() => (!props.contentDraggable ? onTouchend() : '')"
    >
      <slot name="header">
        <view :class="bem('header-bar')" />
      </slot>
    </view>
    <scroll-view
      :scroll-y="open"
      :class="bem('content')"
      @scroll="onScroll"
    >
      <slot />
    </scroll-view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
