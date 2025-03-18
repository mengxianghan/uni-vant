<script lang="ts" setup>
import { computed, type CSSProperties, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
import { useRect } from '../composables/use-rect'
import VanIcon from '../icon/icon.vue'
import {
  addUnit,
  createUniqueSelector,
  getSizeStyle,
} from '../utils'
import { imageBem as bem, imageEmits, imageProps, imageName as name } from './image'

defineOptions({
  name,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
const props = defineProps(imageProps)

const emit = defineEmits(imageEmits)

const [imageSelector] = createUniqueSelector(name)
const instance = getCurrentInstance()

const loading = ref(true)
const error = ref(false)
const imageRect = reactive({
  width: 0,
  height: 0,
  originWidth: 0,
  originHeight: 0,
})

const styles = computed(() => {
  let style: CSSProperties = {
    borderRadius: addUnit(props.radius),
  }

  // 如果设置了宽 & 高
  if (props.width && props.height) {
    style = {
      ...style,
      ...getSizeStyle([props.width, props.height]),
    }

    return style
  }

  if (props.autosize) {
    return style
  }

  if (props.aspectRatio) {
    if (props.width) {
      style.width = addUnit(props.width)
      style.height = `calc(${addUnit(props.width)} / ${props.aspectRatio})`
      return style
    }

    if (props.height) {
      style.width = `calc(${addUnit(props.height)} * ${props.aspectRatio})`
      style.height = addUnit(props.height)
      return style
    }

    if (imageRect.width) {
      style.width = addUnit(imageRect.width)
      style.height = addUnit(imageRect.width / props.aspectRatio)
      return style
    }

    if (imageRect.height) {
      style.width = addUnit(imageRect.height * props.aspectRatio)
      style.height = addUnit(imageRect.height)
      return style
    }
  }
  else {
    if (props.width) {
      style.width = addUnit(props.width)
      style.height = `calc(${addUnit(props.width)} * ${imageRect.originHeight} / ${imageRect.originWidth})`
      return style
    }

    if (props.height) {
      style.width = `calc(${addUnit(props.height)} * ${imageRect.originWidth} / ${imageRect.originHeight})`
      style.height = addUnit(props.height)
      return style
    }

    if (imageRect.width) {
      style.width = addUnit(imageRect.width)
      style.height = addUnit((imageRect.width * imageRect.originHeight) / imageRect.originWidth)
      return style
    }

    if (imageRect.height) {
      style.width = addUnit((imageRect.originWidth * imageRect.height) / imageRect.originHeight)
      style.height = addUnit(imageRect.height)
      return style
    }
  }

  return style
})
const autosize = computed(() => props.autosize && !props.width && !props.height)

onMounted(() => {
  getImageRect()
})

function getImageRect() {
  if (imageRect.width || imageRect.height)
    return
  nextTick(() => {
    useRect(`.${imageSelector}`, instance).then((data) => {
      imageRect.width = data.width
      imageRect.height = data.height
    })
  })
}

function onClick(evt: MouseEvent) {
  emit('click', evt)
}

function onLoad(evt) {
  const { width, height } = evt.detail
  loading.value = false
  error.value = false
  imageRect.originWidth = width
  imageRect.originHeight = height
  emit('load', evt)
}

function onError(evt) {
  loading.value = false
  error.value = true
  emit('error', evt)
}
</script>

<template>
  <view
    :class="[
      bem({
        round: props.round,
        autosize,
      }),
      imageSelector,
      props.customClass,
    ]"
    :style="styles"
    @click="onClick"
  >
    <image
      :src="props.src"
      :mode="props.fit"
      :lazy-load="props.lazyLoad"
      :alt="props.alt"
      :webp="props.webp"
      :class="bem('img')"
      @error="onError"
      @load="onLoad"
    />

    <template v-if="loading && props.showLoading">
      <view :class="bem('loading')">
        <slot name="loading">
          <view :class="bem('loading-icon')">
            <van-icon
              :name="props.loadingIcon"
              :size="props.iconSize"
              :class-prefix="props.iconPrefix"
            />
          </view>
        </slot>
      </view>
    </template>

    <template v-if="error && props.showError">
      <view :class="bem('error')">
        <slot name="error">
          <view :class="bem('error-icon')">
            <van-icon
              :name="props.errorIcon"
              :size="props.iconSize"
              :class-prefix="props.iconPrefix"
            />
          </view>
        </slot>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
