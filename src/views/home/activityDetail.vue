<template>
  <el-main class="content">
    <el-card class="play-content" :body-style="{ padding:'15px' }">
      <el-col :span="12" class="article-left">
        <img v-real-img="item.actCover" :src="`${imgUrl}/activity1.jpg`">
      </el-col>
      <el-col :span="12" class="play-right">
        <div>
          <div class="play-title">{{ item.actName }}</div>
          <p class="play-status">
            <span class="p-ft">发布时间: </span><span class="mr20">{{ item.createTime }}</span>
          </p>
        </div>
        <div v-show="isSignUp" class="play-right-btn">
          <!-- <el-button type="primary" class="see" @click="signUp"><svg-icon icon-class="signup" class-name="icon" /><span class="icon-text">点击报名</span></el-button>
          <el-button type="primary" class="see"><svg-icon icon-class="signup" class-name="icon" /><span class="icon-text">取消报名</span></el-button> -->
          <div class="libm" @click="signUp">
            立即报名
          </div>
          <div class="">
          </div>
          <!-- <div class="qxbm">
            取消报名
          </div> -->

        </div>
      </el-col>
    </el-card>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">活动介绍</span>
          </div>
          <div class="text-content" v-html="item.actDetail" />
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="SignUpDialog"
      custom-class="sign-log"
      width="800px"
      top="8vh"
      @close="closeSignUpDialog"
    >
      <el-row v-loading="loading">
        <el-col :span="10" class="left-img">
          <img :src="`${imgUrl}/login.png`">
        </el-col>
        <el-col :span="14" class="right-form">
          <div class="right-head">
            <p class="right-title">请填写您的个人信息</p>
            <p class="right-desc">Please fill in your personal information</p>
          </div>
          <el-form ref="signUpForm" :model="signUpForm" :rules="rules" class="rform">
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
            <el-button type="primary" class="right-submit" :loading="loading" @click="signUpSubmit('signUpForm')">确认提交</el-button>
          </el-row>
        </el-col>

      </el-row>
    </el-dialog>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getActivityDetail, signUpActivity } from '@/api/activitieshall'

export default {
  name: 'Activitieshallsignup',
  mixins: [common],
  data() {
    return {
      SignUpDialog: false,
      signUpForm: {
        signName: '',
        contactInfo: '',
        companyName: '',
        post: ''
      },
      rules: {
        signName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        contactInfo: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ]
      },
      item: {

      }
    }
  },
  computed: {
    isSignUp() {
      return this.item.signUpEnable == '1'
    }
  },
  methods: {
    signUp() {
      this.SignUpDialog = true
    },
    signUpSubmit(signUpForm) {
      const { id: actId } = this.$route.query

      this.$refs[signUpForm].validate((valid) => {
        if (valid) {
          this.loading = true
          signUpActivity({ ...this.signUpForm, actId }).then(res => {
            if (res.code == '0000') {
              this.$message.success(res.msg)
            } else {
              this.$message.warning(res.msg)
            }
          }).finally(() => {
            this.SignUpDialog = false
            this.loading = false
            this.$refs[signUpForm]?.resetFields()
          })
        } else {
          return false
        }
      })
    },
    closeSignUpDialog() {
      this.SignUpDialog = false
    },
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getActivityDetail({actId:id}).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading = false
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.libm{
  width: 224px;
  height: 47px;
  background: linear-gradient(90deg, #1875F2 0%, #37B9FA 100%);
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #FFFFFF;
  text-align: center;
  line-height: 47px;
  margin-right: 41px;
  cursor: pointer;
}
.qxbm{
  cursor: pointer;
  width: 224px;
  height: 47px;
  background: #999999;
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #FFFFFF;
  line-height: 47px;
  text-align: center;
}
.content{
  padding: 0 calc((100% - 1245px) / 2) 38px;
  margin-top: 100px;
}
.play-content{
  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .article-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 380px;
    }
  }
  .play-right {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding-left: 35px;
    height: 380px;
  }

  .play-title {
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    line-height: 1.5;
  }

  .play-status {
    height: 17px;
    font-size: 18px;
    font-weight: 400;
    color: #999999;

    .mr20 {
      margin-right: 200px;
    }
  }

  .play-right-btn {
    display: flex;
    justify-content: flex-start;
  }
  .see {
    /*width: 205px;*/
    padding: 10px 16px;
    border: 2px solid #516FD2;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #516FD2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .see {
    background: #516FD2;
    color: #FFFFFF;
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

.detail-content {
  margin-top: 31px;
  .box-card-left {
    min-height: 250px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #1E86F9;
    line-height: 25px;
    &:after {
      content: '';
      height: 3px;
      width: 100%;
      background: #1E86F9;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header{
    border-bottom: 1px solid #EEEEEE;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
  }
}

.left-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.sign-log {
  border-radius: 3px;
}

::v-deep .el-dialog__body {
  padding: 15px;
  margin-top: 160px;

}
::v-deep .el-dialog__header {
  padding: 0;
}

::v-deep .el-dialog__headerbtn {
  font-size: 30px;
  z-index: 999;
}

.el-dialog__headerbtn:focus ::v-deep .el-dialog__close, .el-dialog__headerbtn:hover ::v-deep .el-dialog__close {
  color: #516FD2 !important;
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
    background: #516FD2;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 16px 20px;
  }
}

.el-form {
  margin-top: 30px;
  width: 400px;
  ::v-deep .el-input__inner {

    height: 60px;
    background: #F2F3F5;
    border-radius:0 3px 3px 0;
    border-left: 0;
  }

  ::v-deep .el-input-group__prepend {
    background: #F2F3F5;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  ::v-deep .el-form-item__content {
  }
  ::v-deep .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus {
    border-color: #DCDFE6;
  }

  ::v-deep .el-input.is-active .el-input__inner,::v-deep .el-input__inner:focus {
    border-color: #DCDFE6 !important;
  }

  ::v-deep .el-form-item {
    margin-bottom: 30px;
  }
}

</style>
