<template>
  <div class="project-detail">
    <img src="~img/projectManage/project-search.png" />
    <p>当前位置：首页 > 科技成果 > {{ project.title }}</p>
    <div class="project-detail-wrap">
      <div class="project-detail-wrap-left">
        <div class="project-wrap project-info">
          <el-row>
            <el-col :span="24">
              <span class="title">{{ project.title || "无" }}</span>
            </el-col>
            <el-col :span="24">
              <span
                class="value"
                style="
                  color: #999999;
                  margin: 10px 0 90px;
                  display: flex;
                  align-items: center;
                "
                ><img src="~img/projectManage/time.png" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ project.createTime }}</span
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
              <span class="values">{{ project.scenario }}</span>
            </el-col>
            <el-col :span="24">
              <span class="name">项目类别</span>
              <span class="values">{{ project.typeDescription }}</span>
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
            v-html="project.proIntroduct"
          ></span>
          <div class="project-info-theme">项目附件</div>
          <template v-if="project.attachment.split('/').length">
            <span>{{ project.attachment.split('/')[project.attachment.split('/').length - 1]}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;<a style="color: #2434AF;cursor: pointer;" @click="downFile">下载</a>
          </template>
          
          <el-row>
            <el-col :span="24">
              <el-upload
                class="upload-demo"
                :before-upload="beforeUpload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :http-request="upload"
                :limit="1"
                :file-list="fileList"
              >
                <el-button
                  size="small"
                  type="primary"
                  v-if="project.attachment_file"
                  >点击上传</el-button
                >
                <div
                  slot="tip"
                  class="el-upload__tip"
                  v-if="project.attachment_file"
                >
                  一次只能选取一个文件，且不超过20M
                </div>
              </el-upload>
            </el-col>
          </el-row>
          <div class="project-info-theme">联系信息</div>
          <el-row>
            <el-col :span="24">
              <span class="name">联系人</span>
              <span class="values">{{ project.linkman }}</span>
            </el-col>
            <el-col :span="24">
              <span class="name">联系方式</span>
              <span class="values">{{ project.phone }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="project-detail-wrap-right">
        <div class="preview">
          <!-- <template v-if="project.status == 0">
                    <div>已结束</div>
                </template> -->
          <template v-if="project.status == 1">
            <img src="~img/projectManage/dengdai.png" />
            <div class="status" style="color: #ff6900">等待审核中</div>
          </template>
          <template v-else="project.status == 2">
            <img src="~img/projectManage/tongguo.png" />
            <div class="status" style="color: #2ecb82">审核通过</div>
            <div
              class="publish-btn"
              @click="doProjPublish"
              v-if="project.status != 1"
            >
              发布类似项目
            </div>
          </template>
          <!-- <div>
                    <img src="~img/projectManage/fabu.png"/>
                </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectDetail } from "@/api/projecthall";
import common from "@/mixin/common";

export default {
  mixins: [common],
  data() {
    return {
      project: {},
      academy: "",
      industry: "",
      expire: [],
      industryKind: {
        top10hg: "",
        bj2441: "",
        zgckjy241: "",
      },
      fileList: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    doProjPublish() {
      this.$router.push("/projectmanage/publish");
    },
    loadData() {
      const id = this.$route.query.projectId;
      getProjectDetail({ id })
        .then((res) => {
          if (res.code == "0000") {
            this.project = res.obj;
            console.log("qq", this.academyStateDict, this.project.sponsor);
            this.academy =
              this.academyStateDict?.find(
                (item) => item.dictValue == this.project.sponsor
              ).dictLabel || "无";
            this.expire.length = 0;
            this.cooperationDict.forEach((item) => {
              this.project.cooperation.includes(item.dictValue) &&
                this.expire.push(item.dictLabel);
            });
            // this.expire = this.cooperationDict?.find(item => item.dictValue == this.project.cooperation).dictLabel || '无'
            this.industryKind.top10hg =
              this.topTenStateDict?.find(
                (item) => item.dictValue == this.project.top10hg
              ).dictLabel || "无";
            this.industryKind.bj2441 =
              this.bjStateDict?.find(
                (item) => item.dictValue == this.project.bj2441
              ).dictLabel || "无";
            this.industryKind.zgckjy241 =
              this.zgckjyStateDict?.find(
                (item) => item.dictValue == this.project.zgckjy241
              ).dictLabel || "无";
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      const isJPG = this.isAllowedFile(file.name);
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error("上传格式不符合!");
      }
      if (!isLt20M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isJPG && isLt20M;
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("file", file);
        let res = await uploadFile(formData);
        this.$message.success("上传成功");
      } catch (error) {
        this.$message.success("上传失败");
      }
    },
    isAllowedFile(filename) {
      // 获取文件扩展名
      var fileExtension = filename.split(".").pop().toLowerCase();

      // 允许的文件格式数组
      var allowedFormats = [
        "bmp",
        "png",
        "gif",
        "mp4",
        "mp3",
        "doc",
        "docx",
        "pdf",
        "xlsx",
        "xls",
      ];

      // 检查文件扩展名是否在允许的格式数组中
      if (allowedFormats.indexOf(fileExtension) !== -1) {
        return true; // 文件格式合法
      } else {
        return false; // 文件格式不合法
      }
    },
    downFile() {
      window.open(this.project.attachment)
    }
  },
};
</script>

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
    &-right {
      flex: 1;
      :deep(.el-input__inner) {
        border-radius: 48px;
        height: 48px;
        line-height: 48px;
      }
      :deep(.el-input__suffix) {
        top: 4px;
      }
      .preview {
        padding: 48px pxToVW(30);
        width: 100%;
        background: #ffffff;
        border-radius: 16px;
        text-align: center;
        .publish-btn {
          background: #eff7ff;
          border: 1px solid #dfdfdf;
          border-radius: 6px;
          color: #2434af;
          font-size: 18px;
          padding: 16px 0;
          margin-top: 42px;
          cursor: pointer;
          text-align: center;
        }
      }
      .status {
        font-size: 32px;
        font-weight: bold;
        line-height: 74px;
      }
    }
  }
}
</style>
