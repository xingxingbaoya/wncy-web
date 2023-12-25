<template>
  <el-main v-loading="loading"
           class="content">
    <div class="play-content"
             >
      <el-col :span="15">
        <iframe v-if="item.meetingVideoType=='0'  && item.meetingLive !== ''"
                height="378"
                width="643"
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
        <div>
          <div>
            <div class="play-title">{{ item.meetingName }}</div>
            <div class="fb_time">
              发布时间：{{item.releaseTime}}
            </div>
            <!-- <el-divider /> -->
            <!-- <p class="play-desc">{{ item.actIntroduction }}</p> -->
          </div>
        </div>
      </el-col>
      <el-col :span="9"
              class="play_right_cw">
        <div class="items">
          <div class="title">
            其他视频
          </div>
          <div class="item"
               v-for="(item,index) in otherLive"
               :key="index"
               @click="govideo(item)">
            <div class="item_left">
              <img :src="item.meetingLiveCover"
                   alt="">
            </div>
            <div class="item_right">
              <div>
                {{item.meetingName}}
              </div>
              <div>
                {{item.meetingStartTime}}
              </div>
            </div>
          </div>

        </div>

      </el-col>
    </div>
    <el-row class="detail-content">
      <el-col :span="24">
        <div class="box-card-left"
                 >
          <div slot="header">
            <span class="box-title">活动详情</span>
          </div>
          <div class="text-content">
            <div class="zhibodecri">
              <div class="title_cw">
                {{item.meetingName}}
              </div>
              <div class="time">
                <div class="time_l">
                  会议时间:
                </div>
                <div class="time_r">
                  {{item.meetingStartTime}}
                </div>
              </div>
              <div class="grass">
                <div class="time_l">
                  会场：
                </div>
                <div class="time_r">
                  {{item.theVenue}}
                </div>
              </div>
              <div class="zbdw">
                <div class="time_l">
                  主办单位：
                </div>
                <div class="time_r">
                  {{item.meetingSponsor}}
                </div>
              </div>
              <div class="cbdw">
                <div class="time_l" >
                  承办单位：
                </div>
                <div class="time_r">
                  {{item.meetingUndertake}}
                </div>
              </div>
              <div >
                <div class="goods"
                     v-for="(o,index) in item.goods"
                     :key="index">
                  <div class="time_c">
                    会议时间：{{o.agendaTime}}
                  </div>
                  <div class="yiti">
                    {{o.agendaSubject}}
                  </div>
                  <div class="content_list" >
                    <div class="content_d" v-for="(int,index) in o.content" :key="index">
                      {{int}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_items">
              <div class="item_ev"
                   v-if="item.meetingProceedings">
                <img src="../../assets/img/tcw15.png"
                     alt="">
                <div>
                  <a :href="item.meetingProceedings">电子会刊</a>
                </div>
              </div>
              <div class="item_ev"
                   v-if="item.meetingPpt">
                <img src="../../assets/img/tcw16.png"
                     alt="">
                <div>

                  <a :href="item.meetingPpt">PPT下载</a>
                </div>
              </div>
              <div class="item_ev"
                   v-if="item.meetingTxt">
                <img src="../../assets/img/tcw17.png"
                     alt="">
                <div>
                  <a :href="item.meetingTxt">电子文件</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </el-col>
      <!--      <el-col :span="7">-->
      <!--        <el-card class="box-card-right">-->
      <!--          <div slot="header" class="clearfix">-->
      <!--            <span class="box-title">热门推荐</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <el-row>-->
      <!--              <el-col v-for="(o,index) in listData" :span="24">-->
      <!--                <el-card :body-style="{ padding: '0px',marginBottom: '20px' }" class="inner_card" shadow="hover" @click.native="govideo(o)">-->
      <!--                  <img :src="`${imgUrl}/activity4.jpg`" v-real-img="o.actCover" class="image">-->
      <!--                  <el-tag effect="plain" type="info" size="small" :class="{'status': o.actStatus == 'started'}">-->
      <!--                    {{ o.actStatus == 'started'?"直播中":"回放" }}-->
      <!--                  </el-tag>-->
      <!--                  <img :src="`${imgUrl}/play.png`" class="play">-->
      <!--                  <div style="padding: 8px 10px 0 10px;">-->
      <!--                    <span class="inner-title">{{ o.actName }}</span>-->
      <!--                    <p class="inner-desc">开始时间: {{ o.startTime }}</p>-->
      <!--                  </div>-->
      <!--                </el-card>-->
      <!--              </el-col>-->
      <!--            </el-row>-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>
  </el-main>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { VTcPlayer } from 'v-tcplayer'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import { getActivityDetail,getActivityList } from '@/api/activitieshall'
import { getMeetingAgendaList } from '@/api/meet'

export default {
  name: 'MeetLive',
  components: {
    videoPlayer,
    VTcPlayer
  },
  mixins: [common],
  data () {
    return {
      options1: {
        hlsUrl: 'https://cdn.staticfile.org/hls.js/0.8.9/hls.min.js', // 0.0.5增加
        width: 643,
        height: 378,
        m3u8: '',
        poster: ''
      },
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
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
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
      listData: [],
      item: {},
      otherLive: [],
      isIfm: false,
      isVideo: false
    }
  },
  computed: {
    isIfm () {
      debugger
      return this.item.meetingVideoType==='0'
    },
    player () {
      // tcPlayer实例
      return this.$refs.tcPlayer.vTcPlayer
    },
  },
  created () {
    // this.loadData()
  },
  methods: {
    loadData (liveId) {
      // const { id }=this.$route.query
      let id=liveId? liveId:this.$route.query.id
      // this.loading=true
      // const { pageNum }=this.pager
      // const formpage={ pageNum,pageSize: 4 }
      getMeetingAgendaList(id).then(res => {
        if(res.code=='0000') {
          let goods = res.obj.goods
          goods.forEach(t=>{
            t.content = t.content.split('<br>')
          });
          this.item=res.obj
          if(!liveId) {
            if(res.obj.otherLive.length>3) {

              this.otherLive.length=3
            } else {
              this.otherLive=res.obj.otherLive
            }
          }
          if(!this.isIfm) {
            this.options1.poster=this.item.meetingLiveCover
            this.options1.m3u8=this.item.meetingLive
            this.isVideo=!this.isIfm
          }
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading=false
        }
      )

      // getActivityList({ upType: 'video',...formpage }).then(res => {
      //   if(res.code=='0000') {
      //     this.listData=_.filter(res.rows,item => item.actId!=id)
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // }
      // ).finally(
      //   () => {
      //     this.loading=false
      //   }
      // )
    },
    playVideo () {
      const player=this.$refs.videoPlayer.player
      player.requestFullscreen()// 调用全屏api方法
      player.isFullscreen(true)
      player.play()
    },
    govideo ({ meetingId }) {
      this.goBlank({
        path: '/meethall/meetLive',
        query: {
          id: meetingId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content_items {
  justify-self: flex-start;
  display: flex;
  align-items: center;
  margin-left: 46px;
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
    a{
      color: #1e86f9;
    }
  }
}
.goods {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 36px;
  .time_c {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    margin: 0 67px 0 0px;
    white-space: nowrap;
  }
  .yiti {
    // overflow: hidden; //超出文本隐藏
    // text-overflow: ellipsis; ///超出部分省略号显示
    // display: -webkit-box; //弹性盒模型
    // -webkit-box-orient: vertical; //上下垂直
    // -webkit-line-clamp: 1; //自定义行数
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    margin-right: 20px;
    width: 240px;
    line-height: 1.6;
  }
  .content_list{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333;
    width: 70%;
  }
  .content_d {
    margin: 10px 0;
    line-height: 1.6;
  }
}
.noStart {
  img {
    width: 643px;
    height: 378px;
  }
}
.zhibodecri {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 0 0 0px;
  .title_cw {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 36px 0;
  }
  .time {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    margin-bottom: 36px;
    color: #333333;
    display: flex;
    align-items: center;

    .time_l{
      line-height: 1.5;
      width: 100px;
      white-space: nowrap;
    }
    .time_r{
      line-height: 1.5;

    }
  }
  .grass {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    margin-bottom: 36px;
    color: #333333;
    display: flex;
    align-items: center;

    .time_l{
      width: 100px;
      white-space: nowrap;
      line-height: 1.5;

    }
    .time_r{
      line-height: 1.5;

    }
  }
  .zbdw {
    margin-bottom: 36px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    display: flex;
    align-items: center;

    .time_l{
      width: 100px;
      white-space: nowrap;
      line-height: 1.5;

    }
    .time_r{
      line-height: 1.5;

    }
  }
  .cbdw {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    .time_l{
      width: 100px;
      white-space: nowrap;
      line-height: 1.5;

    }
    .time_r{
      line-height: 1.5;

    }

  }
}
.play_right_cw {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
  padding-bottom: 60px;
}
.items {
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  .title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    position: relative;
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
  .title::after {
    content: "";
    position: absolute;
    top: 30px;
    left: 0;
    bottom: 0px;
    right: 0;
    width: 100%;
    height: 1px;
    background-color: #eeeeee;
  }
  .item {
    cursor: pointer;
    display: flex;
    margin-bottom: 22px;
    align-self: flex-start;
    .item_left {
      img {
        width: 147px;
        height: 90px;
      }
    }
    .item_right {
      padding-left: 12px;
      div:nth-child(1) {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis; // text-overflow css3的属性，当文本溢出时，显示省略号
        display: -webkit-box;
        -webkit-line-clamp: 2; // 设置两行文字溢出
        -webkit-box-orient: vertical;
        margin-top: 10px;
      }
      div:nth-child(2) {
        margin-top: 19px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
.content {
  margin-top: 120px;
}
.play-content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
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

  .play-desc {
    /*min-height: 200px;*/
  }

  .play-title {
    /*height: 22px;*/
    // font-size: 28px;
    // font-weight: 600;
    // color: #333333;
    // line-height: 1.5;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 25px 0 33px;
  }
  .fb_time {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #7a7f91;
    margin: 25px 0 32px;
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
    /*width: 205px;*/
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
  .box-card-left {
    min-height: 700px;
    background: #fff;
    padding: 34px calc((100% - 1245px) / 2) 38px;
  }
  .box-title {
    display: inline-block;
    height: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #1e86f9;
    line-height: 25px;
    &:after {
      content: "";
      height: 3px;
      width: 100%;
      background: #1e86f9;
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
