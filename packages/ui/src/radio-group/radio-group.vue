<script lang="ts" setup>
import type { Numeric } from '../utils'
import { watch } from 'vue'
import { useChildren } from '../composables/use-relation'
import { radioGroupBem as bem, radioGroupName as name, RADIO_KEY, radioGroupEmits, radioGroupProps } from './radio-group'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(radioGroupProps)

const emit = defineEmits(radioGroupEmits)

const modelValue = defineModel<Numeric>()
const { linkChildren } = useChildren(RADIO_KEY)

watch(
  () => modelValue.value,
  (value: Numeric) => {
    emit('change', value)
  },
)

function updateValue(value: Numeric) {
  modelValue.value = value
}

linkChildren({
  props,
  modelValue,
  updateValue,
})
</script>

<template>
  <view
    :class="
      bem([props.direction])
    "
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
