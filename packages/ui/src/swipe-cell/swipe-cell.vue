<script lang="ts" setup>
import type { SwipeCellPosition } from './types'
import { getCurrentInstance, nextTick, onMounted, reactive, useSlots } from 'vue'
import { useTouch } from '../composables/use-touch'
import {
  callInterceptor,
  clamp,
  createUniqueSelector,
  getRect,
  isDef,
  preventDefault,
  stopPropagation,
} from '../utils'
import { swipeCellBem as bem, swipeCellName as name, swipeCellEmits, swipeCellProps } from './swipe-cell'

defineOptions({
  name,
  options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' },
})

const props = defineProps(swipeCellProps)

const emit = defineEmits(swipeCellEmits)

const slots = useSlots()
const touch = useTouch()

const instance = getCurrentInstance()
const [leftSelector, rightSelector] = createUniqueSelector(name, 2)

let opened: boolean
let lockClick: boolean
let startOffset: number
let isInBeforeClosing: boolean

const state = reactive({
  offset: 0,
  dragging: false,
  leftWidth: 0,
  rightWidth: 0,
})

onMounted(() => {
  nextTick(() => {
    getLeftWidth()
    getRightWidth()
  })
})

function getClickHandler(evt: MouseEvent, position: SwipeCellPosition, stop: boolean) {
  if (stop) {
    stopPropagation(evt)
  }

  if (lockClick) {
    return
  }

  onClick(position, evt)
}

function onClick(position: SwipeCellPosition, evt: MouseEvent) {
  if (isInBeforeClosing)
    return

  emit('click', position)

  if (opened && !lockClick) {
    isInBeforeClosing = true
    callInterceptor(props.beforeClose, {
      args: [
        {
          event: evt,
          name: props.name,
          position,
        },
      ],
      done: () => {
        isInBeforeClosing = false
        close(position)
      },
      canceled: () => (isInBeforeClosing = false),
      error: () => (isInBeforeClosing = false),
    })
  }
}

function onTouchStart(evt: TouchEvent) {
  if (!props.disabled) {
    startOffset = state.offset
    touch.start(evt)
  }
}

function onTouchMove(evt: TouchEvent) {
  if (props.disabled) {
    return
  }

  const { deltaX } = touch
  touch.move(evt)

  if (touch.isHorizontal()) {
    lockClick = true
    state.dragging = true

    const isEdge = !opened || deltaX.value * startOffset < 0
    if (isEdge) {
      preventDefault(evt, props.stopPropagation)
    }

    state.offset = clamp(deltaX.value + startOffset, -state.rightWidth, state.leftWidth)
  }
}

function onTouchEnd() {
  if (state.dragging) {
    state.dragging = false
    toggle(state.offset > 0 ? 'left' : 'right')

    // compatible with desktop scenario
    setTimeout(() => {
      lockClick = false
    }, 0)
  }
}

function open(side: SwipeCellPosition) {
  state.offset = side === 'left' ? state.leftWidth : -state.rightWidth

  if (!opened) {
    opened = true
    emit('open', {
      name: props.name,
      position: side,
    })
  }
}

function close(position: SwipeCellPosition) {
  state.offset = 0

  if (opened) {
    opened = false
    emit('close', {
      name: props.name,
      position,
    })
  }
}

function getLeftWidth() {
  getRect(instance.proxy, `.${leftSelector}`).then((rect) => {
    const width = rect ? rect.width : 0
    state.leftWidth = isDef(props.leftWidth) ? +props.leftWidth : width
  })
}

function getRightWidth() {
  getRect(instance.proxy, `.${rightSelector}`).then((rect) => {
    const width = rect ? rect.width : 0
    state.rightWidth = isDef(props.rightWidth) ? +props.rightWidth : width
  })
}

function toggle(side: SwipeCellPosition) {
  const offset = Math.abs(state.offset)
  const THRESHOLD = 0.15
  const threshold = opened ? 1 - THRESHOLD : THRESHOLD
  const width = side === 'left' ? state.leftWidth : state.rightWidth

  if (width && offset > width * threshold) {
    open(side)
  }
  else {
    close(side)
  }
}
</script>

<template>
  <view :class="bem()">
    <view
      :class="bem('wrapper')"
      :style="{
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? '0s' : '.6s',
      }"
      @click="(e) => getClickHandler(e, 'cell', lockClick)"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
      @touchmove.stop="onTouchMove"
    >
      <template v-if="slots.left">
        <view
          :class="[bem('left'), leftSelector]"
          @click="(e) => getClickHandler(e, 'left', true)"
        >
          <slot name="left" />
        </view>
      </template>
      <slot />
      <template v-if="slots.right">
        <view
          :class="[bem('right'), rightSelector]"
          @click="(e) => getClickHandler(e, 'right', true)"
        >
          <slot name="right" />
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
