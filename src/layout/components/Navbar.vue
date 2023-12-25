<template>
  <div class="navbar">
    <img :src="`${imgUrl}/home-logo.png`" alt="中关村科技成果转化与技术交易综合服务平台" class="image">
    <div v-show="isHome" class="nav-right">
      <el-radio-group v-model="moreTab" class="select-scope">
        <el-radio-button label="1">项目</el-radio-button>
        <el-radio-button label="2">需求</el-radio-button>
        <el-radio-button label="3">活动</el-radio-button>
        <el-radio-button label="4">资讯</el-radio-button>
      </el-radio-group>
      <el-input v-model="query" placeholder="请输入关键字进行搜索" class="input-search">
        <template slot="prepend"><i class="el-icon-search" /></template>
        <el-button slot="append" @keyup.enter.native="gomore(moreTab)" @click="gomore(moreTab)">搜索</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixin/common'

export default {
  mixins: [common],
  data() {
    return {
      moreTab: '1',
      query: ''
    }
  },
  computed: {
    isHome() {
      return this.$route.name == 'Home'
    }
  },
  mounted() {
    console.log(this.$route, 'app')
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      location.reload()
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    gomore(act) {
      if (act == 1) {
        this.$router.push({
          path: '/projecthall',
          query: {
            keyword: this.query
          }
        })
      } else if (act == 2) {
        this.$router.push({
          path: '/demandhall',
          query: {
            keyword: this.query
          }
        })
      } else if (act == 3) {
        this.$router.push({
          path: '/activitieshall/more',
          query: {
            keyword: this.query
          }
        })
      } else {
        this.$router.push({
          path: '/bbshall/information',
          query: {
            keyword: this.query
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 0 calc((100% - 1445px)/2);
  align-items: center;
  height: 156px;
  background: #FFFFFF;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .image {
    width: 748px;
    height: 58px;
    object-fit: contain;
  }
  .nav-right {
    display: inline-block;

    width: calc(1245px - 844px);
    .input-search {
      ::v-deep .el-input__inner {
        //height: 42px;
        font-size: 16px;
        border: 2px solid #516FD2;
        //width: 220px;
        border-left: none;
        border-right: none;
      }

      ::v-deep .el-input-group__append{
        //height: 42px;
      }

      ::v-deep .el-button{
        width: 110px;
        /*height: 42px;*/
        /*border: 2px solid #516FD2;*/
        //line-height: 15px;
        padding: 12px 20px;
        background: #516FD2;
        font-size: 17px;
        font-size: 17px;
        color: #FFFFFF;
        border-radius: 0;
      }

      ::v-deep .el-input-group__prepend {
        background-color: #ffffff;
        border-color: #516FD2;

        border-width: 2px;
        border-radius: 0;
        padding: 0 0 0 20px;
      }

      ::v-deep .el-icon-search {
        font-size: 20px;
        color: #516FD2;
      }
    }

    ::v-deep .el-radio-button:first-child .el-radio-button__inner {
      border: none;
    }

    ::v-deep .el-radio-button__inner {
      border:  none;
      font-size: 14px;
      padding: 4px 12px;
    }
    ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
      border: none;
      background-color: #516FD2;
      color: #FFFFFF;
      box-shadow: none;
    }

    ::v-deep .el-radio-button:first-child .el-radio-button__inner {
      border-radius: 0;
    }

    ::v-deep .el-radio-button__inner:hover {
      //background-color: #516FD2;
      color: #516FD2;
    }

    ::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled){
      box-shadow: none;
    }
  }
}
</style>
