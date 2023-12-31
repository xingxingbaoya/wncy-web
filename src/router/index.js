import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录" },
    hidden: true,
  },
  {
    path: "/forget",
    name: "Forget",
    component: () => import("@/views/login/forget"),
    meta: { title: "找回密码" },
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index"),
    meta: { title: "注册" },
    hidden: true,
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/index"),
        hidden: true,
        meta: {
          title: "首页",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },

      {
        path: "meet",
        name: "Meet",
        hidden: true,
        component: () => import("@/views/home/tradeMeeting"),
        meta: {
          title: "大会现场",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "rank",
        name: "Rank",
        hidden: true,
        component: () => import("@/views/home/rank"),
        meta: {
          title: "榜单汇总",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "rdetail",
        name: "RankDetail",
        hidden: true,
        component: () => import("@/views/home/rank-detail"),
        meta: {
          title: "榜单详情",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "policy",
        name: "PolicDeatil",
        hidden: true,
        component: () => import("@/views/home/policy"),
        meta: {
          title: "政策详情",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "guest",
        name: "Guest",
        hidden: true,
        component: () => import("@/views/home/guest"),
        meta: {
          title: "嘉宾列表",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "gdetail",
        name: "Guestdetail",
        hidden: true,
        component: () => import("@/views/home/guest-detail"),
        meta: {
          title: "嘉宾详情",
          activeMenu: "/",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
    ],
  },
  {
    path: "/projectmanage",
    component: Layout,
    children: [
      {
        path: "",
        name: "Projectmanage",
        component: () => import("@/views/projectmanage/index"),
        meta: {
          title: "科技成果",
          activeMenu: "/projectmanage",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "detail",
        name: "Projectmanagedetail",
        component: () => import("@/views/projectmanage/detail"),
        hidden: true,
        meta: {
          title: "项目详情",
          activeMenu: "/projectmanage",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "publish",
        name: "Projectmanagepublish",
        component: () => import("@/views/projectmanage/publish"),
        hidden: true,
        meta: {
          title: "项目发布",
          activeMenu: "/projectmanage",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
    ],
  },
  {
    path: "/activitieshall",
    component: Layout,
    children: [
      {
        path: "",
        name: "Activitieshall",
        component: () => import("@/views/activitieshall/index"),
        meta: {
          title: "产研对接",
          activeMenu: "/activitieshall",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "article",
        name: "Activitieshallarticle",
        hidden: true,
        component: () => import("@/views/activitieshall/article"),
        meta: {
          title: "文章详情",
          activeMenu: "/activitieshall",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
      {
        path: "signup",
        name: "Activitieshallsignup",
        hidden: true,
        component: () => import("@/views/activitieshall/signup"),
        meta: {
          title: "活动报名详情",
          activeMenu: "/activitieshall",
          roles: [
            "guest",
            "user",
            "enterprise",
            "organization",
            "expert",
            "manager",
          ],
        },
      },
    ],
  },
  {
    path: "/personal",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "center",
        hidden: true,
        component: () => import("@/views/personal/index"),
        meta: {
          title: "个人中心",
          roles: ["user", "enterprise", "organization", "expert", "manager"],
        },
        children: [
          {
            path: "/",
            name: "Personalread",
            hidden: true,
            component: () => import("@/views/personal/table"),
          },
          {
            path: "rejected",
            name: "Personalrejected",
            hidden: true,
            component: () => import("@/views/personal/rejected"),
          },
          {
            path: "edit",
            name: "Personaledit",
            hidden: true,
            component: () => import("@/views/personal/edit-account"),
          },
          {
            path: "edit-experts",
            name: "Personalexpertsedit",
            hidden: true,
            component: () => import("@/views/personal/edit-experts"),
          },
          {
            path: "edit-company",
            name: "Personalcompanyedit",
            hidden: true,
            component: () => import("@/views/personal/edit-company"),
          },
          {
            path: "edit-org",
            name: "Personalorgedit",
            hidden: true,
            component: () => import("@/views/personal/edit-org"),
          },
          {
            path: "edit-manger",
            name: "Personalmangeredit",
            hidden: true,
            component: () => import("@/views/personal/edit-manger"),
          },
          {
            path: "manger",
            name: "Personalmanger",
            hidden: true,
            component: () => import("@/views/personal/manger"),
          },
          {
            path: "org",
            name: "Personalorg",
            hidden: true,
            component: () => import("@/views/personal/org"),
          },
          {
            path: "experts",
            name: "Personalexperts",
            hidden: true,
            component: () => import("@/views/personal/experts"),
          },
          {
            path: "company",
            name: "Personalcompany",
            hidden: true,
            component: () => import("@/views/personal/company"),
          },
          {
            path: "pass",
            name: "Personalpass",
            hidden: true,
            component: () => import("@/views/personal/paas"),
          },
          {
            path: "search-project",
            name: "Personalproject",
            hidden: true,
            component: () => import("@/views/personal/ofme/project"),
          },
          {
            path: "edit-project",
            name: "Personaleditproject",
            hidden: true,
            component: () => import("@/views/personal/ofme/edit-project"),
          },
          {
            path: "detail-project",
            name: "Personaldetailproject",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-project"),
          },

          {
            path: "search-demand",
            name: "Personaldemand",
            hidden: true,
            component: () => import("@/views/personal/ofme/demand"),
          },
          {
            path: "edit-demand",
            name: "Personaleditdemand",
            hidden: true,
            component: () => import("@/views/personal/ofme/edit-demand"),
          },
          {
            path: "detail-demand",
            name: "Personaldetaildemand",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-demand"),
          },
          {
            path: "search-talent",
            name: "Personaltalent",
            hidden: true,
            component: () => import("@/views/personal/ofme/talent"),
          },
          {
            path: "edit-talent",
            name: "Personaledittalent",
            hidden: true,
            component: () => import("@/views/personal/ofme/edit-talent"),
          },
          {
            path: "detail-talent",
            name: "Personaldetailtalent",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-talent"),
          },
          {
            path: "search-activit",
            name: "Personalactivit",
            hidden: true,
            component: () => import("@/views/personal/ofme/activit"),
          },
          {
            path: "detail-activit",
            name: "Personaldetailactivit",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-activit"),
          },

          {
            path: "search-bbs",
            name: "Personalbbs",
            hidden: true,
            component: () => import("@/views/personal/ofme/bbs"),
          },

          {
            path: "detail-bbs",
            name: "Personaldetailbbs",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-bbs"),
          },

          {
            path: "edit-bbs",
            name: "Personaleditbbs",
            hidden: true,
            component: () => import("@/views/personal/ofme/edit-bbs"),
          },
          {
            path: "search-question",
            name: "Personalquestion",
            hidden: true,
            component: () => import("@/views/personal/ofme/question"),
          },

          {
            path: "detail-question",
            name: "Personaldetailquestion",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-question"),
          },

          {
            path: "edit-question",
            name: "Personaleditquestion",
            hidden: true,
            component: () => import("@/views/personal/ofme/edit-question"),
          },

          {
            path: "search-ask",
            name: "Personalask",
            hidden: true,
            component: () => import("@/views/personal/ofme/ask"),
          },

          {
            path: "detail-ask",
            name: "Personaldetailask",
            hidden: true,
            component: () => import("@/views/personal/ofme/detail-ask"),
          },
        ],
      },
    ],
  },
  {
    path: '/introduce',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        hidden: true,
        component: () => import('@/views/introduce/index'),
        meta: {
          title: '平台简介',
          // roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  {
    path: '/services',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        hidden: true,
        component: () => import('@/views/services/index'),
        meta: {
          title: '集成服务',
          // roles: ['user', 'enterprise', 'organization', 'expert', 'manager']
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: process.env.VUE_APP_MODE === "uat" ? "hash" : "history", // require service support
    // mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.VUE_APP_MODE === "uat" ? "/zgc" : "/",
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
