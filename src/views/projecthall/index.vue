<template>
  <el-main>
    <el-row class="search-area">
      <span class="search-left_cw">项目大厅</span>
      <span class="search-left_detail_cw">集结行业最优科技成果转化项目，技术持有者可自有发布行业顶尖成果</span>
      <el-input v-model="searchData.title"
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
                  class-name="icon" /><span class="icon-text">发布项目</span></el-button> -->
    </el-row>
    <div class="content">
      <el-row class="search-content">
        <el-row class="search-query">
          <el-col :span="24"
                  class="search-left">
            <span class="select-title">技术类型：</span>
            <el-radio-group v-model="searchData.proPatentInfo"
            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in techTypeDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <el-col :span="3" />
        </el-row>
        <el-row class="search-query query-line">
          <el-col :span="24">
            <span class="select-title">技术来源：</span>
            <el-radio-group v-model="searchData.proNature"
            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in natureDict">
                <el-radio-button :label="item.dictValue">{{ item.dictLabel }}</el-radio-button>
              </template>
            </el-radio-group>
          </el-col>
          <el-col :span="3" />
        </el-row>
        <el-row class="search-query query-line">
          <el-col :span="24">
            <span class="select-title">来 源 地 ：</span>
            <el-radio-group v-model="searchData.province"
                            :class="{'show-more':isShowFir}"
                            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in cityList">
                <el-radio-button :label="item.code">{{ item.name }}</el-radio-button>
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

        <el-row class="search-query query-line">
          <el-col :span="24">
            <span class="select-title">行业分类：</span>
            <el-radio-group v-model="searchData.industryone"
                            :class="{'show-more':isShowSec}"
                            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <template v-for="item in industryOneDict">
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
          <el-col :span="24">
            <span class="select-title">是否挂牌：</span>
            <el-radio-group v-model="searchData.isListing"
            class="select-scope"
                            @change="loadData">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="0">是</el-radio-button>
              <el-radio-button label="1">否</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="3" />
        </el-row>
        <el-row class="search-query query-line">
          <el-col :span="24">
            <span class="select-title">项目地区：</span>
            <el-radio-group v-model="searchData.isNotNational"
            class="select-scope"
                            @change="()=>{this.pager.pageNum = 1;this.loadData()}">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="1">国内项目</el-radio-button>
              <el-radio-button label="0">国外项目</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="3" />
        </el-row>
      </el-row>

      <el-row v-loading="loading"
              class="search-list">
        <el-col v-for="item in listData"
                :key="item.id"
                :span="8">
          <div class="card-cont">
            <el-card class="box-card"
                     :body-style="{ padding: '15px 30px' }"
                    >
              <div class="header_cw">
                <div class="header_img">
                  <!-- <img v-real-img="item.logo"
                       :src="`${imgUrl}/project.jpg`"
                       :alt="item.logo"> -->
                       <img src="@/assets/img/xiangmuxiangqing.jpg" alt="">
                </div>
                <div class="header-price">
                  <span v-if="item.faceFlag == '1'|| item.proIntentionPrice == 0"
                        class="bold-price">面议</span>
                  <span v-else
                        class="bold-price">¥{{ item.proIntentionPrice }}万</span>
                </div>
              </div>
              <div class="title_cw">
                {{ item.title }}
              </div>
              <div class="description_cw" >
                {{ item.proIntroduct }}
              </div>

              <div class="from_time_cw">
                <span class="top-time">发布时间：{{ item.createTime.substring(0,11) }}</span>
                <span class="top-title">来源地：{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }}</span>
              </div>
              <div class="bottom_cw">
                <div class="check"
                     @click="godetail(item)">
                  查看项目
                </div>
                <div>

                </div>
                <!-- <div class="chat" @click="contactKf">
                  在线留言
                </div> -->
              </div>
              <!-- <div slot="header"
                   class="box-top">
                <span class="top-title">{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }}</span>
                <span class="top-time">{{ item.createTime }}</span>
              </div>
              <div class="box-bottom">
                <div class="bottom-img">
                  <img v-real-img="item.logo"
                       :src="`${imgUrl}/project.jpg`"
                       :alt="item.logo">
                  <div class="bottom-desc">
                    <h3>{{ item.title }}</h3>
                    <p>项目状态：已发布</p>
                    <p>合作方式：{{ item.cooperation | formatCooperation }}</p>
                  </div>
                </div>
                <div class="bottom-price">
                  <span v-if="item.faceFlag == '1'|| item.proIntentionPrice == 0"
                        class="bold-price">面议</span>
                  <span v-else
                        class="bold-price">¥{{ item.proIntentionPrice }}万</span>
                </div>
              </div>
              <div class="bot-desc">{{ item.description }}</div> -->
            </el-card>

            <!-- <div class="card-bot">
              <span class="foot-title">行业分类：{{ item.industryone | formatIndustryOne }}</span>
              <el-button class="foot-btn"
                         @click="godetail(item)">查看详情</el-button>
            </div> -->
          </div>
        </el-col>
        <Empty v-show="!listData.length" />

      </el-row>
      <el-row type="flex"
              justify="center"
              class="search-footer">
        <el-pagination background="true"
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
import { getProjectList } from '@/api/projecthall'

export default {
  name: 'Projecthall',
  mixins: [common],
  data () {
    return {
      searchData: {
        title: '',
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: ''
      },
      listData: [],
      isShowFir: false,
      isShowSec: false,
    }
  },
  computed: {
    cityList () {
      return city
    }
  },
  watch:{

  },
  beforeDestroy () {
  },
  created() {
  },
  methods: {
    loadData () {
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      console.log(formpage)
      this.loading=true
      this.searchData.title=this.$route.query.keyword??this.searchData.title
      getProjectList({ ...formpage,...this.searchData }).then(res => {
        if(res.code=='0000') {
          this.listData=res.rows
          this.$set(this.pager,'total',res.total)
        } else {
          this.$message.error(res.msg)
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
    godetail ({ id,industryone }) {
      this.goBlank({
        path: '/projecthall/detail',
        query: {
          id,industryone
        }
      })
    },
    gopost () {
      this.goBlank({
        path: '/projecthall/post'
      })
    }

  }
}
</script>

<style scoped lang="scss">
.search-area {
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 424px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../../assets/img/bgHeader.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
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
  background: #f9fafe;
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
.card-cont {
  margin: 0 10px 10px 0;
}
.card-cont:hover {
  // margin: 0 10px 10px 0;
  box-shadow: 0px 0px 20px 0px #ebeefa;
}
.search-content {
  padding: 20px calc((100% - 1245px) / 2) 0;
  background-color: #ffffff;
  .search-query {
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .select-title {
    width: 120px;
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
  }

  .select-scope {
    transition: height 0.3s;
    width: calc(100% - 120px);
    display: inline-block;
    height: 35px;
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
  padding: 45px calc((100% - 1245px)/2) 0px;
  background-color: #ffffff;
  background: #FDFCFF;
  ::v-deep .el-col-12 {
    padding:  10px;
  }
  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
  }
  .box-card {
    cursor: pointer;
    box-shadow: none;
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
        padding-top: 5px;
        .bold-price {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #1e86f9;
        }
      }
    }

    .title_cw {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 800;
      color: #000;
      margin: 14px 0 13px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /*超出几行后省略号*/
      overflow: hidden;
      height:20px
    }
    .description_cw {
      line-height: 25px;
      height: 50px;
      font-size: 14px;
      font-weight: 500;
      color: #555;
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
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #666;
      flex-direction: column;
      span:nth-child(2) {
        margin: 20px 0;
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
  margin: 20px 0;
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
