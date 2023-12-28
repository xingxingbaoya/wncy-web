import { getDict } from '@/api/dict'

const state = {
  p_industry_one: [],
  p_nature: [],
  p_tech_type: [],
  p_cooperation: [],
  p_patent_category: [],
  p_development: [],
  t_activity_kind: [],
  u_company_type: [],
  u_institutional_nature: [],
  u_degree: [],
  bbs_manuscript_status: [],
  policy_type: [],
  support_ind: [],
  policy_state: [],
  project_academy: [],
  top_10_hg_category: [],
  zgckjy_241_category: [],
  bj_2441_category: [],
  t_activity_way: [],
  t_activity_status: [],
}

const mutations = {
  SET_DICT: (state, { dictType, obj }) => {
    state[dictType] = obj
    const jsonStr = JSON.stringify(obj)
    localStorage.setItem('dic-' + dictType, jsonStr)
  }
}

const actions = {
  getDic({ commit }, dictTypes) {
    for (let i = 0; i < dictTypes.length; i++) {
      if (state[dictTypes[i]].length == 0 && _.isEmpty(localStorage.getItem('dic-' + dictTypes[i]))) {
        getDict(dictTypes[i]).then(response => {
          const { obj } = response
          const dictType = dictTypes[i]
          commit('SET_DICT', { dictType, obj })
        })
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
// export default dictDatas
