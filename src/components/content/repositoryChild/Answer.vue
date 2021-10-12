<template>
  <div class="wrapper tabs_1">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增知识库</el-button>
      <el-button type="danger" @click="showRemoveDialog">删除知识库</el-button>
    </el-row>

    <el-row class="loading" v-if="nameArr.length == 0">
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
        @click="toTable(item)"
      >
        {{ item.name }}
      </el-tag>
    </el-row>
    <!-- 卡片 -->
    <Card>
      <span slot="leftTitle" v-if="title">知识库：{{ title }}</span>
      <span slot="leftTitle" v-else>
        点击上方标签，木有的话，先创建知识库；
      </span>

      <div slot="rightTitle">
        <el-button
          type="primary"
          :disabled="disabled"
          @click="answerDialogVisible = true"
          >新增问答</el-button
        >
        <el-button
          type="danger"
          :loading="loading_4"
          :disabled="disabled"
          @click="clearAnswer"
          >删除问答</el-button
        >
      </div>

      <div slot="main">
        <a-table
          :rowKey="(record) => record.id"
          style="margin-top: 10px"
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :pagination="true"
          :loading="TableLoading_2"
        />
      </div>
    </Card>
    <!-- 新增知识库的 Dialog对话框 -->
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
        <el-form-item label="名称：">
          <el-input
            ref="input"
            placeholder="请输入知识库名称"
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

    <!-- 新增问答的Dialog -->
    <el-dialog
      title="新增问答"
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
        <el-form-item label="问题：">
          <el-input
            placeholder="请输入问题"
            v-model.trim="answerForm.questions"
          ></el-input>
        </el-form-item>
        <el-form-item label="回答：">
          <el-input
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入回答"
            v-model.trim="answerForm.answers"
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
      selectedRowKeys: [], //选中的 问题名称
      selectedRows: [], // /选中的 问题数据
      selectedRowKeys_2: [],
      selectedRows_2: [],
      title: '',
      answerForm: {
        repository: '',
        questions: '',
        answers: ''
      },
      answerDialogVisible: false,
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      nameArr: [], // 知识库名称 数组
      addForm: { // 添加表单对象
        name: '',
      },
      columns: [ // 对应知识库的表格
        {
          title: '问题',
          dataIndex: 'questions',
          key: 'questions',
        },
        {
          title: '回答',
          dataIndex: 'answers',
          key: 'answers',
          width: '60%',
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
    this.getDate()
  },
  mounted() {

  },
  computed: {
    ...mapState('user', ['memberID']),
    // 删除知识库的table
    rowSelection() {
      const { selectedRowKeys_2 } = this;
      return {
        selectedRowKeys: selectedRowKeys_2,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectedRowKeys_2 = selectedRowKeys
          this.selectedRows_2 = selectedRows
        },
      };
    },
    // 删除问答 table
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
    /* 点击tag标签 跳转 */
    toTable(item) {
      console.log(item);
      this.selectedRowKeys_2 = []
      this.title = item.name
      this.disabled = false
      this.answerForm.repository = item.id
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
      this.data = []
      const memberID = this.memberID
      const repository = this.answerForm.repository
      const data = {
        memberID,
        repository
      }
      console.log(data);
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getAnswer(data).then(res => {
        console.log(res);
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach((item, index) => {
          let key = index;
          let id = item.id
          let questions = item.questions;
          let answers = item.answers
          this.data.unshift({
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
      let val = this.addForm.name;
      if (!val) return this.$message.info('您输入的内容为空')

      const memberID = this.memberID
      const name = val;
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
    /* 新增问答区域 */
    // #region
    /* 关闭 新增问答的Dialog */
    answerDialogClosed() {
      this.answerForm = {}
      this.answerDialogVisible = false
    },
    /* 保存 新增问答的Dialog */
    saveAnswerForm() {
      const questions = this.answerForm.questions;
      const answers = this.answerForm.answers;

      if (!questions) return this.$message.info('请完善表单')
      if (!answers) return this.$message.info('请完善表单')

      // 深拷贝
      const arr = _.cloneDeep(this.data)
      // 有从重复的 过滤到新数组中
      const newArr = arr.filter(item => {
        return item.questions == questions
      })
      // 如果有值 判断
      if (newArr.length != 0) {
        const obj = newArr[0]
        if (obj.questions == questions) return this.$message.info('问题重复')
      }


      const memberID = this.memberID
      const Form = _.cloneDeep(this.answerForm)
      Form.memberID = memberID
      console.log(Form);

      this.loading_3 = true;
      this.cancel()
      // 发送请求
      addAnswer(Form).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('添加失败')
        console.log('res: ', res);

        this.$message.success('添加成功')
        // 获取问答的数据列表
        this.getAnswer()
      })

      setTimeout(() => {
        this.data = _.uniqBy(this.data, 'questions')
      }, 500);

      setTimeout(() => {
        this.loading_3 = false;
        this.answerDialogClosed()
      }, 600);
    },
    /* 点击删除问答 */
    clearAnswer() {
      this.loading_4 = true
      setTimeout(() => {
        if (this.selectedRows_2.length == 0) {
          this.loading_4 = false
          return this.$message.info('请选择您要删除的知识库')
        }

        const arr = [];
        this.selectedRows_2.forEach(item => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id
        }
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteAnswer(data).then(res => {
          console.log('res: ', res);
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
          this.getAnswer()

          this.loading_4 = false
        })
      }, 500);
    },
    // #endregion
    // 获取时间
    getDate() {
      let date = new Date()
      let year = date.getFullYear();

      let month = date.getMonth() + 1;
      month <= 9 ? "0" + month : month;

      let dates = date.getDate();
      dates <= 9 ? "0" + dates : dates;

      this.date = year + "-" + month + "-" + dates;
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .tabs_1 {
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
}
</style>