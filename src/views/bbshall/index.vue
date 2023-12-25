<template>
  <el-main v-loading="loading"
           class="bgbg">
    <el-row class="search-area">
      <span class="search-left_cw">资讯大厅</span>
      <span class="search-left_detail_cw">提供科技行业前线最新资讯</span>
      <el-input v-model="searchData.title"
                placeholder="输入咨询关键词，进行搜索"
                class="input-search">
        <el-button slot="append"
                   @click="gomore">
          <i class="el-icon-search" />
          <span class="icon-text_cw">点击搜索</span>
        </el-button>
      </el-input>
      <!-- <el-button type="primary"
                 class="search-right"
                 @click="gopost">
        <svg-icon icon-class="xuqiu"
                  class-name="icon" /><span class="icon-text">发布项目</span></el-button> -->
    </el-row>
    <div class="content">
      <el-row class="header-card_cw">
        <div class="header_cw_o">
          <div class="rukou_cw">
            <img src="../../assets/img/zcsbrk.png"
                 @click="jumpPolicyDec()"
                 alt="">
          </div>
          <div class="fls_cw">
            <div class="fl_cw"
                 v-for="(item,index) in labData"
                 :key="index">
              <div>
                0{{index+1}}
              </div>
              <div>
                {{item.name}}
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
      </el-row>
      <el-row class="outer-card">
        <el-card :body-style="{ padding:0 }"
                 class="elbody"
                 shadow="never">

          <el-row class="elbody">
            <el-col class="outer-layout">
              <el-card :body-style="{padding:0}"
              shadow="nerver"
                       class="inner_card"
                       @click.native="golist(item)">
                <div slot="header"
                     class="outer-header">
                  <div class="title">最新政策</div>
                  <div @click="gomore(1)"
                       class="more">
                    查看更多
                  </div>
                </div>
                <div class="lists_cw">
                  <div class="content_lists_cw"
                       @click="jumpPolicyDetail(item.policyId)"
                       v-for="(item,index) in newPlicyList"
                       :key="index">
                    <div>
                      {{index+1}}.{{item.title}}
                    </div>
                  </div>
                </div>

              </el-card>
            </el-col>
            <el-col class="outer-layout_m">
              <el-card :body-style="{padding:0 }"
                       class="inner_card_m"
                       shadow="never">
                <div slot="header"
                     class="outer-header">
                  <div class="title">热门政策</div>
                  <div @click="gomore(2)"
                       class="more">
                    查看更多
                  </div>
                </div>
                <div class="lists_cw">
                  <div class="content_lists_cw"
                       v-for="(item,index) in hotList"
                       @click="jumpPolicyDetail(item.policyId)"
                       :key="index">
                    <div>
                      {{index+1}}.{{item.title}}
                    </div>
                  </div>
                </div>

              </el-card>
            </el-col>
            <el-col class="outer-layout">
              <el-card :body-style="{ padding:0  }"
                       shadow="never"
                       @click.native="golist(item)">
                <div slot="header"
                     class="outer-header">
                  <div class="title">政策解读</div>
                  <div @click="gomore(3)"
                       class="more">
                    查看更多
                  </div>
                </div>
                <div class="lists_cw">
                  <div class="content_lists_cw"
                       v-for="(item,index) in interpretation"
                       @click="jumpPolicyDetail(item.id,1)"
                       :key="index">
                    <div>
                      {{index+1}}.{{item.policyName}}
                    </div>
                  </div>
                </div>

              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <div slot="header"
           class="outer-header">
        <span class="title">科技专栏</span>
        <!-- <el-button class="more"
                   type="text"
                   @click="gomore">查看更多<i class="el-icon-arrow-right" /></el-button> -->
      </div>
      <el-row class="outer-card">
        <el-card :body-style="{ padding: '12px 20px 30px' }"
                 shadow="never">
          <!-- <div slot="header"
               class="outer-header_n">
            <div class="title">科技专栏</div>
            <div @click="gomore"
                 class="more">
              查看更多
            </div>
          </div> -->
          <el-row>
            <el-col v-for="item in listData.columnList"
                    :span="8"
                    class="outer-layout">
              <el-card :body-style="{ padding: '19px 20px 0px 28px',marginBottom : '22px' }"
                       class="inner_card"
                       shadow="hover"
                       @click.native="golist(item)">
                <div @mouseenter="mouseEnter(item.id)"
                     @mouseleave="mouseLeave(item.id)">

                  <div class="inner-top">
                    <div class="inner-img">
                      <img :src="item.logo"
                           class="image">
                    </div>
                    <div class="total_count">
                      <h3 class="inner-title">{{ item.name }}</h3>
                      <div>
                        <!-- {{item.readCount}} 订阅数 -->
                      </div>
                    </div>
                  </div>
                  <div class="inner-desc">{{ item.description }}</div>
                  <div class="bot-btn">
                    <!-- <el-button @click="golist(item)">进入专栏</el-button> -->
                    <div @click="golist(item)"
                         class="inZl">
                      <div v-if="item.overShow"
                           class="hover">进入专栏</div>
                      <div v-if="!item.overShow"
                           class="outHover">进入专栏</div>
                    </div>
                    <!-- <div>
                      <img v-if="item.overShow"
                           src="../../assets/img/hover.png"
                           alt="">
                      <img v-if="!item.overShow"
                           src="../../assets/img/nohover.png"
                           alt="">
                    </div> -->
                  </div>
                </div>

              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <!-- <el-row class="outer-card bb">
        <el-card :body-style="{ padding: '0' }">
          <el-row class="mid-bg">
            <el-col v-for="item in listDataZLWZ"
                    :span="24"
                    class="mid-layout">
              <el-card :body-style="{ padding: '40px 48px 42px' }"
                       class="mid-card"
                       shadow="hover"
                       @click.native="goarticle(item.actId)">
                <div class="content_list_cw">
                  <div class="content_left_cw">
                    <div class="day_cw">
                      {{item.createTime.substring(8,10)}}
                    </div>
                    <div class="year_month_cw">
                      {{item.createTime.substring(0,7)}}
                    </div>
                  </div>
                  <div class="content_right_cw">
                    <div class="h-left">
                      <div class="m-title_cw">{{ item.actName }}</div>
                      <div class="count_tip_cw">
                      </div>
                    </div>

                    <div class="mid-bottom_cw">
                      {{ item.actIntroduction }}
                    </div>
                  </div>
                </div>

              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row> -->

      <el-row class="outer-card">
        <div class="header_cw_new">
          <div class="left_cw">
            <div class="title_cw">
              新闻资讯
            </div>
            <div class="zhibo">
              <img :src="itemImage.actCover"
              @click="goNewsDetail(itemImage)"
                   alt="">
            </div>
          </div>
          <div class="right_cw">
            <div class="header_right_cw">
              <div class="title_cw">
                <!-- 最新动态 -->
              </div>
              <div class="more"
                   @click="goNewsList">
                查看更多
              </div>
            </div>
            <div class="listdata">
              <div class="lists_cw_n"
                   v-for="(item,index) in listsData"
                   @click="goNewsDetail(item)"
                   :key="index">
                <div>
                  {{ item && item.actName?item.actName :""}}
                </div>
                <div class="time_list">
                  {{ item && item.createTime.substring(0,10)}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </el-row>

      <!-- <el-row class="outer-card bb">
        <el-card :body-style="{ padding: '0' }">
          <div slot="header"
               class="outer-header">
            <span class="title">行业资讯</span>
            <el-button class="more"
                       type="text"
                       @click="goinformation">查看更多<i class="el-icon-arrow-right" /></el-button>
          </div>
          <el-row class="mid-bg">
            <el-col v-for="item in listData.industryList"
                    :span="24"
                    class="mid-layout">
              <el-card :body-style="{ padding: '22px 30px' }"
                       class="mid-card"
                       shadow="hover"
                       @click.native="goindustry(item)">
                <div slot="header"
                     class="mid-header">
                  <div class="h-left">
                    <span class="m-title">{{ item.infoName }}</span>
                    <span class="m-key">关键词：{{ item.keywords }}</span>
                                     <span class="m-time">2021-06-18</span>
                  </div>
                  <el-button class="h-right"
                             type="text"
                             @click="goindustry(item)">查看详情</el-button>
                </div>
                <div class="mid-bottom">
                  {{ item.description }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row> -->
      <!--
      <el-row class="outer-card bb">
        <el-card :body-style="{ padding: '0' }">
          <div slot="header"
               class="outer-header">
            <span class="title">科技问答</span>
            <el-button class="more"
                       type="text"
                       @click="goquestion">查看更多<i class="el-icon-arrow-right" /></el-button>
          </div>
          <el-row class="bot-bg">
            <el-col v-for="item in listData.qsList"
                    :span="24"
                    class="bot-layout">
              <el-card :body-style="{ padding: '25px 32px' }"
                       class="bot-card"
                       shadow="hover"
                       @click.native="goanswer(item)">
                <h3>{{ item.title }}</h3>
                <div class="bot-cont">
                  <img v-real-img="item.photo"
                       class="bot-user"
                       :src="`${imgUrl}/manger.jpg`"
                       alt="img">
                  <span class="bot-answer">提问者：{{ item.createByName }}</span>
                  <span class="bot-time">时间：{{ item.createTime }}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-row> -->
    </div>
  </el-main>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-contrib-hls'
import common from '@/mixin/common'
import { getBBsHome,getPolicyList,getZgcPolicyInterpretation,getListZLWZ,getZgcNewsList } from '@/api/bbshall'
import { getActivityhome,getZgcActivityList } from '@/api/activitieshall'


export default {
  name: 'BBShall',
  mixins: [common],
  components: {
    videoPlayer
  },
  data () {
    return {
      interpretation: [],
      newPlicyList: [],
      hotList: [],
      listData: {

      },
      listsData: [],
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
      searchData: {
        title: ""
      },
      listDataZLWZ: [],
      overShow: false,
      labData: [{ name: "完善行业分类信息" },{ name: "查看匹配政策" },{ name: "在线发起政策申报" },{ name: "平台对接服务" }],
      itemImage:{}
    }
  },
  created () {
    this.loadDataNewZc()
    this.loadDataNewZcjd()
    this.loadDataZLWZ()
    this.getNews()
  },
  methods: {
    getNews () {
      getZgcNewsList({pageSize:10,pageNum:1,act:"1"}).then(res => {
        if(res.code=='0') {
          this.listsData=res.rows
          this.itemImage = res.rows[0]
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },

    mouseEnter (id) {
      console.log("进来了",id);
      this.listData.columnList.forEach(item => {
        item.overShow=item.id==id? true:item.overShow
      })
    },
    mouseLeave (id) {
      console.log("出去了");
      this.listData.columnList.forEach(item => {
        item.overShow=item.id==id? false:item.overShow
      })
    },
    loadDataZLWZ () {
      getZgcActivityList({}).then(res => {
        if(res.code=='0') {
          let listDataZLWZ=res.rows
          this.listDataZLWZ=listDataZLWZ.filter(item => {
            return item.actClassification=="xwdt"
          })
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    loadData () {
      this.loading=true
      getBBsHome().then(res => {
        if(res.code=='0000') {
          this.listData=res.obj
          this.listData.columnList.forEach(item => {
            this.$set(item,"overShow",false)
          });
          console.log(this.listData.columnList);
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    // 获取政策
    loadDataNewZc () {
      this.loading=true
      getPolicyList({}).then(res => {
        if(res.code==0) {
          this.newPlicyList=res.rows[0].createList
          this.hotList=res.rows[0].hotList
          if(this.hotList.length>6) {
            this.hotList.length=6
          }
          if(this.hotList.length>6) {
            this.newPlicyList.length=6
          }
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    // 获取政策解读列表
    loadDataNewZcjd () {
      this.loading=true
      getZgcPolicyInterpretation({}).then(res => {
        if(res.code==0) {
          this.interpretation=res.rows
          if(this.interpretation.length>6) {
            this.interpretation.length=6
          }
        } else {
          this.$message.warning(res.msg)
        }
      }).finally(() => {
        this.loading=false
      })
    },
    gomore (num) {
      this.goBlank({
        path: '/bbshall/more',
        query: {
          searchTitle: this.searchData.title,
          num
        }
      })
    },
    jumpPolicyDec () {
      this.goBlank({
        path: '/bbshall/policyDeclaration'
      })
    },
    goquestion () {
      this.goBlank({
        path: '/bbshall/question'
      })
    },
    goanswer ({ id }) {
      this.goBlank({
        path: '/bbshall/answer',
        query: {
          id
        }
      })
    },
    goinformation ({ id }) {
      this.goBlank({
        path: '/bbshall/information',
        query: {
          id
        }
      })
    },
    goindustry ({ id }) {
      this.goBlank({
        path: '/bbshall/technology',
        query: {
          id
        }
      })
    },
    golist ({ id }) {
      this.goBlank({
        path: '/bbshall/list',
        query: {
          id
        }
      })
    },
    jumpPolicyDetail (id,type) {
      this.goBlank({
        path: '/bbshall/PolicyDetail',
        query: {
          id,type
        }
      })
    },
    goarticle (id) {
      this.goBlank({
        path: '/bbshall/article',
        query: {
          id
        }
      })
    },
    goNewsDetail ({id}) {
      this.goBlank({
        path: '/bbshall/newDetal',
        query: {
          id
        }
      })
    },
    goNewsList () {
      this.goBlank({
        path: '/bbshall/newsList',
        query: {
        }
      })
    },
  }

}
</script>

<style lang="scss" scoped>
.header_cw_new {
  display: flex;
  justify-content: space-between;
  .left_cw {
    .title_cw {
      font-size: 26px;
      height: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-bottom: 32px;
    }
    .zhibo {
      cursor: pointer;
      img {
        width: 417px;
        height: 286px;
      }
    }
  }
  .right_cw {
    margin-left: 71px;
    flex: 1;
    .header_right_cw {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .listdata {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      overflow: hidden;
      height: 80%;
    }
    .lists_cw_n {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333;
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
        color: #666;
        width: 22%;
        text-align: right;
      }
    }
    .lists_cw_n:hover {
      color: #4d6ed9;
      cursor: pointer;
      .time_list{
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
  .title_cw {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-bottom: 32px;
  }
}
.header_cw_cw {
  .left_cw {
    img {
      width: 621px;
      height: 310px;
      background: #26262d;
      opacity: 0.6;
    }
  }
  .right_cw {
    margin-left: 71px;
    flex: 1;
    .header_right_cw {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .listdata {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      // align-items: center;
      overflow: hidden;
    }
    .lists_cw {
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
        font-weight: 600;
        color: #666;
        width: 22%;
        text-align: right;
      }
    }
    .lists_cw:hover {
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
  .title_cw {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-bottom: 32px;
  }
}
.outer-card_cw {
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
.bgbg {
  background: #fcfcfe;
}
.elbody {
  background: #fcfcfe;
  display: flex;
  ::v-deep .el-card__header {
    padding: 0;
  }
}
.lists_cw {
  height: 255px;
  overflow: hidden;
  padding:0 10px;
  .content_lists_cw {
    margin: 22px 0;
    div {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    div:hover {
      cursor: pointer;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1e86f9;
    }
  }
}

.header-card_cw {
  background: #fff;
  margin-bottom: 33px;
  .header_cw_o {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .rukou_cw {
      cursor: pointer;
      width: 397px;
      height: 100px;
    }
  }

  .fls_cw {
    // cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    margin: 0 58px 0 69px;
    .fl_cw {
      //cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      div:nth-child(2) {
        margin-top: 10px;
      }
    }
    .fl_cw:hover {
      // flex-direction: column;
      // font-size: 18px;
      // font-family: PingFang SC;
      // font-weight: 600;
      // color: #1e86f9;
    }
  }
}
.content_list_cw {
  display: flex;
  align-items: center;
  .content_left_cw {
    width: 105px;
    height: 90px;
    background: linear-gradient(45deg, #1c75f2 0%, #319af7 100%);
    border-radius: 3px;
    margin-right: 21px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .day_cw {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .year_month_cw {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .content_right_cw {
    align-self: flex-start;
    .m-title_cw {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      width: 88%;
    }
    .count_tip_cw {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #666;
      i {
        margin-right: 10px;
      }
    }
  }
  .mid-bottom_cw {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #7b7b7b;
  }
  .h-left {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin: 3px 0 23px 0;
  }
}
.input-search {
  max-width: 800px;
  margin-top: 27px;
  ::v-deep .el-input__inner {
    height: 56px;
    font-size: 18px;
    // border-color: #516fd2;
    border-right: none;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
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
zixuntoutu .search-left {
  font-size: 30px;
  font-weight: 600;
  color: #516fd2;
}

.search-left_cw {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-top: 164px;
}
.search-left_detail_cw {
  margin-top: 26px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 300;
  color: #ffffff;
}

.search-right {
  width: 180px;
  /*height: 56px;*/
  background: #516fd2;
  border-radius: 4px;
  font-size: 18px;
  padding: 16px 20px;
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: -5px;
    margin-right: 8px;
  }
}
.content {
  padding: 0 calc((100% - 1245px) / 2) 38px;
}
.search-area {
  background-color: #ffffff;
  // padding: 26px 34px;
  height: 424px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
  background: url("../../assets/img/zixuntoutu.png") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
  // padding: 0 -220px -38px;
  // padding: 0 calc((100% - 1245px)/2) 38px
  .icon-text_cw {
    margin-left: 15px;
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 300;
  }
}
.outer-header_n {
  padding: 0 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .more {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
  }
}
.outer-header {
  padding: 0 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  margin-top: 30px;
  .title {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .more {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 300;
    color: #999999;
  }
}
.outer-card {
  margin-bottom: 25px;
  width: 100%;
  background: #fefefe;
  ::v-deep .el-card__header {
    padding: 0;
  }
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
  .more {
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    float: right;
    padding: 3px 0;
    i {
      font-weight: 600;
    }
  }
  .more:hover {
    cursor: pointer;
    color: #516fd2;
    font-size: 18px;
    float: right;
    padding: 3px 0;
    i {
      font-weight: 600;
    }
  }
}

.bb {
  ::v-deep .el-card__header {
    border-bottom: 1px solid #ebeef5;
  }
}

.mb0 {
  margin-bottom: 0;
}

.outer-layout {
  padding: 0 5px;
  margin-bottom: 15px;
}
.outer-layout_m {
  padding: 0 5px;
  margin: 0 20px;
}

.inner_card {
  .inner-top {
    display: flex;
    justify-content: flex-start;
    .inner-img {
      margin-right: 23px;
      img {
        width: 104px;
        height: 104px;
      }
    }

    .inner-title {
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin-top: 10px;
      margin-bottom: 31px;
    }
    .total_count {
      div {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }

    .inner-count {
      font-size: 16px;
      font-weight: 400;
      margin-top: 14px;
      color: #516fd2;
    }
  }
  .inner-desc {
    margin-top: 16px;
    margin-bottom: 28px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #999999;
    height: 48px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .bot-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    .inZl {
      .hover {
        width: 132px;
        height: 42px;
        background: linear-gradient(90deg, #1c75f2 0%, #319af7 100%);
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        line-height: 42px;
      }
      .outHover {
        width: 132px;
        height: 42px;
        background: #f6f6f6;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        text-align: center;
        line-height: 42px;
      }
    }
    .el-button {
      background: #516fd2;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.mid-bg {
  background: #eeeeee;
  .mid-layout {
    margin-bottom: 2px;
  }
}

.mid-card {
  cursor: pointer;
  ::v-deep .el-card__header {
    border-bottom: none;
    padding: 22px 30px 0;
  }
  .mid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .m-title {
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin-right: 40px;
    }

    .m-key,
    .m-time {
      font-size: 16px;
      font-weight: 400;
      color: #666666;
      margin-right: 20px;
    }

    .h-right {
      background: #516fd2;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      width: 107px;
      height: 35px;
      line-height: 35px;
      padding: 0;
    }
  }

  .mid-bottom {
    font-size: 18px;
    font-weight: 500;
    color: #999999;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.bot-bg {
  background: #eeeeee;
}

.bot-layout {
  margin-bottom: 2px;
}
.bot-card {
  cursor: pointer;
  h3 {
    font-size: 20px;
    font-weight: 500;
    color: #333333;
    margin: 0 0 17px;
  }

  .bot-cont {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    .bot-user {
      height: 58px;
      width: 58px;
      border-radius: 50%;
    }
    .bot-answer {
      margin: 0 50px 0 17px;
    }
  }
}
</style>
