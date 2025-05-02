<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import VanLoading from '../loading/loading.vue'
import { addUnit, unknownProp } from '../utils'
import { switchBem as bem, switchName as name, switchProps } from './switch'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'share',
  },
})

const props = defineProps(switchProps)

const emit = defineEmits(['change'])

const slots = useSlots()

const modelValue = defineModel({ type: unknownProp })

const checked = computed(() => isChecked())

function isChecked() {
  return modelValue.value === props.activeValue
}

function onClick() {
  if (!props.disabled && !props.loading) {
    const newValue = isChecked() ? props.inactiveValue : props.activeValue
    modelValue.value = newValue
    emit('change', newValue)
  }
}
</script>

<template>
  <view
    :class="
      bem({
        on: checked,
        loading: props.loading,
        disabled: props.disabled,
      })
    "
    :style="{
      fontSize: addUnit(props.size),
      backgroundColor: checked ? props.activeColor : props.inactiveColor,
    }"
    @click="onClick"
  >
    <view :class="bem('node')">
      <template v-if="props.loading">
        <view :class="bem('loading')">
          <van-loading :color="checked ? props.activeColor : props.inactiveColor" />
        </view>
      </template>
      <template v-else-if="slots.node">
        <slot name="node" />
      </template>
    </view>
    <slot name="background" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
