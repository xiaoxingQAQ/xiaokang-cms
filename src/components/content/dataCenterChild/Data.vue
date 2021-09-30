/* 设备数据页面 */
<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">数据总览</span>

      <div slot="data_1">0</div>
      <div slot="title_1">昨日新增激活设备</div>

      <div slot="data_3">0</div>
      <div slot="title_3">累计激活设备</div>
    </Card>

    <Card class="card_2">
      <span slot="leftTitle">设备增长</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow/>
        <div class="echarts" ref="echarts_1"></div>
      </div>
    </Card>

    <Card class="card_3">
      <span slot="leftTitle">设备活跃</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow/>
        <div class="echarts" ref="echarts_2"></div>
      </div>
    </Card>
  </div>
</template>

<script>
import DateRow from '@/components/content/dateRow/DateRow'
import Card from '@/components/content/card/Card'

export default {
  components: {
    Card,
    DateRow
  },
  mounted() {
    this.initEcharts_1()
    this.initEcharts_2()
  },
  methods: {
    // ECharts
    initEcharts_1() {
      let myEcharts = this.$echarts.init(this.$refs.echarts_1)
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增', '累计']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '新增',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '累计',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };

      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
    initEcharts_2() {
      let myEcharts = this.$echarts.init(this.$refs.echarts_2)
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '设备活跃',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      };

      // 5. 展示数据
      option && myEcharts.setOption(option)
    }
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .card_2,
  .card_3 {
    width: 100%;
    .echarts {
      width: 1000px;
      height: 500px;
    }
  }
}
</style>