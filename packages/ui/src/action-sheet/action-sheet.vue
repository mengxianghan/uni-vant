<script lang="ts" setup>
import type { ActionSheetAction } from './types'
import { nextTick, useSlots } from 'vue'
import { HAPTICS_FEEDBACK } from '../constants'
import VanIcon from '../icon/icon.vue'
import VanLoading from '../loading/loading.vue'
import VanPopup from '../popup/popup.vue'
import { actionSheetProps, actionSheetBem as bem, actionSheetName as name } from './action-sheet'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(actionSheetProps)

const emit = defineEmits(['select', 'cancel'])

const slots = useSlots()

const show = defineModel<boolean>('show')

function updateShow(visible: boolean) {
  show.value = visible
}

function onCancel() {
  updateShow(false)
  emit('cancel')
}

function onClick(action: ActionSheetAction, index: number) {
  if (action.disabled || action.loading) {
    return
  }

  if (action.callback) {
    action.callback(action)
  }

  if (props.closeOnClickAction) {
    updateShow(false)
  }

  nextTick(() => {
    emit('select', action, index)
  })
}
</script>

<template>
  <van-popup
    v-model:show="show"
    :z-index="props.zIndex"
    :overlay="props.overlay"
    :duration="props.duration"
    :lock-scroll="props.lockScroll"
    :before-close="props.beforeClose"
    :overlay-style="props.overlayStyle"
    :overlay-class="props.overlayClass"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :custom-class="bem()"
    safe-area-inset-bottom
    round
    position="bottom"
  >
    11111
    <!-- header -->
    <template v-if="title">
      <view :class="bem('header')">
        {{ title }}
        <template v-if="props.closeable">
          <view :class="[bem('close'), HAPTICS_FEEDBACK]">
            <van-icon
              :name="props.closeIcon"
              @click="onCancel"
            />
          </view>
        </template>
      </view>
    </template>
    <!-- description -->
    <template v-if="props.description || slots.description">
      <view :class="bem('description')">
        <slot name="description">
          {{ props.description }}
        </slot>
      </view>
    </template>
    <!-- content -->
    <view :class="bem('content')">
      <view
        v-for="(action, index) in actions"
        :key="index"
        :class="[bem('item', { loading: action.loading, disabled: action.disabled }), action.className]"
        :style="{ color: action.color }"
        @click="onClick(action, index)"
      >
        <template v-if="action.icon">
          <view :class="bem('item-icon')">
            <van-icon :name="action.icon" />
          </view>
        </template>
        <template v-if="action.loading">
          <view :class="bem('loading-icon')">
            <van-loading />
          </view>
        </template>
        <view :class="bem('name')">
          {{ action.name }}
        </view>
        <template v-if="action.subname">
          <view :class="bem('subname')">
            {{ action.subname }}
          </view>
        </template>
      </view>
      <slot />
    </view>
    <!-- cancel -->
    <template v-if="slots.cancel || props.cancelText">
      <view :class="bem('gap')" />
      <view
        :class="bem('cancel')"
        @click="onCancel"
      >
        <slot name="cancel">
          {{ props.cancelText }}
        </slot>
      </view>
    </template>
  </van-popup>
</template>

<style lang="scss">
@import './index';
</style>
