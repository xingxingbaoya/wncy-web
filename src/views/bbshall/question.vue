<template>
  <el-main>
    <el-row class="search-area">
      <el-input v-model="keywords" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
      <el-button type="primary" class="search-right" @click="goask"><svg-icon icon-class="tiwen" class-name="icon" /><span class="icon-text">我要提问</span></el-button>
    </el-row>

    <el-row class="bot-bg">
      <el-col v-for="item in listData" :span="24" class="bot-layout">
        <el-card :body-style="{ padding: '25px 32px' }" class="bot-card" shadow="hover" @click.native="goanswer(item)">
          <h3>{{ item.title }}</h3>
          <div class="bot-cont">
            <img v-real-img="item.avatar" class="bot-user" :src="`${imgUrl}/manger.jpg`" alt="img">
            <span class="bot-answer">提问者：{{ item.createByName }}</span>
            <span class="bot-time">时间：{{ item.createTime }}</span>
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
import { getBBsList, getBBsQsList } from '@/api/bbshall'

export default {
  name: 'BBShallquestion',
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
      getBBsQsList({ ...formpage, keywords: this.keywords }).then(res => {
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
    goanswer({ id }) {
      this.goBlank({
        path: '/bbshall/answer',
        query: { id }
      })
    },
    goask() {
      this.goBlank({
        path: '/bbshall/ask'
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.search-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding: 26px 20px;
  margin-bottom: 24px;
}

.search-right {
  width: 180px;
  height: 56px;
  background: #516FD2;
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

.bot-bg {
  background: #EEEEEE;
  margin-bottom: 38px;
}

.bot-layout {
  margin-bottom: 2px;
}
.bot-card {
  cursor: pointer;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 17px;
  }

  .bot-cont {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    .bot-user{
      height: 58px;
      width: 58px;
      border-radius: 50%;
    }
    .bot-answer {
      margin: 0 50px 0 17px;
    }

  }
}

</style>
