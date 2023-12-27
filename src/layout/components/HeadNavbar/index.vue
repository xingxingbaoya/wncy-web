<template>
  <div
    :class="{ 'menu-shadow': isHome, isTransparent: isTransparent }"
    class="head-menu"
  >
    <div class="head-left">
      <img src="~img/logo.png" alt="中关村科技成果转化与技术交易综合服务平台" />
    </div>

    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="horizontal"
      class="home-menu"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <!--    <i class="el-icon-search" />-->
    <div class="head-right">
      <temp v-show="isLogin" class="opera" :class="{ 'home-menu': isHome }">
        <span class="regist-button"  @click="goLogin"
          >注册</span>
        <el-button class="login-button" size="mini" round @click="goLogin"
          >登录</el-button
        >
        
      </temp>
      <div v-show="!isLogin" class="opera" :class="{ 'home-menu': isHome }">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="name">{{ username }}</span>
            <svg-icon icon-class="user1" class-name="icon" />
          </span>
          <el-dropdown-menu slot="dropdown" class="top_c">
            <el-dropdown-item command="gocenter">
              <p class="opr">个人中心</p>
              <p class="op-desc">查看信息，编辑信息</p>
            </el-dropdown-item>
            <el-dropdown-item command="goaccout">
              <p class="opr">账号设置</p>
              <p class="op-desc">修改密码</p>
            </el-dropdown-item>
            <el-dropdown-item command="goout">
              <span class="opr">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import common from "@/mixin/common";
import { getToken } from "@/utils/auth";

export default {
  components: { SidebarItem, Logo },
  mixins: [common],
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isHome() {
      return this.$route.name == "Home";
    },
    isLogin() {
      return (
        _.isEmpty(getToken()) && _.isEmpty(localStorage.getItem("zgc_token"))
      );
    },
    username() {
      return this.$store.getters.name || localStorage.getItem("userName");
    },
    isTransparent() {
      return this.$store.getters.isTransparentHead;
    },
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      // this.$router.push(`/`)
      location.reload();
    },
    handleCommand(command) {
      switch (command) {
        case "gocenter":
          this.goBlank({
            path: "/personal/center/",
          });
          break;
        case "goaccout":
          this.goBlank({
            path: "/personal/center/pass",
          });
          break;
        case "goout":
          this.logout();
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.top_c {
  padding-top: 30px;
  z-index: 99999 !important;
}
.icon {
  font-size: 30px;
}
.home-menu {
  border-bottom: none !important;
  background: transparent !important;
  :deep(.el-menu-item) {
    position: relative;
    color: #fff !important;
    padding: 0 pxToVW(32);

    &:hover,
    &.is-active {
      border-radius: 0 !important;
      color: #fff !important;
      font-weight: 600;
    }
  }

  .opera {
    .name {
      color: #333333 !important;
    }
  }

  :deep(.el-menu-item:hover:before, .el-menu-item.is-active:before) {
    display: none;
  }
}

.head-menu {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 0 pxToVW(180);
  background: rgba(38, 38, 45, 0.3);
  .head-left {
    width: pxToVW(192);
    img {
      width: 100%;
      object-fit: contain;
    }
  }

  .head-right {
    .regist-button {
      color: #fff;
      line-height: 90px;
      margin-right: pxToVW(12)
    }
    .login-button {
      display: inline-block;
      color: #fff;
      background-color: #333C6D;
      width: pxToVW(137);
      border: none;
      font-size: 16px;

      img{
        width: 100%;
      }
    }
  }

  .el-icon-search {
    font-size: 20px;
    color: #ffffff;
    margin-right: 50px;
  }
}

::v-deep .el-dropdown-menu__item {
  .opr {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    margin: 0 !important;
  }

  .op-desc {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    margin: 0;
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #516fd2;
  .opr {
    color: #ffffff;
  }

  .op-desc {
    color: #ffffff;
  }
}
.el-dropdown-menu {
  padding: 0;
  z-index: 999;
}

.menu-shadow {
  box-shadow: 0px 0px 30px 0 rgb(0 0 0 / 10%);
}

.isTransparent {
  background: rgba(38, 38, 45, 0.7);
}
</style>