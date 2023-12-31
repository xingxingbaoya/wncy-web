<template>
  <el-main style="overflow-x: hidden;">
    <div class="nav-menu">
      <div class="nav-menu-content">
        <div
          :class="active == 1 ? 'active' : ''"
          @click="
            () => {
              active = 1;
              $router.push('/personal/center?active=1');
            }
          "
        >
          用户中心
        </div>
        <div
          :class="active == 2 ? 'active' : ''"
          @click="
            () => {
              active = 2;
              $router.push('/personal/center/edit?active=2');
            }
          "
        >
          账号设置
        </div>
      </div>
    </div>
    <el-row class="main-cont">
      <div class="left">
        <div class="top" @click="goedit" v-if="active == 1 || !active">
          <img v-if="item.avatar" :src="item.avatar" alt="" />
          <svg-icon v-else icon-class="avatar" class-name="avatar" />
          <p style="user-select: none">{{ item.userName }}</p>
        </div>
        <div class="bot" v-if="active == 1 || !active">
          <p class="bot-title">与我相关</p>
          <el-collapse v-model="activeNames" accordion @change="handleChange">
            <el-collapse-item title="项目大厅" name="1">
              <router-link to="/personal/center/search-project" tag="p"
                >我发布的项目</router-link
              >
            </el-collapse-item>
            <el-collapse-item title="活动大厅" name="3">
              <router-link to="/personal/center/search-activit" tag="p"
                >我报名的活动</router-link
              >
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="bot" v-else>
          <p class="bot-title">账号设置</p>
          <el-collapse v-model="activeNames" accordion @change="handleChange">
            <el-collapse-item title="个人资料" name="1" co>
              <router-link to="/personal/center/edit?active=2" tag="p"
                >基本信息</router-link
              >
            </el-collapse-item>
            <el-collapse-item title="密码修改" name="3">
              <router-link to="/personal/center/pass?active=2" tag="p"
                >登录密码修改</router-link
              >
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <section class="personal-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </section>
    </el-row>
  </el-main>
</template>

<script>
import common from "@/mixin/common";
import { mapGetters } from "vuex";

export default {
  name: "Personal",
  mixins: [common],
  data() {
    return {
      activeNames: "",
      active: 1,
    };
  },
  mounted() {
    this.active = this.$route.query?.active || 1;
  },
  computed: {
    ...mapGetters(["item"]),
    isProd() {
      return process.env.VUE_APP_MODE == "prod";
    },
    key() {
      return this.$route.path;
    },
    authStatus() {
      const sp = {
        0: "未认证",
        1: "待审核",
        2: "已认证",
        3: "已驳回",
      };
      return ({ userType, status }, ut) => {
        console.log(userType, status, ut);
        if (userType == ut) {
          return sp[status];
        } else {
          return "未认证";
        }
      };
    },
    hasAuth() {
      return ({ userType, status }, ut) => {
        return userType == ut && status == 2;
      };
    },
    hasRejectd() {
      return ({ userType, status }, ut) => {
        return (
          (userType == ut && status == 3) || (userType == ut && status == 1)
        );
      };
    },
  },
  methods: {
    loadData() {
      // this.loading = true
      // getUserDetail().then(res => {
      //   if (res.code == '0000') {
      //     this.item = res.obj
      //     console.log(this.item,'provide')
      //   } else {
      //     this.$message.warning(res.msg)
      //   }
      // }).finally(() => {
      //   this.loading = false
      // })
    },
    handleChange(val) {
      console.log(val);
    },
    isCanAuth({ authType, status, userType }, authFlag, authUser) {
      console.log(authType, status, userType);
      if (authType != authFlag) {
        return authType == "2";
      } else {
        return userType == "1" || status == "3";
      }
    },
    goedit(item) {
      this.$router.push({
        path: "/personal/center/edit",
      });
    },
    goexperts(item) {
      if (this.isCanAuth(item, "0", "4")) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: "/personal/center/rejected",
          });
        } else {
          this.$router.push({
            path: "/personal/center/edit-experts",
          });
        }
      } else {
        if (item.userType == 4) {
          if (item.status == 2) {
            this.$router.push({
              path: "/personal/center/experts",
            });
          } else if (item.status == 1) {
            this.$message.warning("已认证技术专家,待审核");
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning("已认证角色");
          } else {
            this.$message.warning("只允许个人用户认证");
          }
        }
      }
    },
    gocompany(item) {
      if (this.isCanAuth(item, "1", "2")) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: "/personal/center/rejected",
          });
        } else {
          this.$router.push({
            path: "/personal/center/edit-company",
          });
        }
      } else {
        if (item.userType == 2) {
          if (item.status == 2) {
            this.$router.push({
              path: "/personal/center/company",
            });
          } else if (item.status == 1) {
            this.$message.warning("已认证企业,待审核");
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning("已认证角色");
          } else {
            this.$message.warning("只允许企业用户认证");
          }
        }
      }
    },
    goorg(item) {
      if (this.isCanAuth(item, "1", "3")) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: "/personal/center/rejected",
          });
        } else {
          this.$router.push({
            path: "/personal/center/edit-org",
          });
        }
      } else {
        if (item.userType == 3) {
          if (item.status == 2) {
            this.$router.push({
              path: "/personal/center/org",
            });
          } else if (item.status == 1) {
            this.$message.warning("已认证机构,待审核");
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning("已认证角色");
          } else {
            this.$message.warning("只允许企业用户认证");
          }
        }
      }
    },
    gomanger(item) {
      if (this.isCanAuth(item, "0", "5")) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: "/personal/center/rejected",
          });
        } else {
          this.$router.push({
            path: "/personal/center/edit-manger",
          });
        }
      } else {
        if (item.userType == 5) {
          if (item.status == 2) {
            this.$router.push({
              path: "/personal/center/manger",
            });
          } else if (item.status == 1) {
            this.$message.warning("已认证技术经理人,待审核");
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning("已认证角色");
          } else {
            this.$message.warning("只允许个人用户认证");
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.nav-menu {
  margin-top: 40px;
  width: 100vw;
  height: 45px;
  border-bottom: 2px solid #2434af;
  &-content {
    width: pxToVW(1030);
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 auto;
    > div {
      padding: 0 18px;
      border-radius: 6px 6px 0 0;
      height: 100%;
      line-height: 45px;
      cursor: pointer;
      user-select: none;
      &.active {
        background: #2434af;
        color: #fff;
      }
    }
  }
}
.main-cont {
  margin-top: 20px;
  padding: 0 calc((100% - 1245px) / 2) 38px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  .left {
    width: 350px;
    margin-right: 18px;
    .top {
      pointer-events: none;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      //width: 400px;
      height: 180px;
      background: #ffffff;
      border-radius: 3px;
      padding: 20px;
      margin-bottom: 16px;

      img,
      .avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }

      p {
        margin: 0;
        font-size: 16px;
        font-weight: 400;
        color: #333333;
      }

      &:after {
        pointer-events: auto;
        display: block;
        content: "\7f16\8f91";
        position: absolute;
        top: 15px;
        right: 32px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        cursor: pointer;
      }
    }

    .mid {
      //width: 400px;
      height: 200px;
      background: #ffffff;
      border-radius: 3px;
      padding: 20px 16px;
      margin-bottom: 16px;

      .mid-title {
        margin: 0 0 28px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }

      .mb28 {
        margin-bottom: 28px;
      }

      .mid-cont {
        .mid-box {
          display: flex;
          align-items: center;
          .box-left {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 5px;
            .icon {
              cursor: pointer;
              width: 43px;
              height: 43px;
            }
          }

          .box-right {
            p {
              margin: 0;
            }
            .right-t {
              cursor: pointer;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              margin-bottom: 5px;
              //&:hover {
              //  color: #4D6DDA;
              //}
              &.active {
                color: #4d6dda;
              }
            }

            .hasAuth {
              color: #4d6dda;
            }

            .right-s {
              font-size: 12px;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }

    .bot {
      //width: 400px;
      background: #ffffff;
      border-radius: 3px;
      padding: 20px 16px;
      .bot-title {
        margin: 0 0 28px;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }

      ::v-deep .el-collapse-item__header {
        border-bottom-color: transparent;
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }

      .el-collapse {
        border: none;
      }

      ::v-deep .el-collapse-item__wrap {
        border: none;
      }

      ::v-deep .el-collapse-item__content {
        padding-bottom: 0;
        cursor: pointer;
        p {
          font-size: 18px;
          font-weight: 400;
          color: #999999;
          margin: 0;
        }
      }
      ::v-deep .el-collapse-item__arrow {
        &:before {
          content: "\e790";
        }
      }

      ::v-deep .el-collapse-item__arrow.is-active {
        transform: rotate(180deg);
      }
    }
  }
}

.personal-main {
  width: calc(100% - 368px);
  background-color: #ffffff;
}

.hasRejectd {
  color: crimson !important;
}
</style>
