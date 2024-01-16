<template>
    <el-main v-loading="loading">
        <div class="service-banner">
            <div class="banner-title">集成服务</div>
            <div class="banner-subtitle">集聚目标产业内“政产学研金服用“全创新要素</div>
        </div>
        <div class="service-box">
            <div>
                <img src="~img/services/zheng.png" />
            </div>
            <div class="box-text">
                <div class="title" id="zheng">政</div>
                <div class="desc">集成当地政策支持：市级政策及资金向怀柔科学城倾斜、最低人才引进京户指标门槛、税收奖励、怀柔区产业用房和人才公寓租金补贴、科技成果转化示范区建设专项支持政策等。</div>
            </div>
        </div>
        <div class="service-box chanBg">
            <div class="box-text-left">
                <div class="title" id="chan">产</div>
                <div class="desc">汇聚企业技术、融资、市场需求，开展产研技术对接、产业链合作对接，为低碳技术等高科技产业发展和行业领军企业寻找最适用、最匹配的技术、装备和服务等解决方案。</div>
            </div>
            <div>
                <img src="~img/services/chan.png" />
            </div>
        </div>
        <div class="service-box xueBg">
            <div>
                <img src="~img/services/xue.png" />
            </div>
            <div class="box-text">
                <div class="title" id="xue">学</div>
                <div class="desc">怀柔科学城参访与培训服务：联合开展怀柔科学城及重大科技基础设施参观考察，开展可产业化的前沿技术培训课程，促进科技创新与产业创新的充分对接，以及科技成果转化和企业集聚。</div>
            </div>
        </div>
        <div class="service-box yanBg">
            <div class="box-text-left">
                <div class="title" id="yan">研</div>
                <div class="desc">依托怀柔科学城及平台链接的在能源/材料/装备/环保/认证等低碳技术领域与生命健康/仪器传感/空天等领域世界级科研装备、技术资源与研发能力，提供技术转移、授权使用、技术开发等产研技术对接服务。</div>
            </div>
            <div>
                <img src="~img/services/yan1.png" />
            </div>
        </div>
        <div class="service-box jinBg">
            <div>
                <img src="~img/services/jin.png" />
            </div>
            <div class="box-text">
                <div class="title" id="jin">金</div>
                <div class="desc">链接市区两级基金及中关村发展集团专业科技金融服务，为科技成果转化和高科技企业发展提供股权投资、知识产权金融、贷款增信、设备融资、贸易融资到股债联动、投行服务等全方位科创金融综合服务，共同孵化具有未来产业特征的高成长性科技型企业。</div>
            </div>
        </div>
        <div class="service-box fuBg">
            <div class="box-text-left">
                <div class="title" id="fu">服</div>
                <div class="desc">链接知识产权、技术转移转化等专业服务机构，贯通科技成果评估、技术研发、概念验证、孵化转化等关键服务链条，提供集科技资源共享、科技成果转化对接、科技成果概念验证、高价值专利培育运营、科技创新综合服务“五位一体”的专业服务体系。</div>
            </div>
            <div>
                <img src="~img/services/fu1.png" />
            </div>
        </div>
        <div class="service-box yongBg">
            <div>
                <img src="~img/services/yong.png" />
            </div>
            <div class="box-text">
                <div class="title" id="yong">用</div>
                <div class="desc">梳理分析产业链上下游及应用场景机会，以问题和市场需求为导向，为技成果转化项目和产品提供一对一的市场推广和拓展应用场景服务，推进技术资源与场景和需求的深度匹配，帮助寻找市场合作机会。</div>
            </div>
        </div>
    </el-main>
</template>
<script>
import common from "@/mixin/common";
export default {
    name: "introduce",
    mixins: [common],
    data() {
        return {
            activeNames: "",
            loading: false,
            active: 0,
        };
    },
    mounted() {
        this.active = this.$router.queyr?.active || 0;
    },
    methods: {
        changeTab(idx) {
            this.active = idx;

        }
    }
};
</script>
  
<style scoped lang="scss">
@function pxToVW($px) {
    @return ($px/1920) * 100vw;
}

.service-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    background-image: url("~img/services/banner.png");
    background-repeat: no-repeat;
    background-size: 100% 400px;

    .banner-title {
        color: #000000;
        font-size: 55px;
        font-weight: bold;
        margin-left: -700px;
    }

    .banner-subtitle {
        color: #000000;
        font-size: 20px;
        margin-top: 40px;
        margin-left: -500px;
        opacity: 0.67;
    }
}

.service-box {
    height: 360px;
    background-color: #FFF;
    // background-image: url("~img/services/zheng1.png");
    background-repeat: no-repeat;
    background-size: 55%;
    background-position: right top;
    display: flex;
    flex-direction: row;
    justify-content: center;

    img {
        height: 300px;
        width: 377px;
    }
}

.box-text {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    .title {
        font-size: 60px;
        margin-top: 20px;
        font-weight: bold;
        background: linear-gradient(175deg, #010F93 0%, #1660D1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

       
    }
    .desc {
        width: 530px;
           padding-top: 10px;
            font-size: 16px;
            color: #19191C;
            line-height: 30px;
        }
}
.box-text-left
{
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    align-items: start;
    .title {
        font-size: 60px;
        margin-top: 20px;
        font-weight: bold;
        background: linear-gradient(175deg, #010F93 0%, #1660D1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

       
    }
    .desc {
        width: 530px;
           padding-top: 10px;
            font-size: 16px;
            color: #19191C;
            line-height: 30px;
            font-weight: 400;
        }
}

// .chanBg{
//     background-image: url("~img/services/project.png");
//     background-color: #F7F8FA;
//     background-position: left top;
// }
// .xueBg{
//     background-image: url("~img/services/xue1.png");
// }
// .yanBg{
//     background-image: url("~img/services/yan.png");
//     background-color: #F7F8FA;
//     background-position: left top;
// }
// .jinBg{
//     background-image: url("~img/services/jin1.png");
// }
// .fuBg{
//     background-image: url("~img/services/fu.png");
//     background-color: #F7F8FA;
//     background-position: left top; 
// }
// .yongBg{
//     background-image: url("~img/services/yong1.png");
// }
</style>
