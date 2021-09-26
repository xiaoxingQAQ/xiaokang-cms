<template>
  <div class="container">
    <el-row>
      <el-col :span="9">
        <a-button
          v-for="(item, index) in dateArr"
          :key="index"
          @click="changeDate(index)"
          class="changeDateBtn"
          :class="{ active: currentIndex == index }"
          >{{ item }}日</a-button
        >
      </el-col>

      <el-col class="date" :span="11">
        <span>自定义时间：</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '', // 自定义日期 value值
      dateArr: [7, 14, 30], // changdate的数组
      currentIndex: 0, // 当前的 index
    }
  },
  methods: {
    // 点击改变 日期
    changeDate(index) {
      this.currentIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.container {
  width: 100%;
  .el-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .changeDateBtn {
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

  .active {
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>