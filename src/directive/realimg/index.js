import realImg from './load'

const install = function(Vue) {
  Vue.directive('real-img', realImg)
}

if (window.Vue) {
  window['real-img'] = realImg
  Vue.use(install); // eslint-disable-line
}

realImg.install = install
export default realImg
