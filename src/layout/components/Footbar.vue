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
              <template v-if="item.key < 4">
                <div class="nav-link" v-for="i in item.children" :key="i.key">
                  <div v-if="!i.url">{{ i.name }}</div>
                  <el-link v-if="i.url" :underline="false" :href="i.url">{{
                    i.name
                  }}</el-link>
                </div>
              </template>
              <template v-else>
                <div style="width: 60px; overflow: hidden; white-space: wrap;">
                  <div
                    class="nav-link-service"
                    v-for="i in item.children"
                    :key="i.key"
                    style="text-align: center;gir"
                  >
                    <div style="text-align: center;" v-if="!i.url">{{ i.name }}</div>
                    <el-link v-if="i.url" :underline="false" :href="i.url">{{
                      i.name
                    }}</el-link>
                  </div>
                </div>
              </template>
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
              <div class="foot_right_connect_phone_item_num">186-1103-3326</div>
            </div>
          </div>
          <div class="foot_right_connect_wx">
            <div style="text-align: center; margin-left: 50px">
              <img
                width="35px"
                height="29px"
                src="../../assets/img/weixin.png"
                alt=""
              />

              <div class="qr_code_1" style="margin-top: 4px">
                <img width="150px" src="../../assets/img/foot_qr.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot_bottom">
        <div>官方运营机构</div>
        <div>北京中关村微纳能源投资有限公司</div>
        <div class="vertical_line"></div>
        <div style="display: flex; align-items: center;">
          Copyright © 2018-2021 北京市怀柔区北房镇幸福西街3号 zgcnano.com  <img width="16px" style="margin-left: 10px;" src="../../assets/img/guohui.png" />京ICP备2024047584号
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
        // {
        //   name: "首页",
        //   key: 1,
        //   children: [
        //     {
        //       name: "公司介绍",
        //       key: 1,
        //       url: "/#companyintro",
        //     },
        //     {
        //       name: "平台服务",
        //       key: 2,
        //       url: "/#platformservices",
        //     },
        //   ],
        // },
        {
          name: "科技成果",
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
              url: "/projectmanage#projectList",
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
          name: "产研对接",
          key: 3,
          children: [
            {
              name: "活动类型",
              key: 1,
              url: "/activitieshall#activitiesList",
            },
            {
              name: "活动状态",
              key: 1,
              url: "/activitieshall#activitiesList",
            },
          ],
        },
        {
          name: "企业需求",
          key: 3,
          children: [
            {
              name: "发布需求",
              key: 0,
              url: "",
            },
            {
              name: "需求清单",
              key: 1,
              url: "",
            },
            {
              name: "筛选需求",
              key: 2,
              url: "",
            },
          ],
        },
        {
          name: "集成服务",
          key: 4,
          children: [
            {
              name: "政",
              key: 0,
              url: "/services#zheng",
            },
            {
              name: "产",
              key: 1,
              url: "/services#chan",
            },
            {
              name: "学",
              key: 2,
              url: "/services#xue",
            },
            {
              name: "研",
              key: 3,
              url: "/services#yan",
            },
            {
              name: "金",
              key: 4,
              url: "/services#jin",
            },
            {
              name: "服",
              key: 5,
              url: "/services#fu",
            },
            {
              name: "用",
              key: 6,
              url: "/services#yong",
            },
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
  height: 600px;
  color: #ffffff;
  background: #191f2e;
  .foot_top {
    display: flex;
    justify-content: space-between;
  }
  .foot_bottom {
    margin-top: 20px;
    & > div {
      line-height: 32px;
    }
    .vertical_line {
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
      font-size: 14px;
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
    .nav-link-service {
      font-size: 16px;
      display: inline-block;
      margin-bottom: 10px;

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
      right: 4%;
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
