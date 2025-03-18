<script lang="ts" setup>
import { computed } from 'vue'
import { ACTION_BAR_KEY } from '../action-bar'
import VanButton from '../button/button.vue'
import { useExpose } from '../composables/use-expose'
import { useParent } from '../composables/use-relation'
import { actionBarButtonEmits, actionBarButtonProps, actionBarButtonBem as bem, actionBarButtonName as name } from './action-bar-button'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(actionBarButtonProps)

const emit = defineEmits(actionBarButtonEmits)

const { parent, index } = useParent(ACTION_BAR_KEY)

const isFirst = computed(() => {
  if (!parent) {
    return false
  }
  const prev = parent.children[index.value - 1]
  return !(prev && 'isButton' in prev)
})

const isLast = computed(() => {
  if (!parent) {
    return false
  }
  const next = parent.children[index.value + 1]
  return !(next && 'isButton' in next)
})

const isOnly = computed(() => parent && parent.children.filter(item => item.isButton).length === 1)

function onClick(evt: MouseEvent) {
  emit('click', evt)
}

useExpose({
  isButton: true,
})
</script>

<template>
  <view
    :class="[
      bem([
        props.type,
        {
          'first': isFirst && !isOnly,
          'last': isLast && !isOnly,
          'only-one': isOnly,
          'center': !isFirst && !isLast && !isOnly,
        },
      ]),
    ]"
    @click="onClick"
  >
    <van-button
      :type="props.type"
      :color="props.color"
      :icon="props.icon"
      :disabled="props.disabled"
      :loading="props.loading"
    >
      <slot>{{ props.text }}</slot>
    </van-button>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
