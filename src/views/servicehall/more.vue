<template>
  <el-main v-loading="loading">
    <el-row class="search-area">
      <el-input v-model="params.serviceName" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row>

    <el-row class="main-cont">
      <el-tabs v-model="params.topicName" @tab-click="(it)=>{this.loadData(it)}">
        <template v-for="item in tabData">
          <el-tab-pane :label="item.topicName" :name="item.topicDictValue">
            <el-row class="list-card">
              <el-col v-for="(item,index) in listData" :key="item.id" :span="6" class="card-layout" :class="clearPaddingFou(index)">
                <el-card :body-style="{ padding: '0px' }" class="inner-cont" shadow="hover" @click.native="godetail(item)">
                  <img v-real-img="item.picUrl" class="image" :src="`${imgUrl}/product.jpg`">
                  <div class="text-cont">
                    <span class="inner-title">{{ item.serviceName }}</span>
                    <p class="cont-desc">{{ item.serviceIntro }}</p>
                    <p style="margin: 0;"><span class="cont-type">{{ item.serviceTag }}</span><span class="cate-cont">{{ item.amount == '-1'?"面议":item.amount + '元起' }}</span></p>
                    <!--                    <p class="cate-cont"><span class="price">{{ item.amount }}元起</span> </p>-->
                  </div>
                </el-card>
              </el-col>
              <Empty v-show="!listData.length" />
            </el-row>
          </el-tab-pane>
        </template>
      </el-tabs>
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
import { getService, getServiceSearch } from '@/api/servicehall'

export default {
  name: 'Servicehallmore',
  mixins: [common],
  data() {
    return {
      listData: [],
      tabData: [],
      params: {
        serviceName: '',
        topicName: 's_finance'
      }
    }
  },
  mounted() {
    this.params.topicName = this.$route.query.topicName
    console.log(this.$route.query)
  },
  methods: {
    loadData(it) {
      getService().then(res => {
        if (res.code == '0000') {
          this.tabData = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 16 }
      this.pager.pageSize = formpage.pageSize
      this.params.topicName = it?.name ?? this.$route.query.topicName
      console.log(this.params.topicName)
      getServiceSearch({ ...formpage, ...this.params }).then(res => {
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
        path: '/servicehall/detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.search-area {
  background-color: #FFFFFF;
  padding: 26px 34px 0;
}

.search-content {
  margin-bottom: 25px;
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
    border-radius: 0 4px 4px 0;
  }
}
::v-deep .el-tabs__active-bar {
  background-color: #516FD2;
}

::v-deep .el-tabs__item {
  font-size: 22px;
  font-weight: 400;
  line-height: 25px;
  &.is-active {
    color: #516FD2;
  }
  &:hover {
    color: #516FD2;
  }
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}

::v-deep .el-tabs__header {
  background-color: #FFFFFF;
  padding: 0 34px;
}

.main-cont{
  margin-bottom: 30px;
  .list-card {
  }

  .card-layout {
    cursor: pointer;
    padding: 10px 16px 10px 0;
  }

  .inner-cont {
    position: relative;
    .inner-img {
      align-items: center;
    }

    .cont-type {
      display: inline-block;
      cursor: pointer;
      background: #F2F7FF;
      border: 1px solid #516FD2;
      border-radius: 3px;
      text-align: center;
      line-height: 24px;
      font-size: 18px;
      font-weight: 400;
      color: #516FD2;
      padding: 5px;
      margin-right: 30px;
      overflow: hidden;
      width: 120px;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cont-desc {
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .text-cont {
      padding: 12px;
      .cate-cont {
        font-size: 16px;
        font-weight: 400;
        color: #516FD2;
      }
      .price {

      }
    }
    .inner-title {
      display: inline-block;
      width: 100%;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 18px;
      color: #333333;
    }
    .inner-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
    }

    .inner-opera {
      width: 132px;
      height: 42px;
      color: #FFFFFF;
      background: #516FD2;
      border-radius: 4px;
    }
    .image {
      height: 226px;
      width: 100%;
    }

  }
}

</style>
