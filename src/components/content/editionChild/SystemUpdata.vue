<template>
  <div class="container">
    <Card>
      <span slot="leftTitle">语音技能</span>
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

          <el-form-item label="更新日志：" prop="updataLog">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              v-model="updateForm.updataLog"
            ></el-input>
          </el-form-item>

          <el-form-item label="版本文件：">
            <el-upload
              class="upload-demo"
              drag
              :action="action"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
            <el-button type="success">确认推送</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

export default {
  components: {
    Card
  },
  data() {
    return {
      action: '', // 必选参数，上传的地址
      updateForm: {
        number: '', // 编号
        updataLog: '' // 更新日志
      },
      // 表单验证对象
      updateFormRules: {
        number: [
          { required: true, message: '请输入版本编号', trigger: 'blur' }
        ],
        updataLog: [
          { required: true, message: '请输入更新日志', trigger: 'blur' }
        ]
      }
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .el-form {
    padding: 0 403px 30px 100px;

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
}
</style>