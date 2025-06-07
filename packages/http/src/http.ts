import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type {
  DeleteOptions,
  DownloadOptions,
  GetOptions,
  IHttp,
  IHttpOptions,
  PostOptions,
  PutOptions,
  UploadOptions,
} from './types'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'
import { omit } from 'lodash-es'
import { extend } from './utils'

class Http {
  #axiosInstance: AxiosInstance

  constructor(options: IHttpOptions) {
    this.#axiosInstance = axios.create(
      extend(
        {
          adapter: createUniAppAxiosAdapter(),
        },
        // omit(options || {}, ['interceptors']),
        omit(options || {}, ['interceptorRequest', 'interceptorRequestError', 'interceptorResponse', 'interceptorResponseError']),
      ),
    )

    this.#axiosInstance.interceptors.request.use((request) => {
      if (options.interceptorRequest) {
        return options.interceptorRequest(request)
      }

      return request
    }, (err) => {
      if (options.interceptorRequestError) {
        return options.interceptorRequestError(err)
      }

      return Promise.reject(err)
    })

    this.#axiosInstance.interceptors.response.use((response) => {
      if (options.interceptorResponse) {
        return options.interceptorResponse(response)
      }

      return response
    }, (err) => {
      if (options.interceptorResponseError) {
        return options.interceptorResponseError(err)
      }

      return Promise.reject(err)
    })
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

  get<T>(url = '', params = {}, getOptions?: GetOptions): Promise<T> {
    return this.request<T>({
      ...(getOptions || {}),
      method: 'get',
      url,
      params,
    })
  }

  post<T>(url = '', data = {}, postOptions?: PostOptions): Promise<T> {
    return this.request<T>({
      ...(postOptions || {}),
      method: 'post',
      url,
      data,
    })
  }

  put<T>(url: string, data = {}, putOptions?: PutOptions): Promise<T> {
    return this.request<T>({
      ...(putOptions || {}),
      method: 'put',
      url,
      data,
    })
  }

  delete<T>(url: string, data = {}, deleteOptions?: DeleteOptions): Promise<T> {
    return this.request<T>({
      ...deleteOptions,
      method: 'delete',
      url,
      data,
    })
  }

  upload<T>(url: string, formData: Record<any, any>, uploadOptions?: UploadOptions): Promise<AxiosResponse<T>> {
    return this.#axiosInstance.request<T>({
      ...(uploadOptions || {}),
      method: 'upload',
      url,
      data: formData,
    })
  }

  download<T>(url: string, downloadOptions?: DownloadOptions): Promise<AxiosResponse<T>> {
    return this.#axiosInstance.request<T>({
      ...(downloadOptions || {}),
      method: 'download',
      url,
    })
  }
}

export const createHttp = (options: IHttpOptions): IHttp => new Http(options)
