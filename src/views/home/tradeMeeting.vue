<template>
  <el-main>
    <el-row class="search-area">
    </el-row>
    <div class="content_main">
      <div class="left_content">
        <img src="../../assets/img/tcright.png"
             alt="">
      </div>
      <div class="content_cw">
        <div class="contentTop">
          <div class="title">
            历届中关村大会
          </div>
          <template>
            <el-tabs v-model="activeName"
                     @tab-click="handleClick(activeName)">
              <el-tab-pane label="2022年"
                           name="1"></el-tab-pane>
              <el-tab-pane label="2021年"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <div class="more_cw">
          <div>会议新闻</div>
          <div v-if="totalCount>12">查看更多</div>
        </div>
        <!-- <currentYear @getNewsTotal="getNewsTotal" v-if="activeName==1"></currentYear> -->
        <meet v-if="activeName==2"></meet>
      </div>
      <div class="right_content">
        <img src="../../assets/img/tcleft.png" alt="">
      </div>
    </div>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
// import currentYear from './currentYear'
import meet from './meet.vue'
import city from '@/assets/city/city_code.json'
import { getProjectList } from '@/api/projecthall'

export default {
  name: 'Projecthall',
  mixins: [common],
  components: {
    meet
  },
  data () {
    return {
      activeName: "1",
      searchData: {
        title: '',
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: ''
      },
      listData: [],
      isShowFir: false,
      isShowSec: false,
      totalCount:0
    }
  },
  computed: {
    cityList () {
      return city
    }
  },
  methods: {
    getNewsTotal(params){

      this.totalCount = params
    },
    loadData () {
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      console.log(formpage)
      this.loading=true
      this.searchData.title=this.$route.query.keyword??this.searchData.title
      getProjectList({ ...formpage,...this.searchData }).then(res => {
        if(res.code=='0000') {
          this.listData=res.rows
          this.$set(this.pager,'total',res.total)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    gopost () {
      this.goBlank({
        path: '/projecthall/post'
      })
    },
    handleClick (tab) {
      this.activeName = tab
      console.log(tab);
    }

  }
}
</script>

<style scoped lang="scss">

.more_cw{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div:nth-child(1){
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin: 40px 0 8px 0;
  }
   div:nth-child(2){
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
  }
   div:nth-child(2):hover{
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #1E86F9;
      cursor: pointer;
  }
}
.search-area {
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 424px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
  background: url("../../assets/img/zgcdh.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: 100% 100%;
  // padding: 0 -220px -38px;
  // padding: 0 calc((100% - 1245px)/2) 38px
  .icon-text_cw {
    margin-left: 15px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
  }
}
.content_main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  .left_content {
    width: 154px;
    height: 322px;
    img {
      width: auto;
    }
  }
  .content_cw {
    flex-grow: 1;
    padding: 0 6%;
    .contentTop {
      .title {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .right_content {
    width: 108px;
    height: 192px;
    margin-top: 688px;
    img {
      width: auto;
    }
  }
}
</style>
