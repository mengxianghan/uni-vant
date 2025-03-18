<script lang="ts" setup>
import { useChildren } from '../composables/use-relation'
import { stepsBem as bem, stepsName as name, STEPS_KEY, stepsEmits, stepsProps } from './steps'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(stepsProps)

const emit = defineEmits(stepsEmits)

const { linkChildren } = useChildren(STEPS_KEY)

const onClickStep = (index: number) => emit('clickStep', index)

linkChildren({
  props,
  onClickStep,
})
</script>

<template>
  <view :class="bem([props.direction])">
    <view :class="bem('items')">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
