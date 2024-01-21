<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">活动信息</span>
          </div>
          <el-form ref="form1" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="活动名称" prop="name">
                  <span>{{ item.actName }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="活动状态" prop="industryOne">
                  <span>{{  activeStatus }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="活动时间" prop="fulladdress">
                  <span>{{ item.actStartTime | formatDate }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="报名时间" prop="pic_file">
                  <span>{{ item.signUpTime | formatDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="姓名" prop="briefDesc">
                  <span>{{ item.signUpName }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="联系方式" prop="briefDesc">
                  <span>{{ item.contactInfo }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="公司名称" prop="briefDesc">
                  <span>{{ item.companyName }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="职务" prop="briefDesc">
                  <span>{{ item.post }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

    </el-row>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { addDemandDetail } from '@/api/demandhall'
import { param2Form } from '@/utils'
import { getActivityDetail, getsignUpDetail } from '@/api/activitieshall'
export default {
  name: 'Personaldetailactivit',
  mixins: [common],
  data() {
    return {
      item: {

      }
    }
  },
  computed: {
    activeStatus(){
      return this.activityStatusDict.find(p => p.dictValue == this.item.actStatus)?.dictLabel || ''
    }
  },
  methods: {
    loadData() {
      const { actSignUpId } = this.$route.query
      this.loading = true
      getsignUpDetail(actSignUpId).then(res => {
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
.el-main {
  padding: 0;
}

.row-bg {
  background-color: #F6F6F6;
}
.box-form {
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #333333;
    line-height: 25px;
    padding-left: 20px;

    &:after {
      content: '';
      height: 3px;
      width: 100%;
      background: #516FD2;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #EBEEF5;
  }

  ::v-deep .el-input__inner {
    height: 34px;
    font-size: 18px;
  }

  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 400;
    color: #333333;
  }

  ::v-deep .el-cascader {
    width: 100%;
  }

  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #516FD2;
    background: #516FD2;
  }

  ::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #516FD2;
  }

  ::v-deep .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }

  .submit-form {
    background: #4D6DDA;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
  }
  .cancel-form {
    padding: 12px 30px;
    font-size: 18px;
    font-weight: 400;
    color: #4D6DDA;
    line-height: 25px;
    background: #FFFFFF;
    border: 1px solid #4D6DDA;
    border-radius: 3px;
  }

  .selFile {
    font-size: 14px;
    font-weight: 400;
    color: #FFFFFF;
    background: #4D6DDA;
    border-radius: 3px;
  }

  .file-name {
    margin-left: 10px;
  }

  .tips {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  ::v-deep .el-form-item__content {
    span {
      font-size: 16px;
      font-weight: 400;
      color: #999999;
      line-height: 25px;
    }
  }

}
</style>
