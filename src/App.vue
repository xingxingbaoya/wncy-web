<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import DevicePixelRatio from '@/utils/pixel'

export default {
  name: 'App',
  created() {
    new DevicePixelRatio().init()
  },
  mounted() {
    const that = this
    window.onresize = _.throttle(() => {
      that.getWindowHeight()
    }, 200)
    // this.$store
    //   .dispatch("dict/getDic", [
    //     "p_industry_one",
    //     "p_nature",
    //     "p_tech_type",
    //     "p_cooperation",
    //     "p_patent_category",
    //     "p_development",
    //     "t_activity_kind",
    //     "u_company_type",
    //     "u_institutional_nature",
    //     "u_degree",
    //     "bbs_manuscript_status",
    //     "policy_type",
    //     "support_ind",
    //     "policy_state",
    //   ])
    //   .then(() => {
    //     this.$store.dispatch('app/setWindowHeight', document.body.clientHeight)
    //   })
    //   .finally(() => {

    //   });
  },
  methods: {
    getWindowHeight() {
      this.$store.dispatch('app/setWindowHeight', document.body.clientHeight)
    }
  }
}
</script>
