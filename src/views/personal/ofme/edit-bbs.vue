<template>
  <el-main v-loading="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">投稿信息</span>
          </div>
          <el-form ref="form1" :model="form1" :rules="form1Rule" label-width="120px" label-position="left">
            <el-row>
              <el-col :span="13">
                <el-form-item label="文章名称" prop="title">
                  <el-input v-model="form1.title" placeholder="项目名称" />
                </el-form-item>
              </el-col>

              <el-col :span="9" :offset="2">
                <el-form-item label="选择专栏" prop="columnId">
                  <el-select v-model="form1.columnId" placeholder="选择专栏">
                    <el-option v-for="item in colunmList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="15">
                <el-form-item label="关键词" prop="keywords">
                  <el-input v-model="form1.keywords" placeholder="关键词" />
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="文章内容" prop="content">
                  <Tinymce ref="editor" v-model="form1.content" :height="330" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="postBbsDetail"><span class="icon-text">确认保存</span></el-button>
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
import { addProjectDetail } from '@/api/projecthall'
import { getBBsColumnList, getBBsDetail, updateMyManuscript } from '@/api/bbshall'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Personaleditbbs',
  components: {
    Tinymce
  },
  mixins: [common],
  data() {
    return {
      form1: {
        title: '',
        columnId: '',
        keywords: '',
        content: '',
        id: ''
      },
      form1Rule: {
        title: [
          { required: true, message: '请输入文章名称', trigger: 'blur' }
        ],
        columnId: [
          { required: true, message: '请输入选择专栏', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      },
      colunmList: []

    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getBBsDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          this.form1 = _.merge(this.form1, _.pick(this.item, _.keys(this.form1)))
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getBBsColumnList().then(res => {
        if (res.code == '0000') {
          this.colunmList = res.rows
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    postBbsDetail() {
      Promise.all(this.valiaForm(['form1'])).then(res => {
        this.loading = true

        updateMyManuscript(param2Form({ ...this.form1 })).then(res => {
          if (res.code == '0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/personal/center/search-bbs'
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
        console.log('error form')
      })
    },
    godetail() {
      const { id } = this.$route.query
      this.$router.push({
        path: '/personal/center/detail-bbs',
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
