<template>
  <el-main>
    <el-row class="search-area">
    </el-row>
    <div>
      <div>
        <div class="content_main_cw">
          <div class="content_top">
            <div class="title_top">
              <div>会议直播</div>
              <div>Live meeting</div>
            </div>
          </div>
          <div class="middle">
            <div class="middle_content">
              <div class="zhibo">
                <!-- <img src=""
               alt=""> -->
                <iframe v-if="isIfm"
                        height="341"
                        width="607"
                        :src="item.meetingLive"
                        frameborder="0"
                        allowfullscreen />
                <video-player v-else
                              ref="videoPlayer"
                              class="video-player vjs-custom-skin"
                              :playsinline="true"
                              :options="playerOptions" />
              </div>
              <div class="zhibodecri">
                <div class="title_cw">
                  {{item.meetingName}}
                </div>
                <div class="time">
                  会议时间:{{item.meetingStartTime}}
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
            <div class="bot_content">

            </div>
          </div>
          <div class="bottom_content_cw"
               v-if="liveLists.length >= 1">
            <div v-for="(item,index) in liveLists"
                 :key="index"
                 class="items">
              <div class="time_zb">
                <div class="times">
                  {{item.meetingStartTime}}
                </div>
                <div class="zb_status">
                  直播中
                </div>
              </div>
              <div class="zb_title">
                {{item.meetingName}}
              </div>
            </div>

          </div>

        </div>
        <div class="bottom_content">
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
        </div>
        <div class="yc">
          <div class="content_top">
            <div class="title_top">
              <div>会议议程</div>
              <div>The meeting agenda</div>
            </div>
          </div>

          <div class="meetyc_time">
            <div class="meetyc_time_scr">
              <div class="item_cw"
                   v-for="(item,index) in 20"
                   :key="index">
                <div>
                  <div :class="item % 2 == 0 ? 'meetyc_time_content' : 'meetyc_time_content_cur'">
                    <div class="hao">
                      24
                    </div>
                  </div>
                  <div class="month_time">
                    8月24号
                  </div>
                </div>
                <div class="hengxian">

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="middle_cw">
        <div class="middle_top">
          <div class="item_m_t"
               v-for="(item,index) in 3"
               :key=index>
            <div class="time">
              <div class="cur_time">
                10:00-12:00
              </div>
              <div class="status">
                <div class="status_pont">直播中</div>
              </div>
            </div>
            <div class="title_wc">
              技术交流大会
            </div>
            <div class="check_reback">
              观看回放
            </div>
          </div>
        </div>

        <div class="middle_content">
          <div class="content_t">
            <div class="content_time">
              会议时间：2021-09-27 14:00:00 - 2021-09-27 17:25:00
            </div>
            <div class="content_adress">会场：会议中心A103静宜厅</div>
          </div>
          <div class="content_t">
            <div class="content_time">
              协办单位：—— 委员会
            </div>
            <div class="content_adress">会场：会议中心A103静宜厅</div>
          </div>
          <div class="content_t">
            <div class="content_time">
              承办单位：北京国际技术交易联盟、国际技术转移协作网络（ITTN）
            </div>
            <div class="content_adress">协办单位：—— 委员会</div>
          </div>
          <div class="content_t">
            <div class="content_time_l">
              <img src="../../assets/img/mtc12.png"
                   alt="">
              <div class="timeblue">
                14:00-14:15
              </div>
              <div>
                领导字词
              </div>
            </div>
            <div class="content_adress">专题1：联合研发与技术服务重点方向。专题2：技术转移与技术交易重点方向。专题3：衍生、初创企业与投融资合作重点方向。专题4：孵</div>
          </div>
          <div class="content_t">
            <div class="content_time_l">
              <img src="../../assets/img/mtc12.png"
                   alt="">
              <div class="timeblue">
                14:00-14:15
              </div>
              <div>
                领导字词
              </div>
            </div>
            <div class="content_adress">专题1：联合研发与技术服务重点方向。专题2：技术转移与技术交易重点方向。专题3：衍生、初创企业与投融资合作重点方向。专题4：孵</div>
          </div>
          <div class="content_t">
            <div class="content_time_l">
              <img src="../../assets/img/mtc12.png"
                   alt="">
              <div class="timeblue">
                14:00-14:15
              </div>
              <div>
                领导字词
              </div>
            </div>
            <div class="content_adress">1.演讲题目《知识产权运营助力高校科技创新》，演讲嘉宾：正高级研究员、国家知识产权领军人才、全国知识产权运营公众服务平台总体规</div>
          </div>
          <div class="content_t_img">
            <div class="content_time_img">
              <img src="../../assets/img/tcw14.png"
                   alt="">
            </div>
            <div class="content_items">
              <div class="item_ev">
                <img src="../../assets/img/tcw15.png"
                     alt="">
                <div>
                  电子会刊
                </div>
              </div>
              <div class="item_ev">
                <img src="../../assets/img/tcw16.png"
                     alt="">
                <div>
                  PPT下载
                </div>
              </div>
              <div class="item_ev">
                <img src="../../assets/img/tcw17.png"
                     alt="">
                <div>
                  电子文件
                </div>
              </div>
            </div>
          </div>
          <div class="middle_top">
            <div class="item_m_t"
                 v-for="(item,index) in 1"
                 :key=index>
              <div class="time">
                <div class="cur_time">
                  10:00-12:00
                </div>
                <div class="status">
                  <!-- <div class="status_pont">直播中</div> -->
                </div>
              </div>
              <div class="title_wc">
                技术交流大会
              </div>
              <div class="noOpen">
                暂未开启
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
               v-for="(item,index) in 8"
               :key="index">
            <div class="person_dcr">
              <div class="name">
                易烊千玺
              </div>
              <div class="ms">
                中国信息通信研究院 云大所副所长 中国通信标准化协会 TC1 WG5云计算标准化...
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </el-main>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { slider,slideritem } from 'vue-concise-slider'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import currentYear from './currentYear'
import meet from './meet.vue'
import city from '@/assets/city/city_code.json'
import { getMeetingDetail,getMeetingAgenda,getmeetZhibo,getMeetingAgendaGroup } from '@/api/meet'

export default {
  name: 'Projecthall',
  mixins: [common],
  components: {
    currentYear,meet ,
    videoPlayer,
    slider,
    slideritem
  },
  data () {
    return {
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
      meetingId: this.$route.query.id,
      agendaId: "",
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
    }
  },
  computed: {
    cityList () {
      return city
    }
  },
  created () {
    this.loadData()
    // this.loadDataYC()
    this.lodingDataZB()
  },
  methods: {
    //会议详情
    loadData () {
      this.loading=true
      getMeetingAgendaGroup(this.meetingId).then(res => {
        if(res.code=='0000') {
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    //议程详情
    loadDataYC () {
      this.loading=true
      getMeetingAgenda(this.agendaId).then(res => {
        if(res.code=='0000') {
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    //会议直播
    lodingDataZB () {
      getmeetZhibo({conferenceId:this.meetingId}).then(res => {
        // 默认展示第一条数据的直播内容
        if(res.code=='0') {
          if(res.total>0) {
            this.item=res.rows[0]
            this.playerOptions.sources[0].src=this.item.meetingLive
            this.playerOptions.poster=this.item.meetingLiveCover
            this.liveLists=res.rows
          }
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
    }

  }
}
</script>

<style scoped lang="scss">
.middle {
  margin: 0 17% ;
  .title {
    width: 82px;
    height: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 39px;
  }
  .middle_content {
    margin-top: 47px;
    background: #fafbfb;
    border-radius: 3px;
    padding: 47px 0 47px 47px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .zhibo {
      width: 60%;
      height: 100%;
    }
    .zhibodecri {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 4px 0 0 49px;
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
      }
      .grass {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-bottom: 38px;
        color: #333333;
      }
      .zbdw {
        margin-bottom: 47px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      .cbdw {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
  }
}
.bottom_person {
  width: 100%;
  background: #f3f5f8;
  box-shadow: 0px 0px 80px 0px rgba(227, 232, 240, 0.8);
  .persons {
  padding: 0 calc((100% - 1245px) / 2) 38px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    .person_item {
      display: flex;
      align-items: flex-end;
      width: 23%;
      margin-right: 20px;
      margin-bottom: 20px;
      height: 345px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
      background: url("../../assets/img/girl.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      color: #ffffff;
      .person_dcr {
        background: url("../../assets/img/dibian.png") no-repeat center 0px;
        background-position: center 0px;
        background-size: 100% 100%;
        padding: 13px 22px 0 22px;

        .name {
          margin-bottom: 12px;
        }
        .ms {
          margin-bottom: 13px;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
        }
      }
    }
  }
}
.middle_cw {
  width: 100%;
  background: #f3f5f8;
  box-shadow: 0px 0px 80px 0px rgba(227, 232, 240, 0.8);
  padding: 0 17%;
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
      align-items: flex-start;
      background: #fff;
      margin-bottom: 18px;
      width: 100%;

      .content_time {
        width: 50%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
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
        width: 50%;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        align-items: center;
      }
    }
  }

  .middle_top {
    display: flex;
    .item_m_t {
      cursor: pointer;
      width: 364px;
      // height: 122px;
      background: url("../../assets/img/tuyuan.png") no-repeat center 0px;
      background-position: center 0px;
      background-size: 100% 100%;
      padding: 39px 28px 19px;
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
          // position: relative;
          // .status_point::before {
          //   content: "";
          //   position: absolute;
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
      display: flex;
      margin: 0 17%;
      overflow: scroll;
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

    .meetyc_time_content_cur {
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
.content_top {
  .title_top {
    margin-left: 17%;
    div:nth-child(1) {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 17px;
      margin-bottom: 15px;
    }
    div:nth-child(2) {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      width: 157px;
      height: 23px;
      background: linear-gradient(90deg, #1975f2 0%, #36b7fa 100%);
      line-height: 23px;
    }
  }
}
.bottom_content_cw {
  padding: 0 calc((100% - 1245px) / 2) 38px;
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .items {
    width: 48%;
    height: 103px;
    background: #fafbfb;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding-left: 35px;
    margin-left: 20px;
    margin-bottom: 15px;
    cursor: pointer;
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
      font-weight: 300;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
    width: 60%;

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
  margin-top: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .items {
    width:49%;
    height: 103px;
    background: #fafbfb;
    border-radius: 2px;
    display: flex;
    align-items: center;
    padding-left: 35px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .time_zb {
    .times {
      width: 130px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #666666;
    }
    .zb_status {
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 300;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
    // width: 60%;

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
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 907px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
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
  // display: flex;
  // flex-direction: column;
}

.content_main {
  width: 100%;
  .left_content {
    width: 154px;
    height: 322px;
    img {
      width: auto;
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
    width: 108px;
    height: 192px;
    margin-top: 688px;
    img {
      width: auto;
    }
  }
}
</style>
