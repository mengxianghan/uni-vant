<script lang="ts" setup>
import VanIcon from '../icon/icon.vue'
import { actionBarIconEmits, actionBarIconProps, actionBarIconBem as bem, actionBarIconName as name } from './action-bar-icon'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(actionBarIconProps)

const emit = defineEmits(actionBarIconEmits)

function onClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <view
    :class="bem()"
    @click="onClick"
  >
    <slot name="icon">
      <view :class="bem('icon')">
        <van-icon
          :name="props.icon"
          :color="props.color"
          :class-prefix="props.iconPrefix"
          :dot="props.dot"
          :badge="props.badge"
          :badge-props="props.badgeProps"
        />
      </view>
    </slot>
    <slot>{{ props.text }}</slot>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
