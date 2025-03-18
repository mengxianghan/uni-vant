<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { cellBem } from '../cell'
import { COLLAPSE_KEY } from '../collapse'
import { useExpose } from '../composables/use-expose'
import { useRect } from '../composables/use-rect'
import { useParent } from '../composables/use-relation'
import VanIcon from '../icon/icon.vue'
import { addUnit, createUniqueSelector, doubleRaf, getArrowByDirection, isDef, raf } from '../utils'
import { collapseItemBem, collapseItemName, collapseItemProps } from './collapse-item'

defineOptions({
  name: collapseItemName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(collapseItemProps)

const slots = defineSlots()

const instance = getCurrentInstance()
const { parent, index } = useParent(COLLAPSE_KEY)
const [wrapperSelector, contentSelector] = createUniqueSelector(collapseItemName, 2)

const name = computed(() => props.name ?? index.value)
const expanded = computed(() => parent.isExpanded(name.value))
const showLabel = computed(() => isDef(props.label) || slots.label)
const showLeftIcon = computed(() => isDef(props.icon) || slots.icon)
const showTitle = computed(() => isDef(props.title) || slots.title || showLabel.value)
const showValue = computed(() => isDef(props.value) || slots.value)
const showRightIcon = computed(() => slots['right-icon'] || props.isLink)
const isLink = computed(() => props.readonly ? false : props.isLink)
const arrow = computed(() => getArrowByDirection(props.arrowDirection))
const clickable = computed(() => (props.disabled || props.readonly) ? false : props.clickable)

const show = ref(expanded.value)
const wrapperHeight = ref('auto')

watch(expanded, (value, oldValue) => {
  if (oldValue === null) {
    return
  }

  if (value) {
    wrapperHeight.value = '0'
    show.value = true
  }

  // Use raf: flick when opened in safari
  // Use nextTick: closing animation failed when set `user-select: none`
  const tick = value ? nextTick : raf

  tick(async () => {
    const wrapperRef = await useRect(`.${wrapperSelector}`, instance)
    const contentRef = await useRect(`.${contentSelector}`, instance)

    if (!contentRef || !wrapperRef) {
      return
    }

    const { height } = contentRef
    if (height) {
      const contentHeight = addUnit(height)
      wrapperHeight.value = value ? '0' : contentHeight

      // use double raf to ensure animation can start
      doubleRaf(() => {
        if (wrapperRef) {
          wrapperHeight.value = value ? contentHeight : '0'
        }
      })
    }
    else {
      onTransitionEnd()
    }
  })
})

function onClickTitle() {
  if (!props.disabled && !props.readonly) {
    toggle()
  }
}

function toggle(newValue = !expanded.value) {
  parent.toggle(name.value, newValue)
}

async function onTransitionEnd() {
  const wrapperRef = await useRect(`.${wrapperSelector}`, instance)
  if (!expanded.value) {
    show.value = false
  }
  else if (wrapperRef) {
    wrapperHeight.value = ''
  }
}

useExpose({ toggle, expanded, itemName: name })
</script>

<template>
  <view :class="[collapseItemBem({ border: index && props.border })]">
    <!-- title -->
    <view
      :class="[
        cellBem({
          center: props.center,
          clickable: isLink || clickable,
          borderless: !props.border,
          [props.size]: props.size,
        }),
        collapseItemBem('title', {
          disabled: props.disabled,
          expanded,
          borderless: !props.border,
        }),
      ]"
      @click="onClickTitle"
    >
      <template v-if="showLeftIcon">
        <view :class="cellBem('left-icon')">
          <slot name="icon">
            <van-icon :name="props.icon" />
          </slot>
        </view>
      </template>
      <template v-if="showTitle">
        <view :class="cellBem('title')">
          <view>
            <slot name="title">
              {{ props.title }}
            </slot>
          </view>
          <template v-if="showLabel">
            <view :class="cellBem('label')">
              <slot name="label">
                {{ props.label }}
              </slot>
            </view>
          </template>
        </view>
      </template>
      <template v-if="showValue">
        <view :class="cellBem('value')">
          <slot name="value">
            {{ props.value }}
          </slot>
        </view>
      </template>
      <template v-if="showRightIcon">
        <view :class="cellBem('right-icon')">
          <slot name="right-icon">
            <van-icon :name="arrow" />
          </slot>
        </view>
      </template>
      <slot name="extra" />
    </view>

    <!-- content -->
    <view
      v-show="show"
      :class="[collapseItemBem('wrapper'), wrapperSelector]"
      :style="{ height: wrapperHeight }"
      @transitionend="onTransitionEnd"
    >
      <view :class="[collapseItemBem('content'), contentSelector]">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
