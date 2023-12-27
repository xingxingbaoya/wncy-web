 <template>
  <div class="project-detail">
    <img src="~img/projectManage/project-search.png"/>
    <p>当前位置：首页 > 所有项目</p>
    <div class="project-detail-wrap">
        <div class="project-detail-wrap-left">
            <div class="project-wrap project-main">
                <div class="project-main-img">
                    <img src="~img/projectManage/projdetail-compay.png"/>
                </div>
                <div class="project-main-title">
                    <div class="title">{{ project.title || '跨境电商综合服务平台开发'}}</div>
                    <div class="attach">
                        <span>行业分类：{{ project.industryone || '无' }}</span>
                        <span style="margin-left: 5vw;">专利情况：{{ project.industryone || '无' }}</span>
                    </div>
                    <div class="time"><img src="~img/projectManage/time.png"/> {{ project.createTime || '2023.12.07 10:00:00' }}</div>
                </div>
                <div class="project-main-count">
                    <div class="first-wrap">项目</div>
                    <div class="second-wrap">{{ project.faceFlag == '1'? '面议': project.proIntentionPrice || 1000+"万元" }}</div>
                </div>
            </div>
            <div class="project-wrap project-info">
                <div class="project-info-theme">单位信息</div>
                <el-row>
                    <el-col :span="6" v-for="item in infoList">
                        <div class="name">{{ item.name }}</div>
                        <div class="values">{{ project[item.word] || item.value }}</div>
                    </el-col>
                </el-row>
                <div class="project-info-theme">项目介绍</div>
                <el-row>
                    <el-col :span="6" v-for="item in introList">
                        <div class="name">{{ item.name }}</div>
                        <template v-if="item.word == 'faceFlag'">
                            <div class="values" style="color:#E61818">{{ project.faceFlag == '1'? '面议': project.proIntentionPrice || 1000+"万元" }}</div>
                        </template>
                        <template v-else-if="item.word== 'isNotNational'">
                            <div class="values">{{ item.isNotNational == '1'? '国内':'国际' }}</div>
                        </template>
                        <template v-else>
                            <div class="values">{{ project[item.word] || item.value }}</div>
                        </template>
                    </el-col>
                </el-row>
                <div class="project-info-theme">项目内容</div>
                <span style="line-height: 36px;margin-bottom: 55px;display: inline-block;">{{ project.proIntroduct || '有老pc端游全套序列帧素材（包含人物 NPC 怪物 装备 地图 UI） 需求是1：1复刻仿制成三端 或者手机端 前端换皮 后端复刻逻辑 需要有在线刷新脚本功能价格可商议 仅支持网站担保交易 全部做完后一次性验收' }}</span>
                <div class="project-info-theme">项目附件</div>
            </div>

        </div>
        <div class="project-detail-wrap-right">
            <el-input placeholder="输入项目关键词进行搜索" class="project-manage-main-search">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                <i slot="suffix">
                    <img src="~img/projectManage/search.png"/>
                </i>
            </el-input>
            <div class="preview">
                <div style="color:#999">浏览人数</div>
                <div style="color: #19191C;font-weight: bold;font-size: 26px;">246</div>
                <div class="publish-btn" @click="doProjPublish">发布类似节目</div>
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/projecthall'
export default {
    data() {
        return {
            project: {},
            infoList: [
            {name: '单位名称', value: '北京中关村科技服务有限公司', word: 'company'},
            {name: '联系人', value: '太傅', word: 'linkman'},
            {name: '联系电话', value: '13800000000', word: 'phone'},
            ],
            introList: [
                {name: '项目名称', value: '跨境电商综合服务平台开发', word: 'title'},
                {name: '行业分类', value: '软件开发', word: 'industryone'},
                {name: '技术来源', value: '企业', word: 'company'},
                {name: '来源地', value: '北京', word: 'province'},
                {name: '技术类型', value: '技术项目', word: 'type'},
                {name: '项目国别', value: '中国', word: 'isNotNational'},
                {name: '意向价格', value: '100万', word: 'faceFlag'},
                {name: '合作方式', value: '招标', word: 'cooperation'},
                {name: '合作方式', value: '无', word: 'proPatentInfo'},
                {name: '专利授权日', value: '2022年10月11日', word: 'proGrantTime'},
                {name: '专利号', value: '234789999000', word: 'proPatentNo'},
                {name: '专利权人', value: '府丞', word: 'patentOwner'},
                {name: '项目开发阶段', value: '无', word: 'proDevelopment'},
            ]
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        doProjPublish() {
            this.$router.push('/projectmanage/publish')
        },
        loadData() {
            const id = this.$route.query.projectId
            getProjectDetail({ id }).then(res => {
                if(res.code=='0000') {
                    this.project=res.obj
                } else {
                    this.$message.error(res.msg)
                }
            }).finally(() => {
                this.loading=false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.project-detail {
    margin-top: 90px;
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
            }
            .project-main {
                display: flex;
                align-items: center;
                &-img{
                    width: pxToVW(148);
                    margin-right: 44px;
                    img {
                        width: 100%;
                    }
                }
                &-title {
                    font-weight: 400;
                    color: #3C3C41;
                    width: pxToVW(500);
                    .title {
                        font-size: 28px;
                        margin-bottom: 20px;
                    }
                    .attach {
                        margin-bottom: 35px;
                    }
                    .time {
                        color: #999999;
                        display: flex;
                        align-items: center;
                    }
                }
                &-count {
                    display: flex;
                    font-size: 26px;
                    .first-wrap {
                        padding: 12px 20px;
                        background: #E61818;
                        border: 1px solid #E61818;
                        color: #fff;
                    }
                    .second-wrap {
                        background: #FFFFFF;
                        border: 1px solid #E61818;
                        color: #E61818;
                        padding: 12px 20px;

                    }

                }
            }

            .project-info {
                &-theme {
                    font-size: 24px;
                    font-weight: bold;
                    color: #3C3C41;
                    border-left: 7px solid #2434AF;
                    padding-left: 12px;
                    margin-bottom: 30px;

                }
                .el-row {
                    margin-bottom: 10px;
                    
                    .name {
                        font-weight: 400;
                        color: #999999;
                        margin-bottom: 16px;
                    }
                    .values {
                        font-weight: 400;
                        color: #19191C;
                        margin-bottom: 55px;

                    }
                }
            }
        }
        &-right {
            flex: 1;
            :deep(.el-input__inner) {
                border-radius: 48px;
                height: 48px;
                line-height: 48px;
            }
            :deep(.el-input__suffix) {
                top: 4px;
            }
            .preview {
                margin-top: 20px;
                padding: 48px pxToVW(30);
                width: 100%;
                background: #FFFFFF;
                border-radius: 16px;
                text-align: center;
                .publish-btn {
                    background: #EFF7FF;
                    border: 1px solid #DFDFDF;
                    border-radius: 6px;
                    color: #2434AF;
                    font-size: 18px;
                    padding: 16px 0;
                    margin-top: 42px;
                    cursor: pointer;
                    text-align: center;
                }
            }
        }


    }
}
</style>