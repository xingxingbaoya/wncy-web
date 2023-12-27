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
                        <div class="left-classify-item">
                            <div class="left-classify-item-title"> 技术类型： </div>
                            <div v-for="tech in techTypeDict" :key="tech">
                                <div class="left-classify-item-option"
                                :class="searchData.proPatentInfo == tech.id? 'active':''"
                                @click="searchData.proPatentInfo = tech.id"
                                >{{ tech.title }}</div>
                            </div>
                        </div>
                        <div class="left-classify-item">
                            <div class="left-classify-item-title"> 技术来源： </div>
                            <div v-for="tech in techSourceDict" :key="tech">
                                <div class="left-classify-item-option"
                                :class="searchData.proNature == tech.id? 'active':''"
                                @click="searchData.proNature = tech.id"
                                >{{ tech.title }}</div>
                            </div>
                        </div>
                        <div class="left-classify-item">
                            <div class="left-classify-item-title">来 源 地： </div>
                            <div class="left-classify-item-city">
                                <div v-for="(city,index) in cityList" :key="city">
                                    <div class="left-classify-item-option"
                                    :style="collapsed && index+1> firstLineProvince ? 'display:none': 'display:block'"
                                    id="cityOption"
                                    :class="searchData.province == city.code? 'active':''"
                                    @click="searchData.province = city.code"
                                    >{{ city.name }}</div>
                                </div>
                            </div>
                            <div @click="collapsed = !collapsed" class="left-classify-item-more">
                                <template v-if="collapsed">
                                    {{ '更多' }} <i class="el-icon-arrow-up"></i>
                                </template>
                                <template v-else>
                                    {{ '收起' }} <i class="el-icon-arrow-down"></i>
                                </template>                               
                            </div>
                        </div>
                        <div class="left-classify-item">
                            <div class="left-classify-item-title"> 其他要求： </div>
                            <span>是否挂牌：</span>
                            <el-select v-model="searchData.isListing" class="other">
                                <el-option value="" label="不限" key="all"></el-option>
                                <el-option value="0" label="是" key="0"></el-option>
                                <el-option value="1" label="否" key="1"></el-option>
                            </el-select>

                            <span>项目地区：</span>
                            <el-select v-model="searchData.isNotNational" class="other">
                                <el-option value="" label="不限" key="all"></el-option>
                                <el-option value="0" label="国内项目" key="0"></el-option>
                                <el-option value="1" label="国外项目" key="1"></el-option>
                            </el-select>
                        </div>
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
                                    <img src="~img/projectManage/address.png"/> <span class="attach-address">{{ item.address }}</span>
                                    <img src="~img/projectManage/time.png"/> {{ item.time }}
                                </div>
                            </div>
                            <div class="right-content">
                                <span>{{ item.count }}</span>
                            </div>

                        </div>
                    </div>

                    <div class="pagination-box">
                        <div class="pagination-box-currentpage" key="1">{{ pageConfig.currentPage}} / {{ pageConfig.total }}</div>
                        <el-pagination
                            :current-page="pageConfig.currentPage"
                            :page-size="pageConfig.pageSize"
                            @current-change="handleCurrentChange"
                            background
                            layout="prev, pager, next"
                            :total="pageConfig.total">
                        </el-pagination>
                        <el-input v-model="pageValue" style="width: 3vw;margin: 0 12px 0 40px;color: #1919c1;" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        <div class="pagination-box-currentpage" style="cursor: pointer;" @click="handleCurrentChange(pageValue)">跳转</div>

                    </div>
                </div>
                
                <div class="right">
                    <div class="right-fab">
                        <img src="~img/projectManage/projmanage-fab.png"/>
                        <div class="right-fab-content">
                            <el-select>
                                <span slot="prefix">我需要</span>
                            </el-select>
                            <el-button type="primary" style="width: 100%;">立即发布</el-button>
                        </div>
                    </div>
                    <div class="right-select">
                        <img src="~img/projectManage/selectwn.png"/>
                        <div class="right-select-content">
                            <div v-for="item in extractInfo" class="right-select-content-item">
                                <img :src="item.icons"/>
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
import mainfen from "@/assets/img/projectManage/mianfei.png"
import lindai from "@/assets/img/projectManage/lindai.png"
import qianyuan from "@/assets/img/projectManage/qian-yuan-L.png"
import city from '@/assets/city/city_code.json'

export default {
    data() {
        return {
            techTypeDict: [
            {id:0, title:'不限'},
            {id:1,title:'技术项目'},
            {id:2,title:'专利项目'}
            ],

            techSourceDict: [
            {id:0, title:'不限'},
            {id:1,title:'企业'}, 
            {id:2,title:'院校'}, 
            {id:3, title: '研究机构（实验室/研究院）'},
            {id:4, title: '协会团体'},
            {id:5, title: '个人'}
            ],
            projectList: [
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},
                {id: 0, title: '【商业贸易】跨境平台综合服务开发', address: '广西壮族自治区 南宁市 江南区', time: '2023.12.07', count: '100万元以上'},                
            ],
            pageConfig: {
                currentPage: 1,
                pageSize: 20,
                total: 100,
            },
            pageValue: 1,
            extractInfo: [
                {title: '专业服务', detail: '用户实名认证，雇主放心交易', icons: lindai},
                {title: '专业服务', detail: '资金托管，全程跟踪有保障', icons: qianyuan},
                {title: '免费发布', detail: '所有类型项目，免费发布', icons: mainfen},
            ],
            searchData: {
                title: '',
                industryone: '',
                province: 0,
                proPatentInfo: 0,
                proNature: 0,
                isNotNational: '',
                isListing: ''
            },
            firstLineProvince: 34,
            collapsed: true,
            
        }
    },
    computed: {
        cityList () {
            return [{"name": "全部", code: 0}, ...city]
        }
    },
    methods: {
        handleCurrentChange(page) {
            this.pageConfig.currentPage = page
            this.pageValue = page
        },
        getProjDetail(proj) {
            this.$router.push('/projectmanage/detail')
        }
    },
    mounted() {
        setTimeout(() => {
            const cityoption = document.querySelectorAll('#cityOption')
            const list = Array.from(cityoption).map(item => item.offsetTop)
            this.firstLineProvince = list.lastIndexOf(list[0])
            console.log(list, this.firstLineProvince)
        }, 500)
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
        :deep(.el-input__suffix) {
            top: 4px;
        }
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
                        &-item {
                            display: flex;
                            align-items: center;
                            margin-bottom: 30px;
                            color: #3C3C41;
                            font-weight: 400;
                           &-title {
                                min-width: 80px;
                                padding-top: 8px;
                                align-self: start;
                            }
                            &-option {
                                padding:8px 13px;
                                margin: 0 10px;
                                cursor:pointer;
                                border: 1px solid rgba(0,0,0,0);

                                &.active {
                                    background: #FFE5E5;
                                    border: 1px solid #EE6868;
                                    border-radius: 6px;
                                    color:#EC4646;
                                }

                            }
                            &-city {
                                display: flex;
                                flex-wrap: wrap;
                            }
                            .other {
                                span{
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
                                color: #0E1E9C;
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
                            border-bottom: 2px solid #EDEDED;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
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
                    .pagination-box {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 50px 27px 64px 0;
                        &-currentpage {
                            background-color: #fff;
                            padding: 10px 23px;
                            font-weight: 400;
                            color: #19191C;
                            border: 1px solid #CCCCCC;
                            border-radius: 6px;
                        }
                        :deep(.el-input__inner) {
                            text-align: center;
                            color:#19191C;
                            font-size: 16px;
                            font-weight: 400;
                        }
                    }
                }
                .right {
                    flex:1;
                    &-fab{
                        background: #FFFFFF;
                        border-radius: 16px;
                        &-content {
                            padding: 26px pxToVW(28) 40px;
                            :deep(.el-input__prefix) {
                                line-height: 40px;
                            }
                            :deep(.el-input--prefix .el-input__inner) {
                                text-align: center;
                                color: #19191C;
                            }
                            .el-button {
                                margin-top: 20px;
                                background-color: #2434AF;
                                font-size: 18px;
                            }
                        }
                    }
                    &-select {
                        background: #FFFFFF;
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
                                    color: #19191C;
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