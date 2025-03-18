<script lang="ts" setup>
import { normalizeStyle } from 'vue'
import { useTransition } from '../composables/use-transition'
import { transitionBem as bem, transitionName as name, transitionEmits, transitionProps } from './transition'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(transitionProps)

const emit = defineEmits(transitionEmits)

const { initialized, classes, styles } = useTransition(props, { emit })

function onClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

<template>
  <view
    v-if="initialized"
    :class="[bem(), customClass, classes]"
    :style="normalizeStyle([styles, customStyle])"
    @click="onClick"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
