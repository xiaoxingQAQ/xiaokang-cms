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
      <el-button type="danger" @click="showRemoveDialog">删除分类</el-button>
    </el-row>
    <!-- loading -->
    <el-row class="loading" v-if="nameArr.length == 0">
      <a-spin tip="Loading...">
        <div class="spin-content"></div>
      </a-spin>
    </el-row>
    <!-- tag标签 -->
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
          <template slot="audio" slot-scope="text, record, index">
            <audio
              class="tsp-audio"
              @play="play"
              @pause="pause"
              :class="{ playing: status == 1 }"
              src="http://m7.music.126.net/20211013155308/e48c716ecc2cde686f703346cfa85ad6/ymusic/045b/005e/0e58/31d39e070a74ea214ab292a3963073c9.mp3"
              controls
              loop
            ></audio>
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
      />
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
const token = JSON.parse(sessionStorage.getItem('token'));
export default {
  components: {
    Card,
  },
  data() {
    return {
      currentIndex: null,
      status: 0, // 0 pause, 1 play
      fileList: [],
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
      selectedRowKeys: [], //选中的 名称
      selectedRows: [], // /选中的 养生数据
      selectedRowKeys_2: [],
      selectedRows_2: [],
      title: '',
      name: '', // 养生知识的名称
      attachmentID: '', // 上传文件的id
      repository: '',
      answerDialogVisible: false,
      addDialogVisible: false, // 对话框 显示 / 隐藏
      removeDialogVisible: false,
      nameArr: [], // 分类名称 数组
      addForm: { // 添加表单对象
        name: '',
      },
      columns: [ // 对应分类的表格
        {
          title: '名称',
          dataIndex: 'questions',
          key: 'questions',
        },
        {
          title: '音频',
          scopedSlots: { customRender: 'audio' },
          key: 'audio',
          width: '60%',
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
          dataIndex: 'name',
          key: 'name',
          width: '70%',
        },
      ],
      removeData: [],
    }
  },
  created() {
    this.getRepositorys()
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
    play() {
      this.status = 1
    },
    pause() {
      this.status = 0
    },
    /* 点击tag标签 跳转 */
    toTable(item, indey) {
      this.currentIndex = indey
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
      console.log(data);
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
    /* 点击按钮 删除分类 */
    clearRepository() {
      this.loading_2 = true
      setTimeout(() => {
        if (this.selectedRows.length == 0) {
          this.loading_2 = false
          return this.$message.info('请选择您要删除的分类')
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
      const memberID = this.memberID;
      const attachmentID = this.attachmentID;
      const name = this.name
      if (!name) return this.$message.warning('请输入名称')
      if (!attachmentID) {
        return this.$message.warning('请上传音频')
      }
      // 深拷贝
      const arr = _.cloneDeep(this.data)
      // 有从重复的 过滤到新数组中
      const newArr = arr.filter(item => {
        return item.questions == questions
      })
      // 如果有值 判断
      if (newArr.length != 0) {
        const obj = newArr[0]
        if (obj.questions == questions) return this.$message.info('名称重复')
      }
      const data = {
        memberID,
        name,
        attachmentID,
      }
      this.loading_3 = true;
      this.cancel()
      // 发送请求
      addAnswer(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('添加失败')
        console.log('res: ', res);

        this.$message.success('添加成功')
        // 获取问答的数据列表
        this.getAnswer()
      })

      setTimeout(() => {
        this.loading_3 = false;
        this.answerDialogClosed()
      }, 300);
    },
    /* 点击删除养生知识 */
    clearAnswer() {
      this.loading_4 = true
      setTimeout(() => {
        if (this.selectedRows_2.length == 0) {
          this.loading_4 = false
          return this.$message.info('请选择您要删除的养生知识')
        }

        const arr = [];
        this.selectedRows_2.forEach(item => {
          arr.push(item.id)
        })
        const id = arr.join(',')
        const data = {
          id
        }

        console.log(data);
        this.cancel()
        // 发送请求 删除对应的 知识库
        deleteAnswer(data).then(res => {
          console.log('res: ', res);
          if (!res) return
          if (res.code != 0) return this.$message.error('删除失败')


          // 提示
          this.$message.success('删除成功')
          console.log(this.repository);
          this.getAnswer()

          this.loading_4 = false
        })
      }, 500);
    },
    // 处理上传文件状态改变
    handleChange(info) {
      console.log(info);
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {

        if (file.response) {
          file.url = file.response.url;
          this.attachmentID = file.response.data.id
        }
        return file;
      });

      this.fileList = fileList;
    },
    // 处理删除文件
    onRemove() {
      let flag = false;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fileList = [];
        this.attachmentID = ''
        flag = true
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
        flag = false
      });
      return flag
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
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