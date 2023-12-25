export default {
  bind(el, binding, vnode) {
    const selectWrap = el.querySelector('.el-table__body-wrapper')
    selectWrap.addEventListener('scroll', function() {
      const sign = 0
      console.log(this.scrollHeight, this.scrollTop, this.clientHeight)
      const scrollDistance = this.scrollHeight - Math.ceil(this.scrollTop) - this.clientHeight
      if (scrollDistance <= sign) {
        binding.value()
      }
    })
  }
}
