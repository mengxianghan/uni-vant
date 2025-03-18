<script lang="ts" setup>
import { computed, getCurrentInstance, normalizeStyle } from 'vue'
import { useChildren } from '../composables/use-relation'
import { addUnit, createUniqueSelector, getSystemInfoSync } from '../utils'
import { PLACEHOLDER_KEY } from '../vc-placeholder'
import VcPlaceholder from '../vc-placeholder/vc-placeholder.vue'
import { fixedBem, fixedName, fixedProps } from './fixed'

defineOptions({
  name: fixedName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(fixedProps)

const { linkChildren } = useChildren(PLACEHOLDER_KEY)
const [fixedSelector] = createUniqueSelector(fixedName)
const instance = getCurrentInstance()

const styles = computed(() => {
  const { windowTop, windowBottom } = getSystemInfoSync()

  return {
    zIndex: props.zIndex,
    [`${props.position}`]: `calc(${addUnit(props.offset)} + ${addUnit(props.position === 'top' ? windowTop : windowBottom)})`,
  }
})

linkChildren({ selector: fixedSelector, instance })
</script>

<template>
  <template v-if="props.disabled">
    <slot />
  </template>
  <template v-else>
    <vc-placeholder
      :disabled="!props.placeholder"
    >
      <view
        :class="[fixedBem(), props.customClass, {
          'van-safe-area-bottom': props.safeAreaInsetBottom,
          'van-safe-area-top': props.safeAreaInsetTop,
        }, fixedSelector]"
        :style="normalizeStyle([styles, props.customStyle])"
      >
        <slot />
      </view>
    </vc-placeholder>
  </template>
</template>

<style lang="scss">
@import './index';
</style>
