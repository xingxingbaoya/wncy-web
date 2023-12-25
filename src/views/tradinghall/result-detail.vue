<template>
  <el-main>
    <el-card class="play-content" :body-style="{ padding:'30px' }">
      <el-col :span="4" class="article-left">
        <img :src="item.project && item.project.logo">
      </el-col>
      <el-col :span="18" class="play-right">
        <div class="play-desc">
          <div class="play-title pb30">Bermad 气阀以及各类流体控制管理产品</div>
          <p class="play-status mb24">
            <span class="label-t">项目进度：</span><span class="ps-color mr20">{{ item.tradeBrief }}</span>
            <span class="label-t">意向价格：</span><span class="mr20">{{ item.project && item.project.faceFlag == '1'?"面议":item.project && item.project.proIntentionPrice + "万元" }}</span>
            <span class="label-t">合作方式：</span><span class="mr20">{{ item.project &&item.project.cooperation | formatCooperation }}</span>
          </p>
          <p class="play-status">
            <span class="label-t">项目国别：</span><span class="mr20">{{ item.project &&item.project.isNotNational == '1'? '国内':'国际' }}</span>
            <span class="label-t">技术来源：</span><span class="mr20">{{ item.project &&item.project.proNature | formatNature }}</span>
            <span class="label-t">行业分类：</span><span class="mr20">{{ item.project &&item.project.industryone | formatIndustryOne }}</span>
          </p>
          <p class="play-status">
            <span class="label-t">技术类别：</span><span class="mr20">{{ item.project && item.project.proPatentInfo | formatTech }}</span>
            <span class="label-t">联系人：</span><span class="mr20">{{ item.project &&item.project.linkman }}</span>
            <span class="label-t">联系电话：</span><span class="mr20">{{ item.project &&item.project.phone }}</span>
          </p>
          <p class="play-status">
            <span class="label-t">拟交易价：</span><span class="mr20">{{ item.tradePrice }}万元</span>
            <span class="label-t">交易方式：</span><span class="mr20">{{ formatTradeWay(item.tradeWay) }}</span>
          </p>
        </div>
      </el-col>
    </el-card>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 30px' }" shadow="never">
          <div slot="header">
            <span class="box-title">项目介绍</span>
          </div>
          <div class="text-content">
            <el-row>
              <el-col :span="7" class="text-left">
                项目名称：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.title }}
              </el-col>
              <el-col :span="7" class="text-left">
                行业分类：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.industryone | formatIndustryOne }}
              </el-col>
              <el-col :span="7" class="text-left">
                技术来源：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proNature | formatNature }}
              </el-col>
              <el-col :span="7" class="text-left">
                来源地：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.provinceName }} {{ item.project &&item.project.cityName }} {{ item.project &&item.project.areaName }}
              </el-col>
              <el-col :span="7" class="text-left">
                项目国别：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.isNotNational == '1'? '国内':'国际' }}
              </el-col>
              <el-col :span="7" class="text-left">
                意向价格：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.faceFlag == '1'?"面议":item.project &&item.project.proIntentionPrice + "万元" }}
              </el-col>

              <el-col :span="7" class="text-left">
                合作方式：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.cooperation | formatCooperation }}
              </el-col>

              <el-col :span="7" class="text-left">
                专利情况：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proPatentInfo == '0'? "无":"有" }}
              </el-col>

              <el-col :span="7" class="text-left">
                项目开发阶段：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proDevelopment | formatDevelopment }}
              </el-col>

            </el-row>
            <el-row v-show="item.project &&item.project.proPatentInfo == '1'">
              <el-col :span="7" class="text-left">
                专利类别：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proPatentCategory | formatCategory }}
              </el-col>
              <el-col :span="7" class="text-left">
                专利授权日：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proGrantTime }}
              </el-col>
              <el-col :span="7" class="text-left">
                专利人：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.patentOwner }}
              </el-col>
              <el-col :span="7" class="text-left">
                专利号：
              </el-col>
              <el-col :span="17" class="text-right">
                {{ item.project &&item.project.proPatentNo }}
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }" shadow="never">
          <div slot="header">
            <span class="box-title">项目内容</span>
          </div>
          <div class="text-content" v-html="item.project &&item.project.proIntroduct" />
        </el-card>
      </el-col>
    </el-row>

    <el-row class="detail-content mt0">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }" shadow="never">
          <div slot="header">
            <span class="box-title">商业计划前景</span>
          </div>
          <div class="text-content">
            <p>{{ item.project && item.project.proBusinessPlan }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--    <el-row class="vali-date">-->
    <!--      <el-col :span="24">-->
    <!--        <el-card class="box-card-left" :body-style="{ padding: '0 30px' }" shadow="never">-->
    <!--          <div slot="header" >-->
    <!--            <span class="box-title">信息有效期</span>-->
    <!--          </div>-->
    <!--          <div class="text-content p0">-->
    <!--            2021-04-20至2022-12-31-->
    <!--          </div>-->
    <!--        </el-card>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getProjectDetail, getProjectList } from '@/api/projecthall'
import { getTradeProcessDetail, getTradeResultDetail } from '@/api/tradinghall'

export default {
  name: 'TradinghallResultdetail',
  mixins: [common],
  data() {
    return {
      item: {}
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { projectId } = this.$route.query
      getTradeResultDetail({ projectId }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    gomore() {
      this.goBlank({
        path: '/projecthall/'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.play-content{
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
    }
  }
  .play-right {
    padding-left: 15px;
  }

  ::v-deep .el-card__body {
    display: flex;
    align-items: center;
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
      display: inline-block;
      width: 160px;
      vertical-align: middle;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .ps-color {
      color: #516FD2;

    }
  }

  .pb30 {
    margin-top: 0;
    margin-bottom: 36px;
  }

  .mb24 {
    margin-top: 0;
    margin-bottom: 24px;
  }

}

.vali-date {
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

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
    line-height: 1.5;
    .text-left{
      line-height: 56px;
      height: 56px;
      background: #F8F8F8;
      padding-left: 34px;
      border: 1px solid #EEEEEE;
    }

    .text-right {
      line-height: 56px;
      height: 56px;
      padding-left: 44px;
      border: 1px solid #EEEEEE;
    }
    .h-left {
      height: 110px;
    }
    .height-auto {
      height: 110px;
      line-height: 1.5;
    }
  }

  ::v-deep .el-card__header{
    padding: 16px 48px;
    border-bottom: 1px solid #EEEEEE;
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

  .more {
    color: #516FD2;
    font-size: 18px;
    float: right;
    padding: 3px 0;
    i {
      font-weight: 600;
    }
  }

  ::v-deep .el-card__header{
    padding: 16px 48px;
    border-bottom: 1px solid #EEEEEE;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
    line-height: 1.5;
    .text-left{
      line-height: 56px;
      height: 56px;
      background: #F8F8F8;
      padding-left: 34px;
      border: 1px solid #EEEEEE;
    }

    .text-right {
      line-height: 56px;
      height: 56px;
      padding-left: 44px;
      border: 1px solid #EEEEEE;
    }
    .h-left {
      height: 110px;
    }
    .height-auto {
      height: 110px;
      line-height: 1.5;
    }
  }

}

.mt0 {
  margin-top: 0;
}

.p0 {
  padding: 0;
}

.label-t {
  display: inline-block;
  width: 120px;
}

</style>
