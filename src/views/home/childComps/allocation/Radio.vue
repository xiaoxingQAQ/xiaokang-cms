/* 收音机 */
<template>
  <div class="wrapper">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增分类</el-button>
      <el-button type="danger" @click="showRemoveDialog">分类管理</el-button>
    </el-row>
    <el-row>
      <span class="category">频道分类</span>
    </el-row>
    <el-row class="loading" v-if="isLoading">
      <a-spin tip="Loading...">
        <div class="spin-content"></div>
      </a-spin>
    </el-row>

    <el-row v-else>
      <el-tag
        v-for="(item, indey) in nameArr"
        :key="indey"
        type="warning"
        effect="dark"
        :class="{ active: currentIndex == indey }"
        @click="toTable(item, indey)"
      >
        {{ item.name }}
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
          >新增频道</el-button
        >
        <el-button
          type="danger"
          :loading="loading_4"
          :disabled="disabled"
          @click="clearAnswer"
          >删除频道</el-button
        >
      </div>

      <div slot="main">
        <a-table
          :rowKey="record => record.id"
          style="margin-top: 10px"
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :pagination="true"
          :loading="TableLoading_2"
        >
          <template slot="showDia" slot-scope="text, record">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="amend(record)"
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
            v-model.trim="addForm.name"
            @keyup.enter.native="saveAddForm"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="addDialogClosed">取消</el-button>

        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 分类管理的Dialog对话框 -->
    <el-dialog
      title="分类管理"
      :visible.sync="removeDialogVisible"
      width="50%"
      center
      @close="removeDialogClosed"
      class="removeDialog"
    >
      <a-table
        :rowKey="record => record.id"
        :columns="removeColumns"
        :data-source="removeData"
        :row-selection="removeRowSelection"
        :pagination="true"
        :loading="TableLoading_1"
      >
        <template slot="edit" slot-scope="text, record">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit(record)"
          ></el-button>
        </template>
      </a-table>
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" @click="clearRepository" :loading="loading_2"
        >删除</el-button
      >
      <el-dialog
        title="修改分类名称"
        :visible.sync="visible"
        :modal="false"
        width="40%"
        center
        class="removeDialog"
      >
        <el-input
          ref="input"
          placeholder="请输入分类名称"
          v-model.trim="EditForm.name"
          @keyup.enter.native="saveAddForm"
        ></el-input>
        <el-button type="info" @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-dialog>
    </el-dialog>
    <!-- 修改频道的Dialog -->
    <el-dialog
      title="修改频道"
      :visible.sync="showDia"
      width="50%"
      center
      class="removeDialog"
    >
      <el-input
        ref="input"
        placeholder="请输入频道FM号"
        v-model.trim="AmendForm.broadcastID"
        @keyup.enter.native="saveAnswerForm"
        style="margin-bottom: 20px;"
      ></el-input>
      <el-input
        ref="input"
        placeholder="请输入频道名称"
        v-model.trim="AmendForm.title"
        @keyup.enter.native="saveAnswerForm"
      ></el-input>
      <el-button type="info" @click="showDia = false">取消</el-button>
      <el-button type="primary" :loading="loading_3" @click="saveAnswerForm"
        >保存</el-button
      >
    </el-dialog>
    <!-- 新增频道的Dialog -->
    <el-dialog
      title="新增频道"
      :visible.sync="answerDialogVisible"
      width="50%"
      center
      @close="answerDialogClosed"
      class="answerDialog"
    >
      <el-form
        ref="addFormRef"
        label-position="right"
        label-width="80px"
        :model="answerForm"
      >
        <el-form-item label="频道：">
          <el-input
            placeholder="请输入频道FM号"
            v-model.trim="answerForm.broadcastID"
          ></el-input>
        </el-form-item>
        <el-form-item label="名称：">
          <el-input
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入频道名称"
            v-model.trim="answerForm.title"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="answerDialogClosed">取消</el-button>
        <el-button type="primary" :loading="loading_3" @click="saveAnswerForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import {
  getRepository,
  addRepository,
  deleteRepository,
  getRadioList,
  deleteRadio,
  addRadio
} from '@/network/home'
import { mapState } from 'vuex'
const token = JSON.parse(sessionStorage.getItem('token'))
export default {
  components: {
    Card
  },
  data() {
    return {
      isLoading: true,
      currentIndex: null,
      TableLoading_2: false,
      TableLoading_1: false,
      loading_4: false, // 删除频道的loading
      loading_3: false, // 保存频道的loading
      loading_2: false, // 分类管理的loading
      loading_1: false, // 保存分类的loading
      visible: false, // 修改分类名称的dialog
      showDia: false, // 修改频道的dialog
      disabled: true,
      date: '',
      /* 频道管理的数据 */
      selectedRowKeys_2: [], // 选中的分类
      selectedRows_2: [], // 选中的分类数组
      selectedRowKeys: [], //选中的 频道名称
      selectedRows: [], // 选中的 频道数组
      title: '',
      answerForm: {
        broadcastID: '',
        title: ''
      },
      EditForm: {
        id: '',
        name: ''
      },
      AmendForm: {
        broadcastID: '',
        id: '',
        title: ''
      },
      categoryID: '',
      answerDialogVisible: false,
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      nameArr: [], // 分类名称 数组
      addForm: {
        // 添加表单对象
        name: ''
      },
      columns: [
        // 对应分类的表格
        {
          title: '频道(FM)',
          dataIndex: 'broadcastID',
          key: 'broadcastID'
        },
        {
          title: '内容',
          dataIndex: 'title',
          key: 'title',
          width: '60%'
        },
        {
          title: '编辑',
          key: 'showDia',
          scopedSlots: { customRender: 'showDia' }
        }
      ],
      data: [
        // 对应分类的数据
      ],
      removeColumns: [
        // 删除 分类 对话框的表格
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
          width: '12%'
        },
        {
          title: '知识库名称',
          dataIndex: 'name',
          key: 'name',
          width: '70%'
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        }
      ],
      removeData: [
        // 删除 知识库 table 的数据
      ]
    }
  },
  created() {
    this.getRadioList()
  },
  mounted() {},
  computed: {
    ...mapState('user', ['memberID']),
    // 分类的table
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
        }
      }
    },
    // 问答 table
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
        }
      }
    }
  },
  methods: {
    /* 点击tag标签 跳转 */
    toTable(item, index) {
      this.currentIndex = index
      this.data = []
      this.selectedRowKeys_2 = []
      this.title = item.name
      this.disabled = false
      this.categoryID = item.id
      this.getAnswer()
    },
    // 获取 分类数据 列表
    getRadioList() {
      const categoryID = '2'
      const data = {
        categoryID
      }
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getRepository(data).then(res => {
        console.log('res: ', res)
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        this.isLoading = false;
        this.nameArr = []
        this.removeData = []
        res.data.forEach((item, index) => {
          let key = index + 1
          let id = item.id
          let name = item.name
          this.nameArr.push({
            key,
            id,
            name
          })
          this.removeData.push({
            key,
            id,
            name
          })
        })
        this.nameArr = _.uniqBy(this.nameArr, 'id')
        this.removeData = _.uniqBy(this.removeData, 'id')
        this.TableLoading_2 = false
      })
    },
    // 获取的频道数据列表
    getAnswer() {
      this.data = []
      const categoryID = this.categoryID
      const data = {
        categoryID
      }
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getRadioList(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        res.data.forEach((item, index) => {
          let key = index
          let id = item.id
          let broadcastID = item.broadcastID
          let title = item.title
          this.data.push({
            key,
            id,
            broadcastID,
            title
          })
        })
        // 去重
        this.data = _.uniqBy(this.data, 'id')
        this.TableLoading_2 = false
      })
    },
    // 展示添加分类的框框
    showAddDialog() {
      this.addDialogVisible = true

      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 展示分类管理的框框
    showRemoveDialog() {
      this.removeData = []
      this.removeDialogVisible = true
      // 发送请求
      this.getRadioList()
    },
    /* 收音机 点击 保存 */
    saveAddForm() {
      let val = this.addForm.name
      if (!val) {
        if (!this.EditForm.name) return this.$message.info('您输入的内容为空')
      }

      const memberID = this.memberID
      const name = val
      let data = {
        name,
        memberID,
        categoryID: '2',
        id: ''
      }
      if (this.visible == true) {
        data.id = this.EditForm.id
        data.name = this.EditForm.name
      }
      this.loading_1 = true
      this.cancel()
      // 发送请求
      addRepository(data).then(res => {
        if (!res) return
        if (res.code != 0) {
          this.loading_1 = false
          return this.$message.warning('保存失败，可能是 名称重复啦')
        }

        this.$message.success('保存成功')
        if (this.visible == false) {
          this.removeDialogVisible = false
        }
        this.visible = false
        this.loading_1 = false
        this.getRadioList()
        this.addDialogClosed()
      })
    },
    /* 点击按钮 删除知识库 */
    clearRepository() {
      this.loading_2 = true
      setTimeout(() => {
        if (this.selectedRows.length == 0) {
          this.loading_2 = false
          return this.$message.info('请选择您要删除的知识库')
        }

        const arr = []
        this.selectedRows.forEach(item => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id
        }
        console.log(data)
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteRepository(data).then(res => {
          console.log('res: ', res)
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          this.nameArr = []
          this.removeData = []
          this.getRepositorys()
          this.loading_2 = false
          this.removeDialogVisible = false
        })
      }, 1000)
    },
    /* 关闭 对话框事件 */
    addDialogClosed() {
      this.addForm.name = ''
      this.addDialogVisible = false
    },
    removeDialogClosed() {
      this.selectedRowKeys = []
      this.removeDialogVisible = false
    },
    /* 新增问答区域 */
    // #region
    /* 关闭 新增问答的Dialog */
    answerDialogClosed() {
      this.answerForm = {}
      this.answerDialogVisible = false
    },
    /* 保存 新增频道的Dialog */
    saveAnswerForm() {
      const broadcastID = this.answerForm.broadcastID
      const title = this.answerForm.title
      const currentIndex = this.currentIndex
      const id = this.nameArr[currentIndex].id

      if (!broadcastID && this.showDia == false)
        return this.$message.info('请完善表单')
      if (!title && this.showDia == false)
        return this.$message.info('请完善表单')

      // 深拷贝
      const arr = _.cloneDeep(this.data)
      // 有从重复的 过滤到新数组中
      const newArr = arr.filter(item => {
        return item.broadcastID == broadcastID
      })
      // 如果有值 判断
      if (newArr.length != 0) {
        const obj = newArr[0]
        if (obj.broadcastID == broadcastID)
          return this.$message.info('问题重复')
      }

      const memberID = this.memberID
      const Form = _.cloneDeep(this.answerForm)
      Form.memberID = memberID
      Form.repository = this.repository
      Form.broadcastID = broadcastID
      Form.categoryID = id
      this.loading_3 = true
      if (this.showDia == true) {
        Form.broadcastID = this.AmendForm.broadcastID
        Form.title = this.AmendForm.title
        Form.id = this.AmendForm.id
      }
      this.cancel()
      // 发送请求
      addRadio(Form).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('添加失败')
        console.log('res: ', res)

        this.$message.success('添加成功')
        // 获取问答的数据列表
        this.showDia = false
        this.getAnswer()
      })

      setTimeout(() => {
        this.loading_3 = false
        this.answerDialogClosed()
      }, 300)
    },
    /* 点击删除问答 */
    clearAnswer() {
      this.loading_4 = true
      setTimeout(() => {
        if (this.selectedRows_2.length == 0) {
          this.loading_4 = false
          return this.$message.info('请选择您要删除的问答')
        }

        const arr = []
        this.selectedRows_2.forEach(item => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id
        }

        console.log(data)
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteRadio(data).then(res => {
          console.log('res: ', res)
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          // this.selectedRows_2.forEach(item => {
          //   this.data.forEach((ele, index) => {
          //     if (item.id == ele.id) {
          //       this.data.splice(index, 1)
          //     }
          //   })
          // })
          console.log(this.repository)
          this.getAnswer()

          this.loading_4 = false
        })
      }, 500)
    },
    // #endregion
    // 获取时间
    getDate() {
      let date = new Date()
      let year = date.getFullYear()

      let month = date.getMonth() + 1
      month <= 9 ? '0' + month : month

      let dates = date.getDate()
      dates <= 9 ? '0' + dates : dates

      this.date = year + '-' + month + '-' + dates
    },
    // 点击打开 修改客服信息的dialog
    edit(record) {
      // console.log('record: ', record);
      this.EditForm = {
        id: record.id,
        name: record.name
      }
      this.visible = true
    },
    amend(record) {
      console.log('record: ', record)
      this.AmendForm = {
        broadcastID: record.broadcastID,
        id: record.id,
        title: record.title
      }
      this.showDia = true
    }
  }
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
