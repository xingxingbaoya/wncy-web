<template>
  <el-main v-loading="false">
    <el-row class="search-area">
      <span class="search-text-cw">技术转移行业活动发布大厅</span>
      <el-input
        v-model="searchData.title"
        prefix-icon="el-icon-search"
        placeholder="输入咨询关键词，进行搜索"
        class="input-search"
      >
        <el-button class="search-btn" slot="append" @click="gomore()">
          <span class="icon-text-cw">搜索</span>
        </el-button>
      </el-input>
      <div class="filter-box">
        <img src="~img/projectManage/project-search.png" />
        <p>当前位置：首页 > 所有项目</p>
        <div class="filter-box-content">
          <div class="left-classify">
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动类型：</div>
              <div v-for="tech in activityTypeDict" :key="tech.id">
                <div
                  class="left-classify-item-option"
                  :class="searchData.proPatentInfo == tech.id ? 'active' : ''"
                  @click="searchData.proPatentInfo = tech.id"
                >
                  {{ tech.title }}
                </div>
              </div>
            </div>
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动状态：</div>
              <div v-for="tech in activityStatusDict" :key="tech.id">
                <div
                  class="left-classify-item-option"
                  :class="searchData.proNature == tech.id ? 'active' : ''"
                  @click="searchData.proNature = tech.id"
                >
                  {{ tech.title }}
                </div>
              </div>
            </div>
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动日期：</div>
              <div v-for="tech in activityStatusDict" :key="tech.id">
                <div
                  class="left-classify-item-option"
                  :class="searchData.proNature == tech.id ? 'active' : ''"
                  @click="searchData.proNature = tech.id"
                >
                  {{ tech.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <div class="content">
      <el-row class="outer-card">
        <div class="header-cw">
          <div class="text-cw">
            <div class="title-cw">活动直播</div>
            <div class="zhibo" v-if="meetLiveLit.upType == 'video'">
              <iframe
                v-if="meetLiveLit.videoType == '0'"
                height="310"
                width="620"
                :src="meetLiveLit.videoUrl ? meetLiveLit.videoUrl : ''"
                frameborder="0"
                allowfullscreen
              />
              <!-- <video-player v-else
                      ref="videoPlayer"
                      class="video-player vjs-custom-skin"
                      :playsinline="true"
                      :options="playerOptions" /> -->
              <VTcPlayer
                v-if="isVideo && meetLiveLit.videoType == '1'"
                ref="tcPlayer"
                :options="options"
              />
            </div>
            <div class="zhibo" v-if="meetLiveLit.upType == 'article'">
              <img class="zhanweiimg" :src="meetLiveLit.actCover" alt="" />
            </div>
          </div>
          <div class="right-cw">
            <div class="header_right-cw">
              <div class="title-cw">最新动态</div>
              <div class="more" @click="gomore(listsData[0].actClassification)">
                查看更多
              </div>
            </div>
            <div class="listdata">
              <div
                class="lists-cw"
                v-for="(item, index) in listsData"
                @click="goaction(item)"
                :key="index"
              >
                <div>
                  {{ item && item.actName ? item.actName : "" }}
                </div>
                <div class="time_list">
                  {{ item && item.createTime.substring(0, 10) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row class="outer-card">
        <el-card shadow="never" :body-style="{ paddingRight: '10px' }">
          <div slot="header" class="clearfix-cw">
            <div class="tabs-cw">
              <span class="title">论坛活动</span>
              <div
                v-for="(item, index) in statusLT"
                :key="index"
                @click="loadDataZXDT(1, item, index)"
              >
                <div v-if="item.check" class="ischeck">
                  {{ item.t }}
                </div>
                <div v-else class="check">
                  {{ item.t }}
                </div>
              </div>
            </div>
            <el-button
              v-show="hasmore(listData.startSignBBS)"
              class="more"
              type="text"
              @click="gomore(listData.startSignBBS[0].actClassification)"
              >查看更多<i class="el-icon-arrow-right"
            /></el-button>
          </div>
          <el-row>
            <el-col
              v-for="(o, index) in listData.startSignBBS"
              :key="o.actId"
              :span="8"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                class="inner_card"
                shadow="hover"
                @click.native="goaction(o)"
              >
                <img
                  v-real-img="o.actCover"
                  :src="`${imgUrl}/activity1.jpg`"
                  class="image"
                />
                <el-tag
                  v-show="o.upType == 'video'"
                  effect="plain"
                  type="info"
                  size="small"
                  :class="{ status: o.actStatus == 'started' }"
                >
                  {{ actionStat(o) }}
                </el-tag>
                <img
                  v-show="o.upType == 'video'"
                  :src="`${imgUrl}/play.png`"
                  class="play"
                />
                <div style="padding: 14px">
                  <span class="inner-title"
                    >{{ o && o.actName ? o.actName : "" }}
                  </span>
                  <!-- <p class="inner-desc">{{ o.actIntroduction }}</p>
                  <div class="inner-btn clearfix">
                    <el-button type="text"
                               class="inner-opera"
                               @click="goaction(o)">{{ actionBtn(o) }}</el-button>
                  </div> -->
                </div>
                <div class="timedanwei-cw">
                  <div>活动时间：{{ o.startTime.substring(0, 16) }}</div>
                  <div>发布单位：{{ o.orgBelong }}</div>
                </div>
              </el-card>
            </el-col>
            <Empty
              v-show="listData.startSignBBS && !listData.startSignBBS.length"
            />
          </el-row>
        </el-card>
      </el-row>
      <el-row class="outer-card">
        <el-card shadow="never" :body-style="{ paddingRight: '10px' }">
          <!-- <div slot="header"
               class="clearfix">
            <span class="title">成果发布</span>
            <el-button v-show="hasmore(listData.release)"
                       class="more"
                       type="text"
                       @click="gomore(listData.release[0].actClassification)">查看更多<i class="el-icon-arrow-right" /></el-button>
          </div> -->
          <div slot="header" class="clearfix-cw">
            <div class="tabs-cw">
              <span class="title">成果发布</span>
              <div
                v-for="(item, index) in statusCG"
                :key="index"
                @click="loadDataZXDT(2, item, index)"
              >
                <div v-if="item.check" class="ischeck">
                  {{ item.t }}
                </div>
                <div v-else class="check">
                  {{ item.t }}
                </div>
              </div>
            </div>
            <el-button
              v-show="hasmore(listData.release)"
              class="more"
              type="text"
              @click="gomore(listData.release[0].actClassification)"
              >查看更多<i class="el-icon-arrow-right"
            /></el-button>
          </div>
          <el-row>
            <el-col
              v-for="(o, index) in listData.release"
              :key="o.actId"
              :span="8"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                class="inner_card"
                shadow="hover"
                @click.native="goaction(o)"
              >
                <img
                  v-real-img="o.actCover"
                  :src="`${imgUrl}/activity2.jpg`"
                  class="image"
                />
                <el-tag
                  v-show="o.upType == 'video'"
                  effect="plain"
                  type="info"
                  size="small"
                  :class="{ status: o.actStatus == 'started' }"
                >
                  {{ actionStat(o) }}
                </el-tag>
                <img
                  v-show="o.upType == 'video'"
                  :src="`${imgUrl}/play.png`"
                  class="play"
                />
                <div style="padding: 14px">
                  <span class="inner-title">{{
                    o && o.actName ? o.actName : ""
                  }}</span>
                  <!-- <p class="inner-desc">{{ o.actIntroduction }}</p>
                  <div class="inner-btn clearfix">
                    <el-button type="text"
                               class="inner-opera"
                               @click="goaction(o)">{{ actionBtn(o) }}</el-button>
                  </div> -->
                </div>
                <div class="timedanwei-cw">
                  <div>活动时间：{{ o.startTime.substring(0, 16) }}</div>
                  <div>发布单位：{{ o.orgBelong }}</div>
                </div>
              </el-card>
            </el-col>
            <Empty v-show="listData.release && !listData.release.length" />
          </el-row>
        </el-card>
      </el-row>
      <el-row class="outer-card">
        <el-card shadow="never" :body-style="{ paddingRight: '10px' }">
          <!-- <div slot="header"
               class="clearfix">
            <span class="title">项目路演</span>
            <el-button v-show="hasmore(listData.launch)"
                       class="more"
                       type="text"
                       @click="gomore(listData.launch[0].actClassification)">查看更多<i class="el-icon-arrow-right" /></el-button>
          </div> -->
          <div slot="header" class="clearfix-cw">
            <div class="tabs-cw">
              <span class="title">项目路演</span>
              <div
                v-for="(item, index) in statusLY"
                :key="index"
                @click="loadDataZXDT(3, item, index)"
              >
                <div v-if="item.check" class="ischeck">
                  {{ item.t }}
                </div>
                <div v-else class="check">
                  {{ item.t }}
                </div>
              </div>
            </div>
            <el-button
              v-show="hasmore(listData.launch)"
              class="more"
              type="text"
              @click="gomore(listData.launch[0].actClassification)"
              >查看更多<i class="el-icon-arrow-right"
            /></el-button>
          </div>
          <el-row>
            <el-col
              v-for="(o, index) in listData.launch"
              :key="o.actId"
              :span="8"
            >
              <el-card
                :body-style="{ padding: '0px' }"
                class="inner_card"
                shadow="hover"
                @click.native="goaction(o)"
              >
                <img
                  v-real-img="o.actCover"
                  :src="`${imgUrl}/activity3.jpg`"
                  class="image"
                />
                <el-tag
                  v-show="o.upType == 'video'"
                  effect="plain"
                  type="info"
                  size="small"
                  :class="{ status: o.actStatus == 'started' }"
                >
                  {{ actionStat(o) }}
                </el-tag>
                <img
                  v-show="o.upType == 'video'"
                  :src="`${imgUrl}/play.png`"
                  class="play"
                />
                <div style="padding: 14px">
                  <span class="inner-title">{{
                    o && o.actName ? o.actName : ""
                  }}</span>
                  <!-- <p class="inner-desc">{{ o.actIntroduction }}</p>
                  <div class="inner-btn clearfix">
                    <el-button type="text"
                               class="inner-opera"
                               @click="goaction(o)">{{ actionBtn(o) }}</el-button>
                  </div> -->
                </div>
                <div class="timedanwei-cw">
                  <div>活动时间：{{ o.startTime.substring(0, 16) }}</div>
                  <div>发布单位：{{ o.orgBelong }}</div>
                </div>
              </el-card>
            </el-col>
            <Empty v-show="listData.launch && !listData.launch.length" />
          </el-row>
        </el-card>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import { VTcPlayer } from "v-tcplayer";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-contrib-hls";
import common from "@/mixin/common";
import {
  getActivityhome,
  getZgcActivityList,
  getActivitySsb,
} from "@/api/activitieshall";
export default {
  name: "Activitieshall",
  mixins: [common],
  components: {
    videoPlayer,
    VTcPlayer,
  },
  data() {
    return {
      meetLiveLit: [],
      listData: {},
      activityTypeDict: [
        { id: 0, title: "不限" },
        { id: 1, title: "论坛活动" },
        { id: 2, title: "成果发布" },
        { id: 2, title: "项目路演" },
      ],

      activityStatusDict: [
        { id: 0, title: "不限" },
        { id: 1, title: "已开始" },
        { id: 2, title: "未开始" },
        { id: 3, title: "已结束" },
      ],
      searchData: {
        actClassification: "",
        actStatus: 0,
        title: "",
        pageSize: 6,
        pageNum: 1,
      },
      listsData: [],
      options: {
        hlsUrl: "https://cdn.staticfile.org/hls.js/0.8.9/hls.min.js", // 0.0.5增加
        width: 620,
        height: 360,
        m3u8: "",
        poster: "",
      },
      isVideo: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL", // 类型
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm",
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      item: {},
      statusLT: [
        { t: "全部", s: "", check: true },
        { t: "已开始", s: "started", check: false },
        { t: "未开始", s: "nostart", check: false },
        { t: "已结束", s: "end", check: false },
      ],
      statusCG: [
        { t: "全部", s: "", check: true },
        { t: "已开始", s: "started", check: false },
        { t: "未开始", s: "nostart", check: false },
        { t: "已结束", s: "end", check: false },
      ],
      statusLY: [
        { t: "全部", s: "", check: true },
        { t: "已开始", s: "started", check: false },
        { t: "未开始", s: "nostart", check: false },
        { t: "已结束", s: "end", check: false },
      ],
      isIfm: false,
    };
  },
  computed: {
    hasmore: () => {
      return (list) => {
        return list?.length > 5;
      };
    },
    actionBtn: () => {
      return (item) => {
        if (item?.upType == "video") {
          if (item?.actStatus == "started") {
            return "正在直播";
          } else if (item?.actStatus == "end") {
            return "观看回放";
          } else {
            return "查看详情";
          }
        } else {
          if (item?.signUpEnable == "1") {
            return "立即报名";
          } else {
            return "查看详情";
          }
        }
      };
    },
    actionStat: () => {
      return (item) => {
        if (item?.upType == "video") {
          if (item?.actStatus == "started") {
            return "直播中";
          } else if (item?.actStatus == "end") {
            return "回放";
          } else {
            return "未开始";
          }
        }
      };
    },
  },
  created() {
    this.loadDataZXDT();
    this.getMeetLiving();
  },
  methods: {
    loadData() {
      this.loading = true;
      getActivityhome()
        .then((res) => {
          debugger;
          if (res.code == "0000") {
            _.forEach(res.obj, (list, key) => {
              this.$set(this.listData, key, list);
            });
            console.log(this.listData);
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadDataZXDT(num, item, index) {
      this.loading = true;
      let params = {};
      //论坛
      if (num == 1) {
        this.searchData.actStatus = item.s;
        this.searchData.actClassification = "ssb";
        this.statusLT.forEach((item, i) => {
          item.check = i == index ? true : false;
        });
      } else if (num == 2) {
        //成果
        this.searchData.actStatus = item.s;
        this.searchData.actClassification = "release";
        this.statusCG.forEach((item, i) => {
          item.check = i == index ? true : false;
        });
      } else if (num == 3) {
        //路演
        this.searchData.actStatus = item.s;
        this.searchData.actClassification = "launch";
        this.statusLY.forEach((item, i) => {
          item.check = i == index ? true : false;
        });
      }
      params = num ? this.searchData : params;
      getActivityhome(params)
        .then((res) => {
          if (res.code == "0") {
            if (!num) {
              let listsData = res.rows;
              this.listsData = listsData.filter((item) => {
                return item.actClassification !== "xwdt";
              });
              this.listsData.length = 10;
              let zhiboList = listsData.filter((item) => {
                return (
                  item.actClassification !== "xwdt" &&
                  item.videoType !== "0" &&
                  item.actClassification == "ssb"
                );
              });
              this.item = zhiboList[0] ? zhiboList[0] : {};
              console.log(this.item, 999);
              // this.playerOptions.sources[0].src= zhiboList[0] ?  zhiboList[0].videoUrl : ""
              // this.playerOptions.poster=zhiboList[0] ?   zhiboList[0].actCover : ""
            }
            if (num == 1) {
              this.$set(this.listData, "startSignBBS", res.rows);
              if (this.listData.startSignBBS.length > 6) {
                this.listData.startSignBBS.length = 6;
              }
            } else if (num == 2) {
              this.$set(this.listData, "release", res.rows);
              if (this.listData.release.length > 6) {
                this.listData.release.length = 6;
              }
            } else if (num == 3) {
              this.$set(this.listData, "launch", res.rows);
              if (this.listData.launch.length > 6) {
                this.listData.launch.length = 6;
              }
            }
          } else {
            this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 获取正在直播的或者一开始的会议
    getMeetLiving() {
      let obj = {
        pageSize: 1,
        pageNum: 1,
      };
      getActivitySsb(obj).then((res) => {
        if (res.code == 0) {
          this.meetLiveLit = res.rows[0];
          let zhiboList = res.rows[0];
          if (zhiboList.upType == "video") {
            this.options.m3u8 = zhiboList ? zhiboList.videoUrl : "";
            this.options.poster = zhiboList ? zhiboList.actCover : "";
            this.isVideo = !this.isIfm;
          }
        }
      });
    },

    goaction({ upType, actStatus, actId, signUpEnable }) {
      if (upType == "video") {
        if (actStatus == "started") {
          this.golive(actId);
        } else {
          this.govideo(actId);
        }
      } else {
        if (signUpEnable == "1") {
          this.gosign(actId);
        } else {
          this.goarticle(actId);
        }
      }
    },
    gomore(actClassification) {
      this.goBlank({
        path: "/activitieshall/more",
        query: {
          actClassification,
          searchTitle: this.searchData.title,
        },
      });
    },
    gomoreSearch() {
      this.goBlank({
        path: "/activitieshall/activityLthd",
        query: {
          searchTitle: this.searchData.title,
        },
      });
    },
    govideo(id) {
      this.goBlank({
        path: "/activitieshall/video",
        query: {
          id,
        },
      });
    },
    golive(id) {
      this.goBlank({
        path: "/activitieshall/live",
        query: {
          id,
        },
      });
    },
    goarticle(id) {
      this.goBlank({
        path: "/activitieshall/article",
        query: {
          id,
        },
      });
    },
    gosign(id) {
      this.goBlank({
        path: "/activitieshall/signup",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@function pxToVW($px) {
  @return ($px/1920) * 100vw;
}
.zhibo {
  width: 620px;
  height: 360px;
}
.header-cw {
  display: flex;
  justify-content: space-between;
  .text-cw {
    img {
      width: 621px;
      height: 310px;
      // background: #26262d;
      // opacity: 0.6;
    }
    .zhanweiimg {
      width: 621px;
      height: 350px;
    }
  }
  .right-cw {
    margin-left: 71px;
    flex: 1;
    .header_right-cw {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .listdata {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      // align-items: center;
      height: 97%;
      overflow: hidden;
    }
    .lists-cw {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #000;
      div:nth-child(1) {
        width: 75%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /*超出几行后省略号*/
        overflow: hidden;
      }
      .time_list {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #999999;
        width: 22%;
        text-align: right;
      }
    }
    .lists-cw:hover {
      color: #4d6ed9;
      cursor: pointer;
      .time_list {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #4d6ed9;
      }
    }

    .more {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #999999;
      margin-bottom: 32px;
      cursor: pointer;
    }
  }
  .title-cw {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-bottom: 32px;
  }
}
.timedanwei-cw {
  border-top: 1px solid #eeeeee;
  div:nth-child(1) {
    margin: 12px 0 18px 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
  }
  div:nth-child(2) {
    margin: 0 0 15px 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
    overflow: hidden; //超出文本隐藏
    text-overflow: ellipsis; ///超出部分省略号显示
    display: -webkit-box; //弹性盒模型
    -webkit-box-orient: vertical; //上下垂直
    -webkit-line-clamp: 1; //自定义行数
  }
}
.clearfix-cw {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    position: relative;
    display: inline-block;
    padding-right: 10px;
    font-size: 23px;
    font-weight: 600;
    color: #333333;
    margin-right: 32px;
    &:after {
      position: absolute;
      right: 0;
      top: 0;
      content: "";
      display: block;
      height: 100%;
      width: 3px;
      background-color: #516fd2;
    }
  }
  .more {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
    align-self: flex-end;
    cursor: pointer;
    padding: 3px 0;
    i {
      font-weight: 600;
    }
  }
  .tabs-cw {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .check {
      cursor: pointer;
      width: 110px;
      height: 32px;
      background: #fff;
      border-radius: 16px;
      text-align: center;
      line-height: 32px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #333333;
      margin-right: 5px;
    }
    .check:hover {
      cursor: pointer;
      width: 110px;
      height: 32px;
      border: 1px solid #1e86f9;
      border-radius: 16px;
      text-align: center;
      line-height: 32px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #333333;
      margin-right: 5px;
    }
    .ischeck {
      height: 32px;
      background: #1e86f9;
      border-radius: 16px;
      line-height: 32px;
      width: 110px;
      color: #fff;
      text-align: center;
      margin-right: 5px;
    }
  }
}
.input-search {
  max-width: 800px;
  margin-top: 27px;
  width: 573px;
  height: 48px;
  background: #ffffff;
  box-shadow: 0px 0px 46px 0px rgba(131, 176, 235, 0.39);
  border-radius: 48px;
  ::v-deep .el-input-group__append {
    display: flex;
    align-items: center;
  }
  .search-btn.el-button {
    width: 84px !important;
    height: 40px;
    background: #2434af;
    border-radius: 40px;
  }
  ::v-deep .el-input__inner {
    height: 56px;
    border-right: none;
    background-color: transparent;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #818289;
    line-height: 74px;
  }

  ::v-deep .el-button {
    width: 166px;
    /* height: 53px; */
    /* border-width: 2px; */
    color: #ffffff;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
    border-radius: 0 4px 4px 0;
    border-left: 2px solid;
    padding: 4px 0;
  }
  ::v-deep .el-input-group__append {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.search-text-cw {
  margin-top: 100px;
  font-size: 72px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 280px;
  background: linear-gradient(0deg, #008aff 0.1220703125%, #001196 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.content {
  padding: 30px calc((100% - 1245px) / 2) 0;
  background: #fff;
}
.search-area {
  background-color: #ffffff;
  margin-bottom: 100px;
  height: 640px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../../assets/img/activityManage/banner.png") no-repeat center
    0px;
  background-position: center 0px;
  background-size: cover;
  position: relative;
  .icon-text-cw {
    margin-left: 15px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
  }

  .filter-box {
    width: pxToVW(1381);
    margin: 0 auto;
    background: transparent;
    position: absolute;
    bottom: -580px;
  }
}
::v-deep .image {
  height: 240px;
}
.outer-card {
  margin-bottom: 25px;
  width: 100%;
  .title {
    position: relative;
    display: inline-block;
    padding-right: 10px;
    font-size: 23px;
    font-weight: 600;
    color: #333333;
    &:after {
      position: absolute;
      right: 0;
      top: 0;
      content: "";
      display: block;
      height: 100%;
      width: 3px;
      background-color: #516fd2;
    }
  }
  // .more {
  //   color: #516fd2;
  //   font-size: 18px;
  //   float: right;
  //   padding: 3px 0;
  //   i {
  //     font-weight: 600;
  //   }
  // }
}
.mb0 {
  margin-bottom: 0;
}
.inner_layout {
}
.inner_card {
  cursor: pointer;
  margin: 0 10px 13px 0;
  position: relative;
  .inner-title {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #000000;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .inner-desc {
    font-size: 16px;
    color: #999999;
    height: 57px;
    line-height: 1.2;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .inner-btn {
    text-align: center;
  }
  .inner-opera {
    /*width: 132px;*/
    /*height: 42px;*/
    color: #ffffff;
    background: #516fd2;
    border-radius: 4px;
    padding: 10px 20px;
  }
  .image {
    height: 200px;
    // height: 173px;
    width: 100%;
  }

  .play {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    width: 75px;
    height: 50px;
    top: 60px;
    margin: auto;
  }

  .el-tag--plain.el-tag--info {
    position: absolute;
    width: 64px;
    text-align: center;
    right: 11px;
    top: 7px;
    color: #ffffff;
    //opacity: 0.3;
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
</style>
