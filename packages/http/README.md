# uni-vant-http

## 介绍

`uni-vant-http` 是用于 `uniapp` 的 `http` 请求库，基于 `axios` `@uni-helper/axios-adapter`

## 安装

```shell
pnpm add -S uni-vant-http
```

## 基础使用

```javascript
import { createHttp } from 'uni-vant-http'

const options = {
  baseURL: '',
}

const request = createHttp(options)

request.get('/user', { id: 1 })
```

## 使用多个服务
```javascript
import { createHttp } from 'uni-vant-http'

const options = {
  timeout: 1000,
}

const request = createHttp({
  ...options,
  baseURL: '',
})

const request2 = createHttp({
  ...options,
  baseURL: '',
})

request.get('/user', { id: 1 })

request2.get('/user', { id: 1 })
```

## 拦截器
```javascript
import { createHttp } from 'uni-vant-http'

const options = {
  // 请求拦截
  interceptorRequest: (request)=>{
    return request
  },
  // 请求错误拦截
  interceptorRequestError: (error)=>{},
  // 响应拦截
  interceptorResponse: (response)=>{
    return response
  },
  // 响应错误拦截
  interceptorResponseError: (error)=>{}
}

const request = createHttp(options)

request.get('/user', { id: 1 })
```

## 取消请求
```javascript
import { createHttp } from 'uni-vant-http'
import axios from 'axios'

const request = createHttp({})

// 小程序中无法使用 AbortController，在这里使用 CancelToken 取消请求

const CancelToken = axios.CancelToken
const source = CancelToken.source()

request.get('/user', {id: 1}, {
  cancelToken: source.token
})

// 取消请求
source.cancel('取消请求')
```

## 使用 axios 实例
```javascript
import { createHttp } from 'uni-vant-http'

const request = createHttp({})
const instance = request.instance

// 添加请求拦截器
const myRequestInterceptor = instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 移除拦截器
instance.interceptors.request.eject(myRequestInterceptor)
```

## API

request(options)

get(url, params, options)

post(url, body, options)

put(url, body, options)

delete(url, params, options)

upload(url, formData, options)

download(url, options)

## 更多

更多高级使用方式，请查看 [axios](https://axios-http.com/)