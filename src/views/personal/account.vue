<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">账号信息</p>
      <el-form label-width="120px" label-position="left">
        <el-row>
          <el-col :span="15">
            <el-form-item :label="labelName">
              <span>{{ item.nickName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-form-item label="头像：">
              <img v-if="item.avatar" :src="item.avatar" alt="" class="avatar">
              <svg-icon v-else icon-class="avatar" class-name="avatar" />
            </el-form-item>
          </el-col>
          <el-col :span="15" class="mtf60">
            <el-form-item label="工作单位：">
              <span>{{ item.workUnit }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="地址：">
              <span>{{ item.province | MapName(item.city, item.area) }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="用户名：">
              <span>{{ item.userName }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="公司类型：">
              <span>{{ item.companyType | formatCompany }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="详细地址：">
              <span>{{ item.address }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="个人简介：">
              <span>{{ item.introduction }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="手机号：">
              <span>{{ item.phone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>

</template>

<script>
import common from '@/mixin/common'
import store from '@/store'

export default {
  name: 'Personalread',
  mixins: [common],
  data() {
    return {
      item: {}
    }
  },
  computed: {
    labelName() {
      return this.item.authType == 1 ? '公司名称:' : '姓名:'
    }

  },
  mounted() {
    console.log(this.user, 'this.item')
  },
  methods: {
    loadData() {
      this.loading = true
      store.dispatch('user/getInfo').then((res) => {
        this.item = res
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
    font-size: 14px;
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
</style>
