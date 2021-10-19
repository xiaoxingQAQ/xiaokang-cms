<template>
  <div>
    <Card>
      <span slot="leftTitle">版本配置</span>
      <template #rightTitle>
        <a-button
          style="margin-right: 10px"
          type="primary"
          @click="visible = true"
          >上传版本</a-button
        >
        <a-button type="danger" :loading="loading_2" @click="deleteEdition"
          >删除版本</a-button
        >
      </template>
      <template slot="main">
        <a-table
          :rowKey="(record) => record.id"
          :columns="columns"
          :data-source="TabData"
          :loading="loading_3"
          :pagination="false"
          :row-selection="rowSelection"
        >
          <template slot="operate" slot-scope="text, record">
            <a-button type="primary" @click="goDetail(record)" class="btn"
              >默认参数配置</a-button
            >
          </template>
        </a-table>
      </template>
    </Card>
    <!-- 上传版本 -->
    <a-modal
      title="上传版本"
      okText="推送"
      cancelText="取消"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <SystemUpdata ref="SystemUpdata" />
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import SystemUpdata from '@/components/content/editionChild/SystemUpdata'

import { getEditionInfo } from '@/network/home'
import { mapMutations, mapState } from 'vuex'


export default {
  components: {
    Card,
    SystemUpdata
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      visible: false, // 上传版本的
      loading_1: false,
      loading_2: false,
      loading_3: false,
      confirmLoading: false,
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
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          scopedSlots: { customRender: 'operate' },
          width: '10%'
        }
      ],
      TabData: [],
    }
  },
  created() {
    this.getEditionInfo()
  },
  computed: {
    ...mapState('user', ['memberID']),
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        },
      };
    },
  },
  methods: {
    ...mapMutations('edition',['Edition_Info']),
    // 获取版本信息
    getEditionInfo() {
      this.cancel()
      const memberID = this.memberID;
      const data = {
        memberID
      }
      console.log(memberID);
      this.loading_3 = true
      // 发送请求
      getEditionInfo(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')


        res.data.forEach(item => {
          let key = item.id
          let id = item.id;
          let versionNumber = item.versionNumber // 版本号
          let updateLog = item.updateLog // 更新日志
          let uptDate = item.pubDate // 更新日期
          let attachmentID = item.attachmentID // 文件id
          this.TabData.push({
            key,
            id,
            versionNumber,
            updateLog,
            uptDate,
            attachmentID
          })
        });
        this.loading_3 = false
      })
    },
    // 处理提交按钮
    handleOk() {
      this.$refs.SystemUpdata.push()
    },
    // 处理取消
    handleCancel() {
      this.$refs.SystemUpdata.$refs.ruleForm.resetFields()
      this.$refs.SystemUpdata.$data.fileList = []
      this.visible = false
    },
    // 点击删除版本按钮
    deleteEdition() {
      this.cancel()
      if (this.selectedRows.length == 0) {
        this.loading_2 = false
        return this.$message.info('请选择您要删除的')
      }

      const arr = [];
      this.selectedRows.forEach(item => {
        arr.push(item.id)
      })
      const id = arr.join(',')
      const data = {
        id
      }
      return
      // 发送请求 删除选中的
      xxxxxxxxxxxxxx(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) {
          this.loading_2 = false
          return this.$message.error('删除失败')
        }
        // 提示
        this.$message.success('删除成功')
        // 重新获取数据
        this.getEditionInfo()
        this.loading_2 = false
      })
    },
    // 点击 配置版本默认参数
    goDetail(record) {
      this.Edition_Info(record)
      this.$emit('onChange')
      // 写入本地存储
      sessionStorage.setItem('Edition', JSON.stringify(record))
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .btn {
    // width: 90px;
    font-weight: 500;
    color: #fff;
    // background-color: @color1;
    border: transparent;
  }
}
</style>