/* 养生知识 */
<template>
  <div class="wrapper">
    <!-- 按钮 -->
    <div>
      <el-row>
        <span class="category">电台分类</span>
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
          @click="toTable(item)"
        >
          {{ item.name }}
        </el-tag>
      </el-row>
    </div>
    <!-- 卡片 -->
    <Card>
      <span slot="leftTitle" v-if="title">分类：{{ title }}</span>
      <span slot="leftTitle" v-else> 点击上方标签 </span>

      <div slot="main">
        <a-table
          style="margin-top: 10px"
          :columns="columns"
          :data-source="data"
          :pagination="true"
          :loading="TableLoading"
        >
          <template slot="switch" slot-scope="text, record, index">
            <a-switch
              :loading="switchLoading"
              :checked="text.checked"
              @change="(checked) => onChange(checked, text, index)"
            />
          </template>
        </a-table>
      </div>
    </Card>
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
      switchLoading: false,
      fileList: [],
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      title: '',
      TableLoading: false,
      repository: '',
      nameArr: [], // 分类名称 数组
      columns: [ // 对应分类的表格
        {
          title: '电台',
          dataIndex: 'questions',
          key: 'questions',
          width: '20%'
        },
        {
          title: '频段',
          dataIndex: 'answers',
          key: 'audio',
          width: '60%',
        },
        {
          title: '开关',
          key: 'switch',
          scopedSlots: { customRender: 'switch' },
        },
      ],
      data: [],
    }
  },
  created() {
    this.getRepositorys()
  },
  mounted() {

  },
  computed: {
    ...mapState('user', ['memberID']),
  },
  methods: {
    onChange(checked, text, index) {
      const memberID = this.memberID;
      let id = text.id
      let enable = checked ? '1' : '0';
      console.log('enable: ', enable);
      const data = {
        id,
        memberID,
        enable
      }

      this.switchLoading = true
      this.cancel()
      return
      // 发送请求
      changeSwitch(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('关闭失败')

        this.$message.success({
          message: res.message,
          offset: 46
        })
        this.switchLoading = false

        this.data.forEach((item, indey) => {
          if (index == indey) {
            item.checked = !item.checked
          }
        });
      })
    },
    /* 点击tag标签 跳转 */
    toTable(item) {
      this.data = []
      this.title = item.name
      this.repository = item.id
      this.getAnswer()
    },
    // 获取 知识库的数据 列表
    getRepositorys() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.TableLoading = true
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
          this.nameArr.push({
            key,
            id,
            name
          })
        });
        this.nameArr = _.uniqBy(this.nameArr, 'id')
        this.TableLoading = false
      })
    },
    // 获取问答的数据列表
    getAnswer() {
      this.data = []
      const memberID = this.memberID
      const repository = this.repository
      const data = {
        memberID,
        repository
      }
      this.TableLoading_2 = true
      this.cancel()
      // 发送请求
      getAnswer(data).then(res => {
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
}
</style>