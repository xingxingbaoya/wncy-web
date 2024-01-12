<template>
  <el-main v-loading="loading">
    <div class="home-main">
      <!-- <img src="~img/home/banner.png" /> -->
      <el-carousel trigger="click" height="100vh" arrow="never">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.picUrl" style="width: 100%;height:100%;" />
      </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-companyintro" id="companyintro">
      <!-- <div class="theme-box">
        <span>平台介绍</span>
        <b></b>
      </div> -->
      <div class="home-companyintro-content">
        <div class="home-companyintro-content-nav">
          <div
            v-for="item in companyintroList"
            :key="item.id + 'companyinto'"
            class="home-companyintro-content-nav-item"
            :class="activeIntro == item.id ? 'active' : ''"
            @click="activeIntro = item.id"
          >
            <div class="home-companyintro-content-nav-item-title">
              <img
                :src="activeIntro == item.id ? item.whiteIcon : item.iconUrl"
              />{{ item.title }}
            </div>
          </div>
        </div>
        <div class="home-companyintro-content-pic">
          <img
            :src="companyintroList[activeIntro].imgUrl"
            style="width: 100%; object-fit: contain"
          />
          <!-- <div class="home-companyintro-content-pic-intro">
            <div>{{ companyintroList[activeIntro].introInfo }}</div>
            <div>{{ companyintroList[activeIntro].detail }}</div>
          </div> -->
        </div>
      </div>
      <div class="home-companyintro-detail">
        {{ companyintroList[activeIntro].introInfo }}
      </div>
    </div>
    <div class="home-workmode">
      <div class="home-workmode-left">
        <div class="theme-box">
          <span>中关村微纳公司简介</span>
          <b></b>
        </div>
        <div class="content">
          中关村微纳，怀柔区政府和中关村发展集团组建合作的区市共建科创集成服务平台，是中发展在怀柔提供其“科服、投资、金融、园区、区域协同、国际链接”服务的总接口，作为怀柔科学城创新联合体牵头单位，从服务在怀30多家国家战略科技力量产研两侧技术供需对接微观需求入手，以密集产研对接吸纳贯通目标产业内“政产学研金介用”各级资源，做好科学家“经纪人”、企业家“经理人”、政府科创服务“合伙人”，通过“两库、两平台、一集成服务”，打造具备“服务+投资+园区”核心功能的区市共建科创服务平台。
        </div>
        <img src="~img/home/work-mode.png" />
        <div style="text-align: center; line-height: 70px">
          中关村微纳公司服务工作模式
        </div>
      </div>
    </div>
    <!-- <div class="home-platformservices" id="platformservices">
      <div class="theme-box">
        <span>平台服务</span>
        <b class="hasBakpic"></b>
      </div>
      <div class="home-platformservices-info">
        产研对接数字服务平台是北京中关村微纳能源投资有限公司的核心业务之一，该平台将科技成果库和企业需求库的资源进行全面整合，利用现代信息技术，打造一个高效、便捷、安全的科技创新服务平台。
      </div>
      <div class="home-platformservices-feature">
        <div>
          <img src="~img/home/platformServices-1.png" />
          <p>高效</p>
        </div>
        <div>
          <img src="~img/home/platformServices-2.png" />
          <p>便捷</p>
        </div>
        <div>
          <img src="~img/home/platformServices-3.png" />
          <p>安全</p>
        </div>
      </div>
      <div class="home-platformservices-featuretext">
        <div style="font-size: 26px; margin-bottom: 30px">
          产研对接数字服务平台的特点：
        </div>
        <div style="font-size: 22px">
          {{ platformFeature[activeFeature].description }}
        </div>
      </div>
      <div class="home-platformservices-featurepic">
        <div
          v-for="item in platformFeature"
          :key="item.id + 'featurepic'"
          class="home-platformservices-featurepic-item"
          @click="activeFeature = item.id"
        >
          <img :src="item.imgUrl" />
          <div class="cover" :class="activeFeature == item.id ? 'active' : ''">
            <img :src="item.icons" />
            <p style="font-size: 40px">{{ item.feature }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="home-companies">
      <div class="theme-box">
        <span>合作伙伴</span>
        <b></b>
      </div>
      <div class="home-companies-oprate">
        <img src="~img/home/companies-leftarrow.png" />
        <img src="~img/home/companies-rightarrow.png" />
      </div>
      <div>
        <img src="~img/home/companies.png" style="width: 80vw" />
        <div class="home-companies-group">
          <div
            v-for="(item, index) in companiesList"
            :key="index + 'companies'"
            class="home-companies-group-item"
          >
            <img :src="item" />
          </div>
        </div>
      </div>
    </div> -->

    <div class="home-freeregister">
      <div>ZGCNANO&nbsp;见微知著—立足怀柔科学城的产研对接居间集成服务平台</div>
      <template v-if="isLogin">
        <el-button round @click="registerUser">免费注册</el-button>
      </template>
    </div>
  </el-main>
</template>

<script>
import countTo from "vue-count-to";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {
  findAll,
  findPolicyService,
  getBanners,
  getCongresss,
  getIndustry,
  getInterList,
  getLiving,
  getPreview,
  getTwoAll,
  getUserList,
} from "@/api/home";
import common from "@/mixin/common";
import { getProjectList } from "@/api/projecthall";
import { getDemandList } from "@/api/demandhall";
import { getOrganization } from "@/api/dict";
import { getToken } from "@/utils/auth";
import { getBLen } from "@/utils";
import {
  getConferenceList,
  getMeetingAgendaGroup,
  getMeetingGrop,
  getmeetLists,
  getmeetZhibo,
} from "@/api/meet";
import { getZgcActivityList } from "@/api/activitieshall";

import companyinto1 from "@/assets/img/home/companyintro-1.png";
import companyinto2 from "@/assets/img/home/companyintro-2.png";
import companyinto3 from "@/assets/img/home/companyintro-3.png";
import companyinto4 from "@/assets/img/home/companyintro-4.png";
import companyinto5 from "@/assets/img/home/companyintro-5.png";
import companyinto1white from "@/assets/img/home/companyintro-1-white.png";
import companyinto2white from "@/assets/img/home/companyintro-2-white.png";
import companyinto3white from "@/assets/img/home/companyintro-3-white.png";
import companyinto4white from "@/assets/img/home/companyintro-4-white.png";
import companyinto5white from "@/assets/img/home/companyintro-5-white.png";
import companyintropic1 from "@/assets/img/home/companyintro-pic1.png";
import companyintropic2 from "@/assets/img/home/companyintro-pic2.png";
import companyintropic3 from "@/assets/img/home/companyintro-pic3.png";
import companyintropic4 from "@/assets/img/home/companyintro-pic4.png";
import companyintropic5 from "@/assets/img/home/companyintro-pic5.png";

import featurePic4 from "@/assets/img/home/feature-pic4.png";
import featurePic6 from "@/assets/img/home/feature-pic6.png";
import featurePic7 from "@/assets/img/home/feature-pic7.png";
import featurePic8 from "@/assets/img/home/feature-pic8.png";
import featurePic9 from "@/assets/img/home/feature-pic9.png";

import featureZiyuan from "@/assets/img/home/feature-ziyuan.png";
import featurePipei from "@/assets/img/home/feature-pipei.png";
import featureShichang from "@/assets/img/home/feature-shichang.png";
import featureXin from "@/assets/img/home/feature-xin.png";
import featureBen from "@/assets/img/home/feature-ben.png";

import companies1 from "@/assets/img/home/companies-1.png";
import companies2 from "@/assets/img/home/companies-2.png";
import companies3 from "@/assets/img/home/companies-3.png";
import companies4 from "@/assets/img/home/companies-4.png";
import companies5 from "@/assets/img/home/companies-5.png";
import companies6 from "@/assets/img/home/companies-6.png";
export default {
  name: "Home",
  components: {
    countTo,
    swiper,
    swiperSlide,
  },
  mixins: [common],
  data() {
    return {
      bannerList: [],
      meetList: [],
      meetThemeList: [],
      meetTimeList: [],
      meetSubList: [],
      activeSecondTab: 0,
      firstLive: {},
      secondLive: {},
      thirdLive: {},
      previewList: [],
      projectList: [],
      demandList: [],
      activeFouthTab: 0,
      activeFifthTab: 0,
      fouthLoading: false,
      fouthQuery: "",
      fifthQuery: "",
      mangerList: [],
      activeCyTab: "info",
      pageMap: {
        info: 0,
        health: 6,
        make: 9,
      },
      activeIndex: 0,
      industryImgList: [
        "cy1.jpg",
        "cy2.jpg",
        "cy3.jpg",
        "cy4.jpg",
        "cy5.jpg",
        "cy6.jpg",
        "cy7.jpg",
        "cy8.jpg",
        "cy9.jpg",
        "cy10.jpg",
        "cy11.jpg",
        "cy12.jpg",
      ],
      industryBtnList: [],
      industryMap: {
        info: [
          {
            text: "集成电路",
            icon: "cr1",
            active: "ca1",
          },
          {
            text: "云计算",
            icon: "cr2",
            active: "ca2",
          },
          {
            text: "大数据",
            icon: "cr3",
            active: "ca3",
          },
          {
            text: "工业互联网",
            icon: "cr4",
            active: "ca4",
          },
          {
            text: "5G",
            icon: "cr5",
            active: "ca5",
          },
          {
            text: "人工智能",
            icon: "cr6",
            active: "ca6",
          },
        ],
        health: [
          {
            text: "生物医疗",
            icon: "cr7",
            active: "ca7",
          },
          {
            text: "医疗器械",
            icon: "cr8",
            active: "ca8",
          },
          {
            text: "精准医疗",
            icon: "cr9",
            active: "ca9",
          },
        ],
        make: [
          {
            text: "智能装备",
            icon: "cr10",
            active: "ca10",
          },
          {
            text: "新材料",
            icon: "cr11",
            active: "ca11",
          },
          {
            text: "智能交通",
            icon: "cr12",
            active: "ca12",
          },
        ],
      },
      fifthTabLoading: false,
      dataPersentResult: {
        project: 0,
        requirement: 0,
        amount: 0,
        organization: 0,
        business: 0,
      },
      serviceLoading: false,
      serviceList: [],
      interList: [],
      interListNews: [],
      interListNewsTree2: [],
      newsTree2Active: 0,
      interListNewsTree3: [],
      innterNs: [],
      industryOneDictText: [
        "PLC、LED、FPGA、EDA",
        "创新药、基因组检测、医疗器械、高分子",
        "推进器、通信卫星、运载火箭、发射台",
        "温控材料、纳米材料、生物材料、复合材料",
        "数字孪生城市、工程技术与规划管理、网络安全",
      ],
      industryOneDictFifth: [
        {
          dictCode: 299,
          dictSort: 1,
          dictLabel: "电子信息技术",
          dictValue: "A",
          dictType: "p_industry_one",
          cssClass: null,
          listClass: "default",
          isDefault: "Y",
          status: "0",
        },
        {
          dictCode: 300,
          dictSort: 2,
          dictLabel: "生物与新医药技术",
          dictValue: "B",
          dictType: "p_industry_one",
          cssClass: null,
          listClass: "default",
          isDefault: "Y",
          status: "0",
        },
        {
          dictCode: 301,
          dictSort: 3,
          dictLabel: "航空航天技术",
          dictValue: "C",
          dictType: "p_industry_one",
          cssClass: null,
          listClass: "default",
          isDefault: "N",
          status: "0",
        },
        {
          dictCode: 302,
          dictSort: 4,
          dictLabel: "新材料技术",
          dictValue: "D",
          dictType: "p_industry_one",
          cssClass: null,
          listClass: "default",
          isDefault: "N",
          status: "0",
        },
        {
          dictCode: 304,
          dictSort: 6,
          dictLabel: "新能源及节能技术",
          dictValue: "F",
          dictType: "p_industry_one",
          cssClass: null,
          listClass: "default",
          isDefault: "N",
          status: "0",
        },
      ],
      serviceQuery: {
        policyState: "",
        supportInd: "",
        policyType: "",
        supportLimit: "",
        area: "",
      },
      rangDate: "",
      createOrganizationOps: [],
      currentIndex: 0,
      isPerfectVisible: false,
      navIndex: 0,
      swiperIndex: 0,
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 30,
        initialSlide: 0,
        grabCursor: true,
        navigation: {
          nextEl: ".left-rank",
          prevEl: ".right-rank",
        },
      },
      meetOptions: {
        slidesPerView: 3,
        spaceBetween: 10,
        grabCursor: true,
      },
      rankOptions: {
        direction: "vertical",
        slidesPerView: 5,
        spaceBetween: 0,
        grabCursor: true,
        navigation: {
          nextEl: ".arrowup",
          prevEl: ".arrowdown",
        },
        on: {
          slideChangeTransitionStart() {
            console.log(this.realIndex); // 获取轮播图片下标索引；这里有一个坑，之前网上找到的是用activeIndex，但后来网上说的是这个realIndex，原来activeIndex是swiper2.0的；而realIndex是swiper3.0的，（使用realIndex才实现了下标索引）
          },
        },
      },
      newsOptions: {
        slidesPerView: 1,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      isShowFir: false,
      industryTypeList: [
        {
          title: "产业分析",
          desc: "精准掌握科技成果转化、技术转移行业产业分析，提供产业一线分析情报",
          icon: "ev1.png",
          active: "ecv1.png",
        },
        {
          title: "科技服务",
          desc: "聚合成果转化高质量科技服务，解决全领域全行业科技提升痛点",
          icon: "ev2.png",
          active: "ecv2.png",
        },
        {
          title: "政策服务",
          desc: "汇集全国及中关村科技政策，提供行业领先的优质政策咨询服务",
          icon: "ev3.png",
          active: "ecv3.png",
        },
      ],
      techTypeList: [
        {
          title: "综合科技服务",
          desc: "知识产权服务、科技咨询服务、工程技术服务、科技金融服务、创业孵化服务、技术交易服务、人力资源服务、科技推广服务、企业基础服务等9个方向，共计113项服务；",
          cover: "cbg2.png",
        },
        {
          title: "共性技术服务",
          desc: "集成电路、医疗器械、生物医药、智能制造、新材料、智能网联汽车及新一代信息技术等7个领域，共计74项服务；",
          cover: "cbg1.png",
        },
        {
          title: "数智信息服务",
          desc: "云服务器、数据服务、建站服务、经营管理、评测认证等5项内容，共计40项服务；",
          cover: "cbg3.png",
        },
        {
          title: "创新社区服务",
          desc: "中关村社区、园区建设服务、项目运营服务、项目招商服务和配套保障服务等5部分，共计24项服务;",
          cover: "cbg4.png",
        },
      ],
      rankId: -1,

      // 新增
      companyintroList: [
        {
          id: 0,
          title: "平台简介",
          iconUrl: companyinto1,
          whiteIcon: companyinto1white,
          imgUrl: companyintropic1,
          introInfo:
            "ZGC NANO—怀柔区政府和中关村发展集团共建，怀柔科学城优势产业内“政产学研金服用”全创新要素资源超级代理人、超级联络人的市场化机制数字平台。",
          detail: "聚集创新要素",
        },
        {
          id: 1,
          title: "产研对接",
          iconUrl: companyinto2,
          whiteIcon: companyinto2white,
          imgUrl: companyintropic2,
          introInfo:
            "低碳技术领域（能源、材料、环境、装备、认证），以及空天、生物医药健康、信息智能、仪器传感领域，怀柔科学城战略科技力量体系最完善创新链的产研对接服务。",
          detail: "聚集创新要素",
        },
        {
          id: 2,
          title: "科技成果",
          iconUrl: companyinto4,
          whiteIcon: companyinto4white,
          imgUrl: companyintropic3,
          introInfo:
            "汇聚怀柔科学城为依托的科技成果项目，提供平台发布、自行登记、跟踪服务。",
          detail: "聚集创新要素",
        },
        {
          id: 3,
          title: "企业需求",
          iconUrl: companyinto3,
          whiteIcon: companyinto3white,
          imgUrl: companyintropic4,
          introInfo:
            "储备中国电能、超智控信、巴音孟克、佳瑞达等公司的技术、融资、落地等具体需求30余项。与国家电投中国电能合作，为国家电投寻找最适用、最匹配的技术、装备和服务等解决方案。现有技术需求120项，其中常规需求90项，新兴产业需求30项 。",
          detail: "聚集创新要素",
        },

        {
          id: 4,
          title: "集成服务",
          iconUrl: companyinto5,
          whiteIcon: companyinto5white,
          imgUrl: companyintropic5,
          introInfo:
            "集聚目标产业内“政产学研金服用”全创新要素资源，提供产研对接全要素居间集成服务。",
          detail: "聚集创新要素",
        },
      ],
      activeIntro: 0,
      platformFeature: [
        {
          id: 0,
          feature: "资源丰富",
          description:
            "资源丰富--产研对接数字服务平台拥有丰富的科技成果库和企业需求库资源，涵盖了多个领域和行业，为科学家、企业家和政府提供全面的科创服务。",
          icons: featureZiyuan,
          imgUrl: featurePic4,
        },
        {
          id: 1,
          feature: "高效匹配",
          description:
            "高效匹配--产研对接数字服务平台拥有丰富的科技成果库和企业需求库资源，涵盖了多个领域和行业，为科学家、企业家和政府提供全面的科创服务。",
          icons: featurePipei,
          imgUrl: featurePic6,
        },
        {
          id: 2,
          feature: "降低成本",
          description:
            "降低成本--产研对接数字服务平台拥有丰富的科技成果库和企业需求库资源，涵盖了多个领域和行业，为科学家、企业家和政府提供全面的科创服务。",
          icons: featureBen,
          imgUrl: featurePic7,
        },
        {
          id: 3,
          feature: "增强信任",
          description:
            "增强信任--产研对接数字服务平台拥有丰富的科技成果库和企业需求库资源，涵盖了多个领域和行业，为科学家、企业家和政府提供全面的科创服务。",
          icons: featureXin,
          imgUrl: featurePic8,
        },
        {
          id: 4,
          feature: "拓展市场",
          description:
            "拓展市场--产研对接数字服务平台拥有丰富的科技成果库和企业需求库资源，涵盖了多个领域和行业，为科学家、企业家和政府提供全面的科创服务。",
          icons: featureShichang,
          imgUrl: featurePic9,
        },
      ],
      activeFeature: 0,
      companiesList: [
        companies1,
        companies2,
        companies3,
        companies4,
        companies5,
        companies6,
      ],
    };
  },
  computed: {
    cheight() {
      return this.$store.getters.wheight + "px";
    },
    isShowLabel() {
      return (current) => {
        return current == this.currentIndex;
      };
    },
    isLogin() {
      return _.isEmpty(getToken());
    },
    isProd() {
      return process.env.VUE_APP_MODE == "prod";
    },
    actionStat: () => {
      return (item) => {
        if (item?.upType == "video") {
          if (item?.actStatus == "started") {
            return "直播中";
          } else if (item?.actStatus == "end") {
            return "回放";
          } else {
            return "未开始";
          }
        }
      };
    },
    actionStatBtn: () => {
      return (item) => {
        if (item?.upType == "video") {
          if (item?.actStatus == "started") {
            return "观看直播";
          } else if (item?.actStatus == "end") {
            return "观看回放";
          } else {
            return "未开始";
          }
        }
      };
    },
  },
  mounted() {
    if (!_.isEmpty(getToken()) && this.$store.getters.isPerfect == "0") {
      this.isPerfectVisible = true;
    }
    // this.loadData()
  },
  methods: {
    registerUser() {
      if (getToken()) {
        this.$router.push("/personal/center?active=1");
      } else {
        this.$router.push("/register");
      }
    },
    loadData() {
      this.loading = true;
      this.$store
        .dispatch("dict/getDic", [
          "p_industry_one",
          "p_nature",
          "p_tech_type",
          "p_cooperation",
          "p_patent_category",
          "p_development",
          "t_activity_kind",
          "u_company_type",
          "u_institutional_nature",
          "u_degree",
          "bbs_manuscript_status",
          "policy_type",
          "support_ind",
          "policy_state",
          "project_academy",
          "top_10_hg_category",
          "zgckjy_241_category",
          "bj_2441_category",
          "t_activity_way",
          "t_activity_status",
        ])
        .then(() => {
          this.loadHome();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadHome() {
      getBanners()
        .then((res) => {
          if (res.code == "0000") {
            this.bannerList = res.obj;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });

      getmeetLists()
        .then((res) => {
          if (res.code == "0") {
            this.meetList = res.rows;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });

      // getLiving()
      //   .then((res) => {
      //     if (res.code == "0000") {
      //       this.firstLive = _.head(res.obj) ?? {};
      //       this.secondLive = _.nth(res.obj, 1) ?? {};
      //       this.thirdLive = _.last(res.obj) ?? {};
      //     } else {
      //       this.$message.warning(res.msg);
      //     }
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //   });

      getPreview()
        .then((res) => {
          if (res.code == "0000") {
            this.previewList = res.obj;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });

      this.getProjectTab();
      this.getDemandTab();
      this.remoteMethod();
      this.getInterList(0);
      this.getInterList(1);

      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 30 };
      getUserList({ userType: 3, ...formpage })
        .then((res) => {
          if (res.code == "0000") {
            this.mangerList = _.chunk(res.rows, 2);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });

      getConferenceList({ ...formpage })
        .then((res) => {
          if (res.code == "0") {
            this.meetThemeList = res.rows;
            this.getSubMeet(
              res.rows?.[this.swiperIndex]?.conferenceId,
              this.swiperIndex
            );
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });

      this.getDataPresent();

      this.getService();

      this.industryBtnList = this.industryMap[this.activeCyTab];
    },
    getProjectTab(industryone = "", index = 0) {
      // this.fouthLoading = true
      this.activeFouthTab = index;
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 6 };
      this.pager.pageSize = formpage.pageSize;

      getProjectList({ title: this.fouthQuery, industryone, ...formpage })
        .then((res) => {
          if (res.code == "0000") {
            this.projectList = res.rows;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.fouthLoading = false;
        });
    },
    getDemandTab(industryone = "", index = 0) {
      // this.fouthLoading = true
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 4 };
      this.activeFifthTab = index;
      getDemandList({ name: this.fifthQuery, industryone, ...formpage })
        .then((res) => {
          if (res.code == "0000") {
            this.demandList = res.rows;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.fouthLoading = false;
        });
    },
    goOrgDetail({ id }) {
      this.goBlank({
        path: "/tradinghall/org-detail",
        query: {
          id,
        },
      });
    },
    goOrg() {
      this.goBlank({
        path: "/tradinghall/org",
      });
    },
    goTechDetail(index) {
      this.$router.push({
        path: "/servicehall/serviceDetail",
        query: {
          index,
        },
      });
    },

    activeFouthTabChange(label) {
      if (label == 1) {
        this.getProjectTab();
      } else {
        this.getDemandTab();
      }
    },
    activeCyTabChange(label) {
      this.industryBtnList = this.industryMap[label];
      this.activeIndex = 0;
      this.$refs.carouse.setActiveItem(this.pageMap[this.activeCyTab]);
    },
    swapCyImg(index) {
      this.activeIndex = index;
      this.$refs.carouse.setActiveItem(this.pageMap[this.activeCyTab] + index);
    },

    getDataPresent() {
      findAll()
        .then((res) => {
          if (res.code == "0000") {
            this.dataPersentResult = _.merge(this.dataPersentResult, res.obj);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {});
    },
    getSubMeet(conferenceId, index = 0) {
      this.swiperIndex = index;
      getMeetingAgendaGroup({ conferenceId })
        .then((r) => {
          if (r.code == "0000") {
            this.meetTimeList = r.obj;
          } else {
            this.$message.warning(r.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getInterList(domestic) {
      this.fifthTabLoading = true;
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 10 };
      getInterList({
        domestic,
        ...formpage,
      })
        .then((res) => {
          if (res.code == "0000") {
            if (1 == domestic) {
              this.interList = res.rows;
            } else {
              this.interListNews = res.rows;
              this.interListNewsTree2 = res.rows.slice(0, 2);
              this.interListNewsTree3 = res.rows.slice(2, 5);
            }
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.fifthTabLoading = false;
        });
      const fpage = { pageNum, pageSize: 4 };
      getZgcActivityList({
        actClassification: "ssb",
        ...fpage,
      })
        .then((res) => {
          if (res.code == "0000") {
            this.innterNs = res.rows;
            this.innterNs.length = 4;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.fifthTabLoading = false;
        });
    },

    getService() {
      this.fifthTabLoading = true;
      const { pageNum } = this.pager;
      const formpage = { pageNum, pageSize: 10 };
      findPolicyService({
        ...this.serviceQuery,
        ...formpage,
      })
        .then((res) => {
          if (res.code == "0000") {
            if (pageNum > 1) {
              this.serviceList = this.serviceList.concat(res.rows);
            } else {
              this.serviceList = res.rows;
            }
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.fifthTabLoading = false;
        });
    },
    pageService() {
      this.pager.pageNum++;
      this.getService();
    },
    remoteMethod() {
      getOrganization()
        .then((res) => {
          if (res.code == "0000") {
            this.createOrganizationOps = res.obj;
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {});
    },
    goproject({ id, industryOne }, type) {
      if (type == "project") {
        this.goBlank({
          path: "/projecthall/detail",
          query: {
            id,
            industryOne,
          },
        });
      } else {
        this.goBlank({
          path: "/demandhall/detail",
          query: {
            id,
            industryOne,
          },
        });
      }
    },
    goDeclare({ policyId: id }) {
      this.goBlank({
        path: "/bbshall/toDeclare",
        query: {
          id,
        },
      });
    },
    gopost(act) {
      if (act == 1) {
        this.goBlank({
          path: "/projecthall/post",
        });
      } else {
        this.goBlank({
          path: "/demandhall/post",
        });
      }
    },
    godetail({ redirectUrl = "" }) {
      if (_.isEmpty(redirectUrl) || redirectUrl == "#") {
        return false;
      } else {
        window.open(redirectUrl);
      }
    },
    goaction({ newsId }) {
      this.goBlank({
        path: "/meethall/activityDetail",
        query: {
          newsId,
        },
      });
    },
    gomore(num) {
      const actClassification = num == 1 ? "xwdt" : "ssb";
      this.goBlank({
        path: "/activitieshall/more",
        query: {
          actClassification,
        },
      });
    },
    goNewsMore() {
      this.goBlank({
        path: "/bbshall/newsList",
      });
    },

    gomorefouth(activeFouthTab) {
      if (activeFouthTab == "project") {
        this.goBlank({
          path: "/projecthall",
        });
      } else {
        this.goBlank({
          path: "/demandhall",
        });
      }
    },
    gomanger() {
      this.goBlank({
        path: "/talenthall/manager",
      });
    },
    goaAtionDetail({ upType, actStatus, actId, signUpEnable }) {
      if (upType == "video") {
        if (actStatus == "started") {
          this.golive(actId);
        } else {
          this.govideo(actId);
        }
      } else {
        if (signUpEnable == "1") {
          this.gosign(actId);
        } else {
          this.goarticle(actId);
        }
      }
    },
    goarticle(id) {
      this.goBlank({
        path: "/activitieshall/article",
        query: {
          id,
        },
      });
    },
    gosign(id) {
      this.goBlank({
        path: "/activitieshall/signup",
        query: {
          id,
        },
      });
    },
    gomeet({ congressId }) {
      this.goBlank({
        path: "/meet",
        query: {
          congressId,
        },
      });
    },
    goservice({ policyId: id }) {
      this.goBlank({
        path: "/bbshall/PolicyDetail",
        query: {
          id,
        },
      });
    },
    goNewsDetail({ id }) {
      this.$router.push({
        path: "/bbshall/newDetal",
        query: {
          id,
        },
      });
    },
    swapChange(index) {
      this.currentIndex = index;
    },
    goedit() {
      this.$router.push({
        path: "/personal/center/edit",
      });
    },
    gopolicy({ id }) {
      this.$router.push({
        path: "/policy",
        query: {
          id,
        },
      });
    },
    getStrLen(str) {
      return getBLen(str);
    },
    gopetail(id) {
      this.goBlank({
        path: "/rdetail",
        query: { id },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.el-main {
  padding-top: 0;
}

.theme-box {

  width: 100%;
  text-align: center;
  font-size: 34px;
  font-weight: bold;
  color: #18181c;
  margin-bottom: 48px;
  span {
    display: block;
  }
  b {
    display: inline-block;
    width: pxToVW(74);
    height: 2px;
    background: #2434af;
  }
  .hasBakpic {
    background: #fff;
  }
}
.home-main {
  position: relative;
  height: 100vh;
  :deep(.el-carousel) {
    height: 100%;
    .el-carousel__container {
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  // &-title {
  //   font-size: 178px;
  //   font-weight: normal;
  //   color: #FFFFFF;
  // }
  // &-attach {
  //   font-size: 41px;
  //   font-weight: normal;
  //   color: #FFFFFF;
  // }
}

.home-workmode {
  padding: 112px pxToVW(338) 160px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    font-size: 16px;
    margin-bottom: 50px;
      font-weight: 400;
      color: #494949;
      line-height: 42px;
      text-align: justify;
      text-indent: 32px;
      
    }
  &-left {
    text-align: center;
  }
}

.home-companyintro {
  padding: 73px 0 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff;

  &-content {
    display: flex;
    justify-content: center;
    &-nav {
      &-item {
        height: 96px;
        width: pxToVW(345);
        color: #17181c;
        margin-bottom: 22px;
        cursor: pointer;
        &.active {
          color: #fff;
          background-image: url("~img/home/blue-box.png");
          background-repeat: no-repeat;
          background-size: 100% auto;
        }
        &-title {
          text-align: center;
          height: 100%;
          font-size: 26px;
          line-height: 96px;
          width: pxToVW(330);
          display: flex;
          justify-content: center;
          img {
            width: pxToVW(42);
            object-fit: contain;
            margin-right: 30px;
            line-height: 96px;
          }
        }
        &:not(.active) {
          .home-companyintro-content-nav-item-title {
            background-image: url("~img/home/white-box.png");
          }
        }
      }
    }
    &-pic {
      flex: 1;
      width: pxToVW(1024);
      height: 100%;
      position: relative;
      img: {
        width: 100%;
      }
      &-intro {
        position: absolute;
        color: #fff;
        bottom: 44px;
        left: pxToVW(50);
        font-size: 16px;
        :first-child {
          font-size: 26px;
          margin-bottom: 11px;
        }
      }
    }
  }
  &-detail {
    width: pxToVW(1380);
    overflow: hidden;

    height: 190px;
    background-image: url("~img/home/companyintro-back.png");
    background-size: 100%;
    background-repeat: no-repeat;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #09135e;
    line-height: 42px;
    text-align: center;
    white-space: wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 pxToVW(100);
  }
}

.home-platformservices {
  width: 100%;
  background-image: url("~img/home/platformServices.png");
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 88px 0 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .theme-box {
    span {
      color: #fff;
    }
  }
  &-info {
    margin: 45px 0 119px;
    width: pxToVW(816);
    font-size: 16px;
    text-align: center;
    line-height: 32px;
  }
  &-feature {
    width: pxToVW(1380);
    display: flex;
    justify-content: space-between;
    padding: 0 pxToVW(116);
    border-bottom: 2px solid #fff;
    margin-bottom: 44px;
    img {
      width: pxToVW(95);
      object-fit: contain;
    }
    div {
      text-align: center;
    }
  }
  &-featuretext {
    width: pxToVW(1380);
  }
  &-featurepic {
    display: flex;
    width: 100%;
    margin-top: 48px;
    &-item {
      width: 20vw;
      height: 650px;
      position: relative;
      cursor: pointer;
      > img {
        width: 100%;
      }
      .cover:not(.active) {
        display: none;
      }
      &:hover .cover,
      .cover.active {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: pxToVW(133);
          object-fit: contain;
        }
      }
    }
  }
}
.home-companies {
  width: 100%;
  margin: 200px 0 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-oprate {
    height: 43px;
    width: pxToVW(1185);
    display: flex;
    justify-content: space-between;
    margin: 47px 0 60px;
    > img {
      cursor: pointer;
      width: pxToVW(25);
      object-fit: contain;
    }
  }
  &-group {
    display: flex;
    margin-top: 16px;
    &-item {
      width: pxToVW(185);
      margin: 0 pxToVW(22);
      img {
        width: 100%;
      }
    }
  }
}
.home-freeregister {
  width: 100%;
  background-image: url("~img/home/register-back.png");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  padding: 106px 0 74px;
  font-size: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    font-size: 26px;
    margin-top: 40px;
    height: 70px;
    width: pxToVW(221);
    background-color: #fff;
    color: #001f99;
  }
}

.home-third {
  background-image: url($backgroundImgURL + "/homebg3.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 36px 0 0;
  height: 1080px;
  .third-content {
    padding: 0 calc((100% - 1320px) / 2) 60px;
    .third-inner-top {
      height: 330px;
    }
    h2 {
      text-align: center;
      font-size: 36px;
    }
    h5 {
      font-size: 20px;
      font-weight: 600;
      color: #999999;
    }

    .mt100 {
      margin-top: 65px;
    }

    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;
      .nav-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24px;
        font-weight: 600;
        color: #333333;
        .image {
          width: 23px;
          height: 23px;
          margin-right: 15px;
        }
      }
      .nav-right {
        cursor: pointer;
        font-size: 20px;
        font-weight: 300;
        color: #bbbbbb;
      }
    }

    .left-content {
      position: relative;
      .image {
        cursor: pointer;
        width: 100%;
        height: 363px;
      }
      .news-title {
        width: 100%;
        text-indent: 2em;
        position: absolute;
        text-align: left;
        bottom: 5px;
        left: 0;
        z-index: 10;
        height: 39px;
        line-height: 39px;
        padding-right: 20%;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .swiper-pagination {
        width: 20%;
        bottom: 15px;
        left: 80% !important;
        z-index: 20;
      }
      ::v-deep .swiper-pagination-bullet {
        background: #ffffff !important;
        opacity: 1 !important;
      }
      ::v-deep .swiper-pagination-bullet-active {
        background: #1e86f9 !important;
      }

      .news-wrap {
        position: relative;
      }
    }

    .mid-content {
      height: 362px;
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      //margin-right: 20px;
      justify-content: space-between;
      .mid-top,
      .mid-bot {
        cursor: pointer;
        height: 48.5%;
        background: #fff;
        padding: 18px 30px;

        .el-divider--horizontal {
          margin: 0 0 12px 0;

          background: #dddddd;
        }
        .title {
          margin: 0;
          font-size: 16px;
          overflow: hidden; //超出文本隐藏
          text-overflow: ellipsis; ///超出部分省略号显示
          display: -webkit-box; //弹性盒模型
          -webkit-box-orient: vertical; //上下垂直
          -webkit-line-clamp: 1; //自定义行数
          font-weight: 600;
          color: #333333;
        }

        .desc {
          font-size: 12px;
          font-weight: 500;
          color: #999999;
          overflow: hidden; //超出文本隐藏
          text-overflow: ellipsis; ///超出部分省略号显示
          display: -webkit-box; //弹性盒模型
          -webkit-box-orient: vertical; //上下垂直
          -webkit-line-clamp: 2; //自定义行数
          line-height: 22px;
          min-height: 44px;
        }

        .t-bot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .day {
              font-size: 22px;
              font-weight: 600;
              color: #666666;
            }

            .month {
              font-size: 14px;
              font-weight: 300;
              color: #999999;
            }
          }
          .arrow {
            img {
              height: 30px;
              width: 30px;
            }
          }
        }
      }

      .mid-top:hover {
        background-color: #1e86f9;
        .title,
        .desc {
          color: #ffffff;
        }
        .el-divider--horizontal {
          margin: 0 0 12px 0;

          background: #fff;
          opacity: 0.6;
        }

        .t-bot {
          .date {
            .day {
              color: #ffffff;
            }

            .month {
              color: #ffffff;
            }
          }
        }
      }

      .image {
        cursor: pointer;
        width: 100%;
        height: 162px;
      }
    }

    .right-content {
      height: 366px;
      overflow: hidden;
      .r-list {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .r-box {
          padding: 0 34px;
          height: 31%;
          width: 100%;
          background: #ffffff;
          border-radius: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          .date {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .day {
              font-size: 22px;
              font-weight: 600;
              color: #666666;
            }

            .month {
              font-size: 14px;
              font-weight: 300;
              color: #999999;
            }
            .el-divider--horizontal {
              margin: 6px 0;
              width: 30px;
              background: #dddddd;
            }
          }

          .line {
            .el-divider--vertical {
              margin: 0 20px;
              height: 55px;
              background: #eeeeee;
            }
          }

          .f-title {
            .title {
              width: 255px;
              font-size: 16px;
              font-weight: 600;
              color: #333333;
              margin: 0 0 7px 0;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              line-height: 22px;
            }

            .arrow {
              .image {
                width: 16px;
                height: 8px;
                object-fit: contain;
                cursor: pointer;
              }
            }
          }
        }

        .r-box:hover {
          background-color: #1e86f9;
          .title {
            color: #ffffff;
          }
          .el-divider--horizontal {
            margin: 0 0 12px 0;
            background: #fff;
            opacity: 0.6;
          }

          .date {
            .day {
              color: #ffffff;
            }

            .month {
              color: #ffffff;
            }
          }
        }
      }
    }

    .inner_card {
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      .inner-title {
        font-size: 18px;
        display: inline-block;
        font-weight: 500;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .inner-desc {
        font-size: 16px;
        font-weight: 500;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .inner-btn {
        text-align: center;
      }
      .inner-opera {
        width: 132px;
        height: 42px;
        color: #ffffff;
        background: #516fd2;
        border-radius: 4px;
      }
      .image {
        height: 170px;
        width: 100%;
      }

      .el-tag--plain.el-tag--info {
        position: absolute;
        width: 64px;
        text-align: center;
        right: 11px;
        top: 7px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        border: 1px solid #ffffff;
      }
    }
  }

  .third-ad {
    img {
      width: 100%;
    }
  }
}

.home-fourth {
  background-image: url($backgroundImgURL + "/home-bg4.png");
  background-size: cover;
  background-repeat: repeat;
  //height: 1092px;
  padding: 58px 0;
  .fouth-content {
    padding: 0 calc((100% - 1320px) / 2) 60px;
    .mr10 {
      margin-right: 15px;
    }
    h2 {
      text-align: center;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 40px;
    }

    .search-area {
      align-items: center;
      margin-bottom: 30px;
      .publish-button {
        width: 239px;
        height: 67px;
        background: #1e86f9;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        margin-right: 30px;
        ::v-deep .el-icon-s-promotion {
          font-size: 24px;
        }
      }

      .input-search {
        width: 735px;
        border-radius: 5px;
        border: 1px solid #999999;
        ::v-deep .el-input__inner {
          height: 67px;
          font-size: 18px;
          border-right: none;
          color: #999999;
          background-color: transparent;
          transition: none !important;
        }

        ::v-deep .el-button {
          width: 166px;
          color: #333333;
          font-size: 22px;
          font-weight: 300;
          border-radius: 0 4px 4px 0;
          border-left: 2px solid #999999;
          padding: 4px 0;
        }
        ::v-deep .el-input.is-active .el-input__inner,
        ::v-deep .el-input__inner:focus {
          border: #333333;
        }

        ::v-deep .el-input__inner:hover {
          border: #333333;
        }

        ::v-deep .el-input-group__append {
          background-color: transparent;
        }
      }
    }

    .search-list {
      display: flex;
      justify-content: space-between;
      .project-list {
        .nearBg {
          background-image: url($backgroundImgURL + "/f-bg.png");
        }
        .p-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 365px;
          height: 131px;
          cursor: pointer;
          //background: #F6F6F6;

          .line {
            width: 58px;
            font-size: 48px;
            letter-spacing: 3px;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
          }

          .type {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 176px;
            height: 23px;
            font-size: 24px;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            .type-t {
              font-size: 20px;
              font-weight: 600;
              color: #666666;
              line-height: 24px;
              margin: 12px 0;
            }
            .type-b {
              font-size: 16px;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
              margin: 0;
            }
          }

          .arrow {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            .image {
              width: 16px;
              height: 14px;
            }
          }
        }

        .active {
          background: linear-gradient(90deg, #1c75f2 0%, #329af7 100%);
          .line {
            color: #ffffff;
          }

          .type {
            .type-t,
            .type-b {
              color: #ffffff;
            }
          }

          .arrow {
            background: #ffffff;
            box-shadow: 0 0 12px 0 #1162d5;
            border-radius: 50%;
          }
        }
      }

      .project-goods {
        width: 875px;
        .card-cont {
          padding: 3px;
        }
        .box-card {
          cursor: pointer;
          //height: 250px;
          .header_cw {
            display: flex;
            justify-content: space-between;
            .header_img {
              width: 139px;
              height: 102px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .header-price {
              font-size: 20px;
              font-weight: 600;
              color: #1e86f9;
              margin-top: 15px;
              .bold-price {
                font-size: 20px;
                font-weight: 600;
                color: #1e86f9;
                line-height: 24px;
              }
            }
          }

          .title_cw {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
            margin: 10px 0;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1; /*超出几行后省略号*/
            overflow: hidden;
          }
          .description_cw {
            font-size: 14px;
            font-weight: 500;
            height: 42px;
            line-height: 1.5;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .from_time_cw {
            margin-top: 17px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            color: #999999;
            span:nth-child(2) {
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}

.home-fifth {
  width: 100%;
  background-image: url($backgroundImgURL + "/fifth-bg.png");
  background-size: cover;
  background-repeat: repeat;
  height: 1092px;
  padding: 58px 0;
  .fouth-content {
    padding: 0 calc((100% - 1340px) / 2) 60px;
    .mr10 {
      margin-right: 15px;
    }
    h2 {
      text-align: center;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 40px;
    }

    .search-area {
      align-items: center;
      margin-bottom: 30px;
      .publish-button {
        width: 239px;
        height: 67px;
        background: #1e86f9;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
        margin-right: 30px;
        ::v-deep .el-icon-s-promotion {
          font-size: 24px;
        }
      }

      .input-search {
        width: 735px;
        border-radius: 5px;
        border: 1px solid #999999;
        ::v-deep .el-input__inner {
          height: 67px;
          font-size: 18px;
          border-right: none;
          color: #999999;
          background-color: transparent;
          transition: none !important;
        }

        ::v-deep .el-button {
          width: 166px;
          color: #333333;
          font-size: 22px;
          font-weight: 300;
          border-radius: 0 4px 4px 0;
          border-left: 2px solid #999999;
          padding: 4px 0;
        }
        ::v-deep .el-input.is-active .el-input__inner,
        ::v-deep .el-input__inner:focus {
          border: #333333;
        }

        ::v-deep .el-input__inner:hover {
          border: #333333;
        }

        ::v-deep .el-input-group__append {
          background-color: transparent;
        }
      }
    }

    .search-list {
      display: flex;
      justify-content: space-between;
      .project-list {
        .nearBg {
          background-image: url($backgroundImgURL + "/f-bg.png");
        }
        .p-box {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 365px;
          height: 131px;
          cursor: pointer;
          //background: #F6F6F6;

          .line {
            width: 58px;
            font-size: 48px;
            letter-spacing: 3px;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
          }

          .type {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 176px;
            height: 23px;
            font-size: 24px;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            .type-t {
              font-size: 20px;
              font-weight: 600;
              color: #666666;
              line-height: 24px;
              margin: 12px 0;
            }
            .type-b {
              font-size: 16px;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
              margin: 0;
            }
          }

          .arrow {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            .image {
              width: 16px;
              height: 14px;
            }
          }
        }

        .active {
          background: linear-gradient(90deg, #1c75f2 0%, #329af7 100%);
          .line {
            color: #ffffff;
          }

          .type {
            .type-t,
            .type-b {
              color: #ffffff;
            }
          }

          .arrow {
            background: #ffffff;
            box-shadow: 0 0 12px 0 #1162d5;
            border-radius: 50%;
          }
        }
      }

      .project-goods {
        width: 875px;
        .goods-list {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 100%;
        }
        .card-cont {
          margin-bottom: 20px;
        }
        .box-card {
          cursor: pointer;
          height: 185px;
          background: #f7f7f7;
          &:hover {
            background: #ffffff;
          }
          .header_cw {
            &:hover .list-btn {
              background: #1e86f9;
              color: #ffffff;
            }

            display: flex;
            justify-content: space-between;
            .header_img {
              width: 189px;
              height: 146px;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
            .mid-content {
              //margin-left: 25px;
              //width: 208px;
            }
            .mid-header {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              .header-price {
                margin-right: 15px;
                font-size: 16px;
                font-weight: 600;
                color: #1e86f9;
                line-height: 24px;
                .bold-price {
                  font-size: 16px;
                  font-weight: bold;
                  color: #1e86f9;
                  line-height: 24px;
                }
              }
              .title_cw {
                width: 336px;
                font-size: 16px;
                color: #333333;
                line-height: 24px;
                font-weight: 600;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1; /*超出几行后省略号*/
                overflow: hidden;
                h4 {
                  margin: 0;
                }
              }
            }
          }

          .description_cw {
            width: 470px;
            font-size: 14px;
            font-weight: 500;
            line-height: 24px;
            height: 62px;
            color: #999999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .from_time_cw {
            margin-top: 17px;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            color: #999999;
            span:nth-child(2) {
              margin: 10px 0;
            }
          }

          .btns {
            display: flex;
            justify-content: center;
            align-items: center;

            .list-btn {
              //padding: 10px 15px;
              width: 120px;
              height: 35px;
              background: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #333333;
              transition: all 0.6s;
              .more {
                font-size: 12px;
                margin-right: 25px;
              }
              .el-icon-right {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
}

.home-seven {
  height: 1092px;
  padding: 58px 0;
  background-image: url($backgroundImgURL + "/sevenBg.png");
  .seven-content {
    padding: 0 calc((100% - 1320px) / 2) 60px;
    h2 {
      text-align: center;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 100px;
    }

    .se-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 770px;
      background-image: url($backgroundImgURL + "/seven-ibg.png");
      background-repeat: no-repeat;
      background-size: cover;
      .inner-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding-left: 120px;
        position: relative;
        .arrow {
          position: absolute;
          right: 25px;
          bottom: -180px;
          height: 110px;
          width: 45px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .arrowup,
          .arrowdown {
            width: 45px;
            height: 45px;
            cursor: pointer;
          }
        }
        h3 {
          font-size: 48px;
          font-weight: 500;
          line-height: 80px;
          color: #ffffff;
          margin: 0 0 60px 0;
        }
        .short {
          font-size: 24px;
          font-weight: 300;
          color: #ffffff;
          opacity: 0.66;
          margin-bottom: 100px;
        }

        .gomore {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 277px;
          height: 75px;
          background: linear-gradient(90deg, #1c6fe2 0%, #3f8efd 100%);
          border-radius: 3px;
          font-size: 22px;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
        }
      }

      .inner-right {
        height: 108%;
        //padding-right: 20px;
        .orgSwiper {
          height: 100%;
        }
        .inner-list {
          height: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .inner-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border-radius: 6px;
            box-shadow: 0 0 20px 0 rgba(20, 64, 100, 0.06);
            .left {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 147px;
              height: 140px;
              .image {
                width: 100px;
                height: 100px;
                object-fit: contain;
              }
            }
            .right {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 205px;
              height: 140px;
              box-shadow: 0 2px 10px 2px rgba(29, 112, 227, 0.06);
              text-align: center;
              .desc {
                width: 160px;
                display: inline-block;
                font-size: 18px;
                font-weight: 400;
                color: #333333;
                text-align: left;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 30px;
              }
            }
            //TODO
            //&:hover {
            //  background: #1E86F9;
            //  .desc {
            //    color: #FFFFFF;
            //  }
            //}
          }
        }
      }
    }
  }
}

.home-eight {
  width: 100%;
  background-image: url($backgroundImgURL + "/et8bg.png");
  background-size: cover;
  background-repeat: repeat;
  height: 1092px;
  padding: 58px 0;
  .eight-content {
    padding: 0 calc((100% - 1320px) / 2) 60px;
    h2 {
      text-align: center;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 40px;
    }
    .wrap-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      .iwidth {
        width: 48% !important;
        cursor: pointer;
      }
      .mr10 {
        margin-right: 4%;
      }
    }

    .wrap-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 215px;
      background-color: #ffffff;
      margin-top: 100px;
      .left {
        width: 324px;
        padding: 48px 0 48px 48px;
        .title {
          font-size: 20px;
          font-weight: 600;
          color: #17193b;
          line-height: 24px;
        }

        .desc {
          font-size: 16px;
          font-weight: 300;
          color: #999999;
          line-height: 26px;
        }
      }
      .right-hold {
        height: 274px;
        width: 230px;
        position: relative;
        .image {
          position: absolute;
          bottom: 30px;
          right: 20px;
          width: 230px;
          height: 274px;
        }
      }
    }

    .eight-nav {
      margin-bottom: 56px;
      .outer-wrap {
        padding: 0 1px;
        cursor: pointer;
        transition: width 0.3s;
      }
      .wrap {
        display: flex;
        justify-content: space-between;
        padding: 20px 55px 20px 30px;
        align-items: flex-start;
        height: 176px;
        background: #272d39;
        border-radius: 3px;
        cursor: pointer;
        .w-left {
          height: 129px;
          display: flex;
          justify-content: flex-end;
          flex-direction: column;
          align-items: center;
          .image {
            width: 67px;
            height: 51px;
            object-fit: contain;
          }
        }

        .w-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .f-title {
            font-size: 22px;
            font-weight: 600;
            color: #ffffff;
            margin: 5px 10px 5px 0;
          }

          .f-desc {
            width: 233px;
            font-size: 18px;
            font-weight: 300;
            color: #ffffff;
            line-height: 24px;
            margin-top: 10px;
          }
        }
      }

      .active {
        background: #1e86f9;
        box-shadow: 0 10px 25px 5px rgba(39, 45, 57, 0.18);
        border-radius: 3px;
        .w-left {
          .image {
            width: 146px !important;
            height: 129px !important;
          }
        }
      }
    }

    .row-wrap {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      margin-top: 10px;
      .first-left {
        width: 255px;
        height: 625px;
        margin-right: 30px;
        .inner-left {
          .s-box {
            padding-left: 30px;
            .s-header {
              font-size: 20px;
              font-weight: 400;
              color: #333333;
              line-height: 24px;
              position: relative;
              margin-bottom: 10px;
              &::before {
                position: absolute;
                left: -25px;
                top: 8px;
                content: "";
                display: block;
                width: 13px;
                height: 6px;
                background: #ff7f81;
                border-radius: 3px;
              }
            }

            .two::before {
              background: #40ddff;
            }
            .three::before {
              background: #65ffad;
            }

            .s-list {
              font-size: 18px;
              font-weight: 400;
              color: #666666;
              padding: 10px 0;
              margin: 0;
              transition: all 0.6s;
              cursor: pointer;
              &:hover {
                padding-left: 25px;
                font-weight: 400;
                color: #ffffff;
                background: linear-gradient(
                  90deg,
                  #0284e9 0%,
                  rgba(0, 77, 137, 0) 100%
                );
              }
            }
            .active {
              padding-left: 25px;
              font-size: 18px;
              font-weight: 400;
              color: #ffffff;
              background: linear-gradient(
                90deg,
                #0284e9 0%,
                rgba(0, 77, 137, 0) 100%
              );
            }
          }
        }
      }
      .first-right {
        width: 988px;
        height: 701px;
        background: url($backgroundImgURL + "/swbg.png") no-repeat;
        background-size: contain;
        padding: 19px 26px 26px 26px;
        .el-carousel {
          .image {
            width: 918px;
            height: 561px;
            border-radius: 30px;
            object-fit: cover;
          }
        }
      }
    }

    .search-content {
      background-color: transparent;
      .search-query {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 150px;
        }
        ::v-deep .el-input__inner {
          background-color: transparent !important;
        }
      }

      .search-left {
        display: flex;
        align-items: center;
      }

      .select-title {
        font-size: 18px;
        font-weight: 400;
        width: 100px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
        color: #999999;
      }

      .mt0 {
        margin-top: 0;
      }

      .select-ftitle {
        font-size: 16px;
        font-weight: 600;
        color: #606266;
      }

      .pr20 {
        margin-right: 22px;
      }

      .select-scope {
        transition: height 0.3s;
        width: calc(100% - 120px);
        display: inline-block;
        height: 45px;
        overflow: hidden;
        ::v-deep .el-radio-button__inner {
          background-color: transparent;
        }
      }
      .sel-layout {
        width: 15%;
        border-radius: 3px;
        ::v-deep .el-input,
        ::v-deep .el-input__inner {
          //background: #516FD2;
          //color: #FFFFFF;
        }

        ::v-deep .el-input__inner {
          height: 45px;
          //font-size: 20px;
          font-weight: 400;
          //color: #FFFFFF;
          line-height: 25px;
          &::placeholder {
            font-size: 18px;
            font-weight: 400;
            //color: #FFFFFF;
          }
        }

        ::v-deep .el-input.is-focus .el-input__inner {
          //border:0;
        }

        ::v-deep .el-input .el-select__caret {
          //color:#fff;
        }

        ::v-deep .el-select-dropdown__item {
          font-size: 18px;
          font-weight: 500;
          color: #999999;
          &:hover {
            //background: #EFEFEF;
          }
        }
      }

      .show-more {
        height: auto;
      }

      .more-layout {
        text-align: right;
        height: 45px;
        line-height: 45px;
      }

      .select-more {
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        color: #999999;
        cursor: pointer;
        height: auto;
        i {
          font-weight: 700;
          font-size: 18px;
          color: #606266;
        }
      }

      ::v-deep .el-radio-button:first-child .el-radio-button__inner {
        border: none;
      }

      ::v-deep .el-radio-button__inner {
        border: none;
        font-size: 18px;
      }
      ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        border: none;
        color: #226fed;
        box-shadow: none;
        border-radius: 22px;
      }

      ::v-deep .el-radio-button__inner:hover {
        color: #516fd2;
      }

      ::v-deep
        .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        box-shadow: none;
      }
    }

    .search-list {
      height: 450px;
      overflow-y: scroll;
      margin-top: 30px;
      padding-right: 15px;
      &::-webkit-scrollbar-thumb {
        background: #dddddd;
      }

      &::-webkit-scrollbar-track-piece {
        background: transparent;
      }
      .search-layout {
        cursor: pointer;

        .search-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #dddddd;

          .h-left {
            flex-direction: column;
            display: flex;
            justify-content: space-around;
            .m-title {
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 12px;
              color: #333333;
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              &:hover {
                color: #1e86f9;
              }
            }
            .m-desc {
              margin-bottom: 18px;
            }

            .ml20 {
              margin-left: 30px;
            }

            .d-tit {
              color: #999999;
            }

            .d-desc {
              display: inline-block;
              width: 120px;
            }
          }

          .h-right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 113px;
            height: 32px;
            background: #2a72e6;
            color: #ffffff;
            border-radius: 16px;
          }
        }
      }
    }
  }
}

.home-nine {
  width: 100%;
  background-image: url($backgroundImgURL + "/ninebg.png");
  background-size: cover;
  background-repeat: repeat;
  //height: 1080px;
  padding: 58px 0;
  overflow-x: hidden;
  .nine-content {
    padding: 0 calc((100% - 1320px) / 2) 0;
    h2 {
      text-align: center;
      font-size: 36px;
      margin-top: 0;
      margin-bottom: 40px;
    }

    .wrap {
      //height: 586px;
    }

    .wrap-l {
      position: relative;
      height: 100%;
      .image {
        cursor: pointer;
        object-fit: contain;
        height: 456px;
        width: 100%;
      }
      .news-title {
        text-indent: 2em;
        width: 100%;
        position: absolute;
        text-align: left;
        bottom: 5px;
        left: 0;
        z-index: 10;
        height: 49px;
        line-height: 49px;
        color: #ffffff;
        background-color: rgba(0, 0, 0, 0.5);
        p {
          margin: 0;
          width: 500px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .swiper-pagination {
        width: 20%;
        bottom: 20px;
        left: 80% !important;
        z-index: 20;
      }
      ::v-deep .swiper-pagination-bullet {
        background: #ffffff !important;
        opacity: 1 !important;
      }
      ::v-deep .swiper-pagination-bullet-active {
        background: #1e86f9 !important;
      }

      .news-wrap {
        position: relative;
        //width: 667px;
        width: 100%;
        //height: 586px;
      }
    }

    .wrap-r {
      margin-left: 40px;
      .r-ftitle {
        font-size: 26px;
        font-weight: 400;
        color: #333333;
        margin: 0;
        margin-bottom: 20px;
      }
      .interlist {
        .inter-box {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .circle {
            width: 15px;
            height: 15px;
            background: #333333;
            border-radius: 50%;
            margin-bottom: 30px;
          }

          .desc {
            margin-top: 0;
            font-size: 18px;
            font-weight: 400;
            color: #333333;
            width: 565px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-bottom: 28px;
            &:hover {
              color: #1e86f9;
            }
          }
        }
      }
    }
  }

  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-1675px, 0, 0);
      transform: translate3d(-1675px, 0, 0);
    }
  }

  .six-layout {
    height: 230px;
    position: relative;
    -webkit-animation: 30s rowup linear infinite normal;
    animation: 30s rowup linear infinite normal;
    .img-wrap {
      position: absolute;
      height: 100%;
      top: 55px;
      transition: all 0.3s;
      transform: scale(0.9);
      .city {
        position: absolute;
        bottom: 45px;
        left: 50%;
        margin-left: -30px;
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
      }
      &:hover {
        transform: scale(1);
      }
    }
    img {
      width: 432px;
      height: 172px;
    }
  }
}

::v-deep .el-dialog__header {
  padding: 0;
}

::v-deep .el-dialog__body {
  background-image: url($backgroundImgURL + "/meet4.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.tip-desc {
  font-size: 16px;
  line-height: 1.5;
  color: #ffffff;
}
::v-deep .el-dialog__body {
  padding: 20px 15px;
}

::v-deep .el-dialog__headerbtn .el-dialog__close {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}

::v-deep .el-dialog__headerbtn {
  font-size: 16px;
}

.resolve-btn {
  //width: 207px;
  //height: 56px;
  border: 2px solid #516fd2;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #516fd2;
}

.isPerCont {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
