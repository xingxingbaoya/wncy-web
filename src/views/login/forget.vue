<template>
  <div class="login-container">
    <el-row class="login-inner">
      <el-col :span="12" class="login-left">
        <img :src="`${imgUrl}/long-logo.png`" class="logo">
        <img :src="`${imgUrl}/login-bg2.png`" class="bg">
      </el-col>
      <el-col :span="12" class="login-right">
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="找回密码" name="first">
            <el-form ref="loginForm1" :model="loginForm1" :rules="loginRules" class="login-form" auto-complete="on">
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="phone">
                    <el-input v-model="loginForm1.phone" placeholder="请输入手机号" maxlength="13" auto-complete="on" @focus="addClass">
                      <template slot="prepend">
                        <svg-icon icon-class="r3" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input v-model="loginForm1.password" placeholder="请输入新密码" type="password" show-password>
                      <template slot="prepend">
                        <svg-icon icon-class="r2" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="confirmpassword">
                    <el-input v-model="loginForm1.confirmpassword" placeholder="确认密码" type="password" show-password>
                      <template slot="prepend">
                        <svg-icon icon-class="r2" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item class="msg-code" prop="validateCode">
                    <el-input v-model="loginForm1.validateCode" placeholder="请输入验证码" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r4" />
                      </template>
                      <template slot="append"><img ref="CaptchaImage" :src="CaptchaImage" @click="getCaptcha"></template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="phoneValidateCode">
                    <el-input v-model="loginForm1.phoneValidateCode" placeholder="手机验证码" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r5" />
                      </template>
                      <template slot="append"><el-button :disabled="disabled" @click="getMsgCode(loginForm1)">{{ codeBtn }}</el-button></template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button class="go-regist" @click="handleReset('loginForm1')">确认</el-button>
                  <el-button class="go-regist cancel-reset" @click="cancelReset">取消</el-button>
                </el-col>
              </el-row>

            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { sendValidateCode } from '@/api/register'
import common from '@/mixin/common'
import { generateCaptcha, retrievePassword } from '@/api/user'
import { param2Form, validatePassword } from '@/utils'

export default {
  name: 'Forget',
  mixins: [common],
  data() {
    return {
      loginForm1: {
        phone: '',
        validateCode: '',
        phoneValidateCode: '',
        password: '',
        captchaId: '',
        confirmpassword: ''
      },
      loginRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        validateCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        phoneValidateCode: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmpassword: [{ required: true, trigger: 'blur', message: '请输入确认密码' }]
      },
      activeName: 'first',
      CaptchaImage: '',
      isRember: false,
      time: 60,
      codeBtn: '发送验证码',
      disabled: false
    }
  },
  mounted() {
    this.$refs?.CaptchaImage?.click()
  },
  methods: {
    addClass() {
      console.log('focus')
    },
    sureReset(form) {
      if (this[form].password != this[form].confirmpassword) {
        return this.$message.warning('确认密码不一致,请重新输入')
      }

      this.loading = true
      retrievePassword(param2Form(this.loginForm1)).then(res => {
        if (res.code == '0000') {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/login'
          })
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(e => {}).finally(() => {
        this.loading = false
        this.$refs?.CaptchaImage?.click()
      })
    },
    cancelReset() {
      this.$router.push({
        path: '/login'
      })
    },
    handleReset(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          this.sureReset(loginForm)
        } else {
          return false
        }
      })
    },
    timer() {
      if (this.time > 1) {
        this.disabled = true
        this.time--
        this.codeBtn = this.time + '秒'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 5
        this.codeBtn = '发送验证码'
        this.disabled = false
      }
    },
    getMsgCode(form) {
      const { phone } = form
      if (_.isEmpty(phone)) return this.$message.warning('请输入手机号')
      sendValidateCode({ phoneNumber: phone }).then(res => {
        if (res.code == '0000') {
          this.timer()
          this.$message.success(res.msg)
          console.log(res.obj)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {

      })
    },
    getCaptcha() {
      generateCaptcha().then(res => {
        if (res.code == '0000') {
          const { captchaId, img } = res.obj
          this.CaptchaImage = this.CaptchaPrefix + img
          this.loginForm1.captchaId = captchaId
        } else {
          this.$message.warning(res.msg)
        }
      }).finally()
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url($backgroundImgURL + "/login-bg.png");
  background-size: cover;
  background-repeat:no-repeat;
  overflow: hidden;
  .login-inner{
    margin: auto;
    height: 800px;
    width: 1450px;
    background-image: url($backgroundImgURL + "/login-bg1.png");
    background-size: cover;
    background-repeat:no-repeat;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    .login-left {
      height: 800px;
      position: relative;
      //justify-content: space-around;

      .logo {
        height: 51px;
        object-fit: cover;
        position: absolute;
        left: 47px;
        top: 52px;
      }
      .bg {
        object-fit: contain;
        width: 551px;
        height: 800px;
        position: absolute;
        right: 50px;
        top: 0;
      }

    }
  }

  .login-right {
    height: 800px;
    background: #FFFFFF;
    border-radius: 8px;
    //padding: 80px 50px 0;
    padding: 40px 50px 20px;
    ::v-deep .el-tabs__item {
      text-align: left;
      padding: 20px 0px;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
      height: auto;
      &.is-active {
        color: #516FD2;
        font-weight: 600;
      }
    }

    ::v-deep .el-tabs__active-bar {
      background-color: transparent;
      //transform: translateX(0) !important;
      //width: 50% !important;
      //width: 200px !important;
    }

    ::v-deep .el-tabs__nav-wrap::after {
      height: 0;
    }

    ::v-deep .el-tabs__header {
      background-color: #FFFFFF;
      padding: 0 75px;
    }
  }

  .msg-code {
    ::v-deep .el-input-group__append {
      img {
        height: 30px;
        width: 105px;
      }
      &:before {
        //width: 0;
      }
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
    ::v-deep .el-input__inner {
      border: none;
    }

    ::v-deep .el-input__inner::placeholder {
      font-size: 18px;
      font-weight: 400;
      color: #AAAAAA;
    }

    ::v-deep .el-input__inner {
      font-size: 18px;
    }

    ::v-deep .el-form-item__content{
      border-bottom: 2px solid #DFDFDF;
      padding-bottom: 5px;
    }

    ::v-deep .el-form-item {
      margin-bottom: 36px;
    }

    ::v-deep .el-input-group__prepend {
      border: none;
      background-color: #FFFFFF;
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
        content: '';
        display: block;
        height: 50%;
        width: 2px;
        background: #DFDFDF;
      }
    }

    ::v-deep .el-input-group__append {
      border: none;
      background-color: #FFFFFF;
      position: relative;
      font-size: 18px;
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        content: '';
        display: block;
        height: 50%;
        width: 2px;
        background: #DFDFDF;
      }
    }

    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #516FD2;
      border-color: #516FD2;
    }

    ::v-deep .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #516FD2;
    }

    ::v-deep .el-checkbox {
      color: #AAAAAA;
    }

    .clause {
      color: #AAAAAA;
      display: flex;
      justify-content: space-between;
      ::v-deep .el-form-item__content {
        border-bottom: none;
      }
    }
    .regist-btn {
      display: flex;
      justify-content: center;
    }
    .go-regist {
      width: 284px;
      height: 56px;
      background: #4D6DDA;
      box-shadow: 0px 0px 16px 0px rgba(77, 109, 218, 0.34);
      border-radius: 27px;
      font-size: 18px;
      font-weight: 400;
      color: #FFFFFF;
    }

    .cancel-reset {
      background: #DDDDDD;
      color: #999999;
    }

    .other-login {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      line-height: 1.5;
      color: #666666;
      .go-register {
        color: #4D6DDA;
        cursor: pointer;
      }
    }

    ::v-deep .el-form-item__error {
      font-size: 14px;
    }
  }

  .login-form2 {
    ::v-deep .el-form-item__content{
      border-bottom: 2px solid #DFDFDF;
      padding-bottom: 0;
    }

    .el-cascader {
      width: 100%;
    }
  }

}

.iframe-layout {
  width: 100%;
  height: 650px;
}

.form-layout {
  height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
