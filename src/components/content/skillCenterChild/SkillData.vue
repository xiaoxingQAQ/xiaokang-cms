<template>
  <div class="wrapper">
    <Card class="card_1">
      <span slot="leftTitle">技能使用次数</span>
      <div slot="main">
        <!-- 选择技能 select 框 -->
        <!-- <el-row v-if="options.length != 0">
          <span>选择技能：</span>
          <el-select v-model="value" @change="onChange" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-row> -->
        <!-- loading -->
        <!-- <el-row class="loading" v-else>
          <span>选择技能：</span>
          <a-spin tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </el-row> -->
        <!-- 选择时间 -->
        <DateRow
          @onChange="getSkillsUsed_1"
          @Change="getSkillsUsed_2"
          class="date_row"
        />
        <!-- echarts -->
        <div class="echarts" ref="echarts_1"></div>
      </div>
    </Card>

    <Card class="card_2">
      <span slot="leftTitle">技能调用排行</span>
      <div slot="main">
        <DateRow
          @onChange="getSkillsRanking_1"
          @Change="getSkillsRanking_2"
          class="date_row"
        />
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

import { getSkillList, getSkillsUsed, getSkillsRanking } from '@/network/home'
import { mapState } from 'vuex';
import { getDate } from '@/utils/getDate'

export default {
  name: 'SkillData',
  components: {
    Card,
    DateRow
  },
  data() {
    return {
      myEcharts: null,

      loading: false,
      value: '',
      code: '6000001',
      // options: [],
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
          title: '技能名称',
          dataIndex: 'title',
          key: 'title',
          width: '60%'
        },
        {
          title: '请求次数',
          dataIndex: 'skillnum',
          key: 'skillnum',
        },
      ],
      tabData: [],
    }
  },
  created() {
    // this.getSkillList()
    this.getSkillsUsed_1()
    this.getSkillsRanking_1()
  },
  mounted() {
    this.initEcharts()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    // onChange() {
    //   this.getSkillsUsed_1()
    // },
    // 获取技能列表
    // getSkillList() {
    //   const memberID = this.memberID
    //   const data = {
    //     memberID
    //   }
    //   // 发送请求 请求
    //   getSkillList(data).then(res => {
    //     if (!res) return
    //     if (res.code != 1) return this.$message.error('获取数据失败')

    //     console.log(res.data);
    //     res.data.forEach(item => {
    //       let label = item.title
    //       let value = item.id
    //       this.options.push({
    //         value,
    //         label,
    //       })
    //     })
    //     this.value = this.options[0].value
    //     this.getSkillsUsed_1()
    //   })
    // },
    // 获取 技能使用次数
    getSkillsUsed_1(day = 0) {
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
      let code = this.code
      const data = {
        startdate,
        enddate,
        type,
        code,
      }
      // 发送请求 技能使用次数
      getSkillsUsed(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        console.log('技能使用次数',res);
        res.data.forEach(item => {
          let skillnum = item.skillnum;
          let time = item.time;
          this.option.series[0].data.push(skillnum);
          this.option.xAxis.data.push(time)
        })

        let series = this.option.series[0].data
        let xAxis = this.option.xAxis.data
        this.myEcharts.hideLoading()
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
    getSkillsUsed_2(day, start_date, end_date) {
      this.option.series[0].data = []
      this.option.xAxis.data = []

      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      let code = this.code
      const data = {
        startdate,
        enddate,
        type,
        code,
      }
      // 发送请求 技能使用次数
      getSkillsUsed(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        console.log(res.data);
        res.data.forEach(item => {
          let skillnum = item.skillnum;
          let time = item.time;
          this.option.series[0].data.push(skillnum);
          this.option.xAxis.data.push(time)
        })

        let series = this.option.series[0].data
        let xAxis = this.option.xAxis.data
        this.myEcharts.hideLoading()
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
    // 获取 技能调用排行榜
    getSkillsRanking_1(day = 0) {
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
      this.loading = true
      // 发送请求 技能调用排行榜
      getSkillsRanking(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        console.log(res);
        res.data.forEach((item, index) => {
          let key = index + 1
          let title = item.title
          let skillnum = item.skillnum
          this.tabData.push({
            key,
            title,
            skillnum
          })
        })
        this.loading = false
      })
    },
    getSkillsRanking_2(day, start_date, end_date) {
      this.tabData = []
      let startdate = start_date + ''
      let enddate = end_date + ''
      let type = day + ''
      const data = {
        startdate,
        enddate,
        type,
      }
      this.loading = true
      // 发送请求 技能调用排行榜
      getSkillsRanking(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        console.log(res);
        res.data.forEach((item, index) => {
          let key = index + 1
          let title = item.title
          let skillnum = item.skillnum
          this.tabData.push({
            key,
            title,
            skillnum
          })
        })
        this.loading = false
      })
    },
    initEcharts() {
      this.myEcharts = this.$echarts.init(this.$refs.echarts_1)
      let option = this.option

      let myEcharts = this.myEcharts;
      myEcharts.showLoading()

      // 5. 展示数据
      option && myEcharts.setOption(option)
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .loading {
    display: flex;
    align-items: center;
    width: 22%;
    ::v-deep .ant-spin-nested-loading > div > .ant-spin {
      background-color: #fff !important;
    }
    .spin-content {
      padding: 30px;
    }
  }

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