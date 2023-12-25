<template>
  <el-main v-loading.fullscreen.lock="loading">
    <el-row class="row-bg">
      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">课程信息</span>
          </div>
          <el-form ref="form1" :model="form1" label-width="140px" label-position="left">
            <el-row>
              <el-col :span="11">
                <el-form-item label="课程名称" prop="name">
                  <span>{{ form1.name }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="发布人" prop="industryOne">
                  <span>{{ form1.industryOne | formatIndustryOne }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="课程形式" prop="fulladdress">
                  <span>{{ form1.province | MapName(form1.city,form1.country) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="发布时间" prop="fulladdress">
                  <span>{{ form1.province | MapName(form1.city,form1.country) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="审核状态" prop="fulladdress">
                  <span>{{ form1.province | MapName(form1.city,form1.country) }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="11" :offset="2">
                <el-form-item label="封面图片" prop="pic_file">
                  <img v-real-img="form1.pic_file" :src="`${imgUrl}/product.jpg`" alt="上传图片" class="image">
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="课程简介" prop="briefDesc">
                  <span>{{ form1.briefDesc }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="课程视频" prop="briefDesc">
                  <img v-real-img="form1.pic_file" :src="`${imgUrl}/product.jpg`" alt="上传图片" class="image">
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="课程内容" prop="briefDesc">
                  <span>{{ form1.briefDesc }}</span>
                </el-form-item>
              </el-col>
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
  name: 'Personaldetailtalent',
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
        path: '/personal/center/edit-talent',
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
                  path: '/personal/center/search-talent'
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

}
</style>
