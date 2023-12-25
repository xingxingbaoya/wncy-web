import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getRole, getToken, getUser, setRole } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { hasPermission } from '@/store/modules/permission'
import { getStatistics } from '@/api/home'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo

      if (hasPermission(getRole(), to)) {
        next()
      } else {
        try {
          Message.warning({
            message: '暂无权限,请认证'
          })
          next('/personal/center/')
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          // next()
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      setRole(['guest'])
      if (hasPermission(getRole(), to)) {
        next()
      } else {
        Message.warning('请先登录,继续操作')
        next(`/login`)
      }
      NProgress.done()
    }
  }
})

router.afterEach((to, from, next) => {
  const { query } = to
  const page = to?.name?.match(/.+(?=hall)/g) || to?.name == 'Home' || to?.name == 'Meet'
  if (page) {
    getStatistics({
      'businessId': query?.id || query?.congressId,
      'pageType': _.isArray(page) ? page[0].toLowerCase() : to?.name.toLowerCase()
    }).catch(error => {
      console.log(error)
    })
  }
  // finish progress bar
  NProgress.done()
})
