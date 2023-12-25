import defaultSettings from '@/settings'

const title = defaultSettings.title || '中关村综合服务平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
