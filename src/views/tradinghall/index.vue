<template>
  <el-main>
    <el-row>
      <div class="fouth-ad">
        <div class="ad-count">
          <div class="ad-layout">
            <div>
              <countTo class="fouth-count" :start-val="0" :end-val="dataPersentResult.project" :duration="3000" :separator="''" /><span class="unit">累计项</span>
            </div>
            <div class="ad-desc">技术项目</div>
          </div>
          <el-divider direction="vertical" class="line" />
          <div class="ad-layout">
            <div>
              <countTo class="fouth-count" :start-val="0" :end-val="dataPersentResult.requirement" :duration="3000" :separator="''" /><span class="unit">累计项</span>
            </div>
            <div class="ad-desc">技术需求</div>
          </div>
          <el-divider direction="vertical" class="line" />
          <div class="ad-layout">
            <div>
              <countTo class="fouth-count" :start-val="0" :end-val="dataPersentResult.amount" :duration="3000" :separator="''" /><span class="unit">累计项</span>
            </div>
            <div class="ad-desc">交易成果</div>
          </div>
          <el-divider direction="vertical" class="line" />
          <div class="ad-layout">
            <div>
              <countTo class="fouth-count" :start-val="0" :end-val="dataPersentResult.organization" :duration="3000" :separator="''" /><span class="unit">累计个</span>
            </div>
            <div class="ad-desc">服务产品</div>
          </div>
          <el-divider direction="vertical" class="line" />
          <div class="ad-layout">
            <div>
              <countTo class="fouth-count" :start-val="0" :end-val="dataPersentResult.business" :duration="3000" :separator="''" /><span class="unit">累计条</span>
            </div>
            <div class="ad-desc">服务政策</div>
          </div>
        </div>
      </div>
    </el-row>

    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header">
            <span class="box-title">交易进度跟踪</span>
            <el-button class="more" type="text" @click="goprocess">更多<i class="el-icon-arrow-right" /></el-button>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%"
              @row-click="gopetail"
            >
              <el-table-column
                prop="title"
                label="项目名称"
                header-align="center"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="tradeStatus"
                label="状态"
                align="center"
              />
              <el-table-column
                align="center"
                label="进度"
              >
                <template slot-scope="scope">
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.tradeProcess" color="#516FD2" />
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>

    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header">
            <span class="box-title">交易成果展示</span>
            <el-button class="more" type="text" @click="goresult">更多<i class="el-icon-arrow-right" /></el-button>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData1"
              border
              stripe
              style="width: 100%"
              @row-click="gotetail"
            >
              <el-table-column
                header-align="center"
                prop="title"
                label="项目名称"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                align="center"
                prop="tradeWay"
                label="交易方式"
              />
              <el-table-column
                align="center"
                prop="tradePrice"
                width="220"
                label="拟交易价格（万元）"
              />
              <el-table-column
                align="center"
                prop="tradeTime"
                label="交易时间"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="company-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header">
            <span class="box-title">合作机构</span>
            <el-button class="more" type="text" @click="goorg">更多<i class="el-icon-arrow-right" /></el-button>
          </div>

          <el-row class="">
            <el-col v-for="(item,index) in listData" :key="item.id" :span="8" class="c-layout" :class="clearPadding(index)">
              <el-card class="c-card" :body-style="{ padding: '20px 16px' }" shadow="hover" @click.native="godetail(item)">
                <el-row justify="flex-start" type="flex">
                  <div class="l">
                    <img v-real-img="item.avatar" :src="`${imgUrl}/org.jpg`" class="l1">
                  </div>
                  <div class="r">
                    <p class="r1">{{ item.nickName }}</p>
                    <p class="r2">机构性质：{{ item.institutionalNature | formatInsnature }}</p>
                    <p class="r3">服务类型：{{ item.serviceType | formatCompany }}</p>
                    <p class="r4">地域：{{ item.province | formatCity }}</p>
                  </div>
                </el-row>
              </el-card>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import countTo from 'vue-count-to'
import common from '@/mixin/common'
import { getTradeProcessList, getDemandList } from '@/api/tradinghall'
import { findAll, getUserList } from '@/api/home'
export default {
  name: 'Tradinghall',
  components: {
    countTo
  },
  mixins: [common],
  data() {
    return {
      tableData: [],
      tableData1: [],
      listData: [],
      dataPersentResult: {
        project: 0,
        requirement: 0,
        amount: 0,
        organization: 0,
        business: 0
      }
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 6 }
      findAll().then(res => {
        if (res.code == '0000') {
          this.dataPersentResult = _.merge(this.dataPersentResult, res.obj)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
      })

      getTradeProcessList({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.tableData = _.map(res.rows, item => {
            return {
              title: item.project.title,
              tradeProcess: item.tradeProcess,
              projectId: item.projectId,
              tradeStatus: this.formatStatus(item.tradeStatus)
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getDemandList({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.tableData1 = _.map(res.rows, item => {
            return {
              title: item.project.title,
              tradeTime: this.$options.filters['formatDate'](item.tradeTime),
              tradePrice: item.tradePrice,
              projectId: item.projectId,
              tradeWay: this.formatTradeWay(item.tradeWay)
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getUserList({ userType: 3, ...formpage }).then(res => {
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
    goresult() {
      this.goBlank({
        path: '/tradinghall/result'
      })
    },
    goprocess() {
      this.goBlank({
        path: '/tradinghall/process'
      })
    },
    goorg() {
      this.goBlank({
        path: '/tradinghall/org'
      })
    },
    godetail({ id }) {
      this.goBlank({
        path: '/tradinghall/org-detail',
        query: {
          id
        }
      })
    },
    gotetail({ projectId }) {
      this.goBlank({
        path: '/tradinghall/result-detail',
        query: { projectId }
      })
    },
    gopetail({ projectId }) {
      this.goBlank({
        path: '/tradinghall/process-detail',
        query: { projectId }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fouth-ad {
  height: 210px;
  width: 100%;
  background-image: url($backgroundImgURL + "/trade-bg.png");
  background-position: center;
  background-size: cover;
  background-repeat:no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  .ad-count {
    display: flex;
    justify-content: center;
    .line {
      height: 100px;
    }
    .ad-layout {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 250px;
      height: 100px;
      .fouth-count,.unit{
        font-size: 36px;
        font-weight: 400;
        color: #F6F6F6;
      }
      .unit {
        font-size: 18px;
      }
      .ad-desc {
        margin: 0;
        width: 100px;
        font-size: 16px;
        font-weight: normal;
        color: #FFFFFF;
      }
    }
  }

}

.detail-content {
  margin-top: 31px;
  padding: 0 calc((100% - 1245px)/2);
  .box-card-left {
    //min-height: 250px;
    .more {
      color: #516FD2;
      font-size: 18px;
      float: right;
      padding: 3px 0;
      i {
        font-weight: 600;
      }
    }
  }
  .card-bg {
    background-color: #F6F6F6;
  }

  .box-title {
    position: relative;
    display: inline-block;
    padding-right: 10px;
    font-size: 23px;
    font-weight: 600;
    color: #333333;
    &:after {
      position: absolute;
      right: 0;
      top: 0;
      content: '';
      display: block;
      height: 100%;
      width: 3px;
      background-color: #516FD2;
    }
  }

  .text-content {
    color: #333333;
    font-size: 18px;
  }

  .third-bottom {
    ::v-deep .el-table th {
      background-color: #516FD2;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 600;
    }

    ::v-deep .el-table td, .el-table th.is-leaf {
      font-size: 18px;
      font-weight: 400;
      color: #333333;
    }
    ::v-deep .el-table--border td,::v-deep .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 2px solid #FFFFFF;
    }

    ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
      background: #F2F2F2;
    }

    ::v-deep .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
      padding-left: 20px;
    }
  }
}

.company-content {
  margin-top: 31px;
  margin-bottom: 50px;
  padding: 0 calc((100% - 1245px)/2);
  .box-card-left {
    //min-height: 250px;
    .more {
      color: #516FD2;
      font-size: 18px;
      float: right;
      padding: 3px 0;
      i {
        font-weight: 600;
      }
    }
  }
  .card-bg {
    background-color: #F6F6F6;
  }

  .box-title {
    position: relative;
    display: inline-block;
    padding-right: 10px;
    font-size: 23px;
    font-weight: 600;
    color: #333333;
    &:after {
      position: absolute;
      right: 0;
      top: 0;
      content: '';
      display: block;
      height: 100%;
      width: 3px;
      background-color: #516FD2;
    }
  }

  .c-layout {
    padding-right: 30px;
    padding-bottom: 23px;
  }

  .c-card{
    cursor: pointer;
    .l {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .l1 {
        width: 88px;
        height: 88px;
      }

      .l2 {
        margin:8px 0 0;
        width: 88px;
        height: 22px;
        line-height: 22px;
        background: #516FD2;
        border-radius: 3px;

        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
      }
    }

    .r {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 30px;

      p {
        margin: 0;
      }

      .r1 {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        width: 220px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .r2,.r3,.r4 {
        font-size: 18px;
        font-weight: 400;
        color: #666666;
      }

    }
  }
}

</style>
