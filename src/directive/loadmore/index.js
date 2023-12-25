import load from './load'

const install = function(Vue) {
  Vue.directive('loadmore', load)
}

if (window.Vue) {
  window['loadmore'] = load
  Vue.use(install); // eslint-disable-line
}

load.install = install
export default load
