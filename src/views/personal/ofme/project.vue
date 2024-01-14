<template>
  <el-main class="m-layout">
    <el-row class="search-area">
      <el-input
        v-model="title"
        placeholder="请输入关键字进行搜索"
        class="input-search"
      >
        <el-button
          slot="append"
          @click="
            () => {
              this.pager.pageNum = 1;
              this.loadData();
            }
          "
          >搜索</el-button
        >
      </el-input>
      <div class="c-bottom">
        <el-table
          :data="tableData"
          min-height="450"
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
          <el-table-column prop="tradeStatus" label="所在院所" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.academy }}</span>
            </template>
          </el-table-column>

          <el-table-column label="项目类别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.typeDescription || "无" }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="tradeStatus" label="合作意向" align="center">
            <template slot-scope="scope">
              <span>{{
                scope.row.expire ? scope.row.expire.join(",") : "无"
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            width="160px"
            label="创建时间"
            align="center"
          />

          <el-table-column label="审核状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status | formatAuth }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="80px" align="center">
            <template slot-scope="scope">
              <span
                @click="godetail(scope.row, 1)"
                style="cursor: pointer; color: blue"
                >查看详情</span
              >
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
import common from "@/mixin/common";
import { getMyProjectList } from "@/api/projecthall";
export default {
  name: "Personalproject",
  mixins: [common],
  data() {
    return {
      title: "",
      tableData: [],
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 10 };
      this.pager.pageSize = formpage.pageSize;
      getMyProjectList({ ...formpage, title: this.title })
        .then((res) => {
          if (res.code == "0000") {
            this.tableData = res.rows;
            this.tableData.forEach((item, index) => {
              this.tableData[index]["academy"] =
                this.academyStateDict?.find((o) => o.dictValue == item.sponsor)
                  ?.dictLabel || "-";
              this.tableData[index]["expire"] = [];
              this.cooperationDict.forEach((p) => {
                item.cooperation.split(",").includes(p.dictValue) &&
                  this.tableData[index]["expire"].push(p.dictLabel);
              });
            });
            this.$set(this.pager, "total", res.total);
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    godetail({ id }) {
      this.$router.push({
        path: "/personal/center/detail-project",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.search-area {
  margin-bottom: 10px;
}
.m-layout {
  padding: 18px;
}
.input-search {
  padding-bottom: 20px;
  ::v-deep .el-input__inner {
    height: 40px;
    font-size: 14px;
    border-color: #516fd2;
    border-width: 2px;
    border-right: none;
  }

  ::v-deep .el-button {
    width: 143px;
    height: 40px;
    background: #516fd2;
    font-size: 14px;
    color: #ffffff;
    border-radius: 0 4px 4px 0;
  }
}
</style>
