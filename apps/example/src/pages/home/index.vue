<script lang="ts" setup>
import { ref } from 'vue'

interface Item {
  key: string
  name: string
  url?: string
  statusText?: string
  children?: Item[]
}

const list = ref<Item[]>([
  {
    key: 'base',
    name: '基础组件',
    children: [
      { key: 'Button', name: '按钮', url: '/pages/components/button' },
      { key: 'Cell', name: '单元格', url: '/pages/components/cell' },
      { key: 'Icon', name: '图标', url: '/pages/components/icon' },
      { key: 'Image', name: '图片', url: '/pages/components/image' },
      { key: 'Layout', name: '布局', url: '/pages/components/layout' },
      { key: 'Popup', name: '弹出层', url: '/pages/components/popup' },
      { key: 'Space', name: '间距', url: '/pages/components/space' },
      { key: 'Style', name: '内置样式', url: '/pages/components/style' },
      { key: 'Toast', name: '轻提示', url: '/pages/components/toast' },
    ],
  },
  {
    key: 'form',
    name: '表单组件',
    children: [
      { key: 'Calendar', name: '日历', url: '' },
      { key: 'Cascader', name: '级联选择', url: '' },
      { key: 'Checkbox', name: '复选框', url: '/pages/components/checkbox' },
      { key: 'DatePicker', name: '日期选择', url: '' },
      { key: 'Field', name: '输入框', url: '/pages/components/field' },
      { key: 'Form', name: '表单', url: '' },
      { key: 'NumberKeyboard', name: '数字键盘', url: '/pages/components/number-keyboard' },
      { key: 'PasswordInput', name: '密码输入框', url: '/pages/components/password-input' },
      { key: 'Picker', name: '选择器', url: '' },
      { key: 'PickerGroup', name: '选择器组', url: '' },
      { key: 'Radio', name: '单选框', url: '/pages/components/radio' },
      { key: 'Rate', name: '评分', url: '' },
      { key: 'Search', name: '搜索', url: '/pages/components/search' },
      { key: 'Slider', name: '滑块', url: '' },
      { key: 'Signature', name: '签名', url: '' },
      { key: 'Stepper', name: '步进器', url: '/pages/components/stepper' },
      { key: 'Switch', name: '开关', url: '/pages/components/switch' },
      { key: 'TimePicker', name: '时间选择', url: '' },
      { key: 'Uploader', name: '文件上传', url: '/pages/components/uploader' },
    ],
  },
  {
    key: 'feedback',
    name: '反馈组件',
    children: [
      { key: 'ActionSheet', name: '动作面板', url: '/pages/components/action-sheet' },
      { key: 'Barrage', name: '弹幕', url: '' },
      { key: 'Dialog', name: '弹出框', url: '' },
      { key: 'DropdownMenu', name: '下拉菜单', url: '' },
      { key: 'FloatingPanel', name: '浮动面板', url: '/pages/components/floating-panel' },
      { key: 'FloatingBubble', name: '浮动气泡', url: '/pages/components/floating-bubble' },
      { key: 'Loading', name: '加载', url: '/pages/components/loading' },
      { key: 'Notify', name: '消息通知', url: '' },
      { key: 'Overlay', name: '遮罩层', url: '/pages/components/overlay' },
      { key: 'PullRefresh', name: '下拉刷新', url: '' },
      { key: 'ShareSheet', name: '分享面板', url: '/pages/components/share-sheet' },
      { key: 'SwipeCell', name: '滑动单元格', url: '/pages/components/swipe-cell' },
    ],
  },
  {
    key: 'show',
    name: '展示组件',
    children: [
      { key: 'Badge', name: '徽标', url: '/pages/components/badge' },
      { key: 'Circle', name: '环形进度条', url: '/pages/components/circle' },
      { key: 'Collapse', name: '折叠面板', url: '/pages/components/collapse' },
      { key: 'CountDown', name: '倒计时', url: '' },
      { key: 'Divider', name: '分割线', url: '/pages/components/divider' },
      { key: 'Empty', name: '空状态', url: '/pages/components/empty' },
      { key: 'Highlight', name: '高亮文本', url: '' },
      { key: 'ImagePreview', name: '图片预览', url: '' },
      { key: 'Lazyload', name: '懒加载', url: '' },
      { key: 'List', name: '列表', url: '' },
      { key: 'NoticeBar', name: '通知栏', url: '/pages/components/notice-bar' },
      { key: 'Popover', name: '气泡弹出框', url: '' },
      { key: 'Progress', name: '进度条', url: '/pages/components/progress' },
      { key: 'RollingText', name: '翻滚文本动效', url: '' },
      { key: 'Skeleton', name: '骨架屏', url: '' },
      { key: 'Steps', name: '步骤条', url: '/pages/components/steps' },
      { key: 'Sticky', name: '粘性布局', url: '/pages/components/sticky' },
      { key: 'Swipe', name: '轮播', url: '' },
      { key: 'Tag', name: '标签', url: '/pages/components/tag' },
      { key: 'TextEllipsis', name: '文本省略', url: '' },
      { key: 'Watermark', name: '水印', url: '' },
    ],
  },
  {
    key: 'navigator',
    name: '导航组件',
    children: [
      { key: 'ActionBar', name: '动作栏', url: '/pages/components/action-bar' },
      { key: 'BackTop', name: '回到顶部', url: '' },
      { key: 'Grid', name: '宫格', url: '/pages/components/grid' },
      { key: 'IndexBar', name: '索引栏', url: '' },
      { key: 'NavBar', name: '导航栏', url: '' },
      { key: 'Pagination', name: '分页', url: '/pages/components/pagination' },
      { key: 'Sidebar', name: '侧边导航', url: '/pages/components/sidebar' },
      { key: 'Tab', name: '标签页', url: '/pages/components/tab' },
      { key: 'Tabbar', name: '标签栏', url: '/pages/components/tabbar' },
      { key: 'TreeSelect', name: '分类选择', url: '' },
    ],
  },
  {
    key: 'business',
    name: '业务组件',
    children: [
      { key: 'AddressEdit', name: '地址编辑', url: '' },
      { key: 'AddressList', name: '地址列表', url: '' },
      { key: 'Area', name: '省市区选择', url: '' },
      { key: 'Card', name: '卡片', url: '/pages/components/card' },
      { key: 'ContactCard', name: '联系人卡片', url: '' },
      { key: 'ContactEdit', name: '联系人编辑', url: '' },
      { key: 'ContactList', name: '联系人列表', url: '' },
      { key: 'Coupon', name: '优惠券选择器', url: '' },
      { key: 'SubmitBar', name: '提交订单栏', url: '/pages/components/submit-bar' },
    ],
  },
])

function handleNavigator(url) {
  if (!url) {
    return
  }
  uni.navigateTo({ url })
}
</script>

<template>
  <view
    class="home-container"
  >
    <view class="flex pl-6 items-center">
      <image
        class="w-8 h-8"
        src="/static/logo.svg"
        mode="scaleToFill"
      />
      <view class="text-[32px] ml-4">
        uvant ui
      </view>
    </view>
    <view class="text-[#969799] pl-6 mt-4 mb-8 text-sm">
      轻量、可靠的 uniapp 组件库
    </view>

    <template
      v-for="item in list"
      :key="item.key"
    >
      <view class="text-neutral-500 mt-6 ml-4 mb-2">
        {{ item.name }}
      </view>
      <view
        v-for="child in item.children"
        :key="child.key"
        class="bg-white text-[#34495e] font-semibold hover:opacity-80 active:opacity-60 transition-all duration-300 rounded-full pl-5 pr-4 h-10 mb-3 flex items-center"
        @click="handleNavigator(child.url)"
      >
        <view class="flex-1">
          {{ child.key }} {{ child.name }}
        </view>
        <template v-if="!child.url">
          <view
            class="mr-2 font-normal"
            :class="{
              'text-blue-500': child.statusText,
              'text-neutral-500': !child.statusText,
            }"
          >
            {{ child.statusText || '未开始' }}
          </view>
        </template>
        <van-icon name="arrow" />
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  @apply px-5 pb-6 min-h-svh;

  /* #ifdef H5 */
  @apply pt-10;
  /* #endif */

  /* #ifndef H5 */
  @apply pt-8;
  /* #endif */
}
</style>
