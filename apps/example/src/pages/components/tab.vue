<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    tab: '标签 ',
    content: '内容',
    title2: '标签栏滚动',
    title3: '禁用标签',
    title4: '样式风格',
    title5: '点击事件',
    title6: '粘性布局',
    title7: '自定义标签',
    title8: '切换动画',
    title9: '滑动切换',
    shrink: '收缩布局',
    matchByName: '通过名称匹配',
    beforeChange: '异步切换',
  },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active6 = ref(0)
const active7 = ref(0)
const active8 = ref(0)
// const active9 = ref(0)
const active11 = ref(0)
const activeName = ref('b')

const tabs = [1, 2, 3, 4]

function onClickTab({ title }) {
  uni.showToast({ title, icon: 'none' })
}

function beforeChange(name) {
  if (name === 1) {
    return false
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(name !== 3), 1000)
  })
}
</script>

<template>
  <view class="demo-tab pb-5">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-tabs v-model:active="active1">
        <van-tab
          v-for="index in tabs"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      :card="false"
    >
      <van-tabs v-model:active="activeName">
        <van-tab
          name="a"
          :title="t('tab') + 1"
        >
          <view class="content">
            {{ t('content') }} 1
          </view>
        </van-tab>
        <van-tab
          name="b"
          :title="t('tab') + 2"
        >
          <view class="content">
            {{ t('content') }} 2
          </view>
        </van-tab>
        <van-tab
          name="c"
          :title="t('tab') + 3"
        >
          <view class="content">
            {{ t('content') }} 3
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title2')"
      :card="false"
    >
      <van-tabs v-model:active="active2">
        <van-tab
          v-for="index in 8"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title3')"
      :card="false"
    >
      <van-tabs v-model:active="active3">
        <van-tab
          v-for="index in 3"
          :key="index"
          :title="t('tab') + index"
          :disabled="index === 2"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title4')"
      :card="false"
    >
      <van-tabs
        v-model:active="active4"
        type="card"
      >
        <van-tab
          v-for="index in 3"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content !bg-transparent">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title5')"
      :card="false"
    >
      <van-tabs
        v-model:active="active5"
        @click-tab="onClickTab"
      >
        <van-tab
          v-for="index in 2"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title6')"
      :card="false"
    >
      <van-tabs
        v-model:active="active6"
        sticky
        :page-scroll="onPageScroll"
      >
        <van-tab
          v-for="index in tabs"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('title7')"
      :card="false"
    >
      <van-tabs v-model:active="active7">
        <van-tab
          name="a"
          :title="t('tab') + 1"
        >
          <view class="content">
            {{ t('content') }} 1
          </view>
        </van-tab>
        <template #a>
          <view class="flex items-center">
            <van-image
              height="14px"
              :src="cdnURL('user-active.png')"
            />
            <text class="ml-1">
              自定义
            </text>
          </view>
        </template>
        <van-tab
          name="b"
          :title="t('tab') + 2"
          icon="more-o"
        >
          <view class="content">
            {{ t('content') }} 2
          </view>
        </van-tab>
        <van-tab
          name="c"
          :title="t('tab') + 3"
          icon="more-o"
        >
          <view class="content">
            {{ t('content') }} 3
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block
      :title="t('shrink')"
      :card="false"
    >
      <van-tabs
        v-model:active="active1"
        shrink
      >
        <van-tab
          v-for="index in tabs"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
      <view class="mt-4">
        <van-tabs
          v-model:active="active2"
          type="card"
          shrink
        >
          <van-tab
            v-for="index in tabs"
            :key="index"
            :title="t('tab') + index"
          >
            <view class="content !bg-transparent">
              {{ t('content') }} {{ index }}
            </view>
          </van-tab>
        </van-tabs>
      </view>
    </demo-block>

    <demo-block
      :title="t('title8')"
      :card="false"
    >
      <van-tabs
        v-model:active="active8"
        animated
      >
        <van-tab
          v-for="index in tabs"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <!-- <demo-block
            :title="t('title9')"
            :card="false">
            <van-tabs
                v-model:active="active9"
                swipeable>
                <van-tab
                    :title="t('tab') + index"
                    v-for="index in tabs"
                    :key="index">
                    <view class="content">{{ t('content') }} {{ index }}</view>
                </van-tab>
            </van-tabs>
        </demo-block> -->

    <demo-block
      :title="t('beforeChange')"
      :card="false"
    >
      <van-tabs
        v-model:active="active11"
        :before-change="beforeChange"
      >
        <van-tab
          v-for="index in 4"
          :key="index"
          :title="t('tab') + index"
        >
          <view class="content">
            {{ t('content') }} {{ index }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>
  </view>
</template>

<style scoped lang="scss">
.demo-tab {
  .content {
    @apply bg-white p-4;
  }
}
</style>
