<template>
  <el-main v-loading="loading"
           class="main_content">
    <!-- <el-card class="play-content" :body-style="{  }">
      <el-col :span="4" class="article-left">
        <img v-real-img="item.cover" :src="`${imgUrl}/demand.jpg`">
      </el-col>
      <el-col :span="16" class="play-right">
        <div class="play-box">
          <div class="play-title">{{ item.name }}</div>
          <p class="play-status">
            <span class="p-ft">类型: </span><span class="mr20">{{ item.industryOne | formatIndustryOne }}</span>
            <span class="p-ft">意向金额: </span><span>{{ item.faceFlag == 1 ? "面议":item.capital + "万元" }}</span>
          </p>
          <p class="play-status">
            <span class="p-ft">地区: </span><span class="mr20">{{ item.province | MapName(item.city,item.county) }}</span>
            <span class="p-ft">时间: </span><span>{{ item.createTime | formatDate }}</span>
          </p>
        </div>
      </el-col>
      <el-col v-show="item.resolveStatus == 0" :span="4" class="resolve-box">
        <el-button type="plain" class="resolve-btn">需求待解决</el-button>
      </el-col>
    </el-card> -->
    <el-card class="play-content"
              shadow="never"
             :body-style="{ }">
      <div>
        <el-col :span="7"
                class="article-left">
          <img
               src="@/assets/img/xuqiuzhanwei.jpg">

        </el-col>
        <el-col :span="16"
                class="play-right">
          <div class="play-desc">
            <div class="play-title pb30">{{ item.name }}</div>
            <p class="play-status pb30">
              <span class="">类型: </span><span class="mr20">{{ item.industryOne | formatIndustryOne }}</span>
            </p>
            <p class="play-status pb30">
              <span class="">地区: </span><span class="mr20">{{ item.province | MapName(item.city,item.county) }}</span>
            </p>
            <p class="play-status pb30">
              <span class="">时间: </span><span class="mr20">{{ item.createTime | formatDate }}</span>
            </p>
          </div>

        </el-col>
      </div>

      <el-col>
        <div class="play-content_CW">
          意向价格:<span class="ps-color">{{ item.faceFlag == 1 ? "面议":item.capital + "万元" }}</span>
          <span class="jiejue"
                v-show="item.resolveStatus == 0">需求待解决</span>
        </div>
      </el-col>
    </el-card>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left_w"
                 shadow="never">
          <div slot="header">
            <span class="box-title">单位信息</span>
          </div>
          <div class="text-content">
            <el-row>
              <el-col class="text-right_cw">
                <div class="name">
                  {{item.unit}}
                  <div class="person">
                    联系人：{{item.contactName}}
                  </div>
                </div>
                <div>

                </div>
                <!-- <div class="onlineChat" @click="contactKf">
                  在线留言
                </div> -->
              </el-col>
            </el-row>

          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left"
                 :body-style="{ padding: '0 20px' }"
                 shadow="never">
          <div slot="header">
            <span class="box-title">需求描述</span>
          </div>
          <div class="text-content"
               v-html="item.briefDesc" />
        </el-card>
      </el-col>
      <!--      <el-col :span="24">-->
      <!--        <el-card class="box-card-sec" :body-style="{ padding: '0 20px' }" shadow="never">-->
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

    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-sec"
                  shadow="hover"
                 :body-style="{ padding: '0' }"
                 >
          <div slot="header">
            <span class="box-title">相关需求</span>
            <!-- <el-button class="more"
                       type="text"
                       @click="gomore">查看更多<i class="el-icon-arrow-right" /></el-button> -->
          </div>
          <el-row class="search-list">
            <div v-for="item in listData"
                 :key="item.id"
                 class="list-box_cw"
                 @click="godetail(item)">
              <div class="item_left">
                <!-- <img v-real-img="item.cover"
                     :src="`${imgUrl}/demand.jpg`"> -->
                    <img class="img_cw"
                 src="@/assets/img/xuqiuzhanwei.jpg">

              </div>
              <div class="item_middle">
                <div class="middle_top">
                  <div class="list-title">{{ item.faceFlag == 1 ? "面议":item.capital + "万元" }}</div>
                  <div class="list-ftitle">{{ item.name }}</div>
                </div>
                <div class="midle_midle">
                  {{item.briefDescText}}
                </div>
                <div class="middle_bot">
                  <div class="bot_left">
                    需求状态 <div>
                      {{ item.resolveStatus == "0"?"待解决":"已解决" }}
                    </div>
                  </div>
                  <div class="bot_mid">
                    发布时间：{{ item.createTime | formatDate }}
                  </div>
                  <div class="bot_right">
                    来源地：{{ item.province | MapName(item.city,item.county) }}
                  </div>
                </div>
              </div>
              <div class="item_right">
                <div  @click="godetail(item)">
                  查看需求
                </div>
                <div>

                </div>
                <!-- <div @click="contactKf">
                  在线留言
                </div> -->
              </div>
              <!-- <div class="list-left">
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
                         @click="godetail(item)">查看</el-button> -->
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getDemandDetail,getDemandList } from '@/api/demandhall'

export default {
  name: 'Demandhalldetail',
  mixins: [common],
  data () {
    return {
      item: {},
      listData: []
    }
  },
  methods: {
    loadData () {
      const { id,industryOne }=this.$route.query
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      this.loading=true
      getDemandDetail({ id }).then(res => {
        if(res.code=='0000') {
          this.item=res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })

      getDemandList({ ...formpage,industryOne }).then(res => {
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
        path: '/demandhall/'
      })
    },
    godetail ({ id,industryOne }) {
      this.goBlank({
        path: '/demandhall/detail',
        query: {
          id,
          industryOne
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
 .list-box_cw:last-child{
     border-bottom: 0px solid #F6F6F6;
  }
  .list-box_cw:hover{
    box-shadow: 0px 0px 20px 0px #EBEEFA;
  }
.list-box_cw {
  cursor: pointer;
  margin: 20px 0;
  display: flex;
  align-items: center;
  padding: 16px 13px;
  // border-bottom: 10px solid #F6F6F6;
  .item_left {
    margin-right: 18px;
    img {
      width: 215px;
      height: 154px;
    }
  }


  .item_middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 154px;
    padding: 10px 0;
    .middle_top {
      display: flex;
      div:nth-child(1) {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #1e86f9;
        margin-right: 10px;
      }
      div:nth-child(2) {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
    .midle_midle {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #999999;
      width: 95%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /*第几行出现省略号*/
      -webkit-box-orient: vertical;
    }
    .middle_bot {
      display: flex;
      .bot_left {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #999999;
        div {
          display: inline-block;
          color: red;
        }
      }
      .bot_mid {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        margin: 0 94px 0 74px;
      }
      .bot_right {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
      }
    }
  }
  .item_right {
      height: 154px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    div:nth-child(1) {
      cursor: pointer;
      width: 129px;
      height: 36px;
      background: #1e86f9;
      border-radius: 3px;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #ffffff;
    }
    div:nth-shild(2) {
      cursor: pointer;
      width: 129px;
      height: 36px;
      background: #f6f6f6;
      border-radius: 3px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #999999;
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
.box-card-left_w {
  min-height: 180px;
  padding: 0 calc((100% - 1245px)/2);
  background: #fff;
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
  }
  .decrible {
    font-family: PingFang SC;
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
    div:nth-child(1) {
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
      width: 129px;
      height: 36px;
      background: #f6f6f6;
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
  margin-top: 30px;
  padding: 0 26px 0 37px;
  .jiejue {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
    margin-left: 22px;
  }
  span {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
  }
}
.main_content {
  background: #FDFCFF;
}
.play-content {
  padding: 120px calc((100% - 1245px)/2) 66px ;
  background: #fff;
  margin-bottom: 13px;

  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .article-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
    }
  }
  .play-right {
    padding-left: 75px;
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
    margin-bottom: 54px;
  }
}

.detail-content {
  padding: 0px calc((100% - 1245px)/2) ;
  background: #fff;
  margin-bottom: 13px;
  .box-card-left {
    min-height: 250px;
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
    line-height: 1.5;
  }

  .search-list {
    .list-box {
      cursor: pointer;
      transition: 0.3s;
      height: 150px;
      display: flex;
      padding: 39px 25px;
      margin-bottom: 3px;
      justify-content: flex-start;
      align-items: center;
      border-radius: 4px;
      background: #ffffff;
      &:hover {
        box-shadow: 0 0 8px 0 rgba(12, 3, 6, 0.25);
      }
      .list-left {
        display: inline-block;
        img {
          width: 87px;
          height: 87px;
        }
      }
      .list-title {
        font-size: 20px;
        font-weight: 500;
        color: #516fd2;
        padding-right: 15px;
      }
      .list-ftitle {
        display: inline-block;
        width: 680px;
        font-weight: 500;
        text-overflow: ellipsis;
        white-space: nowrap;
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
            width: 680px;
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
      background: #516fd2;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 18px;
      width: 114px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}

.mr10 {
  margin-right: 150px;
}
</style>
