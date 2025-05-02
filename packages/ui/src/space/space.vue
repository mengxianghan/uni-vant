<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { addUnit, isDef } from '../utils'
import { spaceBem as bem, spaceName as name, spaceProps } from './space'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(spaceProps)

const styles = computed(() => {
  const style: CSSProperties = {}

  if (!isDef(props.size))
    return

  if (Array.isArray(props.size)) {
    const [x = 0, y = 0] = props.size
    style.gap = `${addUnit(x)} ${addUnit(y)}`
  }
  else {
    style.gap = addUnit(props.size)
  }

  return style
})
</script>

<template>
  <view
    :class="
      bem([
        props.direction,
        `align-${props.align}`,
        {
          wrap: props.wrap,
          fill: props.fill,
        },
      ])
    "
    :style="styles"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
