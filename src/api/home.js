import request from '@/utils/request'
import qs from 'qs'

export function getBanners(params) {
  return request({
    url: 'hall/home/banners',
    method: 'get',
    params
  })
}

export function getLiving(params) {
  return request({
    url: 'hall/home/living',
    method: 'get',
    params
  })
}

export function getPreview(params) {
  return request({
    url: 'hall/home/preview',
    method: 'get',
    params
  })
}

export function getUserList(data) {
  return request({
    url: 'user/user/getUserList',
    method: 'post',
    data
  })
}

export function getIndustry(params) {
  return request({
    url: 'hall/home/industry',
    method: 'get',
    params
  })
}

export function findAll(params) {
  return request({
    url: 'hall/datapresentation/findAll',
    method: 'get',
    params
  })
}

export function findPolicyService(data = {}) {
  return request({
    url: 'bussiness/realInfo/syList',
    method: 'post',
    data
  })
}
export function getInterList(data) {
  return request({
    url: 'bussiness/ZgcNewsServer/zgcNewsList',
    method: 'post',
    data
  })
}

export function getTwoAll(params) {
  return request({
    url: 'hall/homeTwo/twoAll',
    method: 'get',
    params
  })
}
export function getCongresss(params) {
  return request({
    url: 'hall/homeTwo/congresss',
    method: 'get',
    params
  })
}

export function getAgendaAll(params) {
  return request({
    url: 'hall/homeTwo/agendaAll',
    method: 'get',
    params
  })
}

export function findAllGuest(params) {
  return request({
    url: 'hall/guests/findAll',
    method: 'get',
    params
  })
}

export function findAllLiving(params) {
  return request({
    url: 'hall/homeTwo/living',
    method: 'get',
    params
  })
}

export function findGuestDetail(params) {
  return request({
    url: 'hall/guests/findAlll',
    method: 'get',
    params
  })
}
export function findGuestDetailNew(params) {
  return request({
    url: 'bussiness/conference/getGuestsDetails',
    method: 'get',
    params
  })
}
export function getPolicyDetail(params) {
  return request({
    url: 'hall/policy/content',
    method: 'get',
    params
  })
}

export function getStatistics(data) {
  return request({
    url: 'bussiness/statistics/browse',
    method: 'post',
    data
  })
}

