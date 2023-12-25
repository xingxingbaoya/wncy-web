<template>
  <el-main class="m-layout">
    <el-row class="search-area">
      <div class="query-layout">
        <el-input v-model="title" placeholder="请输入问题标题进行搜索" class="input-search">
          <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
        </el-input>
      </div>

      <div class="c-bottom">
        <el-table
          :data="tableData"
          height="450"
          border
          stripe
          style="width: 100%"
          @row-click="godetail"
        >
          <el-table-column
            prop="title"
            label="问题标题"
            header-align="center"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            prop="createTime"
            label="发布时间"
            align="center"
          />

          <el-table-column
            label="审核状态"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.status | formatAuth }}</span>
            </template>
          </el-table-column>

        </el-table>
      </div>
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
import { getMyDemandList } from '@/api/demandhall'
import { getMyIndustry, getMyManuscript, getMyQuestion } from '@/api/bbshall'
export default {
  name: 'Personalquestion',
  mixins: [common],
  data() {
    return {
      title: '',
      tableData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 10 }
      this.pager.pageSize = formpage.pageSize
      getMyQuestion({ ...formpage, title: this.title }).then(res => {
        if (res.code == '0000') {
          this.tableData = res.rows
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
    godetail({ id }) {
      this.$router.push({
        path: '/personal/center/detail-question',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.m-layout {
  padding: 18px;
}
.input-search {
  //padding-bottom: 40px;
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
    font-size: 20px;
    color: #FFFFFF;
    border-radius: 0;
  }
}

.sel-layout {
  width: 23%;
  background: #516FD2;
  color: #FFFFFF;
  border-radius: 3px;
  ::v-deep .el-input,
  ::v-deep .el-input__inner, {
    background: #516FD2;
    color: #FFFFFF;
    border:0;
  }

  ::v-deep .el-input__inner {
    height: 55px;
    font-size: 20px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 25px;
    &::placeholder {
      font-size: 20px;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  ::v-deep .el-input.is-focus .el-input__inner{
    border:0;
  }

  ::v-deep .el-input .el-select__caret{
    color:#fff;
  }

  ::v-deep .el-select-dropdown__item{
    font-size: 18px;
    font-weight: 500;
    color: #999999;
    &:hover {
      background: #EFEFEF;
    }
  }
}

.query-layout {
 display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
}

.c-bottom {
  padding-bottom: 40px;
  ::v-deep .el-table th {
    background-color: #516FD2;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 600;
  }

  ::v-deep .el-table td, .el-table th.is-leaf {
    cursor: pointer;
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
</style>
