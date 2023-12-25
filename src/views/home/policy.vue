<template>
  <el-main>
    <el-row>
      <el-col :span="24" class="left-layout">
        <el-card :body-style="{ padding: '0 20px' }" class="inner_card">
          <div slot="header" class="card-top">
            <h1 class="top-title">{{ item.fileName }}</h1>
            <p class="top-count"> <span class="top-read">发表时间：{{ item.createTime }}</span> <span>发布机构：{{ item.createOrganization }}</span></p>
          </div>
          <div class="card-con" v-html="item.content" />
        </el-card>

      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getBBsDetail, getBBsIndustry, getBBsIndustryList, getBBsList } from '@/api/bbshall'
import { getPolicyDetail } from '@/api/home'

export default {
  name: 'PolicDeatil',
  mixins: [common],
  data() {
    return {
      item: {

      }
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id } = this.$route.query
      getPolicyDetail({ id }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // goindustry({ id }) {
    //   this.goBlank({
    //     path: '/bbshall/industry',
    //     query: {
    //       id
    //     }
    //   })
    // }
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
      font-size: 24px;
      color: #333333;
      text-align: center;

    }

    .top-desc,.top-count {
      text-align: center;
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
    padding: 0 0 2px;
  }
  .bot-bg {
    background: #EEEEEE;
    /*min-height: 700px;*/
  }

  .bot-layout {
    cursor: pointer;
    .bot-desc {
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      overflow: hidden;
      min-height: 34px;
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
