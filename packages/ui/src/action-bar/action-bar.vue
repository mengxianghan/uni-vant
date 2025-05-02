<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { useChildren } from '../composables/use-relation'
import { createUniqueSelector } from '../utils'
import { PLACEHOLDER_KEY } from '../vc-placeholder'
import VcPlaceholder from '../vc-placeholder/vc-placeholder.vue'
import { ACTION_BAR_KEY, actionBarBem, actionBarName, actionBarProps } from './action-bar'

defineOptions({
  name: actionBarName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(actionBarProps)

const { linkChildren } = useChildren(ACTION_BAR_KEY)
const { linkChildren: placeholderLinkChildren } = useChildren(PLACEHOLDER_KEY)
const [actionBarSelector] = createUniqueSelector(actionBarName)
const instance = getCurrentInstance()

linkChildren()
placeholderLinkChildren({ selector: actionBarSelector, instance })
</script>

<template>
  <vc-placeholder
    :disabled="!props.placeholder"
    :bem="actionBarBem"
  >
    <view
      :class="[
        actionBarBem({ fixed: props.fixed }),
        actionBarSelector,
        {
          'van-safe-area-bottom': props.safeAreaInsetBottom,
        },
      ]"
    >
      <slot />
    </view>
  </vc-placeholder>
</template>

<style lang="scss">
@import './index';
</style>
