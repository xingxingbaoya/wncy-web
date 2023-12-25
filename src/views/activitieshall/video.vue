<template>
  <el-main v-loading="loading"
           class="content">
    <el-card class="play-content"
             shadow="never"
             :body-style="{ padding:'15px' }">
      <div class="denggao" >
        <el-col :span="16">
          <iframe v-if="isIfm"
                  height="515"
                  width="690"
                  :src="item.videoUrl"
                  frameborder="0"
                  allowfullscreen />
          <VTcPlayer v-if="isVideo" ref="tcPlayer" :options="options" />
<!--                    <video-player v-else-->
<!--                        ref="videoPlayer"-->
<!--                        class="video-player vjs-custom-skin"-->
<!--                        :playsinline="true"-->
<!--                        :options="playerOptions" />-->
          <div>
            <div>
              <div class="play-title">{{ item.actName }}</div>
              <div class="fb_time">
                发布时间：{{item.createTime}}
              </div>
              <!-- <el-divider /> -->
              <!-- <p class="play-desc">{{ item.actIntroduction }}</p> -->
            </div>
          </div>
        </el-col>
        <el-col :span="8"
                class="play_right_cw">
          <div class="items">
            <div class="title">
              推荐视频
            </div>
            <div class="item"
                 @click="govideo(item)"
                 v-for="(item,index) in actList"
                 :key="index">
              <div class="item_left">
                <img :src="item.actCover"
                     alt="">
              </div>
              <div class="item_right">
                <div>
                  {{item.actName}}
                </div>
                <div>
                  {{item.createTime}}
                </div>
              </div>
            </div>

          </div>

          <!-- <div v-show="!isIfm"
             class="play-right-btn">
          <el-button type="primary"
                     class="see"
                     @click="playVideo">
            <svg-icon icon-class="play"
                      class-name="icon" /><span class="icon-text">点击全屏观看</span></el-button>
        </div> -->
        </el-col>
      </div>

    </el-card>
    <el-row class="detail-content">
      <el-col :span="24">
        <el-card class="box-card-left"
                 shadow="never"
                 :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">活动详情</span>
          </div>
          <div class="text-content"
               v-html="item.actDetail" />
        </el-card>
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
import { VTcPlayer } from 'v-tcplayer'
// import { videoPlayer } from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'
// import 'videojs-contrib-hls'
import common from '@/mixin/common'
import { getActivityDetail,getActivityList } from '@/api/activitieshall'
export default {
  name: 'Activitieshallvideo',
  components: {
    // videoPlayer,
    VTcPlayer
  },
  mixins: [common],
  data() {
    return {
      options: {
        hlsUrl: 'https://cdn.staticfile.org/hls.js/0.8.9/hls.min.js', // 0.0.5增加
        width: 737,
        height: 441,
        m3u8: '',
        poster:''
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
      isVideo: false
    }
  },
  computed: {
    player() {
      // tcPlayer实例
      return this.$refs.tcPlayer.vTcPlayer
    },
    isIfm () {
      return this.item.videoType=='0'
    }
  },
  methods: {
    loadData () {
      const { id }=this.$route.query
      this.loading=true
      const { pageNum }=this.pager
      const formpage={ pageNum,pageSize: 4 }
      getActivityDetail({actId:id}).then(res => {
        if(res.code=='0000') {
          this.item=res.obj
          // this.playerOptions.sources[0].src=this.item.videoUrl
          // this.playerOptions.poster=this.item.actCover

          // this.$nextTick(()=>{
          //   this.options.poster=this.item.actCover
          //   this.options.m3u8=this.item.videoUrl
          // })
          // this.$set(this.options, 'poster',this.item.actCover)
          // this.$set(this.options, 'm3u8',this.item.videoUrl)
          // this.player.load(this.item.videoUrl)
          if (!this.isIfm){
              this.options.poster=this.item.actCover
              this.options.m3u8=this.item.videoUrl
              this.isVideo = !this.isIfm
          }
          this.actList=res.obj.actList.filter((item=>{
            return item.actId !==res.obj.actId
          }))
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading=false
        }
      )

      getActivityList({ upType: 'video',...formpage }).then(res => {
        if(res.code=='0000') {
          this.listData=_.filter(res.rows,item => item.actId!=id)
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading=false
        }
      )
    },
    playVideo () {
      const player=this.$refs.videoPlayer.player
      player.requestFullscreen()// 调用全屏api方法
      player.isFullscreen(true)
      player.play()
    },
    govideo ({ actId: id,actStatus }) {
      if(actStatus=='started') {
        this.goBlank({
          path: '/activitieshall/live',
          query: {
            id
          }
        })
      } else {
        this.goBlank({
          path: '/activitieshall/video',
          query: {
            id
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.play_right_cw {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
}
.items {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding-left: 20px;
  .title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    text-align: center;
    width: 100%;
    margin: 19px 0;
  }
  .item {
    display: flex;
    margin-bottom: 22px;
    cursor: pointer;
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
    .item_right:hover {
      padding-left: 12px;
      div:nth-child(1) {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #516fd2;
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
.denggao{
  display: flex;
  align-items: flex-start;
  background: #fff;
}
.content {
}
.play-content {
  padding: 100px calc((100% - 1245px) / 2) 0;
  background: #f8f9fc;
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
  padding: 0 calc((100% - 1245px) / 2) 0;
  background: #fff;
  margin-top: 31px;
  .box-card-left {
    min-height: 700px;
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
