import request from '@/utils/request'

export function uploadFile(data) {
  return request({
    url: 'bussiness/ajax/libs/ueditor/1.4.3/ueditor/upload?action=uploadimage',
    method: 'post',
    data
  })
}
