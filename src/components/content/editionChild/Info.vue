<template>
  <div>
    <Card>
      <span slot="leftTitle">版本信息</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="TabData"
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

import { getEditionInfo } from '@/network/home'
import { mapState } from 'vuex'


export default {
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      columns: [ // 卡片3
        {
          title: '版本号',
          dataIndex: 'versionNumber',
          key: 'versionNumber',
        },
        {
          title: '更新日志',
          dataIndex: 'updateLog',
          key: 'updateLog',
        },
        {
          title: '版本文件ID',
          dataIndex: 'attachmentID',
          key: 'attachmentID',
        },
        {
          title: '更新日期',
          dataIndex: 'uptDate',
          key: 'uptDate',
        },
      ],
      TabData: [],
    }
  },
  created() {
    this.getEditionInfo()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    getEditionInfo() {
      const memberID = this.memberID;
      const data = {
        memberID
      }
      console.log(memberID);
      this.loading = true
      this.cancel()
      // 发送请求
      getEditionInfo(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')


        res.data.forEach(item => {
          let key = item.id
          let versionNumber = item.versionNumber // 版本号
          let updateLog = item.updateLog // 更新日志
          let uptDate = item.pubDate // 更新日期
          let attachmentID = item.attachmentID // 文件id
          this.TabData.push({
            key,
            versionNumber,
            updateLog,
            uptDate,
            attachmentID
          })
        });
        this.loading = false
      })
    }
  },
}
</script>

<style lang="less" scoped>
</style>