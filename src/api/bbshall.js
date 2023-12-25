import request from '@/utils/request'
import qs from 'qs'

export function getBBsHome(params) {
  return request({
    url: 'hall/bbs/home',
    method: 'get',
    params
  })
}

export function getBBsColumnList(params) {
  return request({
    url: 'hall/bbs/column/search',
    method: 'get',
    params
  })
}

export function getBBsColumnDetail(id) {
  return request({
    url: `hall/bbs/column/detail/${id}`,
    method: 'get'
  })
}

export function getBBsList(params) {
  return request({
    url: 'hall/bbs/manuscript/search',
    method: 'get',
    params
  })
}

export function getBBsDetail(id) {
  return request({
    url: `/hall/bbs/manuscript/detail/${id}`,
    method: 'get'
  })
}
export function getBBsDetailWYB(id) {
  return request({
    url: `/bussiness/BbsColumnManuscript/getZgcRealInfoDetail/${id}`,
    method: 'get'
  })
}

export function getBBsIndustryList(params) {
  return request({
    url: 'hall/bbs/industry/search',
    method: 'get',
    params
  })
}

export function getBBsIndustry(id) {
  return request({
    url: `/hall/bbs/industry/detail/${id}`,
    method: 'get'
  })
}

export function getBBsQsList(params) {
  return request({
    url: 'hall/bbs/qs/search',
    method: 'get',
    params
  })
}

export function getBBsQsDetail(id) {
  return request({
    url: `/hall/bbs/qs/detail/${id}`,
    method: 'get'
  })
}

export function getBBsQsAnswers(data) {
  return request({
    url: 'hall/bbs/qs/answers',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function postBBsQsAnswers(data) {
  return request({
    url: 'hall/bbs/ucenter/qs/answer',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function addBBsManuscript(data) {
  return request({
    url: 'hall/bbs/ucenter/manuscript/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function addBBsQuestion(data) {
  return request({
    url: 'hall/bbs/ucenter/qs/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getMyManuscript(data) {
  return request({
    url: 'hall/bbs/ucenter/manuscript/list',
    method: 'post',
    data
  })
}

export function updateMyManuscript(data) {
  return request({
    url: 'hall/bbs/ucenter/manuscript/update',
    method: 'post',
    data
  })
}
export function deleteMyManuscript(id) {
  return request({
    url: `hall/bbs/ucenter/industry/${id}`,
    method: 'delete'
  })
}

export function getMyQuestion(data) {
  return request({
    url: 'hall/bbs/ucenter/qs/list',
    method: 'post',
    data
  })
}

export function updateMyQuestion(data) {
  return request({
    url: 'hall/bbs/ucenter/qs/update',
    method: 'post',
    data
  })
}
export function deleteMyQuestion(id) {
  return request({
    url: `all/bbs/ucenter/qs/${id}`,
    method: 'delete'
  })
}

export function getMyAnswers(data) {
  return request({
    url: 'hall/bbs/ucenter/qs/myAnswers',
    method: 'post',
    data
  })
}

export function getPolicyList(data) {
  return request({
    url: 'bussiness/realInfo/list',
    method: 'post',
    data
  })
}
// 政策详情
export function getZgcRealInfoDetail(params) {
  return request({
    url: 'bussiness/realInfo/getZgcRealInfoDetail',
    method: 'post',
    data:params
  })
}

// 政策解读
export function getZgcPolicyInterpretation(data) {
  return request({
    url: 'bussiness/ZgcPolicyInterpretation/list',
    method: 'post',
    data
  })
}
// 政策解读
export function addZgcPolicyInterpretation(data) {
  return request({
    url: '/bussiness/ZgcPolicyDeclaration/add',
    method: 'post',
    data
  })
}

// 专栏文章
export function getListZLWZ(params) {
  return request({
    url: '/bussiness/BbsColumnManuscript/getList' ,
    method: 'get',
    params
  })
}

// 新闻列表
export function getZgcNewsList(data) {
  return request({
    url: '/bussiness/ZgcNewsServer/zgcNewsList' ,
    method: 'post',
    data
  })
}

// 新闻详情
export function getZgcNewsDetail(params) {
  return request({
    url: '/bussiness/ZgcNewsServer/getZgcNewsDetail' ,
    method: 'get',
    params
  })
}

//政策解读的接口详情
export function getNewsDetail(params) {
  return request({
    url: 'bussiness/ZgcPolicyInterpretation/detail',
    method: 'get',
    params
  })
}

