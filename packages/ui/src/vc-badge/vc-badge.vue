<script lang="ts" setup>
import { computed } from 'vue'
import VanBadge from '../badge/badge.vue'
import { isDef } from '../utils'
import { vcBadgeProps } from './vc-badge'

defineOptions({
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(vcBadgeProps)

const disabled = computed(() => !props.dot || !isDef(props.badge))
</script>

<template>
  <template v-if="!disabled">
    <van-badge
      v-bind="props.badgeProps"
      :dot="props.dot"
      :content="props.badge"
    >
      <slot />
    </van-badge>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<style lang="scss"></style>
