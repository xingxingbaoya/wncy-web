<template>
  <el-main v-loading="loading">
    <el-row class="search-content">
      <el-card :body-style="{ padding: '24px 40px' }" class="inner_card" shadow="hover">
        <div class="inner-top">
          <div class="inner-img">
            <img :src="`${imgUrl}/test.jpeg`" class="image" alt="img">
            <div class="inner-con">
              <h3 class="inner-title">{{ item.name }}</h3>
              <p class="inner-count"><span class="count-read">发布时间</span><span>{{ item.createTime | formatDate }}</span></p>
              <p class="inner-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
    <el-card class="box-form" :body-style="{ padding: '30px' }">
      <div slot="header">
        <span class="box-title">文章信息</span>
      </div>
      <el-form ref="form1" :model="form" label-width="100px" :rules="formRules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title" placeholder="文章标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="关键词" prop="keywords">
              <el-input v-model="form.keywords" placeholder="关键词" />
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item label="文章内容" prop="content" style="margin-bottom: 30px;">
              <Tinymce ref="editor" v-model="form.content" :height="530" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="center" type="flex">
          <el-button type="primary" class="submit-form" @click="submitAnswer('form1')"><span class="icon-text">提交申报</span></el-button>
        </el-row>
      </el-form>
    </el-card>

    <el-row />
  </el-main>

</template>

<script>
import Tinymce from '@/components/Tinymce'
import common from '@/mixin/common'
import { addBBsManuscript, addBBsQuestion, getBBsColumnDetail, postBBsQsAnswers } from '@/api/bbshall'
export default {
  name: 'BBShallpost',
  components: {
    Tinymce
  },
  mixins: [common],
  data() {
    return {
      form: {
        title: '',
        keywords: '',
        content: ''
      },
      formRules: {
        title: [{ required: true, message: '请填写文章标题', trigger: 'blur' }],
        keywords: [{ required: true, message: '请填写关键词', trigger: 'blur' }],
        content: [{ required: true, message: '请填写文章内容', trigger: 'blur' }]
      },
      item: {}
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id } = this.$route.query
      getBBsColumnDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    submitAnswer(ref) {
      const { id } = this.$route.query
      const { name } = this.item
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.loading = true
          addBBsManuscript({ ...this.form, columnId: id, columnName: name }).then(res => {
            if (res.code == '0000') {
              this.$message.success(res.msg)
              this.$router.push({
                path: '/bbshall/list',
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
.td{
  ::v-deep .el-scrollbar__wrap {
  overflow: scroll;
    width: 100%;
    height: 250px;
}
}
.search-content {
  margin-bottom: 25px;
  .inner_card {
    .inner-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .inner-img {
        display: flex;
        justify-content: flex-start;
        img {
          margin-right: 30px;
          height: 144px;
          width: 144px;
        }
      }

      .inner-title {
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        margin-top: 10px;
        margin-bottom: 0;
      }

      .inner-count {
        font-size: 20px;
        font-weight: 500;
        margin-top: 30px;
        color: #666666;
        .count-read{
          margin-right: 30px;
        }
      }

      .inner-desc {
        font-size: 18px;
        font-weight: 500;
        color: #666666;
        margin-top: 16px;
        margin-bottom: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.box-form {
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
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
