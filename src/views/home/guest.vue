<template>
  <el-main v-loading="loading " class="content">
    <el-row class="m-expert">
      <el-card class="m-card" shadow="never" :body-style="{ padding: '0' }">
        <el-row>
          <el-col v-for="item in listGuest" class="c-layout" @click.native="godetail(item)">
            <div class="c-bg">
              <div class="c-color">
                <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`" alt="" class="c-avatar">
              </div>
              <div class="c-bot">
                <p class="bot-title">{{ item.guestsName }}</p>
                <p class="bot-desc">{{ item.overview }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
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
import { findAllGuest, getUserList } from '@/api/home'
export default {
  name: 'Guest',
  mixins: [common],
  data() {
    return {
      listGuest: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 15 }
      this.pager.pageSize = formpage.pageSize
      const { congressId } = this.$route.query
      findAllGuest({ ...formpage, congressId }).then(res => {
        if (res.code == '0000') {
          this.listGuest = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    godetail({ id }) {
      this.goBlank({
        path: '/gdetail',
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
   padding: 120px calc((100% - 1245px)/2) 38px;
  }
.m-expert {
  .m-card {
    background-color: transparent;
    .title {
      font-size: 30px;
      font-weight: bold;
      color: #01296C;
      line-height: 8px;
      min-width: 200px;
      display: inline-block;
      position: relative;
      &:before {
        position: absolute;
        left: 2px;
        bottom: -30px;
        content: 'MEETING THE GUEST';

        font-size: 12px;
        color: #01296C;
      }
      &:after {
        position: absolute;
        display: block;
        left: 2px;
        bottom: -27px;
        width: 343px;
        height: 32px;
        content: '';
        background-image: url($backgroundImgURL + "/meet2.png");
      }
    }
    .more {
      color: #999999;
      font-size: 18px;
      float: right;
      padding: 3px 0;
      i {
        font-weight: 600;
      }
    }

    ::v-deep .el-card__header {
      padding: 18px 0;
    }

    .c-bg:hover .c-color,.c-bg:hover .c-bot {
      background-color: #046BB8;
    }

    .c-layout {
      width: 20%;
      cursor: pointer;
      margin-bottom: 16px;

      .c-bg {
        cursor: pointer;
        position: relative;
        background-image: url($backgroundImgURL + "/meet3.png");
        background-size: 100%;
        background-repeat:no-repeat;
        height: 351px;

        &:hover{
          .c-color,.c-bot{
            background-color: #046BB8;
          }
        }

        &:hover .c-bot {
          .bot-desc,.bot-title {
            color: #FFFFFF;
          }
        }

        .c-color {
          position: absolute;
          top: 10px;
          left: 10px;

          width: 226px;
          height: 215px;
        }
        .c-avatar {
          width: 218px;
          height: 206px;
          margin-left: 4px;
          margin-top: 4px;
          object-fit: cover;
        }

        .c-bot{
          position: absolute;
          bottom: 9px;
          left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 226px;

          .bot-title {
            font-size: 18px;
            font-weight: 600;
            width: 208px;
            color: #333333;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }

          .bot-desc {
            margin: 0 0 15px 0;
            text-align: center;
            width: 208px;
            font-size: 14px;
            font-weight: 500;
            color: #333333;
            line-height: 22px;
            min-height: 45px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;

          }
        }
      }
    }

  }
}

</style>
