<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="9">
        <!-- 时间日期 -->
        <template v-if="types == 'number'">
          <a-button
            v-for="(item, index) in dateArr"
            :key="index"
            @click="changeDate(index)"
            class="changeDateBtn"
            :disabled="currentIndex == index"
            :class="{ active: currentIndex == index }"
            >{{ item }}日</a-button
          >
        </template>
        <!-- 文字文本 -->
        <template v-else-if="types == 'string'">
          <a-button
            class="changeDateBtn"
            v-for="(item, index) in dateArr_text"
            :key="index"
            @click="changeStatus(index)"
            :disabled="currentIndex_1 == index"
            :class="{ active: currentIndex_1 == index }"
          >
            {{ item }}
          </a-button>
        </template>
      </el-col>

      <el-col class="date" :span="11">
        <span>自定义时间：</span>
        <el-date-picker
          v-model="value"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="onChange"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDate } from '@/utils/getDate'

export default {
  props: {
    types: {
      type: String,
      default: 'number',
    }
  },
  data() {
    return {
      value: [], // 自定义日期 value值
      dateArr: [7, 14, 30], // changdate的数组
      dateArr_text: ['活跃排名', '最新激活'],
      currentIndex: 0, // 当前的 index
      currentIndex_1: 0,
    }
  },
  created() {
    this.setDate_1()
  },
  mounted() {
    this.$bus.$on('changeType', () => {
      this.currentIndex = 0
    })
  },
  methods: {
    setDate_1() {
      let start_date = getDate(-6)
      let end_date = getDate(0)
      this.value = [start_date, end_date]
    },
    setDate_2() {
      let start_date = getDate(-13)
      let end_date = getDate(0)
      this.value = [start_date, end_date]
    },
    setDate_3() {
      let start_date = getDate(-29)
      let end_date = getDate(0)
      this.value = [start_date, end_date]
    },
    // 自定义日期改变 触发
    onChange() {
      this.currentIndex = -1 
      if (!this.value) return
      let start_date = this.value[0]
      let end_date = this.value[1]
      let day = this.getDaysBetween(start_date, end_date) + 1
      this.$emit('Change', day, start_date, end_date)
    },
    // 点击改变 日期
    changeDate(index) {
      this.currentIndex = index
      this.$emit('onChange', index)
      switch (index) {
        case 0:
          this.setDate_1()
          break;
        case 1:
          this.setDate_2()
          break;
        case 2:
          this.setDate_3()
          break;
      }
    },
    changeStatus(index) {
      this.currentIndex_1 = index
      this.$emit('onChange', index)
    },
    //根据起始日期和结束日期计算天数
    getDaysBetween(date1, date2) {
      var startDate = Date.parse(date1);
      var endDate = Date.parse(date2);
      if (startDate > endDate) {
        return 0;
      }
      if (startDate == endDate) {
        return 1;
      }
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      return days;
    }
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  width: 100%;
  .el-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .changeDateBtn {
      margin-right: 10px !important;
      width: 90px;
      font-weight: 500;
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

  .active {
    color: #fff !important;
    background-color: @color1 !important;
    border: transparent !important;
  }
}
</style>