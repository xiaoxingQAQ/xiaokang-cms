/* 运营管理 */
<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">运营管理</span>

      <div slot="rightTitle">
        <el-button type="primary" @click="AddDialogVisible = true"
          >新增</el-button
        >
        <el-button type="danger" :loading="loading_2" @click="clearContent"
          >删除</el-button
        >
      </div>

      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          :loading="loading"
          :columns="columns"
          :data-source="tabData"
          :pagination="false"
          :row-selection="removeRowSelection"
        >
          <div slot="image" slot-scope="text, record">
            <a-button @click="showImage(record)" class="btn">预览</a-button>
          </div>
        </a-table>
      </div>
    </Card>

    <!-- 图片预览的 弹出框 -->
    <el-dialog
      class="addDialog"
      title="预览"
      center
      :visible.sync="imageDialogVisible"
    >
      <img width="100%" :src="imageUrl" alt="" />
    </el-dialog>

    <!-- 新建的Dialog -->
    <el-dialog
      class="addDialog"
      title="新增"
      center
      @close="dialogClosed"
      :visible.sync="AddDialogVisible"
    >
      <header>
        <span class="title">上传图片：</span>
        <a-upload
          class="uploader"
          :action="uploadUrl"
          :headers="headers"
          :remove="onRemove"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <!-- 新增的预览图片 -->
        <a-modal
          class="preview"
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </header>
      <main>
        <span style="margin: 5px 0 0 2px">名称：</span>
        <el-input
          v-model="updateForm.message"
          placeholder="请输入名称"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
          @keyup.enter.native="submitPicture"
        ></el-input>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClosed">取 消</el-button>
        <el-button type="primary" @click="submitPicture" :loading="loading_1"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getOperation, addOperation, deleteOperation } from '@/network/home'
import { mapState } from 'vuex';

const token = JSON.parse(sessionStorage.getItem('token'));
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  components: {
    Card
  },
  data() {
    return {
      selectedRows: [],
      selectedRowKeys: [],
      imageUrl: '', // 对应行数 图片的url
      loading_2: false,
      loading_1: false,
      loading: false,
      updateForm: { // 提交的表单
        message: '', // 编号
        attachmentID: ''
      },
      AddDialogVisible: false,
      imageDialogVisible: false, // table预览图片 打开 or 关闭
      previewVisible: false, // 预览 打开 or 关闭
      previewImage: '', // 预览图片
      file: {},
      fileList: [], // 上传文件列表
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          width: '70%'
        },
        {
          title: '图片',
          dataIndex: 'image',
          key: 'image',
          scopedSlots: { customRender: 'image' },
          width: '20%'
        }
      ],
      tabData: []
    }
  },
  created() {
    this.getOperation()
  },
  computed: {
    ...mapState('user', ['memberID']),
    // 选中的 tr
    removeRowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows
          )
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        }
      }
    },
  },
  methods: {
    // 获取运营列表
    getOperation() {
      this.tabData = []
      // 获取列表数据
      this.loading = true
      this.cancel()
      // 发送请求 获取 运营列表
      getOperation().then(({ data, code }) => {
        console.log(data);
        if (code != 0) {
          this.loading = false
          return this.$message.error('获取数据失败')
        }

        data.forEach((item, index) => {
          const key = index
          const id = item.id
          const name = item.name
          const url = item.attachmentNames[0].webUrl
          this.tabData.push({
            key,
            id,
            name,
            url
          })
        })
        this.loading = false

        console.log('this.tabData', this.tabData)
      })
    },
    // 点击预览图片
    showImage(record) {
      console.log('record: ', record);
      this.imageUrl = record.url
      this.imageDialogVisible = true
    },
    // 处理预览
    async handlePreview(file) {
      this.AddDialogVisible = false
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    // 处理状态 改变
    handleChange({ file, fileList }) {
      console.log(file);
      this.fileList = fileList;
      if (file.response)
        this.updateForm.attachmentID = file.response.data.id
    },
    // 处理关闭预览
    handleCancel() {
      this.previewVisible = false;
      this.AddDialogVisible = true
    },
    // 点击确定 提交
    submitPicture() {
      const name = this.updateForm.message;
      const AttachmentIDs = this.updateForm.attachmentID
      const data = {
        name,
        AttachmentIDs
      }
      console.log(data);
      if (!AttachmentIDs) {
        return this.$message.warning('请上传图片')
      }
      if (!this.updateForm.message) return this.$message.warning('请输入名称')
      this.loading_1 = true
      this.cancel()
      // 发送请求 添加运营
      addOperation(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('添加失败')

        this.$message.success('添加成功')
        this.getOperation()
        this.loading_1 = false
        this.dialogClosed()
      })
    },
    // 处理关闭 table 图片预览
    dialogClosed() {
      this.updateForm.message = ''
      this.updateForm.attachmentID = ''
      this.fileList = [] // 清空上传文件
      this.AddDialogVisible = false
    },
    // 点击关闭 图片预览Dialog

    // 点击删除 删除选中的表格内容
    clearContent() {
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
      this.cancel()
      // 发送请求 删除对应的 知识库
      deleteOperation(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) {
          this.loading_2 = false
          return this.$message.error('删除失败')
        }
        // 提示
        this.$message.success('删除成功')
        this.getOperation()
        this.loading_2 = false
      })

    },
  }
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .btn {
    width: 90px;
    font-weight: 500;
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
  .addDialog {
    font-weight: 500;
    header {
      display: flex;
      padding: 0 0 30px;
      .title {
        width: 82px;
      }
      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }

      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }

    main {
      padding-left: 24px;
      display: flex;
      span {
        width: 50px;
      }
    }
  }
}
</style>
