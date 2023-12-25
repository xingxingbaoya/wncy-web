<template>
  <el-main v-loading="loading"
           class="bgbg">
    <el-row class="search-area">
      <span class="search-left_cw">服务大厅</span>
      <span class="search-left_detail_cw">聚焦共性技术服务、综合科技服务、数智信息服务、创新园区服务，以科技服务助推创新产业发展</span>
      <el-input v-model="searchData.serviceName"
                placeholder="输入咨询关键词，进行搜索"
                class="input-search">
        <el-button slot="append"
                   @click="jumpDetail(0)">
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
      <div class="header_cw">
        <div class="header_right">
          <div :class="[ isShowIndex !== index ? 'header_right_cw' +index :  'header_right_no_cw' +index]"
               v-for="(item,index) in listHeader"
               @mouseenter="mouseEnter(index)"
               @mouseleave="mouseLeave(index)"
               @click="jumpDetail(index)"
               :key="index">

            <div class="nohover_cw"
                 v-if="isShowIndex !== index">
              <div class="title">
                {{item.title}}
              </div>
              <div class="hang">

              </div>
              <div class="decrible_cw">
                {{item.decrible}}
              </div>
            </div>

            <div class="hover_cw"
                 v-if="isShowIndex == index">
              <div class="hover_title">
                {{item.title}}
              </div>
              <div class="hover_decrible">
                {{item.decrible}}
              </div>
              <div class="check_detail">
                查看详情
                <i class="el-icon-right"></i>
              </div>
            </div>

          </div>
        </div>

      </div>

      <el-row v-loading="loading"
              class="search-list">
        <div class="content_title">
          热门服务
        </div>
        <el-col v-for="item in contentData"
                :key="item.id"
                :span="8">
          <div class="card-cont_cw"
               @click="godetail(item)">
            <div class="content_item">
              <div class="content_img">
                <img :src="item.picUrl"
                     alt="">
              </div>
              <div class="content_title_cw">
                <div class="title">
                  {{item.serviceName}}
                </div>
                <div class="money">
                  {{item.amount == -1 ? "面议" : item.amount }}
                </div>
              </div>
              <div class="heng">

              </div>
              <div class="detail">
                {{item.serviceIntro}}
              </div>
              <div class="zizirending ">
                {{item.serviceTag}}
              </div>
            </div>
          </div>
        </el-col>
        <Empty v-show="!contentData.length" />

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

      <!-- <el-card :body-style="{ padding: '12px' }"
               class="card-cont inner-bg">
        <el-row justify="space-between"
                type="flex">
          <el-col v-for="(item,index) in circleData"
                  :span="5"
                  class="cirle-layout">
            <el-card class="top-card"
                     :body-style="{ padding: '20px 10px 20px 0' }"
                     shadow="never"
                     @click.native="gocircle(item)">
              <div class="cirle-box">
                <div class="cirle-l">
                  <countTo class="cirle-count"
                           :start-val="0"
                           :end-val="item.num"
                           :duration="3000"
                           :separator="''" />
                </div>
                <span class="cirle-r">{{ item.name }}</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card> -->
      <!-- <el-card v-for="(item,index) in listData"
               :body-style="{ padding: '0px' }"
               class="card-cont">
        <el-row class="main-cont">
          <el-col :span="5">
            <div class="left-cont">
              <p class="title-m">
                <svg-icon :icon-class="'s' + (index+1)"
                          class-name="icon" />
              </p>
              <p class="title-t">{{ item.topicName }}</p>
              <span class="btn-b"
                    @click="gomore(item.topicDictValue)">更多</span>
            </div>
          </el-col>
          <el-col :span="19">
            <el-row class="list-card">
              <el-col v-for="it in item.serviceList"
                      :key="it.id"
                      :span="8"
                      class="card-layout">
                <el-card :body-style="{ padding: '0px' }"
                         class="inner-cont"
                         shadow="hover"
                         @click.native="godetail(it)">
                  <img v-real-img="it.picUrl"
                       class="image"
                       :src="`${imgUrl}/product.jpg`">
                  <div class="text-cont">
                    <span class="inner-title">{{ it.serviceName }}</span>
                    <p class="cont-desc">{{ it.serviceIntro }}</p>
                    <p style="margin: 0;"><span class="cont-type">{{ it.serviceTag }}</span><span class="cate-cont">{{ it.amount == '-1'?"面议":it.amount + '元起' }}</span></p>
                  </div>
                </el-card>
              </el-col>
              <Empty v-show="!item.serviceList.length" />
            </el-row>
          </el-col>
        </el-row>
      </el-card> -->
    </div>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import countTo from 'vue-count-to'
import { getCircles,getService,getServiceTypeListThree } from '@/api/servicehall'
import { getProjectList,getSearchListByTop } from '@/api/projecthall'
export default {
  name: 'Servicehall',
  components: {
    countTo
  },
  mixins: [common],
  data () {
    return {
      contentData: [],
      circleData: [],
      searchData: {
        serviceName: ""
      },
      isShowIndex: 0,
      listHeader: [{ title: "综合科技服务",decrible: "科技金融、资本对接、工商服务、财税服务、人事社保、法律服务等" },{ title: "共性技术服务",decrible: "集成电路、医疗器械、生物医药、智能制造、新材料等",},{ title: "数智信息服务",decrible: "云服务器、数据服务、评测服务、SAAS服务等" },{ title: "配套保障服务",decrible: "办公集采、健康医疗、节日福利等" }]
    }
  },
  methods: {
    jumpDetail (index) {
      this.$router.push({
        path: "/servicehall/serviceDetail",
        query: {
          index,
          serviceName: this.searchData.serviceName
        }
      })
    },
    mouseEnter (i) {
      console.log(i);
      this.isShowIndex=i
    },
    mouseLeave (i) { },
    loadData () {
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      console.log(formpage)
      this.loading=true
      this.searchData.title=this.$route.query.keyword??this.searchData.title
      getSearchListByTop({ ...formpage,...this.searchData }).then(res => {
        if(res.code=='0000') {
          this.contentData=res.rows
          this.$set(this.pager,'total',res.total)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })

      getCircles().then(res => {
        if(res.code=='0000') {
          this.circleData=res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },

    gomore (topicName) {
      this.goBlank({
        path: '/servicehall/more',
        query: {
          topicName
        }
      })
    },
    // godetail ({ id }) {
    //   this.goBlank({
    //     path: '/servicehall/detail',
    //     query: {
    //       id
    //     }
    //   })
    // },
    gocircle ({ dictValue }) {
      if(_.isEmpty(dictValue)) {
        this.goBlank({
          path: '/tradinghall/org'

        })
      } else {
        this.goBlank({
          path: '/servicehall/circle',
          query: {
            orgType: dictValue
          }
        })
      }
    },
    godetail ({ id,industryone }) {
      this.goBlank({
        path: '/servicehall/detail',
        query: {
          id,industryone
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.bgbg {
  background: #fdfdff;
}
.card-cont_cw {
  margin: 0 9px;
}
.card-cont_cw:hover {
  margin: 0 9px;
  background: #ffffff;
  box-shadow: 0px 0px 30px 0px #ebeefa;
  border-radius: 5px;
}
.content_item {
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 407px;
  cursor: pointer;
  .content_img {
    width: 100%;
    height: 246px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content_title_cw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 14px 30px 0 13px;
    .title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 800;
      color: #000;
    }
    .money {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1e86f9;
    }
  }
  .heng {
    width: 100%;
    height: 2px;
    background: #eeeeee;
    margin: 17px 0 13px;
  }
  .detail {
    padding: 0 30px 0 13px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
    margin-bottom: 18px;
    overflow: hidden; //超出文本隐藏
    text-overflow: ellipsis; ///超出部分省略号显示
    display: -webkit-box; //弹性盒模型
    -webkit-box-orient: vertical; //上下垂直
    -webkit-line-clamp: 2; //自定义行数
    height: 32px;
  }
  .zizirending {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
    height: 16px;
    padding: 0 30px 0 14px;
    overflow: hidden; //超出文本隐藏
    text-overflow: ellipsis; ///超出部分省略号显示
    display: -webkit-box; //弹性盒模型
    -webkit-box-orient: vertical; //上下垂直
    -webkit-line-clamp: 1; //自定义行数
  }
}
.content_title {
  font-size: 26px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  margin: 50px 0 23px;
}
.header_cw {
  margin-top: 44px;
  width: 100%;
  height: 455px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header_right_cw0 {
      background-image: url("../../assets/img/tcw1.png");
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 25%;
      background-size: 100% 100%;
      height: 455px;
    }
    .header_right_cw1 {
      background-image: url("../../assets/img/t1.png");
      width: 25%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 455px;
    }
    .header_right_cw2 {
      background-image: url("../../assets/img/t3.png");
      width: 25%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 455px;
    }
    .header_right_cw3 {
      background-image: url("../../assets/img/t2.png");
      width: 25%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 455px;
    }
    .header_right_no_cw0 {
      background-image: url("../../assets/img/tc62.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 455px;
      width: 633px;
    }
    .header_right_no_cw1 {
      background-image: url("../../assets/img/tc67.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 455px;
      width: 633px;
    }
    .header_right_no_cw2 {
      background-image: url("../../assets/img/tc68.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 455px;
      width: 633px;
    }
    .header_right_no_cw3 {
      background-image: url("../../assets/img/tc69.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 455px;
      width: 633px;
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
      align-items: center;
      flex-direction: column;
    }
    .hover_cw {
      margin-left: 35px;
    }

    .title {
      margin-top: 61px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
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
      color: #666666;
      text-align: center;
      padding: 0 26px;
    }
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
.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  background: #fdfdff;
}
.search-area {
  background-color: #fdfdff;
  // padding: 26px 34px;
  height: 424px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
  background: url("../../assets/img/xqdtbanner.png") no-repeat center 0px;
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
.top-card {
  background-color: transparent;
}
.inner-bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 270px;
  background-image: url($backgroundImgURL+"/s7.png");
  background-size: cover;
  background-repeat: no-repeat;
  ::v-deep .el-card__body {
    width: 100%;
  }
}
.card-cont {
  margin-bottom: 30px;

  .cirle-box {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .cirle-l {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      background-image: url($backgroundImgURL+"/s6.png");
      background-size: cover;
      background-repeat: no-repeat;
      width: 227px;
      height: 112px;

      font-size: 33px;
      font-weight: bold;
      color: #516fd2;
      line-height: 25px;
      margin-bottom: 20px;
      padding-bottom: 12px;
    }

    .cirle-r {
      font-size: 20px;
      font-weight: 600;
      color: #516fd2;
      line-height: 25px;
    }
  }
}

.main-cont {
  .left-cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url($backgroundImgURL+"/service-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    height: 345px;
    padding: 0 25px 25px;
    .title-t {
      cursor: pointer;
      font-size: 22px;
      font-weight: 600;
      margin-top: 0;
      color: #333333;
      text-align: center;
      &:hover {
        color: #516fd2;
      }
    }

    .title-m {
      font-size: 16px;
      font-weight: 400;
      color: #516fd2;
      .icon {
        height: 40px;
        width: 40px;
      }
    }

    .btn-b {
      display: inline-block;
      cursor: pointer;
      height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
    }
  }

  .list-card {
    padding: 0 10px;
  }

  .card-layout {
    padding: 12px 5px;
  }

  .cont-type {
    display: inline-block;
    cursor: pointer;
    background: #f2f7ff;
    border: 1px solid #516fd2;
    border-radius: 3px;
    text-align: center;
    line-height: 24px;
    font-size: 18px;
    font-weight: 400;
    color: #516fd2;
    padding: 5px;
    margin-right: 30px;
    overflow: hidden;
    width: 120px;
    vertical-align: middle;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cont-desc {
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .inner-cont {
    cursor: pointer;
    position: relative;
    .inner-img {
      align-items: center;
    }

    .text-cont {
      padding: 12px;
      .cate-cont {
        vertical-align: middle;
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        color: #516fd2;
        margin: 0;
      }
    }
    .inner-title {
      display: inline-block;
      width: 100%;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 20px;
      color: #333333;
    }
    .inner-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 16px;
      font-weight: 400;
      color: #999999;
    }

    .inner-opera {
      width: 132px;
      height: 42px;
      color: #ffffff;
      background: #516fd2;
      border-radius: 4px;
    }
    .image {
      height: 180px;
      width: 100%;
      object-fit: cover;
    }
  }

  ::v-deep .image {
    height: 265px;
  }
}
.search-footer {
  margin-top: 37px;

  .el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
