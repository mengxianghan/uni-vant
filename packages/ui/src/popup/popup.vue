<script lang="ts" setup>
import { computed, normalizeStyle, onMounted, watch } from 'vue'
import { useGlobalZIndex } from '../composables/use-global-z-index'
import { useLockScroll } from '../composables/use-lock-scroll'
import VanIcon from '../icon/icon.vue'
import VanOverlay from '../overlay/overlay.vue'
import VanTransition from '../transition/transition.vue'
import { isDef } from '../utils'
import { popupBem as bem, popupName as name, popupEmits, popupProps } from './popup'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)

const show = defineModel('show', { type: Boolean, default: false })
const computedZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))
const computedPosition = computed(() => {
  const transition = {
    center: 'van-fade',
    top: 'van-slide-down',
    bottom: 'van-slide-up',
    left: 'van-slide-left',
    right: 'van-slide-right',
  }
  return transition[props.position] || 'van-fade'
})

watch(
  () => show.value,
  (val, oval) => {
    if (val === oval)
      return

    val ? open() : close()
  },
)

onMounted(() => {
  if (show.value) {
    open()
  }
})

useLockScroll({ shouldLock: () => show.value && props.lockScroll })

function open() {
  show.value = true
}

function close() {
  show.value = false
}

function onClickOverlay(evt: MouseEvent) {
  emit('clickOverlay', evt)

  if (props.closeOnClickOverlay) {
    close()
  }
}

function onClickCloseIcon(evt: MouseEvent) {
  emit('clickCloseIcon', evt)
  close()
}

function onEnter() {
  emit('open')
}

function onAfterEnter() {
  emit('opened')
}

function onLeave() {
  emit('close')
}

function onAfterLeave() {
  emit('closed')
}
</script>

<template>
  <view>
    <template v-if="props.overlay">
      <van-overlay
        :show="show"
        :z-index="computedZIndex"
        :duration="props.duration"
        :custom-style="props.overlayStyle"
        :custom-class="props.overlayClass"
        :destroy-on-close="props.destroyOnClose"
        @click="onClickOverlay"
      />
    </template>
    <van-transition
      :show="show"
      :custom-class="[
        bem(
          [props.position, { round: props.round }],
        ),
        {
          'van-safe-area-top': props.safeAreaInsetTop,
          'van-safe-area-bottom': props.safeAreaInsetBottom,
        },
        props.customClass,
      ]"
      :custom-style="normalizeStyle([props.customStyle, { zIndex: computedZIndex }])"
      :name="computedPosition"
      :destroy-on-close="props.destroyOnClose"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <slot />

      <!-- 关闭按钮 -->
      <template v-if="props.closeable">
        <view
          :class="[
            bem('close-icon', [props.closeIconPosition]),
          ]"
          @click="onClickCloseIcon"
        >
          <van-icon
            :class-prefix="props.iconPrefix"
            :name="props.closeIcon"
          />
        </view>
      </template>
    </van-transition>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
