<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">修改密码</p>
      <el-form ref="form" label-width="120px" label-position="left" :model="form">
        <el-row>
          <el-col :span="15">
            <el-form-item label="当前账号：">
              <span>{{ item.phone }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="15">
            <el-form-item prop="validateCode" label="手机验证码：">
              <el-input v-model="form.phoneValidateCode" placeholder="手机验证码" maxlength="13">
                <template slot="append"><el-button :disabled="disabled" @click="getMsgCode(form)">{{ codeBtn }}</el-button></template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="15">
            <el-form-item label="当前密码：">
              <el-input v-model="form.oldPassword" placeholder="当前密码" show-password />
            </el-form-item>
          </el-col>

          <el-col :span="15">
            <el-form-item label="新密码：">
              <el-input v-model="form.password" placeholder="新密码" show-password />
            </el-form-item>
          </el-col>

          <el-col :span="15">
            <el-form-item label="确认密码：">
              <el-input v-model="form.confirmPassword" placeholder="确认密码" show-password />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-button class="cancel-btn" @click="cancelReset">取消</el-button><el-button class="sure-btn" @click="sureReset('form')">保存</el-button>
        </el-row>
      </el-form>
    </el-row>

  </div>

</template>

<script>
import common from '@/mixin/common'
import { changePass, sendValidateCode } from '@/api/register'
import { changePassword, getUserDetail } from '@/api/user'
import { param2Form } from '@/utils'

export default {
  name: 'Personaledit',
  mixins: [common],
  data() {
    return {
      disabled: false,
      time: 60,
      codeBtn: '发送验证码',
      form: {
        phoneValidateCode: '',
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      item: {}
    }
  },
  computed: {

  },
  methods: {
    loadData() {
      this.loading = true
      getUserDetail().then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
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
      this.loading = true
      const { phone: phoneNumber } = this.item
      sendValidateCode({ phoneNumber }).then(res => {
        if (res.code == '0000') {
          this.timer()
          this.$message.success(res.msg)
          console.log(res.obj)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    sureReset(form) {
      if (this[form].password != this[form].confirmPassword) {
        return this.$message.warning('确认密码不一致,请重新输入')
      }
      this.loading = true
      changePassword(param2Form(this[form])).then(res => {
        if (res.code == '0000') {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/personal/center/'
          })
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    cancelReset() {
      this.$router.push({
        path: '/personal/center/'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.userinfo{
  padding: 35px 23px;
  .ttile{
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    margin: 0 0 40px;
  }

  .avatar{
    width: 110px;
    height: 110px;
    border-radius: 50%;
  }

  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #999999;
  }

  ::v-deep .el-form-item__content {
    font-size: 14px;
    color: #666666;
  }

  .el-form {
    padding: 30px;
    background: #F6F6F6;
  }

  .mtf60 {
    margin-top: -70px;
  }

  ::v-deep .el-input__inner {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
  }

  .el-cascader {
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #2434AF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    //line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .choose {
    padding: 0;
    vertical-align: 10px;
    font-size: 14px;
    font-weight: 500;
    margin-left: 20px;
    color: #4D6DDA;
  }

  .phone {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin-right: 20px;
  }

  .change {
    font-size: 16px;
    font-weight: 500;
    color: #4D6DDA;
    margin-right: 30px;
    cursor: pointer;
  }

  .tips{
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  .tip-after {
    position: relative;
    &::after {
      content: "支持jpg、jpeg、gif、png格式，大小不超过2M";
      display: block;
      position: absolute;
      bottom: -20px;
      left: 110px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }

  .cancel-btn {
    width: 111px;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 3px;

    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin-left: 140px;
  }

  .sure-btn {
    width: 111px;
    height: 42px;
    background: #4D6DDA;
    border-radius: 3px;

    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
  }

}

::v-deep .el-dialog__title{
  font-size: 20px;
  color: #333333;
}

::v-deep .el-dialog__headerbtn {
  font-size: 20px;
}

::v-deep .el-dialog__header {
  border: 2px solid #F6F6F6;
  padding: 26px;
}

.el-form {
  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
  }

  ::v-deep .el-form-item__content {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
  }

  ::v-deep .el-input__inner {
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }

  ::v-deep .el-input-group__append {
    font-size: 13px;
    font-weight: 400;
    color: #496CE2;
    .el-button {
      width: 140px;
    }
  }

}

::v-deep .el-dialog__body {
  padding: 20px 20px 0;
}

::v-deep .el-dialog__footer{
  text-align: center;
}

.dialog-footer {
  .next-btn {
    width: 122px;
    background: #496CE2;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
  }

}
</style>
