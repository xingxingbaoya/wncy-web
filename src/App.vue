<template>
  <div id="app" v-loading="loading">
    <router-view v-if="!loading" />
  </div>
</template>

<script>
import DevicePixelRatio from "@/utils/pixel";

export default {
  name: "App",
  data() {
    return {
      loading: false,
    };
  },
  created() {
    new DevicePixelRatio().init();

    this.loading = true;
    this.$store.dispatch("dict/getDic", [
      "p_industry_one",
      "top_10_hg_category",
      "bj_2441_category",
      "zgckjy_241_category",
      "p_nature",
      "p_tech_type",
      "p_cooperation",
      "p_patent_category",
      "p_development",
      "t_activity_kind",
      "u_company_type",
      "u_institutional_nature",
      "u_degree",
      "bbs_manuscript_status",
      "policy_type",
      "support_ind",
      "policy_state",
      "project_academy",
      "t_activity_way",
      "t_activity_status",
    ]);
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  },
  mounted() {
    const that = this;
    window.onresize = _.throttle(() => {
      that.getWindowHeight();
    }, 200);
  },
  methods: {
    getWindowHeight() {
      this.$store.dispatch("app/setWindowHeight", document.body.clientHeight);
    },
  },
};
</script>
