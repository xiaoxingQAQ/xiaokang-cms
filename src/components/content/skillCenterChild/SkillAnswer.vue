<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">问答使用次数</span>
      <div slot="main">
        <!-- 选择时间 -->
        <DateRow @onChange="getAnswerSkillsUsed_1" @Change="getAnswerSkillsUsed_2" class="date_row" />
        <!-- echarts -->
        <div class="echarts" ref="echarts_2"></div>
      </div>
    </Card>

    <Card class="card_2">
      <span slot="leftTitle">热问排行榜</span>排行</span>
      <div slot="main">
        <DateRow @onChange="getHotAnswerRanking_1" @Change="getHotAnswerRanking_2" class="date_row" />
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
import { getDate } from '@/utils/getDate'
import { getAnswerSkillsUsed, getHotAnswerRanking } from '@/network/home'

export default {
  components: {
    Card,
    DateRow
  },
  data() {
    return {
      loading: false,
      myEcharts: null,
      option: {
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
      },
      columns: [
        {
          title: '排行',
          dataIndex: 'key',
          key: 'key',
          width: '20%'
        },
        {
          title: '问题',
          dataIndex: 'questions',
          key: 'questions',
        },
        {
          title: '答案',
          dataIndex: 'answers',
          key: 'answers',
        },
        {
          title: '请求次数',
          dataIndex: 'answernum',
          key: 'answernum',
        },
      ],
      tabData: [],
    }
  },
  created() {
    this.getAnswerSkillsUsed_1()
    this.getHotAnswerRanking_1()
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    // 获取 问答技能使用次数
    getAnswerSkillsUsed_1(day = 0) {
      this.option.series[0].data = []
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
      let enddate = getDate(0) + ''
      let type = day + ''
      let code = '308000'
      const data = {
        startdate,
        enddate,
        type,
        code
      }
      // 发送请求 获取 问答使用次数
      getAnswerSkillsUsed(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')

        console.log(res);
        res.data.forEach(item => {
          let skillnum = item.skillnum;
          let time = item.time;
          this.option.series[0].data.push(skillnum);
          this.option.xAxis.data.push(time)
        })

        let series = this.option.series[0].data
        let xAxis = this.option.xAxis.data
        this.myEcharts.hideLoading() // 关闭加载动画
        this.myEcharts.setOption({
          xAxis: {
            data: xAxis
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '次数',
              data: series
            },
          ]
        })
      })
    },
    getAnswerSkillsUsed_2(day, start_date, end_date) {
      this.option.series[0].data = []
      this.option.xAxis.data = []

      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      let code = '308000'
      const data = {
        startdate,
        enddate,
        type,
        code,
      }
      // 发送请求 获取 问答使用次数
      getAnswerSkillsUsed(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')

        console.log(res);
        res.data.forEach(item => {
          let skillnum = item.skillnum;
          let time = item.time;
          this.option.series[0].data.push(skillnum);
          this.option.xAxis.data.push(time)
        })

        let series = this.option.series[0].data
        let xAxis = this.option.xAxis.data
        this.myEcharts.hideLoading() // 关闭加载动画
        this.myEcharts.setOption({
          xAxis: {
            data: xAxis
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '次数',
              data: series
            },
          ]
        })
      })
    },
    // 获取 热问排行榜 
    getHotAnswerRanking_1(day = 0) {
      this.loading = true
      this.tabData = []
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
        type,
      }
      // 发送请求 获取 热问排行榜
      getHotAnswerRanking(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')

        res.data.forEach((item, index) => {
          let key = index + 1
          let questions = item.questions
          let answers = item.answers
          let answernum = item.answernum
          this.tabData.push({
            key,
            questions,
            answers,
            answernum
          })
        })
        this.loading = false
      })
    },
    getHotAnswerRanking_2(day, start_date, end_date) {
      this.loading = true
      this.tabData = []
      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type,
      }
      // 发送请求 获取 热问排行榜
      getHotAnswerRanking(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        res.data.forEach((item, index) => {
          let key = index + 1
          let questions = item.questions
          let answers = item.answers
          let answernum = item.answernum
          this.tabData.push({
            key,
            questions,
            answers,
            answernum
          })
        })
        this.loading = false
      })
    },
    initEcharts() {
      this.myEcharts = this.$echarts.init(this.$refs.echarts_2)

      let option = this.option
      let myEcharts = this.myEcharts;
      myEcharts.showLoading()

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