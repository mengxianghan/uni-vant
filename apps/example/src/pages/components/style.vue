<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    hairline: '1px 边框',
    ellipsis: '文字省略',
    animation: '动画',
    toggle: '切换动画',
    text1: '这是一段最多显示一行的文字，后面的内容会省略',
    text2: '这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略',
  },
})

const show = ref(false)
const transitionName = ref('')

function animate(newName) {
  show.value = true
  transitionName.value = newName

  setTimeout(() => {
    show.value = false
  }, 500)
}
</script>

<template>
  <view class="demo-doc">
    <demo-block :title="t('ellipsis')">
      <view class="bg-white text-neutral-500 p-3 rounded-md">
        <view class="max-w-[300px]">
          <view class="van-ellipsis">
            {{ t('text1') }}
          </view>
          <view class="van-multi-ellipsis--l2">
            {{ t('text2') }}
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block
      card
      :title="t('hairline')"
    >
      <view class="bg-white py-3 rounded-md">
        <div class="van-hairline--top" />
      </view>
    </demo-block>

    <demo-block
      :title="t('animation')"
      :card="false"
    >
      <van-transition
        :show="show"
        :name="transitionName"
        custom-class="demo-animate-block"
      />

      <van-cell-group inset>
        <van-cell
          title="Fade"
          is-link
          @click="animate('van-fade')"
        />
        <van-cell
          title="Fade Up"
          is-link
          @click="animate('van-fade-up')"
        />
        <van-cell
          title="Fade Down"
          is-link
          @click="animate('van-fade-down')"
        />
        <van-cell
          title="Fade Left"
          is-link
          @click="animate('van-fade-left')"
        />
        <van-cell
          title="Fade Right"
          is-link
          @click="animate('van-fade-right')"
        />
        <van-cell
          title="Slide Up"
          is-link
          @click="animate('van-slide-up')"
        />
        <van-cell
          title="Slide Down"
          is-link
          @click="animate('van-slide-down')"
        />
        <van-cell
          title="Slide Left"
          is-link
          @click="animate('van-slide-left')"
        />
        <van-cell
          title="Slide Right"
          is-link
          @click="animate('van-slide-right')"
        />
        <van-cell
          title="Custom"
          is-link
          @click="animate('custom-fade')"
        />
      </van-cell-group>
    </demo-block>
  </view>
</template>

<style lang="scss">
@keyframes custom-in {
  0% {
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
  40% {
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    transform: perspective(400px) rotateX(-20deg);
  }
  60% {
    opacity: 1;
    transform: perspective(400px) rotateX(10deg);
  }
  80% {
    transform: perspective(400px) rotateX(-5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes custom-out {
  0% {
    transform: perspective(400px);
  }
  30% {
    opacity: 1;
    transform: perspective(400px) rotateX(-20deg);
  }
  to {
    opacity: 0;
    transform: perspective(400px) rotateX(90deg);
  }
}

.custom-fade {
  &-enter-active {
    animation: custom-in 0.3s both;
  }

  &-leave-active {
    animation: custom-out 0.3s both;
  }
}

.demo-animate-block {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  border-radius: 8px;
  z-index: 100;
  @apply bg-blue-500;
}
</style>
