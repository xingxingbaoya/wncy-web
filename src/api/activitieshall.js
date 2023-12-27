import request from '@/utils/request'

export function getActivityhome(params) {
  return request({
    url: 'activity/home',
    method: 'get',
    params
  })
}

export function getActivityDetail(params) {
  return request({
    url: `activity/detail`,
    method: 'get',
    params
  })
}

export function signUpActivity(data) {
  return request({
    url: 'activity/signUp',
    method: 'post',
    data
  })
}

export function getActivityList(params) {
  return request({
    url: 'activity/search',
    method: 'get',
    params
  })
}

export function getMySingUpInfo(data) {
  return request({
    url: 'activity/singUpInfo',
    method: 'get',
    data
  })
}

export function getsignUpDetail(id) {
  return request({
    url: `activity/signUpDetail/${id}`,
    method: 'get'
  })
}

export function getZgcActivityList(data) {
  return request({
    url: `/bussiness/activityServer/getZgcActivityList`,
    method: 'post',
    data
  })
}

export function getActivitySsb(params) {
  return request({
    url: `/bussiness/activityServer/activitySsb`,
    method: 'get',
    params
  })
}
