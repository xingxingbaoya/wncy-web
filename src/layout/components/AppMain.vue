<template>
  <section class="app-main" :class="{'home-pd':isHome,'meet-bg': isMeet}">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    isHome() {
      return this.$route.name == 'Home' || this.$route.name == 'Tradinghall'
    },
    isMeet() {
      return this.$route.name == 'Meet'
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 400px);
  /*padding: 0 220px 38px;*/
  width: 100%;
  /* padding: 0 calc((100% - 1245px)/2) 38px; */
  margin: auto;
  position: relative;
  background: #F6F6F6;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

.home-pd {
  padding: 0;
}

.meet-bg {
  background: #FFFFFF;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
