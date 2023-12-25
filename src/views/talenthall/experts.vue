<template>
  <el-main v-loading="loading">
    <el-row class="outer-card">
      <el-col v-for="item in listData" :key="item.id" :span="6" class="bot-layout">
        <el-card :body-style="{ padding: '20px' }" class="inner_card" shadow="hover" @click.native="goudetail(item)">
          <div class="inner-top">
            <div class="inner-img">
              <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`">
              <div class="inner-con">
                <h3 class="inner-title">{{ item.nickName }}</h3>
                <p class="inner-pos">{{ item.position }}</p>
                <p class="inner-desc">{{ item.introduction }}</p>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

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
import { getUserList } from '@/api/home'
export default {
  name: 'Talenthallexperts',
  mixins: [common],
  data() {
    return {
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 16 }
      this.pager.pageSize = formpage.pageSize
      getUserList({ userType: 4, ...formpage }).then(res => {
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
    goudetail({ id }) {
      this.goBlank({
        path: '/talenthall/udetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.outer-card{
  margin-bottom: 40px;
  width: 100%;
}
.bot-layout {
  padding: 10px 8px;
}
.inner_card {
  cursor: pointer;
  margin-bottom: 0;
  margin-right: 0;
  .inner-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .inner-img {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-right: 15px;
        height: 141px;
        width: 141px;
        object-fit: cover;
        border-radius: 80px;
      }
    }

    .inner-title {
      font-size: 18px;
      font-weight: 600;
      color: #333333;
      margin-top: 10px;
      margin-bottom: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 110px;
    }

    .inner-pos{
      margin: 5px 0;
      text-overflow: ellipsis;
      line-height: 1.2;
      overflow: hidden;
      min-height: 19px;
      white-space: nowrap;
      width: 110px;
    }

    .inner-desc {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      margin-top: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 1.5;
      min-height: 42px;
      width: 110px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

  }
}

</style>
