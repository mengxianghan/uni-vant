<script lang="ts" setup>
import { useParent } from '../composables/use-relation'
import { SIDEBAR_KEY } from '../sidebar'
import VcBadge from '../vc-badge/vc-badge.vue'
import { sidebarItemBem as bem, sidebarItemName as name, sidebarItemEmits, sidebarItemProps } from './sidebar-item'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(sidebarItemProps)

const emit = defineEmits(sidebarItemEmits)

const { parent, index } = useParent(SIDEBAR_KEY)

function onClick() {
  if (props.disabled) {
    return
  }

  emit('click', index.value)
  parent.setActive(index.value)
}
</script>

<template>
  <div
    :class="
      bem({
        select: index === parent.getActive(),
        disabled: props.disabled,
      })
    "
    @click="onClick"
  >
    <!-- van-badge__wrapper -->
    <div :class="bem('text')">
      <vc-badge
        :dot="props.dot"
        :badge="props.badge"
        :badge-props="props.badgeProps"
      >
        <slot name="title">
          {{ props.title }}
        </slot>
      </vc-badge>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
