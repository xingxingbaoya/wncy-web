<template>
  <el-main>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '20px 20px' }">
          <div class="third-bottom">
            <el-table
              v-loading="loading"
              :data="tableData"
              border
              stripe
              style="width: 100%"
              @row-click="godetail"
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
import countTo from 'vue-count-to'
import common from '@/mixin/common'
import { getTradeProcessList } from '@/api/tradinghall'
export default {
  name: 'Tradinghallprocess',
  components: {
    countTo
  },
  mixins: [common],
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 15 }
      this.pager.pageSize = formpage.pageSize
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
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    godetail({ projectId }) {
      this.goBlank({
        path: '/tradinghall/process-detail',
        query: {
          projectId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.detail-content {
  margin-bottom: 37px;
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
  padding: 0 220px;
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
