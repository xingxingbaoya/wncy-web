import request from '@/utils/request'
import qs from 'qs'

export function getmeetLists(data) {
  return request({
    url: '/bussiness/conference/getNewsList',
    method: 'post',
    data
  })
}

export function getMeetingAgendaGroup(params) {
  return request({
    url: '/bussiness/conference/getMeetingAgendaGroup',
    method: 'get',
    params
  })
}


export function getmeetZhibo(data) {
  return request({
    url: '/bussiness/conference/getMeetingList',
    method: 'post',
    data
  })
}
export function getConferenceList(data) {
  return request({
    url: '/bussiness/conference/getConferenceList',
    method: 'post',
    data
  })
}

export function getShowtimeList(data) {
  return request({
    url: '/bussiness/conference/getShowtimeList',
    method: 'post',
    data
  })
}

export function getMeetingDetail(id) {
  return request({
    url: '/bussiness/conference/getMeeting?meetingId=' + id,
    method: 'get',
  })
}

export function getMeetingAgenda(id) {
  return request({
    url: '/bussiness/conference/getMeetingAgenda?agendaId=' + id,
    method: 'post',
  })
}
// 会议详情
export function getMeetingGrop(id) {
  return request({
    url: '/bussiness/conference/getMeetingGrop?conferenceId=' + id,
    method: 'get',
  })
}
// 会议嘉宾
export function getGuestsList(data) {
  return request({
    url: '/bussiness/conference/getGuestsList',
    method: 'post',
    data
  })
}

// 议程列表
export function getMeetingAgendaList(id) {
  return request({
    url: '/bussiness/conference/getMeeting?meetingId=' + id,
    method: 'get',
  })
}
// 新闻详情
export function getNews(id) {
  return request({
    url: '/bussiness/conference/getNews?newsId=' + id,
    method: 'get',
  })
}




