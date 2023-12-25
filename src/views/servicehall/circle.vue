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
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="110"
                :index="table_index"
              />
              <el-table-column
                header-align="center"
                align="center"
                prop="orgName"
                :label="labelMap[orgTy]"
              />
              <el-table-column
                v-if="hasOrgDistrict"
                align="center"
                prop="orgDistrict"
                label="所属区"
              />
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
import common from '@/mixin/common'
import { getOrgList } from '@/api/servicehall'
export default {
  name: 'Servicehallcircle',
  mixins: [common],
  data() {
    return {
      tableData: [],
      labelMap: {
        'open_lab': '企业名称',
        'check_auth': '机构名称',
        'creative': '运营机构名称',
        'hard_tech': '运营机构名称'
      }
    }
  },
  computed: {
    hasOrgDistrict() {
      return this.$route.query.orgType == 'open_lab' || this.$route.query.orgType == 'check_auth'
    },
    orgTy() {
      return this.$route.query.orgType
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { orgType } = this.$route.query
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 15 }
      this.pager.pageSize = formpage.pageSize
      getOrgList({ ...formpage, orgType }).then(res => {
        if (res.code == '0000') {
          this.tableData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
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
