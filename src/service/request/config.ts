import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TSRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface TSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TSRequestInterceptors<T>,
  _isMock?: boolean
}