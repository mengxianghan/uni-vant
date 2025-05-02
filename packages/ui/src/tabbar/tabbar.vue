<script lang="ts" setup>
import type { Numeric } from '../utils'
import { useChildren } from '../composables/use-relation'
import { tabbarBem as bem, tabbarName as name, TABBAR_KEY, tabbarEmits, tabbarProps } from './tabbar'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabbarProps)

const emit = defineEmits(tabbarEmits)

const modelValue = defineModel<Numeric>()
const { linkChildren } = useChildren(TABBAR_KEY)

async function onChange(val: Numeric) {
  if (!(await props.beforeChange())) {
    return
  }
  modelValue.value = val
  emit('change', modelValue.value)
}

linkChildren({
  active: modelValue,
  props,
  onChange,
})
</script>

<template>
  <view
    :class="[
      bem({
        fixed: props.fixed,
      }),
      {
        'van-hairline--top-bottom': props.border,
        'van-safe-area-bottom': props.safeAreaInsetBottom,
      },
    ]"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
