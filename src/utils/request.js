import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('config', config)
    // do something before request is sent
    const hasToken = getToken() || localStorage.getItem('zgc_token')
    if (hasToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['userToken'] = getToken() || localStorage.getItem('zgc_token')
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.state == 'SUCCESS') {
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code != '0000') {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code == 410 || res.code == 401) {
        // to re-login
        MessageBox.confirm('登录失效,请重新登录', '提示', {
          confirmButtonText: '去登录',
          cancelButtonText: '取消',
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            const redirect = location.hash.slice(1)
            router.push(`/login?redirect=${redirect}`)
          })
        }).catch(() => {
          router.push(`/`)
        })
      }
      Message({
        message: res.msg || '没有msg',
        type: 'warning',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || '没有msg'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error.code, error.message) // for debug
    Message({
      message: '请求超时,请重试',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
