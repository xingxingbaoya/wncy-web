<template>
  <el-main v-loading="loading">
    <el-card class="play-content" :body-style="{ padding:'30px' }">
      <el-col :span="4" class="article-left">
        <img v-real-img="item.avatar" :src="`${imgUrl}/org.jpg`" alt="image">
      </el-col>
      <el-col :span="16" class="play-right">
        <div class="play-desc">
          <div class="play-title pb30">{{item.nickName}}</div>
          <p class="play-status mb24">
            <span class="label-t">机构性质：</span><span class="mr20">{{ item.institutionalNature | formatInsnature }}</span>
            <span class="label-t">服务类型：</span><span class="mr20">{{ item.serviceType | formatCompany }}</span>
            <span class="label-t">所属地域：</span><span>{{ item.province | formatCity }}</span>
          </p>
          <p class="play-status">
            <span class="label-t">联系人：</span><span class="mr20">{{ item.nickName }}</span>
            <span class="label-t">联系方式：</span><span class="mr20">{{ item.phone }}</span>
          </p>
        </div>
      </el-col>
    </el-card>

    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }" shadow="never">
          <div slot="header">
            <span class="box-title">服务介绍</span>
          </div>
          <div class="text-content">
            <p>{{ item.introduction }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getProjectDetail, getProjectList } from '@/api/projecthall'
import { getUserDetail } from '@/api/user'
import { getOrgDetail } from '@/api/servicehall'

export default {
  name: 'TradinghallOrgdetail',
  mixins: [common],
  data() {
    return {
      item: {}
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id } = this.$route.query
      getOrgDetail(id).then(res => {
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
  padding: 100px calc((100% - 1245px) / 2) 38px;

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
    height: 22px;
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

.detail-content {
  padding: 0 calc((100% - 1245px) / 2) 38px;

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

.p0 {
  padding: 0;
}

.label-t {
  display: inline-block;
  width: 120px;
}

</style>
