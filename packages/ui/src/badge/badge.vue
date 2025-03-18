<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { isDef, isNumeric } from '../utils'
import { badgeProps, badgeBem as bem, badgeName as name } from './badge'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(badgeProps)

const slots = useSlots()

const showDefault = computed(() => slots.default)
const showContent = computed(() => {
  if (props.dot) {
    return false
  }

  if (slots.content) {
    return true
  }
  return (
    isDef(props.content)
    && props.content !== ''
    && (props.showZero || (props.content !== 0 && props.content !== '0'))
  )
})
const classes = computed(() =>
  bem({
    dot: props.dot,
    [props.position]: showDefault.value,
    fixed: showDefault.value,
  }),
)
const styles = computed(() => ({
  background: props.color,
}))
const content = computed(() => {
  const { max, content } = props
  if (isDef(max) && isNumeric(content) && +content > +max) {
    return `${max}+`
  }
  return content
})
</script>

<template>
  <template v-if="showDefault">
    <view :class="bem('wrapper')">
      <slot />
      <view
        :class="classes"
        :style="styles"
      >
        <template v-if="showContent">
          <slot name="content">
            {{ content }}
          </slot>
        </template>
      </view>
    </view>
  </template>
  <template v-else>
    <view
      :class="classes"
      :style="styles"
    >
      <template v-if="showContent">
        <slot name="content">
          {{ content }}
        </slot>
      </template>
    </view>
  </template>
</template>

<style lang="scss">
@import './index';
</style>
