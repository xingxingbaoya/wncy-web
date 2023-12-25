<template>
  <el-main class="content">
    <!-- <el-row class="search-area">
      <el-input v-model="keywords" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
      <el-button type="primary" class="search-right" @click="gopost(item)"><svg-icon icon-class="tougao" class-name="icon" /><span class="icon-text">我要投稿</span></el-button>
    </el-row> -->
    <el-row class="search-content">
      <el-card :body-style="{ padding: '24px 40px' }"
               class="inner_card"
               shadow="never">
        <div class="inner-top">
          <div class="inner-img">
            <img :src="item.logo"
                 class="image">
            <div class="inner-con">
              <h3 class="inner-title">{{ item.name }}</h3>
              <!-- <p class="inner-count"><span class="count-read">发布时间</span><span>{{ item.createTime | formatDate }}</span></p> -->
              <p class="inner-desc">{{ item.description }}</p>
              <!-- <p class="inner-desc">订阅人数：{{ item.readCount }}<span>文章数：缺参数</span></p> -->
              <!-- <div class="btns">
                <div class="isD">立即订阅</div>
                <div class="isR">取消订阅</div>
              </div> -->
            </div>
          </div>
          <!--          <div class="bot-btn">-->
          <!--            <el-button type="primary" @click=""><svg-icon icon-class="dingyue" class-name="icon" /><span class="icon-text">我要订阅</span></el-button>-->
          <!--          </div>-->
        </div>
      </el-card>
    </el-row>

    <el-row class="list-content">
      <div class="heng_c">
        <div class="zlwz">
          专栏文章
        </div>
      </div>

      <el-col v-for="item in listDataZLWZ"
              :span="24"
              class="list-layout">

        <el-card
                 class="inner_card"
                 shadow="never"
                 @click.native="gotech(item)">

          <div class="list-con">
            <div class="list-top">
              <h3 class="top-title">{{ item.title }}</h3>
            </div>
            <!-- <div class="list-key">关键词：{{ item.keywords }}</div> -->
            <div class="list-desc">{{ item.description }}</div>
            <div class="top-time">{{ item.createTime }}</div>
          </div>
        </el-card>
      </el-col>
      <Empty v-show="!listDataZLWZ.length" />
    </el-row>
    <el-row type="flex"
    class="paga"
            justify="center">
      <el-pagination background
                     layout="prev, pager, next"
                     :page-size="pager.pageSize"
                     :total="pager.total"
                     :current-page="pager.pageNum"
                     @current-change="handleCurrentChange" />
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getBBsColumnDetail,getBBsColumnList,getBBsList,getListZLWZ } from '@/api/bbshall'

export default {
  name: 'BBShalllist',
  mixins: [common],
  data () {
    return {
      keywords: '',
      listData: [],
      item: {},
    listDataZLWZ:[]

    }
  },
  created () {
  },
  methods: {
    loadData () {
      this.loading=true
      const { pageNum }=this.pager
      const formpage={ pageNum,pageSize: 6 }
      this.pager.pageSize=formpage.pageSize
      const { id }=this.$route.query

      getBBsColumnDetail(id).then(res => {
        if(res.code=='0000') {
          this.item=res.obj
          this.loadDataZLWZ(res.obj.name)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })

      // this.pager.pageSize=formpage.pageSize
      // getBBsList({ ...formpage,keywords: this.keywords,columnId: id }).then(res => {
      //   if(res.code=='0000') {
      //     this.listData=res.rows
      //     this.$set(this.pager,'total',res.total)
      //   } else {
      //     this.$message.warning(res.msg)
      //   }
      // }).finally(() => {
      //   this.loading=false
      // })
    },
    loadDataZLWZ (columnName ) {
      const { pageNum }=this.pager
      const formpage={ pageNum,pageSize: 6 }
      this.pager.pageSize=formpage.pageSize
      this.loading=true
      getListZLWZ({columnName,...formpage} ).then(res => {
        if(res.code=='0') {
          this.listDataZLWZ=res.rows
          this.$set(this.pager,'total',res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    gotech ({ id }) {
      const { id: columId }=this.$route.query
      this.goBlank({
        path: '/bbshall/technology',
        query: {
          id,
          columId: columId
        }
      })
    },
    //  goindustry ({ id }) {
    //   this.goBlank({
    //     path: '/bbshall/industry',
    //     query: {
    //       id
    //     }
    //   })
    // },
    gopost ({ id }) {
      this.goBlank({
        path: '/bbshall/post',
        query: {
          id
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.heng_c{
  width: 100%;
  border-bottom: 2px solid #EEE;
}
.zlwz {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 600;
  color: #1E86F9;
  padding: 24px 0 ;
  text-align: center;
  border-bottom: 2px solid #1E86F9;
  width: 130px;
  margin-bottom: 36px;
}
.btns {
  display: flex;
  .isD {
    width: 224px;
    height: 47px;
    background: linear-gradient(90deg, #1875f2 0%, #37b9fa 100%);
    border-radius: 2px;
    text-align: center;
    line-height: 47px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    margin-right: 41px;
  }
  .isR {
    width: 224px;
    height: 47px;
    background: #999999;
    border-radius: 2px;
    text-align: center;
    line-height: 47px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
    font-size: 20px;
  }
}
.content {

background: #F5F7FB;
}
.search-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 26px 20px;
  margin-bottom: 24px;
}

.search-content {
  padding: 100px calc((100% - 1245px) / 2) 38px;
  background: #fff;
  margin-bottom: 13px;
  .inner_card {
    .inner-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .inner-img {
        display: flex;
        justify-content: flex-start;
        img {
          margin-right: 30px;
          height: 328px;
          width: 328px;
        }
      }

      .inner-title {
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        margin-top: 10px;
        margin-bottom: 0;
      }

      .inner-count {
        font-size: 20px;
        font-weight: 500;
        margin-top: 30px;
        color: #666666;
        .count-read {
          margin-right: 30px;
        }
      }

      .inner-desc {
        font-size: 18px;
        font-weight: 500;
        color: #666666;
        margin-top: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        line-height: 32px;
        span {
          margin-left: 62px;
        }
      }

      .bot-btn {
        .el-button {
          background: #516fd2;
          border-radius: 4px;
          font-size: 18px;
          font-weight: 400;
          color: #ffffff;
          width: 205px;
          height: 50px;
          .icon {
            width: 20px;
            height: 20px;
            vertical-align: -3px;
            margin-right: 13px;
          }
        }
      }
    }
  }
}

.list-content {
  padding: 0px calc((100% - 1245px) / 2) 38px;
  background: #fff;
  .list-layout {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .list-con {
    padding: 17px 0 0 0;
    border-bottom: 2px solid #EEEEEE;
    .list-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 850px;
        overflow: hidden;
        margin: 0;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }

    }
    .top-time {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #999999;
        margin-bottom: 24px;

      }
    .list-key {
      font-size: 18px;
      font-weight: 500;
      color: #666666;
      margin: 18px 0;
    }

    .list-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #666666;
      margin: 14px 0 34px;
    }
  }
}

.search-right {
  width: 180px;
  height: 56px;
  background: #516fd2;
  border-radius: 4px;
  font-size: 18px;
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: -5px;
    margin-right: 8px;
  }
}
.input-search {
  padding-right: 40px;
  ::v-deep .el-input__inner {
    height: 56px;
    font-size: 18px;
    border-color: #516fd2;
    border-width: 2px;
    border-right: none;
  }

  ::v-deep .el-button {
    width: 143px;
    height: 56px;
    background: #516fd2;
    font-size: 18px;
    color: #ffffff;
  }
}
.paga{
  background: #fff;
  padding-bottom: 20px;
}
</style>
