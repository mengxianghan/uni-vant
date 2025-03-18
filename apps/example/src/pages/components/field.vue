<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const tel = ref('')
const text = ref('')
const digit = ref('')
const number = ref('')
const password = ref('')
const value1 = ref('')
const value2 = ref('123')
const value3 = ref('')
const value4 = ref('')
const username = ref('')
const phone = ref('')
const sms = ref('')
const message = ref('')

const formatter = value => value.replace(/\d/g, '')
</script>

<template>
  <view class="demo-doc">
    <demo-block
      title="基础用法"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="value"
          label="文本"
          placeholder="请输入用户名"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="自定义类型"
      :card="false"
    >
      <van-cell-group inset>
        <!-- 输入任意文本 -->
        <van-field
          v-model="text"
          label="文本"
          placeholder="请输入文本"
        />
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field
          v-model="tel"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
        />
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field
          v-model="digit"
          type="digit"
          label="整数"
          placeholder="请输入整数"
        />
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field
          v-model="number"
          type="number"
          label="数字"
          placeholder="请输入数字"
        />
        <!-- 输入密码 -->
        <van-field
          v-model="password"
          password
          label="密码"
          placeholder="请输入密码"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="禁用输入框"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          label="文本"
          model-value="输入框已禁用"
          disabled
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="显示图标"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="value1"
          label="文本"
          left-icon="smile-o"
          right-icon="warning-o"
          placeholder="显示图标"
        />
        <van-field
          v-model="value2"
          clearable
          label="文本"
          left-icon="music-o"
          placeholder="显示清除图标"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="必填星号"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="username"
          required
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="phone"
          required
          label="手机号"
          placeholder="请输入手机号"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="错误提示"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="username"
          error
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="插入按钮"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
            >
              发送验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </demo-block>

    <demo-block
      title="格式化输入内容"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="value1"
          :formatter="formatter"
          label="文本"
          placeholder="在输入时执行格式化"
        />
        <van-field
          v-model="value2"
          :formatter="formatter"
          label="文本"
          format-trigger="onBlur"
          placeholder="在失焦时执行格式化"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="高度自适应"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="1"
          autosize
          label="留言"
          type="textarea"
          placeholder="请输入留言"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="显示字数统计"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          :maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="输入框内容对齐"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="value"
          label="文本"
          placeholder="输入框内容右对齐"
          input-align="right"
        />
      </van-cell-group>
    </demo-block>

    <demo-block
      title="输入框文本位置"
      :card="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="value"
          label="文本"
          placeholder="顶部对齐"
          label-align="top"
        />
        <van-field
          v-model="value2"
          label="文本"
          placeholder="左对齐"
          label-align="left"
        />
        <van-field
          v-model="value3"
          label="文本"
          placeholder="居中对齐"
          label-align="center"
        />
        <van-field
          v-model="value4"
          label="文本"
          placeholder="右对齐"
          label-align="right"
        />
      </van-cell-group>
    </demo-block>
  </view>
</template>

<style lang="scss" scoped></style>
