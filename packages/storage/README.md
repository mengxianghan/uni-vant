# uni-vant-storage

## 介绍

uni-vant-storage 是基于 uni-app 的本地存储封装。

## 为什么重新封装

- 支持数据隔离。
- 支持设置过期时间。

## 安装

```shell
pnpm add -S uni-vant-storage
```

## 使用

```javascript
import {createStorage } from 'uni-vant-storage'

const storage = createStorage({
  namespace: 'uniapp_',
  expries: 30
})

storage.setItem('name', 'value')

storage.setItem('name', 'value', { expires: null })

storage.getItem('name', 'default')

storage.removeItem('name')

storage.clear()
```

## API

setItem(key, value, attrs)

getItem(key, defaultValue)

removeItem(key)

clear()