<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useParent } from '../composables/use-relation'
import { BORDER } from '../constants'
import VanIcon from '../icon/icon.vue'
import { stepBem as bem, stepName as name } from '../step'
import { STEPS_KEY } from '../steps'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const slots = useSlots()

const { parent, index } = useParent(STEPS_KEY)

const parentProps = parent.props

const isActive = () => getStatus() === 'process'

const titleStyles = computed(() => {
  if (isActive()) {
    return { color: parentProps.activeColor }
  }
  if (getStatus() === 'waiting') {
    return { color: parentProps.inactiveColor }
  }

  return {}
})
const lineStyles = computed(() => ({
  background:
        getStatus() === 'finish'
          ? parentProps.activeColor
          : parentProps.inactiveColor,
}))
const showActiveIcon = computed(() => isActive())
const showFinishIcon = computed(() =>
  getStatus() === 'finish' && (parentProps.finishIcon || slots['finish-icon']),
)
const showInactiveIcon = computed(() =>
  parentProps.inactiveIcon || slots['inactive-icon'],
)

function getStatus() {
  const active = +parentProps.active
  if (index.value < active) {
    return 'finish'
  }
  return index.value === active ? 'process' : 'waiting'
}

const status = getStatus()

const onClickStep = () => parent.onClickStep(index.value)
</script>

<template>
  <view :class="[BORDER, bem([parentProps.direction, { [status]: status }])]">
    <view
      :class="bem('title', { active: isActive() })"
      :style="titleStyles"
      @click="onClickStep"
    >
      <slot />
    </view>
    <view
      :class="bem('circle-container')"
      @click="onClickStep"
    >
      <!-- active -->
      <template v-if="showActiveIcon">
        <slot name="active-icon">
          <view :class="bem('icon', 'active')">
            <van-icon
              :class-prefix="parentProps.iconPrefix"
              :color="parentProps.activeColor"
              :name="parentProps.activeIcon"
            />
          </view>
        </slot>
      </template>

      <!-- finish -->
      <template v-else-if="showFinishIcon">
        <slot name="finish-icon">
          <view :class="bem('icon', 'finish')">
            <van-icon
              :class-prefix="parentProps.iconPrefix"
              :color="parentProps.activeColor"
              :name="parentProps.finishIcon"
            />
          </view>
        </slot>
      </template>

      <!-- inactive -->
      <template v-else-if="showInactiveIcon">
        <slot name="inactive-icon">
          <view :class="bem('icon')">
            <van-icon
              :class-prefix="parentProps.iconPrefix"
              :name="parentProps.inactiveIcon"
            />
          </view>
        </slot>
      </template>

      <template v-else>
        <view
          :class="bem('circle')"
          :style="lineStyles"
        />
      </template>
    </view>
    <view
      :class="bem('line')"
      :style="lineStyles"
    />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
