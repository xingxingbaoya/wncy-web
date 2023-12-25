<template>
  <el-main>
    <el-card class="play-content" :body-style="{ padding:'30px' }">
      <el-col :span="4" class="article-left">
        <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`">
        <!--        <img :src="item.avatar">-->
      </el-col>
      <el-col :span="20" class="play-right">
        <!--        <div>-->
        <div class="play-title">{{ item.nickName }}</div>
        <p class="play-status">
          <span class="p-ft">荣誉称号: </span><span class="mr20">{{ item.position }}</span>
        </p>

        <p class="play-status">
          <span class="p-ft">行业类型: </span><span class="mr20">{{ item.industryCategory | formatIndustryOne }}</span>
        </p>
        <!--        </div>-->
      </el-col>
    </el-card>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span class="box-title">详情介绍</span>
          </div>
          <div class="text-content" v-html="item.introduction" />
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getActivityDetail } from '@/api/activitieshall'
import { getOrgDetail } from '@/api/servicehall'

export default {
  name: 'Talenthalludetail',
  mixins: [common],
  data() {
    return {
      item: {}
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getOrgDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading = false
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.play-content{
  //height: 370px;
  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .article-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
  .play-right {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    flex-direction: column;
    padding-left: 35px;
    height: 200px;
  }

  .play-title {
    font-size: 24px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
  }

  .play-status {
    height: 17px;
    font-size: 18px;
    font-weight: 400;
    color: #999999;

    .mr20 {
      margin-right: 200px;
    }
  }

  .play-right-btn {
    display: flex;
    justify-content: flex-start;
  }
  .see {
    width: 205px;
    padding: 5px 12px;
    border: 2px solid #516FD2;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #516FD2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .see {
    background: #516FD2;
    color: #FFFFFF;
    margin-right: 35px;
    .icon {
      width: 40px;
      height: 30px;
      vertical-align: -8px;
    }
  }

  .see-pd {
    margin-right: 10px;
  }

}

.detail-content {
  margin-top: 31px;
  .box-card-left {
    min-height: 250px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    &:after {
      content: '';
      height: 3px;
      width: 100%;
      background: #516FD2;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header{
    border-bottom: 1px solid #EEEEEE;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
  }
}
</style>
