<template>
  <el-main>
    <el-row>
      <el-col :span="18" class="left-layout">
        <el-card :body-style="{ padding: '28px' }" class="inner_card">
          <div slot="header" class="card-top">
            <h1 class="top-title">{{ item.title }}</h1>
            <p class="top-desc">关键词：{{ item.keywords }}</p>
            <p class="top-count"><span class="top-read">发表时间：{{ item.createTime }}</span> <span>发表人：{{ item.createByName }}</span></p>
          </div>
          <div class="card-con" v-html="item.content" />
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ padding: '24px 40px' }" class="right_card">
          <div class="inner-top">
            <div class="inner-img">
              <img v-real-img="citem.logo" :src="`${imgUrl}/activity1.jpg`" class="image">
              <h3 class="inner-title">{{ citem.name }}</h3>
              <p class="inner-desc">{{ citem.description }}</p>
              <p class="inner-count"><span class="count-read">发布时间</span><span>{{ citem.createTime | formatDate }}</span></p>
            </div>
<!--            <div class="bot-btn">-->
<!--              <el-button type="primary" @click=""><svg-icon icon-class="dingyue" class-name="icon" /><span class="icon-text">我要订阅</span></el-button>-->
<!--            </div>-->
          </div>
        </el-card>

        <el-card :body-style="{ padding: '0' }" class="bottom-card">
          <div slot="header">
            <span class="title">热点文章</span>
          </div>
          <el-row class="bot-bg">
            <el-col v-for="item in listData" :span="24" class="card-bot">
              <el-card :body-style="{ padding: '0 14px' }" class="bot-layout" shadow="hover">
                <h3 class="bot-desc">{{ item.title }}</h3>
                <p class="bot-time">{{ item.createTime | formatDate }}</p>
              </el-card>
            </el-col>
            <Empty v-show="!listData.length" />
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getBBsColumnDetail, getBBsDetail, getBBsList } from '@/api/bbshall'

export default {
  name: 'BBShalltechnology',
  mixins: [common],
  data() {
    return {
      item: {

      },
      citem: {},
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id, columId:columnId } = this.$route.query
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 6 }
      this.pager.pageSize = formpage.pageSize
      getBBsColumnDetail(columnId).then(res => {
        if (res.code == '0000') {
          this.citem = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
      getBBsDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getBBsList({ ...formpage, columId }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .left-layout {
    padding-right: 12px;
  }
  .inner_card{
    ::v-deep .el-card__header {
      padding:14px 28px;
      border-bottom: 1px solid #EBEEF5;
    }
    .card-top{
      .top-title {
        font-size: 22px;
        color: #333333;
      }

      .top-desc,.top-count {
        font-size: 16px;
        color: #999999;
        font-weight: 500;
        .top-read {
          margin-right: 80px;
        }
      }
    }

    .card-con {
      margin: 0;
    }

  }

  .right_card {
    margin-bottom: 18px;
    .inner-top {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .inner-img {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        img {
          height: 116px;
          width: 116px;
        }
      }

      .inner-title {
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        margin-top: 20px;
        margin-bottom: 0;
      }

      .inner-count {
        font-size: 18px;
        font-weight: 500;
        color: #999999;
        margin: 30px 0;
        .count-read{
          margin-right: 40px;
        }
      }

      .inner-desc {
        font-size: 18px;
        font-weight: 500;
        color: #999999;
        margin-top: 20px;
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .bot-btn {
        .el-button {
          background: #516FD2;
          border-radius: 4px;
          font-size: 18px;
          font-weight: 400;
          color: #FFFFFF;
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

  .bottom-card {
    .title {
      display: inline-block;
      height: 20px;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
      &:after {
        content: '';
        height: 3px;
        width: 100%;
        background: #516FD2;
        margin-top: 10px;
        display: block;
      }
    }

    ::v-deep .el-card__header {
      padding: 28px 30px 12px;
      border-bottom: 3px solid #EEEEEE;
    }

    .card-bot {
      margin-bottom: 1px;
    }
    .bot-bg {
      background: #EEEEEE;
    }

    .bot-layout {
      .bot-desc {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 0;
      }

      .bot-time {
        margin: 12px 0;
        text-align: right;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
      }
    }
  }

</style>
