// service统一出口
import request from './request';
// 创建TSRequest实例对象
const requestInstance = new request({
  timeout: 10000,
  interceptors: {
    /* 请求成功的拦截 */
    requestInterceptor: config => {
      return config;
    },
    /* 请求失败的拦截 */
    requestInterceptorCatch: err => {
      return err;
    },
    /* 响应成功的拦截 */
    responseInterceptor: res => {
      return res;
    },
    /* 响应失败的拦截 */
    responseInterceptorCatch: err => {
      return err;
    }
  }
});

export default requestInstance;
