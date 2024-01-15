<template>
  <div class="project-publish">
    <img src="~img/projectManage/publish-project.png" />
    <p>当前位置：首页 > 科技成果 > 发布项目</p>
    <div class="project-publish-wrap">
      <div class="project-publish-wrap-left">
        <!-- <div class="project-wrap"> -->
        <el-form
          ref="formDataRef"
          :model="formData"
          :rules="rules"
          label-position="right"
          label-width="150px"
        >
          <el-row class="project-wrap">
            <el-col :span="16">
              <el-form-item label="项目名称" prop="title">
                <el-input v-model="formData.title" placeholder="项目名称" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="所在院所" prop="sponsor">
                <el-select v-model="formData.sponsor" placeholder="项目类别">
                  <el-option
                    v-for="item in academyStateDict"
                    :label="item.dictLabel"
                    :key="item.dictValue"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="项目类别" prop="typeDescription">
                <el-input
                  v-model="formData.typeDescription"
                  placeholder="项目类别"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="应用场景" prop="scenario">
                <el-input v-model="formData.scenario" placeholder="应用场景" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="合作意向" prop="cooperation">
                <el-select
                  v-model="formData.cooperation"
                  placeholder="合作意向"
                >
                  <el-option
                    v-for="item in cooperationDict"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="project-wrap">
            <el-col :span="16">
              <el-form-item label="北京十大高精尖产业" prop="top10hg">
                <el-select
                  v-model="formData.top10hg"
                  placeholder="北京十大高精尖产业"
                >
                  <el-option
                    v-for="item in topTenStateDict"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="北京2411产业" prop="bj2441">
                <el-select v-model="formData.bj2441" placeholder="北京2411产业">
                  <el-option
                    v-for="item in bjStateDict"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="中关村241产业" prop="zgckjy241">
                <el-select
                  v-model="formData.zgckjy241"
                  placeholder="中关村241产业"
                >
                  <el-option
                    v-for="item in zgckjyStateDict"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="项目简介" prop="proIntroduct">
                <el-input
                  v-model="formData.proIntroduct"
                  type="textarea"
                  :rows="5"
                  resize="none"
                  placeholder="项目简介"
                />
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label=" " prop="pic_file">
                <el-upload
                  action="#"
                  :file-list="pic_file_list"
                  :on-change="handleImgChange"
                  list-type="picture"
                  :auto-upload="false"
                  class="upload-wrap"
                >
                  <el-button size="small" slot="default" type="primary"
                    >上传项目封面图片</el-button
                  >
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span>{{ file.name }}</span>
                  </div>

                  <div slot="tip" class="el-upload__tip">
                    建议尺寸200px*200px，支持jpg、jpeg、png格式，大小不超过2M
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="project-wrap">
            <el-row>
              <el-col
                :span="3"
                class="project-info-theme"
                style="
                  text-align: right;
                  width: 138px;
                  margin-right: 12px;
                  font-weight: 600;
                  color: #606266;
                "
                >项目附件</el-col
              >
              <el-col :span="18">
                <el-upload
                  action="#"
                  class="upload-demo"
                  :on-change="fileChange"
                  :file-list="file_list"
                  :auto-upload="false"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    一次只能选取一个文件，且不超过20M
                  </div>
                </el-upload>
              </el-col>
            </el-row>
          </el-row>
          <el-row class="project-wrap">
            <el-row>
              <el-col :span="10">
                <el-form-item label="联系人姓名" prop="linkman">
                  <el-input
                    v-model="formData.linkman"
                    placeholder="联系人姓名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="formData.phone" placeholder="联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <div style="text-align: center">
              <el-button
                type="primary"
                style="width: 9vw"
                @click="doPublishProject"
                >立即发布</el-button
              >
            </div>
          </el-row>
        </el-form>
      </div>
      <div class="project-publish-wrap-right">
        <div class="project-wrap" style="text-align: center">
          <div
            style="
              font-weight: bold;
              color: #19191c;
              font-size: 22px;
              margin-bottom: 64px;
            "
          >
            人工协助发布
          </div>
          <img src="~img/projectManage/telephone.png" />
          <div style="color: #999999; margin: 20px 0 8px"></div>
          <div style="font-size: 27px; font-weight: 800; color: #001196">
            186-1103-3326
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addProjectDetail } from "@/api/projecthall";
import common from "@/mixin/common";
import { param2Form } from "@/utils";
import dayjs from "dayjs";
import { getRole, getToken, getUser, setRole } from "@/utils/auth";

export default {
  mixins: [common],
  data() {
    return {
      formData: {
        title: "",
        sponsor: "",
        typeDescription: "",
        scenario: "",
        cooperation: "",
        top10hg: "",
        bj2441: "",
        zgckjy241: "",
        proIntroduct: "",
        pic_file: "",
        attachment_file: "",
        linkman: "",
        phone: "",
      },

      rules: {
        title: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        proNature: [
          { required: true, message: "技术来源不能为空", trigger: "blur" },
        ],
        cooperation: [
          { required: true, message: "请选择合作方式", trigger: "change" },
        ],
        proIntroduct: [
          { required: true, message: "请输入项目描述", trigger: "blur" },
        ],
        linkman: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        company: [
          { required: true, message: "请输入所属单位名称", trigger: "blur" },
        ],
        sponsor: [
          { required: true, message: "请选择所在院所", trigger: "change" },
        ],
        typeDescription: [
          { required: true, message: "请输入项目类别", trigger: "change" },
        ],
        scenario: [
          { required: true, message: "请输入应用场景", trigger: "change" },
        ],
        top10hg: [
          {
            required: true,
            message: "请选择十大高精尖产业",
            trigger: "change",
          },
        ],
        bj2441: [
          { required: true, message: "请选择北京2411产业", trigger: "change" },
        ],
        zgckjy241: [
          { required: true, message: "请选择中关村241产业", trigger: "change" },
        ],
        pic_file: [
          {
            required: true,
            message: "请选择封面文件",
            trigger: "change",
          },
        ],
      },
      pic_file_list: [],
      file_list: [],
    };
  },
  methods: {
    handleImgChange(file) {
      if (file.raw) {
        const isIMG = file.raw.type.includes("image");
        const isLt2M = file.size / 1024 / 1024 < 2;
        this.$refs.formDataRef.clearValidate("pic_file");
        if (!isIMG) {
          this.$message.warning("只能上传图片!");
          return;
        }
        if (!isLt2M) {
          this.$message.warning("上传图片大小不能超过 2MB!");
          return;
        }
        this.pic_file_list = [file];
        this.formData.pic_file = file.url;
      }
    },
    handleRemove(file) {
      this.formData.attachment_file = "";
      this.pic_file_list = [];
    },
    doPublishProject() {
      this.$refs.formDataRef.validate(async (vali) => {
        try {
          if (vali) {
            console.log("ppublish", this.formData);
            const res = await addProjectDetail(
              param2Form({
                ...this.formData,
                attachment_file: this.file_list[0],
                pic_file: this.pic_file_list[0]?.raw || "",
              })
            );
            if (res.code == "0000") {
              this.$message.success("发布成功");
              this.$router.push("/projectmanage");
            } else {
              this.$message.error("发布失败");
            }
          }
        } catch (error) {
          console.log(error);
        }
      });
    },

    isAllowedFile(filename) {
      // 获取文件扩展名
      var fileExtension = filename.split(".").pop().toLowerCase();

      // 允许的文件格式数组
      var allowedFormats = [
        "bmp",
        "png",
        "gif",
        "jpg",
        "jpeg",
        "mp4",
        "mp3",
        "doc",
        "docx",
        "pdf",
        "xlsx",
        "xls",
        "pptx",
      ];

      // 检查文件扩展名是否在允许的格式数组中
      if (allowedFormats.indexOf(fileExtension) !== -1) {
        return true; // 文件格式合法
      } else {
        return false; // 文件格式不合法
      }
    },
    fileChange(file) {
      const isJPG = this.isAllowedFile(file.name);
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error("上传格式不符合!");
        this.file_list = [file.raw];
        this.file_list = this.file_list.filter((item) => item.name != file.name);
      } else if (!isLt20M) {
        this.$message.error("上传文件大小不能超过 20MB!");
        this.$nextTick(()=>{})
        this.file_list = this.file_list.filter((item) => item.name != file.name);
      } else {
        this.file_list = [file.raw];
        this.formData.attachment_file = URL.createObjectURL(file.raw);
      }
    },
  },
  mounted() {
    if (!getToken()) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}

.project-publish {
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

        .algin-center {
          display: flex;
          align-items: center;
        }

        .checkbox-price {
          margin-left: pxToVW(45);

          :deep(.el-checkbox__inner) {
            border-color: #ec4646;
          }

          :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
            background-color: #ec4646;
          }

          :deep(.el-checkbox__label) {
            color: #ec4646;
          }
        }

        :deep(.el-button--primary) {
          background-color: #2434af;
        }
        :deep(.el-radio) {
          border: 1px solid #d0d0d0;
          padding: 16px;
          width: pxToVW(160);
          border-radius: 6px;
          &.is-checked {
            border: 1px solid #2434af;
            .el-radio__label {
              color: #2434af;
            }
          }
          .el-radio__input.is-checked .el-radio__inner {
            border-color: #2434af;
            background: #2434af;
          }
        }

        .upload-wrap {
          :deep(.el-upload-list--picture .el-upload-list__item) {
            border: none;
            > div {
              height: 100%;
              display: flex;
              align-items: center;
              color: #19191c;
            }
          }
          // :deep(.el-upload-list__item-thumbnail) {
          //   width: 18px;
          //   height: 18px;
          // }
          // :deep(.el-upload-list__item) {
          //   height: 20px;
          // }
        }
      }
    }

    &-right {
      flex: 1;

      .project-wrap {
        padding: 50px 40px;
        background-color: #fff;
        border-radius: 16px;
        margin-bottom: 22px;
        .process {
          font-size: 22px;
          font-weight: bold;
          color: #19191c;
          padding-bottom: 30px;
          border-bottom: 1px solid #f4f4f4;
          text-align: center;

          &-gress {
            margin-top: 32px;
            position: relative;
            z-index: 99;
            display: flex;
            justify-content: center;
            flex-direction: column;
            > div {
              z-index: 99;
              margin-bottom: 30px;
            }
            padding-left: pxToVW(60);
            .line {
              position: absolute;
              z-index: 0;
              top: 26px;
              left: pxToVW(70);
            }
          }
        }
      }
    }
  }
}
</style>
