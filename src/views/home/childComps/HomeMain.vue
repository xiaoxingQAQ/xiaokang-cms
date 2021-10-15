/* Home主要页面 */
<template>
  <div class="wrapper">
    <transition name="slide-fade" v-if="!isChange">
    <div>
      <!-- 时间 -->
    <el-row>
      <el-col class="date" :span="6">
        <span>{{ date }}</span>
      </el-col>
    </el-row>
    <!-- 卡片1-->
    <Card class="Card">
      <span slot="leftTitle">设备数据</span></span>
      <span slot="rightTitle" @click="$router.replace('/dataCenter')">查看更多数据</span></span>

      <div slot="data_1" >
      <span v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.upcount}}</span>
      <div class="loading" slot="data_1" v-else>
        <a-spin tip="Loading...">
          <div class="spin-content"></div>
        </a-spin>
      </div>
      </div>
     
      <div slot="title_1" v-if="JSON.stringify(cardData_1) != '{}'">最近更新</div>
      <div slot="title_1" v-else></div>

      <div slot="data_2">
        <span v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.upcount}}</span>
        <div class="loading" slot="data_1" v-else>
          <a-spin tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </div>
      </div>
      <div slot="title_2" v-if="JSON.stringify(cardData_1) != '{}'">近期动态</div>
      <div slot="title_2" v-else></div>

      <div slot="data_3">
        <span v-if="JSON.stringify(cardData_1) != '{}'">{{cardData_1.upcount}}</span>
        <div class="loading" slot="data_1" v-else>
          <a-spin tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </div>
      </div>
      <div slot="title_3" v-if="JSON.stringify(cardData_1) != '{}'">累积激活</div>
      <div slot="title_3" v-else></div>
    </Card>
    <!-- 卡片2 -->
    <Card class="Card">
      <span slot="leftTitle">请求数据</span></span>
      <span slot="rightTitle" @click="goDetail">查看更多数据</span></span>

      <div slot="data_1">
        <span v-if="JSON.stringify(cardData_2) != '{}'">{{cardData_1.upcount}}</span>
        <div class="loading" slot="data_1" v-else>
          <a-spin tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </div>
      </div>
      <div slot="title_1" v-if="JSON.stringify(cardData_2) != '{}'">近日请求</div>
      <div slot="title_1" v-else></div>


      <div slot="data_3">
        <span v-if="JSON.stringify(cardData_2) != '{}'">{{cardData_1.upcount}}</span>
        <div class="loading" slot="data_1" v-else>
          <a-spin tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </div>
      </div>
      
      <div slot="title_3" v-if="JSON.stringify(cardData_2) != '{}'">累积请求</div>
      <div slot="title_3" v-else></div>
    </Card>
    
    <Card>
      <span slot="leftTitle">昨日活跃用户</span>
      <div slot="main">
        <a-table :columns="columns" :data-source="TabData" :loading="loading" :pagination="false">
        </a-table>
      </div>
    </Card>
    </div>
    </transition>
    <transition name="slide-fade" v-else="isChange">
      <RequestTrend @onChange="onChange" />
    </transition>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { card_1, card_2, card_3 } from '@/network/home'
import { mapState } from 'vuex'
import RequestTrend from '@/components/content/homeMainChild/RequestTrend'

export default {
  components: {
    Card,
    RequestTrend
  },
  data() {
    return {
      isChange: false,
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
  },
  mounted() {
    this.getHomeData() // 发送请求
    // 获取时间
    this.getDate()
  },
  computed: {
    ...mapState('user', ['memberID'])
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
      this.cancel()
      const memberID = this.memberID
      const data = {
        memberID
      }
      // 请求卡片1的数据
      card_1(data).then(res_1 => {
        console.log('res_1: ', res_1);
        if (!res_1) return
        if (res_1.code != 0) return this.$message.error('获取数据失败')

        this.cardData_1 = res_1.data
      })
      // 请求卡片2的数据
      card_2(data).then(res_2 => {
        if (!res_2) return
        if (res_2.code != 0) return this.$message.error('获取数据失败')

        this.cardData_2 = res_2.data
      })
      this.loading = true
      // 请求卡片3的数据
      card_3(data).then(res_3 => {
        if (!res_3) return
        console.log('res_3', res_3);
        if (res_3.code != 0) return this.$message.error('获取数据失败')

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
    },
    goDetail() {
      this.isChange = !this.isChange
    },
    onChange() {
      this.isChange = !this.isChange
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
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
  ::v-deep .el-card__body {
    min-height: 181.96px !important;
  }

  .loading {
    transform: translate(0, 50px);
  }
  ::v-deep .ant-spin-dot-spin {
    margin-left: 20px !important;
  }
  // 动画
  .slide-fade-enter-active {
    transition: all 0.6s ease-in;
    opacity: 0.6;
  }
  .slide-fade-leave-active {
    transition: all 0.6s ease-in-out;
    opacity: 0.6;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translate(-50px);
    opacity: 0.6;
  }
}
</style>