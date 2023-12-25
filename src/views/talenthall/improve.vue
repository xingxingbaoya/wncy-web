<template>
  <el-main v-loading="loading">
    <el-row class="outer-card">
      <el-card shadow="never" :body-style="{ padding: '20px 0px 10px 20px' }">
        <el-row>
          <el-col v-for="item in listData" :key="item.id" :span="6">
            <el-card :body-style="{ padding: '0px' }" class="inner_card" shadow="hover" @click.native="godetail(item)">
              <img v-real-img="item.coverPhoto" :src="`${imgUrl}/course.jpg`" class="image">
              <img :src="`${imgUrl}/play.png`" class="play">
              <div style="padding: 14px;">
                <span class="inner-title">{{ item.courseName }}</span>
                <p class="inner-desc">主讲老师: {{ item.lecturer }}</p>
                <div class="inner-btn clearfix">
                  <el-button type="text" class="inner-opera" @click="godetail(item)">查看课程</el-button>
                </div>
              </div>
            </el-card>
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
import { getCourseList } from '@/api/talenthall'

export default {
  name: 'Talenthallimprove',
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
      const formpage = { pageNum, pageSize: 8 }
      this.pager.pageSize = formpage.pageSize
      getCourseList({ ...formpage }).then(res => {
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
    godetail({ id }) {
      this.goBlank({
        path: '/talenthall/detail',
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

  .inner_card {
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    .inner-img {
      align-items: center;
    }
    .inner-title {
      display: inline-block;
      width: 100%;
      font-size: 20px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .inner-desc {
      font-size: 16px;
      font-weight: 400;
      color: #666666;
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
      height: 165px;
      width: 100%;
      object-fit: cover;
    }

    .play {
      position: absolute;
      left: 0;
      right: 0;
      width: 75px;
      height: 50px;
      top: 55px;
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
