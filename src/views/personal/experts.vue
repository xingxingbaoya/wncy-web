<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">专家认证</p>
      <p class="ftitle">恭喜您，您已成功认证为专家！</p>
      <el-form label-width="150px" label-position="left" :model="item">
        <el-row>
          <el-col :span="13">
            <el-form-item label="姓名：">
              <span>{{ item.nickName }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="出生日期：">
              <span>{{ item.birthday }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="国别：">
              <span>{{ item.country }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="邮箱地址：">
              <span>{{ item.email }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系方式：">
              <span>{{ item.contactPhone }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="毕业院校：">
              <span>{{ item.graduatedSchool }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="最高学位：">
              <span>{{ item.degree | formatDegree }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="任职单位：">
              <span>{{ item.workUnit }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="职位：">
              <span>{{ item.position }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="专业领域：">
              <span>{{ item.technicalField }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="社会头衔：">
              <span>{{ item.socialTitle }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="个人简介：">
              <span>{{ item.introduction }}</span>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import common from '@/mixin/common'
import { getUserDetail } from '@/api/user'

export default {
  name: 'Personalexperts',
  mixins: [common],
  data() {
    return {
      item: {

      }
    }
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
    margin-left: 170px;
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
