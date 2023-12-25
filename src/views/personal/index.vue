<template>
  <el-main>
    <el-row class="main-cont">
      <div class="left">
        <div class="top" @click="goedit">
          <img v-if="item.avatar" :src="item.avatar" alt="">
          <svg-icon v-else icon-class="avatar" class-name="avatar" />
          <p>{{ item.userName }}</p>
          <!--          <p>{{ item.phone }}</p>-->
        </div>
        <div class="mid">
          <p class="mid-title">认证中心</p>
          <el-row class="mid-cont">
            <el-col class="mid-box mb28" :span="12">
              <div class="box-left">
                <svg-icon icon-class="c1" class-name="icon" @click="goexperts(item)" />
              </div>
              <div class="box-right">
                <p class="right-t" :class="{'hasAuth':hasAuth(item,'4')}" @click="goexperts(item)">专家认证</p>
                <p class="right-s" :class="{'hasRejectd':hasRejectd(item,'4')}">{{ authStatus(item,'4') }}</p>
              </div>
            </el-col>
            <el-col class="mid-box mb28" :span="12">
              <div class="box-left">
                <svg-icon icon-class="c2" class-name="icon" @click="gomanger(item)" />
              </div>
              <div class="box-right">
                <p class="right-t" :class="{'hasAuth':hasAuth(item,'5')}" @click="gomanger(item)">技术经理人认证</p>
                <p class="right-s" :class="{'hasRejectd':hasRejectd(item,'5')}">{{ authStatus(item,'5') }}</p>
              </div>
            </el-col>
            <el-col class="mid-box" :span="12">
              <div class="box-left">
                <svg-icon icon-class="c3" class-name="icon" @click="gocompany(item)" />
              </div>
              <div class="box-right">
                <p class="right-t" :class="{'hasAuth':hasAuth(item,'2')}" @click="gocompany(item)">企业认证</p>
                <p class="right-s" :class="{'hasRejectd':hasRejectd(item,'2')}">{{ authStatus(item,'2') }}</p>
              </div>
            </el-col>
            <el-col class="mid-box" :span="12">
              <div class="box-left">
                <svg-icon icon-class="c4" class-name="icon" @click="goorg(item)" />
              </div>
              <div class="box-right">
                <p class="right-t" :class="{'hasAuth':hasAuth(item,'3')}" @click="goorg(item)">机构认证</p>
                <p class="right-s" :class="{'hasRejectd':hasRejectd(item,'3')}">{{ authStatus(item,'3') }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="bot">
          <p class="bot-title">与我相关</p>
          <el-collapse v-model="activeNames" accordion @change="handleChange">
            <el-collapse-item title="项目大厅" name="1">
              <router-link to="/personal/center/search-project" tag="p">我发布的项目</router-link>
            </el-collapse-item>
            <el-collapse-item title="需求大厅" name="2">
              <router-link to="/personal/center/search-demand" tag="p">我发布的需求</router-link>
            </el-collapse-item>
            <el-collapse-item title="活动大厅" name="3">
              <router-link to="/personal/center/search-activit" tag="p">我报名的活动</router-link>
            </el-collapse-item>
            <el-collapse-item v-if="!isProd" title="论坛大厅" name="4">
              <router-link to="/personal/center/search-bbs" tag="p">我的专栏投稿</router-link>
              <router-link to="/personal/center/search-question" tag="p">我的科技问答</router-link>
              <router-link to="/personal/center/search-ask" tag="p">我的评论</router-link>
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
import common from '@/mixin/common'
import { mapGetters } from 'vuex'

export default {
  name: 'Personal',
  mixins: [common],
  data() {
    return {
      activeNames: ''
    }
  },
  computed: {
    ...mapGetters([
      'item'
    ]),
    isProd() {
      return process.env.VUE_APP_MODE == 'prod'
    },
    key() {
      return this.$route.path
    },
    authStatus() {
      const sp = {
        '0': '未认证',
        '1': '待审核',
        '2': '已认证',
        '3': '已驳回'
      }
      return ({ userType, status }, ut) => {
        console.log(userType, status, ut)
        if (userType == ut) {
          return sp[status]
        } else {
          return '未认证'
        }
      }
    },
    hasAuth() {
      return ({ userType, status }, ut) => {
        return userType == ut && status == 2
      }
    },
    hasRejectd() {
      return ({ userType, status }, ut) => {
        return userType == ut && status == 3 || userType == ut && status == 1
      }
    }
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
      console.log(val)
    },
    isCanAuth({ authType, status, userType }, authFlag, authUser) {
      console.log(authType, status, userType)
      if (authType != authFlag) {
        return authType == '2'
      } else {
        return userType == '1' || status == '3'
      }
    },
    goedit(item) {
      this.$router.push({
        path: '/personal/center/edit'
      })
    },
    goexperts(item) {
      if (this.isCanAuth(item, '0', '4')) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: '/personal/center/rejected'
          })
        } else {
          this.$router.push({
            path: '/personal/center/edit-experts'
          })
        }
      } else {
        if (item.userType == 4) {
          if (item.status == 2) {
            this.$router.push({
              path: '/personal/center/experts'
            })
          } else if (item.status == 1) {
            this.$message.warning('已认证技术专家,待审核')
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning('已认证角色')
          } else {
            this.$message.warning('只允许个人用户认证')
          }
        }
      }
    },
    gocompany(item) {
      if (this.isCanAuth(item, '1', '2')) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: '/personal/center/rejected'
          })
        } else {
          this.$router.push({
            path: '/personal/center/edit-company'
          })
        }
      } else {
        if (item.userType == 2) {
          if (item.status == 2) {
            this.$router.push({
              path: '/personal/center/company'
            })
          } else if (item.status == 1) {
            this.$message.warning('已认证企业,待审核')
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning('已认证角色')
          } else {
            this.$message.warning('只允许企业用户认证')
          }
        }
      }
    },
    goorg(item) {
      if (this.isCanAuth(item, '1', '3')) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: '/personal/center/rejected'
          })
        } else {
          this.$router.push({
            path: '/personal/center/edit-org'
          })
        }
      } else {
        if (item.userType == 3) {
          if (item.status == 2) {
            this.$router.push({
              path: '/personal/center/org'
            })
          } else if (item.status == 1) {
            this.$message.warning('已认证机构,待审核')
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning('已认证角色')
          } else {
            this.$message.warning('只允许企业用户认证')
          }
        }
      }
    },
    gomanger(item) {
      if (this.isCanAuth(item, '0', '5')) {
        if (item.status == 3 || item.status == 1) {
          this.$router.push({
            path: '/personal/center/rejected'
          })
        } else {
          this.$router.push({
            path: '/personal/center/edit-manger'
          })
        }
      } else {
        if (item.userType == 5) {
          if (item.status == 2) {
            this.$router.push({
              path: '/personal/center/manger'
            })
          } else if (item.status == 1) {
            this.$message.warning('已认证技术经理人,待审核')
          }
        } else {
          if (item.status == 2 && item.userType != 1) {
            this.$message.warning('已认证角色')
          } else {
            this.$message.warning('只允许个人用户认证')
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main-cont{
    margin-top: 120px;
  padding: 0 calc((100% - 1245px) / 2) 38px;
    display: flex;
    align-items: stretch;
    .left {
      width: 350px;
      margin-right: 18px;
      .top {
        pointer-events:none;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        //width: 400px;
        height: 180px;
        background: #FFFFFF;
        border-radius: 3px;
        padding: 20px;
        margin-bottom: 16px;

        img,.avatar {
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
          pointer-events:auto;
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
        background: #FFFFFF;
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
                  color: #4D6DDA;
                }

              }

              .hasAuth {
                color: #4D6DDA;
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
        background: #FFFFFF;
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
    //height: 900px;
    background-color: #FFFFFF;
  }

  .hasRejectd {
    color: crimson !important;
  }

</style>
