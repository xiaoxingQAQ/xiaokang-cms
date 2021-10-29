/* 客服信息 */
<template>
  <div>
    <Card>
      <span slot="leftTitle">客服信息</span>

      <!-- <template #rightTitle>
        <a-button style="margin-right: 10px" type="primary" @click="AddServicer"
          >新增客服</a-button
        >
        <a-button type="danger" @click="deleteServicer">删除客服</a-button>
      </template> -->
      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          :columns="columns"
          :data-source="tabData"
          :loading="loading"
          :pagination="false"
          :row-selection="rowSelection"
        >
          <template slot="image" slot-scope="text, record, index">
            <div>
              <img style="width: 70%" :src="text.photoUrl" alt="" />
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
      :title="addStatus === true ? '新增客服信息' : '编辑客服信息'"
      :dialog-style="{ top: '20px' }"
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
        <!-- <a-form-model-item ref="num" label="客服工号" prop="num">
          <a-input v-model="EditForm.num" />

        </a-form-model-item>
        <a-form-model-item ref="name" label="客服名称" prop="name">
          <a-input v-model="EditForm.name" />
        </a-form-model-item> -->
        <a-form-model-item ref="email" label="客服邮箱" prop="email">
          <a-input v-model="EditForm.email" @change="inputChangeFn()" />
        </a-form-model-item>
        <a-form-model-item ref="phone" label="客服电话" prop="phone">
          <a-input v-model="EditForm.phone" />
        </a-form-model-item>

        <a-form-model-item ref="image" label="客服图片">
          <a-upload
            class="uploader"
            :action="uploadUrl"
            :headers="headers"
            :remove="onImgRemove"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handleImgPreview"
            @change="handleImgChange"
            :beforeUpload="beforeUpload"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-alert message="图片大小：332*332" banner />
        </a-form-model-item>
        <!-- <a-form-model-item ref="name" label="备注信息" prop="message">
          <a-input type="textarea" v-model="EditForm.message" />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
    <!-- 新增的预览图片 -->
    <a-modal
      class="preview"
      :visible="previewVisible"
      :footer="null"
      @cancel="handleImgCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import {
  getServiceInfo,
  saveServiceInfo,
  getServicePage,
  updateServiceInfo,
  deleteServiceInfo,
} from '@/network/home'

const token = JSON.parse(sessionStorage.getItem('token'))
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default {
  components: {
    Card,
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this
      return {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        },
      }
    },
  },
  data() {
    return {
      isJpgOrPng: true,
      selectedRowKeys: [],
      selectedRows: [],
      EditForm: {
        email: '',
        phone: '',
        attachmentID: '',
      },
      wrapperCol: { span: 14 },
      labelCol: { span: 4 },
      EditFormRules: {
        // num: [{ required: true, message: '请输入客服工号', trigger: 'blur' }],
        // name: [{ required: true, message: '请输入客服名称', trigger: 'blur' }],
        email: [{ required: true, message: '请输入客服邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入客服电话', trigger: 'blur' }],
        // message: [
        //   { required: false, message: '请输入备注信息', trigger: 'blur' }
        // ]
      },
      visible: false, // 显示与隐藏
      confirmLoading: false, // 点击确定按钮的回调
      loading: false, // 加载动画
      columns: [
        {
          title: '图片',
          key: 'image',
          scopedSlots: { customRender: 'image' },
          width: '13%',
        },
        // {
        //   title: '客服工号',
        //   dataIndex: 'num',
        //   key: 'num',
        // },
        // {
        //   title: '客服名称',
        //   dataIndex: 'name',
        //   key: 'name',
        // },
        {
          title: '客服邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '客服电话',
          dataIndex: 'phone',
          key: 'phone',
        },
        // {
        //   title: '备注',
        //   dataIndex: 'message',
        //   key: 'message',
        // },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      tabData: [],
      // 上传图片
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      fileList: [], // 上传图片
      previewVisible: false, // 预览 打开 or 关闭
      previewImage: '', // 预览图片
      addStatus: false, // 新增状态
      editStatus: false, // 编辑状态
    }
  },
  created() {
    this.getServiceInfo()
  },
  methods: {
    inputChangeFn() {
      if (this.EditForm.email.length > 15) {
        this.EditForm.email = this.EditForm.email.slice(0, 15)
      }
    },
    // 获取客服信息
    getServiceInfo() {
      this.tabData = []
      this.cancel()
      this.loading = true
      // const data = {};
      getServicePage().then(({ data, code }) => {
        if (code != 0) return this.$message.error('获取数据失败')

        this.tabData = data.records
        // data.records.forEach((item, index) => {
        //   const key = index;
        //   const id = item.id;
        //   const imageUrl = item.imageUrl;
        //   const serviceNumber = item.num;
        //   const serviceName = item.name;
        //   const serviceMail = item.email; // 客服电子邮件
        //   const servicePhone = item.phone; // 客服手机号
        //   const remark = item.message;
        //   this.tabData.push({
        //     key,
        //     id,
        //     serviceNumber,
        //     imageUrl,
        //     serviceName,
        //     serviceMail,
        //     servicePhone,
        //     remark
        //   })
        // })

        this.loading = false
      })
    },
    // 新增客服信息
    AddServicer() {
      this.addStatus = true
      this.visible = true
      this.fileList = []
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
    },
    // 删除客服信息
    deleteServicer() {
      this.cancel()
      if (this.selectedRows.length == 0) {
        return this.$message.info('请选择您要删除的')
      }

      const arr = []
      this.selectedRows.forEach((item) => {
        arr.push(item.id)
      })
      const ids = arr.join(',')

      const data = { ids }
      // return
      // 发送请求 删除选中的
      deleteServiceInfo(data).then((res) => {
        console.log('res: ', res)
        if (!res) return
        if (res.code != 0) {
          return this.$message.error('删除失败')
        }
        // 提示
        this.$message.success('删除成功')
        // 重新获取数据
        this.getServiceInfo()
      })
    },
    // 点击打开 修改客服信息的dialog
    edit(record) {
      console.log('record: ', record)
      this.EditForm = {
        id: record.id,
        email: record.email,
        phone: record.phone,
      }
      this.editStatus = true
      this.visible = true
    },
    // 点击确定回调
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return this.$message.info('请完善表单')

        // if (!this.EditForm.attachmentID) {
        //   return this.$message.warning('请上传图片')
        // }

        this.confirmLoading = true
        this.EditForm.image = this.EditForm.attachmentID
        const data = this.EditForm
        console.log(data)

        if (this.addStatus === true) {
          this.saveServiceInfo(data)
        } else {
          this.updateServiceInfo(data)
        }
      })
    },
    // 保存新增客服
    saveServiceInfo(data) {
      // 发送请求 保存客服信息
      saveServiceInfo(data).then(({ data, code }) => {
        if (code != 0) {
          this.confirmLoading = false
          return this.$message.error('保存失败')
        }
        this.addStatus = false
        this.$message.success('保存成功')
        this.confirmLoading = false
        this.handleCancel()
        this.getServiceInfo()
      })
    },
    // 更新客服信息
    updateServiceInfo(data) {
      // 发送请求 保存客服信息
      updateServiceInfo(data).then(({ data, code }) => {
        if (code != 0) {
          this.confirmLoading = false
          return this.$message.error('保存失败')
        }

        this.$message.success('保存成功')
        this.editStatus = false
        this.confirmLoading = false
        this.handleCancel()
        this.getServiceInfo()
      })
    },
    // 点击遮罩层或右上角叉或取消按钮的回调
    handleCancel() {
      this.$refs.ruleForm.resetFields()
      this.EditForm.attachmentID = null
      console.log('this.EditForm: ', this.EditForm)
      this.visible = false
      this.addStatus = false
      this.editStatus = false
      this.fileList = []
    },
    // 图片处理删除
    onImgRemove() {
      debugger
      let flag = false
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.fileList = []
          flag = true
          this.EditForm.attachmentID = ''
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
          flag = false
        })
      console.log(this.EditForm.attachmentID)
      return flag
    },
    // 处理状态 改变
    handleImgChange({ file, fileList }) {
      console.log(this.isJpgOrPng)
      if (this.isJpgOrPng) {
        console.log(file)
        this.fileList = fileList
        if (file.response) {
          this.EditForm.attachmentID = file.response.data.id
        }
      }
      this.isJpgOrPng = true
    },
    // 处理预览
    async handleImgPreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 处理关闭预览
    handleImgCancel() {
      this.previewVisible = false
    },
    // 限制图片类型
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/bmp' ||
        file.type === 'image/psd' ||
        file.type === 'image/webp'
      if (!isJpgOrPng) {
        this.$message.error('只能上传图片格式的文件！')
        return (this.isJpgOrPng = false && isJpgOrPng)
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep .ant-form-horizontal {
  transform: translateX(40px);
}
</style>
