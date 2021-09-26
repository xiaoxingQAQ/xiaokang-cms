<template>
  <div class="container tabs_1">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增知识库</el-button>
      <el-button type="danger" @click="showRemoveDialog">删除知识库</el-button>
    </el-row>
    <el-row>
      <el-tag
        v-for="(item, index) in nameArr"
        :key="index"
        type="warning"
        effect="dark"
        @click="toTable(item)"
      >
        {{ item }}
      </el-tag>
    </el-row>
    <!-- 卡片 -->
    <Card>
      <span slot="leftTitle">知识库：{{ title }}</span>

      <div slot="rightTitle">
        <el-button type="primary" @click="answerDialogVisible = true"
          >新增问答</el-button
        >
        <el-button type="danger" @click="clearAnswer">删除问答</el-button>
      </div>
      
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :pagination="false"
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

        <el-button type="primary" :loading="loading" @click="saveAddForm"
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
        :columns="removeColumns"
        :data-source="removeData"
        :row-selection="removeRowSelection"
        :pagination="false"
      />
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" @click="clearRepository">删除</el-button>
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
            v-model.trim="answerForm.problem"
          ></el-input>
        </el-form-item>
        <el-form-item label="答案：">
          <el-input
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入答案"
            v-model.trim="answerForm.result"
          ></el-input>
        </el-form-item>
        <el-button type="info" @click="answerDialogClosed">取消</el-button>
        <el-button type="primary" :loading="loading" @click="saveAnswerForm"
          >保存</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

export default {
  components: {
    Card,
  },
  data() {
    return {
      /* 问答管理的数据 */
      selectedRowKeys: '', //选中的 问题名称
      title: '',
      answerForm: {
        problem: '',
        result: ''
      },
      answerDialogVisible: false,
      loading: false, // 新增知识库的 按钮loading
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      expandedRowKeys: [], // 多选框 选中的val值集合
      nameArr: [], // 知识库名称 数组
      addForm: { // 添加表单对象
        name: '',
      },
      columns: [ // 对应知识库的表格
        {
          title: '问题',
          dataIndex: 'problem',
          key: 'problem',
        },
        {
          title: '答案',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: '导入时间',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      data: [ // 对应知识库的数据
        {
          key: 1,
          problem: 'luck',
          result: 32,
          date: '2019-12-08',
        },
        {
          key: 2,
          problem: 'luck',
          result: 32,
          date: '2019-12-08',
        },
        {
          key: 3,
          problem: 'luck',
          result: 32,
          date: '2019-12-08',
        },
      ],
      removeColumns: [ // 删除 知识库 对话框 表格title
        {
          title: '知识库',
          dataIndex: 'problem',
          key: 'problem',
        },
      ],
      removeData: [ // 删除 知识库 table 的数据
        {
          key: 1,
          problem: 'luck',
        },
      ],
    }
  },
  computed: {
    // 删除知识库的table
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        },
      };
    },
    // 删除问答 table
    removeRowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        },
      };
    },
  },
  methods: {
    /* 点击tag标签 跳转 */
    toTable(item) {
      this.title = item
    },
    /* 展示添加知识库的dialog */
    showAddDialog() {
      this.addDialogVisible = true
      this.$nextTick(() => {
        this.$refs.addFormRef.resetFields()
      })

      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    /* 展示删除知识库的dialog  */
    showRemoveDialog() {
      this.removeDialogVisible = true
    },
    /* 关闭 对话框事件 */
    addDialogClosed() {
      this.addForm.name = ''
      this.addDialogVisible = false
    },
    removeDialogClosed() {
      this.removeDialogVisible = false
    },
    /* 知识库 点击 保存 */
    saveAddForm() {
      let val = this.addForm.name;
      if (!val) return this.$message.info('您输入的内容为空')

      this.nameArr.unshift(val)
      this.nameArr = Array.from(new Set(this.nameArr))

      console.log(this.nameArr);
      this.addDialogClosed()
    },
    /* 删除知识库 */
    clearRepository() { },
    /* 新增问答区域 */
    // #region
    /* 关闭 新增问答的Dialog */
    answerDialogClosed() {
      this.answerForm = {}
      this.answerDialogVisible = false
    },
    /* 保存新增问答的Dialog */
    saveAnswerForm() {
      if (this.answerForm.problem == '') return this.$message.info('请完善表单')
      if (this.answerForm.result == '') return this.$message.info('请完善表单')
      // 发送请求

      this.answerDialogClosed()
    },
    /* 点击删除问答 */
    clearAnswer() {
      // if (this.selectedRowKeys)
    }
    // #endregion
  },
}
</script>

<style lang="less" scoped>
.container {
  .tabs_1 {
    .el-row {
      margin-bottom: 10px;
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
}
</style>