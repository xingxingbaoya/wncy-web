import request from '@/utils/request'

export function getCourseList(data) {
  return request({
    url: `bussiness/courseServer/getCourseList`,
    method: 'post',
    data
  })
}

export function getCourseDetail(params) {
  return request({
    url: `bussiness/courseServer/getCourseDetail`,
    method: 'get',
    params
  })
}
