<template>
  <el-main>
    <el-row class="content">
      <el-col :span="18" class="left-layout">
        <el-card :body-style="{ padding: '0 20px' }" class="inner_card" shadow="never">
          <div slot="header" class="card-top">
            <h1 class="top-title">{{ item.infoName }}</h1>
            <!-- <p class="top-desc">关键词：{{ item.keywords }}</p> -->
            <p class="top-count"><span class="top-read">发布时间：{{ item.createTime | formatDate }}</span></p>
          </div>
          <div class="card-con" v-html="item.content" />
        </el-card>

      </el-col>
      <el-col :span="6">

        <el-card :body-style="{ padding: '0' }" class="bottom-card" shadow="never">
          <div slot="header">
            <span class="title">推荐文章</span>
          </div>
          <el-row class="bot-bg">
            <el-col v-for="item in listData" :span="24" class="card-bot">
              <el-card :body-style="{ padding: '0 14px' }" class="bot-layout" shadow="hover" @click.native="goindustry(item)">
                <h3 class="bot-desc">{{ item.infoName }}</h3>
                <!-- <p class="bot-time">{{ item.createTime | formatDate }}</p> -->
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
import { getBBsDetail, getBBsIndustry, getBBsIndustryList, getBBsList } from '@/api/bbshall'

export default {
  name: 'BBShallindustry',
  mixins: [common],
  data() {
    return {
      item: {

      },
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id } = this.$route.query
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 8 }
      this.pager.pageSize = formpage.pageSize
      getBBsIndustry(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getBBsIndustryList({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows.filter(item=>{
            const { id } = this.$route.query
            return item.id !==id
          })
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    goindustry({ id }) {
      this.goBlank({
        path: '/bbshall/industry',
        query: {
          id
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.content{
  padding: 0 calc((100% - 1245px) / 2) 38px;
  margin-top: 120px;
  background: #fff;
}
.left-layout {
  // padding-right: 12px;
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
    padding: 20px 0;
    /*height: 700px;*/
    overflow: auto;
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
        object-fit: cover;
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
    font-weight: 600;
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
    padding: 28px 20px 12px;
    border-bottom: 3px solid #EEEEEE;
  }

  .card-bot {
    // padding: 0 0 2px;
    height: 100%;
  }
  .bot-bg {
    background: #EEEEEE;
    /*min-height: 700px;*/
  }

  .bot-layout {
    cursor: pointer;
    .bot-desc {
      font-family: PingFang SC;
      font-weight: 300;
      color: #333333;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-bottom: 0;
      font-size: 14px;
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
