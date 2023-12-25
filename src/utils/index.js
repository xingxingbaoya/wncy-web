/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 *  return object
 * @param param
 */

export function param2Form(param) {
  const form = new FormData()
  _(param)
    .forEach((value, key) => {
      form.append(key, value || '')
    })

  return form
}

/**
 * 检测图片是否存在
 * @param url
 */
export function imageIsExist(url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = function() {
      if (this.complete == true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function() {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

export const validateUsername = (rule, value, callback) => {
  const reg = /^[a-z0-9]+$/i
  if (!reg.test(value)) {
    callback(new Error('用户名只能由字母和数字组成'))
  } else {
    callback()
  }
}
export const validatePassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/
  if (!reg.test(value)) {
    callback(new Error('必须包含大小写字母、数字、特殊字符中的两种且长度不小于8位'))
  } else {
    callback()
  }
}

export const validateUserPassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,16}$/

  if (_.isEmpty(value)) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('必须包含大小写字母、数字、特殊字符中的两种且长度不小于8位'))
  } else {
    callback()
  }
}

export const validateUserAvatar = (rule, value, callback) => {
  if (_.isEmpty(value)) {
    callback(new Error('请上传头像'))
  } else {
    callback()
  }
}

export const getBLen = function(str) {
  if (str == null) return 0
  if (typeof str !== 'string') {
    str += ''
  }
  return str.replace(/[^\x00-\xff]/g, 'ab').length
}
