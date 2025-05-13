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

export interface IHttp {
  request: <T>(options: AxiosRequestConfig) => Promise<T>
  get: <T>(url: string, params?: any, options?: GetOptions) => Promise<T>
  post: <T>(url: string, data?: any, options?: PostOptions) => Promise<T>
  put: <T>(url: string, data?: any, options?: PutOptions) => Promise<T>
  delete: <T>(url: string, options?: DeleteOptions) => Promise<T>
  upload: <T>(url: string, formData: FormData, options?: UploadOptions) => Promise<AxiosResponse<T>>
  download: <T>(url: string, options?: DownloadOptions) => Promise<AxiosResponse<T>>
}
