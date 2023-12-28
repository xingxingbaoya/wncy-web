import request from '@/utils/request'

export function getCaptchaImage() {
  return request({
    url: `user/user/captcha/captchaImage`,
    method: 'get'
  })
}

export function sendValidateCode(params) {
  return request({
    url: `user/user/validateCode/send`,
    method: 'get',
    params,
  })
}

export function registerUser(data) {
  return request({
    url: `user/user/register`,
    method: 'post',
    data,
  })
}
export function passLogin(data) {
  return request({
    url: `user/user/passLogin`,
    method: 'post',
    data
  })
}

export function smsLogin(data) {
  return request({
    url: `user/user/smsLogin`,
    method: 'post',
    data,
  })
}

export function changePass(data) {
  return request({
    url: `user/user/ucenter/changePass`,
    method: 'post',
    data
  })
}

