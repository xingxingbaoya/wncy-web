import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/login/forget'),
    meta: { title: '找回密码' },
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index'),
    meta: { title: '注册' },
    hidden: true
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },

      {
        path: 'meet',
        name: 'Meet',
        hidden: true,
        component: () => import('@/views/home/tradeMeeting'),
        meta: {
          title: '大会现场', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'rank',
        name: 'Rank',
        hidden: true,
        component: () => import('@/views/home/rank'),
        meta: {
          title: '榜单汇总', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'rdetail',
        name: 'RankDetail',
        hidden: true,
        component: () => import('@/views/home/rank-detail'),
        meta: {
          title: '榜单详情', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'policy',
        name: 'PolicDeatil',
        hidden: true,
        component: () => import('@/views/home/policy'),
        meta: {
          title: '政策详情', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'guest',
        name: 'Guest',
        hidden: true,
        component: () => import('@/views/home/guest'),
        meta: {
          title: '嘉宾列表', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'gdetail',
        name: 'Guestdetail',
        hidden: true,
        component: () => import('@/views/home/guest-detail'),
        meta: {
          title: '嘉宾详情', activeMenu: '/',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/projectmanage',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Projectmanage',
        component: () => import('@/views/projectmanage/index'),
        meta: {
          title: '科技成本', activeMenu: '/projectmanage',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'detail',
        name: 'Projectmanagedetail',
        component: () => import('@/views/projectmanage/detail'),
        hidden: true,
        meta: {
          title: '项目详情', activeMenu: '/projectmanage',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'publish',
        name: 'Projectmanagepublish',
        component: () => import('@/views/projectmanage/publish'),
        hidden: true,
        meta: {
          title: '项目发布', activeMenu: '/projectmanage',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
    ]
  },
  // {
  //   path: '/projecthall',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Projecthall',
  //       component: () => import('@/views/projecthall/index'),
  //       meta: {
  //         title: '项目大厅', activeMenu: '/projecthall',
  //         roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
  //       }
  //     },
  //     {
  //       path: 'detail',
  //       name: 'Projecthalldetail',
  //       hidden: true,
  //       component: () => import('@/views/projecthall/detail'),
  //       meta: {
  //         title: '项目详情', activeMenu: '/projecthall',
  //         roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
  //       }
  //     },
  //     {
  //       path: 'post',
  //       name: 'Projecthallpost',
  //       hidden: true,
  //       component: () => import('@/views/projecthall/post'),
  //       meta: {
  //         title: '发布项目', activeMenu: '/projecthall',
  //         roles: ['enterprise', 'organization', 'manager']
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/demandhall',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'Demandhall',
  //       component: () => import('@/views/demandhall/index'),
  //       meta: {
  //         title: '需求大厅', activeMenu: '/demandhall',
  //         roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
  //       }
  //     },
  //     {
  //       path: 'detail',
  //       name: 'Demandhalldetail',
  //       hidden: true,
  //       component: () => import('@/views/demandhall/detail'),
  //       meta: {
  //         title: '需求详情', activeMenu: '/demandhall',
  //         roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
  //       }
  //     },
  //     {
  //       path: 'post',
  //       name: 'Demandhallpost',
  //       hidden: true,
  //       component: () => import('@/views/demandhall/post'),
  //       meta: {
  //         title: '发布需求', activeMenu: '/demandhall',
  //         roles: ['enterprise', 'organization', 'manager']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/activitieshall',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Activitieshall',
        component: () => import('@/views/activitieshall/index'),
        meta: {
          title: '产研对接', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'more',
        name: 'Activitieshallmore',
        hidden: true,
        component: () => import('@/views/activitieshall/more'),
        meta: {
          title: '查看更多', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'activityLthd',
        name: 'ActivityLthd',
        hidden: true,
        component: () => import('@/views/activitieshall/lthdList.vue'),
        meta: {
          title: '查看更多', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'video',
        name: 'Activitieshallvideo',
        hidden: true,
        component: () => import('@/views/activitieshall/video'),
        meta: {
          title: '视频详情', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'live',
        name: 'Activitieshalllive',
        hidden: true,
        component: () => import('@/views/activitieshall/live'),
        meta: {
          title: '直播详情', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager'
          ]
        }
      },
      {
        path: 'article',
        name: 'Activitieshallarticle',
        hidden: true,
        component: () => import('@/views/activitieshall/article'),
        meta: {
          title: '文章详情', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'signup',
        name: 'Activitieshallsignup',
        hidden: true,
        component: () => import('@/views/activitieshall/signup'),
        meta: {
          title: '活动报名详情', activeMenu: '/activitieshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/companyintro',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Companyintro',
        component: () => import('@/views/companyintro/index'),
        meta: {
          title: '公司介绍', activeMenu: '/companyintro',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
    ]
  },
  {
    path: '/tradinghall',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'Tradinghall',
        component: () => import('@/views/tradinghall/index'),
        meta: {
          title: '交易大厅', activeMenu: '/tradinghall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'process',
        name: 'Tradinghallprocess',
        hidden: true,
        component: () => import('@/views/tradinghall/process'),
        meta: {
          title: '交易进度', activeMenu: '/tradinghall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'process-detail',
        name: 'TradinghallProcessdetail',
        hidden: true,
        component: () => import('@/views/tradinghall/process-detail'),
        meta: {
          title: '交易进度详情', activeMenu: '/tradinghall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'result',
        name: 'Tradinghallresult',
        hidden: true,
        component: () => import('@/views/tradinghall/result'),
        meta: {
          title: '交易成果', activeMenu: '/tradinghall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'result-detail',
        name: 'TradinghallResultdetail',
        hidden: true,
        component: () => import('@/views/tradinghall/result-detail'),
        meta: {
          title: '交易成果详情', activeMenu: '/tradinghall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'org',
        name: 'Tradinghallorg',
        hidden: true,
        component: () => import('@/views/tradinghall/org'),
        meta: {
          title: '合作机构', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'org-detail',
        name: 'TradinghallOrgdetail',
        hidden: true,
        component: () => import('@/views/tradinghall/org-detail'),
        meta: {
          title: '合作机构', activeMenu: '/servicehall',
          roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/servicehall',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Platformservices',
        component: () => import('@/views/platformservices/index'),
        meta: {
          title: '平台服务', activeMenu: '/platformservices',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: '',
        name: 'Servicehall',
        hidden: true,
        component: () => import('@/views/servicehall/index'),
        meta: {
          title: '服务大厅', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'more',
        name: 'Servicehallmore',
        hidden: true,
        component: () => import('@/views/servicehall/more'),
        meta: {
          title: '查看更多', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'serviceDetail',
        name: 'ServiceDetail',
        hidden: true,
        component: () => import('@/views/servicehall/serviceDetail'),
        meta: {
          title: '服务', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'detail',
        name: 'Servicehalldetail',
        hidden: true,
        component: () => import('@/views/servicehall/detail'),
        meta: {
          title: '专题详情', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'circle',
        name: 'Servicehallcircle',
        hidden: true,
        component: () => import('@/views/servicehall/circle'),
        meta: {
          title: '机构详情', activeMenu: '/servicehall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/bbshall',
    component: Layout,
    // hidden: process.env.VUE_APP_MODE === 'prod',
    children: [
      {
        path: '',
        name: 'BBShall',
        component: () => import('@/views/bbshall/index'),
        hidden: true,
        meta: {
          title: '资讯大厅', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'newDetal',
        name: 'NewDetal',
        hidden: true,
        component: () => import('@/views/bbshall/newsDetail.vue'),
        meta: {
          title: '新闻详情', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'newsList',
        name: 'NewsList',
        hidden: true,
        component: () => import('@/views/bbshall/newsList.vue'),
        meta: {
          title: '新闻资讯', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'policyDetail',
        name: 'PolicyDetail',
        hidden: true,
        component: () => import('@/views/bbshall/policyDetail.vue'),
        meta: {
          title: '科技专栏', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'article',
        name: 'Bbshallarticle',
        hidden: true,
        component: () => import('@/views/bbshall/article'),
        meta: {
          title: '文章详情', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'policyDeclaration',
        name: 'PolicyDeclaration',
        hidden: true,
        component: () => import('@/views/bbshall/policyDeclaration.vue'),
        meta: {
          title: '科技专栏', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'toDeclare',
        name: 'ToDeclare',
        hidden: true,
        component: () => import('@/views/bbshall/toDeclare.vue'),
        meta: {
          title: '科技专栏', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'more',
        name: 'BBShallmore',
        hidden: true,
        component: () => import('@/views/bbshall/more'),
        meta: {
          title: '科技专栏', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'question',
        name: 'BBShallquestion',
        hidden: true,
        component: () => import('@/views/bbshall/question'),
        meta: {
          title: '科技问答', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'answer',
        name: 'BBShallanswer',
        hidden: true,
        component: () => import('@/views/bbshall/answer'),
        meta: {
          title: '科技问答', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'ask',
        name: 'BBShallask',
        hidden: true,
        component: () => import('@/views/bbshall/ask'),
        meta: {
          title: '我要提问', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'list',
        name: 'BBShalllist',
        hidden: true,
        component: () => import('@/views/bbshall/list'),
        meta: {
          title: '专栏列表', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'information',
        name: 'BBShallinformation',
        hidden: true,
        component: () => import('@/views/bbshall/information'),
        meta: {
          title: '行业资讯', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'technology',
        name: 'BBShalltechnology',
        hidden: true,
        component: () => import('@/views/bbshall/technology'),
        meta: {
          title: '文章详情', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'industry',
        name: 'BBShallindustry',
        hidden: true,
        component: () => import('@/views/bbshall/industry'),
        meta: {
          title: '文章详情', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'post',
        name: 'BBShallpost',
        hidden: true,
        component: () => import('@/views/bbshall/post'),
        meta: {
          title: '我要投稿', activeMenu: '/bbshall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/talenthall',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Talenthall',
        component: () => import('@/views/talenthall/index'),
        hidden: true,
        meta: {
          title: '人才大厅', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'improve',
        name: 'Talenthallimprove',
        hidden: true,
        component: () => import('@/views/talenthall/improve'),
        meta: {
          title: '人才提升', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'manager',
        name: 'Talenthallmanager',
        hidden: true,
        component: () => import('@/views/talenthall/manager'),
        meta: {
          title: '技术经理人', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'experts',
        name: 'Talenthallexperts',
        hidden: true,
        component: () => import('@/views/talenthall/experts'),
        meta: {
          title: '合作专家', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'detail',
        name: 'Talenthalldetail',
        hidden: true,
        component: () => import('@/views/talenthall/detail'),
        meta: {
          title: '课程详情', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'udetail',
        name: 'Talenthalludetail',
        hidden: true,
        component: () => import('@/views/talenthall/udetail'),
        meta: {
          title: '专家详情', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'mdetail',
        name: 'Talenthalludetail',
        hidden: true,
        component: () => import('@/views/talenthall/mdetail'),
        meta: {
          title: '技术经理人详情', activeMenu: '/talenthall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }

    ]
  },
  {
    path: '/meethall',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Meethall',
        component: () => import('@/components/middlePage/index.vue'),//中间页
        hidden: true,
        meta: {
          title: '大会专栏404', activeMenu: '/meethall',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetDetail',
        name: 'MeetDetail',
        hidden: true,
        component: () => import('@/views/meethall/meetDetail.vue'),
        meta: {
          title: '会议内容', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'activityDetail',
        name: 'ActivityDetail',
        hidden: true,
        component: () => import('@/views/meethall/activityDetail'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetLive',
        name: 'MeetLive',
        hidden: true,
        component: () => import('@/views/meethall/vadio.vue'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetMore',
        name: 'MeetMore',
        hidden: true,
        component: () => import('@/views/meethall/more.vue'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },]
    },
  {
    path: '/meethall1',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Meethall1',
        hidden: true,
        component: () => import('@/views/meethall/tradeMeeting.vue'),
        meta: {
          title: '大会专栏', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetDetail',
        name: 'MeetDetail',
        hidden: true,
        component: () => import('@/views/meethall/meetDetail.vue'),
        meta: {
          title: '会议内容', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'activityDetail',
        name: 'ActivityDetail',
        hidden: true,
        component: () => import('@/views/meethall/activityDetail'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetLive',
        name: 'MeetLive',
        hidden: true,
        component: () => import('@/views/meethall/vadio.vue'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
      {
        path: 'meetMore',
        name: 'MeetMore',
        hidden: true,
        component: () => import('@/views/meethall/more.vue'),
        meta: {
          title: '大会现场', activeMenu: '/meethall1',
          roles: ['guest', 'user', 'enterprise', 'organization', 'expert', 'manager']
        }
      },
    ]
  },
  {
    path: '/personal',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'center',
        hidden: true,
        component: () => import('@/views/personal/index'),
        meta: {
          title: '个人中心',
          roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
        },
        children: [
          {
            path: '/',
            name: 'Personalread',
            hidden: true,
            component: () => import('@/views/personal/account')
          },
          {
            path: 'rejected',
            name: 'Personalrejected',
            hidden: true,
            component: () => import('@/views/personal/rejected')
          },
          {
            path: 'edit',
            name: 'Personaledit',
            hidden: true,
            component: () => import('@/views/personal/edit-account')
          },
          {
            path: 'edit-experts',
            name: 'Personalexpertsedit',
            hidden: true,
            component: () => import('@/views/personal/edit-experts')
          },
          {
            path: 'edit-company',
            name: 'Personalcompanyedit',
            hidden: true,
            component: () => import('@/views/personal/edit-company')
          },
          {
            path: 'edit-org',
            name: 'Personalorgedit',
            hidden: true,
            component: () => import('@/views/personal/edit-org')
          },
          {
            path: 'edit-manger',
            name: 'Personalmangeredit',
            hidden: true,
            component: () => import('@/views/personal/edit-manger')
          },
          {
            path: 'manger',
            name: 'Personalmanger',
            hidden: true,
            component: () => import('@/views/personal/manger')
          },
          {
            path: 'org',
            name: 'Personalorg',
            hidden: true,
            component: () => import('@/views/personal/org')
          },
          {
            path: 'experts',
            name: 'Personalexperts',
            hidden: true,
            component: () => import('@/views/personal/experts')
          },
          {
            path: 'company',
            name: 'Personalcompany',
            hidden: true,
            component: () => import('@/views/personal/company')
          },
          {
            path: 'pass',
            name: 'Personalpass',
            hidden: true,
            component: () => import('@/views/personal/paas')
          },
          {
            path: 'search-project',
            name: 'Personalproject',
            hidden: true,
            component: () => import('@/views/personal/ofme/project')
          },
          {
            path: 'edit-project',
            name: 'Personaleditproject',
            hidden: true,
            component: () => import('@/views/personal/ofme/edit-project')
          },
          {
            path: 'detail-project',
            name: 'Personaldetailproject',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-project')
          },

          {
            path: 'search-demand',
            name: 'Personaldemand',
            hidden: true,
            component: () => import('@/views/personal/ofme/demand')
          },
          {
            path: 'edit-demand',
            name: 'Personaleditdemand',
            hidden: true,
            component: () => import('@/views/personal/ofme/edit-demand')
          },
          {
            path: 'detail-demand',
            name: 'Personaldetaildemand',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-demand')
          },
          {
            path: 'search-talent',
            name: 'Personaltalent',
            hidden: true,
            component: () => import('@/views/personal/ofme/talent')
          },
          {
            path: 'edit-talent',
            name: 'Personaledittalent',
            hidden: true,
            component: () => import('@/views/personal/ofme/edit-talent')
          },
          {
            path: 'detail-talent',
            name: 'Personaldetailtalent',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-talent')
          },
          {
            path: 'search-activit',
            name: 'Personalactivit',
            hidden: true,
            component: () => import('@/views/personal/ofme/activit')
          },
          {
            path: 'detail-activit',
            name: 'Personaldetailactivit',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-activit')
          },

          {
            path: 'search-bbs',
            name: 'Personalbbs',
            hidden: true,
            component: () => import('@/views/personal/ofme/bbs')
          },

          {
            path: 'detail-bbs',
            name: 'Personaldetailbbs',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-bbs')
          },

          {
            path: 'edit-bbs',
            name: 'Personaleditbbs',
            hidden: true,
            component: () => import('@/views/personal/ofme/edit-bbs')
          },
          {
            path: 'search-question',
            name: 'Personalquestion',
            hidden: true,
            component: () => import('@/views/personal/ofme/question')
          },

          {
            path: 'detail-question',
            name: 'Personaldetailquestion',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-question')
          },

          {
            path: 'edit-question',
            name: 'Personaleditquestion',
            hidden: true,
            component: () => import('@/views/personal/ofme/edit-question')
          },

          {
            path: 'search-ask',
            name: 'Personalask',
            hidden: true,
            component: () => import('@/views/personal/ofme/ask')
          },

          {
            path: 'detail-ask',
            name: 'Personaldetailask',
            hidden: true,
            component: () => import('@/views/personal/ofme/detail-ask')
          }

        ]
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: process.env.VUE_APP_MODE === 'uat' ? 'hash' : 'history', // require service support
  // mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.VUE_APP_MODE === 'uat' ? '/zgc' : '/',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
