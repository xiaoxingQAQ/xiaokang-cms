/* 客服信息 */
<template>
  <div>
    <Card>
      <span slot="leftTitle">客服信息</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="tabData"
          :loading="loading"
          :pagination="false"
        >
          <template slot="image" slot-scope="text, record, index">
            <div>
              <img style="width: 70%" :src="text.imageUrl" alt="" />
            </div>
          </template>
          <template slot="edit" slot-scope="text, record, index">
            <el-button
              @click="edit(record)"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
          </template>
        </a-table>
      </div>
    </Card>
    <a-modal
      title="编辑客服信息"
      okText="保存"
      cancelText="取消"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="EditForm"
        :rules="EditFormRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item ref="name" label="客服工号" prop="serviceNumber">
          <a-input v-model="EditForm.serviceNumber" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="客服名称" prop="serviceName">
          <a-input v-model="EditForm.serviceName" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="客服邮箱" prop="serviceMail">
          <a-input v-model="EditForm.serviceMail" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="客服电话" prop="servicePhone">
          <a-input v-model="EditForm.servicePhone" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="备注信息" prop="remark">
          <a-input type="textarea" v-model="EditForm.remark" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import { getServiceInfo, saveServiceInfo } from '@/network/home'

export default {
  components: {
    Card,
  },
  data() {
    return {
      EditForm: {
        serviceNumber: '',
        serviceName: '',
        serviceMail: '',
        servicePhone: '',
        remark: ''
      },
      wrapperCol: { span: 14 },
      labelCol: { span: 4 },
      EditFormRules: {
        serviceNumber: [
          { required: true, message: '请输入客服工号', trigger: 'blur' },
        ],
        serviceName: [
          { required: true, message: '请输入客服名称', trigger: 'blur' },
        ],
        serviceMail: [
          { required: true, message: '请输入客服邮箱', trigger: 'blur' },
        ],
        servicePhone: [
          { required: true, message: '请输入客服电话', trigger: 'blur' },
        ],
        remark: [
          { required: false, message: '请输入备注信息', trigger: 'blur' },
        ],
      },
      visible: false, // 显示与隐藏
      confirmLoading: false, // 点击确定按钮的回调
      loading: false, // 加载动画
      columns: [
        {
          title: '图片',
          key: 'image',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: '客服名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
        },
        {
          title: '客服邮箱',
          dataIndex: 'serviceMail',
          key: 'serviceMail',
        },
        {
          title: '客服电话',
          dataIndex: 'servicePhone',
          key: 'servicePhone',
        },
        {
          title: '工作时间',
          dataIndex: 'serviceTime',
          key: 'serviceTime',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      tabData: [],
    }
  },
  created() {
    this.getServiceInfo()
  },
  methods: {
    // 获取客服信息
    getServiceInfo() {
      this.tabData = []
      this.cancel()
      this.loading = true
      const data = {};
      getServiceInfo().then(({ data, code }) => {
        if (code != 0) return this.$message.error('获取数据失败')

        data.forEach((item, index) => {
          const key = index;
          const id = item.id;
          const imageUrl = item.imageUrl;
          const serviceNumber = item.serviceNumber;
          const serviceName = item.serviceName;
          const serviceMail = item.serviceMail; // 客服电子邮件
          const servicePhone = item.servicePhone; // 客服手机号
          const serviceTime = item.serviceTime; // 工作时间
          this.tabData.push({
            key,
            id,
            serviceNumber,
            imageUrl,
            serviceName,
            serviceMail,
            servicePhone,
            serviceTime
          })
          this.loading = false
        });
      })
    },
    // 点击打开 修改客服信息的dialog
    edit(record) {
      console.log('record: ', record);
      this.EditForm = {
        serviceNumber: record.serviceNumber,
        serviceName: record.serviceName,
        serviceMail: record.serviceMail,
        servicePhone: record.servicePhone,
        remark: record.remark
      }
      this.visible = true
    },
    // 点击确定回调
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return this.$message.info('请完善表单')

        this.confirmLoading = true
        const data = this.EditForm;
        data.id = this.tabData[0].id
        console.log(data);

        // 发送请求 保存客服信息
        saveServiceInfo(data).then(({ data, code }) => {
          if (code != 0) {
            this.confirmLoading = false
            return this.$message.error('保存失败')
          }

          this.$message.success('保存成功')
          this.confirmLoading = false
          this.handleCancel()
          this.getServiceInfo()
        })
      })
    },
    // 点击遮罩层或右上角叉或取消按钮的回调
    handleCancel() {
      this.visible = false
      this.$refs.ruleForm.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .ant-form-horizontal {
  transform: translateX(40px);
}
</style>