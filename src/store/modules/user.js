import { getToken, setToken, removeToken, removeUser, setUser, setRole } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { registerUser, smsLogin, passLogin } from '@/api/register'
import { param2Form } from '@/utils'
import { getUserDetail } from '@/api/user'

const uType = {
  '1': 'user',
  '2': 'enterprise',
  '3': 'organization',
  '4': 'expert',
  '5': 'manager'
}

const getDefaultState = () => {
  return {
    token: getToken() || localStorage.getItem('zgc_token'),
    name: localStorage.getItem('userName') ?? '',
    avatar: '',
    userType: '',
    isPerfect: '1',
    roles: JSON.parse(localStorage.getItem('user_role')) || ['guest'],
    userinfo: JSON.parse(localStorage.getItem('userinfo')) ?? {}
  }
}

const loginMap = {
  smsLogin,
  passLogin
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    localStorage.removeItem('userName')
    localStorage.removeItem('userinfo')
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    setToken(token)
    localStorage.setItem('zgc_token', token)
    state.token = token
  },
  SET_PERFECT: (state, isPerfect) => {
    state.isPerfect = isPerfect
  },
  SET_NAME: (state, name) => {
    state.name = name
    localStorage.setItem('userName', name)
  },
  SET_ROLES: (state, roles) => {
    setRole(roles)
    localStorage.setItem('user_role', JSON.stringify(roles))
    state.roles = roles
  },
  SET_USER: (state, user) => {
    state.userinfo = user
    localStorage.setItem('userinfo', JSON.stringify(user))
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginType, ...others } = userInfo
    return new Promise((resolve, reject) => {
      loginMap[loginType](param2Form(others)).then(response => {
        if (response.code == '0000') {
          const { obj } = response
          const { userType } = obj
          const { isPerfect } = obj
          commit('SET_TOKEN', obj.token)
          commit('SET_PERFECT', isPerfect)
          // commit('SET_NAME', obj.phone)
          commit('SET_ROLES', [uType[userType]])
          // setUser(obj)
          resolve(obj)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user register
  register({ commit }, registerInfo) {
    return new Promise((resolve, reject) => {
      registerUser(param2Form(registerInfo)).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserDetail().then(res => {
        if (res.code == '0000') {
          const { obj } = res
          commit('SET_USER', obj)
          commit('SET_NAME', obj.userName)
          commit('SET_PERFECT', obj.isPerfect)
          resolve(obj)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {

      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUser()
      localStorage.removeItem('zgc_token')
      localStorage.removeItem('user_role')
      // setRole(['guest'])
      // resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUser() // must remove  token  first
      localStorage.removeItem('zgc_token')
      localStorage.removeItem('user_role')
      // setRole(['guest']) // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

