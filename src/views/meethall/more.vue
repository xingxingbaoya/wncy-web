<template>
  <el-main class="content">
    <!-- <el-row class="search-area">
      <el-input v-model="searchData.actName" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row> -->
    <el-row v-loading="loading" class="search-content">
      <!-- <el-tabs v-model="searchData.actClassification" @tab-click="()=>{this.loadData();this.rangeTime = [];this.searchData.actStatus = ''}"> -->
            <el-row>
              <el-col v-for="(o,index) in listData" :span="6">
                <el-card :body-style="{ padding: '0px' }" class="inner_card" :class="clearMargin(index)" shadow="hover" @click.native="goaction(o)">
                  <img  :src="o.newsCoverLog" class="image">
                  <!-- <el-tag v-show="o.upType == 'video'" effect="plain" type="info" size="small" :class="{'status': o.actStatus == 'started'}">
                    {{ actionStat(o) }}
                  </el-tag> -->
                  <img v-show="o.upType == 'video'" :src="`${newsCoverLog}/play.png`" class="play">
                  <div style="padding: 13px 13px 0 13px;">
                    <span class="inner-title">{{ o.newsTitle }}</span>
                    <p class="inner-desc">发布时间: {{ o.newsReleaseDate }}</p>
                    <p class="inner-desc">发布单位: {{ o.newsInstitution }}</p>
                  </div>
                </el-card>
              </el-col>
              <Empty v-show="!listData.length" />
            </el-row>
      <!-- </el-tabs> -->
    </el-row>
    <el-row type="flex" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pager.pageSize"
        :total="pager.total"
        :current-page="pager.pageNum"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getActivityList } from '@/api/activitieshall'
import { getmeetLists,getmeetZhibo,getConferenceList,getShowtimeList } from '@/api/meet'
export default {
  name: 'MeetMore',
  mixins: [common],
  data() {
    return {
      searchData: {
        actName: '',
        actClassification: 'xwdt',
        actStatus: ''
      },
      listData: [],
      rangeTime: []
    }
  },
  created() {
  },
  computed: {
    actionStat: () => {
      return (item) => {
        if (item?.upType == 'video') {
          if (item?.actStatus == 'started') {
            return '直播中'
          } else if (item?.actStatus == 'end') {
            return '回放'
          } else {
            return '未开始'
          }
        }
      }
    }
  },
  mounted() {
    this.searchData.actClassification = this.$route.query.actClassification ?? this.searchData.actClassification
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 8 }
      this.pager.pageSize = formpage.pageSize
      getmeetLists({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    clearData() {
      this.rangeTime = []
      this.searchData.actStatus = ''
    },
    goaction(item) {
      this.$router.push({
        path: "/meethall/activityDetail",
        query: {
          newsId:item.newsId
        }
      })
    },
    goarticle(id) {
      this.goBlank({
        path: '/activitieshall/article',
        query: {
          id
        }
      })
    },
    gosign(id) {
      this.goBlank({
        path: '/activitieshall/signup',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content{
  padding: 0 calc((100% - 1245px) / 2) 38px;
}

 .search-area {
   background-color: #FFFFFF;
   padding: 26px 34px 0;
 }

 .search-content {
  margin-top: 120px;
   margin-bottom: 25px;
 }
 .input-search {
   padding-bottom: 40px;
   ::v-deep .el-input__inner {
     height: 56px;
     font-size: 18px;
     border-color: #516FD2;
     border-width: 2px;
     border-right: none;
   }

   ::v-deep .el-button{
     width: 143px;
     padding: 19px 20px;
     border-radius: 0 4px 4px 0;
     background: #516FD2;
     font-size: 18px;
     color: #FFFFFF;
   }
 }
 ::v-deep .el-tabs__active-bar {
   background-color: #516FD2;
 }

 ::v-deep .el-tabs__item {
   font-size: 22px;
   font-weight: 400;
   line-height: 25px;
   &.is-active {
     color: #516FD2;
   }
   &:hover {
     color: #516FD2;
   }
 }

 ::v-deep .el-tabs__nav-wrap::after {
   height: 0;
 }

 ::v-deep .el-tabs__header {
   background-color: #FFFFFF;
   padding: 0 34px;
 }
 .search-query {
   padding-top: 17px;
   padding-left: 34px;
   background-color: #FFFFFF;
   display: flex;
   align-items: center;
 }
 .pb26 {
   padding-bottom: 17px;
   margin-bottom: 34px;
   border-top:1px solid #EEEEEE;
 }

 .pr20 {
   padding-right: 20px;
 }

 .clear-query {
   background: #516FD2;
   border-radius: 3px;
   margin-left: 18px;
   padding: 12px 20px;
 }

 .select-title {
   font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
 }

 ::v-deep .el-radio-button:first-child .el-radio-button__inner {
   border: none;
   border-radius: 22px;
    border: 1px solid #fff;
 }

 ::v-deep .el-radio-button__inner {
   border:  none;
   border-radius: 22px;
    border: 1px solid #fff;
     font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #666666;
 }
 ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner {
   border: none;
   background-color: #FFFFFF;
   color: #516FD2;
   box-shadow: none;
 }

 ::v-deep .el-radio-button__inner:hover {
   color: #516FD2;
 }

 ::v-deep .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled){
   box-shadow: none;
 }

 .date-range {
   ::v-deep .el-date-table td.end-date span,::v-deep .el-date-table td.start-date span {
     background-color: #516FD2;
   }

   ::v-deep .el-date-table td.today span{
     color: #516FD2;
   }
 }

 .inner_card {
   position: relative;
   margin-right: 10px;
   margin-bottom: 10px;
   cursor: pointer;
   .inner-title {
     font-size: 18px;
     display: inline-block;
     font-weight: 500;
     width: 100%;
     text-overflow: ellipsis;
     overflow: hidden;
     white-space: nowrap;
   }
   .inner-desc {
     font-size: 16px;
     font-weight: 500;
     color: #999999;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
   .inner-btn {
     text-align: center;
   }
   .inner-opera {
     width: 132px;
     height: 42px;
     color: #FFFFFF;
     background: #516FD2;
     border-radius: 4px;
   }
   .image {
     height: 170px;
     width: 100%;
   }

   .play {
     position: absolute;
     left: 0;
     right: 0;
     top: 65px;
     margin: auto;
   }

   .el-tag--plain.el-tag--info {
     position: absolute;
     width: 64px;
     text-align: center;
     right: 11px;
     top: 7px;
     color: #FFFFFF;
     //opacity: 0.3;
     background-color: rgba(0,0,0,.3);
     border-radius: 12px;
     border: 1px solid #FFFFFF;
   }

   .status::before{
     content: '';
     display: inline-block;
     margin-bottom: 2px;
     width: 6px;
     height: 6px;
     background: #76EEA0;
     border-radius: 50%;
   }
 }

</style>
