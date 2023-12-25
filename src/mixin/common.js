import map from '@/assets/city/city_code.json'
import moment from 'moment'
export default {
  data() {
    return {
      pager: {
        pageNum: 1,
        total: 60,
        pageSize: 6
      },
      loading: false,
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'city'
      },
      imgUrl: process.env.VUE_APP_IMG_URL,
      CaptchaPrefix: 'data:image/gif;base64,'
    }
  },
  mounted() {
    this.loadData && this.loadData()
  },
  filters: {
    formatDate: (value) => {
      if (!value) return ''
      return value.toString().split(' ')[0]
    },
    formatMeetTime: (value) => {
      if (!value) return ''
      return value.toString().split(' ')[1].slice(0, 5)
    },
    formatServiceTag: () => {
      if (!value) return ''
      return value.toString().split(' ')[0]
    },
    MapName: (provice, city, county) => {
      if (_.isEmpty(provice) || _.isEmpty(_.find(map, ['code', provice]))) {
        return '无'
      }
      const _provice = _.find(map, ['code', provice])

      if (_.isEmpty(city)) {
        return _provice?.name + ' '
      }

      const _city = _.find(_provice?.city, ['code', city])

      if (_.isEmpty(county)) {
        return _provice?.name + ' ' + _city?.name
      }
      const _county = _.find(_city?.city, ['code', county])
      return _provice?.name + ' ' + _city?.name + ' ' + _county?.name
    },
    formatCity: (value) => {
      if (!value) return ''
      const _provice = _.find(map, ['code', value])
      return _provice?.name
    },
    formatIndustryOne: (value) => {
      if (!value) return '无'
      const entry = _.find(JSON.parse(localStorage.getItem('dic-p_industry_one')), ['dictValue', value])
      return entry?.dictLabel
    },
    formatNature: (value) => {
      if (!value) return '无'
      if (value == '-') return '无'
      const entry = _.find(JSON.parse(localStorage.getItem('dic-p_nature')), ['dictValue', value])
      return entry?.dictLabel
    },
    formatCategory: (value) => {
      if (!value) return '无'
      if (value == '-') return '无'
      const entry = _.find(JSON.parse(localStorage.getItem('dic-p_patent_category')), ['dictValue', value])
      return entry?.dictLabel || '无'
    },
    formatKind: (value) => {
      if (!value) return ''
      const entry = _.find(JSON.parse(localStorage.getItem('dic-t_activity_kind')), ['dictValue', value])
      return entry?.dictLabel
    },
    formatCooperation: (value) => {
      if (!value) return '无'
      if (value == '-') return '无'
      return _.map(value.split(','), item => {
        const entry = _.find(JSON.parse(localStorage.getItem('dic-p_cooperation')), ['dictValue', item])
        return entry?.dictLabel
      }).join(' ')
    },
    formatCompany: (value) => {
      if (!value) return ''
      const entry = _.find(JSON.parse(localStorage.getItem('dic-u_company_type')), ['dictValue', value])
      return entry?.dictLabel
    },
    formatDegree: (value) => {
      if (!value) return ''
      const entry = _.find(JSON.parse(localStorage.getItem('dic-u_degree')), ['dictValue', value])
      return entry?.dictLabel
    },
    formatTech: (value) => {
      if (!value) return '无'
      if (value == '-') return '无'
      const entry = _.find(JSON.parse(localStorage.getItem('dic-p_tech_type')), ['dictValue', value?.toString()])
      return entry?.dictLabel
    },
    formatDevelopment: (value) => {
      if (!value) return '无'
      if (value == '-') return '无'
      const entry = _.find(JSON.parse(localStorage.getItem('dic-p_development')), ['dictValue', value])
      return entry?.dictLabel
    },

    formatInsnature: (value) => {
      if (!value) return ''
      const entry = _.find(JSON.parse(localStorage.getItem('dic-u_institutional_nature')), ['dictValue', value.toString()])
      return entry?.dictLabel
    },

    formatTimeLine(value) {
      if (!value) return '无'
      return moment(value).format('MM-DD HH:ss')
    },
    formatEmpty(value) {
      if (!value) return '无'
      if (value == '-') return '无'
      return value
    },
    formatAuth(status) {
      const sp = {
        '1': '待审核',
        '2': '审核通过',
        '3': '已驳回,请重新编辑'
      }
      return sp[status]
    },
    formatAsk(status) {
      const sp = {
        '0': '待审核',
        '1': '审核通过',
        '2': '已驳回'
      }
      return sp[status]
    },
    formatUserAuth(status) {
      const sp = {
        '0': '未认证,请先认证',
        '1': '请耐心等待审核',
        '2': '已认证通过',
        '3': '已驳回,请重新认证'
      }
      return sp[status]
    },
    formatRangeTime(value) {
      console.log(value)
      if (!value) return '无'
      if (value == '-') return '无'
      return value.join('至')
    }
  },
  methods: {
    handleCurrentChange(pageNum) {
      this.$set(this.pager, 'pageNum', pageNum)
      this.loadData(pageNum)
    },
    goBlank({ path = '/', query = {}}) {
      const { href } = this.$router.resolve({
        path,
        query
      })
      window.open(href, '_blank')
    },
    contactKf() {
      window.open(this.kfUrl + '/im/text/104eac.html', '', 'height=600, width=800,top=200,left=500,toolbar=no, menubar=no, scrollbars=no,resizable=no, location=no,status=no')
    },
    backTop() {
      const timer = setInterval(() => {
        const osTop = document.documentElement.scrollTop || document.body.scrollTop
        const ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        if (osTop === 0) {
          clearInterval(timer)
        }
      }, 30)
    },
    table_index(index) {
      return (this.pager.pageNum - 1) * this.pager.pageSize + index + 1
    },
    valiaForm(formRefs) {
      return formRefs.map(form => {
        return new Promise((resolve, reject) => {
          this.$refs[form].validate((valid) => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        })
      })
    }

  },
  computed: {
    kfUrl() {
      const urlMap={
        "test":"https://testkf.zgc-tattt.com",
        "prod":"https://kf.zgc-tattt.com"
      }
      return urlMap["prod"]
    },
    clearMargin: () => {
      return (index) => {
        return {
          'clear-margin': index > 0 && index % 4 === 3
        }
      }
    },
    clearPadding: () => {
      return (index) => {
        return {
          'clear-padding': index > 0 && index % 3 === 2
        }
      }
    },
    clearPaddingFou: () => {
      return (index) => {
        return {
          'clear-padding': index > 0 && index % 4 === 3
        }
      }
    },
    empty2Attr: () => {
      return (value) => {
        return _.isEmpty(value) ? '' : value
      }
    },
    formatStatus() {
      const sp = {
        '1': '初步洽谈',
        '2': '达成交易意向',
        '3': '价格谈判中',
        '4': '协议签署中',
        '5': '已签约'
      }
      return status => {
        return sp[status]
      }
    },
    formatLiveStatus() {
      const sp = {
        '3': '回放',
        '1': '直播中',
        '2': '即将播放'
      }
      return status => {
        return sp?.[status]
      }
    },
    formatTradeWay() {
      const sp = {
        '1': '转让',
        '2': '实施许可'
      }
      return status => {
        return sp?.[status]
      }
    },
    cityList() {
      return map
    },
    industryOneDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_industry_one'))
    },
    natureDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_nature'))
    },
    techTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_tech_type'))
    },
    developmentDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_development'))
    },

    patentCategoryDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_patent_category'))
    },

    cooperationDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_cooperation'))
    },
    activityKindDict: () => {
      return JSON.parse(localStorage.getItem('dic-t_activity_kind')).filter(item => item.dictCode != 261)
    },
    companyTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-u_company_type'))
    },
    natureTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-u_institutional_nature'))
    },
    degreeTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-u_degree'))
    },
    statusTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-bbs_manuscript_status'))
    },
    proNatureDict: () => {
      return JSON.parse(localStorage.getItem('dic-p_nature'))
    },
    policyTypeDict: () => {
      return JSON.parse(localStorage.getItem('dic-policy_type'))
    },
    supportIndDict: () => {
      return JSON.parse(localStorage.getItem('dic-support_ind'))
    },
    policyStateDict: () => {
      return JSON.parse(localStorage.getItem('dic-policy_state'))
    },

  }
}
