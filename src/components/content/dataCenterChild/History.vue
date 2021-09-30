/* 设备数据页面 */
<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">历史消息</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="tabData"
          :loading="loading"
          :pagination="false"
        >
        </a-table>
      </div>
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
      loading: false,
      columns: [ 
        {
          title: '序号',
          dataIndex: 'indey',
          key: 'indey',
        },
        {
          title: '系统消息',
          dataIndex: 'message',
          key: 'message',
        },
        {
          title: '发送时间',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      tabData: [ 
        {
          key: 1,
          indey: '1',
          message: '好好',
          date: '2019-12-08',
        },
        {
          key: 2,
          indey: '2',
          message: '都是',
          date: '2019-12-08',
        },
        {
          key: 3,
          indey: '3',
          message: '好好',
          date: '2019-12-08',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  // 表格的样式修改
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