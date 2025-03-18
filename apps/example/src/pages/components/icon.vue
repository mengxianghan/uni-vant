<script setup lang="ts">
import { useTranslate } from '@/composables'
import { cdnURL } from '@/utils'
import icons from '@/utils/icons'
import { onPageScroll } from '@dcloudio/uni-app'

const t = useTranslate({
  'zh-CN': {
    title: '图标列表',
    badge: '徽标提示',
    basic: '基础图标',
    copied: '复制成功',
    outline: '线框风格',
    filled: '实底风格',
    demo: '用法示例',
    color: '图标颜色',
    size: '图标大小',
    custom: '自定义图标',
  },
})

const demoIcon = 'chat-o'
const demoImage = cdnURL('icon-demo.png')

function copy(icon, option = {}) {
  let tag = `<van-icon name="${icon}"`
  if ('dot' in option) {
    tag = `${tag} ${option.dot ? 'dot' : ''}`
  }
  if ('badge' in option) {
    tag = `${tag} badge="${option.badge}"`
  }
  if ('color' in option) {
    tag = `${tag} color="${option.color}"`
  }
  if ('size' in option) {
    tag = `${tag} size="${option.size}"`
  }
  if ('classPrefix' in option) {
    tag = `${tag} class-prefix="${option.classPrefix}"`
  }
  tag = `${tag} />`

  uni.setClipboardData({
    data: tag,
    success: () => {
      uni.showToast({
        title: `复制成功：${tag}`,
        icon: 'none',
        duration: 1500,
      })
    },
  })
}
</script>

<template>
  <view class="demo-doc">
    <van-tabs
      sticky
      :page-scroll="onPageScroll"
    >
      <van-tab :title="t('demo')">
        <view class="p-5">
          <view class="bg-white rounded-xl">
            <demo-block
              :title="t('basicUsage')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy(demoIcon)"
                >
                  <icon-block>
                    <van-icon :name="demoIcon" />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>
            <demo-block
              :title="t('usingUrl')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy(demoImage)"
                >
                  <icon-block>
                    <van-icon :name="demoImage" />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>

            <demo-block
              :title="t('badge')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy(demoIcon, { dot: true })"
                >
                  <icon-block>
                    <van-icon
                      :name="demoIcon"
                      dot
                    />
                  </icon-block>
                </van-col>
                <van-col
                  span="6"
                  @click="copy(demoIcon, { badge: '9' })"
                >
                  <icon-block>
                    <van-icon
                      :name="demoIcon"
                      badge="9"
                    />
                  </icon-block>
                </van-col>
                <van-col
                  span="6"
                  @click="copy(demoIcon, { badge: '99+' })"
                >
                  <icon-block>
                    <van-icon
                      :name="demoIcon"
                      badge="99+"
                    />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>

            <demo-block
              :title="t('color')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy('cart-o', { color: '#1989fa' })"
                >
                  <icon-block>
                    <van-icon
                      name="cart-o"
                      color="#1989fa"
                    />
                  </icon-block>
                </van-col>
                <van-col
                  span="6"
                  @click="copy('fire-o', { color: '#ee0a24' })"
                >
                  <icon-block>
                    <van-icon
                      name="fire-o"
                      color="#ee0a24"
                    />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>

            <demo-block
              :title="t('size')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy(demoIcon, { size: '40' })"
                >
                  <icon-block>
                    <van-icon
                      :name="demoIcon"
                      size="40"
                    />
                  </icon-block>
                </van-col>
                <van-col
                  span="6"
                  @click="copy(demoIcon, { size: '3rem' })"
                >
                  <icon-block>
                    <van-icon
                      :name="demoIcon"
                      size="3rem"
                    />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>

            <demo-block
              :title="t('custom')"
              :card="false"
            >
              <van-row>
                <van-col
                  span="6"
                  @click="copy('logo', { size: '40', classPrefix: 'my-icon' })"
                >
                  <icon-block>
                    <van-icon
                      class-prefix="my-icon"
                      name="logo"
                      size="40"
                    />
                  </icon-block>
                </van-col>
              </van-row>
            </demo-block>
          </view>
        </view>
      </van-tab>

      <van-tab :title="t('basic')">
        <view class="p-5">
          <view class="bg-white rounded-xl">
            <van-row>
              <van-col
                v-for="icon in icons.basic"
                :key="icon"
                span="6"
                @click="copy(icon)"
              >
                <icon-block :title="icon">
                  <van-icon :name="icon" />
                </icon-block>
              </van-col>
            </van-row>
          </view>
        </view>
      </van-tab>

      <!-- 线框风格 -->
      <van-tab :title="t('outline')">
        <view class="p-5">
          <view class="bg-white rounded-xl">
            <van-row>
              <van-col
                v-for="icon in icons.outline"
                :key="icon"
                span="6"
                @click="copy(icon)"
              >
                <icon-block :title="icon">
                  <van-icon :name="icon" />
                </icon-block>
              </van-col>
            </van-row>
          </view>
        </view>
      </van-tab>

      <!-- 实底风格 -->
      <van-tab :title="t('filled')">
        <view class="p-5">
          <view class="bg-white rounded-xl">
            <van-row>
              <van-col
                v-for="icon in icons.filled"
                :key="icon"
                span="6"
                @click="copy(icon)"
              >
                <icon-block :title="icon">
                  <van-icon :name="icon" />
                </icon-block>
              </van-col>
            </van-row>
          </view>
        </view>
      </van-tab>
    </van-tabs>
  </view>
</template>

<style lang="scss">
@font-face {
  font-family: 'my-icon';
  src:
    url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff2?t=1728460455317') format('woff2'),
    url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff?t=1728460455317') format('woff'),
    url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.ttf?t=1728460455317') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-logo::before {
  content: '\ec5f';
}
</style>
