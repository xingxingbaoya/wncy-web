<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">企业认证</p>
      <p class="ftitle">恭喜您，您已成功认证企业！</p>
      <el-form label-width="150px" label-position="left" :model="item">
        <el-row>
          <el-col :span="13">
            <el-form-item label="企业名称：">
              <span>{{ item.nickName }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="统一信用代码：">
              <span>{{ item.creditCode }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="注册时间：">
              <span>{{ item.registrationTime }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="注册地址：">
              <span>{{ item.province | MapName(item.city,item.area) }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="详细地址：">
              <span>{{ item.address }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="企业类型：">
              <span>{{ item.companyType | formatCompany }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="行业分类：">
              <span>{{ item.industryCategory | formatIndustryOne }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系人：">
              <span>{{ item.contactPerson }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="13">
            <el-form-item label="联系方式：">
              <span>{{ item.contactPhone }}</span>
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
    border-color: #409EFF;
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
