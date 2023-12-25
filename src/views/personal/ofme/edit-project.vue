<template>
  <el-main v-loading="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">项目信息</span>
          </div>
          <el-form ref="form1" :model="form1" :rules="form1Rule" label-width="170px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="项目名称" prop="title">
                  <el-input v-model="form1.title" placeholder="项目名称" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目国别" prop="isNotNational">
                  <el-select v-model="form1.isNotNational" placeholder="项目国别">
                    <el-option label="国内项目" value="1" />
                    <el-option label="国外项目" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="18">
                <el-form-item label="来源地" prop="fulladdress">
                  <el-cascader
                    v-model="form1.fulladdress"
                    :options="cityList"
                    :props="optionProps"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="行业分类" prop="industryone">
                  <el-select v-model="form1.industryone" placeholder="项目分类">
                    <el-option v-for="item in industryOneDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目权属方" prop="proName">
                  <el-input v-model="form1.proName" placeholder="项目权属方" />
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="技术来源" prop="proNature">
                  <el-select v-model="form1.proNature" placeholder="技术来源">
                    <el-option v-for="item in natureDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="技术类型" prop="proPatentInfo">
                  <el-select v-model="form1.proPatentInfo" placeholder="技术类型">
                    <el-option v-for="item in techTypeDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="合作方式" prop="cooperation">
                  <el-select v-model="form1.cooperation" placeholder="合作方式">
                    <el-option v-for="item in cooperationDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="项目开发阶段" prop="proDevelopment">
                  <el-select v-model="form1.proDevelopment" placeholder="项目开发阶段">
                    <el-option v-for="item in developmentDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="15">
                <el-form-item label="意向投入资金(万)" prop="proIntentionPrice">
                  <el-input v-model="form1.proIntentionPrice" placeholder="意向投入资金" :disabled="form1.faceFlag == 1">
                    <template slot="append">
                      <el-checkbox v-model="form1.faceFlag" true-label="1" false-label="0" @change="()=>{this.$refs.form1.clearValidate('proIntentionPrice')}">面议</el-checkbox>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="15">
                <el-form-item label="上传图片" prop="pic_file">
                  <el-upload
                    action="#"
                    :limit="1"
                    list-type="picture-card"
                    :file-list="pic_file_list"
                    :on-change="handleImgChange"
                    :auto-upload="false"
                  >
                    <i slot="default" class="el-icon-plus" />
                    <div slot="file" slot-scope="{file}" class="img-wrapper">
                      <img
                        v-real-img="file.url"
                        class="el-upload-list__item-thumbnail"
                        :src="`${imgUrl}/project.jpg`"
                        alt=""
                      >
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in" />
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete" />
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img
                      v-real-img="picUrl"
                      width="100%"
                      :src="`${imgUrl}/project.jpg`"
                      alt=""
                    >
                  </el-dialog>
                  <span class="tips">支持jpg、jpeg、gif、png格式，大小不超过5M</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form1.proPatentInfo == 1">

              <el-col :span="8">
                <el-form-item label="专利类别" prop="proDevelopment">
                  <el-select v-model="form1.proPatentCategory" placeholder="专利类别">
                    <el-option v-for="item in patentCategoryDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-form-item label="专利号" prop="proPatentNo">
                  <el-input v-model="form1.proPatentNo" placeholder="专利号" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="专利人" prop="patentOwner">
                  <el-input v-model="form1.patentOwner" placeholder="专利号" />
                </el-form-item>
              </el-col>

              <el-col :span="8" :offset="1">
                <el-form-item label="专利授权日" prop="proGrantTime">
                  <el-date-picker
                    v-model="form1.proGrantTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="22">
                <el-form-item label="项目描述" prop="proIntroduct">
                  <el-input
                    v-model="form1.proIntroduct"
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="项目描述"
                  />
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
          <el-form ref="form2" :rules="form2Rule" :model="form2" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="联系人姓名" prop="linkman">
                  <el-input v-model="form2.linkman" placeholder="联系人姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form2.phone" placeholder="手机号" />
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form2.email" placeholder="邮箱" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属单位名称" prop="company">
                  <el-input v-model="form2.company" placeholder="所属单位名称" />
                </el-form-item>
              </el-col>

              <el-col :span="18">
                <el-form-item label="来源地" prop="postalfulladdress">
                  <el-cascader
                    v-model="form2.postalfulladdress"
                    :options="cityList"
                    :props="optionProps"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="职务" prop="position">
                  <el-input v-model="form2.position" placeholder="职务" />
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="是否挂牌" prop="isListing">
                  <el-radio-group v-model="form2.isListing">
                    <el-radio label="1">挂牌</el-radio>
                    <el-radio label="0">不挂牌</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="postProjectDetail"><span class="icon-text">确认保存</span></el-button>
              <el-button type="primary" class="cancel-form" @click="godetail"><span class="icon-text">取消编辑</span></el-button>
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
import { addProjectDetail, editProjectDetail, getProjectDetail } from '@/api/projecthall'
import { getDemandDetail } from '@/api/demandhall'
export default {
  name: 'Personaleditproject',
  mixins: [common],
  data() {
    const validateproIntentionPrice = (rule, value, callback) => {
      if (value == '' && this.form1.faceFlag == 0) {
        callback(new Error('请输入意向投入资金'))
      } else {
        callback()
      }
    }
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
        proIntroduct: '',
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
        pic_file: ''
      },
      form2: {
        linkman: '',
        phone: '',
        position: '',
        company: '',
        postalfulladdress: '',
        postalProvince: '',
        postalArea: '',
        postalCity: '',
        email: '',
        isListing: '0'
      },
      form1Rule: {
        title: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        fulladdress: [
          { required: true, message: '请选择来源地', trigger: 'change' }
        ],
        isNotNational: [
          { required: true, message: '请选择项目国别', trigger: 'change' }
        ],
        proName: [
          { required: true, message: '请输入项目权属方', trigger: 'blur' }
        ],
        industryone: [
          { required: true, message: '请选择行业分类', trigger: 'change' }
        ],
        proIntroduct: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ],
        proBusinessPlan: [
          { required: true, message: '请输入商业计划及前景', trigger: 'blur' }
        ],
        proPatentInfo: [
          { required: true, message: '请选择技术类型', trigger: 'change' }
        ],
        proNature: [
          { required: true, message: '请选择技术来源', trigger: 'change' }
        ],
        cooperation: [
          { required: true, message: '请选择合作方式', trigger: 'change' }
        ],
        proIntentionPrice: [
          { required: true, validator: validateproIntentionPrice, message: '请输入意向投入资金', trigger: 'blur' }
        ],
        proDevelopment: [
          { required: true, message: '请选择项目开发阶段', trigger: 'change' }
        ],
        proPatentNo: [
          { required: true, message: '请输入专利号', trigger: 'blur' }
        ],
        proPatentCategory: [
          { required: true, message: '请选择专利类别', trigger: 'change' }
        ],
        patentOwner: [
          { required: true, message: '请输入专利人', trigger: 'blur' }
        ],
        proGrantTime: [
          { required: true, message: '请选择专利授权日', trigger: 'change' }
        ]
        // pic_file: [
        //   { required: true, message: '请选择图片', trigger: 'change' }
        // ]
      },
      form2Rule: {
        linkman: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入所属单位名称', trigger: 'blur' }
        ],
        postalfulladdress: [
          { required: true, message: '请选择来源地', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      disabled: false,
      pic_file_list: [],
      picUrl: ''
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getProjectDetail({ id }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          const { province, city, area, postalProvince, postalArea, postalCity, logo } = this.item
          this.form1 = _.merge(this.form1, _.pick(this.item, _.keys(this.form1)))
          this.form2 = _.merge(this.form2, _.pick(this.item, _.keys(this.form2)))

          this.form1.fulladdress = [province, city, area]
          this.form2.postalfulladdress = [postalProvince, postalCity, postalArea]
          this.pic_file_list.push({ url: logo })
          this.form1.pic_file = logo
          this.picUrl = logo
          this.form2.isListing = this.item.isListing.toString()
          this.form1.faceFlag = this.item.faceFlag.toString()
          this.form1.proIntentionPrice = isNaN(this.item.proIntentionPrice) ? '' : this.item.proIntentionPrice
          console.log(this.form1, this.form2)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    postProjectDetail() {
      Promise.all(this.valiaForm(['form1', 'form2'])).then(() => {
        this.loading = true
        const { id } = this.$route.query
        const [province = '', city = '', area = ''] = this.form1.fulladdress
        const [postalProvince = '', postalCity = '', postalArea = ''] = this.form2.postalfulladdress
        if (_.isString(this.form1.pic_file)) this.form1 = _.omit(this.form1, ['pic_file'])
        editProjectDetail(param2Form({ ...this.form1, ...this.form2, id, province, city, area, postalProvince, postalCity, postalArea })).then(res => {
          if (res.code == '0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/personal/center/detail-project',
                  query: {
                    id
                  }
                })
              }
            })
          } else {
            this.$message.warning(res.msg)
          }
        }).finally(() => {
          this.loading = false
        })
      }).catch(error => {
        this.loading = false
      })
    },
    handleRemove(file) {
      this.pic_file_list.pop()
      this.form1.pic_file = null
    },
    handleImgChange(file) {
      const isIMG = file.raw.type.includes('image')
      const isLt2M = file.size / 1024 / 1024 < 2
      this.$refs.form1.clearValidate('pic_file')
      if (!isIMG) {
        this.pic_file_list.pop()
        return this.$message.warning('只能上传图片!')
      }
      if (!isLt2M) {
        this.pic_file_list.pop()
        return this.$message.warning('上传图片大小不能超过 2MB!')
      }
      this.form1.pic_file = file.raw
      console.log(this.form1.pic_file)
    },
    handlePictureCardPreview(file) {
      this.picUrl = file.url
      this.dialogVisible = true
    },
    godetail() {
      this.$router.push({
        path: '/personal/center/detail-project'
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
</style>
