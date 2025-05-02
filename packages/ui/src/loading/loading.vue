<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { addUnit, getSizeStyle, isDef } from '../utils'
import { loadingBem as bem, loadingProps, loadingName as name } from './loading'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(loadingProps)

const slots = useSlots()

const showIcon = computed(() => slots.icon)
</script>

<template>
  <view
    :class="
      bem({
        vertical: props.vertical,
      })
    "
  >
    <view
      :class="
        bem('spinner', {
          [props.type]: !showIcon,
        })
      "
      :style="{
        color: props.color,
        ...getSizeStyle(props.size),
      }"
    >
      <slot name="icon">
        <template v-if="'spinner' === props.type">
          <view
            v-for="item in 12"
            :key="item"
            :class="bem('dot')"
          />
        </template>
      </slot>
    </view>
    <template v-if="slots.default">
      <view
        :class="bem('text')"
        :style="{
          fontSize: isDef(props.textSize) ? addUnit(props.textSize) : '',
          color: props.textColor || props.color,
        }"
      >
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
