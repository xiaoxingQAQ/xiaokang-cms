import { request } from './request'

export function login(data) {
  return request({
    method: 'POST',
    url: '/service/member/login',
    data
  })
}