<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue'
import {
  canIUseCanvas2d,
  createUniqueSelector,
  getSizeStyle,
  isObject,
} from '../utils'
import { adaptor } from './canvas'
import { circleBem, circleEmits, circleName, circleProps } from './circle'

defineOptions({
  name: circleName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(circleProps)

const emit = defineEmits(circleEmits)

const PERIMETER = 2 * Math.PI
const STEP = 1
const ROTATE_ANGLE_MAP = {
  top: -Math.PI / 2,
  right: 0,
  bottom: Math.PI / 2,
  left: Math.PI,
}

const instance = getCurrentInstance()

const slots = useSlots()
const [canvasSelector] = createUniqueSelector(circleName)

const hoverColor = ref<string | UniApp.CanvasGradient>('#1989fa')
const initialized = ref(false)
const currentValue = ref(props.currentRate)
const interval = ref()

const hasText = computed(() => {
  return props.text || slots.default
})

watch(
  () => props.currentRate,
  (val) => {
    if (val === currentValue.value)
      return
    reRender()
  },
)

onMounted(() => {
  setHoverColor().then(() => {
    drawCircle(currentValue.value)
  })
})

onBeforeUnmount(() => {
  clearMockInterval()
})

function format(rate: number) {
  return Math.min(Math.max(rate, 0), 100)
}

function getContext(): Promise<UniApp.CanvasContext> {
  const { type, size } = props

  if (!canIUseCanvas2d()) {
    const ctx = uni.createCanvasContext(canvasSelector, instance)
    return Promise.resolve(ctx)
  }

  const dpr = uni.getSystemInfoSync().pixelRatio

  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .in(instance)
      .select(`#${canvasSelector}`)
      .fields({ node: true, size: true }, (res) => {
        const canvas = Array.isArray(res) ? res[0].node : res.node
        const ctx = canvas.getContext(type)

        if (!initialized.value) {
          initialized.value = true
          canvas.width = size * dpr
          canvas.height = size * dpr
          ctx.scale(dpr, dpr)
        }

        resolve(adaptor(ctx))
      })
      .exec()
  })
}

function setHoverColor() {
  const { color, size } = props

  if (isObject(color)) {
    return getContext().then((context) => {
      if (!context)
        return

      const LinearColor = context.createLinearGradient(size, 0, 0, 0)
      Object.keys(color)
        .sort((a, b) => Number.parseFloat(a) - Number.parseFloat(b))
        .map(key => LinearColor.addColorStop(Number.parseFloat(key) / 100, color[key]))
      hoverColor.value = LinearColor
    })
  }

  hoverColor.value = color
  return Promise.resolve()
}

function presetCanvas(context: UniApp.CanvasContext, strokeStyle: string | UniApp.CanvasGradient, beginAngle: number, endAngle: number, fill?: string) {
  const { strokeWidth, strokeLinecap, clockwise, size } = props
  const position = size / 2
  const radius = position - strokeWidth / 2

  context.setStrokeStyle(strokeStyle)
  context.setLineWidth(strokeWidth)
  context.setLineCap(strokeLinecap)

  context.beginPath()
  context.arc(position, position, radius, beginAngle, endAngle, !clockwise)
  context.stroke()

  if (fill) {
    context.setFillStyle(fill)
    context.fill()
  }
}

function renderLayerCircle(context: UniApp.CanvasContext) {
  const { layerColor, fill } = props
  presetCanvas(context, layerColor, 0, PERIMETER, fill)
}

function renderHoverCircle(context: UniApp.CanvasContext, formatValue: number) {
  const { clockwise, startPosition } = props
  const beginAngle = ROTATE_ANGLE_MAP[startPosition]
  // 结束角度
  const progress = PERIMETER * (formatValue / 100)
  const endAngle = clockwise ? beginAngle + progress : 3 * Math.PI - (beginAngle + progress)

  presetCanvas(context, hoverColor.value, beginAngle, endAngle)
}

function drawCircle(currentValue: number) {
  const { size } = props

  getContext().then((context) => {
    if (!context)
      return

    context.clearRect(0, 0, size, size)
    renderLayerCircle(context)

    const formatValue = format(currentValue)
    if (formatValue !== 0) {
      renderHoverCircle(context, formatValue)
    }

    context.draw()
  })
}

function reRender() {
  // tofector 动画暂时没有想到好的解决方案
  const { currentRate, speed } = props

  if (speed <= 0 || speed > 1000) {
    drawCircle(currentRate)
    return
  }

  clearMockInterval()
  currentValue.value = currentValue.value || 0
  const run = () => {
    interval.value = setTimeout(() => {
      if (currentValue.value !== currentRate) {
        if (Math.abs(currentValue.value - currentRate) < STEP) {
          currentValue.value = currentRate
        }
        else if (currentValue.value < currentRate) {
          currentValue.value += STEP
        }
        else {
          currentValue.value -= STEP
        }
        drawCircle(currentValue.value)
        run()
      }
      else {
        trigger()
        clearMockInterval()
      }
    }, 1000 / speed)
  }
  run()
}

function clearMockInterval() {
  if (interval.value) {
    clearTimeout(interval.value)
    interval.value = null
  }
}

function trigger() {
  emit('update:currentRate', currentValue.value)
}
</script>

<template>
  <view
    :class="circleBem()"
    :style="getSizeStyle(props.size)"
  >
    <canvas
      :id="canvasSelector"
      :class="circleBem('canvas')"
      :canvas-id="canvasSelector"
      :type="props.type"
      :style="getSizeStyle(props.size)"
    />
    <template v-if="hasText">
      <view :class="circleBem('text')">
        <slot>{{ props.text }}</slot>
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
