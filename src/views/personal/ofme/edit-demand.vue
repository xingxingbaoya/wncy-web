<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">需求信息</span>
          </div>
          <el-form ref="form1" :rules="form1Rule" :model="form1" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="需求名称" prop="name">
                  <el-input v-model="form1.name" placeholder="需求名称" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属行业" prop="industryOne">
                  <el-select v-model="form1.industryOne" placeholder="所属行业">
                    <el-option v-for="item in industryOneDict" :label="item.dictLabel" :value="item.dictValue" />
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
                        :src="`${imgUrl}/demand.jpg`"
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
                      :src="`${imgUrl}/demand.jpg`"
                      alt=""
                    >
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="需求描述" prop="briefDesc">
                  <el-input
                    v-model="form1.briefDesc"
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="请输入内容"
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
            <span class="box-title">个人信息</span>
          </div>
          <el-form ref="form2" :model="form2" :rules="form2Rule" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="联系人姓名" prop="contactName">
                  <el-input v-model="form2.contactName" placeholder="联系人姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="form2.mobile" placeholder="手机号" />
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="职务" prop="post">
                  <el-input v-model="form2.post" placeholder="职务" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="所属单位名称" prop="unit">
                  <el-input v-model="form2.unit" placeholder="所属单位名称" />
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
                <el-form-item label="详细地址" prop="email">
                  <el-input v-model="form2.postalAddress" placeholder="详细地址" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form2.email" placeholder="邮箱" />
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
          <el-form ref="form3" :model="form3" :rules="form3Rule" label-width="170px" label-position="left">
            <el-row>
              <el-col :span="9">
                <el-form-item label="意向合作方式" prop="cooperation">
                  <el-select v-model="form3.cooperation" placeholder="意向合作方式">
                    <el-option v-for="item in cooperationDict" :label="item.dictLabel" :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="14" :offset="1">
                <el-form-item label="预计投入时间" prop="investTime">
                  <el-date-picker
                    v-model="form3.investTime"
                    type="daterange"
                    range-separator="—"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    popper-class="date-range"
                    start-placeholder="开始日期"
                    end-placeholder="请选择日期"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="9">
                <el-form-item label="意向合作机构" prop="cooperationOrg">
                  <el-input v-model="form3.cooperationOrg" placeholder="意向合作机构" />
                </el-form-item>
              </el-col>
              <el-col :span="14" :offset="1">
                <el-form-item label="意向投入资金(万)" prop="capital">
                  <el-input v-model="form3.capital" placeholder="意向投入资金" :disabled="form3.faceFlag == 1">
                    <template slot="append">
                      <el-checkbox v-model="form3.faceFlag" true-label="1" false-label="0" @change="()=>{this.$refs.form3.clearValidate('capital')}">面议</el-checkbox>
                    </template>
                  </el-input>
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
                  <el-input v-model="form4.stage" placeholder="需求项目所处阶段" />
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-form-item label="技术参数要求" prop="paramRequirement">
                  <el-input v-model="form4.paramRequirement" placeholder="技术参数要求" />
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="知识产权要求" prop="intellectualProperty">
                  <el-input v-model="form4.intellectualProperty" placeholder="知识产权要求" />
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="对合作方要求" prop="partner">
                  <el-input v-model="form4.partner" placeholder="对合作方要求" />
                </el-form-item>
              </el-col>

              <el-col>
                <el-form-item label="文件上传" prop="remark_file">
                  <el-upload
                    ref="upload"
                    class="upload"
                    :limit="1"
                    action="#"
                    :show-file-list="false"
                    :on-change="fileChange"
                    :file-list="fileList"
                    :auto-upload="false"
                  >

                    <span v-for="file in fileList" class="file-name">{{ file.name }}</span>
                    <el-button slot="trigger" size="small" type="primary" class="selFile">选取文件</el-button>
                    <div slot="tip" class="tips">支持材料格式：jpg、gif、png、bmp、doc、docx；材料大小不超过5M</div>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="需求描述" prop="remark">
                  <el-input
                    v-model="form4.remark"
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="postDemandDetail"><span class="icon-text">确认保存</span></el-button>
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
import { addDemandDetail, editDemandDetail, getDemandDetail } from '@/api/demandhall'
import { param2Form } from '@/utils'
export default {
  name: 'Personaleditdemand',
  mixins: [common],
  data() {
    const validateproIntentionPrice = (rule, value, callback) => {
      if (value == '' && this.form3.faceFlag == 0) {
        callback(new Error('请输入意向投入资金'))
      } else {
        callback()
      }
    }
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
        postalAddress: '',
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
        remark_file: ''
      },
      form1Rule: {
        name: [
          { required: true, message: '请输入需求名称', trigger: 'blur' }
        ],
        fulladdress: [
          { required: true, message: '请选择来源地', trigger: 'change' }
        ],
        industryOne: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ],
        // pic_file: [
        //   { required: true, message: '请输入图片', trigger: 'blur' }
        // ],
        briefDesc: [
          { required: true, message: '请输入需求描述', trigger: 'blur' }
        ]
      },
      form2Rule: {
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        postalfulladdress: [
          { required: true, message: '请选择来源地', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请输入所属单位名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      form3Rule: {
        cooperation: [
          { required: true, message: '请输入意向合作方式', trigger: 'blur' }
        ],
        investTime: [
          { required: true, message: '请选择预计投入时间', trigger: 'change' }
        ],
        capital: [
          { required: true, validator: validateproIntentionPrice, message: '请输入意向投入资金', trigger: 'blur' }
        ],
        cooperationOrg: [
          { required: true, message: '请输入意向合作机构', trigger: 'blur' }
        ]
      },
      form4Rule: {
        stage: [
          { required: true, message: '请输入需求项目所处阶段', trigger: 'blur' }
        ],
        paramRequirement: [
          { required: true, message: '请输入技术参数要求', trigger: 'blur' }
        ],
        intellectualProperty: [
          { required: true, message: '请输入知识产权要求', trigger: 'blur' }
        ],
        partner: [
          { required: true, message: '请输入对合作方要求', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入需求描述', trigger: 'blur' }
        ],
        remark_file: [
          { required: true, message: '请输入补充材料', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      disabled: false,
      pic_file_list: [],
      fileList: [],
      picUrl: '',
      item: {}
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
          this.pic_file_list.push({ url: cover })
          this.form1.pic_file = cover
          console.log(this.form1.fulladdress, this.form2.postalfulladdress)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
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
    },
    handlePictureCardPreview(file) {
      this.picUrl = file.url
      this.dialogVisible = true
    },
    fileChange(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      this.$refs.form4.clearValidate('remark_file')
      if (!isLt2M) {
        this.fileList.pop()
        return this.$message.warning('上传图片大小不能超过 2MB!')
      }
      this.fileList = fileList
      this.form4.remark_file = file.raw
      console.log(file, fileList)
    },
    postDemandDetail() {
      Promise.all(this.valiaForm(['form1', 'form2', 'form3', 'form4'])).then(res => {
        this.loading = true
        const [province = '', city = '', county = ''] = this.form1.fulladdress
        const [postalProvince = '', postalCity = '', postalCounty = ''] = this.form2.postalfulladdress

        if (_.isString(this.form1.pic_file)) this.form1 = _.omit(this.form1, ['pic_file'])

        if (_.isEmpty(this.form4.remark_file)) this.form4 = _.omit(this.form4, ['remark_file'])
        editDemandDetail(param2Form({ ...this.form1, ...this.form2, ...this.form3, ...this.form4, province, city, county, postalProvince, postalCity, postalCounty })).then(res => {
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
      }).catch(error => {
        this.loading = false
      })
    },
    godetail() {
      const { id } = this.$route.query
      this.$router.push({
        path: '/personal/center/detail-demand',
        query: {
          id
        }
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

}
</style>
