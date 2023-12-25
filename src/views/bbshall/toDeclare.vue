<template>
  <el-main v-loading="loading"
           class="content">
    <!-- <el-row class="search-content">
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
    </el-row> -->
    <el-card class="box-form"
             :body-style="{ padding: '30px' }">
      <!-- <div slot="header">
        <span class="box-title">文章信息</span>
      </div> -->
      <el-form ref="form"
               :model="form"
               label-width="130px"
               :rules="formRules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="企业名称"
                          prop="company">
              <el-input v-model="form.company"
                        placeholder="企业名称" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="联系人姓名"
                          prop="nikName">
              <el-input v-model="form.nikName"
                        placeholder="联系人姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话"
                          prop="contact">
              <el-input v-model="form.contact"
                        placeholder="电话" />
            </el-form-item>
          </el-col>

          <el-col :span="22">
            <el-form-item label="申报描述"
                          prop="nikDescribe"
                          style="margin-bottom: 30px;">
              <Tinymce ref="editor"
                       v-model="form.nikDescribe"
                       :height="530" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="申报时间" prop="keywords">
              <el-date-picker
              v-model="form.declareTime"
              type="date"
              placeholder="申报日期">
            </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row justify="center"
                type="flex">
          <el-button type="primary"
                     class="submit-form"
                     @click="submitAnswer('form')"><span class="icon-text">提交申报</span></el-button>
        </el-row>
      </el-form>
    </el-card>

    <el-row />
  </el-main>

</template>

<script>
import Tinymce from '@/components/Tinymce'
import common from '@/mixin/common'
import { addBBsManuscript,addBBsQuestion,getBBsColumnDetail,postBBsQsAnswers,addZgcPolicyInterpretation } from '@/api/bbshall'
export default {
  name: 'ToDeclare',
  components: {
    Tinymce
  },
  mixins: [common],
  data () {
    return {
      form: {
        company: '',
        nikName: '',
        contact: '',
        nikDescribe: ""
      },
      formRules: {
        company: [{ required: true,message: '请填写企业名称',trigger: 'blur' }],
        nikName: [{ required: true,message: '请填写联系人名称',trigger: 'blur' }],
        contact: [{ required: true,message: '请填写电话号码',trigger: 'blur' }],
        nikDescribe: [{ required: true,message: '请填写申报描述',trigger: 'blur' }]
      },
      item: {}
    }
  },
  methods: {
    // loadData () {
    //   this.loading=true
    //   const { id }=this.$route.query
    //   getBBsColumnDetail(id).then(res => {
    //     if(res.code=='0000') {
    //       this.item=res.obj
    //     } else {
    //       this.$message.warning(res.msg)
    //     }
    //   }).finally(() => {
    //     this.loading=false
    //   })
    // },
    submitAnswer (ref) {
      const { id }=this.$route.query
      addZgcPolicyInterpretation({ ...this.form,policyId: id }).then(res => {
        if(res.code=='0000') {
          this.$message.success(res.msg)
          this.$router.push({
            path: '/bbshall/policyDeclaration',
            query: {
              id
            }
          })
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  margin-top: 120px;
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
        .count-read {
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
      content: "";
      height: 3px;
      width: 100%;
      background: #516fd2;
      margin-top: 10px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    padding: 28px 30px 12px;
    border-bottom: 1px solid #ebeef5;
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
    color: #ffffff;
    width: 172px;
    height: 50px;
    background: #4d6dda;
    border-radius: 3px;
  }
}
</style>
