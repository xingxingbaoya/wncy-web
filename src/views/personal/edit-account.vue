<template>
  <div>
    <el-row class="userinfo">
      <p class="ttile">个人资料</p>
      <el-form
        ref="formRef"
        label-width="120px"
        :rules="formRules"
        label-position="left"
        :model="form"
      >
        <el-row>
          <el-col :span="24" :offset="1" class="tip-after">
            <el-form-item label="头像：" label-width="100px" prop="pic_file">
              <el-upload
                class="avatar-uploader"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleAvatarChange"
              >
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                  alt="logo"
                />
                <svg-icon
                  v-else
                  icon-class="avatar"
                  class-name="el-icon-plus avatar-uploader-icon"
                />
                <el-button type="text" class="choose">选择文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="15">
            <el-form-item label="工作单位：" prop="workUnit">
              <el-input v-model="form.workUnit" placeholder="工作单位" />
            </el-form-item>
          </el-col> -->

          <!-- <el-col :span="15">
            <el-form-item label="地址：" prop="fulladdress">
              <el-cascader
                v-model="form.fulladdress"
                :options="cityList"
                :props="optionProps"
              />
            </el-form-item>
          </el-col> -->

          <el-col :span="15">
            <el-form-item label="用户名：" prop="userName" required>
              <el-input v-model="form.userName" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>

          <el-col :span="15">
            <el-form-item label="真实姓名:" prop="nickName">
              <el-input v-model="form.nickName" :placeholder="labelName" />
            </el-form-item>
          </el-col>

          <el-col v-if="item.isPerfect == '0'" :span="15" class="pass_require">
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
                show-password
              />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="15">
            <el-form-item label="公司类型：" prop="companyType">
              <div class="el-input el-input-group el-input-group--prepend">
                <el-select
                  v-model="form.companyType"
                  placeholder="请选择公司类型"
                >
                  <el-option
                    v-for="item in companyTypeDict"
                    :key="item.dictCode"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  />
                </el-select>
              </div>
            </el-form-item>
          </el-col> -->

          <el-col :span="24">
            <el-form-item label="详细地址：" prop="address">
              <el-input v-model="form.address" placeholder="详细地址" />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="24">
            <el-form-item label="个人简介：" prop="introduction">
              <el-input
                v-model="form.introduction"
                type="textarea"
                :rows="4"
                resize="none"
                placeholder="个人简介"
              />
            </el-form-item>
          </el-col> -->

          <el-col :span="24" class="pass_require">
            <el-form-item label="手机号：">
              <span class="phone">{{ item.phone }}</span
              ><span
                class="change"
                @click="
                  () => {
                    this.form1.validateCode = '';
                    this.unbindVisible = true;
                  }
                "
                >修改</span
              ><span class="tips">用于手机号登录和密码找回</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-button class="cancel-btn" @click="gocenter">取消</el-button
          ><el-button class="sure-btn" @click="submitForm('formRef')"
            >保存</el-button
          >
        </el-row>
      </el-form>
    </el-row>

    <el-dialog
      title="解绑手机"
      :visible.sync="unbindVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
    >
      <el-row>
        <el-form
          ref="form1"
          :model="form1"
          :rules="form1Rules"
          label-position="right"
        >
          <el-col :span="22">
            <el-form-item label="请验证您的手机号：" label-width="200px">
              <span>{{ item.phone }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="validateCode" label-width="30px">
              <el-input
                v-model="form1.validateCode"
                placeholder="手机验证码"
                maxlength="13"
                auto-complete="on"
              >
                <template slot="append"
                  ><el-button
                    :disabled="disabled"
                    @click="getMsgCode(item.phone)"
                    >{{ codeBtn }}</el-button
                  ></template
                >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button
          class="next-btn"
          type="primary"
          @click="validUserPhone('form1')"
          >下一步</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="绑定手机"
      :visible.sync="bindVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-row>
        <el-form
          ref="form2"
          :model="form2"
          ::rules="form2Rules"
          label-position="right"
        >
          <el-col :span="22">
            <el-form-item label-width="30px">
              <el-input v-model="form2.telephone" placeholder="手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item prop="validateCode" label-width="30px">
              <el-input
                v-model="form2.validateCode"
                placeholder="手机验证码"
                maxlength="13"
                auto-complete="on"
              >
                <template slot="append"
                  ><el-button
                    :disabled="disabled"
                    @click="getMsgCode(form2.telephone)"
                    >{{ codeBtn }}</el-button
                  ></template
                >
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button
          class="next-btn"
          type="primary"
          @click="changeUserPhone('form2')"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import common from "@/mixin/common";
import { sendValidateCode } from "@/api/register";
import {
  authUserType,
  changePhone,
  getUserDetail,
  validPhone,
} from "@/api/user";
import {
  param2Form,
  validatePassword,
  validateUserAvatar,
  validateUsername,
  validateUserPassword,
} from "@/utils";
import store from "@/store";
import { removeUser, setUser } from "@/utils/auth";

export default {
  name: "Personaledit",
  mixins: [common],
  data() {
    return {
      unbindVisible: false,
      bindVisible: false,
      disabled: false,
      time: 60,
      codeBtn: "发送验证码",
      item: {},
      form: {
        nickName: "",
        pic_file: "",
        userName: "",
        password: "",
        companyType: "",
        workUnit: "",
        fulladdress: "",
        province: "",
        city: "",
        area: "",
        address: "",
        introduction: "",
      },
      formRules: {
        userName: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validateUserPassword, trigger: "blur" }],
        nickName: [{ required: true, trigger: "blur", message: "请输入名称" }],
        pic_file: [{ validator: validateUserAvatar, trigger: "change" }],
        companyType: [
          { required: true, trigger: "blur", message: "请选择公司类型" },
        ],
        workUnit: [
          { required: true, trigger: "blur", message: "请输入工作单位" },
        ],
        fulladdress: [
          { required: true, trigger: "blur", message: "请选择地址" },
        ],
        address: [
          { required: true, trigger: "blur", message: "请输入详细地址" },
        ],
        introduction: [
          { required: true, trigger: "blur", message: "请输入简介" },
        ],
      },
      form1: {
        validateCode: "",
      },
      form1Rules: {
        validateCode: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
      },
      form2Rules: {
        validateCode: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
        telephone: [
          { required: true, trigger: "blur", message: "请输入手机号" },
        ],
      },
      form2: {
        validateCode: "",
        telephone: "",
      },

      imageUrl: "",
      ct: null,
    };
  },
  computed: {
    labelName() {
      return this.item.authType == 1 ? "公司名称" : "姓名";
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      store
        .dispatch("user/getInfo")
        .then((res) => {
          this.item = res;
          this.form = _.merge(this.form, _.pick(this.item, _.keys(this.form)));
          this.imageUrl = this.item.avatar;
          this.form.pic_file = this.item.avatar;
          this.form.password = "";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validUserPhone(ref) {
      const { phone: telephone } = this.item;
      this.loading = true;
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.loading = true;
          validPhone(param2Form({ ...this.form1, telephone }))
            .then((res) => {
              if (res.code == "0000") {
                this.clearTime();
                this.unbindVisible = false;
                this.bindVisible = true;
              } else {
                this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    changeUserPhone(ref) {
      this.loading = true;
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.loading = true;
          changePhone(param2Form(this.form2))
            .then((res) => {
              if (res.code == "0000") {
                this.clearTime();
                this.loadData();
                this.bindVisible = false;
              } else {
                this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    submitForm(ref) {
      const [province = "", city = "", area = ""] = this.form.fulladdress;
      if (_.isString(this.form.pic_file))
        this.form = _.omit(this.form, ["pic_file"]);
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.loading = true;
          authUserType(param2Form({ ...this.form, province, city, area }))
            .then((res) => {
              if (res.code == "0000") {
                this.$message.success(res.msg);
                this.loadData();
                this.gocenter();
              } else {
                this.$message.warning(res.msg);
              }
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    gocenter() {
      this.$router.push({
        path: "/personal/center/",
      });
    },
    handleAvatarChange(file) {
      const isIMG = file.raw.type.includes("image");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        return this.$message.warning("只能上传图片!");
      }
      if (!isLt2M) {
        return this.$message.warning("上传图片大小不能超过 2MB!");
      }
      this.form.pic_file = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    timer() {
      if (this.time > 1) {
        this.disabled = true;
        this.time--;
        this.codeBtn = this.time + "秒";
        this.ct = setTimeout(this.timer, 1000);
      } else {
        this.time = 60;
        this.codeBtn = "发送验证码";
        this.disabled = false;
      }
    },
    clearTime() {
      clearTimeout(this.ct);
      this.form2.telephone = "";
      this.form2.validateCode = "";
      this.form1.validateCode = "";
      this.time = 60;
      this.codeBtn = "发送验证码";
      this.disabled = false;
    },
    getMsgCode(telephone) {
      sendValidateCode({ phoneNumber: telephone })
        .then((res) => {
          if (res.code == "0000") {
            this.timer();
            this.$message.success(res.msg);
            console.log(res.obj);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .catch((e) => {})
        .finally(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
.userinfo {
  padding: 35px 23px;
  .ttile {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    margin: 0 0 40px;
  }

  .avatar {
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
    padding: 30px;
    background: #f6f6f6;
  }

  ::v-deep .el-input__inner {
    font-size: 14px;
    font-weight: 500;
    color: #606266 !important;
  }

  .el-cascader {
    width: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #2434af;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    //line-height: 178px;
    text-align: center;
  }
  //.avatar {
  //  width: 178px;
  //  height: 178px;
  //  display: block;
  //}

  .choose {
    padding: 0;
    vertical-align: 10px;
    font-size: 14px;
    font-weight: 500;
    margin-left: 20px;
    color: #4d6dda;
  }

  .phone {
    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin-right: 20px;
  }

  .change {
    font-size: 16px;
    font-weight: 500;
    color: #4d6dda;
    margin-right: 30px;
    cursor: pointer;
  }

  .tips {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  .tip-after {
    position: relative;
    &::after {
      content: "支持jpg、jpeg、gif、png格式，大小不超过2M";
      display: block;
      position: absolute;
      bottom: -20px;
      left: 110px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }

  .cancel-btn {
    width: 111px;
    height: 42px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 3px;

    font-size: 16px;
    font-weight: 400;
    color: #666666;
    margin-left: 120px;
  }

  .sure-btn {
    width: 111px;
    height: 42px;
    background: #4d6dda;
    border-radius: 3px;

    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
  }
}

.pass_require ::v-deep .el-form-item__label:before {
  content: "*";
  visibility: hidden;
  color: #f56c6c;
  margin-right: 4px;
}

::v-deep .el-dialog__title {
  font-size: 20px;
  color: #333333;
}

::v-deep .el-dialog__headerbtn {
  font-size: 20px;
}

::v-deep .el-dialog__header {
  border: 2px solid #f6f6f6;
  padding: 26px;
}

.el-form {
  ::v-deep .el-form-item__label {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
  }

  ::v-deep .el-form-item__content {
    font-size: 18px;
    font-weight: 400;
    color: #666666;
  }

  ::v-deep .el-input__inner {
    font-size: 16px;
    font-weight: 400;
    color: #999999;
  }

  ::v-deep .el-input-group__append {
    font-size: 13px;
    font-weight: 400;
    color: #496ce2;
    .el-button {
      width: 140px;
    }
  }
}

::v-deep .el-dialog__body {
  padding: 20px 20px 0;
}

::v-deep .el-dialog__footer {
  text-align: center;
}

.dialog-footer {
  .next-btn {
    width: 122px;
    background: #496ce2;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
