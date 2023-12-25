<template>
  <el-main v-loading="loading" class="content">
    <el-row class="outer-card">
      <el-card shadow="never" :body-style="{ padding: '20px 10px 10px 20px' }">
        <div slot="header" class="clearfix">
          <span class="title">人才提升</span>
          <el-button class="more" type="text" @click="gomore">查看更多<i class="el-icon-arrow-right" /></el-button>
        </div>
        <el-row>
          <el-col v-for="item in listData" :key="item.id" :span="6">
            <el-card :body-style="{ padding: '0px' }" class="inner_card" shadow="hover" @click.native="godetail(item)">
              <img v-real-img="item.coverPhoto" :src="`${imgUrl}/course.jpg`" class="image">
              <img :src="`${imgUrl}/play.png`" class="play">
              <div style="padding: 14px;">
                <span class="inner-title">{{ item.courseName }}</span>
                <p class="inner-desc">主讲老师: {{ item.lecturer }}</p>
                <div class="inner-btn clearfix">
                  <el-button type="text" class="inner-opera">查看课程</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <Empty v-show="!listData.length" />
        </el-row>
      </el-card>
    </el-row>

    <el-row class="mid-card">
      <el-card shadow="never" :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span class="title">考试报名</span>
        </div>
        <el-row class="exam-layout">
          <div class="exam-bg">
            <div class="exam-cont">
              <div class="exam-inner fir-bg">
                <svg-icon icon-class="tech1" class-name="icon" />
                <p>考试报名</p>
              </div>
              <div class="exam-inner sec-bg">
                <svg-icon icon-class="tech2" class-name="icon" />
                <p>在线考试</p>
              </div>
              <div class="exam-inner thr-bg">
                <svg-icon icon-class="tech3" class-name="icon" />
                <p>证书查询</p>
              </div>
            </div>
          </div>

        </el-row>
      </el-card>
    </el-row>

    <el-row class="bot-card">
      <el-card shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header" class="clearfix">
          <span class="title">技术经理人</span>
          <el-button class="more" type="text" @click="gomanger">查看更多<i class="el-icon-arrow-right" /></el-button>
        </div>
        <el-row>
          <el-col v-for="item in mangerData" :key="item.id" :span="8" class="bot-layout">
            <el-card :body-style="{ padding: '20px' }" class="inner_card" shadow="hover" @click.native="gomdetail(item)">
              <div class="inner-top">
                <div class="inner-img">
                  <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`">
                  <div class="inner-con">
                    <h3 class="inner-title">{{ item.nickName }}</h3>
                    <p class="inner-pos">{{ item.position }}</p>
                    <p class="inner-desc">{{ item.introduction }}</p>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <Empty v-show="!mangerData.length" />

        </el-row>
      </el-card>
    </el-row>

    <el-row class="bot-card">
      <el-card shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header" class="clearfix">
          <span class="title">合作专家</span>
          <el-button class="more" type="text" @click="goexperts">查看更多<i class="el-icon-arrow-right" /></el-button>
        </div>
        <el-row>
          <el-col v-for="item in expertsData" :key="item.id" :span="8" class="bot-layout" @click.native="goudetail(item)">
            <el-card :body-style="{ padding: '20px' }" class="inner_card" shadow="hover">
              <div class="inner-top">
                <div class="inner-img">
                  <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`">
                  <div class="inner-con">
                    <h3 class="inner-title">{{ item.nickName }}</h3>
                    <p class="inner-pos">{{ item.position }}</p>
                    <p class="inner-desc">{{ item.introduction }}</p>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <Empty v-show="!expertsData.length" />

        </el-row>
      </el-card>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getCourseList } from '@/api/talenthall'
import { getUserList } from '@/api/home'
export default {
  name: 'Talenthall',
  mixins: [common],
  data() {
    return {
      listData: [],
      mangerData: [],
      expertsData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 8 }
      this.pager.pageSize = formpage.pageSize
      getCourseList({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getUserList({ userType: 5, ...formpage, pageSize: 6 }).then(res => {
        if (res.code == '0000') {
          this.mangerData = res.rows
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getUserList({ userType: 4, ...formpage, pageSize: 6 }).then(res => {
        if (res.code == '0000') {
          this.expertsData = res.rows
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    gomore() {
      this.goBlank({
        path: '/talenthall/improve'
      })
    },
    gomanger() {
      this.goBlank({
        path: '/talenthall/manager'
      })
    },
    goexperts() {
      this.goBlank({
        path: '/talenthall/experts'
      })
    },
    godetail({ id }) {
      this.goBlank({
        path: '/talenthall/detail',
        query: {
          id
        }
      })
    },
    goudetail({ id }) {
      this.goBlank({
        path: '/talenthall/udetail',
        query: {
          id
        }
      })
    },
    gomdetail({ id }) {
      this.goBlank({
        path: '/talenthall/mdetail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content{
      margin-top: 120px;
  padding: 0 calc((100% - 1245px) / 2) 38px;
}

  ::v-deep .el-card__header{
    padding: 20px 20px 0;
  }

  .outer-card,.bot-card,.mid-card {
    margin-bottom: 25px;
    width: 100%;
    .title {
      position: relative;
      display: inline-block;
      padding-right: 10px;
      font-size: 23px;
      font-weight: 600;
      color: #333333;
      &:after {
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        display: block;
        height: 100%;
        width: 3px;
        background-color: #516FD2;
      }
    }
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

  .inner_card {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 20px;
    position: relative;
    .inner-img {
      align-items: center;
    }
    .inner-title {
      display: inline-block;
      width: 100%;
      font-size: 20px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .inner-desc {
      font-size: 16px;
      font-weight: 400;
      color: #666666;
    }
    .inner-btn {
      text-align: center;
    }
    .inner-opera {
      /*width: 132px;*/
      //height: 42px;
      color: #FFFFFF;
      background: #516FD2;
      border-radius: 4px;
      padding: 10px 20px;
    }
    .image {
      height: 165px;
      width: 100%;
      object-fit: cover;
    }

    .play {
      position: absolute;
      left: 0;
      right: 0;
      width: 75px;
      height: 50px;
      top: 55px;
      margin: auto;
    }

    .el-tag--plain.el-tag--info {
      position: absolute;
      width: 64px;
      text-align: center;
      right: 11px;
      top: 7px;
      color: #FFFFFF;
      //opacity: 0.3;
      background-color: rgba(0,0,0,.3);
      border-radius: 12px;
      border: 1px solid #FFFFFF;
    }

    .status::before{
      content: '';
      display: inline-block;
      margin-bottom: 2px;
      width: 6px;
      height: 6px;
      background: #76EEA0;
      border-radius: 50%;
    }
  }

  .bot-layout {
    padding: 5px 20px;
  }

  .bot-card {
    .inner_card {
      margin-bottom: 0;
      margin-right: 0;
      .inner-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .inner-img {
          display: flex;
          justify-content: flex-start;
          img {
            margin-right: 15px;
            height: 151px;
            width: 151px;
            object-fit: cover;
            border-radius: 80px;
          }
        }

        .inner-title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
          margin-top: 10px;
          margin-bottom: 0;
          width: 160px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .inner-pos{
          margin: 5px 0;
          text-overflow: ellipsis;
          line-height: 1.2;
          overflow: hidden;
          white-space: nowrap;
          width: 160px;
          min-height: 20px;
        }

        .inner-desc {
          font-size: 14px;
          font-weight: 400;
          color: #666666;
          margin-top: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-height: 1.5;
          min-height: 42px;
          width: 160px;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

      }
    }
  }

  .mid-card {

    .exam-layout {
      padding: 10px 0;
    }
    .exam-bg {
      height: 480px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-image: url($backgroundImgURL + "/tech-bg.png");
      background-size: cover;
      background-repeat:no-repeat;

      .exam-cont {
        width: 743px;
        height: 343px;
        margin-left: 35px;
        background: #FFFFFF;
        border: 1px solid #FFFFFF;
        border-radius: 21px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .exam-inner {
          cursor: pointer;
          width: 221px;
          height: 317px;
          box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon {
            width: 51px;
            height: 51px;
          }

          &:hover {
            background-color: #516FD2;
            background-image: none;
          }

          p{
            padding-top: 40px;
            font-size: 24px;
            font-weight: normal;
            color: #FFFFFF;
            line-height: 26px;
          }
        }

        .fir-bg {
          background-image: url($backgroundImgURL + "/tech-bg1.png");
          background-size: cover;
          background-repeat:no-repeat;
        }

        .sec-bg {
          background-image: url($backgroundImgURL + "/tech-bg2.png");
          background-size: cover;
          background-repeat:no-repeat;
        }

        .thr-bg {
          background-image: url($backgroundImgURL + "/tech-bg3.png");
          background-size: cover;
          background-repeat:no-repeat;
        }
      }
    }
  }

</style>
