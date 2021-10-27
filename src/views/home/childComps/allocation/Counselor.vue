<template>
  <div class="wrapper">
    <!-- 按钮 -->
    <!-- <el-row>
      <el-button type="primary" @click="showAddDialog">新增健康顾问</el-button>
      <el-button type="danger" @click="showRemoveDialog"
        >删除健康顾问</el-button
      >
    </el-row> -->
    <!-- 卡片 -->
    <Card v-for="(item, index) in counselorList" :key="index">
      <span slot="leftTitle">健康顾问：{{ item.nickName }}</span>
      <!-- <span slot="leftTitle" > 点击上方标签，木有的话，先创建； </span> -->
      <div>{{ counselorList }}</div>
      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          style="margin-top: 10px"
          :columns="columns"
          :data-source="[counselorList[index]]"
          :pagination="false"
          :loading="TableLoading_2"
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
    <!-- 新健康顾问的 Dialog对话框 -->
    <el-dialog
      title="新增健康顾问"
      :visible.sync="addDialogVisible"
      width="50%"
      center
      @close="addDialogClosed"
      class="addDialog"
    >
      <el-form
        ref="addFormRef"
        label-position="right"
        label-width="100px"
        :model="addForm"
      >
        <el-form-item label="姓名：" prop="nickName">
          <el-input
            ref="input"
            placeholder="请输入顾问姓名"
            v-model.trim="addForm.nickName"
          ></el-input>
        </el-form-item>
         <el-form-item label="电话：" prop="phone">
          <el-input
            ref="input"
            placeholder="请输入顾问电话"
            v-model.trim="addForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="简介：" prop="profile">
          <el-input
            ref="input"
            placeholder="请输入个人简介"
            v-model.trim="addForm.profile"
          ></el-input>
        </el-form-item>
        <el-form-item label="签约时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.signDate"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上传图片：">
          <a-upload
            class="uploader"
            :action="uploadUrl"
            :headers="headers"
            :remove="onImgRemove"
            list-type="picture-card"
            :file-list="fileList"
            @preview="handleImgPreview"
            @change="handleImgChange"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </el-form-item>
        <el-button type="info" @click="addDialogClosed">取消</el-button>

        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 新增的预览图片 -->
    <a-modal
      class="preview"
      :visible="previewVisible"
      :footer="null"
      @cancel="handleImgCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

    <!-- 删除的Dialog对话框 -->
    <el-dialog
      title="删除健康顾问"
      :visible.sync="removeDialogVisible"
      width="50%"
      center
      @close="removeDialogClosed"
      class="removeDialog"
    >
      <a-table
        :rowKey="(record) => record.id"
        :columns="removeColumns"
        :data-source="removeData"
        :row-selection="removeRowSelection"
        :pagination="true"
        :loading="TableLoading_1"
      />
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" @click="clearRepository" :loading="loading_2"
        >删除</el-button
      >
    </el-dialog>
    <!-- 编辑健康顾问的信息 -->
    <a-modal
      title="编辑健康顾问信息"
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
        <a-form-model-item ref="nickName" label="顾问姓名" prop="nickName">
          <a-input v-model="EditForm.nickName" />
        </a-form-model-item>
        <a-form-model-item label="顾问电话" prop="phone">
          <a-input v-model="EditForm.phone" />
        </a-form-model-item>
        <a-form-model-item label="个人简介" prop="profile">
          <a-input v-model="EditForm.profile" />
        </a-form-model-item>
        <a-form-model-item label="签约时间" prop="signDate" required>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="EditForm.signDate"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </a-form-model-item>
        <a-form-item label="上传图片">
          <a-upload
            class="uploader"
            :action="uploadUrl"
            :headers="headers"
            :remove="onImgRemove"
            list-type="picture-card"
            :file-list="editFileList"
            @preview="handleImgPreview"
            @change="handleImgChange"
          >
            <div v-if="editFileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getCounselorList, addCounselor, deleteCounselor } from '@/network/home'
import { mapState } from 'vuex'
import _ from 'lodash'
import AFormItem from 'ant-design-vue/es/form/FormItem'

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
    AFormItem,
    Card,
  },
  data() {
    return {
      wrapperCol: { span: 14 },
      labelCol: { span: 4 },
      visible: false, // 显示与隐藏
      confirmLoading: false, // 点击确定按钮的回调
      EditForm: {},
      changedEditForm: {}, // 编辑后的顾问信息
      EditFormRules: {
        nickName: [
          { required: true, message: '请输入顾问姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入顾问电话', trigger: 'blur' },
        ],
        profile: [
          { required: true, message: '请输入个人简介', trigger: 'blur' },
        ],
        signDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
      },
      currentIndex: null,
      TableLoading_2: false,
      TableLoading_1: false,
      loading_4: false,
      loading_3: false,
      loading_2: false,
      loading_1: false, // 新增知识库的 按钮loading
      disabled: true,
      /* 问答管理的数据 */
      selectedRowKeys: [],
      selectedRows: [],
      title: '',
      repository: '',
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      nameArr: [], // 知识库名称 数组
      addForm: {
        // 添加表单对象
        nickName: null,
        phone: null,
        profile: null,
        signDate: null,
        attachmentID: null,
      },
      columns: [
        // 对应健康顾问的表格
        {
          title: '图片',
          key: 'image',
          scopedSlots: { customRender: 'image' },
          width: '25%',
        },
        {
          title: '姓名',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: '电话',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '个人简介',
          dataIndex: 'profile',
          key: 'profile',
          width: '40%',
        },
        {
          title: '签约时间',
          dataIndex: 'signDate',
          key: 'signDate',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      data: [
        // 对应知识库的数据
      ],
      removeColumns: [
        // 删除 知识库 对话框 表格title
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '健康顾问',
          dataIndex: 'name',
          key: 'name',
          width: '70%',
        },
      ],
      removeData: [
        // 删除 知识库 table 的数据
      ],
      counselorList: [], // 健康顾问列表的数据
      currentDate: null, // 当前时间
      fileList: [], // 上传文件列表
      editFileList: [], // 编辑的上传文件列表
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      previewVisible: false, // 预览 打开 or 关闭
      previewImage: '', // 预览图片
      editStatus: false, // 编辑状态
    }
  },
  created() {
    this.getCounselorList()
    this.getNowFormatDate()
  },
  mounted() { },
  computed: {
    ...mapState('user', ['memberID']),
    removeRowSelection() {
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
  methods: {
    //获取当前时间 yyyy-MM-dd
    getNowFormatDate() {
      let date = new Date()
      let seperator = '-'
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.currentDate =
        date.getFullYear() + seperator + month + seperator + strDate
    },
    // 点击打开 修改健康顾问的dialog
    edit(record) {
      this.visible = true
      this.changedEditForm = _.cloneDeep(record)
      this.EditForm = this.changedEditForm
      this.editStatus = true
    },
    // 编辑点击确定回调
    handleOk() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return this.$message.info('请完善表单')

        this.confirmLoading = true
        // 更新时间
        this.EditForm.uptDate = this.currentDate
        if (this.EditForm.photoID === null) {
          this.EditForm.photoID = this.changedEditForm.photoID
        }
        const data = this.EditForm

        // 发送请求 保存编辑的顾问信息
        addCounselor(data).then(({ data, code }) => {
          if (code != 0) {
            this.confirmLoading = false
            return this.$message.error('保存失败')
          }

          this.$message.success('保存成功')
          this.confirmLoading = false
          this.editStatus = false
          this.handleCancel()
          this.getCounselorList()
        })
      })
    },
    // 编辑点击遮罩层或右上角叉或取消按钮的回调
    handleCancel() {
      this.visible = false
      this.$refs.ruleForm.resetFields()
      this.editStatus = false
      this.editFileList = []
      this.EditForm.photoID = null
    },
    /* 点击tag标签 跳转 */
    toTable(item, index) {
      this.currentIndex = index
      this.data = []
      this.title = item.name
      this.disabled = false
      this.repository = item.id
    },

    // 获取顾问列表
    getCounselorList() {
      const data = {}
      // 发送请求
      getCounselorList(data).then((res) => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        this.counselorList = res.data
        res.data.forEach((item, index) => {
          let key = index + 1
          let id = item.id
          let name = item.nickName
          this.removeData.push({
            key,
            id,
            name,
          })
        })
      })
    },

    /* 展示添加知识库的dialog */
    showAddDialog() {
      this.addDialogVisible = true

      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    /* 展示删除知识库的dialog  */
    showRemoveDialog() {
      this.removeData = []
      this.removeDialogVisible = true
      // 发送请求
      this.getCounselorList()
    },
    /* 健康顾问 点击 保存 */
    saveAddForm() {
      let nickName = this.addForm.nickName
      let phone = this.addForm.phone
      let profile = this.addForm.profile
      let signDate = this.addForm.signDate
      let pubDate = this.currentDate // 创建时间
      let photoID = this.addForm.attachmentID
      if (!nickName) return this.$message.info('请完善表单')
      if (!profile) return this.$message.info('请完善表单')
      if (!signDate) return this.$message.info('请完善表单')

      const data = {
        nickName,
        phone,
        profile,
        signDate,
        pubDate,
        photoID,
      }
      this.loading_1 = true
      this.cancel()
      // 发送请求
      addCounselor(data).then((res) => {
        if (!res) return
        if (res.code != 0) {
          this.loading_1 = false
          return this.$message.warning('保存失败，可能是 名称重复啦')
        }
        this.$message.success('保存成功')

        this.loading_1 = false
        this.getCounselorList()
        this.addDialogClosed()
      })
    },
    /* 点击按钮 删除健康顾问 */
    clearRepository() {
      this.loading_2 = true
      setTimeout(() => {
        if (this.selectedRows.length == 0) {
          this.loading_2 = false
          return this.$message.info('请选择您要删除的知识库')
        }

        const arr = []
        this.selectedRows.forEach((item) => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id,
        }
        console.log(data)
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteCounselor(data).then((res) => {
          console.log('res: ', res)
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          this.selectedRows = [];
          this.removeData = []
          this.getCounselorList()
          this.loading_2 = false
        })
      }, 1000)
    },
    /* 关闭新增 对话框事件 */
    addDialogClosed() {
      this.addForm.signDate = null
      this.addForm.attachmentID = null
      this.fileList = []
      this.addDialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    removeDialogClosed() {
      this.selectedRowKeys = []
      this.removeDialogVisible = false
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
          this.editFileList = []
          flag = true
          this.addForm.attachmentID = ''
          this.EditForm.photoID = null
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
          flag = false
        })
      console.log(this.addForm.attachmentID)
      console.log(this.EditForm.photoID)
      return flag
    },
    // 处理状态 改变
    handleImgChange({ file, fileList }) {
      console.log(file)
      if (this.editStatus === false) {
        this.fileList = fileList
        if (file.response) this.addForm.attachmentID = file.response.data.id
      } else {
        this.editFileList = fileList
        if (file.response) this.EditForm.photoID = file.response.data.id
      }
    },
    // 处理预览
    async handleImgPreview(file) {
      this.AddDialogVisible = false
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    // 处理关闭预览
    handleImgCancel() {
      this.previewVisible = false
      this.AddDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .category {
    font-size: 25px;
    font-weight: 500;
  }

  .el-row {
    margin-bottom: 10px;
  }

  .loading {
    width: 22%;
    ::v-deep .ant-spin-nested-loading > div > .ant-spin {
      background-color: #eaedf1 !important;
    }
    .spin-content {
      padding: 30px;
    }
  }

  .el-tag {
    margin-right: 5px;
    margin-bottom: 10px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
  }

  .addDialog {
    .el-form {
      ::v-deep .el-input__inner {
        font-weight: 500;
        color: #777;
      }

      .el-button {
        float: right;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }

  .el-dialog {
    .el-form {
      .el-button {
        float: right;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }

  .removeDialog {
    .el-button {
      float: right;
      margin-top: 10px;
      margin-left: 10px;
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
  // Dialog 对话框
  ::v-deep .el-dialog--center {
    padding-bottom: 36px;
    border-radius: 5px;
  }
  ::v-deep .el-dialog__wrapper.addDialog {
    z-index: 700;
  }

  ::v-deep .is-left:hover {
    color: #40a0ffb4;
  }

  ::v-deep .el-form-item__label {
    font-weight: 500;
  }

  b {
    font-weight: bold;
    font-size: 20px;
  }

  .active {
    background-color: #f56c6c;
    border: 1px solid transparent;
    box-shadow: -2px -0px 10px #f56c6c !important;
  }
}

::v-deep .ant-form-horizontal {
  transform: translateX(40px) !important;
}
</style>