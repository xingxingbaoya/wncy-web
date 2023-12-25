<template>
  <el-main class="main_content">
    <el-row class="detail-content_cw">
      <el-col :span="24">
        <el-card shadow="never" class="play-content"
                 :body-style="{ }">
          <div class="content_new">
            <el-col :span="9"
                    class="article-left">
              <!-- <img v-real-img="item.logo"
                   :src="`${imgUrl}/project.jpg`"> -->
                   <!-- <img src="@/assets/img/nomrel.pic.jpg" alt=""> -->
                   <img src="@/assets/img/xiangmuxiangqing.jpg" alt="">
            </el-col>
            <el-col :span="13"
                    class="play-right">
              <div class="play-desc">
                <div class="play-title pb30">{{ item.title }}</div>
                <!-- <p class="play-status pb30">
            <span class="">行业分类: </span><span class="mr20">{{ item.industryone | formatIndustryOne }}</span>
            <span class="">意向价格: </span><span class="ps-color">{{ item.faceFlag == '1'? '面议': item.proIntentionPrice+"万元" }}</span>
          </p>
          <p class="play-status">
            <span class="">专利情况: </span><span class="mr20">{{ item.proPatentInfo == '0'? "无":"有" }}</span>
            <span class="">项目状态: </span><span>【已发布】</span>
          </p> -->
                <p class="play-status pb30">
                  <span class="">行业分类: </span><span class="mr20">{{ item.industryone | formatIndustryOne }}</span>
                </p>
                <p class="play-status pb30">
                  <span class="">专利情况: </span><span class="mr20">{{ item.proPatentInfo == '0'? "无": item.proPatentNo }}</span>
                </p>
                <p class="play-status pb30">
                  <span class="">发布时间: </span><span class="mr20">{{ item.createTime  }}</span>
                </p>
              </div>

            </el-col>

            <el-col>
              <div class="play-content_CW">
                意向价格:<span class="ps-color">{{ item.faceFlag == '1'? '面议': item.proIntentionPrice+"万元" }}</span>
              </div>
            </el-col>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="heng">
    </div>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card shadow="never" class="box-card-left_w">
          <div slot="header">
            <span class="box-title">单位信息</span>
          </div>
          <div class="text-content">
            <el-row>
              <el-col class="text-right_cw">
                <div class="name">
                  {{item.company}}
                  <div class="person">
                    联系人：{{item.linkman}}
                  </div>
                </div>
                <div>

                </div>
                <!-- <div class="onlineChat"
                     @click="contactKf">
                  在线留言
                </div> -->
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="heng">
    </div>
    <el-row class="detail-content_cw">
      <el-col :span="24"
              class="detail-content">
        <el-card shadow="never" class="box-card-left"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">项目介绍</span>
          </div>
          <div class="text-content">
            <el-row>
              <el-col :span="4"
                      class="text-left">
                项目名称：
              </el-col>
              <el-tooltip effect="dark"
                          :content="item.title"
                          placement="top">
                <el-col :span="17"
                        class="text-right">
                  {{ item.title }}
                </el-col>
              </el-tooltip>
              <el-col :span="4"
                      class="text-left">
                行业分类：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.industryone | formatIndustryOne }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                技术来源：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proNature | formatNature }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                来源地：
              </el-col>
              <el-col v-if="item.isNotNational == '1'"
                      :span="17"
                      class="text-right">
                {{ item.province | MapName(item.city,item.county)  }}  {{item.areaName}}
              </el-col>
              <el-col v-else
                      :span="17"
                      class="text-right">
                {{ item.source | formatEmpty }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                项目国别：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.isNotNational == '1'? '国内':'国际' }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                意向价格：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.faceFlag == '1'|| item.proIntentionPrice == 0?"面议":item.proIntentionPrice + "万元" }}
              </el-col>

              <el-col :span="4"
                      class="text-left">
                合作方式：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.cooperation | formatCooperation }}
              </el-col>

              <el-col :span="4"
                      class="text-left">
                专利情况：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proPatentInfo == '0'? "无":"有" }}
              </el-col>

              <el-col :span="4"
                      class="text-left">
                项目开发阶段：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proDevelopment | formatDevelopment }}
              </el-col>

              <el-col :span="4"
                      class="text-left">
                项目权属方：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proName | formatEmpty }}
              </el-col>

            </el-row>
            <el-row v-show="item.proPatentInfo == '1'">
              <el-col :span="4"
                      class="text-left">
                专利类别：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proPatentCategory | formatCategory }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                专利授权日：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proGrantTime | formatEmpty }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                专利人：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.patentOwner | formatEmpty }}
              </el-col>
              <el-col :span="4"
                      class="text-left">
                专利号：
              </el-col>
              <el-col :span="17"
                      class="text-right">
                {{ item.proPatentNo | formatEmpty }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24"
              class="detail-content">
        <el-card shadow="never" class="box-card-left"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">项目内容</span>
          </div>
          <div class="text-content"
               v-html="item.proIntroduct" />
        </el-card>
      </el-col>
      <!--      <el-col :span="24">-->
      <!--        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }" >-->
      <!--          <div slot="header">-->
      <!--            <span class="box-title">商业计划前景</span>-->
      <!--          </div>-->
      <!--          <div class="text-content">-->
      <!--            <p>{{ item.proBusinessPlan }}</p>-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->

      <!--      <el-col :span="24">-->
      <!--        <el-card class="box-card-sec" :body-style="{ padding: '0 20px' }" >-->
      <!--          <div slot="header" >-->
      <!--            <span class="box-title">联系人信息</span>-->
      <!--          </div>-->
      <!--          <div class="text-content">-->
      <!--            <p>-->
      <!--              <span class="mr10">联系人：李先生</span><span>电话：17600000041</span>-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>
    <div class="heng">
    </div>

    <el-row class="detail-content_cw">
      <el-col :span="24">
        <el-card shadow="never" class="box-card-sec"
                 :body-style="{ padding: '0' }">
          <div slot="header">
            <span class="box-title">相关项目</span>
            <!-- <el-button class="more" type="text" @click="gomore">查看更多<i class="el-icon-arrow-right" /></el-button> -->
          </div>
          <el-row class="search-list">
            <el-col v-for="item in listData"
                    :span="8">
              <div class="card-cont">
                <el-card  class="box-card_cw"
                         :body-style="{ padding: '15px 30px'}">
                  <div class="items_top">
                    <!-- <img v-real-img="item.logo"
                         :src="`${imgUrl}/project.jpg`"></img> -->
                       <!-- <img src="@/assets/img/nomrel.pic.jpg" alt=""> -->
                       <img src="@/assets/img/xiangmuxiangqing.jpg" alt="">
                    <span v-if="item.faceFlag == '1'"
                          class="bold-price">面议</span>
                    <span v-else
                          class="bold-price">¥{{ item.proIntentionPrice }}万</span>
                  </div>
                  <div class="title">
                    {{ item.title }}
                  </div>
                  <div class="decrible">
                    {{ item.proIntroduct }}
                  </div>
                  <div class="time">
                    发布时间：{{ item.createTime.substring(0,10) }}
                  </div>
                  <div class="from">
                    来源地：{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }}
                  </div>
                  <div class="btns">
                    <div @click="godetail(item)">
                      查看项目
                    </div>
                    <div>

                    </div>
                    <!-- <div @click="contactKf">
                      在线留言
                    </div> -->
                    <div>

                    </div>
                  </div>
                  <!-- <div slot="header" class="box-top">
                    <span class="top-title">{{ item.provinceName }} {{ item.cityName }} {{ item.areaName }}</span>
                    <span class="top-time">{{ item.createTime }} 发布</span>
                  </div>
                  <div class="box-bottom">
                    <div class="bottom-img">
                      <img v-real-img="item.logo" :src="`${imgUrl}/project.jpg`">
                      <div class="bottom-desc">
                        <h3>{{ item.title }}</h3>
                        <p>项目状态：已发布</p>
                        <p>合作方式：{{ item.cooperation | formatCooperation }}</p>
                      </div>
                    </div>
                    <div class="bottom-price">
                      <span v-if="item.faceFlag == '1'" class="bold-price">面议</span>
                      <span v-else class="bold-price">¥{{ item.proIntentionPrice }}万</span>
                    </div>
                  </div>
                  <div class="bot-desc">{{ item.description }}</div> -->
                </el-card>
                <!-- <div class="card-bot">
                  <span class="foot-title">行业分类：{{ item.industryone | formatIndustryOne }}</span> <el-button class="foot-btn" @click="godetail(item)">查看详情</el-button>
                </div> -->
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getProjectDetail,getProjectList } from '@/api/projecthall'

export default {
  name: 'Projecthalldetail',
  mixins: [common],
  data () {
    return {
      item: {},
      listData: []
    }
  },
  methods: {
    loadData () {
      const { id,industryone }=this.$route.query
      const { pageNum }=this.pager
      const formpage={ pageNum,pageSize: 3 }
      this.pager.pageSize=formpage.pageSize
      this.loading=true
      getProjectDetail({ id }).then(res => {
        if(res.code=='0000') {
          this.item=res.obj
          console.log(this.item,'item')
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })

      getProjectList({ ...formpage,industryone }).then(res => {
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
    gomore () {
      this.goBlank({
        path: '/projecthall/'
      })
    },
    godetail ({ id,industryOne }) {
      this.goBlank({
        path: '/projecthall/detail',
        query: {
          id,industryOne
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.heng {
  width: 100%;
  height: 13px;
  background: #f5f7fb;
}
.detail-content_cw {
  background: #fff;
  padding: 0 calc((100% - 1245px) / 2) 38px;
}
.content_new {
  background: #fff;
  padding: 100px calc((100% - 1245px) / 2) 38px;
}
.card-cont {
  margin-right: 10px;
}
.box-card-left_w {
  // min-height: 180px;
}
.box-card_cw {
  .items_top {
    display: flex;
    justify-content: space-between;
    img {
      width: 160px;
      height: 102px;
    }
    span {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #1e86f9;
    }
  }

  .title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin: 14px 0;
    overflow: hidden; //超出文本隐藏
    white-space: nowrap; //不换行，只显示一行
    text-overflow: ellipsis; //超出部分省略号显示
  }
  .decrible {
    font-family: PingFang SC;
    height: 48px;
    font-weight: 300;
    color: #999999;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .time {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
    margin: 24px 0 10px;
  }
  .from {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
  }
  .btns {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    div:nth-child(1) {
      cursor: pointer;
      width: 129px;
      height: 36px;
      background: #1e86f9;
      border: 1px solid #1e86f9;
      border-radius: 3px;
      line-height: 36px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
      text-align: center;
    }
    div:nth-child(2) {
      cursor: pointer;
      width: 129px;
      height: 36px;
      // background: #f6f6f6;
      border-radius: 3px;
      line-height: 36px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #999999;
      text-align: center;
    }
  }
}
.text-right_cw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    .person {
      margin-left: 149px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #666666;
    }
  }
  .onlineChat {
    width: 224px;
    height: 47px;
    background: linear-gradient(90deg, #1875f2 0%, #37b9fa 100%);
    border-radius: 2px;
    text-align: center;
    line-height: 47px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #ffffff;
  }
}
.main_content {
}
.play-content_CW {
  background: url("../../assets/img/ct5.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
  height: 105px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #999999;
  padding: 0 26px 0 37px;
  span {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
  }
}
.play-content {
  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .article-left {
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: center;
    img {
      width: 80%;
      height: 328px;
    }
  }
  .play-right {
    // padding-left: 15px;
  }

  ::v-deep .el-card__body {
    display: flex;
    // align-items: center;
    flex-direction: column;
  }

  .play-title {
    //height: 22px;
    font-size: 22px;
    font-weight: 500;
    width: 900px;
    color: #333333;
    line-height: 1.7;
  }

  .play-status {
    height: 17px;
    font-size: 18px;
    font-weight: 400;
    color: #999999;

    .mr20 {
      display: inline-block;
      width: 500px;
    }

    .ps-color {
      color: #516fd2;
    }
  }

  .pb30 {
    margin-top: 0;
    margin-bottom: 36px;
  }
}
.box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #1e86f9;
    line-height: 25px;
    &:after {
      content: "";
      height: 3px;
      width: 100%;
      background: #516fd2;
      margin-top: 15px;
      display: block;
    }
  }
.detail-content {
  padding: 0 calc((100% - 1245px) / 2) 0;
  background: #fff;
  .box-card-left {
  }
  .box-card-sec {
    cursor: pointer;
  }


  .more {
    color: #516fd2;
    font-size: 18px;
    float: right;
    padding: 3px 0;
    i {
      font-weight: 600;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #eeeeee;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
    line-height: 1.7;
    div {
      // margin-bottom: 7px;
    }
    .text-left {
      background: #f8f8f8;
      padding: 20px 34px;
    }

    .text-right {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 20px 34px;
      // border: 1px solid #EEEEEE;
    }
    .h-left {
      height: 110px;
    }
    .height-auto {
      height: 110px;
      line-height: 1.7;
    }
  }

  .search-list {
    ::v-deep .el-col-12 {
      padding: 10px;
    }
    padding: 22px 14px;
    background-color: #ffffff;
    ::v-deep .el-card__header {
      border-bottom: 1px solid #ebeef5;
    }

    .box-top {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      .top-title {
        font-size: 16px;
        font-weight: 400;
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
      // min-height: 50px;
      line-height: 1.7;
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
}

.mr10 {
  margin-right: 150px;
}
</style>
