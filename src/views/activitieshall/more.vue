<template>
  <el-main>
    <el-row class="search-area">
      <div class="header_cw">
        <div class="header_right">
          <div :class="[ currrentIndex !== index ? 'header_right_cw' :  'header_right_no_cw']"
               v-for="(item,index) in listHeader"
               @mouseenter="mouseEnter(index)"
               @mouseleave="mouseLeave(index)"
               @click="toggle(index)"
               :key="index">

            <div class="nohover_cw">
              <div class="title">
                <!-- <img :src="item.src" alt=""> -->
                {{item.title}}
              </div>
              <!-- <div class="hang">

                </div> -->
              <!-- <div class="decrible_cw">
                  {{item.decrible}}
                </div> -->
            </div>

            <!-- <div class="hover_cw"
                   v-if="isShowIndex == index">
                <div class="hover_title">
                  {{item.title}}
                </div>
                <div class="hover_decrible">
                  {{item.decrible}}
                </div>
              </div> -->

          </div>
        </div>

      </div>
    </el-row>
    <lthd v-if="currrentIndex == 0 "></lthd>
    <cgfb v-if="currrentIndex == 1"></cgfb>
    <xmly v-if="currrentIndex == 2"></xmly>
    <xwdt v-if="currrentIndex == 3"></xwdt>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import lthd from './lthd'
import cgfb from './cgfb'
import xmly from './xmly'
import xwdt from './xwdt'
import city from '@/assets/city/city_code.json'
import { getProjectList } from '@/api/projecthall'

export default {
  components: { lthd,cgfb,xmly,xwdt },
  name: 'Projecthall',
  mixins: [common],
  data () {
    return {
      isShowIndex: this.$route.query.actClassification,
      searchData: {
        title: '',
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: '',
      },
      currrentIndex:"",
      listData: [],
      isShowFir: false,
      isShowSec: false,
      listHeader: [{ title: "论坛活动",src: require("../../assets/img/tc163.png") },
      { title: "成果发布",src: require("../../assets/img/tc264.png") },
      { title: "项目路演",src: require("../../assets/img/tc366.png") },
      // { title: "新闻动态",src: require("../../assets/img/tc366.png") },
      ]
    }
  },
  created () {
    if(this.isShowIndex=="ssb") {
        this.currrentIndex = 0
      } else if(this.isShowIndex=="release") {
        this.currrentIndex = 1
      }
      else if(this.isShowIndex=="launch") {
        this.release=="launch"
        this.currrentIndex = 2
      }else{
        this.currrentIndex = 3
      }
  },
  computed: {
    cityList () {
      return city
    }
  },
  methods: {
    toggle (index) {
        this.currrentIndex = index
    },
    mouseEnter (i) {
      console.log(i);
      // this.isShowIndex=i
    },
    mouseLeave (i) { },
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
.header_cw {
  padding: 0 calc((100% - 1245px) / 2) 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .header_right {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    width: 100%;
    .header_right_cw {
      cursor: pointer;
      // background-image: url("../../assets/img/t2.png");
      width: 33%;
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      height: 80px;
      display: flex;
      // align-items: center;
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .header_right_no_cw {
      // background-image: url("../../assets/img/tc62.png");
      // background-repeat: no-repeat;
      cursor: pointer;
      height: 80px;
      background-size: 100% 100%;
      width: 33%;
      // background: #1e86f9;
      background:rgba($color: #1e86f9, $alpha: 0.3);
      // opacity: 0.3;
      display: flex;
      justify-content: center;
      align-items: center;
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
.search-area {
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 202px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
  background: url("../../assets/img/hddtbg.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
  // padding: 0 -220px -38px;
  // padding: 0 calc((100% - 1245px)/2) 38px
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

// .search-left {
//   font-size: 30px;
//   font-weight: 600;
//   color: #516fd2;
// }
// .search-left_cw {
//   font-size: 32px;
//   font-family: PingFang SC;
//   font-weight: 400;
//   color: #ffffff;
//   margin-top: 164px;
// }
// .search-left_detail_cw {
//   margin-top: 26px;
//   font-size: 18px;
//   font-family: PingFang SC;
//   font-weight: 300;
//   color: #ffffff;
// }

// .search-right {
//   width: 180px;
//   /*height: 56px;*/
//   background: #516fd2;
//   border-radius: 4px;
//   font-size: 18px;
//   padding: 16px 20px;
//   .icon {
//     width: 20px;
//     height: 20px;
//     vertical-align: -5px;
//     margin-right: 8px;
//   }
// }
.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
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
    font-size: 18px;
    font-weight: 400;
    width: 120px;
    display: inline-block;
    vertical-align: top;
    margin-top: 16px;
    color: #999999;
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
      padding: 14px 0px 17px 14px;
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
