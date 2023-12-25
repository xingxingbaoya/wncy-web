
 <template>
  <div class="content">
    <el-row class="search-area">
      <el-input v-model="searchData.serviceName"
                placeholder="请输入关键字进行搜索"
                class="input-search">
        <el-button slot="append"
                   @click="()=>{this.pager.pageNum = 1;this.loadData()}">搜索</el-button>
      </el-input>
    </el-row>
    <!-- <el-row class="header_cont">
      <div class="header_box">
        <div class="header_box_left">
          <div v-for="(item,index) in dataTab"
               :key=index
               :class="[checkIndex == index ? 'checkIndex' : 'noCheck']"
               @click=checkTab(index)>
            {{item.classifyName}}
          </div>
        </div>
        <div class="header_box_right">
          <div class="middle_top">
            <div class="item_m_t"
                 @click="godetail(item)"
                 v-for="(item,index) in listDataFromTab"
                 :key=index>
              <div class="time">
                <div class="cur_time">
                  {{item.serviceName}}
                </div>
              </div>
              <div class="title_wc">
                {{item.serviceIntro}}
              </div>
              <div class="tips">
                <div class="tip"
                     v-for="(o) in item.serviceTags"
                     :key=o>
                  {{o}}
                </div>
              </div>
              <div class="check_reback">
                {{item.amount == -1 ? "面议" : item.amount }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </el-row> -->

    <el-row v-loading="loading"
            class="search-list">
      <el-row class="search-content">
        <el-col :span="24">
          <span class="select-title">产品分类：</span>
          <el-radio-group v-model="searchData.serviceType2"
                          :class="{'show-more':isShowSec}"
                          class="select-scope"
                          @change="()=>{this.pager.pageNum = 1;this.loadData()}">
            <el-radio-button label="">全部</el-radio-button>
            <template v-for="item in dataType">
              <el-radio-button :label="item.serviceType2">{{ item.classifyName }}</el-radio-button>
            </template>
          </el-radio-group>
        </el-col>
        <!-- <el-col :span="3"
                v-if="dataType.length>5"
                class="more-layout">
          <span class="select-more"
                @click="showMoreSec">
            <i v-if="!isShowSec"
               class="el-icon-caret-bottom"></i>
            <i v-if="isShowSec"
               class="el-icon-caret-top"></i>
          </span> -->
        </el-col>
      </el-row>
      <el-row class="listitem">
        <el-col v-for="item in listData"
                :key="item.id"
                class="item_li">
          <div class="card-cont">
            <el-card class="box-card"
                     @click.native="godetail(item)">
              <div class="header_cw">
                <div class="header_img">
                  <!-- <img v-real-img="item.logo"
                       :src="`${imgUrl}/project.jpg`"
                       :alt="item.logo"> -->
                  <img v-real-img="item.logo"
                       :src="item.picUrl"
                       :alt="item.logo">
                       <!-- <img src="@/assets/img/nomrel.pic.jpg" alt=""> -->

                </div>

              </div>
              <div class="title_cw">
                <div class="serviceName">
                  {{item.serviceName}}
                </div>
                <div class="header-price">
                  <span class="bold-price">{{item.amount == -1 ? "面议" : item.amount + '起' }}</span>
                  <!-- <span
                        class="bold-price">¥{{ item.proIntentionPrice }}万</span> -->
                </div>
              </div>
              <div class="from_time_cw">
                <span class="top-title">{{item.serviceIntro}}</span>
                <span class="tips">
                  <span v-for="o in item.serviceTags"
                        :key=o
                        class="top-time">{{o}}</span>
                </span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
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

</template>
<script>
import common from '@/mixin/common'
import city from '@/assets/city/city_code.json'
import { getProjectList,getSearchListByTop } from '@/api/projecthall'
import { getServiceTypeListThree,getServiceTypeListTwo } from '@/api/servicehall'


export default {
  mixins: [common],
  data () {
    return {
      currentIndex: this.$route.query.index,
      checkIndex: 0,
      dataTab: ["萌芽期","发展期","成熟期"],
      searchData: {
        serviceName: this.$route.query.serviceName? this.$route.query.serviceName:"",
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: '',
        classifyId: 5,
        serviceType2: ""
      },
      searchDataTab: {
        title: '',
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: '',
        classifyId: 5,
        serviceType3: 1
      },
      dataType: [],
      listDataFromTab: [],
      listData: [],
      isShowFir: false,
      isShowSec: false,
      isShowIndex: 0,
      listHeader: [{ title: "综合科技服务",src: require("../../assets/img/tc163.png"),decrible: "科技金融、资本对接、工商服务、财税服务、人事社保、法律服务等" },{ title: "共性技术服务",src: require("../../assets/img/tc264.png"),decrible: "集成电路、医疗器械、生物医药、智能制造、新材料等",},{ title: "数智信息服务",src: require("../../assets/img/tc366.png"),decrible: "云服务器、数据服务、评测服务、SAAS服务等" },{ title: "配套保障服务",src: require("../../assets/img/tc465.png"),decrible: "办公集采、健康医疗、节日福利等" }]
    }
  },
  created () {
    // this.loadDataTop()
    this.loadDataTab()
    // this.loadDataFromTab()
    this.loadDataType()
  },
  computed: {
    cityList () {
      return city
    }
  },
  methods: {
    checkTab (index) {
      this.checkIndex=index
      this.searchDataTab.serviceType3=index+1
      this.loadDataFromTab()
    },

    mouseEnter (i) {
      console.log(i);
      this.isShowIndex=i
    },
    mouseLeave (i) { },
    // loadDataTop () {
    //   this.loading=true
    //   getSearchListByTop().then(res => {
    //     if(res.code=='0000') {
    //       this.listData=res.rows
    //       this.$set(this.pager,'total',res.total)
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }).finally(() => {
    //     this.loading=false
    //   })
    // },
    // loadDataFromTab () {
    //   const { pageNum,pageSize }=this.pager
    //   const formpage={ pageNum,pageSize }
    //   console.log(formpage)
    //   this.loading=true
    //   this.searchDataTab.title=this.$route.query.keyword??this.searchDataTab.title
    //   getSearchListByTop({ ...formpage,...this.searchDataTab }).then(res => {
    //     if(res.code=='0000') {
    //       this.listDataFromTab=res.rows
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   }).finally(() => {
    //     this.loading=false
    //   })
    // },
    loadDataTab () {
      this.loading=true
      getServiceTypeListThree().then(res => {
        if(res.code=='0000') {
          this.dataTab=res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    loadDataType () {
      this.loading=true
      getServiceTypeListTwo({ classifyId: 5 }).then(res => {
        if(res.code=='0000') {
          this.dataType=res.obj.meetingAgendaVOListAll
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    loadData () {
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      console.log(formpage)
      this.loading=true
      this.searchData.title=this.$route.query.keyword??this.searchData.title
      getSearchListByTop({ ...formpage,...this.searchData }).then(res => {
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
        path: '/servicehall/detail',
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
.inner_card {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .inner-title {
    font-size: 18px;
    display: inline-block;
    font-weight: 500;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .inner-desc {
    font-size: 16px;
    font-weight: 500;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .inner-btn {
    text-align: center;
  }
  .inner-opera {
    width: 132px;
    height: 42px;
    color: #ffffff;
    background: #516fd2;
    border-radius: 4px;
  }
  .image {
    height: 170px;
    width: 100%;
  }

  .play {
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
    margin: auto;
  }

  .el-tag--plain.el-tag--info {
    position: absolute;
    width: 64px;
    text-align: center;
    right: 11px;
    top: 7px;
    color: #ffffff;
    //opacity: 0.3;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    border: 1px solid #ffffff;
  }

  .status::before {
    content: "";
    display: inline-block;
    margin-bottom: 2px;
    width: 6px;
    height: 6px;
    background: #76eea0;
    border-radius: 50%;
  }
}
.search-area {
  background-color: #ffffff;
  padding: 26px 34px 0 0;
}

.search-content {
  margin-bottom: 25px;
  align-items: center;
    height: 55px;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
}
.input-search {
  padding-bottom: 40px;
  ::v-deep .el-input__inner {
    height: 56px;
    font-size: 18px;
    border-color: #516fd2;
    border-width: 2px;
    border-right: none;
  }

  ::v-deep .el-button {
    width: 143px;
    padding: 19px 20px;
    border-radius: 0 4px 4px 0;
    background: #516fd2;
    font-size: 18px;
    color: #ffffff;
  }
}
::v-deep .el-tabs__active-bar {
  background-color: #516fd2;
}

::v-deep .el-tabs__item {
  font-size: 22px;
  font-weight: 400;
  line-height: 25px;
  &.is-active {
    color: #516fd2;
  }
  &:hover {
    color: #516fd2;
  }
}

::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}

::v-deep .el-tabs__header {
  background-color: #ffffff;
  padding: 0 34px;
}
.search-query {
  padding-top: 17px;
  padding-left: 34px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
}
.listitem {
  display: flex;
  flex-wrap: wrap;
  ::v-deep .el-card__body {
    padding: 0;
  }
  .item_li {
    width: 32%;
    margin-bottom: 20px;
    margin-right: 10px;
  }
}
.header_cont {
  .header_box {
    display: flex;
    .header_box_left {
      width: 240px;
      background: #fff;
      flex-shrink: 0;
      margin-right: 10px;
      display: flex;
      // justify-content: center;
      // align-items: center;
      flex-direction: column;
      div {
        padding-left: 3px;
        height: 75px;
        line-height: 75px;
      }
      .checkIndex {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1e86f9;
        position: relative;
        display: block;
        padding-left: 70px;
        cursor: pointer;
      }
      .checkIndex::before {
        left: 10px;
        content: "";
        position: absolute;
        width: 54px;
        height: 2px;
        background: #1e86f9;
        top: 37px;
      }
      .noCheck::before {
        left: 10px;
        content: "";
        position: absolute;
        width: 26px;
        height: 2px;
        background: #e2e4e7;
        top: 37px;
      }
      .noCheck {
        cursor: pointer;
        position: relative;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: block;
        padding-left: 55px;
      }
    }
    .header_box_right {
      width: 100%;
      .middle_top {
        flex-wrap: wrap;
        display: flex;
        .item_m_t {
          cursor: pointer;
          width: 32%;
          // height: 122px;
          background: url("../../assets/img/tuyuan.png") no-repeat center 0px;
          background-position: center 0px;
          background-size: 100% 100%;
          padding: 31px 28px 19px;
          margin: 0 1% 1% 0;
          .time {
            display: flex;
            justify-content: space-between;

            .cur_time {
              font-size: 18px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #000000;
            }
            .status {
              font-size: 14px;
              font-family: PingFang SC;
              font-weight: 300;
              color: #ffffff;
              width: 64px;
              height: 24px;
              border: 1px solid #ffffff;
              border-radius: 12px;
              background: #000000;
              opacity: 0.3;
              text-align: center;
              line-height: 24px;
              border-radius: 12px;
              // position: relative;
              // .status_point::before {
              //   content: "";
              //   position: absolute;
              //   left: 16px;
              //   top: 45%;
              //   border: 1px solid #76eea0;
              //   background-color: #76eea0;
              //   display: inline-block; // 此句为css样式展示重点🏁
              //   width: 3px;
              //   height: 3px;
              //   border-radius: 50%;
              //   margin-right: 12px;
              // }
            }
          }
          .title_wc {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4d5567;
            margin: 13px 0 22px;
            overflow: hidden; //超出文本隐藏
            text-overflow: ellipsis; ///超出部分省略号显示
            display: -webkit-box; //弹性盒模型
            -webkit-box-orient: vertical; //上下垂直
            -webkit-line-clamp: 2; //自定义行数
          }
         ;
            .tip {
              height: 29px;
              border: 1px solid #9ea7b8;
              border-radius: 2px;
              font-size: 12px;
              font-family: PingFang SC;
              font-weight: 300;
              color: #9ea7b8;
              line-height: 29px;
              text-align: center;
              margin: 0 20px 10px 0;
              padding: 0 5px;
          }
          .noOpen {
            width: 132px;
            height: 42px;
            background: #ffffff;
            box-shadow: 0px 0px 12px 0px #e1e3f0;
            border-radius: 4px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4d5567;
            line-height: 42px;
            text-align: center;
          }

          .check_reback {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #1e86f9;
          }
        }
      }
    }
  }
}
.header_cw {
  // margin-top: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_right_cw0 {
      // background-image: url("../../assets/img/t1.png");
      // background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 25%;
      background-size: 100% 100%;
      height: 155px;
    }
    .header_right_cw1 {
      // background-image: url("../../assets/img/t1.png");
      width: 25%;
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 155px;
    }
    .header_right_cw2 {
      // background-image: url("../../assets/img/t3.png");
      width: 25%;
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 155px;
    }
    .header_right_cw {
      // background-image: url("../../assets/img/t2.png");
      width: 25%;
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      display: flex;
      // align-items: center;
      flex-direction: column;
      height: 159px;
    }
    .header_right_no_cw {
      // background-image: url("../../assets/img/tc62.png");
      // background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 159px;
      width: 25%;
      background: #1e86f9;
      opacity: 0.3;
    }
    .header_right_no_cw1 {
      // background-image: url("../../assets/img/tc67.png");
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      height: 155px;
      width: 25%;
      background: #1e86f9;
      opacity: 0.3;
    }
    .header_right_no_cw2 {
      // background-image: url("../../assets/img/tc68.png");
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      height: 155px;
      width: 25%;
      background: #1e86f9;
      opacity: 0.3;
    }
    .header_right_no_cw3 {
      // background-image: url("../../assets/img/tc69.png");
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      height: 155px;
      width: 25%;
      background: #1e86f9;
      opacity: 0.3;
    }
    .hover_title {
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #f3f5f8;
      margin-top: 64px;
    }
    .hover_decrible {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
      opacity: 0.9;
      margin: 30px 0 199px;
    }
    .check_detail {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #1e86f9;
      width: 118px;
      height: 37px;
      background: #ffffff;
      text-align: center;
      line-height: 37px;
    }
    .nohover_cw {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }
    .hover_cw {
      margin-left: 35px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      align-items: center;
    }

    .title {
      margin-top: 61px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin: 26px 0 16px 34px;
      display: flex;
      justify-content: center;
      img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
    }
    .hang {
      width: 50px;
      border-top: 4px solid #1e86f9;
      margin: 13px 0 20px;
    }
    .decrible_cw {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #fff;
      // text-align: center;
      // padding: 0 26px;
      margin-left: 34px;
    }
  }
}
.inner_card {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .inner-title {
    font-size: 18px;
    display: inline-block;
    font-weight: 500;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .inner-desc {
    font-size: 16px;
    font-weight: 500;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .inner-btn {
    text-align: center;
  }
  .inner-opera {
    width: 132px;
    height: 42px;
    color: #ffffff;
    background: #516fd2;
    border-radius: 4px;
  }
  .image {
    height: 170px;
    width: 100%;
  }

  .play {
    position: absolute;
    left: 0;
    right: 0;
    top: 65px;
    margin: auto;
  }

  .el-tag--plain.el-tag--info {
    position: absolute;
    width: 64px;
    text-align: center;
    right: 11px;
    top: 7px;
    color: #ffffff;
    //opacity: 0.3;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    border: 1px solid #ffffff;
  }

  .status::before {
    content: "";
    display: inline-block;
    margin-bottom: 2px;
    width: 6px;
    height: 6px;
    background: #76eea0;
    border-radius: 50%;
  }
}

.query-line {
  border-top: 1px solid #eeeeee;
}

.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  background: #fff;
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
    margin-top: 8px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333
  }

  .select-scope {
    transition: height 0.3s;
    width: calc(100% - 120px);
    display: inline-block;
  }

  .show-more {
    height: auto;
  }

  .more-layout {
    overflow: hidden;
  }

  .select-more {
    position: absolute;
    top: 0;
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
      font-size: 35px;
      color: #dddddd;
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
.title_cw {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-family: PingFang SC;
  font-weight: 800;
  color: #000;
  font-size: 18px;
  padding: 14px 38px 17px 14px;
  .serviceName {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
  }
}
.title_cw::after {
  content: ""; // 必须
  position: absolute;
  left: 0px;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
}
.search-list {
  ::v-deep .el-col-12 {
    padding: 10px;
  }
  // margin-top: 25px;
  // padding: 22px 14px;
  background-color: #ffffff;
  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
  }
  .box-card {
    cursor: pointer;
    .header_cw {
      .header_img {
        width: 100%;
        height: 284px;
        img {
          width: 100%;
          height: 100%;
        }
      }
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
      padding: 14px 0px 0px 14px;
      display: flex;
      flex-direction: column;
      .tips {
        margin: 12px 0 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .tips {
          height: 16px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        span {
          margin-right: 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .top-title {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        overflow: hidden; //超出文本隐藏
        white-space: nowrap; //不换行，只显示一行
        text-overflow: ellipsis; //超出部分省略号显示
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
