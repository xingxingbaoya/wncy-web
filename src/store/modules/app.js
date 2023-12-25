import Cookies from 'js-cookie'

const state = {
  sidebar: {
    withoutAnimation: false,
  },
  isTransparentHead: false,
  device: 'desktop',
  wheight: localStorage.getItem('wheight') || 1080
}

const mutations = {
  // TOGGLE_SIDEBAR: state => {
  //   state.sidebar.opened = !state.sidebar.opened
  //   state.sidebar.withoutAnimation = false
  //   if (state.sidebar.opened) {
  //     Cookies.set('sidebarStatus', 1)
  //   } else {
  //     Cookies.set('sidebarStatus', 0)
  //   }
  // },
  // CLOSE_SIDEBAR: (state, withoutAnimation) => {
  //   Cookies.set('sidebarStatus', 0)
  //   state.sidebar.opened = false
  //   state.sidebar.withoutAnimation = withoutAnimation
  // },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_HEIGHT: (state, height) => {
    state.wheight = height
  },
  SET_HEAD: (state, isTransparent) => {
    state.isTransparentHead = isTransparent
  },
}

const actions = {
  // toggleSideBar({ commit }) {
  //   commit('TOGGLE_SIDEBAR')
  // },
  // closeSideBar({ commit }, { withoutAnimation }) {
  //   commit('CLOSE_SIDEBAR', withoutAnimation)
  // },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setWindowHeight({ commit }, height) {
    commit('SET_HEIGHT', height)
    localStorage.setItem('wheight', height)
  },
  setTransparentHead({ commit }, isTransparent) {
    commit('SET_HEAD', isTransparent)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
