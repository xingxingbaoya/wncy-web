<template>
  <el-main>
    <el-card class="box-form" :body-style="{ padding: '30px' }">
      <div slot="header">
        <span class="box-title">我要提问</span>
      </div>
      <el-form ref="form1" :model="form" label-width="100px" :rules="formRules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="问题标题" prop="title">
              <el-input v-model="form.title" placeholder="问题标题" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="问题内容" prop="content">
              <el-input
                v-model="form.content"
                type="textarea"
                :rows="15"
                resize="none"
                placeholder="请输入您的问题内容..."
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="center" type="flex">
          <el-button type="primary" class="submit-form" @click="submitQuestion('form1')"><span class="icon-text">提交问题</span></el-button>
        </el-row>
      </el-form>
    </el-card>

  </el-main>

</template>

<script>
import { addBBsManuscript, addBBsQuestion } from '@/api/bbshall'

export default {
  name: 'BBShallpost',
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      formRules: {
        title: [{ required: true, message: '请填写问题标题', trigger: 'blur' }],
        content: [{ required: true, message: '请填写问题内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitQuestion(ref) {
      this.loading = true
      const { id } = this.$route.query
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.loading = true
          addBBsQuestion(this.form).then(res => {
            if (res.code == '0000') {
              this.$message.success(res.msg)
              this.$router.push({
                path: '/bbshall/question',
                query: {
                  id
                }
              })
            } else {
              this.$message.warning(res.msg)
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
      margin-top: 10px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    padding: 28px 30px 12px;
    border-bottom: 1px solid #EBEEF5;
  }

  ::v-deep .el-input__inner {
    height: 34px;
    font-size: 18px;
  }

  ::v-deep .el-input__inner::placeholder {
    font-weight: 500;
    color: #999999;
  }

  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #333333;
  }

  .submit-form {
    font-size: 18px;
    font-weight: 400;
    color: #FFFFFF;
    width: 172px;
    height: 50px;
    background: #4D6DDA;
    border-radius: 3px;
  }

}

</style>
