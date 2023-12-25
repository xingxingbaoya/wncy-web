import { imageIsExist } from '@/utils'

export default async function(el, binding, vnode) {
  const imgURL = binding.value// 获取图片地址
  if (imgURL) {
    const exist = await imageIsExist(imgURL)
    if (exist) {
      el.setAttribute('src', imgURL)
    }
  }
}

