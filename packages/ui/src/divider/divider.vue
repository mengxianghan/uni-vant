<script lang="ts" setup>
import { normalizeStyle, useSlots } from 'vue'
import { dividerBem as bem, dividerEmits, dividerProps, dividerName as name } from './divider'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(dividerProps)

const emit = defineEmits(dividerEmits)

const slots = useSlots()

function onClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <view
    :class="[
      bem({
        dashed: props.dashed,
        hairline: props.hairline,
        vertical: props.vertical,
        [`content-${props.contentPosition}`]: !!slots.default && !props.vertical,
      }),
      props.customClass,
    ]"
    :style="normalizeStyle(props.customStyle)"
    @click="onClick"
  >
    <template v-if="!props.vertical">
      <slot />
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
