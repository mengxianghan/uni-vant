<script setup lang="ts">
defineProps({
  title: String,
})
</script>

<template>
  <view class="flex flex-col items-center justify-center text-center">
    <view class="my-4 text-3xl">
      <slot />
    </view>
    <template v-if="title">
      <view class="h-9 -mt-1 mb-4 text-xs px-1">
        {{ title }}
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped></style>
