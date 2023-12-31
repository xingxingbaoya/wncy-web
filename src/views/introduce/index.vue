<template>
  <el-main v-loading="loading">
    <div class="banner-main">
      <img src="~img/introduce/banner.png" />
    </div>
    <div class="main-content">
      <div class="main-nav">
        <div class="nav-left">
          <div :class="active == index ? 'nav-left-item active' : 'nav-left-item'" v-for="(item, index) in navList"
            :key="index" @click="changeTab(index)">
            <span>{{ item.title || "--" }}</span>
          </div>
        </div>
        <div class="nav-content">
          <div class="nav-content-top" v-if="active == 0">
            <div class="nav-content-item">
              <div class="item-img-box">
                <img src="~/img/introduce/pic1.png" />
              </div>
              <div class="item-text"> 
                <span>怀柔国家能源实验室（起步区） </span>
              </div>
            </div>
            <div class="nav-content-item">
              <div class="item-img-box">
                <img src="~/img/introduce/pic2.png" />
              </div>
              <div class="item-text">
                <span>怀柔国家能源实验室（起步区） </span>
              </div>
            </div>
          </div>
          <div class="nav-content-float" v-if="active < 3">
            <div
              :class="itemIndex == index + 1 ? 'nav-content-item line-color item-active' : 'nav-content-item line-color'"
              v-for="(item, index) in navList[active].itemList" :key="index" @click="changeItem(index)">
              <div class="item-content" v-if="itemIndex != index + 1">
                <div class="item-bg-title">{{ item.typename || "--" }}</div>
                <div class="item-title">{{ item.title }}</div>
                <div class="item-subtitle">{{ item.desc }}</div>
              </div>
              <div class="item-content-hover" v-if="itemIndex == index + 1">
                <div class="item-bg-title">{{ item.typename || "--" }}</div>
                <div class="item-hover-time">{{ item.yuntime || "--" }}</div>
                <div class="item-hover-title">{{ item.title || "--" }}</div>
                <div class="item-subtitle">大科学装置：{{ item.daxue || "--" }} </div>
                <div class="item-subtitle">交叉研究平台：{{ item.pingtai || "--" }} </div>
                <div class="item-subtitle">科教基础设施：{{ item.kejiao || "--" }}</div>
              </div>
            </div>
          </div>
          <div class="nav-content-full" v-if="active > 2">
            <div
              :class="itemIndex != index + 1 ? 'nav-content-item nav-content-item-full line-color' : 'nav-content-item nav-content-item-full line-color item-active'"
              v-for="(item, index) in navList[active].itemList" :key="index" @click="changeItem(index)">
              <div class="item-content" v-if="itemIndex != index + 1">
                <div class="item-bg-title">{{ item.typename || "--" }}</div>
                <div class="item-title">{{ item.title }}</div>
                <div class="item-subtitle">{{ item.desc }} </div>
              </div>
              <div class="item-content-hover" v-if="itemIndex == index + 1">
                <div class="item-bg-title">{{ item.typename || "--" }}</div>
                <div class="item-hover-title">{{ item.title }}</div>
                <div class="item-hover-subtitle">{{ item.desc }} </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </el-main>
</template>
  
<script>
import common from "@/mixin/common";
import { mapGetters } from "vuex";

export default {
  name: "introduce",
  mixins: [common],
  data() {
    return {
      activeNames: "",
      loading: false,
      active: 0,
      itemIndex: 0,
      navList: [
        {
          title: "区位：怀柔南",
          itemList: [
            {
              typename: "4家科研央企",
              title: "中国机械研究总院",
              desc: "北京机科国创轻量化科学研究院有限公司等",
            },
            {
              typename: "4家科研央企",
              title: "中国有研科技集团",
              desc: "有研工研院、有研资环院、国联动力电池院等",
            },
            {
              typename: "4家科研央企",
              title: "中国航天科技集团",
              desc: "北京航天光华电子技术有限公司怀柔电装中心",
            },
            {
              typename: "4家科研央企",
              title: "中国航空工业集团 ",
              desc: "中国航空综合技术研究所",
            },
            {
              typename: "怀柔南",
              title: "中国科学院北京纳米能源与系统研究所",
              desc: "新能源、自供电仪器、传感器",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "2020年9月",
            },
            {
              typename: "怀柔南",
              title: "中国科学院工程热物理研究所",
              desc: "能源",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "2023年立项",
            },
            {
              typename: "怀柔南",
              title: "中国科学院力学研究所",
              desc: "航天与航空、高端装备",
              daxue: "",
              pingtai: "先进载运和测量技术综合实验平台",
              kejiao: "",
              yuntime: "2009年",
            },
            {
              typename: "怀柔南",
              title: "中国科学院国家空间科学中心",
              desc: "空间探索、太空安全、航天与航空",
              daxue: "空间环境地基综合监测网（子午工程二期",
              pingtai: "空间科学卫星系列及有效载荷研制测试保障平台、国际子午圈大科学计划总部",
              kejiao: "",
              yuntime: "2014年6月",
            },
            {
              typename: "怀柔南",
              title: "中国科学院空间应用工程与技术中心",
              desc: "航天与航空服务、空间探索",
              daxue: "",
              pingtai: "",
              kejiao: "太空实验室地面实验基地",
              yuntime: "2023年6月",
            },
            {
              typename: "怀柔南",
              title: "中国科学院国家天文台",
              desc: "航天与航空、空间探索",
              daxue: "",
              pingtai: "",
              kejiao: "空间天文与应用研发实验平台",
              yuntime: "2022年12月",
            },
            {
              typename: "怀柔南",
              title: "中国科学院计算机网络信息中心",
              desc: "信息与网络",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "2011年11月",
            },
            {
              typename: "怀柔南",
              title: "战支部队航天工程大学",
              desc: "航天与航空",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "1978年",
            },
            {
              typename: "怀柔南",
              title: "北京电影学院",
              desc: "文艺",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "2020年",
            }
          ]
        },
        {
          title: "区位：怀柔北",
          itemList: [
            {
              typename: "怀柔北",
              title: "中国科学院物理研究所",
              desc: "能源、节能环保、新材料",
              daxue: "综合极端条件实验装置",
              pingtai: "材料基因组研究平台、清洁能源材料测试诊断与研发平台",
              kejiao: "",
              yuntime: "2020年10月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院高能物理研究所",
              desc: "生命健康、新材料、高端装备",
              daxue: "高能同步辐射光源",
              pingtai: "高能同步辐射光源配套综合实验楼和用户服务楼、先进光源技术研发与测试平台",
              kejiao: "",
              yuntime: "2025年",
            },
            {
              typename: "怀柔北",
              title: "中国科学院化学研究所",
              desc: "新材料、仪器和传感",
              daxue: "",
              pingtai: "北京分子科学交叉研究平台",
              kejiao: "分子材料与器件研究测试平台",
              yuntime: "2023年10月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院生物物理研究所",
              desc: "生命健康",
              daxue: "多模态跨尺度生物医学成像设施（与北京大学共建)",
              pingtai: "脑认知机理与脑机融合交叉研究平台",
              kejiao: "同20",
              yuntime: "2022年10月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院动物研究所",
              desc: "生命健康",
              daxue: "人类器官生理病理模拟装置",
              pingtai: "干细胞战略资源和转化平台",
              kejiao: "创新细胞技术研发平台",
              yuntime: "2023年开工",
            },
            {
              typename: "怀柔北",
              title: "中国科学院自动化研究所",
              desc: "人工智能",
              daxue: "",
              pingtai: "",
              kejiao: "脑认知功能图谱与类脑智能交叉研究平台（与生物物理研究所共建）",
              yuntime: "2023年12月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院过程工程研究所",
              desc: "工程与工艺",
              daxue: "",
              pingtai: "介科学与过程仿真交叉研究平台",
              kejiao: "物质转化过程虚拟研究开发平台",
              yuntime: "2023年12月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院空天信息创新研究院",
              desc: "高端装备、高端仪器",
              daxue: "",
              pingtai: "",
              kejiao: "大科学装置用高功率高可靠速调管研制平台、太赫兹科学技术中心平台",
              yuntime: "2023年3月",
            },
            {
              typename: "怀柔北",
              title: "中国科学院科技创新发展中心",
              desc: "综合性",
              daxue: "",
              pingtai: "",
              kejiao: "怀柔综合性国家科学中心支撑保障条件平台",
              yuntime: "2023年6月",
            },
            {
              typename: "怀柔北",
              title: "北京干细胞与再生医学研究院（中国科学院动物研究所）",
              desc: "生命健康",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "",
            },
            {
              typename: "怀柔北",
              title: "北京雁栖湖应用数学研究院",
              desc: "综合性",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "",
            },
            {
              typename: "怀柔北",
              title: "中国科学院大学",
              desc: "综合性",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "2015年",
            },
            {
              typename: "怀柔北",
              title: "北京大学科研平台",
              desc: "新材料、生命健康、高端仪器",
              daxue: "同13",
              pingtai: "轻元素量子材料交叉平台、北京激光加速创新中心、分子影像与医学诊疗探针创新平台",
              kejiao: "",
              yuntime: "2022年10月",
            },
          ]
        },
        {
          title: "区位：密云区",
          itemList: [
            {
              typename: "密云区",
              title: "北京大学医学部及怀密医学中心",
              desc: "生命健康",
              daxue: "",
              pingtai: "",
              kejiao: "",
              yuntime: "",
            },
            {
              typename: "密云区",
              title: "清华大学科研平台",
              desc: "环境生态",
              daxue: "",
              pingtai: "空地一体环境感知与智能响应研究平台",
              kejiao: "",
              yuntime: "",
            },
            {
              typename: "密云区",
              title: "中国科学院地质与地球物理研究所",
              desc: "能源与资源、矿产开发",
              daxue: "",
              pingtai: "",
              kejiao: "深部资源探测技术装备研发平台",
              yuntime: "2023年6月",
            },
            {
              typename: "密云区",
              title: "中国科学院青藏高原研究所",
              desc: "环境生态",
              daxue: "",
              pingtai: "",
              kejiao: "泛第三级环境综合探测平台",
              yuntime: "2023年6月试运行",
            },
            {
              typename: "密云区",
              title: "中国科学院大气物理研究所",
              desc: "环境生态",
              daxue: "地球系统数值模拟装置",
              pingtai: "",
              kejiao: "京津冀大气环境与物理化学前沿交叉研究平台",
              yuntime: "2023年6月",
            },
            {
              typename: "密云区",
              title: "中国科学院生态环境研究中心",
              desc: "环境生态",
              daxue: "",
              pingtai: "",
              kejiao: "环境污染物识别与控制协同创新平台",
              yuntime: "2023年6月",
            },
          ]
        },
        {
          title: "平台链接的中科院其他所",
          itemList: [
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院声学研究所",
              desc: "中国科学院声学研究所研究的方向和领域包括水声物理与水声探测技术、环境声学与噪声控制技术、超声学与声学微机电技术、通信声学和语言语音信息处理技术、声学与数字系统集成技术、高性能网络与网络新媒体技术等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院理化技术研究所",
              desc: "中国科学院理化技术研究所研究的方向和领域包括光化学转换与功能材料、低温科学与工程、功能晶体与激光技术、仿生智能界面材料、特种功能材料与生物医用技术等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院国家纳米科学中心",
              desc: "国家纳米科学中心研究的方向和领域包括自组装功能纳米材料、手性无机纳米材料、功能纳米材料应用等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院微生物研究所",
              desc: "中国科学院微生物研究所研究的方向和领域包括微生物资源、微生物生物技术、病原微生物与免疫等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院计算技术研究所",
              desc: "中国科学院计算技术研究所研究的方向和领域包括计算机系统结构、网络与普适计算、智能软件等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院半导体研究所",
              desc: "中国科学院半导体研究所研究的方向和领域包括半导体物理、材料、器件、工艺、电路及其集成应用研究等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院微电子研究所",
              desc: "中国科学院微电子研究所研究的方向和领域包括半导体器件与集成电路制造、集成电路设计与应用、集成电路装备等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院电工研究所",
              desc: "中国科学院电工研究所研究的方向和领域包括可再生能源发电、电力设备新技术、电网技术、电力电子与电能变换、超导与新材料应用、生物电磁学与电磁探测等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院光电研究院",
              desc: "中国科学院光电研究院研究的方向和领域包括计算光学成像技术、投影光学系统技术、大型复杂激光器技术、激光测量技术、空间系统工程、卫星导航、浮空器等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院植物研究所",
              desc: "中国科学院植物研究所研究的方向和领域包括植物对环境适应的生物学基础等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院心理研究所",
              desc: "中国科学院心理研究所研究的方向和领域包括教育心理、劳动心理、航空心理、医学心理等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院遗传与发育生物学研究所",
              desc: "中国科学院遗传与发育生物学研究所研究的方向和领域包括遗传与发育生物学、农业资源高效利用等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院软件研究所",
              desc: "中国科学院软件研究所研究的方向和领域包括计算机科学、计算机软件、计算机应用技术、信息安全等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院信息工程研究所",
              desc: "中国科学院信息工程研究所研究的方向和领域包括密码理论与安全协议、信息智能处理、数据安全、通信与电磁安全、网络与系统技术、信息系统测评等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院数学与系统科学研究院",
              desc: "中国科学院数学与系统科学研究院研究的方向和领域包括控制理论、运筹管理、统计学、系统工程等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院理论物理研究所",
              desc: "中国科学院理论物理研究所 研究的方向和领域包括粒子物理、粒子天体物理及核物理、场论、引力理论与宇宙学、统计物理与理论生物物理、凝聚态物理与量子物理等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院地理科学与资源研究所",
              desc: "中国科学院地理科学与资源研究所研究的方向和领域包括陆地表层过程、区域可持续发展、资源环境安全、生态系统及地理信息系统核心科学与技术研究等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院古脊椎动物与古人类研究所",
              desc: "中国科学院古脊椎动物与古人类研究所研究的方向和领域包括古脊椎动物、古人类等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院北京基因组研究所(国家生物信息中心)",
              desc: "中国科学院北京基因组研究所(国家生物信息中心)研究的方向和领域包括基因组学、生物信息学、生物化学与分子生物学、精准医学等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院自然科学史研究所",
              desc: "中国科学院自然科学史研究所研究的方向和领域包括传统学科史、古代科技与社会、传统科技文献、科技考古、文化遗产保护等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院科技战略咨询研究院",
              desc: "中国科学院科技战略咨询研究院研究的方向和领域包括科技发展战略研究、创新发展政策研究、可持续发展战略研究、系统分析与管理研究、科技战略情报研究等。"
            },
            {
              typename: "平台链接的中科院其他所",
              title: "中国科学院数据与通信保护研究教育中心",
              desc: "中国科学院数据与通信保护研究教育中心研究的方向和领域包括信息安全理论和技术等。"
            }
          ]
        },
        {
          title: "平台连接的部分高校和其 他科研机构",
          itemList: [
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京航空航天大学",
              desc: "北京航空航天大学拥有国家战略科技力量：软件开发环境国家重点实验室、虚拟现实技术与系统国家重点实验室等。"
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京理工大学",
              desc: "北京理工大学拥有国家战略科技力量：爆炸科学与技术国家重点实验室、复杂系统智能控制与决策国家重点实验室等。"
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京科技大学",
              desc: "北京科技大学拥有战略科技力量：新金属材料国家重点实验室等。"
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京化工大学",
              desc: "北京化工大学拥有战略科技力量：有机无机复合材料国家重点实验室等。"
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "中国地质大学",
              desc: ""
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京工业大学",
              desc: "北京工业大学拥有战略科技力量：桥梁工程安全与韧性全国重点实验室等。"
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "北京石墨烯产业研究院",
              desc: ""
            },
            {
              typename: "平台连接的部分高校和其 他科研机构",
              title: "中国科学院山西煤炭化学研究所",
              desc: "中国科学院山西煤炭化学研究所研究的方向和领域包括能源环境、先进材料、绿色化工等。"
            },
          ]
        },
      ],
    };
  },
  mounted() {
    this.active = this.$router.queyr?.active || 0;
  },
  methods: {
    changeTab(idx) {
      this.active = idx;
      this.itemIndex = 0;

    },
    changeItem(index) {
      this.itemIndex = index + 1;
    }
  }
};
</script>
  
<style scoped lang="scss">
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}

.banner-main {
  position: relative;

  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.main-content {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: center;
  align-items: start;
}

.main-nav {
  display: flex;
  // align-items: center;
}

.nav-left {
  width: 344px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  font-size: 22px;
  margin-bottom: 40px;

  .nav-left-item {
    height: 125px;
    background-color: #FFF;
    display: flex;
    align-items: center;
    padding: 0px 46px;
    color: #19191C;

  }

  .active {
    background-color: #2434AF;
    color: #FFF;
  }
}

.nav-content {
  width: 900px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: start;
  padding-bottom: 50px;

  .nav-content-top {
    display: flex;

    .nav-content-item {
      .item-text:hover {
        color: #FFF;
        background: linear-gradient(166deg, #010F93, #1660D1);
      }

    }
  }

  .nav-content-full {
    display: flex;
    width: 900px;
    flex-direction: column;
  }

}

.nav-content-float {
  column-count: 2;
  column-gap: 10px;

}

.nav-content-item {
  position: relative;
  width: 405px;
  min-height: 100px;
  margin-left: 20px;
  background-color: #FFF;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    height: 295px;
    width: 100%;
  }

  .item-text {
    height: 65px;
    font-size: 18px;
    display: flex;
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
  }

  .item-bg-title {
    position: absolute;
    top: 10px;
    font-size: 24px;
    /* 调整字体大小 */
    -webkit-text-stroke: 1px #B6BBD0; //文字描边
    color: transparent;
    /* 将文本颜色设为透明 */
    opacity: 0.6;
  }


  .item-content {
    padding: 30px;

    .item-title {
      font-size: 18px;
      color: #19191C;
      margin-bottom: 25px;
    }

    .item-subtitle {
      font-size: 14px;
      line-height: 28px;
    }
  }

  .item-content-hover {
    padding: 30px;
    font-size: 14px;

    .item-hover-time {
      text-align: right;
    }

    .item-hover-title {
      font-size: 18px;
      padding: 10px 0px;
    }

    .item-hover-subtitle {
      line-height: 28px;
    }
  }
}

.nav-content-item-full {
  width: 100%;
}

.line-color {
  background: linear-gradient(166deg, #E4E9FD, #FFFFFF);
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 3px 43px 0px rgba(136, 141, 185, 0.35);
}

.item-active {
  color: #FFF;
  background: linear-gradient(166deg, #010F93, #1660D1);
}
</style>
  