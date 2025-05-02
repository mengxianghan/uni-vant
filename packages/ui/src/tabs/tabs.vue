<script lang="ts" setup>
import {
  type ComponentInstance,
  type ComponentPublicInstance,
  computed,
  type CSSProperties,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  watch,
} from 'vue'
import { useRect } from '../composables/use-rect'
import { useChildren } from '../composables/use-relation'
import {
  BORDER_TOP_BOTTOM,
} from '../constants'
import VanIcon from '../icon/icon.vue'
import VanSticky from '../sticky/sticky.vue'
import { tabBem } from '../tab'
import {
  addUnit,
  callInterceptor,
  createUniqueSelector,
  isDef,
  makeNumericProp,
  type Numeric,
} from '../utils'
import VcBadge from '../vc-badge/vc-badge.vue'
import { tabsBem as bem, tabsName as name, TABS_KEY, tabsEmits, tabsProps } from './tabs'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabsProps)
const emit = defineEmits(tabsEmits)

const active = defineModel<Numeric>('active', makeNumericProp(0))

const [tabsSelector, tabSelector, lineSelector, navSelector] = createUniqueSelector(name, 4)

const { children, linkChildren } = useChildren(TABS_KEY)

const instance = getCurrentInstance()

const state = reactive({
  inited: false,
  lineStyles: {},
  prevIndex: -1,
  currentIndex: -1,
  scrollWithAnimation: false,
  scrollLeft: 0,
  animated: props.animated,
})

const scrollable = computed(() => children.length > +props.swipeThreshold || !props.ellipsis || props.shrink)
const navStyles = computed(() => ({
  borderColor: props.color,
  background: props.background,
}))
const trackStyles = computed(() => {
  if (!props.animated && !props.swipeable) {
    return
  }

  return {
    left: `${-100 * state.currentIndex}%`,
    transitionDuration: state.animated && state.inited ? `${props.duration}s` : '0s',
  }
})
const currentName = computed(() => {
  const activeTab = children[state.currentIndex]

  if (activeTab) {
    return getTabName(activeTab, state.currentIndex)
  }

  return null
})

watch(() => [props.color, props.duration, props.lineWidth, props.lineHeight], setLine)

watch(
  () => children.length,
  () => {
    if (state.inited) {
      setCurrentIndexByName(active.value)
      setLine()
      nextTick(() => {
        scrollIntoView()
      })
    }
  },
)

onMounted(() => {
  init()
})

function init() {
  setCurrentIndexByName(active.value, true)
  nextTick(() => {
    state.inited = true
    scrollIntoView()
  })
}

function getTabName(tab: ComponentInstance<any>, index: number): Numeric {
  return tab.name ?? index
}

function getTabsRect(): Promise<UniApp.NodeInfo[]> {
  const queue = children.map((item, index) => useRect(`.${tabSelector}-${index}`, instance))
  return new Promise((resolve) => {
    Promise.all(queue).then((data) => {
      resolve(data)
    })
  })
}

function getContainer() {
  return uni.createSelectorQuery().in(instance).select(`.${tabsSelector}`)
}

function setCurrentIndex(currentIndex: number, skipScrollIntoView?: boolean) {
  const newIndex = findAvailableTab(currentIndex)

  if (!isDef(newIndex)) {
    return
  }

  const newTab = children[newIndex]
  const newName = getTabName(newTab, newIndex)
  const shouldEmitChange = state.currentIndex !== null

  if (state.currentIndex !== newIndex) {
    state.prevIndex = state.currentIndex
    state.currentIndex = newIndex
    state.animated = Math.abs(state.currentIndex - state.prevIndex) === 1

    if (!skipScrollIntoView) {
      scrollIntoView()
    }
    setLine()
  }

  if (newName !== active.value) {
    active.value = newName
    if (shouldEmitChange) {
      emit('change', newName, newTab.title)
    }
  }
}

function setLine() {
  const shouldAnimate = state.inited
  nextTick(() => {
    getTabsRect().then((tabRects) => {
      const offsetLeft = tabRects.slice(0, state.currentIndex).reduce((prev, curr) => prev + curr.width!, 0)
      const { lineWidth, lineHeight } = props
      const left = offsetLeft + tabRects[state.currentIndex].width! / 2 + (scrollable.value ? 8 : 0)

      const lineStyles: CSSProperties = {
        width: addUnit(lineWidth),
        backgroundColor: props.color,
        transform: `translateX(${left}px) translateX(-50%)`,
      }

      if (shouldAnimate) {
        lineStyles.transitionDuration = `${props.duration}s`
      }

      if (isDef(lineHeight)) {
        const height = addUnit(lineHeight)
        lineStyles.height = height
        lineStyles.borderRadius = height
      }

      state.lineStyles = lineStyles
    })
  })
}

function setCurrentIndexByName(name: Numeric, skipScrollIntoView?: boolean) {
  const matched = children.find((tab, index) => getTabName(tab, index) === name)
  const index = matched ? children.indexOf(matched) : 0
  setCurrentIndex(index, skipScrollIntoView)
}

function scrollIntoView() {
  if (!scrollable.value) {
    return
  }

  Promise.all([getTabsRect(), useRect(`.${navSelector}`, instance)]).then(([tabRects, navRect]) => {
    const tabRect = tabRects[state.currentIndex]
    const offsetLeft = tabRects.slice(0, state.currentIndex).reduce((prev, curr) => prev + curr.width, 0)

    state.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2

    if (!state.scrollWithAnimation) {
      nextTick(() => {
        state.scrollWithAnimation = true
      })
    }
  })
}

function findAvailableTab(index: number) {
  const diff = index < state.currentIndex ? -1 : 1
  while (index >= 0 && index < children.length) {
    if (!children[index].disabled) {
      return index
    }

    index += diff
  }
}

function onRendered(name: Numeric, title: Numeric) {
  emit('rendered', name, title)
}

function onClickTab(item: ComponentPublicInstance, index: number, event: MouseEvent) {
  const { title, disabled } = children[index]
  const name = getTabName(children[index], index)

  if (!disabled) {
    callInterceptor(props.beforeChange, {
      args: [name],
      done: () => {
        setCurrentIndex(index)
      },
    })
  }

  emit('clickTab', {
    name,
    title,
    event,
    disabled,
  })
}

function resize() {
  setLine()
  nextTick(() => {
    scrollIntoView()
  })
}

linkChildren({
  props,
  active,
  onRendered,
  currentName,
})

defineExpose({ resize })
</script>

<template>
  <view :class="[bem([props.type]), tabsSelector]">
    <van-sticky
      :disabled="!props.sticky"
      :offset="props.offsetTop"
      :container="getContainer"
      :page-scroll="props.pageScroll"
    >
      <view
        :class="[
          bem('wrap'),
          {
            [BORDER_TOP_BOTTOM]: props.type === 'line' && props.border,
          },
        ]"
      >
        <slot name="nav-left" />
        <scroll-view
          :scroll-x="scrollable"
          :scroll-with-animation="state.scrollWithAnimation"
          :scroll-left="state.scrollLeft"
          :show-scrollbar="false"
          :class="bem('scroll', [props.type, { shrink: props.shrink }])"
        >
          <view
            :class="[
              bem('nav', [
                type,
                {
                  // shrink,
                  complete: scrollable,
                },
              ]),
              navSelector,
            ]"
            :style="navStyles"
          >
            <!-- tab -->
            <view
              v-for="(item, index) in children"
              :key="item.name || item.id"
              :class="[
                tabBem([
                  type,
                  {
                    grow: scrollable && !props.shrink,
                    shrink: props.shrink,
                    active: active === item.name || active === index,
                    disabled: item.disabled,
                  },
                ]),
                `${tabSelector}-${index}`,
              ]"
              @click="(evt: MouseEvent) => onClickTab(item, index, evt)"
            >
              <vc-badge
                :dot="item.dot"
                :badge="item.badge"
                :badge-props="{ showZero: item.showZeroBadge }"
              >
                <view :class="tabBem('wrap')">
                  <template v-if="item.icon">
                    <view
                      v-if="item.icon"
                      :class="tabBem('icon')"
                    >
                      <van-icon :name="item.icon" />
                    </view>
                  </template>

                  <view :class="tabBem('text', { ellipsis: !scrollable })">
                    <template v-if="props.useNameSlot">
                      <slot :name="item.name">
                        {{ item.title }}
                      </slot>
                    </template>
                    <template v-else>
                      {{ item.title }}
                    </template>
                  </view>

                  <template v-if="item.rightIcon">
                    <view :class="tabBem('right-icon')">
                      <van-icon :name="item.rightIcon" />
                    </view>
                  </template>
                </view>
              </vc-badge>
            </view>

            <!-- line -->
            <template v-if="type === 'line' && children.length">
              <view
                :class="[bem('line'), lineSelector]"
                :style="state.lineStyles"
              />
            </template>
          </view>
        </scroll-view>

        <slot name="nav-right" />
      </view>
      <slot name="nav-bottom" />
    </van-sticky>
    <!-- content -->
    <template v-if="props.showContent">
      <view
        :class="
          bem('content', {
            animated: props.animated || props.swipeable,
          })
        "
      >
        <view
          :class="bem('track', { animated: props.animated || props.swipeable })"
          :style="trackStyles"
        >
          <slot />
        </view>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
