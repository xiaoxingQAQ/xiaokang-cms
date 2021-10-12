/* 设备数据页面 */
<template>
  <div class="wrapper">
    <!-- 版本分布 -->
    <Card class="card_1">
      <span slot="leftTitle">版本分布</span>
      <div slot="main">
        <div class="echarts" id="echarts_1" ref="echarts_1"></div>
      </div>
    </Card>

    <!-- 版本排行 -->
    <Card class="card_2">
      <span slot="leftTitle">版本排行</span>
      <div slot="main">
        <div class="echarts" id="echarts_2" ref="echarts_2"></div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import { getDistribution, getRanking } from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
      option_1: {
        title: {
          text: 'Version of the distribution',
          subtext: 'Dynamic Data ',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '版本',
            type: 'pie',
            radius: '50%',
            center: ['60%', '60%'],
            data: [

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option_2: {
        title: {
          text: 'Version number',
          subtext: 'Dynamic Data ',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            formatter: '{a} <br/>{b}'
          }
        },
        grid: {
          x: '30%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          mim: 0,
          max: 'dataMax',
        },
        yAxis: {
          type: 'category',
          data: [],
          inverse: true,
          position: 'left',
          offset: 12, // y轴相对于默认位置的偏移
        },
        series: [
          {
            realtimeSort: true,
            name: '#',
            type: 'bar',
            data: [],

            itemStyle: {
              normal: {
                //这里是重点
                color(params) {
                  let colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5a75c8', '#73c0de', '#91c6ae', '#ea7ccc', '#fac858','#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5a75c8', '#73c0de', '#91c6ae', '#ea7ccc', '#fac858','#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5a75c8', '#73c0de', '#91c6ae', '#ea7ccc', '#fac858','#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#5a75c8', '#73c0de', '#91c6ae', '#ea7ccc', '#fac858'];
                  let index;
                  //给大于颜色数量的柱体添加循环颜色的判断
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length;
                    return colorList[index];
                  }
                  return colorList[params.dataIndex % colorList.length];
                }
              }
            },
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      },
      myEcharts_1: null,
      myEcharts_2: null,
    }
  },
  created() {
    this.getDistribution()
    this.getRanking()
  },
  mounted() {
    this.initEcharts_1()
    this.initEcharts_2()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    // 获取 版本饼图
    getDistribution() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.cancel()
      // 发送请求 
      getDistribution(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach(item => {
          let value = item.counts
          let name = item.hardVersion
          this.option_1.series[0].data.push({
            value,
            name
          })
        })
        let data = this.option_1.series[0].data
        this.myEcharts_1.hideLoading(); // 隐藏加载动画
        this.myEcharts_1.setOption({
          series: [
            {
              name: '版本',
              type: 'pie',
              radius: '50%',
              data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })
    },
    // 获取 版本排行
    getRanking() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.cancel()
      // 发送请求
      getRanking(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        console.log(res.data);
        res.data.forEach(item => {
          let value = item.counts
          let name = item.hardVersion
          this.option_2.series[0].data.push({
            value,
            name
          })
          this.option_2.yAxis.data.push(name)
        })
        let data_1 = this.option_2.yAxis.data
        let data = this.option_2.series[0].data
        this.myEcharts_2.hideLoading(); // 隐藏加载动画
        this.myEcharts_2.setOption({
          yAxis: {
            data: data_1
          },
          series: [
            {
              realtimeSort: true,
              name: '版本',
              type: 'bar',
              data,
            },

          ]
        })
      })
    },
    initEcharts_1() {
      this.myEcharts_1 = this.$echarts.init(this.$refs.echarts_1)

      let option = this.option_1
      let myEcharts = this.myEcharts_1;
      myEcharts.showLoading() // 开启加载动画
      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
    initEcharts_2() {
      this.myEcharts_2 = this.$echarts.init(this.$refs.echarts_2)

      let option = this.option_2;
      let myEcharts = this.myEcharts_2;
      myEcharts.showLoading() // 开启加载动画
      // 展示数据
      option && myEcharts.setOption(option);
    },

  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .card_1,
  .card_2 {
    .el-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .changeDate_1Btn {
        margin-right: 10px !important;
        width: 80px;
      }
      .date {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin-right: 5px;
          color: @color2;
          font-weight: bold;
        }
      }
    }
    .echarts {
      width: 1000px;
      min-height: 800px;
    }
  }

  .active {
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>