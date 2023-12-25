<template>
  <el-main>
    <el-card :body-style="{ padding: '25px 32px' }" class="bot-card">
      <h3>{{ item.title }}</h3>
      <div v-html="item.content" />
      <div class="bot-cont">
        <img v-real-img="item.photo" class="bot-user" :src="`${imgUrl}/manger.jpg`" alt="img">
        <span class="bot-answer">提问者：{{ item.createByName }}</span>
        <span class="bot-time">时间：{{ item.createTime }}</span>
      </div>
    </el-card>

    <el-card :body-style="{ padding: '0' }" class="bottom-card">
      <div slot="header">
        <span class="title">评论</span>
      </div>
      <el-row class="bot-bg">
        <el-col v-for="item in listData" :span="24" class="card-bot">
          <el-card :body-style="{ padding: '14px 30px 30px' }" class="bot-layout">
            <img v-real-img="item.photo" class="bot-user" :src="`${imgUrl}/manger.jpg`" alt="img">
            <div class="bot-right">
              <p class="bot-header">
                <span class="bot-name">{{ item.userName }}</span>
                <span class="bot-time">{{ item.createTime | formatDate }}</span>
              </p>
              <p class="bot-desc">{{ item.answerContent }}</p>
            </div>
          </el-card>
        </el-col>
        <Empty v-show="!listData.length" />
      </el-row>
    </el-card>

    <el-card :body-style="{ padding: '20px 30px' }" class="bottom-commet">
      <div slot="header">
        <span class="title">我要评论</span>
      </div>
      <el-row class="comment-layout">
        <el-col :span="24">
          <el-input
            v-model="answerContent"
            type="textarea"
            :rows="7"
            resize="none"
            placeholder="请输入您要评论的内容..."
          />
        </el-col>
      </el-row>
      <el-row justify="end" type="flex">
        <el-button type="primary" class="submit-form" @click="submitAnswer"><span class="icon-text">提交评论</span></el-button>
      </el-row>
    </el-card>

  </el-main>

</template>

<script>
import { getBBsIndustry, getBBsIndustryList, getBBsQsAnswers, getBBsQsDetail, postBBsQsAnswers } from '@/api/bbshall'
import common from '@/mixin/common'

export default {
  name: 'BBShallanswer',
  mixins: [common],
  data() {
    return {
      answerContent: '',
      item: {

      },
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { id } = this.$route.query
      const { pageNum } = this.pager
      getBBsQsDetail(id).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })

      getBBsQsAnswers({ questionId: id }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    submitAnswer() {
      this.loading = true
      const { id } = this.$route.query
      if (_.isEmpty(this.answerContent)) {
        return this.$message.warning('评论的内容不能为空')
      }
      postBBsQsAnswers({ questionId: id, answerContent: this.answerContent }).then(res => {
        if (res.code == '0000') {
          this.$message.success(res.msg)
          this.answerContent = ''
          this.loadData()
          // this.$router.go(0)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.bot-card {
  margin-bottom: 25px;
  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    margin: 0 0 17px;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: #666666;
  }

  .bot-cont {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    .bot-user{
      height: 58px;
      width: 58px;
      border-radius: 50%;
    }
    .bot-answer {
      margin: 0 50px 0 17px;
    }

  }
}

.bottom-card {
  margin-bottom: 25px;
  .title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
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
    border-bottom: 3px solid #EEEEEE;
  }

  .card-bot {
    margin-bottom: 1px;
  }
  .bot-bg {
    background: #EEEEEE;
  }

  .bot-layout {

    ::v-deep .el-card__body {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
    }
    .bot-user {
      height: 58px;
      width: 58px;
      border-radius: 50%;
      margin-top: 16px;
    }
    .bot-desc {
      font-size: 18px;
      font-weight: 400;
      color: #666666;
      line-height: 1.5;
      margin: 0;
    }

    .bot-right {
      display: inline-block;
      width: calc(100% - 58px);
      padding-left: 16px;
      .bot-header {
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bot-name {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
      }

      .bot-time {
        font-size: 18px;
        font-weight: 500;
        color: #999999;
      }

    }
  }

}

.bottom-commet {
  .comment-layout {
    margin-bottom: 25px;
  }

  ::v-deep .el-card__header {
    padding: 28px 30px 12px;
    border-bottom: 3px solid #EEEEEE;
  }
  ::v-deep .el-textarea__inner {
    background: #F6F6F6;
    border-radius: 3px;
    border: none;
  }
  .title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    &:after {
      content: '';
      height: 3px;
      width: 100%;
      background: #516FD2;
      margin-top: 10px;
      display: block;
    }
  }

  .submit-form {
    width: 172px;
    height: 50px;
    background: #4D6DDA;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>
