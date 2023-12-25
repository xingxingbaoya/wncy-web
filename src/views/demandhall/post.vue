<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row>
      <el-col>
        <el-card class="box-form mt"
                 :body-style="{ padding: '30px 300px 0' }">
          <div slot="header">
            <span class="box-title">需求信息</span>
          </div>
          <div class="box-attetion">
            请认真填写并核对以下信息，方便我们更好的为您提供服务。
          </div>
          <el-form ref="form1"
                   :rules="form1Rule"
                   :model="form1"
                   label-width="100px">
            <el-row class="elforms">
              <el-col :span="16">
                <el-form-item label="需求名称"
                              prop="name">
                  <el-input v-model="form1.name"
                            placeholder="需求名称" />
                </el-form-item>
              </el-col>
              <el-col :span="16" class="td">
                <el-form-item label="来源地"
                :append-to-body='false'
                              prop="fulladdress">
                  <el-cascader v-model="form1.fulladdress"
                               :options="cityList"
                               :props="optionProps" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="所属行业"
                              prop="industryOne">
                  <el-select v-model="form1.industryOne"
                   :popper-append-to-body="false"
                             placeholder="所属行业">
                    <el-option v-for="item in industryOneDict"
                               :label="item.dictLabel"
                               :value="item.dictValue" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="需求封面"
                              prop="pic_file">
                  <el-upload action="#"
                             :limit="1"
                             list-type="picture-card"
                             :file-list="pic_file_list"
                             :on-change="handleImgChange"
                             :auto-upload="false">
                    <i slot="default"
                       class="el-icon-plus" />
                    <div slot="file"
                         slot-scope="{file}"
                         class="img-wrapper">
                      <img  class="el-upload-list__item-thumbnail"
                           :src="file.url"
                           alt="">
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview"
                              @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in" />
                        </span>
                        <span v-if="!disabled"
                              class="el-upload-list__item-delete"
                              @click="handleRemove(file)">
                          <i class="el-icon-delete" />
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%"
                         :src="picUrl"
                         alt="">
                  </el-dialog>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="需求描述"
                              prop="briefDesc">
                  <el-input v-model="form1.briefDesc"
                            type="textarea"
                            :rows="5"
                            resize="none"
                            placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-form"
                 :body-style="{ padding: '30px 300px 0' }">
          <div slot="header">
            <span class="box-title">意向信息</span>
          </div>
          <div class="box-attetion">
            请认真填写并核对以下信息，方便我们更好的为您提供服务。
          </div>
          <el-form ref="form3"
                   :model="form3"
                   :rules="form3Rule"
                   label-width="140px">
            <el-row>
              <el-col :span="16" class="tdd">
                <el-form-item label="意向合作方式"
                              prop="cooperation">
                  <el-select v-model="form3.cooperation"
                   :popper-append-to-body="false"
                             placeholder="意向合作方式">
                    <el-option label="知识产权购买（专利、软著等）"
                               value="1" />
                    <el-option label="委托研发"
                               value="2" />
                    <el-option label="合作研"
                               value="3" />
                    <el-option label="专家咨询"
                               value="4" />
                    <el-option label="技术成果合作转化"
                               value="5" />
                    <el-option label="其他"
                               value="6" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="预计投入时间"
                              prop="investTime">
                  <el-date-picker v-model="form3.investTime"
                                  type="daterange"
                                  range-separator="—"
                                  :clearable="false"
                                  value-format="yyyy-MM-dd"
                                  popper-class="date-range"
                                  start-placeholder="开始日期"
                                  end-placeholder="请选择日期" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="意向投入资金"
                              prop="capital">
                  <el-input v-model="form3.capital"
                            placeholder="意向投入资金"
                            :disabled="form3.faceFlag == 1">
                    <template slot="append">
                      <el-checkbox v-model="form3.faceFlag"
                                   true-label="1"
                                   false-label="0"
                                   @change="()=>{this.$refs.form3.clearValidate('capital')}">面议</el-checkbox>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>

              <!-- <el-col :span="16">
                <el-form-item label="意向合作机构"
                              prop="cooperationOrg">
                  <el-input v-model="form3.cooperationOrg"
                            placeholder="意向合作机构" />
                </el-form-item>
              </el-col> -->
              <el-col :span="16">
                <el-form-item label="意向合作机构" prop="cooperationOrg">
                  <el-input v-model="form3.cooperationOrg" placeholder="意向合作机构" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card class="box-form"
                 :body-style="{ padding: '30px 300px 0' }">
          <div slot="header">
            <span class="box-title">个人信息</span>
          </div>
          <div class="box-attetion">
            请认真填写并核对以下信息，方便我们更好的为您提供服务。
          </div>
          <el-form ref="form2"
                   :model="form2"
                   :rules="form2Rule"
                   label-width="140px">
            <el-row>
              <el-col :span="16">
                <el-form-item label="联系人姓名"
                              prop="contactName">
                  <el-input v-model="form2.contactName"
                            placeholder="联系人姓名" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="手机号"
                              prop="mobile">
                  <el-input v-model="form2.mobile"
                            placeholder="手机号" />
                </el-form-item>
              </el-col>
              <el-col :span="16" class="td">
                <el-form-item label="公司地址"
                              prop="postalfulladdress">
                  <el-cascader v-model="form2.postalfulladdress"
                              :append-to-body='false'
                               :options="cityList"
                               :props="optionProps" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="详细地址"
                              prop="postalAddress">
                  <el-input v-model="form2.postalAddress"
                            placeholder="详细地址" />
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="职务"
                              prop="post">
                  <el-input v-model="form2.post"
                            placeholder="职务" />
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="所属单位名称"
                              prop="unit">
                  <el-input v-model="form2.unit"
                            placeholder="所属单位名称" />
                </el-form-item>
              </el-col>

              <!-- <el-col :span="16" class="td">
                <el-form-item label="公司地址"
                              prop="postalfulladdress">
                  <el-cascader v-model="form2.postalfulladdress"
                              :append-to-body='false'
                               :options="cityList"
                               :props="optionProps" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="详细地址"
                              prop="unit">
                  <el-input v-model="form2.postalAddress"
                            placeholder="详细地址" />
                </el-form-item>
              </el-col> -->
              <el-col :span="16">
                <el-form-item label="邮箱"
                              prop="email">
                  <el-input v-model="form2.email"
                            placeholder="邮箱" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>

      <el-col>
        <el-card class="box-form"
                 :body-style="{ padding: '30px 300px 0' }">
          <div slot="header">
            <span class="box-title">信息补充</span>
          </div>
          <div class="box-attetion">
            请认真填写并核对以下信息，方便我们更好的为您提供服务。
          </div>
          <el-form ref="form4"
                   :model="form4"
                   label-width="170px">
            <el-row>
              <el-col :span="16">
                <el-form-item label="需求项目所处阶段"
                              prop="stage">
                  <el-input v-model="form4.stage"
                            placeholder="需求项目所处阶段" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="技术参数要求"
                              prop="paramRequirement">
                  <el-input v-model="form4.paramRequirement"
                            placeholder="技术参数要求" />
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="知识产权要求"
                              prop="intellectualProperty">
                  <el-input v-model="form4.intellectualProperty"
                            placeholder="知识产权要求" />
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="对合作方要求"
                              prop="partner">
                  <el-input v-model="form4.partner"
                            placeholder="对合作方要求" />
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="上传文件">
                  <el-upload ref="upload"
                             :auto-upload="false"
                             class="upload-demo"
                             action=""
                             :on-remove="handleRemovecw"
                             :on-change="handleChangecw"
                             :file-list="remarkAttach"
                             :disabled="publicdisabled"
                             multiple>
                    <el-button size="small"
                               type="primary"
                               icon="el-icon-plus">点击上传</el-button>
                    <div slot="tip">只能上传doc/docx/xls/xlsx/pdf/jpg/png类型的附件，且不超过5Mb</div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="需求补充"
                              prop="remark">
                  <el-input v-model="form4.remark"
                            type="textarea"
                            :rows="5"
                            resize="none"
                            placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>

            <!-- <el-row justify="center"
                    type="flex">
              <el-button type="primary"
                         class="submit-form"
                         @click="postDemandDetail"><span class="icon-text">发布需求</span></el-button>
            </el-row> -->
            <el-row justify="left"
                    type="flex">
              <el-button type="primary"
                         class="submit-form"
                         @click="postDemandDetail"><span class="icon-text">确认发布</span></el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <div>
    </div>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { addDemandDetail } from '@/api/demandhall'
import { param2Form } from '@/utils'
export default {
  name: 'Demandhallpost',
  mixins: [common],
  data () {
    const validateproIntentionPrice=(rule,value,callback) => {
      if(value==''&&this.form3.faceFlag==0) {
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
        mobile: '',
        post: '',
        unit: '',
        postalProvince: '',
        postalCity: '',
        postalCounty: '',
        email: '',
        postalAddress:""
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
        remark_file:""
      },
      form1Rule: {
        name: [
          { required: true,message: '请输入需求名称',trigger: 'blur' }
        ],
        fulladdress: [
          { required: true,message: '请选择来源地',trigger: 'change' }
        ],
        industryOne: [
          { required: true,message: '请选择所属行业',trigger: 'change' }
        ],
        pic_file: [
          { required: true,message: '请输入图片',trigger: 'blur' }
        ],
        briefDesc: [
          { required: true,message: '请输入需求描述',trigger: 'blur' }
        ]
      },
      form2Rule: {
        contactName: [
          { required: true,message: '请输入联系人姓名',trigger: 'blur' }
        ],
        postalfulladdress: [
          { required: true,message: '请选择来源地',trigger: 'change' }
        ],
        mobile: [
          { required: true,message: '请输入手机号',trigger: 'blur' }
        ],
        post: [
          { required: false,message: '请输入职务',trigger: 'blur' }
        ],
        unit: [
          { required: true,message: '请输入所属单位名称',trigger: 'blur' }
        ],
        postalAddress:[
          { required: true,message: '请输入详细地址',trigger: 'blur' }
        ],
        email: [
          { required: true,message: '请输入邮箱',trigger: 'blur' }
        ]
      },
      form3Rule: {
        cooperation: [
          { required: true,message: '请输入意向合作方式',trigger: 'blur' }
        ],
        investTime: [
          { required: true,message: '请选择预计投入时间',trigger: 'change' }
        ],
        capital: [
          { required: true,validator: validateproIntentionPrice,message: '请输入意向投入资金',trigger: 'blur' }
        ],
        cooperationOrg: [
          { required: true,message: '请输入意向合作机构',trigger: 'blur' }
        ]
      },
      form4Rule: {
        stage: [
          { required: true,message: '请输入需求项目所处阶段',trigger: 'blur' }
        ],
        paramRequirement: [
          { required: true,message: '请输入技术参数要求',trigger: 'blur' }
        ],
        intellectualProperty: [
          { required: true,message: '请输入知识产权要求',trigger: 'blur' }
        ],
        partner: [
          { required: true,message: '请输入对合作方要求',trigger: 'blur' }
        ],
        remark: [
          { required: true,message: '请输入需求描述',trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      disabled: false,
      pic_file_list: [],
      fileList: [],
      remarkAttach: [],
      publicdisabled: false,
      picUrl: ''
    }
  },
  methods: {
    handleRemove (file) {
      this.pic_file_list.pop()
      this.form1.pic_file=null
    },
    // 删除文件
    handleRemovecw (file,fileList) {
      this.remarkAttach.pop()
      this.form4.remarkAttach=null
    },
    // 限制上传文件类型
    handleChangecw (file,fileList) {
      let testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      let extension1=testmsg==='jpg'
      let extension2=testmsg==='jpeg'
      let extension3=testmsg==='png'
      let extension4=testmsg==='doc'
      let extension5=testmsg==='docx'
      let extension6=testmsg==='xls'
      let extension7=testmsg==='xlsx'
      let extension8=testmsg==='pdf'
      if(!extension1&&!extension2&&!extension3&&!extension4&&!extension5&&!extension6&&!extension7&&!extension8) {
        this.remarkAttach = null
         return this.$message.error("上传附件子能是doc/docx/xls/xlsx/pdf/jpg/png/jpeg 格式!")
      }else if (file.size/1024/1024>5){
        this.remarkAttach = null
        return this.$message.warning('上传图片大小不能超过 5MB!')
      }else{
        this.remarkAttach=fileList
        console.log(fileList);
        this.form4.remark_file=file.raw
      }
    },
    handleImgChange (file) {
      const isIMG=file.raw.type.includes('image')
      const isLt2M=file.size/1024/1024<2
      this.$refs.form1.clearValidate('pic_file')
      if(!isIMG) {
        this.pic_file_list.pop()
        return this.$message.warning('只能上传图片!')
      }
      if(!isLt2M) {
        this.pic_file_list.pop()
        return this.$message.warning('上传图片大小不能超过 2MB!')
      }
      this.form1.pic_file=file.raw
    },
    handlePictureCardPreview (file) {
      this.picUrl=file.url
      this.dialogVisible=true
    },
    postDemandDetail () {
      Promise.all(this.valiaForm(['form1','form2','form3','form4'])).then(res => {
        this.loading=true
        const [province='',city='',county='']=this.form1.fulladdress
        const [postalProvince='',postalCity='',postalCounty='']=this.form2.postalfulladdress

        addDemandDetail(param2Form({ ...this.form1,...this.form2,...this.form3,...this.form4,province,city,county,postalProvince,postalCity,postalCounty })).then(res => {
          if(res.code=='0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/demandhall'
                })
              }
            })
          } else {
            this.$message.warning(res.msg)
          }
        }).finally(() => {
          this.loading=false
        })
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped lang="scss">
  .td{
  ::v-deep .el-scrollbar__wrap {
  overflow: scroll;
    width: 100%;
    height: 250px;
}
}
.tdd{
  ::v-deep .el-scrollbar__wrap {
  overflow: scroll;
    width: 100%;
    height: 213px;
}
}
.box-attetion {
  height: 62px;
  background: #f4f4f4;
  width: 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 62px;
  padding-left: 25px;
  margin-bottom: 21px;
}
.elforms {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.mt {
  margin-top: 100px;
}
.box-form {
  margin-bottom: 25px;
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #1e86f9;
    line-height: 25px;
    padding-left: 300px;
    &:after {
      content: "";
      height: 3px;
      width: 100%;
      background: #1e86f9;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
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
    border-color: #516fd2;
    background: #516fd2;
  }

  ::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #516fd2;
  }

  ::v-deep .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }

  .submit-form {
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    width: 183px;
    height: 42px;
    background: #1e86f9;
  }
}
.el-row--flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 80px;
  padding-left: 172px;
}
::v-deep .el-scrollbar__wrap {
  overflow: scroll;
    width: 100%;
    height: 250px;
}
</style>
