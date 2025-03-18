<script lang="ts" setup>
import { computed } from 'vue'
import { useChildren } from '../composables/use-relation'
import { rowBem as bem, rowName as name, ROW_KEY, rowEmits, rowProps } from './row'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(rowProps)
const emit = defineEmits(rowEmits)
const { children, linkChildren } = useChildren(ROW_KEY)

const groups = computed(() => {
  const groups = [[]]

  let totalSpan = 0
  children.forEach((child, index) => {
    totalSpan += Number(child.span)

    if (totalSpan > 24) {
      groups.push([index])
      totalSpan -= 24
    }
    else {
      groups[groups.length - 1].push(index)
    }
  })

  return groups
})

const spaces = computed(() => {
  let gutter = 0
  if (Array.isArray(props.gutter)) {
    gutter = Number(props.gutter[0]) || 0
  }
  else {
    gutter = Number(props.gutter)
  }
  const spaces = []

  if (!gutter) {
    return spaces
  }

  groups.value.forEach((group) => {
    const averagePadding = (gutter * (group.length - 1)) / group.length

    group.forEach((item, index) => {
      if (index === 0) {
        spaces.push({ right: averagePadding })
      }
      else {
        const left = gutter - spaces[item - 1].right
        const right = averagePadding - left
        spaces.push({ left, right })
      }
    })
  })

  return spaces
})

const verticalSpaces = computed(() => {
  const spaces = []
  if (Array.isArray(props.gutter) && props.gutter.length > 1) {
    const bottom = Number(props.gutter[1]) || 0
    if (bottom <= 0) {
      return spaces
    }
    groups.value.forEach((group, index) => {
      if (index === groups.value.length - 1)
        return
      group.forEach(() => {
        spaces.push({ bottom })
      })
    })
  }

  return spaces
})

function onClick(e) {
  emit('click', e)
}

linkChildren({ spaces, verticalSpaces })
</script>

<template>
  <view
    :class="
      bem({
        [`justify-${props.justify}`]: props.justify,
        [`align-${props.align}`]: props.align,
        nowrap: !props.wrap,
      })
    "
    @click="onClick"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
