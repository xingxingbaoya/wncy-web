<template>
  <div :class="className" class="base-chart" />
</template>

<script>
import * as echarts from 'echarts'
import map from '@/assets/city/city_code.json'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    mapData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    asyncData() {
      return this.mapData
    }
  },
  watch: {
    asyncData: {
      deep: true,
      handler(asyncData) {
        this.refreshData(asyncData)
      }
    },
    height() {
      this.resizeHeight()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    window.removeEventListener('resize', this.resizeHeight, false)
    this.chart = null
  },
  methods: {
    initChart() {
      echarts.registerMap('china', { geoJSON: map })
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({

        visualMap: {
          show: false, // 地图图例
          showLabel: true,
          pieces: [
            {
              gte: 199999,
              label: '> 200000',
              color: '#4062d7'
            },
            {
              gte: 149999,
              lt: 199999,
              label: '149999 - 199999',
              color: '#4D6DDA'
            },
            {
              gte: 49999,
              lt: 99999,
              label: '49999 - 99999',
              color: '#577FFF'
            },
            {
              gte: 10000,
              lt: 49999,
              label: '10000 - 49999',
              color: '#577FFF'
            },
            {
              lt: 10000,
              label: '<10000',
              color: '#9DB1F8'
            }
          ]
        },
        geo: { // 中国地图设置
          map: 'china',
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.5,
          top: 120,
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            itemStyle: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            type: 'map',
            geoIndex: 0,
            map: 'china',
            data: this.asyncData
          }
        ]
      }
      )

      this.chart.on('click', (params) => {
        // 逻辑控制
        this.$emit('mapData', params.data)
      })
      window.addEventListener('resize', this.resizeHeight, false)
    },
    refreshData(asyncData) {
      // 刷新数据
      const option = this.chart.getOption()
      option.series[0].data = asyncData
      this.chart.setOption(option, true)
    },
    resizeHeight() {
      this.chart?.resize()
    }
  }
}
</script>
<style scoped lang="scss">
.base-chart {
  width: 100%;
  height: 100%;
  //width: 600px !important;
  //height: 500px !important;
}
</style>
