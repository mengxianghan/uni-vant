import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface IOptions extends AxiosRequestConfig {
  // 请求拦截
  interceptorRequest?: (request: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
  // 请求拦截 catch
  interceptorRequestError?: (err: any) => any
  // 响应拦截
  interceptorResponse?: (response: AxiosResponse) => AxiosResponse
  // 响应拦截 catch
  interceptorResponseError?: (err: any) => any
}

export type GetOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>

export type PostOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>

export type PutOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>

export type DeleteOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>

export type UploadOptions = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> & Omit<UniApp.UploadFileOption, 'url'>

export type DownloadOptions = Omit<AxiosRequestConfig, 'url' | 'method'>
