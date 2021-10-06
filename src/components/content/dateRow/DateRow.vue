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
            @click="changeDate(index)"
            :class="{ active: currentIndex == index }"
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
export default {
  props: {
    types: {
      type: String,
      default: 'number',
    }
  },
  data() {
    return {
      value: '', // 自定义日期 value值
      dateArr: [7, 14, 30], // changdate的数组
      dateArr_text: ['最新激活', '活跃排名'],
      currentIndex: 0, // 当前的 index
    }
  },
  methods: {
    onChange() {
      if (!this.value) return
      let start_date = this.value[0]
      let end_date = this.value[1]
      let day = this.getDaysBetween(start_date, end_date)
      this.$emit('Change', day, start_date, end_date)
    },
    // 点击改变 日期
    changeDate(index) {
      this.currentIndex = index
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
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>