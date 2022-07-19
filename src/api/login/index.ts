import http from '@/service';

/**
 * 用户登录
 */
export const login = (data: API.LoginRequest) => {
  return http.post({
    url: '/login/getLogin', data, _isMock: true
  })
}