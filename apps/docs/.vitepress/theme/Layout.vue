<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, nextTick, onMounted, provide } from 'vue'

const { isDark } = useData()
const { route, go } = useRouter()

const isComponentPage = computed(() => route.path.startsWith('/components'))
const iframeUrl = computed(() => {
  const path = route.path.replace(/\.html/g, '')
  return `http://localhost:5173/#/pages${path}`
})

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})

onMounted(() => {
  window.addEventListener('message', (e) => {
    const { type, data } = e.data || {}

    if (type === 'route' && data.route !== 'home/index') {
      go(data.route)
    }
  })
})
</script>

<template>
  <DefaultTheme.Layout :class="[{ 'xl:[&>.VPContent]:!pr-100': isComponentPage }]" />

  <template v-if="isComponentPage">
    <div
      class="fixed bottom-40px rounded-20px overflow-hidden top-100px max-h-675px w-375px right-10 transition-all"
    >
      <iframe
        :src="iframeUrl"
        class="border-none scrollbar-width-0 w-full h-full"
      />
    </div>
  </template>
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

.demo-frame {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &-wrap {
    width: 375px;
    max-height: 675px;
    position: fixed;
    top: 100px;
    bottom: 80px;
    right: 40px;
    border-radius: 20px;
    overflow: hidden;
    background: rgb(247, 248, 250);
  }
}

.layout {
  .content-container {
    padding-right: 180px;
  }
}
</style>
