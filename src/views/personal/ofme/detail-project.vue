<template>
  <el-main v-loading="loading">
    <el-row class="row-bg">
      <el-col>
        <div class="project-detail-wrap">
          <div class="project-detail-wrap-left">
            <div class="project-wrap project-info">
              <el-row>
                <el-col :span="24">
                  <span class="title">{{ form2.title || "无" }}</span>
                </el-col>
                <el-col :span="24">
                  <span
                    class="value"
                    style="
                      color: #999999;
                      margin: 10px 0 40px;
                      display: flex;
                      align-items: center;
                    "
                    ><img src="~img/projectManage/time.png" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{
                      form2.createTime || "-"
                    }}</span
                  >
                </el-col>
              </el-row>
              <div class="project-info-theme">项目介绍</div>
              <el-row>
                <el-col :span="24">
                  <span class="name">所在院所</span>
                  <span class="values">{{ academy }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">北京十大高精尖产业</span>
                  <span class="values">{{ industryKind.top10hg }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">北京2411产业</span>
                  <span class="values">{{ industryKind.bj2441 }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">中关村241产业</span>
                  <span class="values">{{ industryKind.zgckjy241 }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">应用场景</span>
                  <span class="values">{{ form2.scenario }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">项目类别</span>
                  <span class="values">{{ form2.typeDescription }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">合作意向</span>
                  <span class="values">{{ expire.join(",") }}</span>
                </el-col>
              </el-row>
              <div class="project-info-theme">项目简介</div>
              <span
                style="
                  line-height: 36px;
                  margin-bottom: 55px;
                  display: inline-block;
                "
                v-html="form2.proIntroduct"
              ></span>
              <div class="project-info-theme">项目附件</div>
              <template v-if="form2.attachment.split('/').length">
                <span>{{ form2.attachment.split('/')[form2.attachment.split('/').length - 1]}}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;<a v-if="form2.attachment" style="color: #2434AF;cursor: pointer;" @click="downFile">下载</a>
              </template>
              <div class="project-info-theme">联系信息</div>
              <el-row>
                <el-col :span="24">
                  <span class="name">联系人</span>
                  <span class="values">{{ form2.linkman }}</span>
                </el-col>
                <el-col :span="24">
                  <span class="name">联系方式</span>
                  <span class="values">{{ form2.phone }}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-col>

      <el-col>
        <el-card class="box-form" :body-style="{ padding: '30px' }">
          <div slot="header">
            <span class="box-title">审核信息</span>
          </div>
          <el-form label-width="170px" label-position="left">
            <el-row>
              <el-col :span="22">
                <el-form-item label="审核状态">
                  <span :class="{ 'reject-color': form2.status == 3 }">{{
                    form2.status | formatAuth
                  }}</span>
                </el-form-item>
              </el-col>
              <el-col v-show="form2.status == 3" :span="22">
                <el-form-item label="驳回原因">
                  <span>{{ form2.backRemark }}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row justify="flex-start" type="flex">
              <el-button
                v-if="form2.status == 3"
                type="primary"
                class="submit-form"
                @click="postProjectDetail"
                ><span class="icon-text">编辑项目</span></el-button
              >
              <el-button
                type="primary"
                class="cancel-form"
                @click="delProjectDetail"
                ><span class="icon-text">删除项目</span></el-button
              >
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import common from "@/mixin/common";
import { param2Form } from "@/utils";
import {
  addProjectDetail,
  deleteProjectDetail,
  getProjectDetail,
} from "@/api/projecthall";
import { deleteDemandDetail, getDemandDetail } from "@/api/demandhall";
export default {
  name: "Personaldetailproject",
  mixins: [common],
  data() {
    return {
      project: {},
      form2: {
        linkman: "",
        phone: "",
        position: "",
        company: "",
        postalfulladdress: "",
        postalProvince: "",
        postalArea: "",
        postalCounty: "",
        status: "",
        backRemark: "",
        email: "",
        isListing: "0",
        title: "",
        createTime: "",
        sponsor: "",
        cooperation: "",
        top10hg: "",
        bj2441: "",
        zgckjy241: "",
        scenario: "",
        typeDescription: "",
        attachment: "",
        proIntroduct: ""
      },

      academy: "",
      industry: "",
      expire: [],
      industryKind: {
        top10hg: "",
        bj2441: "",
        zgckjy241: "",
      },
    };
  },
  methods: {
    loadData() {
      const { id } = this.$route.query;
      this.loading = true;
      getProjectDetail({ id })
        .then((res) => {
          if (res.code == "0000") {
            this.item = res.obj;
            this.form2 = _.merge(
              this.form2,
              _.pick(this.item, _.keys(this.form2))
            );

            this.academy =
              this.academyStateDict?.find(
                (item) => item.dictValue == this.form2.sponsor
              ).dictLabel || "无";
            this.expire.length = 0;
            this.cooperationDict.forEach((item) => {
              this.form2.cooperation.includes(item.dictValue) &&
                this.expire.push(item.dictLabel);
            });
            // this.expire = this.cooperationDict?.find(item => item.dictValue == this.project.cooperation).dictLabel || '无'
            this.industryKind.top10hg =
              this.topTenStateDict?.find(
                (item) => item.dictValue == this.form2.top10hg
              )?.dictLabel || "无";
            this.industryKind.bj2441 =
              this.bjStateDict?.find(
                (item) => item.dictValue == this.form2.bj2441
              )?.dictLabel || "无";
            this.industryKind.zgckjy241 =
              this.zgckjyStateDict?.find(
                (item) => item.dictValue == this.form2.zgckjy241
              )?.dictLabel || "无";
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    postProjectDetail() {
      const { id } = this.$route.query;
      this.$router.push({
        path: "/personal/center/edit-project",
        query: {
          id,
        },
      });
    },
    delProjectDetail() {
      const { id } = this.$route.query;
      this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          deleteProjectDetail(id)
            .then((res) => {
              if (res.code == "0000") {
                this.$message.success({
                  message: res.msg,
                  onClose: () => {
                    this.$router.push({
                      path: "/personal/center/search-project",
                    });
                  },
                });
              } else {
                this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    downFile() {
      window.open(this.form2.attachment)
    }
  },
};
</script>

<style scoped lang="scss">
.el-main {
  padding: 0;
}

.row-bg {
  background-color: #f6f6f6;
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
      content: "";
      height: 3px;
      width: 100%;
      background: #516fd2;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
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

  ::v-deep .el-radio__label {
    font-size: 14px;
  }

  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: #516fd2;
    background: #516fd2;
  }

  ::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: #516fd2;
  }

  ::v-deep .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 100%;
  }

  .submit-form {
    background: #4d6dda;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    padding: 12px 30px;
  }

  .cancel-form {
    padding: 12px 30px;
    font-size: 18px;
    font-weight: 400;
    color: #4d6dda;
    line-height: 25px;
    background: #ffffff;
    border: 1px solid #4d6dda;
    border-radius: 3px;
  }

  ::v-deep .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}

.tips {
  font-size: 12px;
  font-weight: 400;
  color: #999999;
}

.reject-color {
  color: crimson;
}
</style>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.project-detail {
  width: 100%;
  background-image: url("~img/projectManage/projdetail-back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 55px pxToVW(270);
  &-wrap {
    width: 100%;
    display: flex;
    &-left {
      width: pxToVW(1030);
      margin-right: pxToVW(20);
      .project-wrap {
        padding: 50px 40px;
        background-color: #fff;
        border-radius: 16px;
        margin-bottom: 22px;
      }
      .project-main {
        display: flex;
        align-items: center;
        &-img {
          width: pxToVW(148);
          margin-right: 44px;
          img {
            width: 100%;
          }
        }
        &-title {
          font-weight: 400;
          color: #3c3c41;
          width: pxToVW(500);
          .title {
            font-size: 28px;
            margin-bottom: 20px;
          }
          .attach {
            margin-bottom: 35px;
          }
          .time {
            color: #999999;
            display: flex;
            align-items: center;
          }
        }
        &-count {
          display: flex;
          font-size: 26px;
          .first-wrap {
            padding: 12px 20px;
            background: #e61818;
            border: 1px solid #e61818;
            color: #fff;
          }
          .second-wrap {
            background: #ffffff;
            border: 1px solid #e61818;
            color: #e61818;
            padding: 12px 20px;
          }
        }
      }

      .project-info {
        &-theme {
          font-size: 24px;
          font-weight: bold;
          color: #3c3c41;
          border-left: 7px solid #2434af;
          padding-left: 12px;
          margin-bottom: 30px;
          margin-top: 30px;
        }

        .el-row {
          margin-bottom: 10px;
          :deep(.el-col-24) {
            display: flex;
            margin-bottom: 10px;
          }
          .title {
            height: 27px;
            font-size: 28px;
            font-weight: 400;
            color: #3c3c41;
          }
          .name {
            font-weight: 400;
            color: #999999;
            margin-bottom: 16px;
            min-width: pxToVW(80);
            display: inline-block;
          }
          .values {
            margin-left: 20px;
            font-weight: 400;
            color: #19191c;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
