<template>
  <el-main>
    <el-row class="search-area">
      <el-input v-model="keywords" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row>
    <el-row class="search-content">
      <el-col v-for="item in listData" :key="item.id" :span="12" class="search-layout">
        <el-card :body-style="{ padding: '30px 22px' }" class="inner_card" shadow="hover" @click.native="golist(item)">
          <div class="inner-top">
            <div class="inner-img">
              <img :src="item.logo" class="image">
              <div class="inner-con">
                <h3 class="inner-title">{{ item.name }}</h3>
                <p class="inner-count">发布时间 {{ item.createTime }}</p>
              </div>
            </div>
            <div class="bot-btn">
              <el-button @click="golist(item)">进入专栏</el-button>
            </div>
          </div>
          <div class="inner-desc">{{ item.description }}</div>
        </el-card>
      </el-col>
      <Empty v-show="!listData.length" />
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
import { getBBsColumnList } from '@/api/bbshall'

export default {
  name: 'BBShallmore',
  mixins: [common],
  data() {
    return {
      keywords: '',
      listData: []
    }
  },

  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 10 }
      this.pager.pageSize = formpage.pageSize
      getBBsColumnList({ ...formpage, keywords: this.keywords }).then(res => {
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
    golist({ id }) {
      this.goBlank({
        path: '/bbshall/list',
        query: {
          id
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.search-area {
  background-color: #FFFFFF;
  padding: 26px 34px 0;
  margin-bottom: 24px;
}

.search-content {

  .search-layout:nth-child(odd) {
    padding-right: 12px;
    padding-bottom: 24px;
  }
  .search-layout:nth-child(even) {
    padding-left: 12px;
    padding-bottom: 24px;
  }
  margin-bottom: 25px;
  .inner_card {
    cursor: pointer;
    .inner-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .inner-img {
        display: flex;
        justify-content: flex-start;
        img {
          margin-right: 12px;
          height: 104px;
          width: 104px;
          object-fit: cover;
        }
      }

      .inner-title {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
        margin-top: 10px;
        margin-bottom: 0;
      }

      .inner-count {
        font-size: 16px;
        font-weight: 500;
        margin-top: 40px;
        color: #516FD2;
      }

      .bot-btn {
        .el-button {
          width: 132px;
          height: 42px;
          background: #516FD2;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }

    .inner-desc {
      margin-top: 16px;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      min-height: 34px;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
.input-search {
  padding-bottom: 26px;
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
    border-radius: 0 4px 4px 0;
  }
}

</style>
