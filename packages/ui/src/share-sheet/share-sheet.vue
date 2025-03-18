<script lang="ts" setup>
import type { ShareSheetOption } from './types'
import { computed, useSlots } from 'vue'
import { HAPTICS_FEEDBACK } from '../constants'
import VanIcon from '../icon/icon.vue'
import VanPopup from '../popup/popup.vue'
import {
  defaultTo,
  isImageUrl,
} from '../utils'
import { shareSheetBem as bem, shareSheetName as name, shareSheetEmits, shareSheetProps, shareSheetT as t } from './share-sheet'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(shareSheetProps)

const emit = defineEmits(shareSheetEmits)

const slots = useSlots()

const show = defineModel('show', { type: Boolean })

const iconMap: Record<string, string> = {
  'qq': 'qq',
  'link': 'link-o',
  'weibo': 'weibo',
  'qrcode': 'qr',
  'poster': 'photo-o',
  'wechat': 'wechat',
  'weapp-qrcode': 'miniprogram-o',
  'wechat-moments': 'wechat-moments',
}

const hasTitle = computed(() => slots.title || props.title)
const hasDescription = computed(() => slots.description || props.description)
const cancelText = computed(() => defaultTo(props.cancelText, t('cancel')))
const options = computed<ShareSheetOption[][]>(() => (Array.isArray(props.options[0]) ? props.options : [props.options]) as ShareSheetOption[][])

function updateShow(visible: boolean) {
  show.value = visible
}

function onCancel() {
  updateShow(false)
  emit('cancel')
}

function onSelect(option: ShareSheetOption, index: number) {
  emit('select', option, index)
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
    safe-area-inset-bottom
    round
    position="bottom"
  >
    <template v-if="hasTitle || hasDescription">
      <!-- header -->
      <view :class="bem('header')">
        <template v-if="hasTitle">
          <view :class="bem('title')">
            <slot name="title">
              {{ title }}
            </slot>
          </view>
        </template>
        <template v-if="hasDescription">
          <view :class="bem('description')">
            <slot name="description">
              {{ description }}
            </slot>
          </view>
        </template>
      </view>
    </template>
    <!-- rows -->
    <scroll-view
      v-for="(item, index) in options"
      :key="index"
      :show-scrollbar="false"
      :scroll-x="true"
    >
      <view :class="bem('options', { border: index !== 0 })">
        <view
          v-for="(option, optionIndex) in item"
          :key="optionIndex"
          :class="[bem('option'), option.className, HAPTICS_FEEDBACK]"
          @click="onSelect(option, optionIndex)"
        >
          <template v-if="isImageUrl(option.icon)">
            <image
              :src="option.icon"
              :class="bem('image-icon')"
            />
          </template>
          <template v-else>
            <view :class="bem('icon', { [`${option.icon}`]: option.icon })">
              <van-icon :name="iconMap[option.icon] || option.icon" />
            </view>
          </template>
          <template v-if="option.name">
            <view :class="bem('name')">
              {{ option.name }}
            </view>
          </template>
          <template v-if="option.description">
            <view :class="bem('option-description')">
              {{ description }}
            </view>
          </template>
        </view>
      </view>
    </scroll-view>
    <!-- cancel button -->
    <template v-if="slots.cancel || cancelText">
      <view
        :class="bem('cancel')"
        @click="onCancel"
      >
        <slot name="cancel">
          {{ cancelText }}
        </slot>
      </view>
    </template>
  </van-popup>
</template>

<style lang="scss">
@import './index';
</style>
