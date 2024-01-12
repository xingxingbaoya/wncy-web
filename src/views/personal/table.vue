<template>
  <div>
    <div class="userProject">
      <div class="header">
        <p class="title">我发布的项目</p>
        <div class="status">
          <!-- <div>提交审核(<span style="color: red">0</span>)</div>
          <div>审核通过(<span style="color: red">0</span>)</div>
          <div>驳回(<span style="color: red">0</span>)</div> -->
        </div>
        <div class="handle">
          <div class="btn" @click="$router.push('/projectmanage/publish')">
            发布项目
          </div>
          <div @click="moreProject">更多</div>
        </div>
      </div>

      <el-table
        :data="tableData"
        height="450"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="项目名称"
          header-align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="cooperation" label="所在院所" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.academy }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="tradeStatus" label="项目类别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.typeDescription }}</span>
          </template>
        </el-table-column>

        <el-table-column label="合作意向" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.expire ? scope.row.expire.join(',') : '无'}}</span>
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
    <div class="userProject">
      <div class="header">
        <p class="title">我报名的活动</p>
        <div class="status">
          <!-- <div>提交审核(<span style="color: red">0</span>)</div>
          <div>审核通过(<span style="color: red">0</span>)</div>
          <div>驳回(<span style="color: red">0</span>)</div> -->
        </div>
        <div class="handle">
          <div @click="moreActivity">更多</div>
        </div>
      </div>
      <el-table
        :data="tableData1"
        height="450"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="actName"
          label="活动名称"
          header-align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="tradeStatus" label="所属机构" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="活动时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.actStartTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.actStatus == 'notstart'" style="color：yellow"
              >未开始</span
            >
            <span v-if="scope.row.actStatus == 'started'" style="color：green"
              >已开始</span
            >
            <span v-if="scope.row.actStatus == 'end'" style="color：red"
              >已结束</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
              @click="godetail(scope.row, 2)"
              style="cursor: pointer; color: blue"
              >查看详情</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import common from "@/mixin/common";
import store from "@/store";
import { getMyProjectList } from "@/api/projecthall";
import { getMySingUpInfo } from "@/api/activitieshall";

export default {
  name: "Personalread",
  mixins: [common],
  data() {
    return {
      tableData: [],
      tableData1: [],
      item: {},
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    labelName() {
      return this.item.authType == 1 ? "公司名称:" : "姓名:";
    },
  },
  mounted() {
    console.log(this.user, "this.item");
    this.loadData1();
    this.loadData();
  },
  methods: {
    loadData() {
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 10 };
      getMyProjectList({ ...formpage, title: "" }).then((res) => {
        if (res.code == "0000") {
          this.tableData = res.rows;
          this.tableData.forEach((item,index)=> {
            this.tableData[index]['academy'] = this.academyStateDict?.find(
                (o) => o.dictValue == item.sponsor
              ).dictLabel 
              this.tableData[index]['expire'] = []
              this.cooperationDict.forEach((p) => {
                  item.cooperation.split(',').includes(p.dictValue) &&
                  this.tableData[index]['expire'].push(p.dictLabel);
                });
          })

        } else {
          this.$message.error(res.msg);
        }
      });
    },
    loadData1() {
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 10 };
      getMySingUpInfo({ ...formpage, actName: "" }).then((res) => {
        if (res.code == "0000") {
          this.tableData1 = res.rows;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    godetail({ id }, type) {
      if (type == 1) {
        this.$router.push({
          path: "/personal/center/detail-project",
          query: {
            id,
          },
        });
      } else {
        this.$router.push({
          path: "/personal/center/detail-activit",
          query: {
            id,
          },
        });
      }
    },
    moreActivity() {
      this.$router.push({
        path: "/personal/center/search-activit",
      });
    },
    moreProject() {
      this.$router.push({
        path: "/personal/center/search-project",
      });
    },
    publishProject() {
      this.$router.push({
        path: "/projectmanage/publish",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.userProject {
  padding: 10px;
  margin-bottom: 10px;
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    .title {
      margin-right: 20px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #3c3c41;
      position: relative;
      padding-left: 12px;
      &::before {
        display: block;
        content: "";
        position: absolute;
        width: 4px;
        height: 80%;
        top: 50%;
        left: 0px;
        transform: translateY(-50%);
        background: #2434af;
      }
    }
    .status {
      flex: 1;
      display: flex;
      div {
        margin-right: 10px;
      }
    }
    .handle {
      justify-items: flex-end;
      display: flex;
      :nth-last-child(1) {
        margin-left: 10px;
        cursor: pointer;
        height: 39px;
        line-height: 39px;
        cursor: pointer;
      }
      .btn {
        width: 104px;
        height: 39px;
        background: #2434af;
        border-radius: 6px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
