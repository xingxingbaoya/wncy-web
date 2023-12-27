import request from '@/utils/request'

export function getDict(dictType) {
  return request({
    url: `/user/user/dict/${dictType}`,
    method: 'post'
  })
}

export function getOrganization(params) {
  return request({
    url: 'hall/policy/createOrganization',
    method: 'get',
    params
  })
}

