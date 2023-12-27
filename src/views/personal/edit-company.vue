<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">企业认证</p>
      <p class="ftitle">请填写真实审核信息，认证审核资料通过后不能修改。</p>
      <el-form ref="form" label-width="160px" label-position="left" :model="form" :rules="formRules">
        <el-row>
          <el-col :span="13">
            <el-form-item label="企业名称：" prop="nickName">
              <el-input v-model="form.nickName" placeholder="企业名称" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="统一信用代码：" prop="creditCode">
              <el-input v-model="form.creditCode" placeholder="统一信用代码" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="注册时间：" prop="registrationTime">
              <el-date-picker
                v-model="form.registrationTime"
                prefix-icon="iconfont"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="注册时间"
              />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="注册地址：" prop="fulladdress">
              <el-cascader
                v-model="form.fulladdress"
                :options="cityList"
                :props="optionProps"
              />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="form.address" placeholder="详细地址" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="企业类型：" prop="companyType">
              <el-select v-model="form.companyType" placeholder="企业类型">
                <el-option
                  v-for="item in companyTypeDict"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="行业分类：" prop="industryCategory">
              <el-select v-model="form.industryCategory" placeholder="行业分类">
                <el-option
                  v-for="item in industryOneDict"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系人：" prop="contactPerson">
              <el-input v-model="form.contactPerson" placeholder="联系人" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系方式：" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="联系方式" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="个人简介：" prop="introduction">
              <el-input
                v-model="form.introduction"
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="个人简介"
              />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-button class="cancel-btn" @click="gocenter">取消</el-button><el-button class="sure-btn" @click="submitForm('form')">保存</el-button>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import common from '@/mixin/common'
import { authUserType } from '@/api/user'
import { param2Form, validateUsername, validateUserPassword } from '@/utils'

export default {
  name: 'Personalexperts',
  mixins: [common],
  data() {
    return {
      form: {
        nickName: '',
        creditCode: '',
        registrationTime: '',
        fulladdress: '',
        address: '',
        companyType: '',
        industryCategory: '',
        contactPerson: '',
        contactPhone: '',
        introduction: '',
        userType: '2'
      },
      formRules: {
        nickName: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请填写统一信用代码', trigger: 'blur' }],
        registrationTime: [{ required: true, message: '请选择注册时间', trigger: 'change' }],
        fulladdress: [{ required: true, message: '请选择注册地址', trigger: 'change' }],
        address: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
        companyType: [{ required: true, message: '请选择企业类型', trigger: 'change' }],
        industryCategory: [{ required: true, message: '请选择行业分类', trigger: 'change' }],
        contactPerson: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请填写联系方式', trigger: 'blur' }],
        introduction: [{ required: true, message: '请填写个人简介', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(ref) {
      const [province = '', city = '', area = ''] = this.form.fulladdress
      this.$refs[ref].validate((valid) => {
        if (valid) {
          authUserType(param2Form({ ...this.form, province, city, area })).then(res => {
            if (res.code == '0000') {
              this.$message.success(res.msg)
              this.gocenter()
            } else {
              this.$message.warning(res.msg)
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    gocenter() {
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
    margin: 0 0 20px;
  }

  .ftitle {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
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

  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
    font-size: 14px;
  }

  ::v-deep .el-input--prefix .el-input__inner {
    padding-left: 14px;
  }

  ::v-deep .el-textarea__inner{
    font-size: 14px;
    padding: 13px;
    font-weight: 500;
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
    object-fit: cover;
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
      bottom: 0;
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
    margin-left: 160px;
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
</style>
