<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">认证信息</p>
      <el-form label-width="120px" label-position="left">
        <el-row>
          <el-col :span="24">
            <el-form-item label="认证状态：">
              <span :class="{'reject-color':item.status == 3}">{{ item.status | formatUserAuth }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="驳回原因：">
              <span>{{ item.auditComments }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-button class="sure-btn" @click="goauth">去认证</el-button><el-button class="cancel-btn" @click="gocenter">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import common from '@/mixin/common'

export default {
  name: 'Personalrejected',
  mixins: [common],
  computed: {
    item() {
      return this.$store.getters.item
    }
  },
  methods: {
    gocenter() {
      this.$router.push({
        path: '/personal/center/'
      })
    },
    goauth() {
      if (this.item.userType == 4) {
        this.$router.push({
          path: '/personal/center/edit-experts'
        })
      } else if (this.item.userType == 3) {
        this.$router.push({
          path: '/personal/center/edit-org'
        })
      } else if (this.item.userType == 2) {
        this.$router.push({
          path: '/personal/center/edit-company'
        })
      } else if (this.item.userType == 5) {
        this.$router.push({
          path: '/personal/center/edit-manger'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.reject-color {
  color: crimson;
}
.userinfo{
  padding: 35px 23px;
  .ttile{
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    margin: 0 0 40px;
  }

  .avatar{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
  }

  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 500;
    color: #999999;
  }

  ::v-deep .el-form-item__content {
    font-size: 16px;
    color: #666666;
  }

  .el-form {
    padding: 50px 30px;
    background: #F6F6F6;
  }

  .mtf60 {
    margin-top: -70px;
  }

}

.cancel-btn {
  width: 111px;
  height: 42px;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 3px;

  font-size: 16px;
  font-weight: 400;
  color: #666666;

}

.sure-btn {
  margin-left: 25px;
  width: 111px;
  height: 42px;
  background: #4D6DDA;
  border-radius: 3px;

  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
}
</style>
