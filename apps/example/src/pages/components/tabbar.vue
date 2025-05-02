<script setup lang="ts">
import { useTranslate } from '@/hooks'
import { cdnURL } from '@/utils'
import { ref } from 'vue'

const t = useTranslate({
  'zh-CN': {
    badge: '徽标提示',
    customIcon: '自定义图标',
    customColor: '自定义颜色',
    matchByName: '通过名称匹配',
    switchEvent: '监听切换事件',
  },
  'en-US': {
    badge: 'Show Badge',
    customIcon: 'Custom Icon',
    customColor: 'Custom Color',
    matchByName: 'Match by name',
    switchEvent: 'Change Event',
  },
})

const active = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const activeName = ref('home')

const icon = {
  active: cdnURL('user-active.png'),
  inactive: cdnURL('user-inactive.png'),
}

const onChange = index => uni.showToast({ title: `标签 ${index}`, icon: 'none' })
</script>

<template>
  <view class="demo-doc">
    <demo-block
      :title="t('basicUsage')"
      :card="false"
    >
      <van-tabbar
        v-model="active"
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-tabbar-item icon="home-o">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          {{ t('tab') }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block
      :title="t('matchByName')"
      :card="false"
    >
      <van-tabbar
        v-model="activeName"
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-tabbar-item
          name="home"
          icon="home-o"
        >
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          name="search"
          icon="search"
        >
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          name="friends"
          icon="friends-o"
        >
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          name="setting"
          icon="setting-o"
        >
          {{ t('tab') }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block
      :title="t('badge')"
      :card="false"
    >
      <van-tabbar
        v-model="active2"
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-tabbar-item icon="home-o">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          icon="search"
          dot
        >
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          icon="friends-o"
          badge="5"
        >
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item
          icon="setting-o"
          badge="20"
        >
          {{ t('tab') }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block
      :title="t('customIcon')"
      :card="false"
    >
      <van-tabbar
        v-model="active3"
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-tabbar-item badge="3">
          <span>{{ t('custom') }}</span>
          <template #icon="props">
            <van-image
              :show-error="false"
              :show-loading="false"
              :src="props.active ? icon.active : icon.inactive"
              height="16px"
            />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          {{ t('tab') }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block
      :title="t('customColor')"
      :card="false"
    >
      <van-tabbar
        v-model="active4"
        active-color="#ee0a24"
        :fixed="false"
        :safe-area-inset-bottom="false"
      >
        <van-tabbar-item icon="home-o">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          {{ t('tab') }}
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          {{ t('tab') }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block
      :title="t('switchEvent')"
      :card="false"
    >
      <van-tabbar
        v-model="active5"
        :fixed="false"
        :safe-area-inset-bottom="false"
        @change="onChange"
      >
        <van-tabbar-item icon="home-o">
          {{ `${t('tab')} 1` }}
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          {{ `${t('tab')} 2` }}
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          {{ `${t('tab')} 3` }}
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          {{ `${t('tab')} 4` }}
        </van-tabbar-item>
      </van-tabbar>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
