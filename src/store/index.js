import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'
import dict from './modules/dict'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    dict,
    user
  },
  getters
})

export default store
