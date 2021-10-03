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

export default {
  components: {
    Card,
  },
  data() {
    return {

    }
  },
  mounted() {
    this.initEcharts_1()
    this.initEcharts_2()
  },
  methods: {
    initEcharts_1() {
      let myEcharts = this.$echarts.init(this.$refs.echarts_1)
      let option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
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
      };
      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
    initEcharts_2() {
      let myEcharts = this.$echarts.init(this.$refs.echarts_2)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            formatter: '{a} <br/>{b}'
          }
        },
        xAxis: {
          mim: 0,
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          inverse: true,
        },
        series: [
          {
            realtimeSort: true,
            name: '#',
            type: 'bar',
            data: [
              { value: 1048, name: 'A' },
              { value: 735, name: 'B' },
              { value: 580, name: 'C' },
              { value: 484, name: 'D' },
              { value: 300, name: 'E' },
              { value: 108, name: 'F' },
              { value: 75, name: '6' },
              { value: 80, name: '7' },
            ],
            itemStyle: {
              normal: {
                //这里是重点
                color(params) {
                  let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622'];
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
      };

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
      height: 400px;
    }
  }

  .active {
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>