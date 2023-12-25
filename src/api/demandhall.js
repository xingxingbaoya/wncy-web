import request from '@/utils/request'

export function getDemandList(data) {
  return request({
    url: 'bussiness/demandServer/getDemandList',
    method: 'post',
    data
  })
}

export function getDemandDetail(params) {
  return request({
    url: 'bussiness/demandServer/getDemandDetail',
    method: 'get',
    params
  })
}

export function addDemandDetail(data) {
  return request({
    url: 'bussiness/demandServer/add',
    method: 'post',
    data
  })
}

export function getMyDemandList(data) {
  return request({
    url: 'bussiness/demandServer/getMyDemandList',
    method: 'post',
    data
  })
}

export function editDemandDetail(data) {
  return request({
    url: 'bussiness/demandServer/edit',
    method: 'post',
    data
  })
}

export function deleteDemandDetail(id) {
  return request({
    url: `bussiness/demandServer/delete/${id}`,
    method: 'delete'
  })
}
