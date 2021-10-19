<template>
  <div class="wrapper tabs_2">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增嗅探词</el-button>
      <el-button type="danger" @click="showClearTerms">删除嗅探词</el-button>
    </el-row>
    <!-- Tag标签 -->
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

    <!-- 卡片区域 -->
    <Card>
      <span slot="leftTitle" v-if="title">嗅探词：{{ title }}</span>
      <span slot="leftTitle" v-else>
        点击上方标签，木有的话，先创建嗅探词；
      </span>
      <div slot="main">
        <a-table
          :loading="TableLoading_2"
          :columns="columns"
          :data-source="data"
          :pagination="true"
        >
          <template slot="set" slot-scope="text, record, index">
            <el-button
              class="btn_5"
              plain
              type="warning"
              size="mini"
              @click="addOldRepository(record)"
              :loading="loading_5"
              >添加至 已有知识库</el-button
            >
            <el-button
              class="btn_6"
              plain
              type="success"
              size="mini"
              @click="addNewRepository(record)"
              :loading="loading_6"
              >添加至 新知识库</el-button
            >
          </template>
        </a-table>
      </div>
    </Card>

    <!-- 新增嗅探词的Dialog -->
    <el-dialog
      title="新增嗅探词"
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
        <el-form-item label="嗅探词：">
          <el-input
            ref="input"
            placeholder="请输入嗅探词"
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
      title="删除嗅探词"
      :visible.sync="removeDialogVisible"
      width="50%"
      center
      @close="removeDialogClosed"
      class="removeDialog"
    >
      <a-table
        :rowKey="(record) => record.id"
        :row-selection="rowSelection"
        :columns="removeColumns"
        :data-source="removeData"
        :pagination="true"
        :loading="TableLoading_1"
      />
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" :loading="loading_2" @click="clearRepository"
        >删除</el-button
      >
    </el-dialog>

    <!-- 添加至 已有·知识库Dialog -->
    <el-dialog
      title="添加至已有知识库"
      :visible.sync="addDialogVisible_1"
      width="50%"
      center
      @close="addDialogClosed_1"
      class="addDialog"
    >
      <!-- 表单区域 -->
      <el-form
        label-position="right"
        label-width="80px"
        ref="addForm_1Ref"
        :model="addForm_1"
        :rules="addForm_1Rules"
      >
        <el-form-item label="知识库：" prop="name">
          <el-select
            @change="onChange"
            v-model="addForm_1.name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="问题：">
          <el-input disabled v-model.trim="addForm_1.questions"></el-input>
        </el-form-item>

        <el-form-item label="答案：" prop="answers">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model.trim="addForm_1.answers"
          ></el-input>
        </el-form-item>

        <el-button type="info" @click="addDialogClosed_1">取消</el-button>
        <el-button type="primary" :loading="loading_3" @click="saveAddForm_1"
          >保存</el-button
        >
      </el-form>
    </el-dialog>

    <!-- 添加至 新的知识库Dialog -->
    <el-dialog
      title="添加至新的有知识库"
      :visible.sync="addDialogVisible_2"
      width="50%"
      center
      @close="addDialogClosed_2"
      class="addDialog"
    >
      <!-- 表单区域 -->
      <el-form
        label-position="right"
        label-width="80px"
        ref="addForm_2Ref"
        :model="addForm_1"
        :rules="addForm_1Rules"
      >
        <el-form-item label="知识库：" prop="name">
          <el-input v-model.trim="addForm_1.name"></el-input>
        </el-form-item>

        <el-form-item label="问题：">
          <el-input disabled v-model.trim="addForm_1.questions"></el-input>
        </el-form-item>

        <el-form-item label="答案：" prop="answers">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model.trim="addForm_1.answers"
          ></el-input>
        </el-form-item>

        <el-button type="info" @click="addDialogClosed_2">取消</el-button>
        <el-button type="primary" @click="saveAddForm_2">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import {
  getSnifferWord,
  addSnifferWord,
  deleteSnifferWord,
  getKnowledge,
  getRepository,
  addAnswer,
  addRepository,
} from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
      currentIndex: null,
      repositoryArr: [],
      selectedRowKeys: [],
      selectedRows: [],
      loading_6: false,
      loading_5: false,
      loading_4: false,
      loading_3: false,
      loading_2: false,
      loading_1: false,
      TableLoading_2: false,
      TableLoading_1: false,
      addDialogVisible_2: false,
      addDialogVisible_1: false,
      addForm_1: {
        name: '',
        questions: '',
        answers: ''
      },
      addForm_1Rules: {
        name: [
          { required: true, message: '知识库', trigger: 'blur' }
        ],
        answers: [
          { required: true, message: '请输入答案', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      value: '', // select 绑定的·value
      removeDialogVisible: false,
      title: '',
      addForm: {
        name: '',
      },
      loading: false, // 按钮
      addDialogVisible: false, // 展示隐藏
      nameArr: [], // 嗅探词 数组
      options: [],
      removeColumns: [ // 删除对话框 表格title
        {
          title: '序号',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '嗅探词',
          dataIndex: 'name',
          key: 'name',
          width: '70%',
        },
      ],
      removeData: [ // 删除对话框的数据
      ],
      columns: [ // 对应知识库的表格
        {
          title: '问题',
          dataIndex: 'questions',
          key: 'questions',
          width: '26%',
        },
        {
          title: '回答',
          dataIndex: 'answers',
          key: 'answers',
          width: '38%',
        },
        {
          title: '操作',
          key: 'set',
          scopedSlots: { customRender: 'set' },
          width: '28%',
        },
      ],
      data: [ // 对应知识库的数据
      ],
    }
  },
  created() {
    this.getSnifferWord()
  },
  computed: {
    ...mapState('user', ['memberID']),
    // 删除 嗅探词的table
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
    // 点击 tag标签 触发
    toTable(item, index) {
      this.currentIndex = index;
      this.title = item.name
      this.getProblem(item)
    },
    // 获取 嗅探词列表
    getSnifferWord() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.TableLoading_2 = true
      this.TableLoading_1 = true
      this.cancel()
      // 发送请求
      getSnifferWord(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        console.log('res: ', res);
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
    // 点击 获取 问题数据列表
    getProblem(item) {
      this.data = []
      const memberID = this.memberID;
      const snifferName = item.name;
      const data = {
        memberID,
        snifferName,
        pageIndex: 1,
        pageSize: 10,
      }
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getKnowledge(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) {
          this.TableLoading_2 = false
          return this.$message.warning(res.message)
        }

        console.log(res);
        res.data.forEach((item, index) => {
          let key = index
          let questions = item.inword
          let answers = item.outword
          this.data.push({
            key,
            questions,
            answers,
          })
        })
        this.TableLoading_2 = false
      })
    },
    onChange() {
      console.log(this.addForm_1.name);
    },
    // 获取 知识库的数据
    getRepositorys() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.TableLoading_1 = true
      this.cancel()
      // 发送请求
      getRepository(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')
        console.log(res);
        res.data.forEach((item, index) => {
          let key = index;
          let value = item.id;
          let label = item.name
          let id = item.id
          this.options.push({
            key,
            id,
            value,
            label,
          })
          this.options = _.uniqBy(this.options, 'label')
          this.loading_5 = false
          this.loading_6 = false
        })


      })
    },
    // 展示 添加嗅探词的Dialog
    showAddDialog() {
      this.addDialogVisible = true
      // 直接获取焦点
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 点击保存 嗅探词
    saveAddForm() {
      const val = this.addForm.name;
      if (!val) return this.$message.info('您输入的内容为空')
      const arr = _.cloneDeep(this.nameArr)
      const newArr = arr.filter(item => {
        return item.name == val
      })
      if (newArr.length != 0) {
        const obj = newArr[0]
        if (obj.name == val) return this.$message.info('嗅探词重复')
      }

      const memberID = this.memberID
      const name = val;
      const data = {
        name,
        memberID
      }
      this.loading_1 = true
      this.cancel()
      // 发送请求
      addSnifferWord(data).then(res => {
        if (!res) return
        if (res.code != 0) {
          this.loading_1 = false
          return this.$message.warning('保存失败，可能是 名称重复啦')
        }
        console.log(res);
        // 成功
        this.$message.success('保存成功')
        this.loading_1 = false
        this.nameArr = _.uniqBy(this.nameArr, 'name')
        this.addDialogClosed()
        this.getSnifferWord()
        this.data = []
      })

    },

    // 关闭 添加嗅探词 Dialog
    addDialogClosed() {
      this.addForm.name = ''
      this.addDialogVisible = false
    },
    // 展示 删除嗅探词 Dialog
    showClearTerms() {
      this.removeData = []
      this.removeDialogVisible = true
      // 发送请求
      this.getSnifferWord()
    },
    // 关闭 删除嗅探词 Dialog
    removeDialogClosed() {
      this.removeDialogVisible = false
      this.selectedRowKeys = []
    },
    // 点击删除 嗅探词
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
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteSnifferWord(data).then(res => {
          if (!res) return
          if (res.code != 0) {
            this.loading_2 = false
            return this.$message.error('删除失败')
          }
          // 提示
          this.$message.success('删除成功')
          this.nameArr = []
          this.removeData = []
          // 重新获取 嗅探词列表
          this.getSnifferWord()
          this.loading_2 = false
        })

      }, 1000);
    },

    // 展示 添加至已有·知识库 Dialog
    addOldRepository(record) {
      this.loading_5 = true
      this.getRepositorys()
      this.addDialogVisible_1 = true
      this.addForm_1.questions = record.questions
      this.addForm_1.answers = record.answers
    },
    // 关闭 添加至已有·知识库 Dialog
    addDialogClosed_1() {
      this.$refs.addForm_1Ref.resetFields()
      this.addDialogVisible_1 = false
    },
    // 点击保存 添加至已有·知识库 Dialog 
    saveAddForm_1() {
      this.$refs.addForm_1Ref.validate(valid => {
        if (!valid) return
        this.loading_3 = true
        const memberID = this.memberID
        let repository = this.addForm_1.name
        let questions = this.addForm_1.questions
        let answers = this.addForm_1.answers
        const data = {
          memberID,
          repository,
          questions,
          answers
        }
        console.log(data);
        this.cancel()
        // 发送请求
        addAnswer(data).then(res => {
          if (!res) return
          if (res.code != 0) return this.$message.error('添加失败')
          console.log('res: ', res);

          this.$message.success('添加成功')
          this.loading_3 = false
          this.addDialogVisible_1 = false
        })

      })
    },
    // 展示添加 新的知识库dialog
    addNewRepository(record) {
      this.loading_6 = true
      this.getRepositorys()
      this.addDialogVisible_2 = true
      this.addForm_1.questions = record.questions
      this.addForm_1.answers = record.answers
    },
    // 点击保存 添加至新的·知识库 Dialog 
    saveAddForm_2() {
      this.$refs.addForm_2Ref.validate(valid => {
        if (!valid) return
        this.loading_3 = true

        const memberID = this.memberID
        const name = this.addForm_1.name;
        const data_1 = {
          name,
          memberID
        }
        this.cancel()
        // 发送请求 添加知识库
        addRepository(data_1).then(res => {
          console.log('res: ', res);
          if (!res) return
          if (res.code != 0) {
            this.loading_4 = false
            return this.$message.warning(res.message)
          }
          // 发送请求 获取知识库列表
          getRepository({ memberID }).then(({ data, code }) => {
            data = data.filter(item => {
              return item.name == name
            })
            let repository = data[0].id
            let questions = this.addForm_1.questions
            let answers = this.addForm_1.answers
            const data_2 = {
              memberID,
              repository,
              questions,
              answers
            }
            this.cancel()
            // 发送请求 添加问答
            addAnswer(data_2).then(res => {
              if (!res) return
              if (res.code != 0) return this.$message.error('添加失败')

              this.$message.success('添加成功')
              this.loading_4 = false
              this.addDialogVisible_2 = false
            })
          })
        })
      })
    },
    // 点击取消关闭 添加至新的·知识库 Dialog 
    addDialogClosed_2() {
      this.$refs.addForm_2Ref.resetFields()
      this.addDialogVisible_2 = false
    }

  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .tabs_2 {
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

  .btn_5,
  .btn_6 {
    box-sizing: border-box;
    padding: 10px;
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

  .active {
    background-color: #f56c6c;
    border: 1px solid transparent;
    box-shadow: -2px -0px 10px #f56c6c !important;
  }
  
}
</style>