<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">版本推送</span>
      <div slot="main">
        <el-form
          :model="updateForm"
          :rules="updateFormRules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="版本编号：" prop="number">
            <el-input v-model="updateForm.number"></el-input>
          </el-form-item>

          <el-form-item label="更新日志：" prop="updateLog">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              v-model="updateForm.updateLog"
            ></el-input>
          </el-form-item>

          <el-form-item label="版本文件：">
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
            <el-button type="success" :loading="loading" @click="editionPush"
              >确认推送</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'


import { editionPush } from '@/network/home'
import { mapState } from 'vuex'

const token = JSON.parse(sessionStorage.getItem('token'));
export default {
  components: {
    Card
  },
  data() {
    return {
      timer: null, // / 用来存放定时器
      loading: false,
      action: '', // 必选参数，上传的地址
      updateForm: {
        memberID: '',
        number: '', // 编号
        updateLog: '', // 更新日志
        attachmentID: '' // 文件id
      },
      uploadUrl: 'http://114.116.253.112:9600/service/attachment/upload',
      headers: {
        token,
      },
      fileList: [],
      // 表单验证对象
      updateFormRules: {
        number: [
          { required: true, message: '请输入版本编号', trigger: 'blur' }
        ],
        updateLog: [
          { required: true, message: '请输入更新日志', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    editionPush() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return
        // 先清除 上一个定时器
        clearTimeout(this.timer)

        const memberID = this.memberID;
        const versionNumber = this.updateForm.number;
        const updateLog = this.updateForm.updateLog
        const attachmentID = this.updateForm.attachmentID
        const data = {
          memberID,
          versionNumber,
          updateLog,
          attachmentID
        }
        if (!attachmentID) {
          return this.$message.warning('请上传版本文件')
        }
        this.$message.info('正在推送...')
        // 防抖
        this.timer = setTimeout(() => {
          this.cancel()
          // 发送请求
          editionPush(data).then(res => {
            console.log('推送res: ', res);
            if (!res) return
            if (res.code != 0) return this.$message.error('推送失败')

            this.$message.success('推送成功')
            let index = 1
            this.$bus.$emit('handle', index)
          })
        }, 800);

      })
    },
    handleChange(info) {
      console.log(info);
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {

        if (file.response) {
          file.url = file.response.url;
          this.updateForm.attachmentID = file.response.data.id
        }
        return file;
      });

      this.fileList = fileList;
    },
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
        this.updateForm.attachmentID = ''
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
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  .el-form {
    padding: 0 0 30px 100px;
    ::v-deep .el-input__inner,
    ::v-deep .el-textarea__inner {
      width: 41% !important;
    }
    .el-form-item {
      font-weight: 600;

      ::v-deep .el-input__inner {
        font-weight: 500;
        color: #777;
      }
    }

    .el-button {
      float: left;
      margin-top: 10px;
    }
  }

  ::v-deep .ant-upload-list-item {
    width: 41%;
  }
}
</style>