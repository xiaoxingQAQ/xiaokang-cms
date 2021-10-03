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
        <DateRow />
        <div class="echarts" ref="echarts_1"></div>
      </div>
    </Card>

    <Card class="card_3">
      <span slot="leftTitle">设备活跃</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow />
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
      option_2: {}, // echarts_2
    }
  },
  created() {
    this.getIncrease_7day()
    this.getUserData()
  },
  mounted() {
    this.initEcharts_1()
    this.initEcharts_2()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  watch: {
    option_1: {
      handler(val, oldVal) {
        if (val != oldVal) {
          this.option_1 = val
        }
      },
      deep: true
    }
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
        if (res.code != 1) return this.$message.error('获取数据失败')
        this.yestuser = res.data.yestuser
        this.accumuser = res.data.accumuser
      })
    },
    // 获取设备 最近7天 增长数据
    getIncrease_7day() {
      let day = 30;
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
        if (res.code != 1) return this.$message.error('获取数据失败')

        console.log(res.data);
        res.data.forEach(item => {
          let newlate = item.newlate;
          let accumulate = item.accumulate
          let date = item.date
          console.log(this.option_1);
          this.option_1.series[0].data.push(newlate)
          this.option_1.series[1].data.push(accumulate)
          this.option_1.xAxis.data.push(date)
        });
        let series_1 = this.option_1.series[0].data
        let series_2 = this.option_1.series[1].data
        let xAxis = this.option_1.xAxis.data
        this.myEcharts_1.hideLoading(); //隐藏加载动画
        this.myEcharts_1.setOption({ //加载数据图表
          xAxis: {
            data: xAxis
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
    getIncrease_14day() {
      let startdate = getDate(0)
      let enddate = getDate(-14)
    },
    getIncrease_30day() {
      let startdate = getDate(0)
      let enddate = getDate(-30)
    },
    // 获取设备活跃数据
    getActive() {

    },
    // ECharts
    initEcharts_1() {
      this.$nextTick(() => {
        this.myEcharts_1 = this.$echarts.init(this.$refs.echarts_1)

        let myEcharts = this.myEcharts_1
        let option = this.option_1
        myEcharts.showLoading()
        console.log(option);
        // 5. 展示数据
        option && myEcharts.setOption(option)
      })
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
      this.option_2 = option
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