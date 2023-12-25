import request from '@/utils/request'

export function getUserDetail() {
  return request({
    url: `user/user/ucenter/detail`,
    method: 'get'
  })
}

export function authUserType(data) {
  return request({
    url: `user/user/ucenter/auth`,
    method: 'post',
    data
  })
}

export function validPhone(data) {
  return request({
    url: `user/user/ucenter/validPhone`,
    method: 'post',
    data
  })
}

export function changePhone(data) {
  return request({
    url: `user/user/ucenter/changePhone`,
    method: 'post',
    data
  })
}

export function changePassword(data) {
  return request({
    url: `user/user/ucenter/changePassword`,
    method: 'post',
    data
  })
}

export function retrievePassword(data) {
  return request({
    url: `user/user/retrievePassword`,
    method: 'post',
    data
  })
}

export function generateCaptcha(data) {
  return request({
    url: `user/user/captcha/generateCaptcha`,
    method: 'post',
    data
  })
}

