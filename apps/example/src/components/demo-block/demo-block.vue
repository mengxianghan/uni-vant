<script setup lang="ts">
defineProps({
  title: String,
  card: { type: Boolean, default: true },
})
</script>

<template>
  <view class="demo-block">
    <template v-if="title">
      <view class="demo-block__title pt-8 pb-3 text-sm text-neutral-500 px-4">
        <slot name="title">
          {{ title }}
        </slot>
      </view>
    </template>
    <view
      class="demo-block__body"
      :class="{ 'mx-4': card }"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
