<template>
  <div class="wrapper">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增健康顾问</el-button>
      <el-button type="danger" @click="showRemoveDialog"
        >删除健康顾问</el-button
      >
    </el-row>

    <el-row class="loading" v-if="nameArr.length == 0">
      <a-spin tip="Loading...">
        <div class="spin-content"></div>
      </a-spin>
    </el-row>

    <el-row v-else>
      <el-tag
        v-for="(item, index) in nameArr"
        :key="index"
        type="warning"
        effect="dark"
        :class="{ active: currentIndex == index }"
        @click="toTable(item, index)"
      >
        {{ item.name }}
      </el-tag>
    </el-row>
    <!-- 卡片 -->
    <Card v-for="(item, index) in nameArr" :key="index">
      <span slot="leftTitle">健康顾问：{{ item.name }}</span>
      <!-- <span slot="leftTitle" > 点击上方标签，木有的话，先创建； </span> -->

      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          style="margin-top: 10px"
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :loading="TableLoading_2"
        >
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
      title="新增知识库"
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
        <el-form-item label="姓名：">
          <el-input
            ref="input"
            placeholder="请输入顾问姓名"
            v-model.trim="addForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="简介：">
          <el-input
            ref="input"
            placeholder="请输入个人简介"
            v-model.trim="addForm.referral"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="addDialogClosed">取消</el-button>

        <el-button type="primary" :loading="loading_1" @click="saveAddForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 删除的Dialog对话框 -->
    <el-dialog
      title="删除知识库"
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
    <!-- 编辑健康顾问各人信息 -->
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
        <a-form-model-item ref="name" label="顾问姓名" prop="serviceNumber">
          <a-input v-model="EditForm.name" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="个人简介" prop="serviceName">
          <a-input v-model="EditForm.serviceName" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import {
  addRepository,
  getRepository,
  deleteRepository,
  getAnswer,
  addAnswer,
  deleteAnswer
} from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
      wrapperCol: { span: 14 },
      labelCol: { span: 4 },
      visible: false, // 显示与隐藏
      confirmLoading: false, // 点击确定按钮的回调
      EditForm: {},
      EditFormRules: {
        serviceNumber: [
          { required: true, message: '请输入顾问姓名', trigger: 'blur' },
        ],
        serviceName: [
          { required: true, message: '请输入个人简介', trigger: 'blur' },
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
      date: '',
      /* 问答管理的数据 */
      selectedRowKeys: [],
      selectedRows: [],
      title: '',
      answerForm: {
        questions: '',
        answers: ''
      },
      repository: '',
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      nameArr: [], // 知识库名称 数组
      addForm: { // 添加表单对象
        name: '',
        referral: ''
      },
      columns: [ // 对应知识库的表格
        {
          title: '姓名',
          dataIndex: 'questions',
          key: 'questions',
        },
        {
          title: '个人简介',
          dataIndex: 'answers',
          key: 'answers',
          width: '60%',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      data: [ // 对应知识库的数据

      ],
      removeColumns: [ // 删除 知识库 对话框 表格title
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '知识库名称',
          dataIndex: 'name',
          key: 'name',
          width: '70%',
        },
      ],
      removeData: [ // 删除 知识库 table 的数据
      ],
    }
  },
  created() {
    this.getRepositorys()
  },
  mounted() {

  },
  computed: {
    ...mapState('user', ['memberID']),
    removeRowSelection() {
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
    // 点击打开 修改客服信息的dialog
    edit(record) {
      console.log(this.tabData);
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
    /* 点击tag标签 跳转 */
    toTable(item, index) {
      this.currentIndex = index
      this.data = []
      this.selectedRowKeys_2 = []
      this.title = item.name
      this.disabled = false
      this.repository = item.id
      this.getAnswer()
    },
    // 获取 知识库的数据 列表
    getRepositorys() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.TableLoading_1 = true
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getRepository(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        res.data.forEach((item, index) => {
          let key = index + 1;
          let id = item.id
          let name = item.name;
          this.removeData.push({
            key,
            id,
            name
          })
          this.nameArr.push({
            key,
            id,
            name
          })
        });
        this.nameArr = _.uniqBy(this.nameArr, 'id')
        this.removeData = _.uniqBy(this.removeData, 'id')
        this.TableLoading_1 = false
        this.TableLoading_2 = false
      })
    },
    // 获取问答的数据列表
    getAnswer() {
      this.selectedRowKeys_2 = []
      this.data = []
      const memberID = this.memberID
      const repository = this.repository
      const data = {
        memberID,
        repository
      }
      console.log('dai', data);
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getAnswer(data).then(res => {
        console.log('问答', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach((item, index) => {
          let key = index;
          let id = item.id
          let questions = item.questions;
          let answers = item.answers
          this.data.push({
            key,
            id,
            questions,
            answers,
          })
        });
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
      this.getRepositorys()
    },
    /* 知识库 点击 保存 */
    saveAddForm() {
      let nameVal = this.addForm.name;
      let referralVal = this.addForm.referral;
      if (!nameVal) return this.$message.info('请完善表单')
      if (!referralVal) return this.$message.info('请完善表单')

      const memberID = this.memberID
      const name = nameVal;
      const data = {
        name,
        memberID
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

        this.loading_1 = false
        this.addDialogClosed()
        this.getRepositorys()
        this.getAnswer()
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

        const arr = [];
        this.selectedRows.forEach(item => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id
        }
        console.log(data);
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteRepository(data).then(res => {
          console.log('res: ', res);
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')

          // 提示
          this.$message.success('删除成功')
          this.nameArr = []
          this.removeData = []
          this.getRepositorys()
          this.loading_2 = false
        })

      }, 1000);

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