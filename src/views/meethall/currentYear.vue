<template>
  <div class="current_year">
    <!-- Make a div wrapped slider,set height and width -->

    <div class="content_top"
         v-if="wiperList.length">
      <div style="width:433px;margin:20px auto;height:260px">
        <!-- Using the slider component -->
        <slider ref="slider"
                :options="options"
                @slide='slide'
                @tap='onTap'
                @init='onInit'>
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(item,index) in wiperList"
                      :key="index">
            <!-- {{item.newsTitle}} -->
            <div class="slide_item"
                 :style="{'background':'url(' + item.newsCoverLog + ')' ,'background-repeat':'no-repeat','background-size':'100% 100%','height':'100%'}"
                 @click="jumpNewsDetail(item)">
              <span>{{item.newsTitle.length > 25 ? item.newsTitle.substring(0,25) : item.newsTitle}}</span>
            </div>
          </slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
      <div class="content_right">
        <div class="listdata">
          <div class="lists_cw"
               v-for="(o,index) in listsDataList"
               :key="index"
               @click="jumpNewsDetail(o)">
            <div>
              {{o.newsTitle}}
            </div>
            <div class="time_list">
              {{o.newsReleaseDate.substring(0,10)}}
            </div>
          </div>

        </div>
        <!-- <div class="listdata">
          <div class="lists_cw"
               v-for="(item,index) in listsData"
               :key="index">
            <div>
              第五届“芯动北京”中关村IC产业论坛、“华为杯”第四届中国...
            </div>
            <div class="time_list">
              2020-09-09
            </div>
          </div>
        </div> -->
      </div>

    </div>
    <div class="middle">
      <div class="title">
        会议直播
      </div>
      <div class="middle_content">
        <div class="zhibo">
          <iframe v-if="item.meetingVideoType=='0'  && item.meetingLive !== ''"
                  height="457"
                  width="812"
                  :src="item.meetingLive"
                  frameborder="0"
                  allowfullscreen />

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
      <div class="bot_content">

      </div>
    </div>
    <div class="bottom_content"
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
            <span>{{item.meetingStartTime.substring(0,11)}}</span>{{item.meetingState == 0 ? "未开始" : item.meetingState == 1 ? "直播中" : "已结束" }}
          </div>
        </div>
        <div class="zb_title">
          {{item.meetingName}}
        </div>
      </div>

    </div>
    <div class="scend_content">
      <div class="title_meet">
        会议活动
      </div>
      <div class="meet_activity">
        <div class="item"
             @click="jumpMeetDetail(item.conferenceId)"
             v-for="(item,index) in meetactivityData"
             :key="index">
          <div class="meet_img">
            <img :src="item.url"
                 alt="">
          </div>
          <div class="meet_title">
            {{item.conferenceSubject}}
          </div>
        </div>
      </div>
    </div>
    <div class="scend_content">
      <div class="title_meet">
        重磅发布
      </div>
      <div class="fb_activity">
        <div class="fb_item"
             v-for="(item,index) in heavyweight"
             :key="index">
          <!-- @click="jumpRdetail(item.id)" -->
          <div class="fb_meet_img">
            {{item.title}}
          </div>
          <div class="fb_index">
            0{{index+1}}
          </div>
        </div>
      </div>
    </div>
    <div class="scend_content"
         v-if="showtimeList.length">
      <div class="title_meet">
        精彩时刻
      </div>
      <div class="jc_meet_activity">
        <div class="jc_item"
             v-for="(item,index) in showtimeList"
             :key="index">
          <div class="jc_meet_img">
            <img :src="item.showtimeLog"
                 alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import { VTcPlayer } from 'v-tcplayer'
import { slider,slideritem } from 'vue-concise-slider'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import { getmeetLists,getmeetZhibo,getConferenceList,getShowtimeList } from '@/api/meet'
import Personal from '@/views/personal'

export default {
  name: 'MeetCurrent',
  components: {
    Personal,
    videoPlayer,
    slider,
    slideritem,
    VTcPlayer
  },
  mixins: [common],
  data () {
    return {
      options1: {
        hlsUrl: 'https://cdn.staticfile.org/hls.js/0.8.9/hls.min.js', // 0.0.5增加
        width: 812,
        height: 457,
        m3u8: '',
        poster: ''
      },
      heavyweight: [{ title: "百项国际技术交易创新项目榜单",id: 1 },{ title: "百项新技术新产品榜单",id: 3 },{ title: "百项技术转移案例",id: 6 },{ title: "应用场景典型案例",id: 6 },],
      // wiperList: [{newsCoverLog:require("../../assets/img/02.png"),newsTitle:""}],
      wiperList: [],
      listsData: [],
      meetactivityData: [],
      urlList: [{ url: require("../../assets/img/01.png") },
      { url: require("../../assets/img/02.png") },
      { url: require("../../assets/img/03.png") },
      { url: require("../../assets/img/hy04.png") },
      { url: require("../../assets/img/05.png") },
      { url: require("../../assets/img/06.png") },],
      //Slider configuration [obj]
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
      showtimeList: [],
      listsDataList: [],
      isVideo: false
    }
  },
  created () {
    this.lodingData()
    this.lodingDataZB()
    this.lodingDataHD()
    this.lodingDataZBFB()
    this.lodingDataList()
  },
  computed: {
    isIfm () {
      return this.item.videoType=='0'
    },
    player () {
      // tcPlayer实例
      return this.$refs.tcPlayer.vTcPlayer
    },
  },
  methods: {
    slide (data) {
      // this.jumpNewsDetail(this.wiperList[])

    },
    onTap (data) {
    },
    onInit (data) {
    },
    // 会议列表轮播图
    lodingData () {
      getmeetLists().then(res => {
        this.total=res.total
        this.$emit("getNewsTotal",res.total)
        this.listsData=res.rows
        let wiperData = res.rows
        wiperData =  wiperData.filter(item=>{
          return item.newsCoverLog
        })
        this.wiperList=wiperData
        console.log(wiperData,"wiperData");
        if(res.rows.length>4) {
          this.wiperList.length=4
        }
      })
    },
    // 会议列表轮播图
    lodingDataList () {
      getmeetLists().then(res => {
        this.total=res.total
        this.listsDataList=res.rows
        if(res.total>12) {
          this.listsDataList.length=12
        }
      })
    },
    //会议直播
    lodingDataZB () {
      getmeetZhibo({ conferenceYear: 2022 }).then(res => {
        // 默认展示第一条数据的直播内容
        if(res.code=='0') {
          if(res.total>0) {
            this.item=res.rows[0]
            // this.playerOptions.sources[0].src=this.item.meetingLive
            // this.playerOptions.poster=this.item.meetingLiveCover
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
    // 会议活动 只有6个
    lodingDataHD () {
      getConferenceList({ pageNum: 1,pageSize: 6 }).then(res => {
        this.meetactivityData=res.rows
        this.meetactivityData.forEach((item,index) => {
          this.$set(item,"url",this.urlList[index].url)
        });
      })
    },
    // 重磅发布
    lodingDataZBFB () {
      getShowtimeList().then(res => {
        this.showtimeList=res.rows
        // this.meetactivityData.forEach((item,index) => {
        //   this.$set(item,"url",this.urlList[index].url)
        // });
      })
    },
    jumpRdetail (id) {
      this.$router.push({
        path: "/rdetail",
        query: {
          id
        }
      })
    },
    // 会议详情
    jumpNewsDetail (item) {
      this.$router.push({
        path: "/meethall/activityDetail",
        query: {
          newsId: item.newsId
        }
      })
    },

    // 会议详情
    jumpMeetDetail (id) {
      this.$router.push({
        path: "/meethall/meetDetail",
        query: {
          id
        }
      })
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
    width: 810px;
    height: 457px;
  }
}
.slide_item {
  display: flex;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  background-attachment: fixed;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
  // span{
  //   height: 28px;
  //   line-height: 28px;
  // }

  span {
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 28px;
    line-height: 28px;
    background: rgba(27, 3, 3, 0.933);
    // opacity: 0.6;
  }
}
// ::v-deep .swiper-container-horizontal > .slider-pagination-bullets {
//     bottom: 10px !important;
//     padding-right: 21px !important;
//     width: 100%;

//     height: 28px;
// }
// ::v-deep .slider-pagination{
//   background: #333;
//   height: 20px;
//   line-height: 20px;
// }
.scend_content {
  .title_meet {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 40px 0 28px 0;
  }
  .meet_activity {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin-bottom: 20px;
      width: 49%;
      background: url("../../assets/img/dhbjtp.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      // position: relative;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #688bbe;
      .meet_img {
        width: 158px;
        height: 115px;
        margin: 41px 0 41px 22px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .meet_title {
        margin-left: 15px;
        width: 66%;
      }
    }
    .item:hover {
      margin-bottom: 20px;
      width: 49%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #fefefe;
      .meet_img {
        width: 158px;
        height: 115px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      background: url("../../assets/img/sxbhdwc.png") no-repeat;
      background-size: 100% 100%;
      box-shadow: 0px 0px 50px 0px #9dceff;
    }
  }
  .jc_meet_activity {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .jc_item {
      margin-right: 20px;
      margin-bottom: 20px;
      width: 31%;
      background: linear-gradient(90deg, #ffffff 0%);
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .jc_meet_img {
        width: 100%;
        img {
          height: 255px;
          width: 100%;
        }
      }
    }
  }

  .fb_activity {
    background: url("../../assets/img/865.png") no-repeat;
    background-size: 100% 100%;
    height: 551px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fb_item {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 551px;
      cursor: pointer;
      .fb_meet_img {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        writing-mode: vertical-lr;
        height: 303px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .fb_index {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 104px;
      }
    }
    .fb_item:hover {
      background: linear-gradient(0deg, #1875f2 0%, #37b8fa 100%);
      opacity: 0.8;
    }
  }
}
.bottom_content {
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
      white-space: nowrap;
    }
    .zb_status {
      margin-top: 13px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #1e86f9;
      white-space: nowrap;
      span {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #666666;
      }
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
.middle {
  .title {
    width: 82px;
    height: 20px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
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
      height: 100%;
    }
    .zhibodecri {
      cursor: pointer;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 4px 35px 0 24px;
      .title_cw {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 55px;
        overflow: hidden; //超出文本隐藏
        text-overflow: ellipsis; ///超出部分省略号显示
        display: -webkit-box; //弹性盒模型
        -webkit-box-orient: vertical; //上下垂直
        -webkit-line-clamp: 1; //自定义行数
      }
      .time {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        margin-bottom: 36px;
        color: #333333;
        .item_status {
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
        overflow: hidden; //超出文本隐藏
        text-overflow: ellipsis; ///超出部分省略号显示
        display: -webkit-box; //弹性盒模型
        -webkit-box-orient: vertical; //上下垂直
        -webkit-line-clamp: 1; //自定义行数
      }
      .zbdw {
        margin-bottom: 47px;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        overflow: hidden; //超出文本隐藏
        text-overflow: ellipsis; ///超出部分省略号显示
        display: -webkit-box; //弹性盒模型
        -webkit-box-orient: vertical; //上下垂直
        -webkit-line-clamp: 1; //自定义行数
      }
      .cbdw {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        overflow: hidden; //超出文本隐藏
        text-overflow: ellipsis; ///超出部分省略号显示
        display: -webkit-box; //弹性盒模型
        -webkit-box-orient: vertical; //上下垂直
        -webkit-line-clamp: 1; //自定义行数
      }
    }
  }
}
.content_top {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.content_right {
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-grow: 1;
  margin: 20px auto;
}
.current_year {
  // width: 433px;
  padding-bottom: 100px;
}

::v-deep .swiper-container-horizontal > .slider-pagination-bullets {
  bottom: 10px !important;
  padding-right: 21px !important;
  // left: -0 !important;
  width: 100%;
  display: none;
}

.slider-item {
  align-items: flex-end;
  background: #fff none repeat scroll 0 0;
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  padding-bottom: 20px;
  opacity: 1;
}

::v-deep .slider-pagination {
  // right: 21px !important;
  position: absolute;
  text-align: right;
  transform: translate3d(0px, 0px, 0px);
  transition: all 350ms ease 0s;
  z-index: 10;
}

::v-deep .swiper-container-horizontal .slider-pagination-bullet-active {
  background: #0086ff;
  opacity: 1;
}

.listdata {
  display: flex;
  justify-content: flex-start;
  // align-items: flex-start;
  // height: 317px;
  width: 100%;
  padding-left: 40px;
  flex-wrap: wrap;
}
.lists_cw {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #000;
  width: 50%;
  height: 39px;
  line-height: 39px;
  padding-right: 15px;
  div:nth-child(1) {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight:500;
    color: #333;
  }
  .time_list {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #666;
    flex-shrink: 0;
    width: 115px;
    text-align: right;
  }
}
.lists_cw::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: #eeeeee;
}

.lists_cw:hover {
  color: #1e86f9;
  cursor: pointer;
  div:nth-child(1) {
    width: 78%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*超出几行后省略号*/
    overflow: hidden;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
  }
  .time_list {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #1e86f9;
  }
}

.more {
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #999999;
  margin-bottom: 32px;
}
.if-Box {
}
.play-content {
  //height: 370px;
  ::v-deep .el-card__body {
    overflow: hidden;
  }
  .play-right {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 34px 38px 0;
    min-height: 335px;
  }

  .play-title {
    /*height: 22px;*/
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    line-height: 1.5;
  }
  .play-desc {
  }

  .play-status {
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }

  .play-right-btn {
    display: flex;
    justify-content: flex-start;
  }
  .see {
    padding: 10px 16px;
    border: 2px solid #516fd2;
    border-radius: 4px;
    font-size: 18px;
    font-weight: 400;
    color: #516fd2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .see {
    background: #516fd2;
    color: #ffffff;
    margin-right: 35px;
    .icon {
      width: 40px;
      height: 30px;
      vertical-align: -8px;
    }
  }

  .see-pd {
    margin-right: 10px;
  }
}

.detail-content {
  margin-top: 31px;
  .box-card-left {
    min-height: 700px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
    line-height: 25px;
    &:after {
      content: "";
      height: 3px;
      width: 100%;
      background: #516fd2;
      margin-top: 15px;
      display: block;
    }
  }

  ::v-deep .el-card__header {
    border-bottom: 1px solid #eeeeee;
  }

  .text-content {
    color: #333333;
    font-size: 18px;
    padding: 20px 0;
  }

  .box-card-right {
    margin-left: 12px;
    /*max-height: 700px;*/

    .inner_card {
      cursor: pointer;
      position: relative;
      margin-right: 10px;
      margin-bottom: 10px;
      .inner-title {
        font-size: 18px;
      }
      .inner-desc {
        font-size: 16px;
        font-weight: 500;
        margin: 5px auto;
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

      .play {
        position: absolute;
        left: 0;
        right: 0;
        top: 65px;
        width: 75px;
        height: 50px;
        margin: auto;
        cursor: pointer;
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

      .status::before {
        content: "";
        display: inline-block;
        margin-bottom: 2px;
        width: 6px;
        height: 6px;
        background: #76eea0;
        border-radius: 50%;
      }
    }
  }
}
</style>

