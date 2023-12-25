<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">需求信息</span>
          </div>
          <el-form ref="form1" :model="form1" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称" prop="name">
                  <span>{{ form1.name }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属行业" prop="industryOne">
                  <span>{{ form1.industryOne | formatIndustryOne }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="来源地" prop="fulladdress">
                  <span>{{ form1.province | MapName(form1.city,form1.country) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="上传图片" prop="pic_file">
                  <img v-real-img="form1.pic_file" :src="`${imgUrl}/product.jpg`" alt="上传图片" class="image">
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="需求描述" prop="briefDesc">
                  <span>{{ form1.briefDesc }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">个人信息</span>
          </div>
          <el-form ref="form2" :model="form2" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="联系人姓名" prop="contactName">
                  <span>{{ form2.contactName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="手机号" prop="mobile">
                  <span>{{ form2.mobile }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="职务" prop="post">
                  <span>{{ form2.post }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属单位名称" prop="unit">
                  <span>{{ form2.unit }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="来源地" prop="postalfulladdress">
                  <span>{{ form2.postalProvince | MapName(form2.postalCity,form2.postalCounty) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="详细地址" prop="email">
                  <span>{{ form2.postalAddress | formatEmpty }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="邮箱" prop="email">
                  <span>{{ form2.email }}</span>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">意向信息</span>
          </div>
          <el-form ref="form3" :model="form3" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="意向合作方式" prop="cooperation">
                  <span>{{ form3.cooperation | formatCooperation }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="预计投入时间" prop="investTime">
                  <span>{{ form3.investTime | formatRangeTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="意向投入资金" prop="capital">
                  <span>{{ form3.faceFlag == '1'|| form3.capital == 0?"面议":form3.capital + "万元" }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="意向合作机构" prop="cooperationOrg">
                  <span>{{ form3.cooperationOrg }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">补充信息</span>
          </div>
          <el-form ref="form4" :model="form4" label-width="170px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求项目所处阶段" prop="stage">
                  <span>{{ form4.stage }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="技术参数要求" prop="paramRequirement">
                  <span>{{ form4.paramRequirement }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="知识产权要求" prop="intellectualProperty">
                  <span>{{ form4.intellectualProperty }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="对合作方要求" prop="partner">
                  <span>{{ form4.partner }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="需求描述" prop="remark">
                  <span>{{ form4.remark }}</span>
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
                  <span :class="{'reject-color':form4.status == 3}">{{ form4.status | formatAuth }}</span>
                </el-form-item>
              </el-col>
              <el-col v-show="form4.status == 3" :span="22">
                <el-form-item label="驳回原因">
                  <span>{{ form4.rejectRemark }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="goedit"><span class="icon-text">编辑需求</span></el-button>
              <el-button type="primary" class="cancel-form" @click="godelete"><span class="icon-text">删除需求</span></el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { addDemandDetail, deleteDemandDetail, getDemandDetail } from '@/api/demandhall'
import { param2Form } from '@/utils'
export default {
  name: 'Personaldetaildemand',
  mixins: [common],
  data() {
    return {
      form1: {
        name: '',
        fulladdress: '',
        province: '',
        city: '',
        county: '',
        industryOne: '',
        pic_file: '',
        briefDesc: ''
      },
      form2: {
        contactName: '',
        postalfulladdress: '',
        mobile: '',
        post: '',
        unit: '',
        postalProvince: '',
        postalCity: '',
        postalCounty: '',
        email: ''
      },
      form3: {
        cooperation: '',
        investTime: '',
        capital: '',
        faceFlag: '0',
        cooperationOrg: ''
      },
      form4: {
        stage: '',
        paramRequirement: '',
        intellectualProperty: '',
        partner: '',
        remark: '',
        status: '',
        rejectRemark: '',
        fileList: []
      }
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getDemandDetail({ id }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          const { province, city, county, postalProvince, postalCity, postalCounty, investTime, cover } = this.item
          this.form1 = _.merge(this.form1, _.pick(this.item, _.keys(this.form1)))
          this.form2 = _.merge(this.form2, _.pick(this.item, _.keys(this.form2)))
          this.form3 = _.merge(this.form3, _.pick(this.item, _.keys(this.form3)))
          this.form4 = _.merge(this.form4, _.pick(this.item, _.keys(this.form4)))
          this.form1.fulladdress = [province, city, county]
          this.form2.postalfulladdress = [postalProvince, postalCity, postalCounty]
          this.form3.investTime = investTime.split(',')
          this.form1.pic_file = cover
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    goedit() {
      const { id } = this.$route.query
      this.$router.push({
        path: '/personal/center/edit-demand',
        query: {
          id
        }
      })
    },
    godelete() {
      const { id } = this.$route.query
      this.$confirm('确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteDemandDetail(id).then(res => {
          if (res.code == '0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/personal/center/search-demand'
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

  .reject-color {
    color: crimson;
  }

}
</style>
