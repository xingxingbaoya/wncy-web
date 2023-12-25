<template>
  <div>
    <el-row v-show="isService"
            class="s-img">
      <img :src="`${imgUrl}/service-bg1.png`"
           alt="text-content"
           class="image">
    </el-row>
    <div class="footbar">
      <div class="foot_left">
        <div class="left_top">
          <img src="../../assets/img/logo.png"
               alt="">
        </div>
        <div class="left_bot">
          <span>京ICP备 09093569号 </span>
          <a target="_blank"
             href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802032617">京公网安备 11010802032617号</a>
        </div>
      </div>
      <div class="midile">
        <el-link :underline="false" class="first-link">友情链接</el-link>
        <el-link :underline="false" class="s-link"
                 href="http://kw.beijing.gov.cn/ "
                 target="_blank">北京市科委/中关村管委会官网</el-link>
        <el-link :underline="false" class="c-link"
                 href="http://www.zgcgroup.com.cn/zgcadmin/home/index/index"
                 target="_blank">中关村发展集团</el-link>
      </div>
      <div class="foot_right">
        <div>
          官方运营机构
        </div>
        <el-link :underline="false" class="d-link"
                 href="http://zgcts.com.cn/ "
                 target="_blank">北京中关村科技服务有限公司</el-link>
      </div>
    </div>
    <!-- <div class="footbar">
      <div class="foot-left">
        <div class="friend-link">
          <el-link class="first-link">友情链接</el-link>
          <el-link class="f-link" href="http://kw.beijing.gov.cn/ " target="_blank">北京市科委/中关村管委会官网</el-link>
          <el-link class="f-link" href="http://www.zgcgroup.com.cn/zgcadmin/home/index/index" target="_blank">中关村发展集团</el-link>
        </div>
        <div>官方运营机构：北京中关村科技服务有限公司</div>
        <div style="margin-bottom: 0">京ICP备 09093569号 | 京公网安备 <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802032617">11010802032617号</a></div>
      </div>
    </div> -->
  </div>

</template>

<script>

import common from '@/mixin/common'

export default {
  mixins: [common],
  computed: {
    isService () {
      return this.$route.name=='Servicehalldetail'
    }
  }
}
</script>

<style lang="scss" scoped>
.s-img {
  margin-bottom: 30px;
  height: 270px;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.footbar {
  padding: 0 calc((100% - 1320px) / 2);
  display: flex;
  justify-content: space-between;
  height: 235px;
  color: #ffffff;
  background: #191F2E;
  overflow: hidden;
  .foot_left{
    margin-top: 67px;
    .left_top{
      width:449px;
      height: 34px;
      margin-bottom: 36px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .left_bot{
      display: flex;
      flex-direction: column;
      span{
        margin-bottom: 5px;
      }
    }
  }
  .midile{
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .first-link{
      font-size: 16px;
      font-weight: normal;
      color: #FFFFFF;
      text-align: left;
      margin-bottom: 26px;
      text-decoration:none;
      cursor:none
    }
    // .first-link:hover{
    //  font-size: 16px;
    //  font-family: Adobe Heiti Std;
    //  font-weight: normal;
    //  color: #1E86F9;
    //  text-align: left;
    //  margin-bottom: 26px;
    //  text-decoration:none;
    //}

    .s-link{
      font-size: 16px;
      height: 34px;
      font-weight: 500;
      color: #FFFFFF;
      text-align: left;
      margin-bottom: 13px;
      text-decoration:none
    }
    .s-link:hover{
      color: #1E86F9;
      text-align: left;
      margin-bottom: 13px;
    }
    .c-link{
      // font-size: 14px;
      font-size: 16px;

      font-weight: 500;
      color: #FFFFFF;
      text-align: left;
      text-decoration:none
    }
     .c-link:hover{
      // font-size: 14px;
      font-size: 16px;

      font-weight: 500;
      color: #1E86F9;
      text-align: left;
    }
  }
  .foot_right{
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    height: 100%;
    div:nth-child(1){
      font-size: 16px;
      font-weight: normal;
      color: #FFFFFF;
      margin-bottom: 35px;
    }
    .d-link{
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
      &:hover{
        font-size: 16px;
        font-weight: 500;
        color: #1E86F9;
        text-align: left;
      }
    }
  }

  .foot-left1 {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    img {
      margin-bottom: 30px;
      width: 644px;
      height: 59px;
    }
    .friend-link {
      display: flex;
      justify-content: space-between;

      .el-link.is-underline:hover:after {
        border-bottom-width: 2px;
        border-bottom-color: #ffffff;
        bottom: -5px;
      }
      .first-link {
        font-size: 20px;
        font-weight: 600;
        margin-right: 36px;
      }

      .f-link {
        font-size: 18px;
        font-weight: 400;
        margin-right: 36px;
      }
    }
    div {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
}
</style>
