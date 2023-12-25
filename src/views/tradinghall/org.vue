<template>
  <el-main v-loading="loading">
    <el-row class="main-layout">
      <el-col v-for="(item,index) in listData" :key="item.id" :span="8" class="c-layout" :class="clearPadding(index)">
        <el-card class="c-card" :body-style="{ padding: '20px 16px' }" @click.native="godetail(item)">
          <el-row justify="flex-start" type="flex">
            <div class="l">
              <img v-real-img="item.avatar" :src="`${imgUrl}/org.jpg`" class="l1">
            </div>
            <div class="r">
              <p class="r1">{{ item.nickName }}</p>
              <p class="r2">机构性质：{{ item.institutionalNature | formatInsnature }}</p>
              <p class="r3">服务类型：{{ item.serviceType | formatCompany }}</p>
              <p class="r4">地域：{{ item.province | formatCity }}</p>
            </div>
          </el-row>
        </el-card>
      </el-col>
      <Empty v-show="!listData.length" />
    </el-row>
    <el-row type="flex" justify="center" class="mb">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pager.pageSize"
        :total="pager.total"
        :current-page="pager.pageNum"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </el-main>

</template>

<script>
import common from '@/mixin/common'
import { getUserList } from '@/api/home'
export default {
  name: 'Tradinghallorg',
  mixins: [common],
  data() {
    return {
      listData: []
    }
  },
  methods: {
    loadData() {
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 15 }
      this.pager.pageSize = formpage.pageSize
      getUserList({ userType: 3, ...formpage }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
          this.$set(this.pager, 'total', res.total)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    godetail({ id }) {
      this.goBlank({
        path: '/tradinghall/org-detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

.main-layout {
  padding: 100px calc((100% - 1245px) / 2) 38px;

  // margin-bottom: 34px;
  // padding-top: 92px;
}
.c-layout {
  cursor: pointer;
  padding-right: 17px;
  padding-bottom: 17px;
}

.c-card{

  .l {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .l1 {
      width: 88px;
      height: 88px;
    }

    .l2 {
      margin:8px 0 0;
      width: 88px;
      height: 22px;
      line-height: 22px;
      background: #516FD2;
      border-radius: 3px;

      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
    }
  }

  .r {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    line-height: 1.5;

    p {
      margin: 0;
    }

    .r1 {
      font-size: 20px;
      font-weight: 400;
      color: #333333;
      overflow: hidden;
      width: 250px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .r2,.r3,.r4 {
      font-size: 16px;
      font-weight: 400;
      color: #666666;
    }

  }
}
.mb{
  margin-bottom: 30px;
}

</style>
