<template>
  <el-main v-loading="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">项目信息</span>
          </div>
          <el-form ref="form1" :model="form1" label-width="160px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="项目名称" prop="title">
                  <span>{{ form1.title }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目国别" prop="isNotNational">
                  <span>{{ form1.isNotNational == '1'? '国内':'国际' }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="18">
                <el-form-item label="来源地" prop="fulladdress">
                  <span>{{ form1.province | MapName(form1.city,form1.county) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="行业分类" prop="industryone">
                  <span>{{ form1.industryone | formatIndustryOne }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目权属方" prop="proName">
                  <span>{{ form1.proName | formatEmpty }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="技术来源" prop="proNature">
                  <span>{{ form1.proNature | formatNature }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="技术类型" prop="proPatentInfo">
                  <span>{{ form1.proPatentInfo | formatTech }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="合作方式" prop="cooperation">
                  <span>{{ form1.cooperation | formatCooperation }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目开发阶段" prop="proDevelopment">
                  <span>{{ form1.proDevelopment | formatDevelopment }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="意向投入资金(万)" prop="proIntentionPrice">
                  <span>{{ form1.faceFlag == 1 ? "面议":form1.proIntentionPrice }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="15">
                <el-form-item label="项目图片" prop="logo">
                  <img v-real-img="form1.logo" :src="`${imgUrl}/project.jpg`" alt="项目图片" class="image">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form1.proPatentInfo == 1">

              <el-col :span="8">
                <el-form-item label="专利类别" prop="proDevelopment">
                  <span>{{ form1.proPatentCategory | formatCategory }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="专利号" prop="proPatentNo">
                  <span>{{ form1.proPatentNo | formatEmpty }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="专利人" prop="patentOwner">
                  <span>{{ form1.patentOwner | formatEmpty }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8" :offset="1">
                <el-form-item label="专利授权日" prop="proGrantTime">
                  <span>{{ form1.proGrantTime | formatEmpty }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="22">
                <el-form-item label="项目描述" prop="proIntroduct">
                  <span>{{ form1.proIntroduct | formatEmpty }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">联系人信息</span>
          </div>
          <el-form ref="form2" :model="form2" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="联系人姓名" prop="linkman">
                  <span>{{ form2.linkman }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="手机号" prop="phone">
                  <span>{{ form2.phone }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="邮箱" prop="email">
                  <span>{{ form2.email }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属单位名称" prop="company">
                  <span>{{ form2.company }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="18">
                <el-form-item label="来源地" prop="postalfulladdress">
                  <span>{{ form2.postalProvince | MapName(form2.postalCity,form2.postalArea) }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="职务" prop="position">
                  <span>{{ form2.position }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="是否挂牌" prop="isListing">
                  <span>{{ form2.isListing == 1 ?'是':'否' }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">审核信息</span>
          </div>
          <el-form label-width="170px" label-position="left">
            <el-row>
              <el-col :span="22">
                <el-form-item label="审核状态">
                  <span :class="{'reject-color':form2.status == 3}">{{ form2.status | formatAuth }}</span>
                </el-form-item>
              </el-col>
              <el-col v-show="form2.status == 3" :span="22">
                <el-form-item label="驳回原因">
                  <span>{{ form2.backRemark }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="postProjectDetail"><span class="icon-text">编辑项目</span></el-button>
              <el-button type="primary" class="cancel-form" @click="delProjectDetail"><span class="icon-text">删除项目</span></el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

    </el-row>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { param2Form } from '@/utils'
import { addProjectDetail, deleteProjectDetail, getProjectDetail } from '@/api/projecthall'
import { deleteDemandDetail, getDemandDetail } from '@/api/demandhall'
export default {
  name: 'Personaldetailproject',
  mixins: [common],
  data() {
    return {
      form1: {
        title: '',
        fulladdress: '',
        province: '',
        city: '',
        area: '',
        isNotNational: '',
        proName: '',
        industryone: '',
        description: '',
        proBusinessPlan: '',
        faceFlag: '0',
        proPatentInfo: '',
        proNature: '',
        cooperation: '',
        proIntentionPrice: '',
        proDevelopment: '',
        proPatentCategory: '',
        proPatentNo: '',
        patentOwner: '',
        proGrantTime: '',
        proIntroduct: '',
        logo: ''
      },
      form2: {
        linkman: '',
        phone: '',
        position: '',
        company: '',
        postalfulladdress: '',
        postalProvince: '',
        postalArea: '',
        postalCounty: '',
        status: '',
        backRemark: '',
        email: '',
        isListing: '0'
      }
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getProjectDetail({ id }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          const { province, city, county, postalProvince, postalArea, postalCounty } = this.item
          this.form1 = _.merge(this.form1, _.pick(this.item, _.keys(this.form1)))
          this.form2 = _.merge(this.form2, _.pick(this.item, _.keys(this.form2)))
          this.form1.fulladdress = [province, city, county]
          this.form2.postalfulladdress = [postalProvince, postalArea, postalCounty]
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    postProjectDetail() {
      const { id } = this.$route.query
      this.$router.push({
        path: '/personal/center/edit-project',
        query: {
          id
        }
      })
    },
    delProjectDetail() {
      const { id } = this.$route.query
      this.$confirm('确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteProjectDetail(id).then(res => {
          if (res.code == '0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/personal/center/search-project'
                })
              }
            })
          } else {
            this.$message.warning(res.msg)
          }
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {

      })
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
  margin-bottom: 25px;

  .image {
    width: 110px;
    height: 110px;
    object-fit: cover;
  }

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

  ::v-deep .el-radio__label{
    font-size: 14px;
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
    padding: 12px 30px;
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

  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
}

.tips {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}

.reject-color {
  color: crimson;
}
</style>
