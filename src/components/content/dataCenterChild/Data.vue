/* 设备数据页面 */
<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">数据总览</span>

      <div slot="data_1" v-if="yestuser == ''">0</div>
      <div slot="data_1" v-else>{{ yestuser }}</div>
      <div slot="title_1">昨日新增激活设备</div>

      <div slot="data_3" v-if="accumuser == ''">0</div>
      <div slot="data_3" v-else>{{ accumuser }}</div>
      <div slot="title_3">累计激活设备</div>
    </Card>
    <!-- 折线统计图 -->
    <Card class="card_2">
      <span slot="leftTitle">设备增长</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow @onChange="getIncrease_1" @Change="getIncrease_2" />
        <div class="echarts" ref="echarts_1"></div>
      </div>
    </Card>

    <Card class="card_3">
      <span slot="leftTitle">设备活跃</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow  @onChange="getActive_1" @Change="getActive_2" />
        <div class="echarts" ref="echarts_2"></div>
      </div>
    </Card>
  </div>
</template>

<script>
import DateRow from '@/components/content/dateRow/DateRow'
import Card from '@/components/content/card/Card'

import { getUserData, getIncrease, getActive } from '@/network/home'
import { mapState } from 'vuex'
import { getDate } from '@/utils/getDate'

export default {
  components: {
    Card,
    DateRow
  },
  data() {
    return {
      accumuser: '', //累计激活
      yestuser: '', // 昨日新增激活
      myEcharts_1: null,
      myEcharts_2: null,
      option_1: {
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
          bottom: '0%',
          containLabel: true
        },
        toolbox: {
          feature: {
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '新增',
            type: 'line',
            stack: 'Total',
            data: []
          },
          {
            name: '累计',
            type: 'line',
            stack: 'Total',
            data: []
          }
        ]
      }, // echarts_1
      option_2: {
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
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '设备活跃',
            type: 'line',
            stack: 'Total',
            data: []
          }
        ]
      }, // echarts_2
    }
  },
  created() {
    this.getActive_1()
    this.getIncrease_1()
    this.getUserData()
  },
  mounted() {
    this.initEcharts_1()
    this.initEcharts_2()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    // 获取用户数据
    getUserData() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      // 发送请求
      getUserData(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        this.yestuser = res.data.yestuser
        this.accumuser = res.data.accumuser
      })
    },
    // 获取设备增长数据 （默认最近7天）
    getIncrease_1(day = 0) {
      this.option_1.series[0].data = []
      this.option_1.series[1].data = []
      this.option_1.xAxis.data = []

      switch (day) {
        case 0:
          day = 7
          break;
        case 1:
          day = 14
          break;
        case 2:
          day = 30
          break;
      }
      let startdate = getDate(-day) + ''
      let enddate = getDate(0) + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type
      }
      // 发送请求
      getIncrease(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let newlate = item.newlate;
          let accumulate = item.accumulate
          let date = item.date
          this.option_1.series[0].data.push(newlate)
          this.option_1.series[1].data.push(accumulate)
          this.option_1.xAxis.data.push(date)
        });
        let series_1 = this.option_1.series[0].data
        let series_2 = this.option_1.series[1].data
        let xAxis_1 = this.option_1.xAxis.data

        this.myEcharts_1.hideLoading(); // 隐藏加载动画
        this.myEcharts_1.setOption({ // 加载数据图表
          xAxis: {
            data: xAxis_1
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '新增',
              data: series_1
            },
            {
              // 根据名字对应到相应的系列
              name: '累计',
              data: series_2
            }
          ]
        })
      })

    },
    getIncrease_2(day, start_date, end_date) {
      this.option_1.series[0].data = []
      this.option_1.series[1].data = []
      this.option_1.xAxis.data = []

      console.log('day, startdate, enddate: ', day, startdate, enddate);
      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type
      }
      // 发送请求
      getIncrease(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let newlate = item.newlate;
          let accumulate = item.accumulate
          let date = item.date
          this.option_1.series[0].data.push(newlate)
          this.option_1.series[1].data.push(accumulate)
          this.option_1.xAxis.data.push(date)
        });
        let series_1 = this.option_1.series[0].data
        let series_2 = this.option_1.series[1].data
        let xAxis_1 = this.option_1.xAxis.data

        this.myEcharts_1.hideLoading(); // 隐藏加载动画
        this.myEcharts_1.setOption({ // 加载数据图表
          xAxis: {
            data: xAxis_1
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '新增',
              data: series_1
            },
            {
              // 根据名字对应到相应的系列
              name: '累计',
              data: series_2
            }
          ]
        })
      })

    },
    // 获取设备活跃数据
    getActive_1(day = 0) {
      this.option_2.series[0].data = []
      this.option_2.xAxis.data = []

      switch (day) {
        case 0:
          day = 7
          break;
        case 1:
          day = 14
          break;
        case 2:
          day = 30
          break;
      }
      let startdate = getDate(-day) + ''
      let enddate = getDate(0) + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type
      }
      // 发送请求
      getActive(data).then(res => {
        console.log(res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let time = item.time
          let sumcount = item.sumcount
          this.option_2.series[0].data.push(sumcount)
          this.option_2.xAxis.data.push(time)
        })
        let series = this.option_2.series[0].data
        let xAxis = this.option_2.xAxis.data
        this.myEcharts_2.hideLoading(); // 隐藏加载动画
        this.myEcharts_2.setOption({ // 加载数据图表
          xAxis: {
            data: xAxis
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '设备活跃',
              data: series
            },
          ]
        })
      })
    },
    getActive_2(day, start_date, end_date) {
      this.option_2.series[0].data = []
      this.option_2.xAxis.data = []

      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type
      }
      // 发送请求
      getActive(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let time = item.time
          let sumcount = item.sumcount
          this.option_2.series[0].data.push(sumcount)
          this.option_2.xAxis.data.push(time)
        })
        let series = this.option_2.series[0].data
        let xAxis = this.option_2.xAxis.data
        this.myEcharts_2.hideLoading(); // 隐藏加载动画
        this.myEcharts_2.setOption({ // 加载数据图表
          xAxis: {
            data: xAxis
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '设备活跃',
              data: series
            },
          ]
        })
      })

    },
    // ECharts
    initEcharts_1() {
      this.myEcharts_1 = this.$echarts.init(this.$refs.echarts_1)

      let myEcharts = this.myEcharts_1
      let option = this.option_1
      myEcharts.showLoading()
      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
    initEcharts_2() {
      this.myEcharts_2 = this.$echarts.init(this.$refs.echarts_2)

      let myEcharts = this.myEcharts_2
      let option = this.option_2
      myEcharts.showLoading()
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
    .echarts {
      width: 1050px;
      height: 500px;
    }
  }
}
</style>