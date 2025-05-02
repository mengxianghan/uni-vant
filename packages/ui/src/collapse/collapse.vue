<script setup lang="ts">
import type { PropType } from 'vue'
import type { Numeric } from '../utils'
import type { CollapseToggleAllOptions } from './types'
import { useChildren } from '../composables/use-relation'
import { BORDER_TOP_BOTTOM } from '../constants'
import { collapseBem as bem, COLLAPSE_KEY, collapseEmits, collapseProps, collapseName as name } from './collapse'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(collapseProps)

const emit = defineEmits(collapseEmits)

const { linkChildren, children } = useChildren(COLLAPSE_KEY)

const modelValue = defineModel({ type: [String, Number, Array] as PropType<Numeric | Numeric[]>, default: '' })

function updateName(name: Numeric | Numeric[]) {
  modelValue.value = name
  emit('change', name)
}

function toggle(name: Numeric, expanded: boolean) {
  const { accordion } = props
  if (accordion) {
    updateName(name === modelValue.value ? '' : name)
  }
  else if (expanded) {
    updateName((modelValue.value as Numeric[]).concat(name))
  }
  else {
    updateName(
      (modelValue.value as Numeric[]).filter(activeName => activeName !== name),
    )
  }
}

function toggleAll(options: boolean | CollapseToggleAllOptions = {}) {
  if (props.accordion) {
    return
  }

  if (typeof options === 'boolean') {
    options = { expanded: options }
  }

  const { expanded, skipDisabled } = options!
  const expandedChildren = children.filter((item: any) => {
    if (item.disabled && skipDisabled) {
      return item.expanded.value
    }
    return expanded ?? !item.expanded.value
  })

  const names = expandedChildren.map(item => item.itemName.value)
  updateName(names)
}

function isExpanded(name: Numeric) {
  const { accordion } = props

  if (
    process.env.NODE_ENV !== 'production'
    && !validateModelValue(modelValue.value, accordion)
  ) {
    return false
  }

  return accordion
    ? modelValue.value === name
    : (modelValue.value as Numeric[]).includes(name)
}

function validateModelValue(
  modelValue: Numeric | Numeric[],
  accordion: boolean,
) {
  if (accordion && Array.isArray(modelValue)) {
    console.error(
      '[Vant] Collapse: "v-model" should not be Array in accordion mode',
    )
    return false
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error(
      '[Vant] Collapse: "v-model" should be Array in non-accordion mode',
    )
    return false
  }
  return true
}

defineExpose({ toggleAll })
linkChildren({ toggle, isExpanded })
</script>

<template>
  <view :class="[bem(), { [BORDER_TOP_BOTTOM]: props.border }]">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
