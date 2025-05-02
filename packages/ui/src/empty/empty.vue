<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { get, getSizeStyle, isDef } from '../utils'
import { emptyBem as bem, emptyProps, emptyName as name, PRESET_IMAGES } from './empty'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(emptyProps)

const slots = useSlots()

const imageSrc = computed(() => get(PRESET_IMAGES, props.image, props.image))
const hasDescription = computed(() => isDef(props.description) || slots.description)
</script>

<template>
  <view :class="bem()">
    <view
      :class="bem('image')"
      :style="getSizeStyle(props.imageSize)"
    >
      <slot name="image">
        <image
          :class="bem('image-img')"
          :src="imageSrc"
          mode="aspectFit"
        />
      </slot>
    </view>
    <template v-if="hasDescription">
      <view :class="bem('description')">
        <slot name="description">
          {{ props.description }}
        </slot>
      </view>
    </template>
    <template v-if="slots.default">
      <view :class="bem('bottom')">
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
