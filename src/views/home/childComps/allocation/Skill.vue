/* 技能管理 */
<template>
  <div class="container">
    <Card>
      <span slot="leftTitle">语音技能</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="false"
        >
          <template slot="switch" slot-scope="text, record, index">
            <a-switch default-checked />
          </template>
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
      loading: false, // 加载动画
      columns: [
        {
          title: '技能',
          dataIndex: 'slill',
          key: 'slill',
        },
        {
          title: '描述',
          dataIndex: 'describe',
          key: 'describe',
        },
        {
          title: '开关',
          key: 'switch',
          scopedSlots: { customRender: 'switch' },
        },
      ],
      data: [
        {
          key: '1',
          slill: '111',
          describe: 32,
        },
        {
          key: '2',
          slill: '111',
          describe: 32,
        },
        {
          key: '3',
          slill: '111',
          describe: 32,
        },
      ]
    }
  },
  created() {
    
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.container {
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