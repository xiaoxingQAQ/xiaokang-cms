/* 养生知识 */
<template>
  <div class="wrapper">
    <!-- 面包屑导航 -->
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>养生知识</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增分类</el-button>
      <el-button type="danger" @click="showRemoveDialog">分类管理</el-button>
    </el-row>

    <el-row>
      <span class="category">养生知识</span>
    </el-row>
    <!-- loading -->
    <el-row class="loading" v-if="nameArr.length == 0">
      <a-spin tip="Loading...">
        <div class="spin-content"></div>
      </a-spin>
    </el-row>
    <!-- tag养生分类标签 -->
    <el-row v-else>
      <el-tag
        v-for="(item, indey) in nameArr"
        :key="indey"
        type="warning"
        effect="dark"
        :class="{ active: currentIndex == indey }"
        @click="toTable(item, indey)"
      >
        {{ item.directoryName }}
      </el-tag>
    </el-row>
    <!-- 卡片 -->
    <Card>
      <span slot="leftTitle" v-if="title">分类：{{ title }}</span>
      <span slot="leftTitle" v-else>
        点击上方标签，木有的话，先创建分类；
      </span>

      <div slot="rightTitle">
        <el-button
          type="primary"
          :disabled="disabled"
          @click="answerDialogVisible = true"
          >新增养生知识</el-button
        >
        <el-button
          type="danger"
          :loading="loading_4"
          :disabled="disabled"
          @click="clearAnswer"
          >删除养生知识</el-button
        >
      </div>
      <!-- 养生知识内容列表 -->
      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          style="margin-top: 10px"
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :pagination="true"
          :loading="TableLoading_2"
        >
          <template slot="audio" slot-scope="text, record">
            <audio
              class="tsp-audio"
              @play="play"
              @pause="pause"
              :class="{ playing: status == 1 }"
              :src="record.attachmentUrl"
              controls
              loop
            ></audio>
          </template>
          <template slot="editHealth" slot-scope="text, record, index">
            <el-button
              @click="editHealth(record)"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
          </template>
        </a-table>
      </div>
    </Card>
    <!-- 新增分类的 Dialog对话框 -->
    <el-dialog
      title="新增分类"
      :visible.sync="addDialogVisible"
      width="50%"
      center
      @close="addDialogClosed"
      class="addDialog"
    >
      <el-form
        ref="addFormRef"
        label-position="right"
        label-width="80px"
        :model="addForm"
      >
        <el-form-item label="名称：">
          <el-input
            ref="input"
            placeholder="请输入分类名称"
            v-model.trim="addForm.directoryName"
            @keyup.enter.native="saveAddForm"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="addDialogClosed">取消</el-button>

        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>
    <!-- 修改分类的 Dialog对话框 -->
    <el-dialog
      title="修改分类"
      :visible.sync="updataDialogVisible"
      width="50%"
      center
      @close="updataDialogClosed"
      class="addDialog"
    >
      <el-form
        ref="addFormRef"
        label-position="right"
        label-width="80px"
        :model="addForm"
      >
        <el-form-item label="名称：">
          <el-input
            ref="input"
            placeholder="请输入分类名称"
            v-model.trim="updataForm.directoryName"
            @keyup.enter.native="saveAddForm"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="updataDialogClosed">取消</el-button>

        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 删除分类的Dialog对话框 -->
    <el-dialog
      title="删除分类"
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
      >
        <template slot="edit" slot-scope="text, record">
          <el-button
            @click="edit(record)"
            type="primary"
            icon="el-icon-edit"
          ></el-button>
        </template>
      </a-table>
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" @click="clearRepository" :loading="loading_2"
        >删除</el-button
      >
    </el-dialog>

    <!-- 新增养生知识的Dialog -->
    <el-dialog
      title="新增养生知识"
      :visible.sync="answerDialogVisible"
      width="50%"
      center
      @close="answerDialogClosed"
      class="answerDialog"
    >
      <el-form ref="addFormRef" label-position="right" label-width="80px">
        <el-form-item label="名称：">
          <el-input placeholder="请输入名称" v-model.trim="name"></el-input>
        </el-form-item>
        <el-form-item label="音频文件：">
          <a-upload
            method="post"
            :action="uploadUrl"
            :headers="headers"
            :remove="onRemove"
            :multiple="false"
            :file-list="fileList"
            @change="handleChange"
          >
            <a-button v-if="fileList.length == 0">
              <a-icon type="upload" /> Upload
            </a-button>
          </a-upload>
        </el-form-item>
        <el-button type="info" @click="answerDialogClosed">取消</el-button>
        <el-button type="primary" :loading="loading_3" @click="saveAnswerForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>
    <!-- 编辑养生知识的Dialog -->
    <el-dialog
      title="编辑养生知识"
      :visible.sync="editHealthVisible"
      width="50%"
      center
      @close="answerDialogClosed"
      class="answerDialog"
    >
      <el-form
        ref="editFormRef"
        label-position="right"
        label-width="80px"
        v-model="editForm"
      >
        <el-form-item label="名称：">
          <el-input
            placeholder="请输入名称"
            v-model.trim="editForm.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="音频文件：">
          <a-upload
            method="post"
            :action="uploadUrl"
            :headers="headers"
            :remove="onRemove"
            :multiple="false"
            :file-list="editFileList"
            @change="handleEditChange"
          >
            <a-button v-if="editFileList.length == 0">
              <a-icon type="upload" /> Upload
            </a-button>
          </a-upload>
        </el-form-item>
        <el-button type="info" @click="editDialogClosed">取消</el-button>
        <el-button type="primary" :loading="loading_3" @click="saveEditForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import {
  getHealthyList,
  addHealthy,
  delehealthy,
  getByHealthyList,
  addByHealthy,
  deleByHealthy,
} from '@/network/home'
import { mapState } from 'vuex'
import _ from 'lodash'
const token = JSON.parse(sessionStorage.getItem('token'))
export default {
  components: {
    Card,
  },
  data() {
    return {
      currentIndex: null,
      status: 0, // 0 pause, 1 play
      fileList: [],
      editFileList: [],
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      currentIndex: null,
      TableLoading_2: false,
      TableLoading_1: false,
      loading_4: false,
      loading_3: false,
      loading_2: false,
      loading_1: false, // 新增分类的 按钮loading
      disabled: true,
      date: '',
      /* 养生知识管理的数据 */
      selectedRowKeys: [], //选中的 分类名称
      selectedRows: [], // /选中的 养生分类数据
      selectedRowKeys_2: [],
      selectedRows_2: [],
      title: '', // 查询养生知识内容名称
      name: '', // 新增养生知识内容的名称
      attachmentID: '', // 上传文件的id

      nameArr: [], // 养生知识分类 数组
      directoryName: '', // 养生知识分类名称
      healthyID: '', // 点击 获取的分类id
      answerDialogVisible: false,
      addDialogVisible: false, // 对话框 显示 / 隐藏
      updataDialogVisible: false, // 修改分类
      removeDialogVisible: false,
      editHealthVisible: false, // 编辑养生知识内容  对话框 显示 / 隐藏
      addForm: {
        // 添加、修改分类
        directoryName: '',
      },
      updataForm: {
        // 修改分类
        directoryName: '',
        id: '',
      },
      columns: [
        // 对应分类的表格
        {
          title: '名称',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '音频',
          scopedSlots: { customRender: 'audio' },
          key: 'audio',
          width: '60%',
        },
        {
          title: '编辑',
          key: 'editHealth',
          scopedSlots: { customRender: 'editHealth' },
        },
      ],
      data: [],
      removeColumns: [
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '名称',
          dataIndex: 'directoryName',
          key: 'directoryName',
          width: '70%',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
          width: '80px',
        },
      ],
      removeData: [],
      editHealthData: {}, // 储存编辑养生知识，回显
      // 保存编辑的内容
      editForm: {
        id: '',
        title: '',
        status: 1,
        attachmentID: '',
      },
      editStatus: false, // 编辑状态
    }
  },
  created() {
    this.getHealthy()
  },
  mounted() {},
  computed: {
    ...mapState('user', ['memberID']),
    // 删除知识库的内容table
    rowSelection() {
      const { selectedRowKeys_2 } = this
      return {
        selectedRowKeys: selectedRowKeys_2,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
          this.selectedRowKeys_2 = selectedRowKeys
          this.selectedRows_2 = selectedRows
        },
      }
    },
    // 删除分类 table
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
    play() {
      this.status = 1
    },
    pause() {
      this.status = 0
    },
    /* 点击tag标签养身知识分类 跳转 查询养生知识内容*/
    toTable(item, indey) {
      this.currentIndex = indey
      this.data = []
      this.selectedRowKeys_2 = []
      this.title = item.name
      this.disabled = false
      this.healthyID = item.id
      this.getByHealthyList()
    },
    // 获取 知识库的数据 分类列表
    getHealthy() {
      const memberID = this.memberID
      const categoryID = '3'
      const data = {
        memberID,
        categoryID,
      }
      this.TableLoading_1 = true
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getHealthyList(data).then((res) => {
        console.log('res: ', res)
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        this.nameArr = []
        this.removeData = []
        res.data.forEach((item, index) => {
          let key = index + 1
          let id = item.id
          let directoryName = item.directoryName
          this.removeData.push({
            key,
            id,
            directoryName,
          })
          this.nameArr.push({
            key,
            id,
            directoryName,
          })
        })
        this.nameArr = _.uniqBy(this.nameArr, 'id')
        this.removeData = _.uniqBy(this.removeData, 'id')
        this.TableLoading_1 = false
        this.TableLoading_2 = false
      })
    },
    // 获取养生知识内容数据列表
    getByHealthyList() {
      this.selectedRowKeys_2 = []
      this.data = []
      const categoryID = '3'
      const memberID = this.memberID
      const healthyID = this.healthyID
      const data = {
        memberID,
        healthyID,
        categoryID,
      }
      console.log('dai', data)
      console.log(data)
      this.TableLoading_2 = true
      this.cancel()
      // 发送查询请求
      getByHealthyList(data).then((res) => {
        console.log('问答', res)
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach((item, index) => {
          let key = index
          let id = item.id
          let title = item.title
          let attachmentID = item.attachmentID
          let attachmentUrl = item.attachmentUrl
          this.data.push({
            key,
            id,
            title,
            attachmentID,
            attachmentUrl,
          })
        })
        // 去重
        this.data = _.uniqBy(this.data, 'id')
        this.TableLoading_2 = false
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
      this.getHealthy()
    },
    /* 养生知识新增、修改分类 点击 保存 */
    saveAddForm() {
      let val = this.addForm.directoryName
      if (!val) {
        if (!this.updataForm.directoryName)
          return this.$message.info('您输入的内容为空')
      }

      const memberID = this.memberID
      const directoryName = val
      const status = 1
      const data = {
        directoryName,
        memberID,
        categoryID: '3',
        status,
        id: '',
      }
      if (this.updataDialogVisible == true) {
        data.id = this.updataForm.id
        data.directoryName = this.updataForm.directoryName
      }
      this.loading_1 = true
      this.cancel()
      // 发送请求
      addHealthy(data).then((res) => {
        if (!res) return
        if (res.code != 0) {
          this.loading_1 = false
          return this.$message.warning('保存失败，可能是 名称重复啦')
        }

        this.$message.success('保存成功')

        this.loading_1 = false
        this.addDialogClosed()
        this.updataDialogClosed()
        this.getHealthy()
      })
    },
    // 修改分类
    edit(record) {
      console.log('我是编辑', record)
      this.updataForm.directoryName = record.directoryName
      this.updataForm.id = record.id
      this.updataDialogVisible = true
    },
    /* 点击按钮 删除分类 */
    clearRepository() {
      this.loading_2 = true
      setTimeout(() => {
        if (this.selectedRows.length == 0) {
          this.loading_2 = false
          return this.$message.info('请选择您要删除的分类')
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
        delehealthy(data).then((res) => {
          console.log('res: ', res)
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          this.nameArr = []
          this.removeData = []
          this.getHealthy()
          this.loading_2 = false
        })
      }, 1000)
    },
    /* 关闭 对话框事件 */
    addDialogClosed() {
      this.addForm.directoryName = ''
      this.addDialogVisible = false
    },
    /* 关闭 对话框事件 */
    updataDialogClosed() {
      this.updataDialogVisible = false
    },
    removeDialogClosed() {
      this.selectedRowKeys = []
      this.removeDialogVisible = false
    },
    /* 新增养生内容  */
    // #region
    /* 关闭 新增养生内容的Dialog */
    answerDialogClosed() {
      this.name = ''
      this.fileList = []
      this.editFileList = []
      this.answerDialogVisible = false
    },
    /* 保存 新增养生内容的Dialog */
    saveAnswerForm() {
      const memberID = this.memberID
      const healthyID = this.healthyID
      const title = this.name
      const status = 1
      const attachmentID = this.attachmentID
      if (!title) return this.$message.warning('请输入名称')
      if (!attachmentID) {
        return this.$message.warning('请上传音频')
      }
      // 深拷贝
      const arr = _.cloneDeep(this.data)
      // 有从重复的 过滤到新数组中
      const newArr = arr.filter((item) => {
        return item.title == title
      })
      // 如果有值 判断
      if (newArr.length != 0) {
        const obj = newArr[0]
        if (obj.title == title) return this.$message.info('名称重复')
      }
      const data = {
        memberID,
        healthyID,
        title,
        attachmentID,
        status,
      }
      this.loading_3 = true
      this.cancel()
      // 发送请求
      addByHealthy(data).then((res) => {
        if (!res) return
        if (res.code != 0) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        // 获取养生知识内容数据列表
        this.getByHealthyList()
      })

      setTimeout(() => {
        this.loading_3 = false
        this.answerDialogClosed()
      }, 300)
    },
    /* 点击删除养生知识 */
    clearAnswer() {
      this.loading_4 = true
      setTimeout(() => {
        if (this.selectedRows_2.length == 0) {
          this.loading_4 = false
          return this.$message.info('请选择您要删除的养生知识')
        }

        const arr = []
        this.selectedRows_2.forEach((item) => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id,
        }

        console.log(data)
        this.cancel()
        // 发送请求 删除对应的 养生知识
        deleByHealthy(data).then((res) => {
          console.log('res: ', res)
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          console.log(this.repository)
          this.getByHealthyList()

          this.loading_4 = false
        })
      }, 500)
    },

    // 处理上传文件状态改变
    handleChange(info) {
      console.log(info)
      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
          this.attachmentID = file.response.data.id
        }
        return file
      })

      this.fileList = fileList
    },
    // 处理删除文件
    onRemove() {
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
          this.attachmentID = ''
          flag = true
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
          flag = false
        })
      return flag
    },
    // 编辑养生知识内容
    editHealth(record) {
      console.log(record)
      this.editHealthVisible = true
      this.editForm.id = record.id
      this.editForm.title = record.title
      this.editForm.attachmentID = record.attachmentID
      this.editStatus = true
    },
    // 编辑养生知识内容 确定按钮
    saveEditForm() {
      const id = this.editForm.id
      const memberID = this.memberID
      const healthyID = this.healthyID
      const title = this.editForm.title
      const status = this.editForm.status
      const attachmentID = this.editForm.attachmentID
      if (!title) return this.$message.warning('请输入名称')
      if (!attachmentID) {
        return this.$message.warning('请上传音频')
      }
      const data = {
        title,
        status,
        attachmentID,
        memberID,
        healthyID,
        id,
      }
      this.loading_3 = true
      this.cancel()
      // 发送请求
      addByHealthy(data).then((res) => {
        if (!res) return
        if (res.code != 0) return this.$message.error('修改失败')
        console.log('res: ', res)

        this.editStatus = false
        this.editHealthVisible = false
        this.$message.success('修改成功')
        // 获取养生知识内容数据列表
        this.getByHealthyList()
      })
      setTimeout(() => {
        this.loading_3 = false
        this.answerDialogClosed()
      }, 300)
    },
    // 编辑养生知识内容 对话框关闭
    editDialogClosed() {
      this.editHealthVisible = false
      this.editStatus = false
    },

    // 上传修改音频
    handleEditChange(info) {
      console.log(info)
      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
          this.editForm.attachmentID = file.response.data.id
        }
        return file
      })

      this.editFileList = fileList
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
  ::v-deep .el-row {
    margin-bottom: 10px !important;
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
  // 新增知识库的Dialog
  ::v-deep .el-form-item__label {
    width: auto !important;
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
</style>