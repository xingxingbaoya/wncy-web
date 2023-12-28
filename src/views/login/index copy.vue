<template>
  <div class="login-container">
    <div class="login-inner">
      <div class="login-denglu">
        登 录
      </div>
      <span style="color: #72727E;">中关村产研对接数字化服务平台管理后台</span>
            <el-form ref="loginForm2" :model="loginForm2" :rules="loginRules2" class="login-form" auto-complete="on">
              <el-row class="form-layout">
                <el-col :span="24">
                  <el-form-item prop="userName" label="用户名">
                    <el-input v-model="loginForm2.userName" placeholder="请输入用户名" maxlength="30" auto-complete="on">
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item prop="password" label="密码">
                    <el-input v-model="loginForm2.password" placeholder="请输入密码" type="password" show-password>
                    </el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="16">
                  <el-form-item class="msg-code" prop="validateCode" label="验证码">
                    <el-input v-model="loginForm2.validateCode" placeholder="请输入验证码" maxlength="13" auto-complete="on"/>
                  </el-form-item>
                </el-col>
                <el-Col :span="4">
                  <el-form-item>
                    <img ref="CaptchaImage" :src="CaptchaImage" @click="getCaptcha">
                  </el-form-item>
                </el-Col>
              </el-row>
              <el-row>
                <el-col :span="24" class="regist-btn">
                  <el-button class="go-regist" @keyup.enter.native="handLogin('loginForm2')" @click.native.prevent="handLogin('loginForm2')">立即登录</el-button>
                </el-col>
              </el-row>
            </el-form>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-layout"
      top="10vh"
    >
      <iframe v-if="dialogVisible" :src="url" frameborder="0" scrolling="no" class="iframe-layout" />
    </el-dialog>
  </div>
</template>

<script>
import { sendValidateCode } from '@/api/register'
import common from '@/mixin/common'
import { getUser, removeUser, setUser } from '@/utils/auth'
import { validatePassword, validateUsername } from '@/utils'
import { generateCaptcha } from '@/api/user'

export default {
  name: 'Login',
  mixins: [common],
  data() {
    return {
      loginForm1: {
        telephone: '',
        validateCode: ''
      },
      loginForm2: {
        userName: '',
        password: '',
        captchaId: '',
        validateCode: ''
      },
      loginRules1: {
        telephone: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        validateCode: [{ required: true, message: '请填写验证码', trigger: 'change' }]
      },
      loginRules2: {
        userName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        validateCode: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
      },
      CaptchaImage: '',
      isRember: false,
      time: 60,
      codeBtn: '发送验证码',
      loginType: 'smsLogin',
      disabled: false,
      dialogVisible: false
    }
  },
  computed: {
    url() {
      // return process.env.VUE_APP_CDN_URL + 'agree.pdf#toolbar=0'
      return '/agree.pdf#toolbar=0'
    }
  },
  mounted() {
    this.$refs?.CaptchaImage?.click()
  },
  methods: {
    addClass() {
      console.log('focus')
    },
    handLogin(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.isRember) {
            setUser({ ..._.omit(this[form], ['validateCode']), isRember: this.isRember })
          } else {
            removeUser()
          }
          this.$store.dispatch('user/login', { ...this[form], loginType: this.loginType })
            .then(async(obj) => {
              await this.$store.dispatch('user/getInfo')
              this.$router.push({
                path: '/'
              })
            }).finally(() => {
            this.$refs?.CaptchaImage?.click()
            this.loading = false
            })
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
      const { telephone } = form
      if (_.isEmpty(telephone)) return this.$message.warning('请输入手机号')
      sendValidateCode({ phoneNumber: telephone }).then(res => {
        if (res.code == '0000') {
          this.timer()
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      }).catch(e => {}).finally(() => {

      })
    },
    getCaptcha() {
      generateCaptcha().then(res => {
        if (res.code == '0000') {
          const { captchaId, img } = res.obj
          this.CaptchaImage = this.CaptchaPrefix + img
          this.loginForm2.captchaId = captchaId
        } else {
          this.$message.warning(res.msg)
        }
      }).finally()
    },
    goregist() {
      this.$router.push({
        path: '/register'
      })
    },
    goforget() {
      this.$router.push({
        path: '/forget'
      })
    },
    tabChange(tab) {
      this.$refs['loginForm1']?.resetFields()
      this.$refs['loginForm2']?.resetFields()
      const user = getUser() ?? {}
      this.loginForm2 = _.merge(this.loginForm2, user)
      this.isRember = user.isRember
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
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.login-container {
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-image: url("~img/login.png");
  background-size: 100% 100%;
  background-repeat:no-repeat;
  overflow: hidden;
  .login-inner{
    margin-left: pxToVW(1020);
    // background-color: #fff;
    background-image: url("~img/login-back.png");
    background-size: 100% ;
    background-repeat:no-repeat;
    width: pxToVW(664);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    padding: 100px 0;

    .login-denglu {
      font-size: 44px;
      font-weight: 400;
      color: #121213;
      margin-bottom: 18px;
    }
  }

  .login-right {
    height: 800px;
    background: #FFFFFF;
    border-radius: 8px;
    //padding: 80px 50px 0;
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
    width: pxToVW(360);
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    margin: 44px 0 60px;
    ::v-deep .el-input__inner {
      background: #F2F2F6;
      border-radius: 6px;
      border-color:#F2F2F6;
      height: 54px;
    }
    ::v-deep .el-form-item__label {
      font-weight: 400;
      color: #B9B9C4; 
      font-size: 14px;
      &::before{
        content: "";
      }
    }

    .form-layout {
      height: 350px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
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

    .clause {
      color: #AAAAAA;
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
      width: pxToVW(360);
      height: 54px;
      background: #2434AF;
      font-size: 18px;
      font-weight: 400;
      color: #FFFFFF;
      margin-top: 60px;
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


</style>
