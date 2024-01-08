 <template>
  <div class="project-detail">
    <img src="~img/projectManage/project-search.png"/>
    <p>当前位置：首页 > 科技成果 > {{ project.title }}</p>
    <div class="project-detail-wrap">
        <div class="project-detail-wrap-left">
            <!-- <div class="project-wrap project-main">
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
            </div> -->
            <div class="project-wrap project-info">
                <el-row>
                    <el-col :span="24">
                        <span class="title">{{project.title || '无'}}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="value" style="color: #999999;margin: 10px 0 90px;display: flex;align-items: center;"><img src="~img/projectManage/time.png"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{project.createTime }}</span>
                    </el-col>
                    <!-- <el-col :span="6" v-for="item in infoList">
                        <div class="name">{{ item.name }}</div>
                        <div class="values">{{ project[item.word] || item.value }}</div>
                    </el-col> -->
                </el-row>
                <div class="project-info-theme">项目介绍</div>
                <el-row>
                    <!-- <el-col :span="6" v-for="item in introList">
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
                    </el-col> -->
                    <el-col :span="24">
                        <span class="name">所在院所</span>  <span class="values">{{ academy }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">十大高精尖产业</span>  <span class="values">{{ industryKind.top10hg }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">北京2411产业</span>  <span class="values">{{ industryKind.bj2441 }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">中关村科技园区管理委员会241产业分类</span>  <span class="values">{{ industryKind.zgckjy241 }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">应用场景</span>  <span class="values">{{ project.scenario }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">项目类别</span>  <span class="values">{{ project.typeDescription }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">合作意向</span>  <span class="values">{{ expire.join(',') }}</span>
                    </el-col>
                </el-row>
                <div class="project-info-theme">项目内容</div>
                <span style="line-height: 36px;margin-bottom: 55px;display: inline-block;" v-html="project.proIntroduct"></span>
                <!-- <div class="project-info-theme">项目附件</div> -->
                <div class="project-info-theme">联系信息</div>
                <el-row>
                    <el-col :span="24">
                        <span class="name">联系人</span>  <span class="values">{{ project.linkman }}</span>
                    </el-col>
                    <el-col :span="24">
                        <span class="name">联系方式</span>  <span class="values">{{ project.phone }}</span>
                    </el-col>
                </el-row>
            </div>

        </div>
        <div class="project-detail-wrap-right">
            <div class="preview">
                <!-- <template v-if="project.status == 0">
                    <div>已结束</div>
                </template> -->
                <template v-if="project.status == 1">
                    <img src="~img/projectManage/dengdai.png"/>
                    <div class="status" style="color:#FF6900">等待审核中</div>
                </template>
                <template v-else="project.status == 2">
                    <img src="~img/projectManage/tongguo.png"/>
                    <div class="status" style="color:#2ECB82 ;">审核通过</div>
                    <div class="publish-btn" @click="doProjPublish" v-if="project.status != 1">发布类似项目</div>
                </template>
                <!-- <div>
                    <img src="~img/projectManage/fabu.png"/>
                </div> -->
            </div>
        </div>

    </div>
  </div>
</template>

<script>
import { getProjectDetail } from '@/api/projecthall'
import common from '@/mixin/common'

export default {
    mixins: [common],
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
            ],
            academy: '',
            industry: '',
            expire:[],
            industryKind: {
                top10hg: '',
                bj2441: '',
                zgckjy241: ''
            }
        }
    },
    mounted() {
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
                    console.log('qq', this.academyStateDict, this.project.sponsor)
                    this.academy = this.academyStateDict?.find(item => item.dictValue == this.project.sponsor).dictLabel || '无'
                    this.cooperationDict.forEach(item => { 
                        this.project.cooperation.includes(item.dictValue) && this.expire.push(item.dictLabel)
                    });
                    // this.expire = this.cooperationDict?.find(item => item.dictValue == this.project.cooperation).dictLabel || '无'
                    this.industryKind.top10hg = this.topTenStateDict?.find(item => item.dictValue == this.project.top10hg).dictLabel || '无'
                    this.industryKind.bj2441 = this.bjStateDict?.find(item => item.dictValue == this.project.bj2441).dictLabel || '无'
                    this.industryKind.zgckjy241 = this.zgckjyStateDict?.find(item => item.dictValue == this.project.zgckjy241).dictLabel || '无'

                    

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
                    :deep(.el-col-24) {
                        display: flex;
                        margin-bottom: 10px;

                    }
                    .title {
                        height: 27px;
                        font-size: 28px;
                        font-weight: 400;
                        color: #3C3C41;
                    }
                    .name {
                        font-weight: 400;
                        color: #999999;
                        margin-bottom: 16px;
                        min-width: pxToVW(80);
                        display: inline-block;
                    }
                    .values {
                        margin-left: 20px;
                        font-weight: 400;
                        color: #19191C;
                        display: inline-block;

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
            .status {
                font-size: 32px;
                font-weight: bold;
                line-height: 74px;
            }
        }


    }
}
</style>