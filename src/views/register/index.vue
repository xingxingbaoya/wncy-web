<template>
  <el-main class="login-container">
    <el-row v-loading="loading" class="login-inner">
      <el-col :span="12" class="login-left">
        <img :src="`${imgUrl}/long-logo.png`" class="logo">
        <img :src="`${imgUrl}/login-bg2.png`" class="bg">
      </el-col>
      <el-col :span="12" class="login-right" :class="{'company-right':activeName == 'loginForm2'}">
        <el-tabs v-model="activeName" stretch @tab-click="paneChange">
          <el-tab-pane label="个人注册" name="loginForm1">
            <el-form ref="loginForm1" :model="loginForm1" :rules="loginRules1" class="login-form" auto-complete="on">
              <el-row class="form-layout">
                <el-col :span="24">
                  <el-form-item prop="userName">
                    <el-input v-model="loginForm1.userName" placeholder="请输入用户名" auto-complete="on" maxlength="15">
                      <template slot="prepend">
                        <svg-icon icon-class="r1" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input v-model="loginForm1.password" placeholder="请输入密码" type="password" show-password>
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
                  <el-form-item prop="phone">
                    <el-input v-model="loginForm1.phone" placeholder="请输入手机号" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r3" />
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
                  <el-form-item class="phone-code" prop="phoneValidateCode">
                    <el-input v-model="loginForm1.phoneValidateCode" placeholder="手机验证码" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r5" />
                      </template>
                      <template slot="append"><el-button :disabled="disabled" @click="getMsgCode(loginForm1)">{{ codeBtn }}</el-button></template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item class="clause">
                    <el-checkbox v-model="isAgreed">我已阅读同意<span class="clause-text" @click="dialogVisible = true">《相关服务条款》</span></el-checkbox>
                  </el-form-item>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button class="go-regist" @click="companyRegist('loginForm1')">立即注册</el-button>
                </el-col>
                <el-col :span="24">
                  <p class="other-login">已有账号,<span class="go-login" @click="gologin">立即登录</span></p>
                </el-col>
              </el-row>

            </el-form>
          </el-tab-pane>
          <el-tab-pane label="企业注册" name="loginForm2">
            <el-form ref="loginForm2" :model="loginForm2" :rules="loginRules2" class="login-form login-form2" auto-complete="on">
              <el-row class="form-layout">
                <el-col :span="24">
                  <el-form-item prop="userName">
                    <el-input v-model="loginForm2.userName" placeholder="请输入用户名" auto-complete="on" maxlength="15">
                      <template slot="prepend">
                        <svg-icon icon-class="r1" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input v-model="loginForm2.password" placeholder="请输入密码" type="password" show-password>
                      <template slot="prepend">
                        <svg-icon icon-class="r2" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="confirmpassword">
                    <el-input v-model="loginForm2.confirmpassword" placeholder="确认密码" type="password" show-password>
                      <template slot="prepend">
                        <svg-icon icon-class="r2" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="phone">
                    <el-input v-model="loginForm2.phone" placeholder="请输入手机号" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r3" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item class="msg-code" prop="validateCode">
                    <el-input v-model="loginForm2.validateCode" placeholder="请输入验证码" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r4" />
                      </template>
                      <template slot="append"><img ref="CaptchaImage" :src="CaptchaImage" @click="getCaptcha"></template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="phoneValidateCode">
                    <el-input v-model="loginForm2.phoneValidateCode" placeholder="手机验证码" maxlength="13" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r5" />
                      </template>
                      <template slot="append"><el-button :disabled="disabled" @click="getMsgCode(loginForm2)">{{ codeBtn }}</el-button></template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="nickName">
                    <el-input v-model="loginForm2.nickName" placeholder="请输入公司名称" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r6" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="companyType">
                    <div class="el-input el-input-group el-input-group--prepend">
                      <div class="el-input-group__prepend">
                        <svg-icon icon-class="r7" />
                      </div>
                      <el-select v-model="loginForm2.companyType" placeholder="请选择公司类型">
                        <el-option
                          v-for="item in companyTypeDict"
                          :key="item.dictCode"
                          :label="item.dictLabel"
                          :value="item.dictValue"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="fulladdress">
                    <div class="el-input el-input-group el-input-group--prepend">
                      <div class="el-input-group__prepend">
                        <svg-icon icon-class="r7" />
                      </div>
                      <el-cascader
                        v-model="loginForm2.fulladdress"
                        :options="cityList"
                        :props="optionProps"
                        placeholder="请选择公司地址"
                      />
                    </div>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="address" class="phone-code">
                    <el-input v-model="loginForm2.address" placeholder="请输入详细公司地址" auto-complete="on">
                      <template slot="prepend">
                        <svg-icon icon-class="r8" />
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item class="clause">
                    <el-checkbox v-model="isAgreed">我已阅读同意<span class="clause-text" @click="dialogVisible = true">《相关服务条款》</span></el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button class="go-regist" @click="companyRegist('loginForm2')">立即注册</el-button>
                </el-col>
                <el-col :span="24">
                  <p class="other-login">已有账号,<span class="go-login" @click="gologin">立即登录</span></p>
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
      <iframe v-if="dialogVisible" :src="url" frameborder="0" scrolling="no" class="iframe-layout" />
    </el-dialog>

  </el-main>
</template>

<script>
import city from '@/assets/city/city_code.json'
import { sendValidateCode } from '@/api/register'
import common from '@/mixin/common'
import { validatePassword, validateUsername } from '@/utils'
import { generateCaptcha } from '@/api/user'

export default {
  name: 'Register',
  mixins: [common],
  data() {
    return {
      loginForm1: {
        userType: '1',
        userName: '',
        password: '',
        captchaId: '',
        confirmpassword: '',
        phoneValidateCode: '',
        phone: '',
        validateCode: ''
      },
      loginForm2: {
        userType: '2',
        captchaId: '2',
        userName: '',
        password: '',
        confirmpassword: '',
        phoneValidateCode: '',
        phone: '',
        validateCode: '',
        nickName: '',
        companyType: '',
        fulladdress: '',
        province: '',
        city: '',
        area: '',
        address: ''
      },
      loginRules1: {
        userName: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmpassword: [{ required: true, trigger: 'blur', message: '请输入确认密码' }],
        phoneValidateCode: [{ required: true, trigger: 'blur', message: '请输入手机验证码' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        validateCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loginRules2: {
        userName: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        confirmpassword: [{ required: true, trigger: 'blur', message: '请输入确认密码' }],
        phoneValidateCode: [{ required: true, trigger: 'blur', message: '请输入手机验证码' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入手机号' }],
        validateCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        nickName: [{ required: true, trigger: 'blur', message: '请输入公司名称' }],
        companyType: [{ required: true, trigger: 'blur', message: '请选择公司类型' }],
        fulladdress: [{ required: true, trigger: 'blur', message: '请选择公司地址' }],
        address: [{ required: true, trigger: 'blur', message: '请输入详细地址' }]
      },
      activeName: 'loginForm1',
      isAgreed: false,
      disabled: false,
      CaptchaImage: '',
      time: 60,
      codeBtn: '发送验证码',
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'city'
      },
      dialogVisible: false
    }
  },
  computed: {
    url() {
      return process.env.VUE_APP_CDN_URL + 'smimg.pdf#toolbar=0'
    }
  },
  mounted() {
    this.$refs?.CaptchaImage?.click()
  },
  methods: {
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
          this.loginForm2.captchaId = captchaId
          this.loginForm1.captchaId = captchaId
        } else {
          this.$message.warning(res.msg)
        }
      }).finally()
    },
    companyRegist(form) {
      const [province, city, area] = this[form]?.fulladdress ?? []
      if (this[form].password != this[form].confirmpassword) {
        return this.$message.warning('确认密码不一致,请重新输入')
      }

      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.isAgreed) {
            return this.$message.warning('请先同意相关服务条款')
          }
          this.loading = true
          this.$store.dispatch('user/register', { ...this[form], province, city, area }).then((res) => {
            this.$message.success(res.msg)
            this.$router.push({ path: '/login' })
          }).catch(e => {}).finally(() => {
            this.loading = false
            this.$refs?.CaptchaImage?.click()
          })
        } else {
          return false
        }
      })
    },
    gologin() {
      this.$router.push({
        path: '/login'
      })
    },
    paneChange(tab, event) {
      this.$refs['loginForm1']?.resetFields()
      this.$refs['loginForm2']?.resetFields()
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
  padding-top: 0;
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

      .logo {
        //width: 509px;
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
    /*padding: 100px 50px;*/
    padding: 40px 50px 20px;
    ::v-deep .el-tabs__item {
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
      background-color: #516FD2;
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

  .company-right {
    padding: 40px 50px 20px;
  }

  .login-form {
    position: relative;
    width: 490px;
    max-width: 100%;
    margin: 0 auto;
    //overflow: hidden;
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
      padding-bottom: 0;
    }

    ::v-deep .el-form-item {
      //margin-bottom: 16px;
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

    .el-form-item.phone-code {
      //margin-bottom: 2px !important;
    }

    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #516FD2;
      border-color: #516FD2;
    }

    .clause {
      color: #AAAAAA;
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
      /*height: 56px;*/
      background: #4D6DDA;
      box-shadow: 0px 0px 16px 0px rgba(77, 109, 218, 0.34);
      border-radius: 27px;
      font-size: 18px;
      font-weight: 400;
      color: #FFFFFF;
    }

    .other-login {
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      color: #666666;
      .go-login {
        color: #4D6DDA;
        cursor: pointer;
      }
    }

    ::v-deep .el-form-item__error {
      font-size: 14px;
    }

    .form-layout {
      height: 500px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .login-form2 {
    overflow-y: auto;
    height: 500px;
    ::v-deep .el-form-item__content{
      border-bottom: 2px solid #DFDFDF;
      padding-bottom: 0;
    }

    .el-cascader {
      width: 100%;
    }

    .form-layout {
      height: 750px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

}

.iframe-layout {
  width: 100%;
  height: 600px;
}

</style>
