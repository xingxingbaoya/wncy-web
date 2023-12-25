import request from '@/utils/request'

export function getService(params) {
  return request({
    url: 'bussiness/service/home',
    method: 'get',
    params
  })
}

export function getCircles(params) {
  return request({
    url: 'bussiness/service/circles',
    method: 'get',
    params
  })
}

export function getServiceSearch(params) {
  return request({
    url: 'bussiness/service/search',
    method: 'get',
    params
  })
}

export function getServiceDetail(id) {
  return request({
    url: `bussiness/service/detail/${id}`,
    method: 'get'
  })
}

export function getOrgList(params) {
  return request({
    url: `bussiness/service/orgList`,
    method: 'get',
    params
  })
}

export function getOrgDetail(id) {
  return request({
    url: `user/user/detail/${id}`,
    method: 'get'
  })
}
export function getServiceTypeListThree() {
  return request({
    url: `/bussiness/service/getServiceTypeListThree`,
    method: 'get'
  })
}

export function getServiceTypeListTwo(params) {
  return request({
    url: `/bussiness/service/getServiceTypeListTwo`,
    method: 'get',
    params
  })
}

