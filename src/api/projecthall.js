import request from '@/utils/request'

export function getProjectList(data) {
  return request({
    url: 'bussiness/project/getProjectList',
    method: 'post',
    data
  })
}

export function getProjectDetail(params) {
  return request({
    url: 'bussiness/project/getProjectDetail',
    method: 'get',
    params
  })
}

export function addProjectDetail(data) {
  return request({
    url: 'bussiness/project/add',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function getMyProjectList(data) {
  return request({
    url: 'bussiness/project/getMyProjectList',
    method: 'post',
    data
  })
}

export function editProjectDetail(data) {
  return request({
    url: 'bussiness/project/edit',
    method: 'post',
    data
  })
}

export function deleteProjectDetail(id) {
  return request({
    url: `bussiness/project/delete/${id}`,
    method: 'delete'
  })
}

export function getSearchListByTop(data) {
  return request({
    url: '/bussiness/service/searchListByTop',
    method: 'post',
    data
  })
}
