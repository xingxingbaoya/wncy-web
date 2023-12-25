<template>
  <el-main v-loading="loading">
    <el-card class="play-content" :body-style="{ padding:'15px' }">
      <el-col :span="12">
        <!--        <video-player-->
        <!--          ref="videoPlayer"-->
        <!--          class="video-player vjs-custom-skin"-->
        <!--          :playsinline="true"-->
        <!--          :options="playerOptions"-->
        <!--        />-->
        <iframe height="341" width="607" :src="item.courseContent" frameborder="0" allowfullscreen />
      </el-col>
      <el-col :span="12" class="play-right">
        <div>
          <div class="play-title">{{ item.courseName }}</div>
          <p class="play-desc">主讲老师: <span>{{ item.lecturer }}</span></p>
          <p class="play-desc">发布时间: <span>{{ item.releaseTime | formatDate }}</span></p>
        </div>
        <!--        <div class="play-right-btn">-->
        <!--          <el-button type="primary" class="see" @click="playVideo"><svg-icon icon-class="play" class-name="icon" /><span class="icon-text">点击全屏观看</span></el-button>-->
        <!--        </div>-->
      </el-col>
    </el-card>
    <el-row class="detail-content">
      <el-col :span="17">
        <el-card class="box-card-left" :body-style="{ padding: '0 20px' }">
          <div slot="header">
            <span class="box-title">课程介绍</span>
          </div>
          <div class="text-content">
            <p>{{ item.courseBrief }}</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card class="box-card-right">
          <div slot="header" class="clearfix">
            <span class="box-title">热门推荐</span>
          </div>
          <div>
            <el-row>
              <el-col v-for="(o,index) in listData" :span="24">
                <el-card :body-style="{ padding: '0px',marginBottom: '20px' }" class="inner_card" shadow="hover" @click.native="govideo(o)">
                  <img v-real-img="o.coverPhoto" :src="`${imgUrl}/course.jpg`" class="image">
                  <el-tag effect="plain" type="info" size="small">
                    {{ o.courseType == '1'?"课件":"视频" }}
                  </el-tag>
                  <img :src="`${imgUrl}/play.png`" class="play">
                  <div style="padding: 8px 10px 0 10px;">
                    <span class="inner-title">{{ o.courseName }}</span>
                    <p class="inner-desc">开始时间: {{ o.startTime }}</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import common from '@/mixin/common'
import { getActivityDetail, getActivityList } from '@/api/activitieshall'
import { getCourseDetail, getCourseList } from '@/api/talenthall'
export default {
  name: 'Talenthalldetail',
  components: {
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
          type: 'video/mp4', // 类型
          src: 'https://v.youku.com/v_show/id_XNDk3ODAwMzU2OA==.html?spm=a1z3jc.11711052.0.0&isextonly=1'
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
      item: {}
    }
  },
  methods: {
    loadData() {
      const { id } = this.$route.query
      this.loading = true
      const { pageNum } = this.pager
      const formpage = { pageNum, pageSize: 2 }
      getCourseDetail({ id }).then(res => {
        if (res.code == '0000') {
          this.item = res.obj
          this.playerOptions.sources[0].src = this.item.courseContent
          this.playerOptions.poster = this.item.coverPhoto
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading = false
        }
      )

      getCourseList({ ...formpage }).then(res => {
        if (res.code == '0000') {
          this.listData = res.rows
        } else {
          this.$message.error(res.msg)
        }
      }
      ).finally(
        () => {
          this.loading = false
        }
      )
    },
    playVideo() {
      const player = this.$refs.videoPlayer.player
      player.requestFullscreen()// 调用全屏api方法
      player.isFullscreen(true)
      player.play()
    },
    govideo({ id }) {
      this.goBlank({
        path: '/talenthall/detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .play-content{
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
      font-size: 18px;
      font-weight: 400;
      color: #999999;
    }

    .play-title {
      font-size: 24px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      margin-bottom: 50px;
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
      padding: 5px 12px;
      border: 2px solid #516FD2;
      border-radius: 4px;
      font-size: 18px;
      font-weight: 400;
      color: #516FD2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .see {
      background: #516FD2;
      color: #FFFFFF;
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
      min-height: 610px;
    }
    .box-title {
      display: inline-block;
      height: 20px;
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      line-height: 25px;
      &:after {
        content: '';
        height: 3px;
        width: 100%;
        background: #516FD2;
        margin-top: 15px;
        display: block;
      }
    }

    ::v-deep .el-card__header{
      border-bottom: 1px solid #EEEEEE;
    }

    .text-content {
      color: #333333;
      font-size: 18px;
    }

    .box-card-right{
      margin-left: 12px;
      max-height: 700px;

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
          color: #FFFFFF;
          background: #516FD2;
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
          margin: auto;
          cursor: pointer;
        }

        .el-tag--plain.el-tag--info {
          position: absolute;
          width: 64px;
          text-align: center;
          right: 11px;
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
      }
    }
  }
</style>
