<script lang="ts" setup>
import { computed } from 'vue'
import VanIcon from '../icon/icon.vue'
import { getArrowByDirection, isDef } from '../utils'
import { cellBem, cellEmits, cellName, cellProps } from './cell'

defineOptions({
  name: cellName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(cellProps)
const emit = defineEmits(cellEmits)
const slots = defineSlots()

const showLabel = computed(() => isDef(props.label) || slots.label)
const showLeftIcon = computed(() => isDef(props.icon) || slots.icon)
const showTitle = computed(() => isDef(props.title) || slots.title || showLabel.value)
const showValue = computed(() => isDef(props.value) || slots.value)
const showRightIcon = computed(() => slots['right-icon'] || props.isLink)
const arrow = computed(() => getArrowByDirection(props.arrowDirection))

function onClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <view
    :class="
      cellBem({
        center: props.center,
        clickable: props.isLink || props.clickable,
        borderless: !props.border,
        [props.size]: props.size,
      })
    "
    @click="onClick"
  >
    <template v-if="showLeftIcon">
      <view :class="cellBem('left-icon')">
        <slot name="icon">
          <van-icon :name="props.icon" />
        </slot>
      </view>
    </template>
    <template v-if="showTitle">
      <view :class="cellBem('title')">
        <view>
          <slot name="title">
            {{ props.title }}
          </slot>
        </view>
        <template v-if="showLabel">
          <view :class="cellBem('label')">
            <slot name="label">
              {{ props.label }}
            </slot>
          </view>
        </template>
      </view>
    </template>
    <template v-if="showValue">
      <view :class="cellBem('value')">
        <slot name="value">
          {{ props.value }}
        </slot>
      </view>
    </template>
    <template v-if="showRightIcon">
      <view :class="cellBem('right-icon')">
        <slot name="right-icon">
          <van-icon :name="arrow" />
        </slot>
      </view>
    </template>
    <slot name="extra" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
