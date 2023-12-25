<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">问答信息</span>
          </div>
          <el-form ref="form1" :model="form1" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="22">
                <el-form-item label="问题标题" prop="name">
                  <span>{{ form1.title }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="发布时间">
                  <span>{{ form1.createTime }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="22">
                <el-form-item label="问题内容">
                  <div v-html="form1.content" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row justify="flex-start" type="flex">
              <el-button type="primary" class="submit-form" @click="goedit"><span class="icon-text">编辑问答</span></el-button>
              <el-button type="primary" class="cancel-form" @click="godelete"><span class="icon-text">删除问答</span></el-button>
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
import { deleteMyManuscript, deleteMyQuestion, getBBsDetail, getBBsQsDetail } from '@/api/bbshall'
export default {
  name: 'Personaldetailquestion',
  mixins: [common],
  data() {
    return {
      form1: {
        title: '',
        createTime: '',
        content: ''
      }
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      getBBsQsDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          this.form1 = _.merge(this.form1, _.pick(this.item, _.keys(this.form1)))
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
        path: '/personal/center/edit-question',
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
        deleteMyQuestion(id).then(res => {
          if (res.code == '0000') {
            this.$message.success({
              message: res.msg,
              onClose: () => {
                this.$router.push({
                  path: '/personal/center/search-question'
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
