<template>
  <div>
    <el-row v-loading="loading" class="userinfo">
      <p class="ttile">专家认证</p>
      <p class="ftitle">请填写真实审核信息，认证审核资料通过后不能修改。</p>
      <el-form ref="form" label-width="150px" label-position="left" :model="form" :rules="formRules">
        <el-row>
          <el-col :span="13">
            <el-form-item label="姓名：" prop="nickName">
              <el-input v-model="form.nickName" placeholder="姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="9" :offset="2" class="tip-after">
            <el-form-item label="头像：" label-width="100px" prop="pic_file">
              <el-upload
                class="avatar-uploader"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleAvatarChange"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="logo">
                <svg-icon v-else icon-class="avatar" class-name="el-icon-plus avatar-uploader-icon" />
                <el-button type="text" class="choose">选择文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="13" class="mtf60">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker
                v-model="form.birthday"
                prefix-icon="iconfont"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="出生日期"
              />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="国别：" prop="country">
              <el-input v-model="form.country" placeholder="国别" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="邮箱地址：" prop="email">
              <el-input v-model="form.email" placeholder="邮箱地址" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系方式：" prop="contactPhone">
              <el-input v-model="form.contactPhone" placeholder="联系方式" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="毕业院校：" prop="graduatedSchool">
              <el-input v-model="form.graduatedSchool" placeholder="毕业院校" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="最高学位：" prop="degree">
              <el-select v-model="form.degree" placeholder="最高学位">
                <el-option
                  v-for="item in degreeTypeDict"
                  :key="item.dictCode"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="任职单位：" prop="workUnit">
              <el-input v-model="form.workUnit" placeholder="任职单位" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="职位：" prop="position">
              <el-input v-model="form.position" placeholder="职位" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="专业领域：" prop="technicalField">
              <el-input v-model="form.technicalField" placeholder="专业领域" />
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="社会头衔：" prop="technicalField">
              <el-input v-model="form.socialTitle" placeholder="社会头衔" />
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
import { param2Form, validateUserAvatar } from '@/utils'

export default {
  name: 'Personalexperts',
  mixins: [common],
  data() {
    return {
      form: {
        nickName: '',
        pic_file: '',
        country: '',
        birthday: '',
        email: '',
        contactPhone: '',
        socialTitle: '',
        technicalField: '',
        position: '',
        workUnit: '',
        degree: '',
        graduatedSchool: '',
        userType: '4',
        introduction: ''
      },
      formRules: {
        nickName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        pic_file: [{ validator: validateUserAvatar, trigger: 'change' }],
        country: [{ required: true, message: '请填写国别', trigger: 'blur' }],
        birthday: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
        email: [{ required: true, message: '请填写邮箱地址', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请填写联系方式', trigger: 'blur' }],
        socialTitle: [{ required: true, message: '请选择社会头衔', trigger: 'change' }],
        technicalField: [{ required: true, message: '请选择专业领域', trigger: 'change' }],
        position: [{ required: true, message: '请填写职位', trigger: 'blur' }],
        workUnit: [{ required: true, message: '请填写任职单位', trigger: 'blur' }],
        degree: [{ required: true, message: '请填写最高学位', trigger: 'blur' }],
        graduatedSchool: [{ required: true, message: '请填写毕业院校', trigger: 'blur' }],
        introduction: [{ required: true, message: '请填写个人简介', trigger: 'blur' }]
      },
      imageUrl: ''
    }
  },
  methods: {
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          authUserType(param2Form(this.form)).then(res => {
            if (res.code == '0000') {
              this.$message.success(res.msg)
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
    },
    handleAvatarChange(file) {
      const isIMG = file.raw.type.includes('image')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isIMG) {
        return this.$message.warning('只能上传图片!')
      }
      if (!isLt2M) {
        return this.$message.warning('上传图片大小不能超过 2MB!')
      }
      this.form.pic_file = file.raw
      this.imageUrl = URL.createObjectURL(file.raw)
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
    object-fit: cover;
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
    margin-left: 150px;
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
