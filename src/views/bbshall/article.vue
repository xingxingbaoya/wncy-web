<template>
  <el-main class="content">
    <el-card class="play-content"
             :body-style="{ padding:'15px' }">
      <el-col :span="16"
              class="play-right">
        <div>
          <div class="play-title">{{ item.actName }}</div>
          <p class="play-status">
            <span class="p-ft_cw">发布时间: </span><span class="mr20">{{ item.createTime }}</span>
          </p>
        </div>
        <img v-real-img="item.actCover"
             :src="item.newsCoverLog">
        <div slot="header">
          <!-- <span class="box-title">活动介绍</span> -->
        </div>
        <div class="text-content"
             v-html="item.actDetail" />
      </el-col>
      <el-col :span="8"
              class="play-right">
        <div class="newslist">
          <div class="title">
            相关文章
          </div>
          <div class="items">
            <div class="item"
                 v-for="(item,index) in actList"
                   @click="goarticle(item.actId)"
                 :key="index">
              {{item.actName}}
            </div>
          </div>
        </div>
      </el-col>
    </el-card>
  </el-main>
</template>

<script>
import common from '@/mixin/common'
import { getActivityDetail,signUpActivity } from '@/api/activitieshall'
import { getNews } from '@/api/meet'


export default {
  name: 'Bbshallarticle',
  mixins: [common],
  data () {
    return {
      actList: [],
      SignUpDialog: false,
      signUpForm: {
        signName: '',
        contactInfo: '',
        companyName: '',
        post: ''
      },
      rules: {
        signName: [
          { required: true,message: '请输入姓名',trigger: 'blur' }
        ],
        contactInfo: [
          { required: true,message: '请输入手机号',trigger: 'blur' }
        ],
        companyName: [
          { required: true,message: '请输入公司名称',trigger: 'blur' }
        ],
        post: [
          { required: true,message: '请输入职位',trigger: 'blur' }
        ]
      },
      item: {

      }
    }
  },
  computed: {
    isSignUp () {
      return this.item.signUpEnable=='1'
    }
  },
  methods: {
    signUp () {
      this.SignUpDialog=true
    },
    signUpSubmit (signUpForm) {
      const { id: actId }=this.$route.query

      this.$refs[signUpForm].validate((valid) => {
        if(valid) {
          this.loading=true
          signUpActivity({ ...this.signUpForm,actId }).then(res => {
            if(res.code=='0000') {
              this.$message.success(res.msg)
            } else {
              this.$message.warning(res.msg)
            }
          }).finally(() => {
            this.SignUpDialog=false
            this.loading=false
            this.$refs[signUpForm]?.resetFields()
          })
        } else {
          return false
        }
      })
    },
    closeSignUpDialog () {
      this.SignUpDialog=false
    },
    loadData (actId) {
      let id = actId ? actId : this.$route.query.id
        // const { id }=this.$route.query
      this.loading=true
      getActivityDetail({actId:id}).then(res => {
        if(res.code=='0000') {
          const regex=new RegExp('<img','gi')
          res.obj.actDetail=res.obj.actDetail.replace(regex,`<img style="max-width: 100%; height: auto"`);
          this.item=res.obj

          this.actList=res.obj.actList.filter((item=>{
            return item.actId !==res.obj.actId
          }))
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading=false
        }
      )
    },
    goarticle (id) {
      this.goBlank({
        path: '/bbshall/article',
        query: {
          id
        }
      })
    },
  }
}
</script>

<style scoped lang="scss">
.newslist {
  .title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    position: relative;
    width: 100%;
    padding-bottom: 20px;
  }
  .title::after {
    content: ""; // 必须
    position: absolute;
    left: 0px;
    bottom: 0;
    right: 0;
    width: 720px;
    height: 1px;
    background-color: #dcdcdc;
  }
  .items {
    margin-top: 20px;
    .item {
      margin-top: 10px;
      cursor: pointer;
    }
    .item:hover{
      cursor: pointer;
      color:#1875f2
    }
  }
}
.p-ft_cw {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #666666;
}
.libm {
  width: 224px;
  height: 47px;
  background: linear-gradient(90deg, #1875f2 0%, #37b9fa 100%);
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  text-align: center;
  line-height: 47px;
  margin-right: 41px;
  cursor: pointer;
}
.qxbm {
  cursor: pointer;
  width: 224px;
  height: 47px;
  background: #999999;
  border-radius: 2px;
  font-size: 20px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  line-height: 47px;
  text-align: center;
}
.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  margin-top: 100px;
}
.play-content {
  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .article-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 380px;
    }
  }
  .play-right {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding-left: 35px;
  }

  .play-title {
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    line-height: 1.5;
  }

  .play-status {
    height: 17px;
    font-size: 18px;
    font-weight: 400;
    color: #999999;

    .mr20 {
      margin-right: 200px;
    }
  }

  .play-right-btn {
    display: flex;
    justify-content: flex-start;
  }
  .see {
    /*width: 205px;*/
    padding: 10px 16px;
    border: 2px solid #516fd2;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #516fd2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .see {
    background: #516fd2;
    color: #ffffff;
    margin-right: 35px;
    .icon {
      width: 50px;
      height: 28px;
      vertical-align: -8px;
    }
  }

  .see-pd {
    margin-right: 10px;
  }
}

.detail-content {
  margin-top: 31px;
  .box-card-left {
    min-height: 250px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #1e86f9;
    line-height: 25px;
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
    border-bottom: 1px solid #eeeeee;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
  }
}

.left-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.sign-log {
  border-radius: 3px;
}

::v-deep .el-dialog__body {
  padding: 15px;
  margin-top: 160px;

}
::v-deep .el-dialog__header {
  padding: 0;
}

::v-deep .el-dialog__headerbtn {
  font-size: 30px;
  z-index: 999;
}

.el-dialog__headerbtn:focus ::v-deep .el-dialog__close,
.el-dialog__headerbtn:hover ::v-deep .el-dialog__close {
  color: #516fd2 !important;
}

.right-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 30px 0 0;

  .right-head {
    width: 400px;
    .right-title {
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin: 0;
      padding-bottom: 20px;
    }
    .right-desc {
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      margin: 0;
    }
  }

  .rform {
    /*height: 400px;*/
  }

  .sub-layout {
    /*padding-top: 20px;*/
  }

  .right-submit {
    width: 199px;
    background: #516fd2;
    border-radius: 3px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    padding: 16px 20px;
  }
}

.el-form {
  margin-top: 30px;
  width: 400px;
  ::v-deep .el-input__inner {
    height: 60px;
    background: #f2f3f5;
    border-radius: 0 3px 3px 0;
    border-left: 0;
  }

  ::v-deep .el-input-group__prepend {
    background: #f2f3f5;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }
  ::v-deep .el-form-item__content {
  }
  ::v-deep .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-input__inner:focus,
  .el-form-item.is-error .el-textarea__inner,
  .el-form-item.is-error .el-textarea__inner:focus,
  .el-message-box__input input.invalid,
  .el-message-box__input input.invalid:focus {
    border-color: #dcdfe6;
  }

  ::v-deep .el-input.is-active .el-input__inner,
  ::v-deep .el-input__inner:focus {
    border-color: #dcdfe6 !important;
  }

  ::v-deep .el-form-item {
    margin-bottom: 30px;
  }
}
</style>
