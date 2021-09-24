/* Home主要页面 */
<template>
  <div class="container">
    <!-- 时间 -->
    <el-row>
      <el-col class="date" :span="6">
        <span>{{ date }}</span>
      </el-col>
    </el-row>
    <!-- 卡片1-->
    <Card>
      <span slot="leftTitle">设备数据</span></span>
      <span slot="rightTitle">查看更多数据</span></span>

      <div slot="data_1" v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.upcount}}</div>
      <div slot="data_1" v-else>0</div>
      <div slot="title_1">最近更新</div>

      <div slot="data_2" v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.account}}</div>
      <div slot="data_2"  v-else>0</div>
      <div slot="title_2">近期动态</div>

      <div slot="data_3" v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.sumcount}}</div>
      <div slot="data_3" v-else>0</div>
      <div slot="title_3">累积激活</div>
    </Card>
    <!-- 卡片2 -->
    <Card>
      <span slot="leftTitle">请求数据</span></span>
      <span slot="rightTitle">查看更多数据</span></span>

      <div slot="data_1" v-if="JSON.stringify(cardData_2) != '{}'">{{cardData_2.account}}</div>
      <div slot="data_1"  v-else>0</div>
      <div slot="title_1">近日请求</div>


      <div slot="data_3" v-if="JSON.stringify(cardData_2) != '{}'">{{cardData_2.sumcount}}</div>
      <div slot="data_3"  v-else>0</div>
      <div slot="title_3">累积请求</div>
    </Card>
    
    <Card>
      <span slot="leftTitle">昨日活跃用户TOP10</span>
      <div slot="main">
        <a-table :columns="columns" :data-source="TabData" :loading="loading" :pagination="false">
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { card_1, card_2, card_3 } from '@/network/home'

export default {
  components: {
    Card,
  },
  data() {
    return {
      date: '', // 日期
      cardData_1: {},
      cardData_2: {},
      columns: [ // 卡片3
        {
          title: '排名',
          dataIndex: 'indey',
          key: '1',
        },
        {
          title: '请求次数',
          dataIndex: 'counts',
          key: '2',
        },
        {
          title: 'ID',
          dataIndex: 'ID',
          key: '3',
        },
        {
          title: '激活日期',
          dataIndex: 'date',
          key: '4',
        },
      ],
      loading: false, // 加载动画
      TabData: [], // 卡片3 的数据
    }
  },
  created() {
    // this.getHomeData() // 发送请求
  },
  mounted() {
    this.loading = true
    this.getDate()
  },
  methods: {
    // 获取时间
    getDate() {
      let date = new Date()
      let year = date.getFullYear();

      let month = date.getMonth() + 1;
      month <= 9 ? "0" + month : month;

      let dates = date.getDate();
      dates <= 9 ? "0" + dates : dates;

      this.date = year + "年" + month + "月" + dates + '日';
    },
    // 获取首页的数据
    getHomeData() {
      const memberID = JSON.parse(sessionStorage.getItem('memberID'));
      console.log(memberID);
      const data = {
        memberID
      }
      // 请求卡片1的数据
      card_1(data).then(res_1 => {
        if (!res_1) return this.$message.error('获取数据失败')
        console.log('res_1', res_1);
        if (res_1.code != 1) return

        this.cardData_1 = res_1.data
      })
      // 请求卡片2的数据
      card_2(data).then(res_2 => {
        if (!res_2) return this.$message.error('获取数据失败')
        console.log('res_2', res_2);
        if (res_2.code != 1) return

        this.cardData_2 = res_2.data
      })

      // 请求卡片3的数据
      card_3(data).then(res_3 => {
        if (!res_3) return this.$message.error('获取数据失败')
        console.log('res_3', res_3);
        if (res_3.code != 1) return

        const arr = [];
        res_3.data.forEach((item, index) => {
          const obj = {};
          obj.key = index + 1;
          obj.indey = index + 1;
          obj.counts = item.counts
          obj.ID = item.equipmentID
          obj.date = item.times
          arr.push(obj)
        });
        this.TabData = arr
        this.loading = false
      })
    }
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

  ::v-deep .ant-table-thead > tr > th {
    text-align: center;
    color: #fff;
    background-color: #73c4fc;
  }
  ::v-deep .ant-table-row-level-0 {
    text-align: center;
  }
  ::v-deep .ant-table-row-level-0:nth-child(2n) {
    background-color: #fcae7312;
  }
}
</style>