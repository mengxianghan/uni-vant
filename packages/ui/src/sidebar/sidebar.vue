<script lang="ts" setup>
import type { Numeric } from '../utils'
import { useChildren } from '../composables/use-relation'
import { sidebarBem as bem, sidebarName as name, SIDEBAR_KEY, sidebarEmits } from './sidebar'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const emit = defineEmits(sidebarEmits)

const modelValue = defineModel<Numeric>()

const { linkChildren } = useChildren(SIDEBAR_KEY)

function getActive() {
  return +modelValue.value
}

function setActive(value) {
  if (value !== getActive()) {
    modelValue.value = value
    emit('change', value)
  }
}

linkChildren({
  getActive,
  setActive,
})
</script>

<template>
  <view :class="bem()">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
