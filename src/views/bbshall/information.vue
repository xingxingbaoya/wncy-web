<template>
  <el-main class="content">
    <el-row class="search-area">
      <el-input v-model="keywords" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row>
    <el-row class="list-content">
      <el-col v-for="item in listData" :span="24" class="list-layout">
        <el-card :body-style="{ padding: '36px' }" class="inner_card" shadow="hover" @click.native="goindustry(item)">
          <div class="list-con">
            <div class="list-top">
              <h3 class="top-title">{{ item.infoName }}</h3>
              <span class="top-time">{{ item.createTime | formatDate }}</span>
            </div>
            <div class="list-key">关键词：{{ item.keywords }}</div>
            <div class="list-desc">{{ item.description }}</div>
          </div>
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
import { getBBsColumnList, getBBsIndustryList,getListZLWZ } from '@/api/bbshall'

export default {
  name: 'BBShallinformation',
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
      const formpage = { pageNum, pageSize: 6 }
      this.pager.pageSize = formpage.pageSize
      this.keywords = this.$route.query.keyword ?? ''
      getListZLWZ({ ...formpage, keywords: this.keywords }).then(res => {
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
    goindustry({ id }) {
      this.goBlank({
        path: '/bbshall/technology',
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
}
.search-area {

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 26px 20px;
  margin-bottom: 24px;
}

.list-content {
  margin-bottom: 36px;
  .list-layout {
    margin-bottom: 2px;
    .inner_card {
      cursor: pointer;
    }
  }
  .list-con {
    .list-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-title {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
        margin: 0;
      }
      .top-time {
        font-size: 20px;
        font-weight: 500;
        color: #666666;
      }
    }
    .list-key {
      font-size: 18px;
      font-weight: 500;
      color: #666666;
      margin: 18px 0;
    }

    .list-desc {
      font-size: 18px;
      font-weight: 400;
      line-height: 1.5;
      min-height: 34px;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.input-search {
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

</style>
