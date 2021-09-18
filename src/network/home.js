import { request } from './request'

export function card_1(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getinformation',
    data
  })
}

export function card_2(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/getrequestinfo',
    data
  })
}

export function card_3(data) {
  return request({
    method: 'post',
    url: '/service/backequipment/requestinfoList',
    data
  })
}