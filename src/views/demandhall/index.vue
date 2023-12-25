<template>
  <el-main>
    <el-row class="search-area">
      <span class="search-left_cw">需求大厅</span>
      <span class="search-left_detail_cw">优质需求收眼底，赶快寻找合适的需求吧</span>

      <el-input v-model="searchData.name"
                placeholder="输入项目关键词，进行搜索"
                class="input-search">
        <el-button slot="append"
                   @click="()=>{this.pager.pageNum = 1;this.loadData()}">
          <i class="el-icon-search" />
          <span class="icon-text_cw">点击搜索</span>
        </el-button>
      </el-input>
      <!-- <el-button type="primary"
                 class="search-right"
                 @click="gopost">
        <svg-icon icon-class="xuqiu"
                  class-name="icon" /><span class="icon-text">发布需求</span></el-button> -->

    </el-row>
    <div class="content">

      <el-row class="search-content">
        <el-row class="search-query">
          <el-col :span="24" class="search-left">
            <span class="select-title">需求状态</span>
            <el-radio-group v-model="searchData.resolveStatus"
                            class="select-scope"
                            @change="loadData">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">已解决</el-radio-button>
              <el-radio-button label="0">待解决</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="3" />
        </el-row>

        <el-row class="search-query query-line">
          <el-col :span="24"
                  class="search-left">
            <span class="select-title">行业分类：</span>
            <el-radio-group v-model="searchData.industryOne"
                            class="select-scope"
                            :class="{'show-more':isShowFir}"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in industryOneDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <!-- <el-col :span="3">
            <span class="select-more"
                  :class="{'show-more-btn':isShowFir}"
                  @click="showMoreFir">{{ isShowFir?"收起":"更多" }}<i :class="[isShowFir ? 'el-icon-arrow-up':'el-icon-arrow-down']" /></span>
          </el-col> -->
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
        <el-row class="search-query query-line">
          <el-col :span="24" class="search-left">
            <span class="select-title">来 源 地 ：</span>
            <el-radio-group v-model="searchData.province"
                            class="select-scope"
                            :class="{'show-more':isShowSec}"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in cityList">
                <el-radio-button :label="item.code">{{ item.name }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <!-- <el-col :span="3">
            <span class="select-more"
                  :class="{'show-more-btn-sec':isShowSec}"
                  @click="showMoreSec">{{ isShowSec?"收起":"更多" }}<i :class="[isShowSec ? 'el-icon-arrow-up':'el-icon-arrow-down']" /></span>
          </el-col> -->
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
      </el-row>
      <el-row v-loading="loading"
              class="search-list">
        <div v-for="item in listData"
             :key="item.id"
             class="list-box"
             @click="godetail(item)">
          <div class="list-left_cw">
            <!-- <img class="img_cw"
                 :src="`${imgUrl}/demand.jpg`"> -->
                 <img class="img_cw"
                 src="@/assets/img/xuqiuzhanwei.jpg">

          </div>
          <div class="list-desc_cw">
            <div class="title-layout">
              <span class="list-title">{{ item.faceFlag == 1 ? "面议" : item.capital + "万元" }}</span>
              <span class="list-ftitle">{{ item.name }}</span>
            </div>
            <div class="describ_cw">
              {{item.briefDescText}}
            </div>
            <div class="list-fdesc_cw">
              <el-row>
                <el-col :span="7">
                  <span>需求状态：</span><span class="isResolve"
                        :class="{'noResolve':item.resolveStatus == '1'}">{{ item.resolveStatus == "0"?"待解决":"已解决" }}</span>
                </el-col>
                <el-col :span="7">
                  <span>发布时间：{{ item.createTime | formatDate }}</span>
                </el-col>
                <el-col :span="7"
                        class="fdesc-layout">
                  <span>来源地：{{ item.province | MapName(item.city,item.county) }}</span>
                </el-col>

              </el-row>
            </div>
          </div>
          <div class="btns">
            <div class="list-btn"
                       @click="godetail(item)">查看需求</div>
                       <div>

                       </div>
            <!-- <div class="list-btn" @click="contactKf">在线留言</div> -->
          </div>

        </div>
        <!-- <div v-for="item in listData"
             :key="item.id"
             class="list-box"
             @click="godetail(item)">
          <div class="list-left">
            <img v-real-img="item.cover"
                 :src="`${imgUrl}/demand.jpg`">
          </div>
          <div class="list-desc">
            <div class="title-layout">
              <span class="list-ftitle">{{ item.name }}</span><span class="list-title">{{ item.faceFlag == 1 ? "面议":item.capital + "万元" }}</span>
            </div>
            <div class="list-fdesc">
              <el-row>
                <el-col :span="15"
                        class="fdesc-layout">
                  <span>地区：{{ item.province | MapName(item.city,item.county) }}</span>
                </el-col>
                <el-col :span="6">
                  <span>时间：{{ item.createTime | formatDate }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15"
                        class="fdesc-layout">
                  <span>类型：{{ item.industryOne | formatIndustryOne }}</span>
                </el-col>
                <el-col :span="6">
                  <span>状态：</span><span class="isResolve"
                        :class="{'noResolve':item.resolveStatus == '1'}">{{ item.resolveStatus == "0"?"待解决":"已解决" }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-button class="list-btn"
                     @click="godetail(item)">查看</el-button>
        </div> -->
        <Empty v-show="!listData.length" />
      </el-row>
      <el-row type="flex"
              justify="center"
              class="search-footer">
        <el-pagination background
                       layout="total,prev, pager, next,jumper"
                       :page-size="pager.pageSize"
                       :total="pager.total"
                       :current-page="pager.pageNum"
                       @current-change="handleCurrentChange" />
      </el-row>
    </div>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import city from '@/assets/city/city_code.json'
import { getDemandList } from '@/api/demandhall'
export default {
  name: 'Demandhall',
  mixins: [common],
  data () {
    return {
      searchData: {
        name: '',
        industryOne: '',
        province: '',
        resolveStatus: ""
      },
      listData: [],
      isShowFir: false,
      isShowSec: false

    }
  },
  computed: {
    cityList () {
      return city
    }

  },
  methods: {
    loadData () {
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      this.loading=true
      this.searchData.name=this.$route.query.keyword??this.searchData.name
      getDemandList({ ...formpage,...this.searchData }).then(res => {
        if(res.code=='0000') {
          this.listData=res.rows
          this.$set(this.pager,'total',res.total)
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
    godetail ({ id,industryOne }) {
      this.goBlank({
        path: '/demandhall/detail',
        query: {
          id,
          industryOne
        }
      })
    },
    gopost () {
      this.goBlank({
        path: '/demandhall/post'
      })
    }

  }
}
</script>

<style scoped lang="scss">
.btns{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div:nth-child(1){
    width: 129px;
    height: 36px;
    background: #1E86F9;
    border-radius: 3px;
    color: #fff;
    text-align: center;
    margin-bottom: 17px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
  }
  div:nth-child(2){
    width: 129px;
    height: 36px;
    // background: #F6F6F6;
    border-radius: 3px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
    text-align: center;
  }
}
.select-more {
  position: absolute;
  top: 13px;
  right: 20px;
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  /*height: auto;*/
  color: #516fd2;
  cursor: pointer;
  /*margin-top: 16px;*/
  i {
    font-weight: 500;
    font-size: 30px;
    color: #dddddd;
  }
}
.content {
  background: #FDFCFF;
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
.search-area {
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 424px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../../assets/img/bgxq.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
  // padding: 0 -220px -38px;
  // padding: 0 calc((100% - 1245px)/2) 38pxsearch-list
  .icon-text_cw {
    margin-left: 15px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
  }
}

.query-line {
  border-top: 1px solid #eeeeee;
}

.search-left {
  font-size: 30px;
  font-weight: 600;
  color: #516fd2;
  display: flex;
  align-items: center;
}

.search-right {
  width: 180px;
  font-size: 18px;
  background: #516fd2;
  padding: 16px 20px;
  border-radius: 4px;
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: -5px;
    margin-right: 8px;
  }
}

.input-search {
  max-width: 800px;
  margin-top: 27px;
  ::v-deep .el-input__inner {
    height: 56px;
    font-size: 18px;
    // border-color: #516fd2;
    border-right: none;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
  }

  ::v-deep .el-button {
    width: 166px;
    /* height: 53px; */
    /* border-width: 2px; */
    color: #ffffff;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
    border-radius: 0 4px 4px 0;
    border-left: 2px solid;
    padding: 4px 0;
  }
  ::v-deep .el-input-group__append {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.search-content {
  padding: 20px calc((100% - 1245px) / 2) 0;
  background: #fff;
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
    align-self: start;
    width: 120px;
    display: inline-block;
    vertical-align: top;
    height: 45px;
    line-height: 45px;
    // margin-top: 16px;
   font-size: 18px;
        font-family: PingFang SC;
        font-weight: 800;
        color: #333333;
  }
  .select-scope {
    height: 46px;
    transition: height 0.3s;
    width: calc(100% - 120px);
    overflow: hidden;
  }

  .show-more {
    height: auto;
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
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 18px;

  }
  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border: none;
    background-color: #ffffff;
    color: #516fd2;
    box-shadow: none;
    // border-radius: 22px;
    border: 1px solid #516fd2;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  margin-top: 25px;
  padding: 20px calc((100% - 1245px)/2) 0;
  //min-height: 500px;
  background: #FDFCFF;
  .list-left_cw {
    .img_cw {
      width: 215px;
      height: 154px;
    }
  }
  .list-box {
    cursor: pointer;
    transition: 0.3s;
    height: 185px;
    display: flex;
    padding: 16px 28px 15px 13px;
    margin-bottom: 33px;
    justify-content: flex-start;
    // align-items: center;
    border-radius: 4px;
    background: #ffffff;
    &:hover {
      box-shadow: 0px 0px 20px 0px #EBEEFA;
    }
    .list-left {
      display: inline-block;
      img {
        width: 87px;
        height: 87px;
      }
    }
    .list-title {
      display: inline-block;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 800;
      color: #1e86f9;
      padding-right: 15px;
      width:100px
    }

    .list-ftitle {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 900;
      color: #000;
      display: inline-block;
      width: 90%;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出则不换行
    }
    .list-desc_cw {
      width:100%;
      margin: 12px 90px 13px 18px;
    }
    .list-fdesc_cw {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #888;
      .isResolve {
        color: #fa564f;
      }
    }
    .describ_cw {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #555;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 16px 0 21px 0;
      width: 100%;
      line-height: 20px;
    }
    .title-layout {
      display: flex;
      align-items: center;
    }

    .list-desc {
      margin-left: 41px;
      display: inline-block;
      width: 1100px;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
      .list-fdesc {
        font-size: 18px;
        color: #999999;
        .el-row {
          margin-top: 15px;
        }
        .fdesc-layout {
          width: 690px;
        }
        .isResolve {
          color: #516fd2;
        }

        .noResolve {
          color: #999999;
        }
      }
    }
  }
  .list-btn {
    background: #1e86f9;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 18px;
    width: 114px;
    font-weight: 500;
    color: #ffffff;
  }
}
::v-deep .el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-footer {
  padding-bottom: 37px;
}
::v-deep .el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #1E86F9;
    color: #FFFFFF;
}
::v-deep .el-pagination.is-background .el-pager li {
    color: #666;
    background: #FFFFFF;
    line-height: 45px;
    min-width: 52px;
    min-height: 45px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
}
::v-deep .el-pagination.is-background .el-pager li:hover {
    color: #fff;
    background: #1E86F9;
    line-height: 45px;
    min-width: 52px;
    min-height: 45px;
    border: 1px solid #DDDDDD;
    border-radius: 4px;
}
</style>
