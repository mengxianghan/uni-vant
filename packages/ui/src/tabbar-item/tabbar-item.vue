<script lang="ts" setup>
import { computed } from 'vue'
import { useParent } from '../composables/use-relation'
import VanIcon from '../icon/icon.vue'
import { TABBAR_KEY } from '../tabbar/tabbar'
import VcBadge from '../vc-badge/vc-badge.vue'
import { tabbarItemBem as bem, tabbarItemName as name, tabbarItemProps } from './tabbar-item'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabbarItemProps)

const { parent, index } = useParent(TABBAR_KEY)

const key = computed(() => props.name || index.value)
const isActive = computed(() => parent.active.value === key.value)
const styles = computed(() => ({
  color: parent.props.activeColor && isActive.value ? parent.props.activeColor : parent.props.inactiveColor,
}))

function onClick() {
  const { name } = props
  parent.onChange(name || index.value)
}
</script>

<template>
  <view
    :class="
      bem({
        active: isActive,
      })
    "
    :style="styles"
    @click="onClick"
  >
    <view :class="bem('icon')">
      <vc-badge
        :dot="props.dot"
        :badge="props.badge"
        :badge-props="props.badgeProps"
      >
        <slot
          name="icon"
          :active="isActive"
        >
          <van-icon
            :name="props.icon"
            :class-prefix="props.iconPrefix"
          />
        </slot>
      </vc-badge>
    </view>
    <view :class="bem('text')">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
