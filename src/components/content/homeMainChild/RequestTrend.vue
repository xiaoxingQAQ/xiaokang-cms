<template>
  <div>
    <!-- 返回 -->
    <el-row class="back">
      <el-col :span="6">
        <i class="el-icon-back" @click="goBack">&nbsp返回</i>
      </el-col>
    </el-row>
    <Card>
      <span slot="leftTitle">设备增长</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow @onChange="getTrend_1" @Change="getTrend_2" />
        <div class="echarts" ref="echarts"></div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import DateRow from '@/components/content/dateRow/DateRow'
import { getTrend } from '@/network/home'
import { getDate } from '@/utils/getDate'

export default {
  components: {
    Card,
    DateRow
  },
  data() {
    return {
      isChange: false,
      // echarts
      myEcharts: null,
      // echarts
      option: {
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
      },
    }
  },
  created() {
    this.getTrend_1()
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    goBack() {
      this.$emit('onChange')
    },
    // 获取 请求趋势的数据
    getTrend_1(day = 0) {
      this.option.series[0].data = []
      this.option.series[1].data = []
      this.option.xAxis.data = []

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
      let type = day + ''
      const data = {
        startdate,
        type
      }
      // 发送请求 获取请求趋势的数据
      getTrend(data).then(res => {
        console.log('res: ', res);

        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let upcount = item.upcount;
          let sumcount = item.sumcount
          let time = item.time
          this.option.series[0].data.push(upcount)
          this.option.series[1].data.push(sumcount)
          this.option.xAxis.data.push(time)
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
    getTrend_2(day, start_date) {
      this.option.series[0].data = []
      this.option.series[1].data = []
      this.option.xAxis.data = []

      let startdate = start_date + ''
      let type = day + ''
      const data = {
        startdate,
        type
      }
      // 发送请求 获取请求趋势的数据
      getTrend(data).then(res => {
        console.log('res: ', res);

        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let upcount = item.upcount;
          let sumcount = item.sumcount
          let time = item.time
          this.option.series[0].data.push(upcount)
          this.option.series[1].data.push(sumcount)
          this.option.xAxis.data.push(time)
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
    // ECharts
    initEcharts() {
      this.myEcharts = this.$echarts.init(this.$refs.echarts)

      let myEcharts = this.myEcharts
      let option = this.option
      myEcharts.showLoading()
      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped>
.echarts {
  width: 1050px;
  height: 500px;
}
.back {
  i {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
  }
  i:hover {
    color: #409eff;
  }
}
</style>