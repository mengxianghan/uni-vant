<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue'
import VanIcon from '../icon/icon.vue'
import { createUniqueSelector, getRect, requestAnimationFrame } from '../utils'
import { noticeBarBem as bem, noticeBarName as name, noticeBarEmits, noticeBarProps } from './notice-bar'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(noticeBarProps)

const emit = defineEmits(noticeBarEmits)

const slots = useSlots()

const wrapWidth = ref(0)
const contentWidth = ref(0)
const contentDuration = ref(0)
const duration = ref(0)
const show = ref(true)
const timer = ref()
const animationData = ref()
const resetAnimation = ref()
const animation = ref()

const [contentSelector, wrapSelector] = createUniqueSelector(name, 2)
const instance = getCurrentInstance()

const hasLeftIcon = computed(() => slots['left-icon'] || props.leftIcon)
const hasRightIcon = computed(() => slots['right-icon'] || getRightIconName())
const ellipsis = computed(() => !props.scrollable && !props.wrapable)

watch([() => props.speed, () => props.text], () => {
  init()
})

resetAnimation.value = uni.createAnimation({
  duration: 0,
  timingFunction: 'linear',
})

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  timer.value && clearTimeout(timer.value)
})

function init() {
  requestAnimationFrame(() => {
    Promise.all([getRect(instance.proxy, `.${contentSelector}`), getRect(instance.proxy, `.${wrapSelector}`)]).then(
      (rects) => {
        const [contentRect, wrapRect] = rects
        if (
          contentRect == null
          || wrapRect == null
          || !contentRect.width
          || !wrapRect.width
          || props.scrollable === false
        ) {
          return
        }

        if (props.scrollable || wrapRect.width < contentRect.width) {
          initAnimation(wrapRect.width, contentRect.width)

          scroll(true)
        }
      },
    )
  })
}

function initAnimation(_wrapWidth, _contentWidth) {
  wrapWidth.value = _wrapWidth
  contentWidth.value = _contentWidth

  // begin 0
  contentDuration.value = (contentWidth.value / props.speed) * 1000
  // begin -wrapWidth
  duration.value = ((wrapWidth.value + contentWidth.value) / props.speed) * 1000

  animation.value = uni.createAnimation({
    duration: contentDuration.value,
    timingFunction: 'linear',
    delay: props.delay,
  })
}

function scroll(isInit = false) {
  timer.value && clearTimeout(timer.value)
  timer.value = null

  resetAnimation.value.translateX(isInit ? 0 : wrapWidth.value).step()
  animationData.value = resetAnimation.value.export()

  const _duration = isInit ? contentDuration.value : duration.value

  requestAnimationFrame(() => {
    animation.value.translateX(-contentWidth.value).step({ duration: _duration })
    animationData.value = animation.value.export()
  })

  timer.value = setTimeout(() => {
    scroll()
  }, _duration + props.delay)
}

function getRightIconName() {
  if (props.mode === 'closeable') {
    return 'cross'
  }
  if (props.mode === 'link') {
    return 'arrow'
  }
}

function onClickRightIcon(evt: MouseEvent) {
  if (props.mode === 'closeable') {
    show.value = false
    emit('close', evt)
  }
}
</script>

<template>
  <view
    v-show="show"
    :class="bem()"
    :style="{ color: props.color, background: props.background }"
  >
    <template v-if="hasLeftIcon">
      <slot name="left-icon">
        <view :class="bem('left-icon')">
          <van-icon :name="props.leftIcon" />
        </view>
      </slot>
    </template>

    <view :class="[bem('wrap'), wrapSelector]">
      <view
        :class="[bem('content'), { 'van-ellipsis': ellipsis }, contentSelector]"
        :animation="animationData"
      >
        <slot>{{ props.text }}</slot>
      </view>
    </view>

    <template v-if="hasRightIcon">
      <slot name="right-icon">
        <view
          :class="bem('right-icon')"
          @click="onClickRightIcon"
        >
          <van-icon :name="getRightIconName()" />
        </view>
      </slot>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
