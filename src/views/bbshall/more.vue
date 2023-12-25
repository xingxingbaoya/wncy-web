<template>
  <el-main>
    <!-- <el-row class="search-area">
      <span class="search-left_cw">资讯大厅</span>
      <span class="search-left_detail_cw">提供科技行业前线最新资讯</span>
      <el-input v-model="searchData.title"
                placeholder="输入咨询关键词，进行搜索"
                class="input-search">
        <el-button slot="append"
                   @click="()=>{this.pager.pageNum = 1;this.loadData()}">
          <i class="el-icon-search" />
          <span class="icon-text_cw">点击搜索</span>
        </el-button>
      </el-input>
    </el-row> -->

    <div class="content">
      <el-row class="search-area">
      <el-input v-if="type!=='3'" v-model="searchData.title" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
      <el-input v-else v-model="searchData.policyName" placeholder="请输入关键字进行搜索" class="input-search">
        <el-button slot="append" @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row>
      <el-row class="search-content">

        <el-row class="search-query query-line">
          <el-col :span="21">
            <span class="select-title">行业方向：</span>
            <el-radio-group v-model="searchData.supportInd"
                            :class="{'show-more':isShowSec}"
                            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in supportIndDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <el-col :span="3"
                  class="more-layout">
            <span class="select-more"
                  @click="showMoreSec">
              <i v-if="!isShowSec"
                 class="el-icon-caret-bottom"></i>
              <i v-if="isShowSec"
                 class="el-icon-caret-top"></i>
            </span>
          </el-col>
        </el-row>
        <el-row class="search-query query-line">
          <el-col :span="21">
            <span class="select-title">支持方向：</span>
            <el-radio-group v-model="searchData.policyType"
                            :class="{'show-more':isShowFir}"
                            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in policyTypeDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <el-col :span="3"
                  class="more-layout">
            <span class="select-more"
                  @click="showMoreFir">
              <i v-if="!isShowFir"
                 class="el-icon-caret-bottom"></i>
              <i v-if="isShowFir"
                 class="el-icon-caret-top"></i>
            </span>
          </el-col>
        </el-row>

        <el-row class="search-query query-line"  v-if="type=='0'">
          <el-col :span="24">
            <span class="select-title">申报状态：</span>
            <el-radio-group v-model="searchData.policyState"
                            :class="{'show-more':isShowSec}"
                            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in policyStateDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <!-- <el-col :span="3"
                  class="more-layout">
            <span class="select-more"
                  @click="showMoreSec">
              <i v-if="!isShowSec"
                 class="el-icon-caret-bottom"></i>
              <i v-if="isShowSec"
                 class="el-icon-caret-top"></i>
            </span>
          </el-col> -->
        </el-row>

        <el-row class="search-query">
          <el-col :span="22"
                  class="search-left">
            <span class="select-title pr20 mt0">其他要求：</span>
            <span class="select-ftitle">年份：</span>
            <el-date-picker v-model="searchData.supportLimit"
                            type="year"
                            value-format="yyyy"
                            class="pr20"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}"
                            placeholder="请选择">
            </el-date-picker>

            <span class="select-ftitle">选择区域：</span>
            <el-select v-model="searchData.area"
                       placeholder="请选择"
                       class="sel-layout"
                       @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-option v-for="item in cityList"
                         :key="item.code"
                         :label="item.name"
                         :value="item.name">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" />
        </el-row>
      </el-row>

    </div>
    <el-row v-loading="loading"
            class="search-list">
      <div class="lists">
        <div class="list_left">
          <div v-if="type==1" class="list_left_title">
            最新政策
          </div>
          <div v-if="type==2" class="list_left_title">
            最热政策
          </div>
          <div v-if="type==3" class="list_left_title">
            政策解读
          </div>
          <div v-if="type=='1'" v-for="(item,index) in newPlicyList"
               @click="jumpPolicyDetail(item.policyId)"
               :key=index
               class="item">
            <div class="item_content">
              <div class="item_title">
                {{ item.title }}
              </div>
              <div class="item_decril">
                <div>
                  {{item.text}}
                </div>

              </div>
              <div class="item_time_bumen">
                {{ item.createTime }}
                <span>{{item.pubOrg}}</span>
              </div>
            </div>
          </div>
          <div v-if="type=='2'" v-for="(item,index) in hotList"
               @click="jumpPolicyDetail(item.policyId)"
               :key=index
               class="item">
            <div class="item_content">
              <div class="item_title">
                {{ item.title }}
              </div>
              <div class="item_decril">
                <div>
                  {{item.text}}
                </div>

              </div>
              <div class="item_time_bumen">
                {{ item.createTime }}
                <span>{{item.pubOrg}}</span>
              </div>
            </div>
          </div>
          <div v-if="type=='3'" v-for="(item,index) in interpretationlist"
               @click="jumpPolicyDetail(item.id,1)"
               :key=index
               class="item">
            <div class="item_content">
              <div class="item_title">
                {{ item.policyName }}
              </div>
              <div class="item_decril">
                <div>
                  {{item.score?item.score:""}}
                </div>

              </div>
              <div class="item_time_bumen">
                {{ item.createTime }}
                <span>{{item.pubOrg}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="list_right">
          <div class="list_right_top" v-if="type !=='1'" >
            <div class="list_right_title">
              最新政策
            </div>
            <div v-for="(item,index) in newPlicyListSide"
                 :key=index
                 @click="jumpPolicyDetail(item.policyId)"
                 class="item">
              <div class="item_title">
                {{item.title}}
              </div>
            </div>
          </div>

          <div v-if="type !=='2'" class="list_right_top">
            <div class="list_right_title">
              热门政策
            </div>

            <div v-for="(item,index) in hotListSide"
                 :key=index
                 @click="jumpPolicyDetail(item.policyId)"
                 class="item">
              <div class="item_title">
                {{item.title}}
              </div>
            </div>
          </div>
          <div class="list_right_bot" v-if="type !=='3'" >
            <div class="list_right_title">
              政策解读
            </div>
            <div v-for="(item,index) in interpretationside"
                 :key=index
                 @click="jumpPolicyDetail(item.id,1)"
                 class="item">
              <div class="item_title">
                {{item.policyName}}
              </div>
            </div>
          </div>

        </div>
      </div>
      <el-row type="flex"
              v-show="newPlicyList.length && type == '1'"
              justify="center"
              class="search-footer">
        <el-pagination background="true"
                       layout="total,prev, pager, next,jumper"
                       :page-size="pager.pageSize"
                       :total="pager.total"
                       :current-page="pager.pageNum"
                       @current-change="handleCurrentChange" />
      </el-row>
      <Empty v-show="!newPlicyList.length && type == '1'" />
      <el-row type="flex"
              v-show="hotList.length && type == '2'"
              justify="center"
              class="search-footer">
        <el-pagination background="true"
                       layout="total,prev, pager, next,jumper"
                       :page-size="pager.pageSize"
                       :total="pager.total"
                       :current-page="pager.pageNum"
                       @current-change="handleCurrentChange" />
      </el-row>
      <Empty v-show="!hotList.length && type == '2'" />
      <el-row type="flex"
              v-show="interpretationlist.length && type == '3'"
              justify="center"
              class="search-footer">
        <el-pagination background="true"
                       layout="total,prev, pager, next,jumper"
                       :page-size="pager.pageSize"
                       :total="pager.total"
                       :current-page="pager.pageNum"
                       @current-change="handleCurrentChange" />
      </el-row>
      <Empty v-show="!interpretationlist.length && type == '3'" />
    </el-row>

  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getBBsColumnList } from '@/api/bbshall'
import { getBBsHome,getPolicyList,getZgcPolicyInterpretation } from '@/api/bbshall'
export default {
  name: 'BBShallmore',
  mixins: [common],
  data () {
    return {
      listData: [],
      interpretation: [],
      hotList: [],
      newPlicyList: [],
      hotListSide: [],
      newPlicyListSide: [],
      interpretationside:[],
      interpretationlist:[],
      searchData: {
        policyState: "",
        supportInd: "",
        policyType: "",
        supportLimit: "",
        area: "",
        title:this.$route.query.searchTitle ? this.$route.query.searchTitle : "",
        policyName:""
      },
      isShowFir: false,
      isShowSec: false,
      type:this.$route.query.num
    }
  },
  created () {
    this.loadData()
    this.loadDataNewZcjdSide()
    this.loadDataSide()
  },

  methods: {
    // 获取政策
    loadData () {
      this.loading=true
      this.pager.pageSize = 6
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      getPolicyList({ ...formpage,...this.searchData }).then(res => {
        if(res.code==0) {
          this.newPlicyList=res.rows[0].createList
          this.hotList=res.rows[0].hotList
          if(this.type=='1'){
            this.$set(this.pager,'total',res.rows[0].createTotle)
          }else if(this.type=='2'){
            this.$set(this.pager,'total',res.rows[0].hotTotle)
          }
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })

      getZgcPolicyInterpretation({ ...formpage,...this.searchData }).then(res => {
        if(res.code==0) {
          this.interpretationlist=res.rows
          if(this.type=='3'){
             this.$set(this.pager,'total',res.total)
          }
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    // 获取政策解读列表
    loadDataNewZcjdSide () {
      this.loading=true
      this.pager.pageSize = 6
      const { pageNum,pageSize }=this.pager
      getZgcPolicyInterpretation({ pageNum,pageSize }).then(res => {
        if(res.code==0) {
          this.interpretationside=res.rows
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    loadDataSide () {
      this.loading=true
      this.pager.pageSize = 6
      const { pageNum,pageSize }=this.pager
      getPolicyList({ pageNum,pageSize }).then(res => {
        if(res.code==0) {
          this.newPlicyListSide=res.rows[0].createList
          this.hotListSide=res.rows[0].hotList
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    showMoreFir () {
      this.isShowFir=!this.isShowFir
    },
    showMoreSec () {
      this.isShowSec=!this.isShowSec
    },
    golist ({ id }) {
      this.goBlank({
        path: '/bbshall/list',
        query: {
          id
        }
      })
    },
    jumpZcDetail () {
      this.$route.push({
        path: "/zcDetail",querey: {

        }
      })
    },
    jumpPolicyDetail (id,type) {
      this.goBlank({
        path: '/bbshall/PolicyDetail',
        query: {
          id,
          type
        }
      })
    }

  }

}
</script>

<style scoped lang="scss">
.search-content {
  background-color: transparent;
  .search-query {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 150px;
    }
    ::v-deep .el-input__inner {
      background-color: transparent !important;
    }
  }

  .search-left {
    display: flex;
    align-items: center;
  }

  .select-title {
    width: 100px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
  }

  .mt0 {
    margin-top: 0;
  }

  .select-ftitle {
    font-size: 16px;
    font-weight: 600;
    color: #606266;
  }

  .pr20 {
    margin-right: 22px;
  }

  .select-scope {
    transition: height 0.3s;
    width: calc(100% - 120px);
    display: inline-block;
    height: 55px;
    overflow: hidden;
    ::v-deep .el-radio-button__inner {
      background-color: transparent;
    }
  }
  .sel-layout {
    width: 15%;
    border-radius: 3px;
    ::v-deep .el-input,
    ::v-deep .el-input__inner {
      height: 45px;
      //font-size: 20px;
      font-weight: 400;
      //color: #FFFFFF;
      line-height: 25px;
      &::placeholder {
        font-size: 18px;
        font-weight: 400;
        //color: #FFFFFF;
      }
    }

    ::v-deep .el-select-dropdown__item {
      font-size: 18px;
      font-weight: 500;
      color: #999999;
    }
  }

  .show-more {
    height: auto;
  }

  .more-layout {
    text-align: right;
    height: 45px;
    line-height: 45px;
  }

  .select-more {
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    cursor: pointer;
    height: auto;
    i {
      font-weight: 700;
      font-size: 18px;
      color: #606266;
    }
  }

  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border: none;
    border-radius: 22px;
    border: 1px solid #fff;
  }

  ::v-deep .el-radio-button__inner {
    border: none;
    border-radius: 22px;
    border: 1px solid #fff;
     font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #666666;
  }
  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border: none;
    color: #226fed;
    box-shadow: none;
    border-radius: 22px;
  }

  ::v-deep .el-radio-button__inner:hover {
    color: #516fd2;
  }

  ::v-deep
    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }
}
.lists {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  display: flex;
  justify-content: space-between;
  .list_left {
    background: #fff;
    width: 70%;
    .list_left_title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      border-bottom: 1px solid #eeeeee;
      padding: 27px 10px;
      background: #fff;
    }
    .item {
      border-bottom: 1px solid #eeeeee;
      padding: 27px 10px 0;
      background: #fff;
      cursor: pointer;

      .item_decril {
        margin: 14px 0 34px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #666666;
        div {
          width: 95%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
          -webkit-box-orient: vertical; /* 垂直排列 */
          word-break: break-all; /* 内容自动换行 */
        }
      }
      .item_time_bumen {
        padding-bottom: 23px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #999999;
        span {
          margin-left: 80px;
        }
      }
    }
  }
  .list_right {
    width: 30%;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    flex-direction: column;
    .list_right_top {
      width: 100%;
      background: #fff;
      .list_right_title {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
        padding: 27px 10px;
        background: #fff;
        margin-bottom: 14px;
        padding-left: 106px;
      }
      .item {
        cursor: pointer;
        padding-left: 106px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #333333;
        margin: 14px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
        -webkit-box-orient: vertical; /* 垂直排列 */
        word-break: break-all; /* 内容自动换行 */
      }
      .item:hover {
        cursor: pointer;
        padding-left: 106px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #1e86f9;
        margin: 14px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
        -webkit-box-orient: vertical; /* 垂直排列 */
        word-break: break-all; /* 内容自动换行 */
      }
    }
    .list_right_bot {
      width: 100%;
      background: #fff;
      .list_right_title {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        border-bottom: 1px solid #eeeeee;
        padding: 27px 10px;
        background: #fff;
        margin-bottom: 10px;
        padding-left: 106px;
      }
      .item {
        cursor: pointer;
        padding-left: 106px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #333333;
        margin: 14px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
        -webkit-box-orient: vertical; /* 垂直排列 */
        word-break: break-all; /* 内容自动换行 */
      }
      .item:hover {
        cursor: pointer;
        padding-left: 106px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #1e86f9;
        margin: 14px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
        -webkit-box-orient: vertical; /* 垂直排列 */
        word-break: break-all; /* 内容自动换行 */
      }
    }
  }
}
.other {
  display: flex;
  align-items: center;
  .other_chose {
    margin-top: 16px;
    .demonstration {
      margin-left: 25px;
      margin-right: 20px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #666666;
    }
  }
}
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
     padding: 19px 20px;
     border-radius: 0 4px 4px 0;
     background: #516FD2;
     font-size: 18px;
     color: #FFFFFF;
   }
 }

.query-line {
  border-top: 1px solid #eeeeee;
}

.search-left {
  font-size: 30px;
  font-weight: 600;
  color: #516fd2;
}
.search-left_cw {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-top: 164px;
}
.search-left_detail_cw {
  margin-top: 26px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
}

.search-right {
  width: 180px;
  /*height: 56px;*/
  background: #516fd2;
  border-radius: 4px;
  font-size: 18px;
  padding: 16px 20px;
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: -5px;
    margin-right: 8px;
  }
}
.content {
  padding: 120px calc((100% - 1245px) / 2) 38px;
}

.input-search {
  // max-width: 800px;
  margin-top: 27px;
  ::v-deep .el-input__inner {
    height: 56px;
    font-size: 18px;
    // border-color: #516fd2;
    border-right: none;
    // background-color: rgba(0, 0, 0, 0.1);
    // color: #fff;
  }

  ::v-deep .el-button {
    width: 143px;
    padding: 19px 20px;
    border-radius: 0 4px 4px 0;
    background: #516FD2;
    font-size: 18px;
    color: #FFFFFF;
  }
  ::v-deep .el-input-group__append {
    background-color: rgba(0, 0, 0, 0.1);
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

.search-content {
  .search-query {
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 33px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .select-title {
    width: 120px;
    display: inline-block;
    vertical-align: top;
    margin-top: 16px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
  }

  .select-scope {
    transition: height 0.3s;
    width: calc(100% - 120px);
    display: inline-block;
    height: 55px;
    overflow: hidden;
  }

  .show-more {
    height: auto;
  }

  .more-layout {
    overflow: hidden;
  }

  .select-more {
    position: absolute;
    top: 13px;
    right: 110px;
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    /*height: auto;*/
    color: #516fd2;
    cursor: pointer;
    /*margin-top: 16px;*/
    i {
      font-weight: 500;
      font-size: 45px;
      color: #dddddd;
    }
  }

  ::v-deep .el-radio-button:first-child .el-radio-button__inner {
    border: none;
    border-radius: 22px;
    border: 1px solid #fff;
  }

  ::v-deep .el-radio-button__inner {
    border: none;
    border-radius: 22px;
    border: 1px solid #fff;
     font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #666666;
  }
  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border: none;
    background-color: #ffffff;
    color: #516fd2;
    box-shadow: none;
    border-radius: 22px;
    border: 1px solid #516fd2;
  }

  ::v-deep .el-radio-button__inner:hover {
    color: #516fd2;
  }

  ::v-deep
    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
    box-shadow: none;
  }
}

.search-list {
  ::v-deep .el-col-12 {
    padding: 10px;
  }
  margin-top: 25px;
  padding: 22px 14px;
  background-color: #ffffff;
  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
  }
  .box-card {
    cursor: pointer;
    .header_cw {
      display: flex;
      justify-content: space-between;
      .header_img {
        width: 160px;
        height: 102px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .header-price {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #1e86f9;
        .bold-price {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #1e86f9;
        }
      }
    }

    .title_cw {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin: 14px 0 13px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /*超出几行后省略号*/
      overflow: hidden;
    }
    .description_cw {
      font-size: 16px;
      font-weight: 500;
      min-height: 50px;
      line-height: 1.5;
      color: #999999;
      margin: 5px auto;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .from_time_cw {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      span:nth-child(2) {
        margin: 10px 0;
      }
    }
  }
  .bottom_cw {
    display: flex;
    .check {
      width: 129px;
      height: 36px;
      background: #1e86f9;
      border: 1px solid #1e86f9;
      border-radius: 3px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
    }
    .chat {
      width: 129px;
      height: 36px;
      background: #f6f6f6;
      border-radius: 3px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #999999;
      margin-left: 18px;
    }
  }

  .box-top {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .top-title {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }

    .top-time {
      font-size: 16px;
      font-weight: 400;
      color: #999999;
    }
  }

  .box-bottom {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .bottom-img {
      display: flex;
      justify-content: space-between;

      img {
        width: 84px;
        height: 84px;
        margin-right: 16px;
      }
    }

    .bottom-desc {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      h3 {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        margin-top: 0;
        margin-bottom: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 300px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        margin: 0 0 12px;
      }
    }

    .bottom-price {
      font-size: 18px;
      font-weight: 400;
      color: #516fd2;
      .bold-price {
        font-weight: 600;
      }
    }
  }

  .bot-desc {
    font-size: 16px;
    font-weight: 500;
    min-height: 50px;
    line-height: 1.5;
    color: #999999;
    margin: 5px auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .card-bot {
    height: 62px;
    background: #516fd2;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .foot-title {
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
    }

    .foot-btn {
      font-size: 16px;
      font-weight: 400;
      color: #516fd2;
      padding: 10px 20px;
    }
  }
}
::v-deep .el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-footer {
  margin-top: 37px;
}
</style>
