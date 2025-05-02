<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref } from 'vue'
import { useExpose } from '../composables/use-expose'
import { useParent } from '../composables/use-relation'
import { TABS_KEY } from '../tabs'
import { tabBem as bem, tabName as name, tabProps } from './tab'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabProps)

const { parent, index } = useParent(TABS_KEY)

const instance = getCurrentInstance()

const inited = ref(false)

const active = computed(() => {
  const isActive = getName() === parent.currentName.value

  if (isActive && !inited.value) {
    init()
  }

  return isActive
})

const show = computed(() => parent?.props.scrollspy || parent?.props.swipeable || active.value || parent?.props.animated)

const styles = computed(() => {
  if (!parent?.props.animated) {
    return
  }

  return {
    left: `${-100 * index.value}%`,
  }
})

function init() {
  inited.value = true

  if (parent?.props.lazyRender) {
    nextTick(() => {
      parent.onRendered(getName(), props.title)
    })
  }
}

function getName() {
  return props.name ?? index.value
}

useExpose({
  id: instance.uid,
  props,
  active,
})
</script>

<template>
  <view
    v-show="show"
    :class="bem('panel', { active, inactive: !active })"
    :style="styles"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
