<template>
  <div class="wrapper tabs_2">
    <!-- 按钮 -->
    <el-row>
      <el-button type="primary" @click="showAddDialog">新增嗅探词</el-button>
      <el-button type="danger" @click="showClearTerms">删除嗅探词</el-button>
    </el-row>
    <!-- Tag标签 -->
    <el-row>
      <el-tag
        v-for="(item, index) in nameArr"
        :key="index"
        type="warning"
        effect="dark"
        @click="toTable(item)"
      >
        {{ item.name }}
      </el-tag>
    </el-row>

    <!-- 卡片区域 -->
    <Card>
      <span slot="leftTitle" v-if="title">问题：{{ title }}</span>
      <span slot="leftTitle" v-else>
        点击上方标签，木有的话，先创建嗅探词；
      </span>
      <div slot="main">
        <a-table
          :loading="TableLoading_1"
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :pagination="false"
        >
          <template slot="set" slot-scope="text, record, index">
            <el-button
              plain
              type="warning"
              size="mini"
              @click="addOldRepository"
              >添加至 已有知识库</el-button
            >
            <el-button
              plain
              type="success"
              size="mini"
              @click="addNewRepository"
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
        :columns="removeColumns"
        :data-source="removeData"
        :pagination="false"
      />
      <el-button type="info" @click="removeDialogClosed">取消</el-button>
      <el-button type="danger" @click="clearRepository">删除</el-button>
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
          <el-select v-model="addForm_1.name" placeholder="请选择">
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
          <el-input disabled v-model.trim="addForm_1.problem"></el-input>
        </el-form-item>

        <el-form-item label="答案：" prop="result">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model.trim="addForm_1.result"
          ></el-input>
        </el-form-item>

        <el-button type="info" @click="addDialogClosed_1">取消</el-button>
        <el-button type="primary" @click="saveAddForm_1">保存</el-button>
      </el-form>
    </el-dialog>

    <!-- 添加至 新的知识库Dialog -->
    <el-dialog
      title="添加至新的有知识库"
      :visible.sync="addDialogVisible_2"
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
          <el-input v-model.trim="addForm_1.name"></el-input>
        </el-form-item>

        <el-form-item label="问题：">
          <el-input disabled v-model.trim="addForm_1.problem"></el-input>
        </el-form-item>

        <el-form-item label="答案：" prop="result">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            v-model.trim="addForm_1.result"
          ></el-input>
        </el-form-item>

        <el-button type="info" @click="addDialogClosed_1">取消</el-button>
        <el-button type="primary" @click="saveAddForm_2">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getSnifferWord, addSnifferWord, deleteSnifferWord } from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
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
        problem: '',
        result: ''
      },
      addForm_1Rules: {
        name: [
          { required: true, message: '知识库', trigger: 'blur' }
        ],
        result: [
          { required: true, message: '请输入答案', trigger: 'blur' }
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
      options: [{ // select 数据
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      removeColumns: [ // 删除对话框 表格title
        {
          title: '知识库',
          dataIndex: 'problem',
          key: 'problem',
        },
      ],
      removeData: [ // 删除对话框的数据
        {
          key: 1,
          problem: 'luck',
        },
      ],
      columns: [ // 对应知识库的表格
        {
          title: '问题',
          dataIndex: 'problem',
          width: '30%',
          key: 'problem',
        },
        {
          title: '时间',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: '操作',
          key: 'set',
          scopedSlots: { customRender: 'set' },
        },
      ],
      data: [ // 对应知识库的数据
        {
          key: 1,
          problem: 'luck',
          date: 32,
          set: '2019-12-08',
        },
        {
          key: 2,
          problem: 'luck',
          date: 32,
          set: '2019-12-08',
        },
        {
          key: 3,
          problem: 'luck',
          date: 32,
          set: '2019-12-08',
        },
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
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        },
      };
    },
  },
  methods: {
    // 点击 tag标签 触发
    toTable(item) {
      this.title = item.name
    },
    // 获取 嗅探词列表
    getSnifferWord() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.TableLoading_1 = true
      // 发送请求
      getSnifferWord(data).then(res => {
        if (!res) return
        if (res.code != 1) return this.$message.error('获取数据失败')
        console.log('res: ', res);
        res.data.forEach((item, index) => {
          let key = index + 1;
          let id = item.id
          let name = item.name;

          // this.removeData.push({
          //   key,
          //   id,
          //   name
          // })
          this.nameArr.push({
            key,
            id,
            name
          })
        });
        this.nameArr = _.uniqBy(this.nameArr, 'id')
        this.removeData = _.uniqBy(this.removeData, 'id')
        this.TableLoading_1 = false
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
      let val = this.addForm.name;
      if (!val) return this.$message.info('您输入的内容为空')

      const memberID = this.memberID
      const name = val;
      const data = {
        name,
        memberID
      }
      this.loading_1 = true
      // 发送请求
      addSnifferWord(data).then(res => {
        if (!res) return
        if (res.code != 1) {
          this.loading_1 = false
          return this.$message.warning('保存失败，可能是 名称重复啦')
        }

        // 成功
        this.$message.success('保存成功')
        this.nameArr.unshift({
          name: val
        })
        this.nameArr = Array.from(new Set(this.nameArr))

        this.loading_1 = false
      })


      this.nameArr = _.

      console.log(this.nameArr);
      this.addDialogClosed()
    },

    // 关闭 添加嗅探词 Dialog
    addDialogClosed() {
      this.addForm.name = ''
      this.addDialogVisible = false
    },
    // 展示 删除嗅探词 Dialog
    showClearTerms() {
      this.removeDialogVisible = true
    },
    // 关闭 删除嗅探词 Dialog
    removeDialogClosed() {
      this.removeDialogVisible = false
    },
    // 点击删除 嗅探词
    clearRepository() { },

    // 展示 添加至已有·知识库 Dialog
    addOldRepository() {
      this.addDialogVisible_1 = true
    },
    // 关闭 添加至已有·知识库 Dialog
    addDialogClosed_1() {
      this.$refs.addForm_1Ref.resetFields()
      this.addDialogVisible_1 = false
      this.addDialogVisible_2 = false
    },
    // 点击保存 添加至已有·知识库 Dialog 
    saveAddForm_1() {
      console.log(22);
    },
    // 展示添加 新的知识库dialog
    addNewRepository() {
      this.addDialogVisible_2 = true;
    },
    // 点击保存 添加至新的·知识库 Dialog 
    saveAddForm_2() {
      console.log(11);
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