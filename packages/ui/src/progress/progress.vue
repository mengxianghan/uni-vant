<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit, defaultTo } from '../utils'
import { progressBem as bem, progressName as name, progressProps } from './progress'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(progressProps)

const background = computed(() => (props.inactive ? undefined : props.color))
const text = computed(() => defaultTo(props.pivotText, `${props.percentage}%`))
</script>

<template>
  <view
    :class="bem()"
    :style="{
      background: props.trackColor,
      height: addUnit(props.strokeWidth),
    }"
  >
    <view
      :class="bem('portion', { inactive: props.inactive })"
      :style="{
        width: `${+props.percentage}%`,
        background,
      }"
    />

    <template v-if="showPivot && text">
      <view
        :class="bem('pivot', { inactive: props.inactive })"
        :style="{
          color: props.textColor,
          left: `${+props.percentage}%`,
          transform: `translate(-${+props.percentage}%,-50%)`,
          background: props.pivotColor || background,
        }"
      >
        {{ text }}
      </view>
    </template>
  </view>
</template>

<style scoped lang="scss">
@import './index';
</style>
