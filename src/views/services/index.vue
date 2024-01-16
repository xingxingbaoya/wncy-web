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
                <div class="desc">政策支持的注册或实体落地园区，园区简介政策干货。政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区，园区简介政策干货政策支持的注册或实体落地园区。</div>
            </div>
        </div>
        <div class="service-box chanBg">
            <div class="box-text-left">
                <div class="title" id="chan">产</div>
                <div class="desc">产研技术对接、产业链合作对接：可联系的企业列表-群内企业名称。产研技术对接、产业链合作对接：<br/>
可联系的企业列表-群内企业名称产研技术对接、产业链合作对接：<br/>
可联系的企业列表-群内企业名称产研技术对接、产业链合作对接：<br/>
可联系的企业列表-群内企业名称</div>
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
                <div class="desc">怀柔科学城参访与培训服务（资源列表）怀柔科学城参访与培训服务（资源列表）怀柔科学城参访与培训服务（资源列表）</div>
            </div>
        </div>
        <div class="service-box yanBg">
            <div class="box-text-left">
                <div class="title" id="yan">研</div>
                <div class="desc">怀柔科学城及平台链接资源的技术转移、授权使用、技术开发等产研技术对接服务；列名称、可对接的人（平台用户联系方式）怀柔科学城及平台链接资源的技术转移、授权使用、技术开发等产研技术对接服务；列名称、可对接的人（平台用户联系方式）</div>
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
                <div class="desc">投资、债权等服务：市区两级基金、中关村担保、中关村租赁等。投资、债权等服务：市区两级基金、中关村担保、中关村租赁等。投资、债权等服务：市区两级基金、中关村担保、中关村租赁等投资、债权等服务：市区两级基金、中关村担保、中关村租赁等</div>
            </div>
        </div>
        <div class="service-box fuBg">
            <div class="box-text-left">
                <div class="title" id="fu">服</div>
                <div class="desc">知识产权、股权设计等。知识产权、股权设计等。知识产权、股权设计等知识产权、股权设计等。知识产权、股权设计等。知识产权、股权设计等</div>
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
                <div class="desc">用户市场对接。用户市场对接。用户市场对接。用户市场对接。用户市场对接。用户市场对接。用户市场对接用户市场对接用户市场对接用户市场对接用户市场对接用户市场对接用户市场对接。用户市场对接用户市场对接</div>
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
