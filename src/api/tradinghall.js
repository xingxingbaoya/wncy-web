import request from '@/utils/request'

export function getTradeProcessList(data) {
  return request({
    url: `bussiness/tradeProcessServer/getTradeProcessList`,
    method: 'post',
    data
  })
}

export function getTradeProcessDetail(params) {
  return request({
    url: `bussiness/tradeProcessServer/getTradeProcessDetail`,
    method: 'get',
    params
  })
}

export function getDemandList(data) {
  return request({
    url: `bussiness/tradeProcessServer/getDemandList`,
    method: 'post',
    data
  })
}

export function getTradeResultDetail(params) {
  return request({
    url: `bussiness/tradeProcessServer/getTradeResultDetail`,
    method: 'get',
    params
  })
}
