<template>
  <div class="project-manage">
    <div class="project-manage-main">
      <div class="project-manage-main-theme">集结行业最优科技成果转化项目</div>
      <div class="project-manage-main-attach">
        技术持有者可自有发布行业顶尖成果
      </div>
      <el-input
        placeholder="输入项目关键词进行搜索"
        class="project-manage-main-search"
        v-model="searchData.title"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <i slot="suffix">
          <img @click="handleSearchDataChange('title', searchData.title)" src="~img/projectManage/search.png" style="cursor: pointer" />
        </i>
      </el-input>
      <div class="project-manage-main-group">
        <!-- <img src="~img/projectManage/project-search.png" /> -->
        <p>当前位置：首页 > 科技成果</p>
        <div class="project-manage-main-group-wrap">
          <div class="left">
            <div class="left-classify">
              <div class="left-classify-item">
                <div class="left-classify-item-title">所在院所：</div>
                <el-select v-model="searchData.sponsor" :popper-append-to-body="false" placeholder="所在院所" clearable  @change="handleSearchDataChange('sponsor', searchData.sponsor)">
                    <el-option v-for="item in academyStateDict" :label="item.dictLabel" :key="item.dictValue"
                        :value="item.dictValue" />
                </el-select>
              </div>
              <div class="left-classify-item">
                <div class="left-classify-item-title">十大高精尖产业：</div>
                <el-select v-model="searchData.top10hg" :popper-append-to-body="false" @change="value => handleSearchDataChange('top10hg', value)" 
                    placeholder="十大高精尖产业">
                    <el-option v-for="item in topTenStateDict" :key="item.dictValue" :label="item.dictLabel"
                        :value="item.dictValue" />
                </el-select>
              </div>
              <div class="left-classify-item">
                <div class="left-classify-item-title">北京2411产业：</div>
                <el-select v-model="searchData.bj2441" :popper-append-to-body="false" @change="value => handleSearchDataChange('bj2441', value)" 
                      placeholder="北京2411产业">
                      <el-option v-for="item in bjStateDict" :key="item.dictValue" :label="item.dictLabel"
                          :value="item.dictValue" />
                  </el-select>
              </div>
              <div class="left-classify-item">
                <div class="left-classify-item-title">中关村科技园区管理委员会241产业分类：</div>
                <el-select v-model="searchData.zgckjy241" :popper-append-to-body="false" @change="value => handleSearchDataChange('zgckjy241', value)" 
                    placeholder="中关村科技园区管理委员会241产业分类">
                    <el-option v-for="item in zgckjyStateDict" :key="item.dictValue" :label="item.dictLabel"
                        :value="item.dictValue" />
                </el-select>
              </div>
                <!-- <div class="left-classify-item-city">
                
                    <div
                      v-for="(city, index) in [...topTenStateDict, ...bjStateDict, ...zgckjyStateDict]" :key="city"
                      class="left-classify-item-option"
                      :style="
                        index > firstLineProvince
                          ? 'display:none'
                          : 'display:block'
                      "
                      id="cityOption"
                      :class="searchData.province == city.dictValue ? 'active' : ''"
                      @click="handleSearchDataChange('province', city.dictValue)"
                    >
                      {{ city.dictLabel }}
                    </div>
                </div>
                <div
                  
                  class="left-classify-item-more"
                >
                  <template v-if="collapsed">
                    <span @click="collapsed = !collapsed">{{ "更多" }} <i class="el-icon-arrow-up"></i></span>
                  </template>
                  <template v-else>
                    <span @click="collapsed = !collapsed">{{ "收起" }} <i class="el-icon-arrow-down"></i></span>
                  </template>

                  <div class="more-options" :style="collapsed? 'display:none':'display:flex'">
                    <div>
                      <el-row>
                        <el-col :span="12"
                        v-for="(city, index) in [...topTenStateDict, ...bjStateDict, ...zgckjyStateDict]" :key="city"
                         class="more-options-item"
                          :style="
                            index < firstLineProvince
                              ? 'display:none'
                              : 'display:block'
                          "
                          id="cityOption"
                          :class="searchData.province == city.dictValue ? 'active' : ''"
                          @click="handleSearchDataChange('province', city.dictValue)"
                        >
                          {{ city.dictLabel }}
                        </el-col>
                      </el-row>
                    </div>
                  
                  </div>
                </div>
               -->
              <!-- <div class="left-classify-item">
                <div class="left-classify-item-title">技术来源：</div>
                <div v-for="tech in techSourceDict" :key="tech">
                  <div
                    class="left-classify-item-option"
                    :class="searchData.proNature == tech.id ? 'active' : ''"
                    @click="handleSearchDataChange('proNature', tech.id)"
                  >
                    {{ tech.title }}
                  </div>
                </div>
              </div> -->
              <!-- <div class="left-classify-item">
                <div class="left-classify-item-title">来 源 地：</div>
                <div class="left-classify-item-city">
                  <div v-for="(city, index) in cityList" :key="city">
                    <div
                      class="left-classify-item-option"
                      :style="
                        collapsed && index + 1 > firstLineProvince
                          ? 'display:none'
                          : 'display:block'
                      "
                      id="cityOption"
                      :class="searchData.province == city.code ? 'active' : ''"
                      @click="handleSearchDataChange('province', city.code)"
                    >
                      {{ city.name }}
                    </div>
                  </div>
                </div>
                <div
                  @click="collapsed = !collapsed"
                  class="left-classify-item-more"
                >
                  <template v-if="collapsed">
                    {{ "更多" }} <i class="el-icon-arrow-up"></i>
                  </template>
                  <template v-else>
                    {{ "收起" }} <i class="el-icon-arrow-down"></i>
                  </template>
                </div>
              </div> -->
              <!-- <div class="left-classify-item">
                <div class="left-classify-item-title">其他要求：</div>
                <span>是否挂牌：</span>
                <el-select
                  v-model="searchData.isListing"
                  class="other"
                  @change="
                    (value) => handleSearchDataChange('isListing', value)
                  "
                >
                  <el-option value="" label="不限" key="all"></el-option>
                  <el-option value="0" label="是" key="0"></el-option>
                  <el-option value="1" label="否" key="1"></el-option>
                </el-select>

                <span>项目地区：</span>
                <el-select
                  v-model="searchData.isNotNational"
                  class="other"
                  @change="
                    (value) => handleSearchDataChange('isNotNational', value)
                  "
                >
                  <el-option value="" label="不限" key="all"></el-option>
                  <el-option value="0" label="国内项目" key="0"></el-option>
                  <el-option value="1" label="国外项目" key="1"></el-option>
                </el-select>
              </div> -->
            </div>
            <div class="left-project">
              <div
                v-for="item in projectList"
                class="left-project-item"
                :key="item.id + project"
                @click="getProjDetail(item)"
              >
                <div class="left-content">
                  <div class="title">{{ item.title }}</div>
                  <div class="attach">
                    <span class="attach-address">{{ academyStateDict?.find(item => item.dictValue == item.sponsor)?.dictLabel || '无' }}</span>
                    <!-- <img src="~img/projectManage/address.png" />
                    <span class="attach-address"
                      >{{ item.provinceName }} {{ item.cityName }}
                      {{ item.areaName }}</span
                    > -->
                    <!-- <img src="~img/projectManage/time.png" />
                    {{ item.createTime }} -->
                  </div>
                </div>
                <!-- <div class="right-content">
                  <span>{{
                    item.faceFlag == "1" || item.proIntentionPrice == 0
                      ? "面议"
                      : item.proIntentionPrice + `万元`
                  }}</span>
                </div> -->
              </div>
              <Empty v-show="!projectList.length" />
            </div>

            <div class="pagination-box">
              <div class="pagination-box-currentpage" key="1">
                {{ pageConfig.pageNum }} / {{ pageConfig.total }}
              </div>
              <el-pagination
                :current-page="pageConfig.pageNum"
                :page-size="pageConfig.pageSize"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :total="pageConfig.total"
              >
              </el-pagination>
              <el-input
                v-model="pageValue"
                style="width: 3vw; margin: 0 12px 0 40px; color: #1919c1"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
              <div
                class="pagination-box-currentpage"
                style="cursor: pointer"
                @click="handleCurrentChange(pageValue)"
              >
                跳转
              </div>
            </div>
          </div>

          <div class="right">
            <div class="right-fab">
              <img
                src="~img/projectManage/projmanage-fab.png"
                style="width: 100%"
              />
              <div class="right-fab-content">
                <el-button type="primary" style="width: 100%"
                  @click.prevent="toPublishPage">立即发布</el-button
                >
              </div>
            </div>
            <div class="right-select">
              <img src="~img/projectManage/selectwn.png" style="width: 100%;" />
              <div class="right-select-content">
                <div
                  v-for="item in extractInfo"
                  :key="item.key"
                  class="right-select-content-item"
                >
                  <img :src="item.icons" />
                  <div>
                    <span class="title">{{ item.title }}</span>
                    <span>{{ item.detail }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heizuo from "@/assets/img/projectManage/hezuo.png";
import lindai from "@/assets/img/projectManage/lindai.png";
import ziyuan from "@/assets/img/projectManage/ziyuan.png";
import city from "@/assets/city/city_code.json";
import { getProjectList } from "@/api/projecthall";
import common from "@/mixin/common";

export default {
  mixins: [common],
  data() {
    return {
      // techTypeDict: [
      // {id:0, title:'不限'},
      // {id:1,title:'技术项目'},
      // {id:2,title:'专利项目'}
      // ],
      techSourceDict: [
        { id: 0, title: "不限" },
        { id: 1, title: "企业" },
        { id: 2, title: "院校" },
        { id: 3, title: "研究机构（实验室/研究院）" },
        { id: 4, title: "协会团体" },
        { id: 5, title: "个人" },
      ],
      projectList: [
        {
          id: 0,
          title: "【商业贸易】跨境平台综合服务开发",
          provinceName: "广西壮族自治区",
          cityName: "南宁市",
          areaName: "江南区",
          createTime: "2023.12.07",
          proIntentionPrice: "100",
          faceFlag: "0",
        },
        {
          id: 0,
          title: "【商业贸易】跨境平台综合服务开发",
          provinceName: "广西壮族自治区",
          cityName: "南宁市",
          areaName: "江南区",
          createTime: "2023.12.07",
          proIntentionPrice: "100",
          faceFlag: "0",
        },
        {
          id: 0,
          title: "【商业贸易】跨境平台综合服务开发",
          provinceName: "广西壮族自治区",
          cityName: "南宁市",
          areaName: "江南区",
          createTime: "2023.12.07",
          proIntentionPrice: "100",
          faceFlag: "1",
        },
        {
          id: 0,
          title: "【商业贸易】跨境平台综合服务开发",
          provinceName: "广西壮族自治区",
          cityName: "南宁市",
          areaName: "江南区",
          createTime: "2023.12.07",
          proIntentionPrice: 0,
          faceFlag: "0",
        },
        {
          id: 0,
          title: "【商业贸易】跨境平台综合服务开发",
          provinceName: "广西壮族自治区",
          cityName: "南宁市",
          areaName: "江南区",
          createTime: "2023.12.07",
          proIntentionPrice: 100,
          faceFlag: "0",
        },
      ],
      pageConfig: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
      pageValue: 1,
      extractInfo: [
      {
          title: "资源共享",
          detail: "免费发布与推广项目，资源信息在线共享",
          icons: ziyuan,
        },
        {
          title: "专业服务",
          detail: "政产学研金服用”全方位专业服务支持",
          icons: lindai,
        },
        { title: "合作共赢", detail: "多方参与、利益分享、合作共赢", icons: heizuo },
      ],
      searchData: {
        title: '',
        fulladdress: '',
        province: '',
        city: '',
        area: '',
        isNotNational: '',
        proName: '',
        industryone: '',
        proIntroduct: '',
        faceFlag: '',
        proPatentInfo: '',
        cooperation: '',
        proIntentionPrice: '',
        proDevelopment: '',
        proPatentCategory: '',
        proPatentNo: '',
        patentOwner: '',
        proGrantTime: '',
        pic_file: '',
        linkman: '',
        phone: '',
        email: '',
        company: '',
        postalfulladdressType: '',
        postalfulladdress: '',
        position: '',
        isListing: '',
        sponsor: '',
        typeDescription: '',
        scenario: '',
        top10hg: '',
        bj2441: '',
        zgckjy241: '',
      },
      firstLineProvince: 34,
      collapsed: true,
    };
  },
  computed: {
    cityList() {
      return [{ name: "全部", code: 0 }, ...city];
    },
    // proList() {
    //   return 
    // }
  },
  created() {
    this.loadData();
  },
  methods: {
    toPublishPage() {
      this.$router.push('/projectmanage/publish')
    },
    loadData() {
      this.loading = true;
      getProjectList({ ...this.pageConfig, ...this.searchData })
        .then((res) => {
          if (res.code == "0000") {
            this.projectList = res.rows;
            console.log('1234',this.projectList)
            this.pageConfig.total = res.total
          } else {
            this.$message.error(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCurrentChange(page) {
      this.pageConfig.pageNum = page;
      this.pageValue = page;
      this.loadData();
    },
    getProjDetail(proj) {
      this.$router.push({
        path: "/projectmanage/detail",
        query: { projectId: proj.id },
      });
    },
    handleSearchDataChange(type, value) {
      this.searchData[type] = value;
      this.loadData();
    },
  },
  mounted() {
    setTimeout(() => {
      const cityoption = document.querySelectorAll("#cityOption");
      const list = Array.from(cityoption).map((item) => item.offsetTop);
      this.firstLineProvince = list.lastIndexOf(list[0]);
      console.log(list, this.firstLineProvince);
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.project-manage {
  width: 100%;
  &-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-image: url("~img/projectManage/banner.png");
    background-size: 100%;
    background-repeat: no-repeat;
    :deep(.el-input__suffix) {
      top: 4px;
    }
    &-theme {
      background: linear-gradient(0deg, #008aff 0.1220703125%, #001196 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 72px;
      color: #19191c;
      font-weight: bold;
      margin-top: 140px;
    }
    &-attach {
      font-size: 37px;
      font-weight: 400;
      color: #001b9e;
      margin-top: 25px;
      background: linear-gradient(0deg, #008aff 0.1220703125%, #001196 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    &-search {
      margin-top: 60px;
      width: pxToVW(665);
      :deep(.el-input__inner) {
        border-radius: 48px;
        height: 48px;
        line-height: 48px;
      }
      :deep(.el-input__prefix) {
        line-height: 48px;
      }
      :deep(.el-input__suffix) {
        line-height: 48px;
      }
    }
    &-group {
      margin-top: 90px;
      width: 100%;
      padding: 0 pxToVW(270);
      &-wrap {
        display: flex;
        .left {
          width: pxToVW(1030);
          margin-right: pxToVW(20);
          &-classify {
            width: 100%;
            padding: 36px 28px;
            background-color: #fff;
            border-radius: 16px;
            :deep(.el-select-dropdown.is-multiple .el-select-dropdown__item.selected) {
              color: #2434af;
            }
            &-item {
              display: flex;
              align-items: center;
              margin-bottom: 30px;
              color: #3c3c41;
              font-weight: 400;
              &-title {
                width: 11vw;
                padding-top: 10px;
                align-self: start;
                text-align: end;
                margin-right: 12px;
              }
              &-option {
                padding: 8px 13px;
                margin: 0 10px;
                cursor: pointer;
                border: 1px solid rgba(0, 0, 0, 0);

                &.active {
                  background: #ffe5e5;
                  border: 1px solid #ee6868;
                  border-radius: 6px;
                  color: #ec4646;
                }
              }
              &-city {
                display: flex;
                flex-wrap: wrap;
                width: pxToVW(780);
              }
              .other {
                span {
                  font-size: 14px;
                }
                width: pxToVW(132);
                // border: 1px solid #EE6868;
                border-radius: 6px;
                margin-right: pxToVW(42);
                // :deep(.el-select .el-input.is-focus .el-input__inner) {
                //     border-color: #2434AF;
                // }
              }
              &-more {
                min-width: 60px;
                padding-top: 8px;
                align-self: start;
                cursor: pointer;
                color: #0e1e9c;
                position: relative;
                .more-options {
                  display: flex;
                  position: absolute;
                  transform: translatex(-50%);
                  top: 60px;
                  width: pxToVW(455);
                  height: 318px;
                  overflow: hidden;
                  background: #FFFFFF;
                  border: 1px solid #E4E7ED;
                  box-shadow: 0px 0px 57px 0px rgba(218,219,228,0.3);
                  border-radius: 6px;
                  padding: 26px pxToVW(38);
                  >div {
                    height: 100%;
                    overflow-y: auto;
                  }
                  &-item {
                    padding: 8px 13px;
                    cursor: pointer;
                    border: 1px solid rgba(0, 0, 0, 0);
                    color: #3c3c41;

                    &.active {
                      background: #ffe5e5;
                      border: 1px solid #ee6868;
                      border-radius: 6px;
                      color: #ec4646;
                    }
                  }

                }
              }
            }
          }
          &-project {
            margin-top: 20px;
            width: 100%;
            padding: 36px 28px;
            background-color: #fff;
            &-item {
              padding: 30px 0;
              border-bottom: 2px solid #ededed;
              display: flex;
              justify-content: space-between;
              align-items: center;
              cursor: pointer;
              .title {
                font-size: 18px;
                font-weight: 400;
                color: #19191c;
                margin-bottom: 30px;
              }
              .attach {
                font-size: 16px;
                font-weight: 400;
                color: #999999;
                display: flex;
                img {
                  margin-right: 12px;
                }
                &-address {
                  display: inline-block;
                  width: pxToVW(300);
                }
              }
              .right-content {
                color: #ec4646;
                font-size: 20px;
              }
            }
          }
          .pagination-box {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 50px 27px 64px 0;
            &-currentpage {
              background-color: #fff;
              height: 45px;
              line-height: 45px;
              padding: 0 10px;
              font-weight: 400;
              color: #19191c;
              border: 1px solid #cccccc;
              border-radius: 6px;
            }
            :deep(.el-input__inner) {
              text-align: center;
              color: #19191c;
              font-size: 16px;
              font-weight: 400;
            }
          }
        }
        .right {
          flex: 1;
          &-fab {
            background: #ffffff;
            border-radius: 16px;
            &-content {
              padding: 26px pxToVW(28) 40px;
              :deep(.el-input__prefix) {
                line-height: 40px;
              }
              :deep(.el-input--prefix .el-input__inner) {
                text-align: center;
                color: #19191c;
              }
              .el-button {
                margin-top: 20px;
                background-color: #2434af;
                font-size: 18px;
              }
            }
          }
          &-select {
            background: #ffffff;
            border-radius: 16px;
            margin-top: 20px;
            &-content {
              padding: 30px pxToVW(20);
              &-item {
                img {
                  width: pxToVW(64);
                  object-fit: contain;
                  margin-right: 10px;
                }
                display: flex;
                align-items: center;
                margin-bottom: 30px;
                span {
                  display: block;
                  color: #999999;
                }
                span.title {
                  color: #19191c;
                  margin-bottom: 10px;
                  font-size: 20px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
