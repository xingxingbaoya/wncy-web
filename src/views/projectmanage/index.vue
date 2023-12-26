<template>
  <div class="project-manage">
    <div class="project-manage-main">
        <div class="project-manage-main-theme">集结行业最优科技成果转化项目</div>
        <div class="project-manage-main-attach">技术持有者可自有发布行业顶尖成果</div>
        <el-input placeholder="输入项目关键词进行搜索" class="project-manage-main-search">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <i slot="suffix">
                <img src="~img/projectManage/search.png"/>
            </i>
        </el-input>
        <div class="project-manage-main-group">
            <img src="~img/projectManage/project-search.png"/>
            <p>当前位置：首页 > 所有项目</p>
            <div class="project-manage-main-group-wrap">
                <div class="left">
                    <div class="left-classify">

                    </div>
                    <div class="left-project">
                        <div v-for="item in projectList" class="left-project-item" :key="item.id + project">
                            <div class="left-content">
                                <div class="title">{{ item.title }}</div>
                                <div class="attach">
                                    <img src="~img/projectManage/address.png"/> <span class="attach-address">{{ item.address }}</span>
                                    <img src="~img/projectManage/time.png"/> {{ item.time }}
                                </div>
                            </div>
                            <div class="right-content">
                                <span>{{ item.count }}</span>
                            </div>

                        </div>
                    </div>
                </div>
                
                <div class="right"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            classifyList: [
                {type: '技术类型：', typeContent: [{id:0, title:'不限'},{id:1,title:'技术项目'},{id:2,title:'专利项目'}]},
                {type: '技术来源：', typeContent: [{id:0, title:'不限'},{id:1,title:'企业'},{id:2,title:'院校'},{id:3, title: '研究机构（实验室/研究院）'},
                    {id:4, title: '协会团体'}, {id:5, title: '个人'}]},
                {type: '来 源 地：', typeContent: [{id:0, title:'不限'},{id:1,title:''},{id:2,title:''}]},
                {type: '其它要求：', typeContent: [{id:0, title:'不限'},{id:1,title:''},{id:2,title:''}]},

            ],
            projectList: [
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},                
            ]
        }
    }
}
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
        width:100%;
        background-image: url("~img/projectManage/banner.png");
        background-size: 100%;
        background-repeat: no-repeat;
        &-theme {
            background: linear-gradient(0deg, #008AFF 0.1220703125%, #001196 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 72px;
            color: #19191C;
            font-weight: bold;
            margin-top: 240px;
        }
        &-attach {
            font-size: 37px;
            font-weight: 400;
            color: #001B9E;
            margin-top: 25px;
            background: linear-gradient(0deg, #008AFF 0.1220703125%, #001196 100%);
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
                    }
                    &-project {
                        margin-top: 20px;
                        width: 100%;
                        padding: 36px 28px;
                        background-color: #fff;
                        &-item {
                            padding: 30px 0;
                            border-bottom: 2px solid #EDEDED;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .title {
                                font-size: 18px;
                                font-weight: 400;
                                color: #19191C;
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
                                color: #EC4646;
                                font-size: 20px;
                            }
                        }

                    }
                }
                .right {
                    flex:1;
                    height: 345px;
                    background: #FFFFFF;
                    border-radius: 16px;
                }

            }

        }
        
    }

}
</style>