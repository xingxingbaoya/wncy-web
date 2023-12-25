<template>
  <el-main>
    <el-row>
      <div>
        <div class="content_p">
          <div class="search-area">
          </div>
          <div class="content_top1">
            <div class="title_top">
              <div>会议直播</div>
              <div>Live meeting</div>
            </div>
          </div>
          <div class="middle">
            <!-- <div class="bot_content_left">
              <img src="../../assets/img/meetl.png"
                   alt="">
            </div> -->
            <div class="middle_content">
              <div class="zhibo">
                <iframe v-if="item.meetingVideoType=='0'  && item.meetingLive !== ''"
                        height="457"
                        width="812"
                        :src="item.meetingLive"
                        frameborder="0"
                        allowfullscreen />
                <!-- <video-player v-else
                      ref="videoPlayer"
                      class="video-player vjs-custom-skin"
                      :playsinline="true"
                      :options="playerOptions" /> -->

                <VTcPlayer v-if="item.meetingVideoType=='1' && item.meetingState !== 0 && item.meetingLive !== ''"
                           ref="tcPlayer"
                           :options="options1" />
                <div v-if=" item.meetingVideoType=='1' && item.meetingState== 0 &&  item.meetingLive !== '' "
                     class="noStart">
                  <img :src="item.meetingLiveCover"
                       alt="">
                </div>
                <div v-if="item.meetingLive == '' "
                     class="noStart">
                  <img :src="item.meetingLiveCover"
                       alt="">
                </div>
              </div>
              <div class="zhibodecri"
                   @click="jumpMeetLive(item)">
                <div class="title_cw">
                  {{item.meetingName}}
                </div>
                <div class="time">
                  会议时间:{{item.meetingStartTime}}
                  <span class="item_status">{{item.meetingState == 0 ? "未开始" : item.meetingState == 1 ? "直播中" : "已结束" }}</span>
                </div>
                <div class="grass">
                  会场：{{item.theVenue}}
                </div>
                <div class="zbdw">
                  主办单位：{{item.meetingSponsor}}
                </div>
                <div class="cbdw">
                  承办单位：{{item.meetingUndertake}}
                </div>
              </div>
            </div>
            <!-- <div class="bot_content_right">
              <img src="../../assets/img/meetr.png"
                   alt="">
            </div> -->
          </div>
          <div class="content_R">
            <div class="content_all">
              <div class="content_main_cw">

              </div>
              <!-- <div class="bottom_content">
                    <div v-for="(item,index) in 2"
                        :key="index"
                        class="items">
                      <div class="time_zb">
                        <div class="times">
                          13:00-15:00
                        </div>
                        <div class="zb_status">
                          直播中
                        </div>
                      </div>
                      <div class="zb_title">
                        重点国别技术转移合作对接系列活动— 欧洲、欧亚专场
                      </div>
                    </div>
                  </div> -->

              <!-- 三条直播内容 -->

              <div class="bottom_content_cw"
                   v-if="liveLists.length >= 1">
                <div v-for="(item,index) in liveLists"
                     :key="index"
                     @click="jumpMeetLive(item)"
                     class="items">
                  <div class="time_zb">
                    <div class="times">
                      {{item.meetingStartTimeHour}}-{{item.meetingEndTimeHour}}
                    </div>
                    <div class="zb_status">
                      <span>{{item.meetingStartTime.substring(0,11)}}</span> {{item.meetingState == 0 ? "未开始" : item.meetingState == 1 ? "直播中" : "已结束" }}
                    </div>
                  </div>
                  <div class="zb_title">
                    {{item.meetingName}}
                  </div>
                </div>

              </div>
              <!--  -->
              <div class="yc"
                   v-if="meetGroupList.length">
                <div class="content_top">
                  <div class="title_top">
                    <div>会议议程</div>
                    <div>The meeting agenda</div>
                  </div>
                </div>
                <!-- 当前会议下面 开会的日期 -->
                <div class="meetyc_time">
                  <div class="meetyc_time_scr">
                    <div class="item_cw"
                         v-for="(item,index) in meetGroupList"
                         @click="getCurrentDaymeet(item,index)"
                         :key="index">
                      <div>
                        <div :class="[item.ischeck ? 'meetyc_time_content1' : 'meetyc_time_content']">
                          <div class="hao">
                            {{item.meetingDay}}
                          </div>
                        </div>
                        <div class="month_time">
                          {{item.meetingTime}}
                        </div>
                      </div>
                      <div class="hengxian">

                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div class="middle_cw"
                 v-if="meetGroupList.length">
              <div class="middle_cw_csroll">

                <div class="middle_top">
                  <div class="item_m_t"
                       v-for="(item,index) in liveListsOneDay"
                       @click="loadDataYC(item)"
                       :key=index>
                    <div class="time">
                      <div class="cur_time">
                        {{item.meetingStartTimeHour}}-{{item.meetingEndTimeHour}}
                      </div>
                      <div class="status">
                        <div class="status_pont"
                             v-if="item.meetingState==0">未开始</div>
                        <div class="status_pont"
                             v-if="item.meetingState==1">直播中</div>
                        <div class="status_pont"
                             v-if="item.meetingState==2">回看</div>
                      </div>
                    </div>
                    <div class="title_wc">
                      {{item.meetingName}}
                    </div>
                    <div class="check_reback"
                         @click="jumpMeetLive(item)"
                         v-if="item.meetingState==0">
                      <!-- 未开始 -->
                      查看详情
                    </div>
                    <div class="check_reback"
                         @click="jumpMeetLive(item)"
                         v-if="item.meetingState==1">
                      <!-- 直播中 -->
                      查看详情
                    </div>
                    <div class="check_reback"
                         @click="jumpMeetLive(item)"
                         v-if="item.meetingState==2">
                      <!-- 观看回放 -->
                      查看详情
                    </div>
                  </div>
                </div>
              </div>

              <div class="middle_content">
                <div class="content_t">
                  <div class="content_time">
                    会议时间： {{meetingAgendadetail.meetingTime}}
                  </div>
                  <div class="content_adress"><span class="t_left">会场：</span> <span class="r_left">{{meetingAgendadetail.theVenue}}</span></div>
                </div>
                <div class="content_t">
                  <div class="content_time">
                    <span class="t_left">主办单位：</span> <span class="r_left">{{meetingAgendadetail.meetingSponsor}}</span>
                  </div>
                  <div class="content_adress"> <span class="t_left">协办单位：</span> <span class="r_left">{{meetingAgendadetail.meetingAssistance}}</span> </div>
                </div>
                <div class="content_t">
                  <div class="content_time">
                    <span class="t_left">承办单位：</span> <span class="r_left">{{meetingAgendadetail.meetingUndertake}}</span>
                  </div>
                  <div class="content_adress"> <span class="t_left">支持单位：</span> <span class="r_left">{{meetingAgendadetail.meetingSupport}}</span></div>
                </div>
                <div class="content_t"
                     v-for="(item,index) in meetingAgendaList"
                     :key="index">
                  <div class="content_time_l">
                    <img src="../../assets/img/mtc12.png"
                         alt="">
                    <div class="timeblue">
                      会议时间:{{item.agendaTime}}
                    </div>
                    <div class="zhuanti">
                      {{item.agendaSubject}}
                    </div>
                  </div>
                  <div class="content_adress_p">
                    <div v-for="(itm) in item.content"
                         :key="itm">
                      {{itm}}
                    </div>
                  </div>
                </div>
                <div class="content_t_img"
                     v-if="meetingAgendadetail.meetingProceedings || meetingAgendadetail.meetingPpt || meetingAgendadetail.meetingTxt">
                  <div class="content_time_img">
                    <img src="../../assets/img/tcw14.png"
                         alt="">
                  </div>
                  <div class="content_items">
                    <div class="item_ev"
                         v-if="meetingAgendadetail.meetingProceedings">
                      <img src="../../assets/img/tcw15.png"
                           alt="">
                      <div>
                        <a :href="meetingAgendadetail.meetingProceedings">电子会刊</a>
                      </div>
                    </div>
                    <div class="item_ev"
                         v-if="meetingAgendadetail.meetingPpt">
                      <img src="../../assets/img/tcw16.png"
                           alt="">
                      <div>

                        <a :href="meetingAgendadetail.meetingPpt">PPT下载</a>
                      </div>
                    </div>
                    <div class="item_ev"
                         v-if="meetingAgendadetail.meetingTxt">
                      <img src="../../assets/img/tcw17.png"
                           alt="">
                      <div>
                        <a :href="meetingAgendadetail.meetingTxt">电子文件</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bottom_person">
              <div class="content_top">
                <div class="title_top">
                  <div>会议嘉宾</div>
                  <div>Meeting the guest</div>
                </div>
              </div>
              <div class="persons">
                <div class="person_item"
                     v-for="(item,index) in guestsList"
                     @click="godetail(item,1)"
                     :key="index">
                  <img :src="item.avatar"
                       alt="">
                  <div class="person_dcr">
                    <div class="name">
                      {{item.guestsName}}
                    </div>
                    <div class="ms">
                      {{item.title}}
                    </div>
                  </div>
                </div>
              </div>
              <Empty v-show="!guestsList.length" />
              <div class="pager">
                <el-pagination background="true"
                               layout="total,prev, pager, next,jumper"
                               :page-size="pager.pageSize"
                               :total="pager.total"
                               :current-page="pager.pageNum"
                               @current-change="handleCurrentChange" />
              </div>

            </div>

          </div>

        </div>
      </div>

    </el-row>

  </el-main>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { slider,slideritem } from 'vue-concise-slider'
import { VTcPlayer } from 'v-tcplayer'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import currentYear from './currentYear'
import meet from './meet.vue'
import city from '@/assets/city/city_code.json'
import { getMeetingDetail,getMeetingAgenda,getmeetZhibo,getMeetingGrop,getGuestsList,getMeetingAgendaList } from '@/api/meet'

export default {
  name: 'Projecthall',
  mixins: [common],
  components: {
    currentYear,meet,
    videoPlayer,
    slider,
    slideritem,
    VTcPlayer

  },
  data () {
    return {
      isShowMeetDetail: false,
      activeName: "1",
      searchData: {
        title: '',
        industryone: '',
        province: '',
        proPatentInfo: '',
        proNature: '',
        isNotNational: '',
        isListing: ''
      },
      listData: [],
      isShowFir: false,
      isShowSec: false,
      conferenceId: this.$route.query.id,
      agendaId: "",
      options1: {
        hlsUrl: 'https://cdn.staticfile.org/hls.js/0.8.9/hls.min.js', // 0.0.5增加
        width: 812,
        height: 457,
        m3u8: '',
        poster: ''
      },
      isVideo: false,
      options: {
        pagination: true,
        thresholdDistance: 100, // Sliding distance threshold
        thresholdTime: 300, // Sliding time threshold decision
        grabCursor: true, // Scratch style
        speed: 800, // Sliding speed
        // timingFunction: 'ease', // Sliding mode
        loop: true, // Infinite loop
        autoplay: 2000 // Auto play[ms]
      },
      total: 0,
      playerOptions: {
        playbackRates: [0.5,1.0,1.5,2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL', // 类型
          src: 'https://vod.ourwill.cn/a2756702vodtranssh1500001190/b3ef0b975285890817308529936/v.f261045.m3u8'
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      item: {},
      liveLists: [],
      meetGroupList: [],
      guestsList: [],
      liveListsOneDay: [],
      meetingAgendaList: [],
      meetingAgendadetail: {},
    }
  },
  computed: {
    cityList () {
      return city
    },
    isIfm () {
      return this.item.videoType=='0'
    },
    player () {
      // tcPlayer实例
      return this.$refs.tcPlayer.vTcPlayer
    },
  },
  created () {
    this.loadData()
    this.lodingDataZB(this.conferenceId)
    this.lodingDataJB()
  },
  methods: {
    godetail ({ id },type) {
      this.goBlank({
        path: '/gdetail',
        query: {
          id,
          type
        }
      })
    },
    //根据大会id查询会议时间分组
    lodingDataJB () {
      this.loading=true
      getMeetingGrop(this.conferenceId).then(res => {
        if(res.code==0) {
          res.rows.forEach((item,index)=>{
            if(index==0){
              item.ischeck = true
            }else{
              item.ischeck = false
            }

          })
          this.meetGroupList=res.rows
          console.log(res.rows,333);
          let data=this.meetGroupList[0]
          if(res.total>0) {
            // 获取
            getmeetZhibo({ ...this.meetGroupList[0],conferenceId: this.conferenceId }).then(res => {
              if(res.code=='0') {
                if(res.total>0) {

                  let liveListsOneDay=res.rows
                  this.liveListsOneDay=liveListsOneDay
                  //获取议程
                  getMeetingAgendaList(liveListsOneDay[0].meetingId).then(res => {
                    if(res.code==0) {
                      this.meetingAgendadetail=res.obj
                      let goods=res.obj.goods
                      goods.forEach(t => {
                        t.content=t.content.split('<br>')
                      });
                      this.meetingAgendaList=goods
                      console.log(this.meetingAgendaList,2);


                    } else {
                      this.$message.error(res.msg)
                    }
                  }).finally(() => {
                    this.loading=false
                  })
                }
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.$message.error(res.msg)

        }
      }).finally(() => {
        this.loading=false
      })
    },
    // 查询某一天的会议列表
    getCurrentDaymeet (item,index) {
      this.meetGroupList.forEach((itm,i)=>{
        itm.ischeck = i == index ?  true : false
      })
      this.isShowMeetDetail=true
      let data={
        conferenceId: this.conferenceId,
        meetingTime: item.meetingTime
      }
      getmeetZhibo(data).then(res => {
        if(res.code=='0') {
          if(res.total>0) {
            this.liveListsOneDay=res.rows
            getMeetingAgendaList(this.liveListsOneDay[0].meetingId).then(res => {
              if(res.code==0) {
                let goods=res.obj.goods
                goods.forEach(t => {
                  t.content=t.content.split('<br>')
                });
                this.meetingAgendadetail=res.obj
                this.meetingAgendaList=goods
                console.log(this.meetingAgendaList,1);
              } else {
                this.$message.error(res.msg)
              }
            }).finally(() => {
              this.loading=false
            })
          } else {
            this.liveListsOneDay=[]
          }
        } else {
          this.$message.error(res.msg)
        }

      })
    },

    //议程列表
    loadDataYC (item) {
      this.loading=true
      getMeetingAgendaList(item.meetingId).then(res => {
        if(res.code==0) {
          let goods=res.obj.goods
          goods.forEach(t => {
            t.content=t.content.split('<br>')
          });
          this.meetingAgendadetail=res.obj
          this.meetingAgendaList=goods
          console.log(this.meetingAgendaList,3);

        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    //会议直播
    lodingDataZB (id) {
      getmeetZhibo({ conferenceId: id }).then(res => {
        // 默认展示第一条数据的直播内容
        if(res.code=='0') {
          if(res.total>0) {
            this.item=res.rows[0]
            this.liveLists=res.rows
            this.$delete(this.liveLists,0)
            if(!this.isIfm) {
              this.options1.poster=this.item.meetingLiveCover
              this.options1.m3u8=this.item.meetingLive
              this.isVideo=!this.isIfm
            }
          }

        } else {
          this.$message.error(res.msg)
        }

      })
    },
    //会议嘉宾
    loadData () {
      this.pager.pageSize=8
      const { pageNum,pageSize }=this.pager
      const formpage={ pageNum,pageSize }
      console.log(formpage);
      getGuestsList({ pageNum,pageSize,conferenceId: this.conferenceId }).then(res => {
        // 默认展示第一条数据的直播内容
        if(res.code=='0000') {
          this.guestsList=res.rows
          this.$set(this.pager,'total',res.total)
        } else {
          this.$message.error(res.msg)
        }

      })
    },

    gopost () {
      this.goBlank({
        path: '/projecthall/post'
      })
    },
    handleClick (tab) {
      this.activeName=tab
      console.log(tab);
    },
    jumpMeetLive (item) {
      this.$router.push({
        path: "/meethall/meetLive",
        query: {
          id: item.meetingId
        }
      })
    },

  }
}
</script>

<style scoped lang="scss">
.noStart {
  img {
    width: 812px;
    height: 457px;
  }
}
.content_p {
  position: relative;
}
.content_R {
  margin-top: 270px;
}
.content_top1 {
  top: 651px;
  position: absolute;
  overflow: hidden;
  padding: 0 calc((100% - 1245px) / 2) 38px;
  .title_top {
    // margin-left: 17%;
    div:nth-child(1) {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      margin-bottom: 15px;
      letter-spacing: 3px;
    }
    div:nth-child(2) {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      width: 90px;
      height: 23px;
      background: linear-gradient(90deg, #1975f2 0%, #36b7fa 100%);
      line-height: 23px;
    }
  }
}
.content_top {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  .title_top {
    // margin-left: 17%;
    div:nth-child(1) {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      margin-bottom: 15px;
      letter-spacing: 3px;
    }
    div:nth-child(2) {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      width: 90px;
      height: 23px;
      background: linear-gradient(90deg, #1975f2 0%, #36b7fa 100%);
      line-height: 23px;
    }
  }
}
.content_all {
  width: 100%;
  // position: absolute;
  // top: 702px;
}
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.middle {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  position: absolute;
  top: 750px;
  overflow: hidden;
  // display: flex;
  // justify-content:center;
  // align-items: center;
  width: 100%;
  .title {
    width: 82px;
    height: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 39px;
  }
  .bot_content_left {
    position: absolute;
    left: 0;
    top: 25%;
    img {
      width: 50%;
      height: 50%;
    }
  }
  .bot_content_right {
    position: absolute;
    right: -14%;
    top: 25%;
    img {
      width: 50%;
      height: 50%;
    }
  }
  .middle_content {
    padding: 30px;
    background: #fafbfb;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .zhibo {
      // height: 457px;
    }
    .zhibodecri {
      cursor: pointer;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 4px 20px ;
      .title_cw {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 55px;
      }
      .time {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-bottom: 36px;
        color: #333333;
        .item_status {
          margin-left: 10px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #1e86f9;
        }
      }
      .grass {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-bottom: 38px;
        color: #333333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
        overflow: hidden;
      }
      .zbdw {
        margin-bottom: 47px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
        overflow: hidden;
      }
      .cbdw {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
        overflow: hidden;
      }
    }
  }
}
.bottom_person {
  padding-top: 91px;
  width: 100%;
  background: #f3f5f8;
  box-shadow: 0px 0px 80px 0px rgba(227, 232, 240, 0.8);
  .persons {
    padding: 0 calc((100% - 1245px) / 2) 38px;
    display: flex;
    // justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    .person_item {
      cursor: pointer;
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      width: 23%;
      margin-right: 20px;
      margin-bottom: 20px;
      // height: 345px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      // background: url("../../assets/img/girl.png") no-repeat center 0px;
      // background-position: center 0px;
      // background-size: 100% 100%;
      // background-repeat: no-repeat;
      // background-size: 100%;
      color: #ffffff;
      position: relative;
      img {
        width: 100%;
        height: 345px;
        //如果图片比例不为一比一 则可以适当增加比例以满足充满盒子
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        position: relative;
      }
      .person_dcr {
        background: url("../../assets/img/dibian.png") no-repeat center 0px;
        background-position: center 0px;
        background-size: 100% 100%;
        padding: 13px 22px 0 22px;
        width: 100%;
        position: absolute;
        bottom: 0;

        .name {
          margin-bottom: 12px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
        }
        .ms {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 300;
          color: #FFFFFF;
          margin-bottom: 13px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
          height: 32px;
        }
      }
    }
  }
}
.middle_cw {
  width: 100%;
  background: #f3f5f8;
  box-shadow: 0px 0px 80px 0px rgba(227, 232, 240, 0.8);
  padding: 0 calc((100% - 1245px) / 2) 38px;

  .middle_content {
    .content_t_img {
      padding: 47px 44px 46px;
      border-left: 6px solid #1e86f9;
      display: flex;
      // justify-content: space-between;
      align-items: flex-start;
      background: #fff;
      margin-bottom: 18px;
      width: 100%;
      .content_time_img {
        margin-right: 184px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .content_items {
        justify-self: flex-start;
        display: flex;
        align-items: center;
        .item_ev {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-right: 106px;
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          img {
            width: 50px;
            height: 50px;
            margin-bottom: 24px;
          }
        }
      }
    }
    .content_t {
      padding: 47px 44px 46px;
      border-left: 6px solid #1e86f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-bottom: 18px;
      width: 100%;

      .content_time {
        width: 50%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        display: flex;
        align-items: center;
        color: #333333;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1; /*超出几行后省略号*/
        // overflow: hidden;
        .t_left {
          width: 100px;
          display: inline-block;
          white-space: nowrap;
        }
        .r_left {
          display: inline-block;
          line-height: 1.5;
        }
      }
      .content_time_l {
        width: 50%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        align-items: center;
        img {
          width: 59px;
          height: 59px;
        }
        .timeblue {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1e86f9;
          margin: 0 67px 0 17px;
          white-space: nowrap;
        }
        .zhuanti {
          line-height: 1.5;
          width: 46%;
        }
      }
      // .content_adress{
      //   width: 50%;
      //   font-size: 18px;
      //   font-family: PingFang SC;
      //   font-weight: 400;
      //   color: #333333;
      // }
      .content_adress {
        width: 48%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        align-items: center;
        line-height: 1.5;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 1; /*超出几行后省略号*/
        // overflow: hidden;
        .t_left {
          width: 100px;
          display: inline-block;
          white-space: nowrap;
        }
        .r_left {
          display: inline-block;
          line-height: 1.5;
        }
      }
      .content_adress_p {
        display: flex;
        flex-direction: column;
        width: 50%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        padding-left: 20px;

        div {
          margin: 5px 0;
          line-height: 1.5;
        }
      }
    }
  }
  .middle_cw_csroll {
    display: flex;
    overflow: scroll;
  }
  .middle_cw_csroll::-webkit-scrollbar {
    width: 2px;
  }
  .middle_cw_csroll::-webkit-scrollbar-thumb {
    border-radius: 20px;
    -webkit-box-shadow: inset 0 0 5px #fff;
    background: #d8d8d8;
  }
  .middle_cw_csroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px #fff;
    border-radius: 0;
    background: #fff;
  }
  .middle_cw_csroll::-webkit-scrollbar {
    width: 0 !important;
  }
  .middle_top {
    display: flex;
    // flex-wrap: wrap;
    .item_m_t {
      cursor: pointer;
      width: 364px;
      // height: 122px;
      background: url("../../assets/img/tuyuan.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      padding: 39px 28px 19px;
      margin-bottom: 30px;
      margin-right: 10px;
      cursor: pointer;
      .time {
        display: flex;
        justify-content: space-between;

        .cur_time {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #000000;
        }
        .status {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 300;
          color: #ffffff;
          width: 64px;
          height: 24px;
          border: 1px solid #ffffff;
          border-radius: 12px;
          background: #000000;
          opacity: 0.3;
          text-align: center;
          line-height: 24px;
          border-radius: 12px;
          // .status_point::before {
          //   content: "";
          //   left: 16px;
          //   top: 45%;
          //   border: 1px solid #76eea0;
          //   background-color: #76eea0;
          //   display: inline-block; // 此句为css样式展示重点🏁
          //   width: 3px;
          //   height: 3px;
          //   border-radius: 50%;
          //   margin-right: 12px;
          // }
        }
      }
      .title_wc {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4d5567;
        margin: 22px 0 26px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /*超出几行后省略号*/
        overflow: hidden;
      }
      .noOpen {
        width: 132px;
        height: 42px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px #e1e3f0;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4d5567;
        line-height: 42px;
        text-align: center;
      }

      .check_reback {
        width: 132px;
        height: 42px;
        background: #4d5567;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 42px;
        text-align: center;
      }
    }
  }
}
.yc {
  .meetyc_time {
    margin-top: 20px;
    .meetyc_time_content {
      width: 220px;
      height: 180px;
      flex-shrink: 0;
      background: url("../../assets/img/tcyc9.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      position: relative;
    }
    .meetyc_time_scr {
      cursor: pointer;
      display: flex;
      overflow: scroll;
      margin: 0 calc((100% - 1245px) / 2) 38px;
    }
    .meetyc_time_scr::-webkit-scrollbar {
      width: 2px;
    }
    .meetyc_time_scr::-webkit-scrollbar-thumb {
      border-radius: 20px;
      -webkit-box-shadow: inset 0 0 5px #fff;
      background: #d8d8d8;
    }
    .meetyc_time_scr::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px #fff;
      border-radius: 0;
      background: #fff;
    }
    .meetyc_time_scr::-webkit-scrollbar {
      width: 0 !important;
    }

    .hengxian {
      width: 59px;
      height: 2px;
      background: #cccccc;
      margin: 0 15px 55px 15px;
    }
    .item_cw:last-child {
      .hengxian {
        display: none;
      }
    }
    .item_cw {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // .item_cw:after {
    //   content: ''; // 必须
    //   position: absolute;
    //   left: 30px;
    //   bottom: 0;
    //   right: 0;
    //   width: 720px;
    //   height: 1PX;
    // }
    .meetyc_time_content1 {
      width: 220px;
      height: 180px;
      background: url("../../assets/img/tcyc10.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      flex-shrink: 0;
      position: relative;
    }

    .meetyc_time_content:hover {
      width: 220px;
      height: 180px;
      background: url("../../assets/img/tcyc10.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      flex-shrink: 0;
      position: relative;
    }
    .hao {
      position: absolute;
      right: 46px;
      top: 66px;
      font-size: 30px;
      font-family: Source Han Sans CN;
      font-weight: 800;
      color: #666666;
    }
    .month_time {
      text-align: center;
      margin: 24px 0 28px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666666;
    }
  }
}

.bottom_content_cw_box {
  overflow: scroll;
}
.bottom_content_cw {
  padding: 120px calc((100% - 1245px) / 2) 38px;
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .items {
    width: 48%;
    height: 103px;
    background: #fafbfb;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding-left: 35px;
    // margin-left: 20px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .time_zb {
    .times {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #666666;
      width: 130px;
      white-space: nowrap;
    }
    .zb_status {
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1e86f9;
    }
    span {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #666666;
    }
  }
  .zb_title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    position: relative;
    margin-left: 38px;
    padding-left: 28px;
    height: 55px;
    line-height: 55px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
    width: 70%;
  }
  .zb_title::before {
    content: "";
    border-left: 2px solid #eeeeee;
    // border-left: 4px solid pink;
    left: 0;
    position: absolute;
    height: 55px;
  }
}
.bottom_content {
  padding: 0 20%;
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .items {
    width: 49%;
    height: 103px;
    background: #fafbfb;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding-left: 35px;
    margin-left: 20px;
    margin-top: 78px;
  }

  .time_zb {
    .times {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #666666;
    }
    .zb_status {
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1e86f9;
    }
  }
  .zb_title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    position: relative;
    margin-left: 38px;
    padding-left: 28px;
    height: 55px;
    line-height: 55px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .zb_title::before {
    content: "";
    border-left: 2px solid #eeeeee;
    // border-left: 4px solid pink;
    left: 0;
    position: absolute;
    height: 55px;
  }
}
.content_img_detail {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 75px 75px 0 75px;

  .detail_l {
    width: 272px;
    height: 255px;
    img {
      width: 272px;
      height: 255px;
    }
  }
  .detail_r {
    img {
      width: 272px;
      height: 255px;
    }
  }
  .detail_cw {
    background: url("../../assets/img/detailCopy.png") no-repeat center 0px;
    background-position: center 0px;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .decril_left {
      img {
        width: 812px;
        height: 475px;
      }
    }
    .decril_right {
      width: 345px;
      display: flex;
      // justify-content: space-between;
      flex-direction: column;
      padding-left: 49px;
      padding-top: 5px;
      .detail_title {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 55px;
        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2; /* 这里是超出几行省略 */

        overflow: hidden;
      }
      .detail_time {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 36px;
        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2; /* 这里是超出几行省略 */

        overflow: hidden;
      }
      .detail_adress {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 38px;
        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2; /* 这里是超出几行省略 */

        overflow: hidden;
      }
      .detail_dawei {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 47px;
        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2; /* 这里是超出几行省略 */

        overflow: hidden;
      }
      .detail_cb {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-overflow: ellipsis;

        display: -webkit-box;

        -webkit-box-orient: vertical;

        -webkit-line-clamp: 2; /* 这里是超出几行省略 */

        overflow: hidden;
      }
    }
  }
}
.more_cw {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  div:nth-child(1) {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin: 40px 0 8px 0;
  }
  div:nth-child(2) {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
  }
  div:nth-child(2):hover {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
    cursor: pointer;
  }
}
.search-area {
  position: relative;
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 907px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  // margin-bottom: 24px;
  background: url("../../assets/img/meet2bg.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: 100% 100%;
  // padding: 0 -220px -38px;
  // padding: 0 calc((100% - 1245px)/2) 38px
  .icon-text_cw {
    margin-left: 15px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
  }
}
.content_main_cw {
  // margin-top: 40%;
  // display: flex;
  // flex-direction: column;
}

.content_main {
  width: 100%;
  .left_content {
    img {
      width: 10%;
      height: 10%;
    }
  }
  .content_cw {
    flex-grow: 1;
    padding: 0 8%;
    .contentTop {
      .title {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
  .right_content {
    img {
      width: 10%;
      height: 10%;
    }
  }
}
</style>
