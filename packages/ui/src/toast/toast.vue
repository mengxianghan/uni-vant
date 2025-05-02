<script lang="ts" setup>
import { computed, useSlots, watch } from 'vue'
import VanIcon from '../icon/icon.vue'
import VanLoading from '../loading/loading.vue'
import VanPopup from '../popup/popup.vue'
import { isDef } from '../utils'
import { lockClick } from './lock-click'
import { toastBem, toastName, toastProps } from './toast'

defineOptions({
  name: toastName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(toastProps)
const emit = defineEmits(['update:show'])

const slots = useSlots()

let timer: ReturnType<typeof setTimeout>
let clickable = false

const hasIcon = computed(() => props.icon || props.type === 'success' || props.type === 'fail')

watch(() => [props.show, props.forbidClick], toggleClickable)

watch(
  () => [props.show, props.type, props.message, props.duration],
  () => {
    clearTimer()
    if (props.show && props.duration > 0) {
      timer = setTimeout(() => {
        updateShow(false)
      }, props.duration)
    }
  },
)

function toggleClickable() {
  const newValue = props.show && props.forbidClick
  if (clickable !== newValue) {
    clickable = newValue
    lockClick(clickable)
  }
}

function updateShow(show: boolean) {
  emit('update:show', show)
}

function onClick() {
  if (props.closeOnClick) {
    updateShow(false)
  }
}

function clearTimer() {
  clearTimeout(timer)
}
</script>

<template>
  <van-popup
    :lock-scroll="false"
    :show="props.show"
    :overlay="props.overlay"
    :transition="props.transition"
    :overlay-class="props.overlayClass"
    :overlay-style="props.overlayStyle"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :z-index="props.zIndex"
    :custom-style="{
      '--van-popup-background': 'transparent',
    }"
    @click="onClick"
    @closed="clearTimer()"
    @update:show="updateShow"
  >
    <view
      :class="[
        toastBem([
          props.position,
          props.wordBreak === 'normal' ? 'break-normal' : props.wordBreak,
          { [props.type]: !props.icon },
        ]),
        props.className,
        props.customClass,
      ]"
      :style="props.customStyle"
    >
      <!-- icon -->
      <template v-if="hasIcon">
        <view :class="toastBem('icon')">
          <van-icon
            :name="props.icon || props.type"
            :class-prefix="props.iconPrefix"
            :size="props.iconSize"
          />
        </view>
      </template>
      <template v-if="!hasIcon && props.type === 'loading'">
        <view :class="toastBem('loading')">
          <van-loading
            :size="props.iconSize"
            :type="props.loadingType"
          />
        </view>
      </template>

      <!-- message -->
      <template v-if="slots.message">
        <view :class="toastBem('text')">
          <slot name="message" />
        </view>
      </template>
      <template v-if="isDef(props.message)">
        <view :class="toastBem('text')">
          <template v-if="props.type === 'html'">
            <rich-text :nodes="props.message" />
          </template>
          <template v-else>
            {{ props.message }}
          </template>
        </view>
      </template>
    </view>
  </van-popup>
</template>

<style lang="scss">
@import './index.scss';
</style>
