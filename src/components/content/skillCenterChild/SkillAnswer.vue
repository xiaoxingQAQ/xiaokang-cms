<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">问答使用次数</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow class="date_row" />
        <!-- echarts -->
        <div class="echarts" ref="echarts_2"></div>
      </div>
    </Card>

    <Card class="card_2">
      <span slot="leftTitle">热问排行榜</span>排行</span>
      <div slot="main">
        <DateRow class="date_row" />
        <a-table
          :columns="columns"
          :data-source="tabData"
          :loading="loading"
          :pagination="false"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card';
import DateRow from '@/components/content/dateRow/DateRow'


export default {
  components: {
    Card,
    DateRow
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '排行',
          dataIndex: 'indey',
          key: 'indey',
        },
        {
          title: '问题',
          dataIndex: 'problem',
          key: 'problem',
        },
        {
          title: '答案',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: '请求次数',
          dataIndex: 'counts',
          key: 'counts',
        },
      ],
      tabData: [
        {
          key: 1,
          indey: '1',
          problem: '好好',
          result: '嗯嗯',
          counts: '100',
        },
        {
          key: 2,
          indey: '2',
          problem: '都是',
          result: '嗯嗯',
          counts: '28',
        },
        {
          key: 3,
          indey: '3',
          problem: '好好',
          result: '嗯嗯',
          counts: '12',
        },
        {
          key: 4,
          indey: '4',
          problem: '好好',
          result: '嗯嗯',
          counts: '12',
        },
      ],
    }
  },
  mounted() {
    this.initEcharts()
  },
  destroyed() {
    console.log('SkillAnswer 技能问答销毁');
  },
  methods: {
    initEcharts() {
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
.wrapper {
  .card_1 {
    > div {
      .el-row {
        font-weight: 500;
        color: #7f7f7f;
        span {
          margin-right: 10px;
        }
      }
    }
    .date_row {
      margin-top: 20px;
    }
    .echarts {
      width: 1000px;
      height: 500px;
    }
  }
  .card_2 {
    .date_row {
      margin-bottom: 30px;
    }
  }
}
</style>