/* Home主要页面 */
<template>
  <div class="container">
    <!-- 时间 -->
    <el-row>
      <el-col class="date" :span="6">
        <span>{{ date }}</span>
      </el-col>
    </el-row>
    <!-- 卡片 -->
    <Card>
      <span slot="leftTitle">设备数据</span></span>
      <span slot="rightTitle">查看更多数据</span></span>

      <div slot="data_1">0</div>
      <div slot="title_1">最近更新</div>

      <div slot="data_2">0</div>
      <div slot="title_2">近期动态</div>

      <div slot="data_3">0</div>
      <div slot="title_3">累积激活</div>
    </Card>
    <Card>
      <span slot="leftTitle">请求数据</span></span>
      <span slot="rightTitle">查看更多数据</span></span>

      <div slot="data_1">0</div>
      <div slot="title_1">近日请求</div>


      <div slot="data_3">0</div>
      <div slot="title_3">累积请求</div>
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
      date: '', // 日期
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      let date = new Date()
      let year = date.getFullYear();

      let month = date.getMonth() + 1;
      month <= 9 ? "0" + month : month;

      let dates = date.getDate();
      dates <= 9 ? "0" + dates : dates;

      this.date = year + "年" + month + "月" + dates + '日';
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  /* 时间 */
  .date {
    margin-bottom: 10px;
    transform: translate(3px, 0);
    span {
      height: 50px;
      font-weight: bold;
      font-size: 20px;
      line-height: 50px;
    }
  }
}
</style>