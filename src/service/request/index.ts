import axios from 'axios';
import { message } from 'ant-design-vue';
import { removeCache, getCache } from '@/utils/cache';
import Router from '@/router/index';
import { TSRequestInterceptors, TSRequestConfig } from './config'
import type { AxiosInstance } from 'axios'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

export interface BaseResponse<T> {
  message: string;
  code: string;
  data: T;
}

class Request {
  instance: AxiosInstance
  interceptors?: TSRequestInterceptors
  constructor(config: TSRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = getCache('accessToken');
        if (accessToken) {
          config.headers.accessToken = `${accessToken}`
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const status = response.status;
        if (status === 200) {
          const result = response.data;
          if (result.code == 200) {
            return result
          } else {
            message.error(result.message || '');
            return Promise.reject(response);
          }
        } else {
          return Promise.reject(response);
        }
      },
      (err) => {
        const { response } = err;
        if (response) {
          let errorMsg = '';
          switch (response.status) {
            case 400:
              errorMsg = '错误请求';
              break;
            case 401:
              errorMsg = '未登录,请重新登录';
              // 跳转登录
              removeCache('token');
              // 跳转登录
              Router.push({
                path: '/login'
              });
              break;
            case 403:
              errorMsg = '拒绝访问';
              break;
            case 404:
              errorMsg = '请求错误，未找到该资源';
              break;
            case 405:
              errorMsg = '请求方法未允许';
              break;
            case 408:
              errorMsg = '请求超时';
              break;
            case 500:
              errorMsg = '服务器出错';
              break;
            case 501:
              errorMsg = '网络未实现';
              break;
            case 502:
              errorMsg = '网络错误';
              break;
            case 503:
              errorMsg = '服务不可用';
              break;
            case 504:
              errorMsg = '网络超时';
              break;
            case 505:
              errorMsg = 'http版本不支持该请求';
              break;
            default:
              errorMsg = '连接错误';
          }
          message.error(errorMsg || '');
          return false;
        } else {
          // 服务器连结果都没有返回  有可能是断网或者服务器奔溃
          if (!window.navigator.onLine) {
            // 断网处理
            message.error('网络中断');
          } else {
            // 服务器奔了
            message.error('服务器崩了');
            return Promise.reject(err);
          }
        }
      }
    );
  }

  request<T>(config: TSRequestConfig<BaseResponse<T>>): Promise<BaseResponse<T>> {
    NProgress.start();
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      this.instance
        .request<any, BaseResponse<T>>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将结果resolve返回出去
          NProgress.done();
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: TSRequestConfig<BaseResponse<T>>): Promise<BaseResponse<T>> {
    if (config._isMock) config = { ...config, url: process.env.VUE_APP_MOCK_API + config.url }
    else config = { ...config, url: process.env.VUE_APP_BASE_API + config.url }
    return this.request<T>({ ...config, method: 'GET', params: config.data })
  }

  post<T>(config: TSRequestConfig<BaseResponse<T>>): Promise<BaseResponse<T>> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default Request;
