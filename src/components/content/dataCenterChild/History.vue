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
          :pagination="true"
        >
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import { getMessageList } from '@/network/home'
import { mapState } from 'vuex'

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
          dataIndex: 'key',
          key: 'key',
          width: '20%'
        },
        {
          title: '系统消息',
          dataIndex: 'message',
          key: 'message',
          width: '60%'
        },
        {
          title: '发送时间',
          dataIndex: 'remindDate',
          key: 'remindDate',
        },
      ],
      tabData: [],
    }
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  created() {
    this.getMessageList()
  },
  methods: {
    // 获取系统消息
    getMessageList() {
      const memberID = this.memberID
      const data = {
        memberID,
        pageIndex: 1,
        pageSize: 999999,
      }
      this.loading = true
      this.cancel()
      // 发送请求
      getMessageList(data).then(res => {
        console.log('系统消息res: ', res);
        if (!res) return
        if (res.code != 0) {
          this.loading = false
          return this.$message.warning('暂无消息！')
        }

        res.data.records.forEach((item, index) => {
          let key = index + 1
          let id = item.id
          let message = item.message
          let remindDate = item.remindDate
          this.tabData.push({
            id,
            key,
            message,
            remindDate
          })
        });
        this.tabData = _.uniqBy(this.tabData, 'id')
        this.loading = false
      })
    },
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