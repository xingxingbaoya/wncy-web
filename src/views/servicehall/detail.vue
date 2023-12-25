<template>
  <el-main v-loading="loading"
           class="content">
    <el-card :body-style="{}"
             shadow="never">
      <el-row class="main-top">
        <div class="left-cont">
          <el-carousel ref="carouse"
                       indicator-position="none"
                       arrow="never"
                       :autoplay="false">
            <el-carousel-item v-for="(pic,index) in picList"
                              :key="index">
              <img v-real-img="pic"
                   class="image"
                   alt="index"
                   :src="`${imgUrl}/product.jpg`">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="right-cont">
          <p class="r-title">{{ item.serviceName }}</p>
          <div class="r-price">
            <p class="price-warp">产品价格：<span class="price">{{ item.amount == '-1' ? '面议': '¥' +item.amount + '起' }}</span></p>
          </div>
          <div class="taglist">
            <!-- <span v-for="it in formatTag" class="cat-tag">{{ it }}</span> -->
            <div class="cat-tag_buy"
                >购买产品</div>
                 <!-- <div class="cat-tag_buy"
                 @click="contactKf">购买产品</div> -->
          </div>
          <!--          <el-row>-->
          <!--            <el-button class="r-btn" type="primary" @click="contactKf"><svg-icon icon-class="zixun" class-name="icon" /><span class="icon-text">点击咨询</span></el-button>-->
          <!--          </el-row>-->
        </div>
      </el-row>
      <!--      <el-row class="main-bot">-->
      <!--        <div v-for="(pic,index) in picList" :key="index" class="pos-inx" @click="swap(index)">-->
      <!--          <img v-real-img="pic" class="image" :alt="index" :src="`${imgUrl}/product.jpg`">-->
      <!--        </div>-->
      <!--      </el-row>-->
    </el-card>

    <el-row v-show="showDetail"
            class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left"
                 shadow="never"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">商品详情</span>
          </div>
          <div class="text-content"
               v-html="item.goodsDetail" />
        </el-card>
      </el-col>
    </el-row>

    <el-row v-show="!showDetail"
            class="detail-content">
      <el-col v-show="item.serviceIntroduction"
              :span="24"
              class="detail-layout mt0">
        <el-card class="box-card-left"
                 shadow="never"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">服务介绍</span>
          </div>
          <div class="text-content"
               v-html="item.serviceIntroduction" />
        </el-card>
      </el-col>

      <el-col v-show="item.serviceObject"
              :span="24"
              class="detail-layout">
        <el-card class="box-card-left"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">服务对象</span>
          </div>
          <div class="text-content"
               v-html="item.serviceObject" />
        </el-card>
      </el-col>

      <el-col v-show="item.serviceProcess"
              :span="24"
              class="detail-layout">
        <el-card class="box-card-left"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">服务流程</span>
          </div>
          <div class="text-content"
               v-html="item.serviceProcess" />
        </el-card>
      </el-col>

      <el-col v-show="item.serviceCase"
              :span="24"
              class="detail-layout">
        <el-card class="box-card-left"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">服务案例</span>
          </div>
          <div class="text-content"
               v-html="item.serviceCase" />
        </el-card>
      </el-col>
    </el-row>

  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { getServiceDetail } from '@/api/servicehall'

export default {
  name: 'Servicehalldetail',
  mixins: [common],
  data () {
    return {
      item: {},
      picList: []
    }
  },
  computed: {
    showDetail () {
      return !_.isEmpty(this.item.goodsDetail)
    },
    formatTag () {
      return this.item?.serviceTag?.includes('、')? this.item?.serviceTag?.split('、'):[this.item?.serviceTag]
    }
  },
  methods: {
    loadData () {
      this.loading=true
      const { id }=this.$route.query
      this.picList=[]
      getServiceDetail(id).then(res => {
        if(res.code=='0000') {
          this.item=res.obj
          const { pic1,pic2,pic3 }=res.obj
          if(!_.isEmpty(pic1)) {
            this.picList.push(pic1)
          }
          if(!_.isEmpty(pic2)) {
            this.picList.push(pic2)
          }
          if(!_.isEmpty(pic3)) {
            this.picList.push(pic3)
          }
          console.log(this.picList)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    swap (index) {
      this.$refs.carouse.setActiveItem(index)
    }
  }
}
</script>

<style scoped lang="scss">
.cat-tag_buy {
  cursor: pointer;
  width: 238px;
  height: 56px;
  background: linear-gradient(90deg, #1875f2 0%, #37b9fa 100%);
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  line-height: 56px;
}
.content {
  background: #f5f7fb;
}

.main-top {
  padding: 100px calc((100% - 1245px) / 2) 38px;
  background: #fff;
  margin-bottom: 13px;
  display: flex;
  justify-content: flex-start;
  .left-cont {
    width: 363px;

    ::v-deep .el-carousel__container {
      height: 300px;
    }

    .image {
      width: 100%;
      height: 100%;
    }
  }

  .right-cont {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: calc(100% - 400px);
    padding-left: 34px;
    .r-title {
      font-size: 24px;
      font-weight: 600;
      color: #333333;
      margin-top: 0;
    }

    .r-price {
      display: flex;
      align-items: center;
      background-image: url($backgroundImgURL+"/ss1.png");
      background-size: cover;
      background-repeat: no-repeat;
      overflow: hidden;
      height: 92px;

      font-size: 18px;
      font-weight: 500;
      color: #666666;

      .price-warp {
        padding-left: 20px;
      }

      .price {
        font-size: 24px;
        font-weight: 600;
        color: #516fd2;
      }
    }

    .cat-tag {
      display: inline-block;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: #f2f7ff;
      border: 1px solid #516fd2;
      border-radius: 3px;
      text-align: center;
      line-height: 24px;
      font-size: 18px;
      font-weight: 400;
      color: #516fd2;
      padding: 5px 20px;
      margin-right: 10px;
    }

    .r-btn {
      /*width: 205px;*/
      background: #516fd2;
      border: 1px solid #516fd2;
      border-radius: 4px;
      font-size: 18px;
      font-weight: 400;
      color: #ffffff;
      padding: 12px 40px;

      .icon {
        width: 25px;
        height: 25px;
        margin-right: 12px;
        vertical-align: -6px;
      }
    }
  }
}

.main-bot {
  margin-top: 10px;
  .pos-inx {
    display: inline-block;
    width: 86px;
    height: 67px;
    margin-right: 10px;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
    }
  }
}

.detail-content {
  padding: 0 calc((100% - 1245px) / 2);
  background: #fff;
  margin-top: 13px;
  .box-card-left {
    //min-height: 250px;
  }

  .detail-layout {
    margin-top: 31px;
  }

  .mt0 {
    margin-top: 0;
  }
  .card-bg {
    background-color: #f6f6f6;
  }

  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
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

  ::v-deep .el-card__header {
    border-bottom: 1px solid #eeeeee;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
  }
}
</style>
