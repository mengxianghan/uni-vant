import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'
import { extend } from './utils'

class Http {
  #axiosInstance: AxiosInstance

  constructor(options: AxiosRequestConfig) {
    this.#axiosInstance = axios.create(
      extend(
        {
          adapter: createUniAppAxiosAdapter(),
        },
        options || {},
      ),
    )
  }

  get instance() {
    return this.#axiosInstance
  }

  request<T>(requestOptions: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .request(requestOptions)
        .then(
          (res) => {
            resolve(res.data)
          },
          (err) => {
            reject(err)
          },
        )
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(url = '', params = {}, getOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>): Promise<T> {
    return this.request<T>({
      ...(getOptions || {}),
      method: 'get',
      url,
      params,
    })
  }

  post<T>(url = '', data = {}, postOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      ...(postOptions || {}),
      method: 'post',
      url,
      data,
    })
  }

  put<T>(url: string, data = {}, putOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      ...(putOptions || {}),
      method: 'put',
      url,
      data,
    })
  }

  delete<T>(url: string, data = {}, deleteOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): Promise<T> {
    return this.request<T>({
      ...deleteOptions,
      method: 'delete',
      url,
      data,
    })
  }

  upload<T>(url: string, data: Record<string, any>, uploadOptions?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): Promise<AxiosResponse<any>> {
    return this.#axiosInstance.request<T>({
      ...(uploadOptions || {}),
      method: 'upload',
      url,
      data,
    })
  }

  download<T>(url: string, downloadOptions?: Omit<AxiosRequestConfig, 'url' | 'method'>): Promise<AxiosResponse<any>> {
    return this.#axiosInstance.request<T>({
      ...(downloadOptions || {}),
      method: 'download',
      url,
    })
  }
}

export const createHttp = (options: AxiosRequestConfig) => new Http(options)
