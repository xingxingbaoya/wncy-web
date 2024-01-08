<template>
  <div class="login-container">
    <el-row class="login-inner">
      <el-col :span="12" class="login-left">
        <img src="../../assets/img/login/login-bg2.png" class="bg" />
      </el-col>
      <el-col :span="12" class="login-right">
        <el-tabs v-model="loginType" stretch @tab-click="tabChange">
          <el-tab-pane label="手机号登录" name="smsLogin">
            <el-form
              ref="loginForm1"
              :model="loginForm1"
              :rules="loginRules1"
              class="login-form"
              auto-complete="on"
            >
              <el-row class="form-layout">
                <el-col :span="24">
                  <el-form-item prop="telephone">
                    <el-input
                      v-model="loginForm1.telephone"
                      placeholder="请输入手机号"
                      maxlength="11"
                      auto-complete="on"
                      @focus="addClass"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="validateCode" class="phone-code">
                    <el-input
                      v-model="loginForm1.validateCode"
                      placeholder="手机验证码"
                      maxlength="13"
                      auto-complete="on"
                    >
                      <template slot="append"
                        ><el-button
                          :disabled="disabled"
                          @click="getMsgCode(loginForm1)"
                          >{{ codeBtn }}</el-button
                        ></template
                      >
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24" class="clause">
                  <el-form-item />
                  <el-form-item />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button
                    class="go-regist"
                    @keyup.enter.native="handLogin('loginForm1')"
                    @click.native.prevent="handLogin('loginForm1')"
                    >立即登录</el-button
                  >
                </el-col>
                <el-col :span="24">
                  <p class="other-login">
                    <span class="go-register" @click="goregist">快速注册</span>
                  </p>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账号登录" name="passLogin">
            <el-form
              ref="loginForm2"
              :model="loginForm2"
              :rules="loginRules2"
              class="login-form"
              auto-complete="on"
            >
              <el-row class="form-layout">
                <el-col :span="24">
                  <el-form-item prop="userName">
                    <el-input
                      v-model="loginForm2.userName"
                      placeholder="请输入用户名"
                      maxlength="30"
                      auto-complete="on"
                    >
                      <template slot="prepend">
                        <svg-icon icon-class="r1" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input
                      v-model="loginForm2.password"
                      placeholder="请输入密码"
                      type="password"
                      show-password
                    >
                      <template slot="prepend">
                        <svg-icon icon-class="r2" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="24" class="clause">
                  <el-form-item>
                    <el-checkbox v-model="isRember">记住密码</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <span class="forget" @click="goforget">忘记密码？</span>
                  </el-form-item>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button
                    class="go-regist"
                    @keyup.enter.native="handLogin('loginForm2')"
                    @click.native.prevent="handLogin('loginForm2')"
                    >立即登录</el-button
                  >
                </el-col>
                <el-col :span="24">
                  <p class="other-login">
                    <span class="go-register" @click="goregist">快速注册</span>
                  </p>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-layout"
      top="10vh"
    >
      <iframe
        v-if="dialogVisible"
        :src="url"
        frameborder="0"
        scrolling="no"
        class="iframe-layout"
      />
    </el-dialog>
  </div>
</template>

<script>
import { sendValidateCode } from "@/api/register";
import common from "@/mixin/common";
import { getUser, removeUser, setUser } from "@/utils/auth";
import { validatePassword, validateUsername } from "@/utils";
import { generateCaptcha } from "@/api/user";

export default {
  name: "Login",
  mixins: [common],
  data() {
    return {
      loginForm1: {
        telephone: "",
        validateCode: "",
      },
      loginForm2: {
        userName: "",
        password: "",
        captchaId: "",
        validateCode: "",
      },
      loginRules1: {
        telephone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
        ],
        validateCode: [
          { required: true, message: "请填写验证码", trigger: "change" },
        ],
      },
      loginRules2: {
        userName: [
          { required: true, message: "请填写用户名", trigger: "blur" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        validateCode: [
          { required: true, message: "请填写验证码", trigger: "blur" },
        ],
      },
      CaptchaImage: "",
      isRember: false,
      time: 60,
      codeBtn: "发送验证码",
      loginType: "smsLogin",
      disabled: false,
      dialogVisible: false,
    };
  },
  computed: {
    url() {
      // return process.env.VUE_APP_CDN_URL + 'agree.pdf#toolbar=0'
      return "/agree.pdf#toolbar=0";
    },
  },
  mounted() {
    this.$refs?.CaptchaImage?.click();
  },
  methods: {
    addClass() {
      console.log("focus");
    },
    handLogin(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.isRember) {
            setUser({
              ..._.omit(this[form], ["validateCode"]),
              isRember: this.isRember,
            });
          } else {
            removeUser();
          }
          this.$store
            .dispatch("user/login", {
              ...this[form],
              loginType: this.loginType,
            })
            .then(async (obj) => {
              await this.$store.dispatch("user/getInfo");
              this.$router.push({
                path: "/",
              });
            })
            .catch((error) => {
              this.$message.error(error.message);
            })
            .finally((obj) => {
              this.$refs?.CaptchaImage?.click();
              this.loading = false;
            });
        } else {
          debugger;
          return false;
        }
      });
    },
    timer() {
      if (this.time > 1) {
        this.disabled = true;
        this.time--;
        this.codeBtn = this.time + "秒";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 5;
        this.codeBtn = "发送验证码";
        this.disabled = false;
      }
    },
    getMsgCode(form) {
      const { telephone } = form;
      if (_.isEmpty(telephone)) return this.$message.warning("请输入手机号");
      sendValidateCode({ phoneNumber: telephone })
        .then((res) => {
          if (res.code == "0000") {
            this.timer();
            this.$message.success(res.msg);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch((e) => {})
        .finally(() => {});
    },
    getCaptcha() {
      generateCaptcha()
        .then((res) => {
          if (res.code == "0000") {
            const { captchaId, img } = res.obj;
            this.CaptchaImage = this.CaptchaPrefix + img;
            this.loginForm2.captchaId = captchaId;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally();
    },
    goregist() {
      this.$router.push({
        path: "/register",
      });
    },
    goforget() {
      this.$router.push({
        path: "/forget",
      });
    },
    tabChange(tab) {
      this.$refs["loginForm1"]?.resetFields();
      this.$refs["loginForm2"]?.resetFields();
      const user = getUser() ?? {};
      this.loginForm2 = _.merge(this.loginForm2, user);
      this.isRember = user.isRember;
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/img/login/login-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  .login-inner {
    margin: auto;
    height: 800px;
    width: 1450px;
    background-size: cover;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -2px 0px 21px 0px rgba(190, 190, 190, 0.56);
    .login-left {
      height: 800px;
      position: relative;
      background-image: url($backgroundImgURL + "/login-bg1.png");
      //justify-content: space-around;
      overflow: hidden;

      .logo {
        height: 51px;
        object-fit: cover;
        position: absolute;
        left: 47px;
        top: 52px;
      }
      .bg {
        object-fit: contain;
        display: block;
        width: 100%;
        height: 100%;
        transform: scale(1.2);
      }
    }
  }

  .login-right {
    height: 800px;
    background: #ffffff;
    border-radius: 0 8px 8px 0;
    //padding: 80px 50px 0;
    padding: 40px 50px 20px;
    ::v-deep .el-tabs__item {
      padding: 20px 0px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      height: auto;
      &.is-active {
        color: #516fd2;
        font-weight: 600;
      }
    }

    ::v-deep .el-tabs__active-bar {
      // background-color: #516fd2;
      background-color: transparent;
      //transform: translateX(0) !important;
      //width: 50% !important;
      //width: 200px !important;
    }

    ::v-deep .el-tabs__nav-wrap::after {
      height: 0;
    }

    ::v-deep .el-tabs__header {
      background-color: #ffffff;
      padding: 0 75px;
    }
  }

  .company-right {
    padding: 40px 50px 20px;
  }

  .login-form {
    position: relative;
    width: 490px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    ::v-deep .el-input {
      border: 1px solid #9b9b9b;
      border-radius: 30px;
      height: 61px;
      display: flex;
      align-items: center;
      padding: 0px 30px 0px 10px;
    }
    ::v-deep .el-input-group__prepend .svg-icon {
      transform: translateX(-12px);
    }
    ::v-deep .el-input__inner {
      border: none;
      font-size: 18px;
    }

    ::v-deep .el-input__inner::placeholder {
      font-size: 18px;
      font-weight: 400;
      color: #aaaaaa;
    }

    ::v-deep .el-form-item__content {
      // border-bottom: 2px solid #DFDFDF;
      padding-bottom: 5px;
    }

    ::v-deep .el-form-item {
      margin-bottom: 36px;
    }

    ::v-deep .el-input-group__prepend {
      border: none;
      background-color: #ffffff;
      position: relative;

      .svg-icon {
        width: 25px;
        height: 25px;
      }
      &:after {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        content: "";
        display: block;
        height: 50%;
        width: 2px;
        background: #dfdfdf;
      }
    }

    ::v-deep .el-input-group__append {
      border: none;
      background-color: #ffffff;
      position: relative;
      font-size: 18px;
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        content: "";
        display: block;
        height: 50%;
        width: 2px;
        background: #dfdfdf;
      }
    }

    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
    ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #516fd2;
      border-color: #516fd2;
    }

    ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #516fd2;
    }

    ::v-deep .el-checkbox {
      color: #aaaaaa;
    }

    .msg-code {
      ::v-deep .el-input-group__append {
        cursor: pointer;
        img {
          height: 30px;
          width: 105px;
        }
        &:before {
          //width: 0;
        }
      }
    }
    .phone-code {
      //margin-bottom: 2px !important;
      :deep .el-input {
        padding-right: 80px;
      }
    }

    .clause {
      color: #aaaaaa;
      display: flex;
      justify-content: space-between;
      ::v-deep .el-form-item__content {
        border-bottom: none;
      }

      .forget {
        cursor: pointer;
      }
    }
    .regist-btn {
      display: flex;
      justify-content: center;
    }
    .go-regist {
      width: 284px;
      height: 56px;
      background: #4d6dda;
      box-shadow: 0px 0px 16px 0px rgba(77, 109, 218, 0.34);
      border-radius: 27px;
      font-size: 18px;
      font-weight: 400;
      color: #ffffff;
    }

    .other-login {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.5;
      color: #666666;
      display: flex;
      justify-content: center;
      position: relative;
      margin-top: 60px;
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 4px;
        background: #eee;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .go-register {
        color: #4d6dda;
        cursor: pointer;
        width: 160px;
        display: block;
        width: 100px;
        background: #fff;
        z-index: 2;
      }
    }

    ::v-deep .el-form-item__error {
      font-size: 14px;
    }
  }

  .login-form2 {
    ::v-deep .el-form-item__content {
      border-bottom: 2px solid #dfdfdf;
      padding-bottom: 0;
    }

    .el-cascader {
      width: 100%;
    }
  }

  .dialog-layout {
    //::v-deep .el-dialog__body {
    //  height: 1500px;
    //}
  }
}

.iframe-layout {
  width: 100%;
  height: 650px;
}

.form-layout {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
