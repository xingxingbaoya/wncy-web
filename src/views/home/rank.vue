<template>
  <el-main>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px 20px' }">
          <div slot="header">
            <span class="box-title">榜单汇总</span><span class="f-title">重大榜单发布的内容</span>
          </div>
          <el-row class="third-bottom">
            <el-col :span="8" class="rank-layout bg1">
              <p class="r-title">百项新技术新产品榜单</p>
              <span class="r-btn" @click="gopetail(1)">查看榜单</span>
            </el-col>
            <el-col :span="8" class="rank-layout bg2">
              <p class="r-title">百项国际技术交易创新<br>项目榜单</p>
              <span class="r-btn" @click="gopetail(3)">查看榜单</span>
            </el-col>
            <el-col :span="8" class="rank-layout bg3">
              <p class="r-title">百项数字化转型需求榜单</p>
              <span class="r-btn" @click="gopetail(6)">查看榜单</span>
            </el-col>
          </el-row>

        </el-card>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import common from '@/mixin/common'

export default {
  name: 'Rank',
  mixins: [common],
  data() {
    return {
      tableData: [
        {
          first: '2021中关村国际技术交易大会新技术新产品榜单',
          id: 1
        },
        // {
        //   first:'中关村国际技术交易大会新技术新产品重磅首发项目',
        //   id: 2,
        // },
        {
          first: '2021中关村国际技术交易大会国际技术交易创新项目榜单',
          id: 3
        },
        // {
        //   first:'2021中关村国际技术交易大会-知识产权十大并购案例',
        //   id: 4,
        // },
        // {
        //   first:'中关村国际技术交易大会国际技术交易创新项目百强榜单',
        //   id: 5,
        // },
        {
          first: '2021中关村国际技术交易大会百项数字化转型需求榜单',
          id: 6
        }
      ]
    }
  },
  methods: {
    gopetail(id) {
      this.goBlank({
        path: '/rdetail',
        query: { id }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.detail-content {
  padding: 0 calc((100% - 1245px)/2);
  .box-card-left {
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
  .card-bg {
    background-color: #F6F6F6;
  }
  .f-title {
    font-size: 18px;
    font-weight: 400;
    color: #999999;
    line-height: 25px;
    margin-left: 40px;
  }

  .box-title {
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

  .text-content {
    color: #333333;
    font-size: 18px;
  }

  .third-bottom {
    .rank-layout {
      height: 335px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .r-title {
        font-size: 30px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 1.5;
        text-align: center;
        height: 60px;
      }

      .r-btn {
        cursor: pointer;
        display: inline-block;
        width: 119px;
        height: 36px;
        border: 1px solid #FFFFFF;
        border-radius: 3px;

        text-align: center;
        font-size: 20px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 32px;
        &:hover {
          color: #516FD2;
          border-color: #c6e2ff;
          background-color: #F6F6F6;
        }

      }

    }

    .bg1 {
      background-image: url($backgroundImgURL + "/rank1.png");
      background-size: cover;
      background-repeat:no-repeat;
    }

    .bg2 {
      background-image: url($backgroundImgURL + "/rank2.png");
      background-size: cover;
      background-repeat:no-repeat;

    }

    .bg3 {
      background-image: url($backgroundImgURL + "/rank3.png");
      background-size: cover;
      background-repeat:no-repeat;

    }
  }
}
</style>
