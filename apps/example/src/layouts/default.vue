<script lang="ts" setup>
import { get, last } from 'lodash-es'

const currentPage = getCurrentPages()

// #ifdef WEB
if (window.parent !== window.self) {
  window.parent.postMessage({
    type: 'route',
    data: {
      route: get(last(currentPage), 'route').slice(6),
    },
  }, '*')
}
// #endif
</script>

<template>
  <slot />
</template>

<style scoped>

</style>
