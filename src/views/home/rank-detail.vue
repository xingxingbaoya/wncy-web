<template>
  <el-main>
    <el-row v-show="showRank(1)" class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">2021中关村国际技术交易大会 新技术新产品百强榜单</span>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData1"
              :span-method="arraySpanMethod1"
              border
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="110"
                :index="table1_index"
              />
              <el-table-column
                prop="first"
                label="产品名称"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="项目来源单位"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="推荐理由"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="showRank(2)" class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">中关村国际技术交易大会新技术新产品重磅首发项目</span>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData2"
              border
              :span-method="arraySpanMethod2"
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                :index="table2_index"
                width="110"
              />
              <el-table-column
                prop="first"
                label="产品名称"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="项目来源单位"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="项目简介"
                width="650"
                align="center"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="showRank(3)" class="detail-content">

      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">2021中关村国际技术交易大会 新技术新产品百强榜单</span>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData3"
              border
              :span-method="objectSpanMethod3"
              style="width: 100%"
            >
              <el-table-column
                prop="first"
                label="领域"
                align="center"
                header-align="center"
              />
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="110"
              />
              <el-table-column
                prop="second"
                label="项目名称"
                header-align="center"
                width="650"
              />
              <el-table-column
                prop="third"
                label="国别"
                align="center"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="showRank(4)" class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">2021中关村国际技术交易大会-知识产权十大并购案例</span>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData4"
              border
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="110"
              />
              <el-table-column
                prop="first"
                label="案例名称"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="买方名称"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="收购标的"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="fourth"
                label="上榜理由"
                align="center"
                width="300"
                header-align="center"
              />
              <el-table-column
                prop="fifth"
                label="并购标的总价值(亿元)"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="sixth"
                label="知识产权情况"
                align="center"
                width="300"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="showRank(5)" class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">中关村国际技术交易大会国际技术交易创新项目百强榜单</span>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData5"
              :span-method="arraySpanMethod5"
              border
              style="width: 100%"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                :index="table5_index"
                width="110"
              />
              <el-table-column
                prop="first"
                label="产品名称"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="项目来源单位"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="项目简介"
                align="center"
                width="650"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <el-row v-show="showRank(6)" class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <span class="box-title">2021中关村国际技术交易大会百项数字化转型需求榜单</span>
            <h2>第一部分 工业赋能板块</h2>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData61"
              :span-method="arraySpanMethod61"
              border
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                align="center"
                width="110"
                type="index"
                :index="table61_index"
              />
              <el-table-column
                prop="first"
                label="所在领域"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="数字化转型场景名称"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="需求描述"
                align="center"
                width="650"
                header-align="center"
              />
              <el-table-column
                prop="fourth"
                label="需求提出单位"
                align="center"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <h2>第二部分 未来城市板块</h2>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData62"
              :span-method="arraySpanMethod62"
              border
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                align="center"
                width="110"
                type="index"
                :index="table62_index"
              />
              <el-table-column
                prop="first"
                label="所在领域"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="数字化转型场景名称"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="需求描述"
                align="center"
                width="650"
                header-align="center"
              />
              <el-table-column
                prop="fourth"
                label="需求提出单位"
                align="center"
                header-align="center"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header" class="card-h">
            <h2>第三部分 美好生活板块</h2>
          </div>
          <div class="third-bottom">
            <el-table
              :data="tableData63"
              :span-method="arraySpanMethod63"
              border
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                align="center"
                width="110"
                :index="table63_index"
                type="index"
              />
              <el-table-column
                prop="first"
                label="所在领域"
                header-align="center"
              />
              <el-table-column
                prop="second"
                label="数字化转型场景名称"
                align="center"
                header-align="center"
              />
              <el-table-column
                prop="third"
                label="需求描述"
                align="center"
                width="650"
                header-align="center"
              />
              <el-table-column
                prop="fourth"
                label="需求提出单位"
                align="center"
                header-align="center"
              />
            </el-table>
          </div>

        </el-card>
      </el-col>
    </el-row>

  </el-main>

</template>

<script>
import rank3 from '@/assets/rank/rank3.json'
import rank2 from '@/assets/rank/rank2.json'
import rank1 from '@/assets/rank/rank1.json'
import rank4 from '@/assets/rank/rank4.json'
import rank5 from '@/assets/rank/rank5.json'
import rank61 from '@/assets/rank/rank6-1.json'
import rank62 from '@/assets/rank/rank6-2.json'
import rank63 from '@/assets/rank/rank6-3.json'
import common from '@/mixin/common'

export default {
  name: 'Rank',
  mixins: [common],
  data() {
    return {
      tableData1: rank1,
      tableData2: rank2,
      tableData3: rank3,
      tableData4: rank4,
      tableData5: rank5,
      tableData61: rank61,
      tableData62: rank62,
      tableData63: rank63
    }
  },
  computed: {
    showRank() {
      return id => {
        return this.$route.query.id == id
      }
    }
  },
  methods: {
    table1_index(index) {
      if (index > 106) {
        return index - 8
      } else
      if (index > 95) {
        return index - 7
      } else
      if (index > 91) {
        return index - 6
      } else
      if (index > 76) {
        return index - 5
      } else
      if (index > 60) {
        return index - 4
      } else
      if (index > 50) {
        return index - 3
      } else
      if (index > 44) {
        return index - 2
      } else
      if (index > 28) {
        return index - 1
      }
      return index
    },
    table2_index(index) {
      if (index > 26) {
        return index - 8
      } else
      if (index > 23) {
        return index - 7
      } else
      if (index > 21) {
        return index - 6
      } else
      if (index > 19) {
        return index - 5
      } else
      if (index > 14) {
        return index - 4
      } else
      if (index > 11) {
        return index - 3
      } else
      if (index > 8) {
        return index - 2
      } else
      if (index > 4) {
        return index - 1
      }
      return index
    },
    table5_index(index) {
      if (index > 27) {
        return index - 9
      } else
      if (index > 24) {
        return index - 8
      } else
      if (index > 21) {
        return index - 7
      } else
      if (index > 18) {
        return index - 6
      } else
      if (index > 13) {
        return index - 5
      } else
      if (index > 11) {
        return index - 4
      } else
      if (index > 7) {
        return index - 3
      } else
      if (index > 5) {
        return index - 2
      } else
      if (index > 2) {
        return index - 1
      }
      return index
    },
    table61_index(index) {
      if (index > 55) {
        return index - 29
      }
      if (index > 48) {
        return index - 24
      } else
      if (index > 46) {
        return index - 23
      } else
      if (index > 43) {
        return index - 22
      } else
      if (index > 39) {
        return index - 19
      } else
      if (index > 33) {
        return index - 16
      } else
      if (index > 30) {
        return index - 15
      } else
      if (index > 28) {
        return index - 14
      } else
      if (index > 24) {
        return index - 13
      } else
      if (index > 19) {
        return index - 10
      } else
      if (index > 16) {
        return index - 9
      } else
      if (index > 14) {
        return index - 8
      } else
      if (index > 8) {
        return index - 5
      } else
      if (index > 5) {
        return index - 4
      }
      return index
    },
    table62_index(index) {
      if (index > 41) {
        return index - 15
      } else
      if (index > 35) {
        return index - 14
      } else
      if (index > 32) {
        return index - 13
      } else
      if (index > 28) {
        return index - 10
      } else
      if (index > 25) {
        return index - 8
      } else
      if (index > 20) {
        return index - 8
      } else
      if (index > 15) {
        return index - 7
      } else
      if (index > 13) {
        return index - 6
      } else
      if (index > 11) {
        return index - 5
      } else
      if (index > 9) {
        return index - 4
      } else
      if (index > 6) {
        return index - 3
      } else
      if (index > 3) {
        return index - 2
      }
      return index
    },
    table63_index(index) {
      if (index > 27) {
        return index - 13
      } else
      if (index > 22) {
        return index - 10
      } else
      if (index > 20) {
        return index - 9
      } else
      if (index > 17) {
        return index - 8
      } else
      if (index > 13) {
        return index - 5
      } else
      if (index > 9) {
        return index - 4
      } else
      if (index > 7) {
        return index - 3
      } else
      if (index > 3) {
        return index - 2
      }
      return index
    },
    arraySpanMethod1({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 29) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 44) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 50) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 61) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 77) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 91) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 95) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 106) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      }
    },
    arraySpanMethod2({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 4) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 9) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 12) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 14) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 19) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 22) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 26) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 24) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      }
    },
    objectSpanMethod3({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex == 0) {
          return {
            rowspan: 11,
            colspan: 1
          }
        } else if (rowIndex == 11) {
          return {
            rowspan: 11,
            colspan: 1
          }
        } else if (rowIndex == 22) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex == 26) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else if (rowIndex == 35) {
          return {
            rowspan: 14,
            colspan: 1
          }
        } else if (rowIndex == 49) {
          return {
            rowspan: 9,
            colspan: 1
          }
        } else if (rowIndex == 58) {
          return {
            rowspan: 11,
            colspan: 1
          }
        } else if (rowIndex == 69) {
          return {
            rowspan: 10,
            colspan: 1
          }
        } else if (rowIndex == 79) {
          return {
            rowspan: 11,
            colspan: 1
          }
        } else if (rowIndex == 90) {
          return {
            rowspan: 12,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    arraySpanMethod5({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 3) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 6) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 8) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 14) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 18) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 11) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 21) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 24) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 27) {
        if (columnIndex === 1) {
          return [1, 4]
        } else {
          return [0, 0]
        }
      }
    },
    arraySpanMethod61({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 19 || rowIndex === 28 || rowIndex === 33) {
        if (columnIndex === 1) {
          return [1, 6]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 1) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [5, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 2 || rowIndex === 3 ||
        rowIndex === 4 || rowIndex === 5) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 8) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 9) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 11) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 12 || rowIndex === 13 || rowIndex === 14) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 15) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 16) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 21) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 22 || rowIndex === 23 || rowIndex === 24) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 29) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 30) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 36) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 37 || rowIndex === 38 || rowIndex === 39) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 40) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 41 || rowIndex === 42 || rowIndex === 43) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 45) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 46) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 47) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 48) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 50) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [6, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 51 || rowIndex === 52 || rowIndex === 53 || rowIndex === 54 || rowIndex === 55) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else {
        return [1, 1]
      }
    },
    arraySpanMethod62({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 21) {
        if (columnIndex === 1) {
          return [1, 6]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 1) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [3, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 2 || rowIndex === 3) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 5) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 6) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 8) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 9) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 10) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 11) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 12) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 13) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 14) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 15) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 26) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [3, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 27 || rowIndex === 28) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 29) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 30 || rowIndex === 31 | rowIndex === 32) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 34) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 35) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 40) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 41) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else {
        return [1, 1]
      }
    },
    arraySpanMethod63({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 || rowIndex === 4 || rowIndex === 7 || rowIndex === 9 ||
        rowIndex === 13 || rowIndex === 20 || rowIndex === 22
      ) {
        if (columnIndex === 1) {
          return [1, 6]
        } else {
          return [0, 0]
        }
      } else if (rowIndex === 2) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [2, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 3) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 14) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 15 || rowIndex === 16 || rowIndex === 17) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 24) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [4, 1]
        } else {
          return [1, 1]
        }
      } else if (rowIndex === 25 || rowIndex === 26 || rowIndex === 27) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
          return [0, 0]
        } else {
          return [1, 1]
        }
      } else {
        return [1, 1]
      }
    }

  }
}
</script>

<style scoped lang="scss">
.el-main {
  padding-top: 100px;
}
.h-title {
  text-align: center;
}
.detail-content {
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
  .card-h {
    text-align: center;
  }
  .box-title {
    position: relative;
    display: inline-block;
    padding-right: 10px;
    font-size: 23px;
    font-weight: 600;
    color: #333333;
    //&:after {
    //  position: absolute;
    //  right: 0;
    //  top: 0;
    //  content: '';
    //  display: block;
    //  height: 100%;
    //  width: 3px;
    //  background-color: #516FD2;
    //}
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
}
</style>
