<template>
  <el-main class="main-layout">
    <el-row class="m-top">
      <div class="left-m">
        <img v-real-img="item.congressAvatar" :src="`${imgUrl}/ss2.jpg`" alt="" class="l-img">
      </div>
      <div class="right-m">
        <p class="r-title">{{ item.congressSubject }}</p>
        <p class="r-desc">{{ item.congressOverview }}</p>
      </div>
    </el-row>

    <!--    <el-row class="m-live">-->
    <!--      <el-card class="m-card" shadow="never" :body-style="{ padding: '40px 0 0' }">-->
    <!--        <div slot="header" class="clearfix">-->
    <!--          <span class="title">会议直播</span>-->
    <!--          <el-button class="more" type="text" @click="goactives">查看更多<i class="el-icon-arrow-right" /></el-button>-->
    <!--        </div>-->

    <!--        <el-row>-->
    <!--          <el-col :span="16" class="play-lauyout">-->
    <!--            <el-tag effect="plain" type="info" size="small" :class="{'status': liveList.firstLive &&liveList.firstLive.status == '1'}">-->
    <!--              {{ formatLiveStatus(liveList.firstLive &&liveList.firstLive.status)}}-->
    <!--            </el-tag>-->
    <!--            <iframe v-if="liveList.firstLive && liveList.firstLive.videoType == 0" width="100%" height="476" :src="liveList.firstLive &&liveList.firstLive.liveUrl" frameborder=0 allowfullscreen/>-->
    <!--            <video-player-->
    <!--              v-else-->
    <!--              ref="videoPlayer"-->
    <!--              class="video-player1 vjs-custom-skin"-->
    <!--              :playsinline="true"-->
    <!--              @play="onPlayerPlay($event)"-->
    <!--              :options="playerOptions"-->
    <!--            />-->
    <!--          </el-col>-->
    <!--          <el-col :span="8" class="rplay-layout">-->
    <!--              <el-col :span="24" class="play-lauyout1">-->
    <!--                <el-tag effect="plain" type="info" size="small" :class="{'status': liveList.secondLive && liveList.secondLive.status == '1'}">-->
    <!--                  {{ formatLiveStatus(liveList.secondLive &&liveList.secondLive.status) }}-->
    <!--                </el-tag>-->
    <!--                <iframe width="100%" height="231" v-if="liveList.secondLive && liveList.secondLive.videoType == 0" :src="liveList.secondLive &&liveList.secondLive.liveUrl" frameborder=0 allowfullscreen/>-->
    <!--                <video-player-->
    <!--                  v-else-->
    <!--                  ref="videoPlayer1"-->
    <!--                  class="video-player2 vjs-custom-skin"-->
    <!--                  :playsinline="true"-->
    <!--                  :options="playerOptions1"-->
    <!--                />-->
    <!--              </el-col>-->
    <!--              <el-col :span="24" class="play-lauyout2">-->
    <!--                <el-tag effect="plain" type="info" size="small" :class="{'status': liveList.thirdLive && liveList.thirdLive.status == '1'}">-->
    <!--                  {{ formatLiveStatus(liveList.thirdLive &&liveList.thirdLive.status) }}-->
    <!--                </el-tag>-->
    <!--                <iframe  width="100%" height="231" v-if="liveList.thirdLive && liveList.thirdLive.videoType == 0" :src="liveList.thirdLive &&liveList.thirdLive.liveUrl" frameborder=0 allowfullscreen/>-->
    <!--                <video-player-->
    <!--                  v-else-->
    <!--                  ref="videoPlayer2"-->
    <!--                  class="video-player3 vjs-custom-skin"-->
    <!--                  :playsinline="true"-->
    <!--                  :options="playerOptions2"-->
    <!--                />-->
    <!--              </el-col>-->
    <!--          </el-col>-->
    <!--        </el-row>-->

    <!--      </el-card>-->
    <!--    </el-row>-->

    <el-row class="m-meet">
      <el-card class="m-card" shadow="never" :body-style="{ padding: '40px 0 0' }">
        <div slot="header" class="clearfix">
          <span class="title">会议议程</span>
        </div>
        <div class="meet-tab" :class="{'line-after': isThirdHide }">
          <el-tabs v-model="activeSecondTab" type="card">
            <el-tab-pane v-for="(item,index) in listData" :label="item.meetTime" :name="index">
              <el-row>
                <el-col v-for="it in item.forum" class="s-layout" :span="12" @click.native="showDetail(it)">
                  <div class="s-meet">
                    <div class="s-color">
                      <span class="s-time">{{ it.startTime | formatMeetTime }} - {{ it.endTime | formatMeetTime }}</span>
                    </div>
                    <div class="s-title">
                      <span class="s-tit">{{ it.subject }}</span>
                    </div>
                    <div class="s-bot">
                      <p class="bot-t">主办单位：{{ it.sponsor }}</p>
                      <p class="bot-t">会场：{{ it.theVenue }}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-row>

    <el-row class="m-expert">
      <el-card class="m-card" shadow="never" :body-style="{ padding: '40px 0 0' }">
        <div slot="header" class="clearfix">
          <span class="title">会议嘉宾</span>
          <el-button class="more" type="text" @click="goguest">查看更多<i class="el-icon-arrow-right" /></el-button>
        </div>
        <el-row>
          <el-col v-for="item in listGuest" class="c-layout" @click.native="godetail(item)">
            <div class="c-bg">
              <div class="c-color">
                <img v-real-img="item.avatar" :src="`${imgUrl}/manger.jpg`" alt="" class="c-avatar">
              </div>
              <div class="c-bot">
                <p class="bot-title">{{ item.guestsName }}</p>
                <p class="bot-desc">{{ item.overview }}</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>

    <el-dialog
      :visible.sync="meetVisable"
      custom-class="sign-log"
      width="1135px"
      top="8vh"
    >
      <el-row v-loading="loading" class="dialog-layout">
        <p class="title"><span class="t-con">{{ meetInfo.subject }}</span></p>
        <p class="f-title">基本信息</p>
        <el-divider><img class="m3" :src="`${imgUrl}/m3.png`" alt=""></el-divider>
        <el-row class="m-info">
          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md1.png`" alt="md1" class="image"><span class="m-t">会场：</span><span class="m-desc">{{ meetInfo.theVenue }}</span>
          </el-col>
          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md2.png`" alt="md2" class="image"><span class="m-t">主办单位：</span><span class="m-desc">{{ meetInfo.sponsor }}</span>
          </el-col>

          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md3.png`" alt="md3" class="image"><span class="m-t">承办单位：</span><span class="m-desc">{{ meetInfo.undertake | formatEmpty }}</span>
          </el-col>

          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md4.png`" alt="md4" class="image"><span class="m-t">协办单位：</span><span class="m-desc">{{ meetInfo.assistance | formatEmpty }}</span>
          </el-col>

          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md5.png`" alt="md5" class="image"><span class="m-t">支持单位：</span><span class="m-desc">{{ meetInfo.support | formatEmpty }}</span>
          </el-col>
          <el-col :span="12" class="info-layout">
            <img :src="`${imgUrl}/md6.png`" alt="md6" class="image"><span class="m-t">时间：</span><span class="m-desc">{{ meetInfo.startTime + ' - ' + meetInfo.endTime }}</span>
          </el-col>

        </el-row>
        <p class="f-title">会议议程</p>
        <el-divider><img class="m3" :src="`${imgUrl}/m3.png`" alt=""></el-divider>
        <el-row class="c-bottom">
          <el-table
            :data="tableData"
            height="500"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="agendaTime"
              label="会议时间"
              header-align="center"
              :show-overflow-tooltip="true"
              width="270"
            />
            <el-table-column
              prop="agendaSubject"
              label="会议主题"
              align="center"
            />

            <el-table-column
              prop="content"
              header-align="center"
              label="会议内容"
              align="left"
              width="570"
            />

          </el-table>

        </el-row>
      </el-row>
    </el-dialog>
  </el-main>

</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import { findAllGuest, findAllLiving, getAgendaAll, getStatistics, getTwoAll } from '@/api/home'
import Personal from '@/views/personal'

export default {
  name: 'Meet',
  components: {
    Personal,
    videoPlayer
  },
  mixins: [common],
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL', // 类型
          src: ''
        }],
        poster: `https://pic.zgc-tattt.com/file/zgcimg/meet1.jpg`, // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      playerOptions1: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL', // 类型
          src: ''
        }],
        poster: `https://pic.zgc-tattt.com/file/zgcimg/meet2.jpg`, // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      playerOptions2: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL', // 类型
          src: ''
        }],
        html5: { hls: { withCreadentials: false }},
        poster: `https://pic.zgc-tattt.com/file/zgcimg/meet3.jpg`, // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      },
      listData: [],
      listGuest: [],
      tableData: [],
      item: {},
      firstLive: {},
      secondLive: {},
      thirdLive: {},
      meetInfo: {},
      activeSecondTab: 0,
      meetVisable: false,
      isThirdHide: false,
      liveList: {}
    }
  },
  methods: {
    loadData() {
      const { congressId } = this.$route.query
      getTwoAll({ congressId }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj.congress
          this.listData = res.obj.includeData
          if (this.listData.length < 3) {
            this.listData.push({ meetTime: '' })
            this.isThirdHide = true
          }
          console.log(this.listData)
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 10 }
      findAllGuest({ ...formpage, congressId }).then(res => {
        if (res.code == '0000') {
          this.listGuest = res.rows
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
      // findAllLiving({...formpage,congressId}).then(res => {
      //   if (res.code == '0000') {
      //     console.log(res.obj,'res.rowsres.rows')
      //     this.firstLive = _.head(res.obj) ?? {}
      //     this.$set(this.liveList,'firstLive',this.firstLive)
      //     this.secondLive = _.nth(res.obj, 1) ?? {}
      //     this.$set(this.liveList,'secondLive',this.secondLive)
      //     this.thirdLive = _.last(res.obj) ?? {}
      //     this.$set(this.liveList,'thirdLive',this.thirdLive)
      //
      //     if (this.firstLive && this.firstLive.videoType == 1){
      //       this.playerOptions.sources[0].src = this.firstLive.liveUrl
      //       this.playerOptions.poster = this.firstLive.liveCover ?? `${this.imgUrl}/meet1.jpg`
      //     } else {
      //       this.onPlayerPlay()
      //     }
      //
      //     if (this.secondLive && this.secondLive.videoType == 1){
      //       this.playerOptions1.sources[0].src = this.secondLive.liveUrl
      //       this.playerOptions1.poster = this.secondLive.liveCover ?? `${this.imgUrl}/meet2.jpg`
      //     }
      //
      //     if (this.thirdLive && this.thirdLive.videoType == 1){
      //       this.playerOptions2.sources[0].src = this.thirdLive.liveUrl
      //       this.playerOptions2.poster = this.thirdLive.liveCover ?? `${this.imgUrl}/meet3.jpg`
      //     }
      //
      //   } else {
      //     this.$message.warning(res.msg)
      //   }
      // }).finally(() => {
      //   this.loading = false
      // })
    },
    showDetail({ forumId }) {
      getAgendaAll({ forumId }).then(res => {
        if (res.code == '0000') {
          this.tableData = res.obj.list
          this.meetInfo = res.obj.homeTwoForum
          this.meetVisable = true
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    onPlayerPlay() {
      getStatistics({
        'businessId': this.firstLive.forumId,
        'pageType': 'player'
      }).catch(error => {
        console.log(error)
      })
    },
    goguest() {
      const { congressId } = this.$route.query
      this.goBlank({
        path: '/guest',
        query: {
          congressId
        }
      })
    },
    godetail({ id }) {
      this.goBlank({
        path: '/gdetail',
        query: {
          id
        }
      })
    },
    goactives() {
      this.goBlank({
        path: '/activitieshall/more',
        query: {
          actClassification: 'ssb'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.if-Box {
  iframe {
    width: 100%;
    height: 476px;
  }
}

.if-Box1 {
  iframe {
    width: 100%;
    height: 231px;
  }
}

.main-layout {
  //background-color: #FFFFFF;
}
  .m-top {
    position: relative;
    height: 403px;
    .left-m {
      position: absolute;
      left: 0;
      top: 24px;
      .l-img {
        width: 636px;
        height: 355px;
        object-fit: cover;
      }
    }

    .right-m {
      position: absolute;
      top: 0;
      right: 0;
      height: 403px;
      width: 874px;
      background-image: url($backgroundImgURL + "/meet1.png");
      background-size: cover;
      background-repeat:no-repeat;
      padding-left: 26px;
      padding-right: 26px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      .r-title {
        height: 27px;
        font-size: 28px;
        font-weight: 600;
        color: #333333;
        line-height: 32px;
        text-align: center;
        width: 559px;
      }

      .r-desc {
        text-align: center;
        height: 81px;
        font-size: 20px;
        font-weight: 400;
        color: #666666;
        line-height: 30px;
        width: 559px;
      }
    }

  }

  .m-live {
    margin-top: 60px;
    .m-card {
      background-color: transparent;
      .title {
        font-size: 30px;
        font-weight: bold;
        color: #01296C;
        line-height: 8px;
        display: inline-block;
        position: relative;
        &:before {
          position: absolute;
          left: 2px;
          bottom: -30px;
          content: 'LIVE MEETING';
          font-size: 12px;
          color: #01296C;
        }
        &:after {
          position: absolute;
          display: block;
          left: 2px;
          bottom: -27px;
          width: 343px;
          height: 32px;
          content: '';
          background-image: url($backgroundImgURL + "/meet2.png");
        }
      }
      .more {
        color: #999999;
        font-size: 18px;
        float: right;
        padding: 3px 0;
        i {
          font-weight: 600;
        }
      }

      ::v-deep .el-card__header {
        padding: 18px 0;
      }

      ::v-deep .el-tag--plain.el-tag--info {
        position: absolute;
        z-index: 99;
        width: 64px;
        text-align: center;
        right: 22px;
        top: 7px;
        color: #FFFFFF;
        background-color: rgba(0,0,0,.3);
        border-radius: 12px;
        border: 1px solid #FFFFFF;
      }

      .status::before{
        content: '';
        display: inline-block;
        margin-bottom: 2px;
        width: 6px;
        height: 6px;
        background: #76EEA0;
        border-radius: 50%;
      }
      .play-lauyout {
        padding-right: 10px;
        position: relative;
        ::v-deep .video-player.video-player1.vjs-custom-skin {
          height: 476px;
        }
      }
      .m-live .m-card .play-lauyout .video-player {
        height: 466px;
      }
      .rplay-layout {

      }

      .play-lauyout1 {
        position: relative;
        padding-bottom: 10px;
      }

      .play-lauyout2 {
        position: relative;
      }

      ::v-deep .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3 {
        height: 100%;
      }
    }
  }

  .m-meet {
    margin-top: 60px;
    .m-card {

      background-color: transparent;

      .title {
        font-size: 30px;
        font-weight: bold;
        color: #01296C;
        line-height: 8px;
        display: inline-block;
        position: relative;
        width: 150px;

        &:before {
          position: absolute;
          left: 2px;
          bottom: -30px;
          content: 'THE MEETING AGENDA';
          font-size: 12px;
          color: #01296C;
        }

        &:after {
          position: absolute;
          display: block;
          left: 2px;
          bottom: -27px;
          width: 343px;
          height: 32px;
          content: '';
          background-image: url($backgroundImgURL + "/meet2.png");
        }
      }

      .more {
        color: #999999;
        font-size: 18px;
        float: right;
        padding: 3px 0;

        i {
          font-weight: 600;
        }
      }

      ::v-deep .el-card__header {
        padding: 18px 0;
      }

      .meet-tab {
        //padding: 36px calc((100% - 1245px)/2);
        ::v-deep .el-tabs__item {
          //margin-right: 140px;
          font-size: 22px;
          font-weight: 400;
          width: 326px;
          height: 71px;
          line-height: 71px;
          color: #999999;
          background-image: url($backgroundImgURL + "/meet5.png");
          background-size: cover;
          background-repeat:no-repeat;
          padding: 0 25px !important;
          text-align: center;
          border: none;
          position: relative;
          &.is-active {
            color: #FFFFFF;
            background-image: url($backgroundImgURL + "/meet6.png");
            background-size: cover;
            background-repeat:no-repeat;

            &:before {
              position: absolute;
              z-index: 99;
              display: block;
              left: 136px;
              bottom: -50px;
              width: 60px;
              height: 31px;
              content: '';
              background-image: url($backgroundImgURL + "/meet7.png");
            }
          }

          &:nth-child(1):after {
            position: absolute;
            display: block;
            right: -100px;
            top: 35px;
            width: 62px;
            height: 3px;
            background: #DDDDDD;
            content: '';
          }

          &:nth-child(2):after {
            position: absolute;
            display: block;
            right: -100px;
            top: 35px;
            width: 62px;
            height: 3px;
            background: #DDDDDD;
            content: '';
          }
        }

        ::v-deep .el-tabs__nav-wrap,::v-deep .el-tabs__nav-scroll {
          //overflow-y: auto;
          height: 130px;
        }

        ::v-deep .el-tabs--card>.el-tabs__header {
          border-bottom: none;
        }

        ::v-deep .el-tabs__nav-wrap::after {
          height: 0;
        }

        ::v-deep .el-tabs__header {
          //background-color: #FFFFFF;
          //padding: 0 34px;
          //padding-bottom: 60px;
        }

        ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
          border: none;
        }

        ::v-deep .el-tabs__nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .s-layout {
          cursor: pointer;
          margin-bottom: 16px;
          .s-meet {
            cursor: pointer;
            position: relative;
            background-image: url($backgroundImgURL + "/meet8.png");
            background-size: cover;
            background-repeat:no-repeat;
            height: 176px;
            .s-color {
              display: flex;
              align-items: center;
              justify-content: center;
              .s-time {
                font-size: 16px;
                font-weight: 400;
                color: #FFFFFF;
              }
              background-image: url($backgroundImgURL + "/meet9.png");
              background-size: cover;
              background-repeat:no-repeat;
              position: absolute;
              top: 34px;
              left: 0;
              width: 148px;
              height: 36px;
            }

            .s-title {
              position: absolute;
              top: 34px;
              left: 167px;
              width: 400px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .s-tit {
                display: inline-block;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 20px;
                font-weight: 400;
                color: #01296C;
              }
            }

            .s-bot{
              position: absolute;
              bottom: 30px;
              left: 51px;
              width: 520px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;

              .bot-t {
                width: 100%;
                font-size: 16px;
                font-weight: 400;
                color: #666666;
                margin: 7px 0;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
              }

            }
          }

        }
      }

      .line-after {
        ::v-deep .el-tabs__item {
          &:nth-child(2):after{
            visibility: hidden;
          }
          &:last-child {
            visibility: hidden;
          }
        }
      }

    }
  }

  .m-expert {
    margin-top: 60px;
    .m-card {
      background-color: transparent;
      .title {
        font-size: 30px;
        font-weight: bold;
        color: #01296C;
        line-height: 8px;
        min-width: 200px;
        display: inline-block;
        position: relative;
        &:before {
          position: absolute;
          left: 2px;
          bottom: -30px;
          content: 'MEETING THE GUEST';

          font-size: 12px;
          color: #01296C;
        }
        &:after {
          position: absolute;
          display: block;
          left: 2px;
          bottom: -27px;
          width: 343px;
          height: 32px;
          content: '';
          background-image: url($backgroundImgURL + "/meet2.png");
        }
      }
      .more {
        color: #999999;
        font-size: 18px;
        float: right;
        padding: 3px 0;
        i {
          font-weight: 600;
        }
      }

      ::v-deep .el-card__header {
        padding: 18px 0;
      }

      .c-bg:hover .c-color,.c-bg:hover .c-bot {
        background-color: #046BB8;
      }

      .c-layout {
        width: 20%;
        cursor: pointer;
        margin-bottom: 16px;

        .c-bg {
          cursor: pointer;
          position: relative;
          background-image: url($backgroundImgURL + "/meet3.png");
          background-size: 100%;
          background-repeat:no-repeat;
          height: 351px;

          &:hover{
            .c-color,.c-bot{
              background-color: #046BB8;
            }
          }

          &:hover .c-bot {
            .bot-desc,.bot-title {
              color: #FFFFFF;
            }
          }

          .c-color {
            position: absolute;
            top: 10px;
            left: 10px;

            width: 226px;
            height: 215px;
          }
          .c-avatar {
            width: 218px;
            height: 206px;
            margin-left: 4px;
            margin-top: 4px;
            object-fit: cover;
          }

          .c-bot{
            position: absolute;
            bottom: 9px;
            left: 10px;
            display: flex;
            width: 226px;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .bot-title {
              font-size: 18px;
              font-weight: 600;
              color: #333333;
              line-height: 22px;
              width: 208px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .bot-desc {
              margin: 0 0 15px 0;
              text-align: center;
              width: 208px;
              font-size: 14px;
              font-weight: 500;
              color: #333333;
              line-height: 22px;
              min-height: 45px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;

            }
          }
        }
      }

    }
  }

  .dialog-layout {
    .title {
      margin: 0 auto;
      font-size: 28px;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }

    .f-title {
      font-size: 21px;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-top: 42px;
      margin-bottom: 7px;
    }

    ::v-deep .el-divider--horizontal {
      margin-top: 0;
    }

    .t-con {
      display: inline-block;
      position: relative;
      &:before {
        position: absolute;
        display: block;
        top: 50%;
        margin-top: -4;
        left: -69px;
        width: 59px;
        height: 8px;
        content: '';
        background-image: url($backgroundImgURL + "/m1.png");
      }

      &:after {
        position: absolute;
        display: block;
        top: 50%;
        margin-top: -4;
        right: -69px;
        width: 59px;
        height: 8px;
        content: '';
        background-image: url( $backgroundImgURL + "/m2.png");
      }
    }

    .m-info {
      margin: 60px 0;

      .info-layout {
        display: flex;
        align-items: flex-start;
        margin-bottom: 36px;
        //height: 36px;
        &:first-child{
          //margin-bottom: 14px;
          //height: 36px;
        }

        &:nth-child(2){
          //margin-bottom: 14px;
          //height: 36px;
        }

        .image {
          width: 18px;
          height: 22px;
          margin-right: 15px;
        }
        .m-t {
          display: inline-block;
          height: 22px;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          color: #333333;
        }
        .m-desc {
          display: inline-block;
          height: 80px;
          width: 419px;
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
          color: #333333;
        }
      }
    }

    .c-bottom {
      margin-top: 50px;
      ::v-deep .el-table th {
        background-color: #516FD2;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: 600;
      }

      ::v-deep .el-table td, .el-table th.is-leaf {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
      }
      ::v-deep .el-table--border td,::v-deep .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
        border-right: 2px solid #FFFFFF;
      }

      ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #F2F2F2;
      }

      ::v-deep .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        padding-left: 20px;
      }
    }

  }
  ::v-deep .el-dialog__header {
    //padding: 0;
  }

  ::v-deep .el-dialog__body {
    padding: 30px;
    //height: 900px;
    overflow: auto;
  }

  ::v-deep .el-dialog__headerbtn .el-dialog__close {
    color: #516FD2;
    font-size: 30px;
    font-weight: 600;
  }

  ::v-deep .el-dialog__headerbtn {
    font-size: 30px;
  }

</style>
