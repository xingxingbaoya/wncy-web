<template>
  <el-main class="content">
    <div class="wrapper">
      <div class="nav-bread">
        当前位置：首页 > 产研对接 > {{ item.actName }}
      </div>
      <div class="play-content" shadow="never">
        <div class="article-left">
          <div class="play-title">{{ item.actName }}</div>
          <p class="play-status">
            <span class="p-ft_cw">发布人: </span
            ><span class="mr20">{{ item.createTime }}</span>
          </p>
          <div class="box-card-left" shadow="never">
            <div class="box-title">活动介绍</div>
            <div class="text-content">
              <div>活动类型：</div>
              <div>
                {{
                  activityKindDict.filter(
                    (i) => i.defaultValue == item.actClassification
                  )[0] || "未知"
                }}
              </div>
            </div>
            <div class="text-content">
              <div>活动形式：</div>
              <div>{{ item.actWay }}</div>
            </div>
            <div class="text-content">
              <!-- <div>活动预告：</div> -->
              <div></div>
              <div v-html="item.actDetail"></div>
            </div>
          </div>
          <div class="box-card-left" shadow="never">
            <div class="box-title">活动时间</div>
            <div class="text-content">
              <div>{{ item.startTime }}</div>
            </div>
          </div>
        </div>
        <div class="play-right">
          <div style="margin-top: 10px; margin-bottom: 40px;">
            <img width="103px" src="@/assets/img/activityManage/baoming.png" alt="" srcset="" />
          </div>
          <div class="play-right-btn">
            <div class="libm" @click="signUp">立即报名</div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="SignUpDialog"
      custom-class="sign-log"
      width="800px"
      top="8vh"
      @close="closeSignUpDialog"
    >
      <el-row v-loading="loading">
        <el-col :span="10" class="left-img">
          <img :src="`${imgUrl}/login.png`" />
        </el-col>
        <el-col :span="14" class="right-form">
          <div class="right-head">
            <p class="right-title">请填写您的个人信息</p>
            <p class="right-desc">Please fill in your personal information</p>
          </div>
          <el-form
            ref="signUpForm"
            :model="signUpForm"
            :rules="rules"
            class="rform"
          >
            <el-form-item prop="signName">
              <el-input v-model="signUpForm.signName">
                <template slot="prepend">姓名:</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="contactInfo">
              <el-input v-model="signUpForm.contactInfo">
                <template slot="prepend">手机号:</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="companyName">
              <el-input v-model="signUpForm.companyName">
                <template slot="prepend">公司名称:</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="post">
              <el-input v-model="signUpForm.post">
                <template slot="prepend">职位:</template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-row class="sub-layout">
            <el-button
              type="primary"
              class="right-submit"
              :loading="loading"
              @click="signUpSubmit('signUpForm')"
              >确认提交</el-button
            >
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </el-main>
</template>

<script>
import common from "@/mixin/common";
import { getActivityDetail, signUpActivity } from "@/api/activitieshall";

export default {
  name: "Activitieshallsignup",
  mixins: [common],
  data() {
    return {
      SignUpDialog: false,
      signUpForm: {
        signName: "",
        contactInfo: "",
        companyName: "",
        post: "",
      },
      rules: {
        signName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        contactInfo: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        post: [{ required: true, message: "请输入职位", trigger: "blur" }],
      },
      item: {},
    };
  },
  computed: {
    isSignUp() {
      return this.item.signUpEnable == "1";
    },
  },
  methods: {
    signUp() {
      this.SignUpDialog = true;
    },
    signUpSubmit(signUpForm) {
      const { id: actId } = this.$route.query;

      this.$refs[signUpForm].validate((valid) => {
        if (valid) {
          this.loading = true;
          signUpActivity({ ...this.signUpForm, actId })
            .then((res) => {
              if (res.code == "0000") {
                this.$message.success(res.msg);
              } else {
                this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              this.SignUpDialog = false;
              this.loading = false;
              this.$refs[signUpForm]?.resetFields();
            });
        } else {
          return false;
        }
      });
    },
    closeSignUpDialog() {
      this.SignUpDialog = false;
    },
    loadData() {
      const { id } = this.$route.query;
      this.loading = true;
      getActivityDetail({ actId: id })
        .then((res) => {
          console.log(res);
          if (res.code == "0000") {
            this.item = res.obj;
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}

.libm {
  width: 224px;
  height: 47px;
  background: linear-gradient(90deg, #1875f2 0%, #37b9fa 100%);
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  line-height: 47px;
  cursor: pointer;
}
.qxbm {
  cursor: pointer;
  width: 224px;
  height: 47px;
  background: #999999;
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  line-height: 47px;
  text-align: center;
}
.content {
  background: #eee;
  display: flex;
  justify-content: center;
  .wrapper {
    width: pxToVW(1366);
  }
  .nav-bread {
    margin: 80px 0 40px;
  }
  .play-content {
    display: flex;
    margin-bottom: 60px;
    ::v-deep .el-card__body {
      overflow: hidden;
    }
    .article-left {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      background: #fff;
      padding: 20px;
      border-radius: 4px;

      img {
        width: 100%;
        height: 380px;
      }
    }
    .play-right {
      display: flex;
      flex: 1;
      background: #fff;
      flex-direction: column;
      padding: 20px;
      border-radius: 4px;
      height: 260px;
      flex-direction: column;
      align-items: center;
    }

    .play-title {
      width: 100%;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      overflow: hidden; //超出文本隐藏
      text-overflow: ellipsis; ///超出部分省略号显示
      display: -webkit-box; //弹性盒模型
      -webkit-box-orient: vertical; //上下垂直
      -webkit-line-clamp: 2; //自定义行数
    }

    .play-status {
      width: 100%;
      height: 17px;
      font-size: 14px;
      font-weight: 400;
      color: #516fd2;
      margin-bottom: 40px;

      .mr20 {
        margin-right: 200px;
      }
    }

    .play-right-btn {
      display: flex;
      justify-content: center;
    }
    .see {
      /*width: 205px;*/
      padding: 10px 16px;
      border: 2px solid #516fd2;
      border-radius: 4px;
      font-size: 18px;
      font-weight: 400;
      color: #516fd2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .see {
      background: #516fd2;
      color: #ffffff;
      margin-right: 35px;
      .icon {
        width: 50px;
        height: 28px;
        vertical-align: -8px;
      }
    }

    .see-pd {
      margin-right: 10px;
    }
  }
  .box-card-left {
    width: 100%;
    margin-bottom: 20px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
    padding-left: 10px;
    margin: 20px 0px;
    position: relative;
    &::before {
      content: "";
      height: 100%;
      width: 4px;
      background: #1e86f9;
      margin-right: 15px;
      display: block;
      position: absolute;
      left: 0px;
      top: 4px;
    }
  }
}

.text-content {
  color: #333333;
  font-size: 14px;
  padding: 10px 0;
  display: flex;
}

.sign-log {
  border-radius: 3px;
}

::v-deep .el-dialog__header {
  padding: 0;
}

::v-deep .el-dialog__headerbtn {
  font-size: 30px;
  z-index: 999;
}

.el-dialog__headerbtn:focus ::v-deep .el-dialog__close,
.el-dialog__headerbtn:hover ::v-deep .el-dialog__close {
  color: #516fd2 !important;
}

.right-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0 0;

  .right-head {
    width: 400px;
    .right-title {
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin: 0;
      padding-bottom: 20px;
    }
    .right-desc {
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      margin: 0;
    }
  }

  .rform {
    /*height: 400px;*/
  }

  .sub-layout {
    /*padding-top: 20px;*/
  }

  .right-submit {
    width: 199px;
    background: #516fd2;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    padding: 16px 20px;
  }
}

.el-form {
  margin-top: 30px;
  width: 400px;
  ::v-deep .el-input__inner {
    height: 60px;
    background: #f2f3f5;
    border-radius: 0 3px 3px 0;
    border-left: 0;
  }

  ::v-deep .el-input-group__prepend {
    background: #f2f3f5;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  ::v-deep .el-form-item__content {
  }
  ::v-deep .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid,
  .el-message-box__input input.invalid:focus {
    border-color: #dcdfe6;
  }

  ::v-deep .el-input.is-active .el-input__inner,
  ::v-deep .el-input__inner:focus {
    border-color: #dcdfe6 !important;
  }

  ::v-deep .el-form-item {
    margin-bottom: 30px;
  }
}
</style>
