<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">技能使用次数</span>
      <div slot="main">
        <!-- 选择技能 select 框 -->
        <el-row>
          <span>选择技能：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row>
        <!-- 选择时间 -->
        <DateRow class="date_row" />
        <!-- echarts -->
        <div class="echarts" ref="echarts_2"></div>
      </div>
    </Card>

    <Card class="card_2">
      <span slot="leftTitle">技能调用排行</span>
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
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      columns: [
        {
          title: '排行',
          dataIndex: 'indey',
          key: 'indey',
        },
        {
          title: '技能名称',
          dataIndex: 'name',
          key: 'name',
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
          name: '好好',
          counts: '100',
        },
        {
          key: 2,
          indey: '2',
          name: '都是',
          counts: '28',
        },
        {
          key: 3,
          indey: '3',
          name: '好好',
          counts: '12',
        },
      ],
    }
  },
  mounted() {
    this.initEcharts()
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