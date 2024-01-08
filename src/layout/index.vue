<template>
  <div :class="classObj" class="app-wrapper">
    <div class="main-container">
      <el-scrollbar ref="scroll">
        <!-- <navbar /> -->
        <head-navbar />
        <div
          v-if="this.$route.name !== 'Home'"
          style="width: 100%; height: 90px; background-color: #fff"
        ></div>
        <app-main />
        <footbar />
        <!-- <div class="ranks"
             v-show="rankShow && isHome"
             :class="{'tips-show':isRankBottom}">
          <i class="el-icon-close"
             @click="rankShow=false"></i>
          <img :src="`${imgUrl}/rank.png`"
               alt="rank"
               class="image"
               @click="gorank">
        </div> -->
        <div class="tips" :class="{ 'tips-show': isRankBottom }">
          <el-row class="tip-layout">
            <el-col :span="8" class="tip-item_fa" @click.native="gopost">
              <img
                v-if="isProjecthall || isDemandhall"
                src="../assets/img/fabutc.png"
                alt=""
              />
              <img v-if="isMeethall" src="../assets/img/dzhk.png" alt="" />
              <span v-if="isProjecthall">项目发布</span>
              <span v-if="isDemandhall">需求发布</span>
              <span v-if="isMeethall">电子会刊</span>
            </el-col>
            <el-popover
              ref="popover"
              placement="left"
              trigger="hover"
              popper-class="qrcode-pop"
            >
              <span class="contact"
                >联系方式: <span class="mob">186-1103-3326</span></span
              >
              <!-- &lt;!&ndash; <img class="qrcode"
                   :src="`${imgUrl}/test1.png`">&ndash;&gt; -->
            </el-popover>
            <!-- <el-col :span="8"
                    class="tip-item"
                    @click.native="contactKf"><img src="@/assets/img/zixun.png"
                   alt=""></el-col> -->
            <!-- <el-col :span="8"
                    class="tip-item"><img src="@/assets/img/zixun.png"
                   alt=""></el-col> -->
            <el-col v-popover:popover :span="8" class="tip-item"
              ><img src="@/assets/img/phone.png" alt=""
            /></el-col>
            <el-col :span="8" class="tip-item" @click.native="backTop">
              <img src="@/assets/img/toTop.png" alt="" />
            </el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain, HeadNavbar, Navbar, Footbar } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import common from "@/mixin/common";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    HeadNavbar,
    Footbar,
    AppMain,
  },
  mixins: [ResizeMixin, common],
  data() {
    return {
      isBottom: false,
      isRankBottom: false,
      rankShow: true,
      isDemandhall: false,
      isProjecthall: false,
      isMeethall: false,
      isHomeCW: false,
      path: this.$route.path,
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
    isHome() {
      return this.$route.name == "Home";
    },
  },
  watch: {
    path(cur, old) {
      console.log(cur, old);
    },
  },
  created() {
    console.log(this.path);
  },

  // 监听,当路由发生变化的时候执行
  beforeRouteEnter(to, from, next) {
    // 需要注意这里不能使用this,
    // 因为我们使用的是进入路由之前，那会组件还没创建，
    next((vm) => {
      // 所有我们只能使用过vm异步语句来让节点上树；
      vm.checkRoute();
    });
  },
  mounted() {
    window.addEventListener("scroll", _.throttle(this.isShow, 60), false);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", _.throttle(this.isShow, 60));
  },

  methods: {
    isShow(num) {
      const osTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // this.isBottom = osTop > document.body.scrollHeight - Math.ceil(document.body.scrollHeight / 2) ;
      if (this.isHomeCW) {
        this.checkRoute();
        this.$store.dispatch(
          "app/setTransparentHead",
          osTop > this.$store.getters.wheight
        );
        this.isRankBottom = osTop > 800;
      } else {
        this.checkRoute();
        this.$store.dispatch("app/setTransparentHead", osTop > 424);
        this.isRankBottom = osTop > 150;
      }
    },
    gorank() {
      this.goBlank({
        path: "/rank",
      });
    },

    checkRoute() {
      this.isProjecthall = false;
      this.isDemandhall = false;
      this.isMeethall = false;
      this.isHomeCW = false;
      let path = this.$route.path;
      if (path == "/projecthall") {
        this.isProjecthall = true;
      } else if (path == "/demandhall") {
        this.isDemandhall = true;
      } else if (path == "/meethall") {
        this.isMeethall = true;
      } else if (path == "/") {
        this.isHomeCW = true;
      }
    },
    gopost() {
      if (this.isDemandhall) {
        this.goBlank({
          path: "/demandhall/post",
        });
      } else if (this.isProjecthall) {
        this.goBlank({
          path: "/projecthall/post",
        });
      } else {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.tip-item_fa {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 79px;
    height: 94px;
  }
  span {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
    width: 79px;
    text-align: center;
    margin: 16px 0;
  }
}

.app-wrapper {
  @include clearfix;
  @include scrollBar;
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.ranks {
  visibility: hidden;
  transition: all 0.3s;
  width: 66px;
  height: 302px;
  position: fixed;
  top: 0;
  left: 20px;
  bottom: 0;
  margin: auto 0;
  z-index: 20;
  .image {
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .el-icon-close {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 22;
    font-size: 20px;
    color: #ffffff;
  }
}

.tips {
  visibility: hidden;
  transition: all 0.3s;
  width: 78px;
  height: 130px;
  position: fixed;
  top: 0;
  right: 55px;
  bottom: 0;
  margin: auto 0;
  z-index: 20;
  .tip-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .tip-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      // height: 34px;
      // background: #4D6DDA;
      border-radius: 3px;
      margin: 5px 0;
      cursor: pointer;
      margin: -8px 0;
    }
  }
}

.tips-show {
  visibility: visible;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}

.qrcode {
  height: 143px;
  width: 143px;
}

.contact {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  .mob {
    color: #4d6dda;
  }
}
</style>
