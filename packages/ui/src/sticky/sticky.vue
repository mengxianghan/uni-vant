<script lang="ts" setup>
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { useRect } from '../composables/use-rect'
import {
  addUnit,
  createUniqueSelector,
  getSizeStyle,
  getSystemInfoSync,
  isFunction,
} from '../utils'
import { stickyBem as bem, stickyName as name, stickyProps } from './sticky'

const props = defineProps(stickyProps)

const emit = defineEmits(['scroll', 'change'])

defineComponent({
  name,
  options: { virtualHost: true, addGlobalClass: true, styleIsolation: 'shared' },
})

const scrollTop = defineModel('scrollTop', { type: Number, default: null })

const [stickySelector] = createUniqueSelector(name)
const instance = getCurrentInstance()

const state = reactive({
  width: 0,
  height: 0,
  transform: 0,
  fixed: false,
})

const isTop = computed(() => props.position === 'top')
const styles = computed(() => {
  if (!state.fixed) {
    return
  }

  return {
    height: state.fixed ? addUnit(state.height) : '',
    zIndex: props.zIndex,
  }
})
const innerStyles = computed(() => {
  if (!state.fixed) {
    return {}
  }

  return {
    zIndex: props.zIndex,
    [props.position]: `calc(var(--window-${props.position}, 0) + ${addUnit(props.offset)})`,
    position: 'fixed',
    transform: state.transform ? `translate3d(0, ${addUnit(state.transform)}, 0)` : '',
    ...getSizeStyle([state.width, state.height]),
  }
})

watch([() => scrollTop.value, () => props.disabled, () => props.position], () => {
  onScroll({ scrollTop: scrollTop.value })
})
watch(
  () => state.fixed,
  (value) => {
    emit('change', value)
  },
)

onMounted(() => {
  onScroll()

  if (isFunction(props.pageScroll)) {
    props.pageScroll((e) => {
      onScroll({ scrollTop: e.scrollTop })
    })
  }
})

interface IScrollInfo {
  scrollTop: number
}

async function onScroll(info?: IScrollInfo) {
  if (props.disabled) {
    state.fixed = false
    state.transform = 0
    return
  }

  scrollTop.value = info?.scrollTop || scrollTop.value

  const rootRect = await useRect(`.${stickySelector}`, instance)
  const containerRect = await getContainerRect()
  const { windowTop = 0, windowHeight: clientHeight } = getSystemInfoSync()

  state.width = rootRect.width
  state.height = rootRect.height

  if (isTop.value) {
    if (containerRect) {
      const difference = containerRect.bottom - props.offset - state.height + windowTop
      state.fixed = props.offset > rootRect.top + windowTop && containerRect.bottom > 0
      state.transform = difference < 0 ? difference : 0
    }
    else {
      state.fixed = props.offset > rootRect.top + windowTop
    }
  }
  else {
    if (containerRect) {
      const difference = clientHeight - containerRect.top - props.offset - state.height - windowTop
      state.fixed
                = clientHeight - props.offset < rootRect.bottom + windowTop && clientHeight > containerRect.top
      state.transform = difference < 0 ? -difference : 0
    }
    else {
      state.fixed = clientHeight - props.offset < rootRect.bottom
    }
  }

  emit('scroll', { scrollTop, isFixed: state.fixed })
}

function getContainerRect() {
  const nodesRef = props.container?.()

  if (!nodesRef) {
    return Promise.resolve(null)
  }

  return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec())
}
</script>

<template>
  <template v-if="props.disabled">
    <slot />
  </template>
  <template v-else>
    <view
      :class="[bem(), stickySelector]"
      :style="styles"
    >
      <view :style="innerStyles">
        <slot />
      </view>
    </view>
  </template>
</template>

<style lang="scss">
@import './index';
</style>
