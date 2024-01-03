<template>
  <el-main v-loading="false" style="background-color: #fff">
    <el-row class="search-area">
      <span class="search-text-cw">技术转移行业活动发布大厅</span>

      <el-input
        placeholder="输入咨询关键词，进行搜索"
        class="activity-manage-main-search"
        v-model="searchData.keyword"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <i slot="suffix">
          <img
            src="~img/projectManage/search.png"
            style="cursor: pointer"
            @click="handleSearchDataChange('actName', searchData.keyword)"
          />
        </i>
      </el-input>
      <div class="filter-box">
        <!-- <img src="~img/projectManage/project-search.png" /> -->
        <p>当前位置：首页 > 产研对接</p>
        <div class="filter-box-content">
          <div class="left-classify">
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动类型：</div>
              <div
                v-for="tech in [
                  { dictLabel: '不限', dictValue: '' },
                  ...activityKindDict,
                ]"
                :key="tech.key"
              >
                <div
                  class="left-classify-item-option"
                  :class="
                    searchData.actClassification == tech.dictValue
                      ? 'active'
                      : ''
                  "
                  @click="
                    handleSearchDataChange('actClassification', tech.dictValue)
                  "
                >
                  {{ tech.dictLabel }}
                </div>
              </div>
            </div>
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动状态：</div>
              <div
                v-for="tech in [
                  { dictLabel: '不限', dictValue: '' },
                  ...activityStatusDict,
                ]"
                :key="tech.dictValue"
              >
                <div
                  class="left-classify-item-option"
                  :class="
                    searchData.actStatus == tech.dictValue ? 'active' : ''
                  "
                  @click="handleSearchDataChange('actStatus', tech.dictValue)"
                >
                  {{ tech.dictLabel }}
                </div>
              </div>
            </div>
            <div class="left-classify-item">
              <div class="left-classify-item-title">活动日期：</div>
              <div>
                <span style="margin: 0 20px 0 10px">输入时间</span>
                <el-date-picker
                  v-model="searchData.startTime"
                  type="date"
                  placeholder="开始"
                  size="mini"
                  style="width: 140px"
                  @change="
                    handleSearchDataChange('startTime', searchData.startTime)
                  "
                >
                </el-date-picker>
                <span style="margin: 0 10px">-</span>
                <el-date-picker
                  v-model="searchData.endTime"
                  type="date"
                  placeholder="结束"
                  size="mini"
                  style="width: 140px"
                  @change="
                    handleSearchDataChange('endTime', searchData.endTime)
                  "
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <div class="content">
      <el-row class="outer-card">
        <el-col v-for="(o, index) in listDataShow" :key="o.actId" :span="8">
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
            <div style="padding: 10px">
              <span class="inner-title"
                >{{ o && o.actName ? o.actName : "" }}
              </span>
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
      <div class="pagination-box">
        <div class="pagination-box-currentpage" key="1">
          {{ pageConfig.pageNum }} / {{ total }}
        </div>
        <el-pagination
          :current-page="pageConfig.pageNum"
          :page-size="pageConfig.pageSize"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
        <el-input
          v-model="pageValue"
          style="width: 3vw; margin: 0 12px 0 40px; color: #1919c1"
          oninput="value=value.replace(/[^\d]/g,'')"
        ></el-input>
        <div
          class="pagination-box-currentpage"
          style="cursor: pointer"
          @click="handleCurrentChange(pageValue)"
        >
          跳转
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import { VTcPlayer } from "v-tcplayer";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-contrib-hls";
import dayjs from "dayjs";
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
      // activityTypeDict: [
      //   { id: 0, title: "不限", key: "" },
      //   { id: 1, title: "论坛活动", key: "ssb" },
      //   { id: 2, title: "成果发布", key: "release" },
      //   { id: 2, title: "项目路演", key: "launch" },
      // ],

      // activityStatusDict: [
      //   { id: 0, title: "不限", key: "" },
      //   { id: 1, title: "已开始", key: "started" },
      //   { id: 2, title: "未开始", key: "notstart" },
      //   { id: 3, title: "已结束", key: "end" },
      // ],
      searchData: {
        keyword: "",
        actName: "",
        actStatus: "",
        actClassification: "",
        startTime: "",
        endTime: "",
      },
      listsData: [],
      pageConfig: {
        pageNum: 1,
        pageSize: 9,
      },
      total: 0,
      pageValue: 1,
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
      isIfm: false,
    };
  },
  computed: {
    // listDataShow: function () {
    //   let list = [];
    //   debugger;
    //   let type = this.searchData.actClassification;
    //   if (type == "") {
    //     list = [
    //       ...this.listData.startSignBBS,
    //       ...this.listData.release,
    //       ...this.listData.launch,
    //     ];
    //   } else if (type == "ssb") {
    //     list = [...this.listData.startSignBBS];
    //   } else if (type == "release") {
    //     list = [...this.listData.release];
    //   } else if (type == "launch") {
    //     list = [...this.listData.launch];
    //   }
    //   return list;
    // },
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
    // this.loadDataZXDT();
    // this.getMeetLiving();
  },
  methods: {
    loadData() {
      this.loading = true;
      getActivityhome({ ...this.searchData, ...this.pageConfig })
        .then((res) => {
          if (res.code == 0) {
            let listAll = [];
            this.listDataShow = res.rows;
            this.total = res.total;
          } else {
            // this.$message.warning(res.msg);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleSearchDataChange(type, value) {
      if (["startTime", "endTime"].includes(type))
        value = dayjs(value).format("YYYY-MM-DD HH:mm:ss");
      this.searchData[type] = value;
      this.loadData();
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
            // this.$message.warning(res.msg);
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
      if (signUpEnable == "1") {
        this.gosign(actId);
      } else {
        this.goarticle(actId);
      }
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

    handleCurrentChange(page) {
      this.pageConfig.pageNum = page;
      this.pageValue = page;
      this.loadData();
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
  div:nth-child(1) {
    margin: 12px 0 14px 10px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #333333;
  }
  div:nth-child(2) {
    margin: 0 0 15px 10px;
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
.content {
  width: pxToVW(1381);
  margin: 0 auto;
}
.search-area {
  background-color: #ffffff;
  margin-bottom: 130px;
  height: 640px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url("../../assets/img/activityManage/banner.png") no-repeat center
    0px;
  background-position: center 0px;
  background-size: cover;
  position: relative;
  .search-text-cw {
    margin-top: 100px;
    font-size: 72px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    line-height: 200px;
    background: linear-gradient(0deg, #008aff 0.1220703125%, #001196 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .activity-manage-main-search {
    width: pxToVW(665);
    :deep(.el-input__inner) {
      border-radius: 48px;
      height: 48px;
      line-height: 48px;
    }
    :deep(.el-input__prefix) {
      line-height: 48px;
    }
    :deep(.el-input__suffix) {
      line-height: 48px;
      padding-top: 4px;
    }
  }

  .filter-box {
    width: pxToVW(1381);
    margin: 0 auto;
    background: transparent;
    position: absolute;
    bottom: -100px;
    z-index: 999;
    .filter-box-content {
      background: #fff;
      // box-shadow: 0px 20px 46px 20px #d8e0f0;
      border-radius: 16px;
      :deep .el-date-editor {
        font-size: 12px !important;
      }
      .left-classify {
        width: 100%;
        padding: 36px 28px;
        background-color: #fff;
        border-radius: 16px;
        &-item {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          color: #3c3c41;
          font-weight: 400;
          &-title {
            min-width: 80px;
            align-self: center;
          }
          &-option {
            padding: 8px 13px;
            margin: 0 10px;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0);

            &.active {
              background: #ffe5e5;
              border: 1px solid #ee6868;
              border-radius: 6px;
              color: #ec4646;
            }
          }
          &-city {
            display: flex;
            flex-wrap: wrap;
          }
          .other {
            span {
              font-size: 14px;
            }
            width: pxToVW(132);
            // border: 1px solid #EE6868;
            border-radius: 6px;
            margin-right: pxToVW(42);
            // :deep(.el-select .el-input.is-focus .el-input__inner) {
            //     border-color: #2434AF;
            // }
          }
          &-more {
            min-width: 60px;
            padding-top: 8px;
            align-self: start;
            cursor: pointer;
            color: #0e1e9c;
          }
        }
      }
    }
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
}
.mb0 {
  margin-bottom: 0;
}
.inner_card {
  cursor: pointer;
  margin: 0 10px 13px 0;
  position: relative;
  // background: linear-gradient(0deg, #e3eefd, #ffffff);
  box-shadow: 1px 1px 7px 2px #d8e0f0;
  border-radius: 16px;
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
.pagination-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 27px 64px 0;
  &-currentpage {
    background-color: #fff;
    padding: 10px 23px;
    font-weight: 400;
    color: #19191c;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
  :deep(.el-input__inner) {
    text-align: center;
    color: #19191c;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
