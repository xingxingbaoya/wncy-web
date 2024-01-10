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
                <el-select
                  v-model="formData.sponsor"
                  placeholder="项目类别"
                >
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
                <el-input v-model="formData.typeDescription" placeholder="项目类别" />
                <!-- <el-select
                  v-model="formData.typeDescription"
                  :popper-append-to-body="false"
                  placeholder="项目分类"
                >
                  <el-option
                    v-for="item in industryOneDict"
                    :label="item.dictLabel"
                    :key="item.dictValue"
                    :value="item.dictValue"
                  />
                </el-select> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="16">
                            <el-form-item label="技术类型" prop="proPatentInfo">
                                <el-select v-model="formData.proPatentInfo" :popper-append-to-body="false"
                                    placeholder="技术类型">
                                    <el-option v-for="item in techTypeDict" :key="item.dictValue" :label="item.dictLabel"
                                        :value="item.dictValue" />
                                </el-select>
                            </el-form-item>
                        </el-col> -->
            <el-col :span="16">
              <el-form-item label="应用场景" prop="scenario">
                <el-input v-model="formData.scenario" placeholder="应用场景" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="合作意向"
                prop="cooperation"
              >
                <el-select
                  v-model="formData.cooperation"
                  placeholder="合作意向"
                >
                  <el-option
                    v-for="item in cooperationDict"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
                <!-- <el-checkbox-group v-model="formData.cooperation">
                                    <el-checkbox-button v-for="item in cooperationDict" :label="item.dictLabel"
                                        :key="item.dictLabel" :value="item.dictValue"></el-checkbox-button>
                                </el-checkbox-group> -->
              </el-form-item>
            </el-col>
            <!-- <el-col :span="16">
                            <el-form-item label="技术来源" prop="proNature">
                                <el-select v-model="formData.proNature" :popper-append-to-body="false" placeholder="技术来源">
                                    <el-option v-for="item in proNatureDict" :label="item.dictLabel"
                                        :value="item.dictValue" />
                                </el-select>
                            </el-form-item>
                        </el-col> -->
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
                <el-select
                  v-model="formData.bj2441"
                  placeholder="北京2411产业"
                >
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
              <el-form-item
                label="中关村241产业"
                prop="zgckjy241"
              >
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

            <!-- <el-col :span="10">

                            <el-form-item label="意向资金(万)" prop="proIntentionPrice">
                                <el-input v-model="formData.proIntentionPrice" placeholder="意向资金"
                                    :disabled="formData.faceFlag == 1">

                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item>
                                <el-checkbox v-model="formData.faceFlag" true-label="1" false-label="0"
                                    class="checkbox-price"
                                    @change="() => { this.$refs.formDataRe.clearValidate('proIntentionPrice') }">面议</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="项目开发阶段" prop="proDevelopment">
                                <el-select v-model="formData.proDevelopment" :popper-append-to-body="false"
                                    placeholder="项目开发阶段">
                                    <el-option v-for="item in developmentDict" :key="item.dictValue" :label="item.dictLabel"
                                        :value="item.dictValue" />
                                </el-select>
                            </el-form-item>
                        </el-col> -->
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
              <el-form-item label=" " prop="pic_file" :class="isShowUpload">
                <el-upload
                  action="#"
                  :limit="5"
                  :file-list="pic_file_list"
                  :on-change="handleImgChange"
                  list-type="picture"
                  multiple
                  :auto-upload="false"
                  class="upload-wrap"
                >
                  <el-button slot="default" type="primary">上传图片</el-button>
                  <span slot="tip" style="color: #c1bfc5"
                    >&nbsp;&nbsp;建议尺寸200px*200px，支持jpg、jpeg、png格式，大小不超过2M</span
                  >
                  <div slot="file" slot-scope="{ file }" >
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span>{{ file.name }}</span>
                    <span class="el-upload-list__item-actions">
                      <!-- <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in" />
                      </span> -->
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
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
            <!-- <el-row>
                            <el-col :span="10">
                                <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="formData.email" placeholder="邮箱" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="所属单位名称" prop="company">
                                    <el-input v-model="formData.company" placeholder="所属单位名称" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="来源地" prop="postalfulladdressType">
                                    <el-radio-group v-model="formData.postalfulladdressType">
                                        <el-radio :label="0">不限地域</el-radio>
                                        <el-radio :label="1">设置优先地域</el-radio>
                                    </el-radio-group>

                                </el-form-item>
                            </el-col>
                            <template v-if="!!formData.postalfulladdressType">
                                <el-col :span="8">
                                    <el-form-item>
                                        <el-select v-model="formData.postalfulladdress">
                                            <el-option v-for="item in cityList" :key="item.code" :label="item.name"
                                                :value="item.code" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </template>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="职务" prop="position">
                                    <el-input v-model="formData.position" placeholder="职务" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="是否挂牌" prop="isListing">
                                    <el-radio-group v-model="formData.isListing">
                                        <el-radio label="0">挂牌</el-radio>
                                        <el-radio label="1">不挂牌</el-radio>
                                    </el-radio-group>

                                </el-form-item>
                            </el-col>
                        </el-row> -->
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
          <div style="color: #999999; margin: 20px 0 8px">  </div>
          <div style="font-size: 27px; font-weight: 800; color: #001196">
            186-1103-3326
          </div>
        </div>
        <!-- <div class="project-wrap" style="padding-left: 0; padding-right: 0">
          <div class="process">任务发布流程</div>
          <div class="process-gress">
            <img src="~img/projectManage/line.png" class="line" />
            <div>
              <img
                src="~img/projectManage/process-1.png"
              />&nbsp;&nbsp;&nbsp;&nbsp;提交任务需求
            </div>

            <div>
              <img
                src="~img/projectManage/process-2.png"
              />&nbsp;&nbsp;&nbsp;&nbsp;选择合作方式
            </div>

            <div>
              <img
                src="~img/projectManage/process-3.png"
              />&nbsp;&nbsp;&nbsp;&nbsp;输入联系人信息
            </div>

            <div>
              <img
                src="~img/projectManage/process-4.png"
              />&nbsp;&nbsp;&nbsp;&nbsp;立即发布
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import city from "@/assets/city/city_code.json";
import { addProjectDetail } from "@/api/projecthall";
import common from "@/mixin/common";
import { param2Form } from "@/utils";
import dayjs from "dayjs";
import { getRole, getToken, getUser, setRole } from "@/utils/auth";

export default {
  mixins: [common],
  data() {
    const validateproIntentionPrice = (rule, value, callback) => {
      if (value == "" && this.formData.faceFlag == 0) {
        callback(new Error("请输入意向资金"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        title: "",
        fulladdress: "",
        province: "",
        city: "",
        area: "",
        isNotNational: "0",
        proName: "",
        industryone: "",
        proIntroduct: "",
        faceFlag: "0",
        proPatentInfo: "0",
        cooperation: "",
        proIntentionPrice: "",
        proDevelopment: "",
        proPatentCategory: "",
        proPatentNo: "",
        patentOwner: "",
        proGrantTime: "",
        pic_file: "",
        linkman: "",
        phone: "",
        email: "",
        company: "",
        postalfulladdressType: 0,
        postalfulladdress: "",
        position: "",
        isListing: "0",
        sponsor: "",
        typeDescription: "",
        scenario: "",
        top10hg: "",
        bj2441: "",
        zgckjy241: "",
        // createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },

      rules: {
        title: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        proName: [
          { required: true, message: "项目权属方不能为空", trigger: "blur" },
        ],
        industryone: [
          { required: true, message: "项目分类不能为空", trigger: "blur" },
        ],
        proPatentInfo: [
          { required: true, message: "技术类型不能为空", trigger: "blur" },
        ],
        proNature: [
          { required: true, message: "技术来源不能为空", trigger: "blur" },
        ],
        cooperation: [
          { required: true, message: "请选择合作方式", trigger: "change" },
        ],
        proIntentionPrice: [
          {
            required: true,
            validator: validateproIntentionPrice,
            message: "请输入意向投入资金",
            trigger: "blur",
          },
        ],
        proDevelopment: [
          { required: true, message: "请选择项目开发阶段", trigger: "change" },
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
        postalfulladdress: [
          { required: true, message: "请选择来源地", trigger: "change" },
        ],
        position: [
          { required: true, message: "请输入职务", trigger: "change" },
        ],
        isListing: [
          { required: true, message: "请选择是否挂牌", trigger: "change" },
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
          {
            required: true,
            message: "请选择中关村科技园区管理委员会241产业分类",
            trigger: "change",
          },
        ],
      },
      pic_file_list: [],
    };
  },
  computed: {
    cityList() {
      return [{ name: "不限", code: 0 }, ...city];
    },
  },
  methods: {
    handleImgChange(file) {
      const isIMG = file.raw.type.includes("image");
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.$refs.formDataRef.clearValidate("pic_file");

      if (!isIMG) {
        // this.pic_file_list.pop()
        return this.$message.warning("只能上传图片!");
      }
      if (!isLt2M) {
        // this.pic_file_list.pop()
        return this.$message.warning("上传图片大小不能超过 2MB!");
      }
      this.formData.pic_file = file.raw;
      console.log("封面", file.raw, this.formData.pic_file);
    },
    doPublishProject() {
      this.$refs.formDataRef.validate(async (vali) => {
        try {
          if (vali) {
            console.log("ppublish", this.formData);
            const res = await addProjectDetail(
              param2Form({ ...this.formData })
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
            >div {
              height: 100%;
              display: flex;
              align-items: center;
              color: #19191C;
              
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