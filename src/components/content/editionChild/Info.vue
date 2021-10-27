<template>
  <div>
    <Card>
      <span slot="leftTitle">版本配置</span>
      <template #rightTitle>
        <a-button
          style="margin-right: 10px"
          type="primary"
          @click="visible = true"
        >上传版本</a-button>
        <a-button
          type="danger"
          :loading="loading_2"
          @click="deleteEdition"
        >删除版本</a-button>
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
          <template
            slot="edit"
            slot-scope="text, record"
          >
            <a-button
              class="unique"
              type="primary"
              @click="showEdit(record)"
            >编辑</a-button>
          </template>
          <template
            slot="operate"
            slot-scope="text, record"
          >
            <a-button
              type="primary"
              @click="goDetail(record)"
              class="btn"
            >默认参数配置</a-button>
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
      <SystemUpdata
        :TabData="TabData"
        @update="handleUpdate"
        ref="SystemUpdata"
      />
    </a-modal>

    <!-- 编辑版本信息 -->
    <a-modal
      title="编辑版本信息"
      okText="保存"
      cancelText="取消"
      :visible="visible_1"
      :confirm-loading="confirmLoading_1"
      @ok="handleOk_1"
      @cancel="handleCancel_1"
    >
      <el-form
        :model="updateForm"
        :rules="updateFormRules"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item
          label="版本名称："
          prop="versionName"
        >
          <el-input v-model="updateForm.versionName"></el-input>
        </el-form-item>
        <el-form-item
          label="版本编号："
          prop="versionNum"
        >
          <el-input :disabled="true" v-model="updateForm.versionNum"></el-input>
        </el-form-item>

        <el-form-item
          label="更新日志："
          prop="versionLog"
        >
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model="updateForm.versionLog"
          ></el-input>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import SystemUpdata from '@/components/content/editionChild/SystemUpdata'

import { getEditionInfo, editEdition, deleteEdition } from '@/network/home'
import { mapMutations, mapState } from 'vuex'


export default {
  components: {
    Card,
    SystemUpdata
  },
  data() {
    return {
      confirmLoading_1: false,
      visible_1: false,
      selectedRowKeys: [],
      selectedRows: [],
      visible: false, // 上传版本的
      loading_1: false,
      loading_2: false,
      loading_3: false,
      confirmLoading: false,
      updateForm: {
        versionName: '',
        versionNum: '',
        versionLog: '',
      },
      updateFormRules: {
        versionName: [
          { required: true, message: '请输入版本名称', trigger: 'blur' }
        ],
        versionNum: [
          { required: true, message: '请输入版本编号', trigger: 'blur' }
        ],
        versionLog: [
          { required: true, message: '请输入更新日志', trigger: 'blur' }
        ]
      },
      columns: [ // 卡片3
        {
          title: '版本名称',
          dataIndex: 'versionName',
          key: 'versionName',
        },
        {
          title: '版本号',
          dataIndex: 'versionNum',
          key: 'versionNum',
        },
        {
          title: '更新日志',
          dataIndex: 'versionLog',
          key: 'versionLog',
        },
        {
          title: '版本文件ID',
          dataIndex: 'accessories',
          key: 'accessories',
        },
        {
          title: '更新日期',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          width: '10%'
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
    ...mapMutations('edition', ['Edition_Info']),
    // 获取版本列表
    getEditionInfo() {
      this.TabData = []
      this.cancel()
      const memberID = this.memberID;
      const params = {
      }

      this.loading_3 = true
      // 发送请求
      getEditionInfo(params).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')


        res.data.records.forEach((item, index) => {
          let key = index
          let id = item.id;
          let versionName = item.versionName // 版本名称
          let versionNum = item.versionNum // 版本号
          let versionLog = item.versionLog // 更新日志
          let createTime = item.createTime // 更新日期
          let accessories = item.accessories // 文件id
          this.TabData.unshift({
            key,
            id,
            versionName,
            versionNum,
            versionLog,
            createTime,
            accessories
          })
          // 去重
          this.TabData = _.uniqBy(this.TabData, 'id')
        });
        this.loading_3 = false
      })
    },
    // 处理提交按钮
    handleOk() {
      this.confirmLoading = true
      this.$refs.SystemUpdata.push()
      this.confirmLoading = false
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
      console.log(this.selectedRows);
      const arr = [];
      this.selectedRows.forEach(item => {
        arr.push(item.id)
      })
      console.log(arr);
      const ids = arr.join(',')
      const data = {
        ids
      }
      // 发送请求 删除选中的
      deleteEdition(data).then(res => {
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
    // 处理版本上传完成
    handleUpdate() {
      this.getEditionInfo();
      this.handleCancel();
    },

    // 版本编辑
    showEdit(record) {
      this.visible_1 = true
      this.updateForm = record
    },
    handleOk_1() {
      this.$refs.editForm.validate(valid => {
        if (!valid) return
        
        this.confirmLoading_1 = true
        let id = this.updateForm.id
        let versionName = this.updateForm.versionName;
        let versionNum = this.updateForm.versionNum // 版本号
        let versionLog = this.updateForm.versionLog // 更新日志

        this.TabData = this.TabData.filter(item => {
          return item.id != this.updateForm.id
        })
        const arr_1 = this.TabData.filter(item => {
          return item.versionName == versionName
        })
        const arr_2 = this.TabData.filter(item => {
          return item.versionNum == versionNum
        })

        if (arr_1.length != 0) return this.$message.info('名称重复')
        if (arr_2.length != 0) return this.$message.info('版本号重复')

        const data = {
          id,
          versionName,
          versionNum,
          versionLog,
        }
        // 发送请求
        editEdition(data).then(({data, code}) => {
          if (code != 0) return this.$message.error('修改失败')

          this.$message.success('修改成功')
          this.getEditionInfo();
          this.handleCancel_1()
          this.confirmLoading_1 = false
        })
      })
    },
    handleCancel_1() {
      this.visible_1 = false
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .btn {
    font-weight: 500;
    color: #fff;
    border: transparent;
  }
}

.unique {
  border: 1px solid transparent;
  background-color: #67c23a;
  color: #fff;
}
</style>