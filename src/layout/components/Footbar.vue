<template>
  <div>
    <div class="footbar">
      <div class="foot_top">
        <div class="foot_left">
          <el-row :gutter="20">
            <el-col
              :span="24 / navList.length"
              v-for="item in navList"
              :key="item.key"
            >
              <div class="title">{{ item.name }}</div>
              <div class="nav-link" v-for="i in item.children" :key="i.key">
                <el-link :underline="false" :href="i.url">{{ i.name }}</el-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="foot_middle"></div>
        <div class="foot_right">
          <div class="foot_right_connect_phone">
            <img
              width="45px"
              height="45px"
              src="../../assets/img/foot_phone.png"
              alt=""
            />
            <div class="foot_right_connect_phone_item">
              <div class="foot_right_connect_phone_item_name">客户电话</div>
              <div class="foot_right_connect_phone_item_num">400-888-8888</div>
            </div>
          </div>
          <div class="foot_right_connect_wx">
            <div style="text-align: center;margin-left: 50px;">
              <img
                width="35px"
                height="29px"
                src="../../assets/img/weixin.png"
                alt=""
              />

              <div class="qr_code_1" style="margin-top: 4px">
                <img width="100px" src="../../assets/img/foot_qr.png" alt="" />
              </div>
            </div>
            <div style="text-align: center;margin-left: 50px;">
              <img
                width="28px"
                height="33px"
                src="../../assets/img/douyin.png"
                alt=""
              />
              <div class="qr_code_2">
                <img width="100px" src="../../assets/img/home/douyin-code.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot_bottom">
        <div>官方运营机构</div>
        <div>北京市海淀区北四环西路50号6层</div>
        <div class="vertical_line"></div>
        <div>
          Copyright c 2018-2021 weina.com 北京中关村微纳能源投资有限公司 京ICP备
          15018214号
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from "@/mixin/common";

export default {
  mixins: [common],
  data: () => {
    return {
      navList: [
        {
          name: "首页",
          key: 1,
          children: [
            {
              name: "公司介绍",
              key: 1,
              url: "/#companyintro",
            },
            {
              name: "平台服务",
              key: 2,
              url: "/#platformservices",
            },
          ],
        },
        {
          name: "项目管理",
          key: 2,
          children: [
            {
              name: "发布项目",
              key: 1,
              url: "/projectmanage/publish",
            },
            {
              name: "项目清单",
              key: 2,
              url: "/projectmanage",
            },
            {
              name: "筛选项目",
              key: 3,
              url: "/projectmanage",
            },
            // {
            //   name: "项目详情",
            //   key: 4,
            //   url: "",
            // },
          ],
        },
        {
          name: "活动展示",
          key: 3,
          children: [
            {
              name: "活动清单",
              key: 1,
              url: "/activitieshall",
            },
          //   {
          //     name: "活动详情",
          //     key: 2,
          //     url: "",
          //   },
          //   {
          //     name: "我要报名",
          //     key: 3,
          //     url: "",
          //   },
          ],
        },
      ],
    };
  },
  computed: {
    isService() {
      return this.$route.name == "Servicehalldetail";
    },
  },
};
</script>

<style lang="scss" scoped>
.s-img {
  margin-bottom: 30px;
  height: 270px;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.footbar {
  padding: 0 calc((100% - 1380px) / 2);
  height: 450px;
  color: #ffffff;
  background: #191f2e;
  overflow: hidden;
  .foot_top {
    display: flex;
    justify-content: space-between;
  }
  .foot_bottom {
    margin-top: 20px;
    &>div{
      line-height: 32px;
    }
    .vertical_line{
      height: 2px;
      background: #ffffff;
      width: 100%;
      margin-top: 20px;
    }
  }
  .title {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
    line-height: 32px;
    margin-bottom: 20px;
  }
  .foot_left {
    margin-top: 67px;
    flex: 3.5;
    position: relative;
    .nav-link {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #ffffff;
      line-height: 32px;
      margin-bottom: 10px;
      user-select: none;
      .el-link {
        color: #ffffff;
      }
    }
    &::after {
      content: "";
      display: block;
      width: 1px;
      background: #ffffff;
      position: absolute;
      right: 10%;
      height: 60%;
      top: 10px;
    }
  }
  .foot_right {
    flex: 1.5;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .foot_right_connect_phone {
      display: flex;
      padding-left: 50px;
      img {
        margin-right: 20px;
        margin-top: 10px;
      }
      .foot_right_connect_phone_item_name {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 32px;
      }
      .foot_right_connect_phone_item_num {
        font-size: 38px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        line-height: 75px;
      }
    }
    .foot_right_connect_wx {
      display: flex;
      img {
        cursor: pointer;
      }
      .qr_code_1,
      .qr_code_2 {
        // display: none;
      }
      img:first {
        &:hover {
          .qr_code_1 {
            display: block;
          }
        }
      }
      img:last {
        &:hover {
          .qr_code_1 {
            display: block;
          }
        }
      }
    }
  }
}
</style>
