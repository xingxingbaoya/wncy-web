<template>
  <el-main class="m-layout">
    <el-row class="search-area">
      <el-input v-model="actName" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append">搜索</el-button>
      </el-input>

      <el-row class="c-bottom">
        <el-col v-for="item in listData" :span="6">
          <el-card :body-style="{ padding: '0px' }" class="inner_card" :class="clearMargin(index)" shadow="hover" @click.native="godetail(item)">
            <img v-real-img="item.actCover" :src="`${imgUrl}/activity1.jpg`" class="image">
            <el-tag effect="plain" type="info" size="small" class="status">
              {{ item.actStatus == 'started'?"已开始":"已结束" }}
            </el-tag>
            <div style="padding: 13px 13px 0 13px;">
              <span class="inner-title">{{ item.actName }}</span>
              <p class="inner-desc">活动状态: {{ item.actStatus == 'started'?"已开启":"已结束" }}</p>
              <p class="inner-desc">{{ item.actIntroduction }}</p>
            </div>
          </el-card>
        </el-col>
        <Empty v-show="!listData.length" />

      </el-row>

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
import { getMySingUpInfo } from '@/api/activitieshall'
export default {
  name: 'Personalactivit',
  mixins: [common],
  data() {
    return {

      actName: '',
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 10 }
      this.pager.pageSize = formpage.pageSize
      getMySingUpInfo({ ...formpage, actName: this.actName }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading = false
        }
      )
    },
    godetail({ actSignUpId }) {
      this.$router.push({
        path: '/personal/center/detail-activit',
        query: {
          actSignUpId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search-area {
  margin-bottom: 30px;
}
.m-layout {
  padding: 18px;
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
    height: 56px;
    background: #516FD2;
    font-size: 18px;
    color: #FFFFFF;
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
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .inner-desc {
    font-size: 16px;
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
    width: 75px;
    height: 50px;
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

}
</style>
