/* 设备配置页面 */
<template>
  <div class="container">
    <Card>
      <span slot="leftTitle">设备数据</span>
      <div slot="main">
        <el-form
          label-position="right"
          label-width="80px"
          :model="detailForm"
          :rules="detailFormRules"
        >
          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="detailForm.name"></el-input>
          </el-form-item>

          <el-form-item label="年龄：" prop="age">
            <el-input v-model.trim="detailForm.age"></el-input>
          </el-form-item>

          <el-form-item label="性别：" prop="gender">
            <el-input v-model.trim="detailForm.gender"></el-input>
          </el-form-item>

          <el-form-item label="父母：" prop="parent">
            <el-input v-model.trim="detailForm.parent"></el-input>
          </el-form-item>

          <el-form-item label="住址：" prop="address">
            <el-input v-model.trim="detailForm.address"></el-input>
          </el-form-item>

          <el-form-item label="爱好：" prop="hobby">
            <el-input v-model.trim="detailForm.hobby"></el-input>
          </el-form-item>

          <el-form-item label="介绍：" prop="introduce">
            <el-input
              type="textarea"
              v-model.trim="detailForm.introduce"
            ></el-input>
            <el-button type="primary" disabled>保存</el-button>
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
    Card,
  },
  data() {
    return {
      // 表单数据
      detailForm: {
        name: '',
        age: '',
        gender: '', // 性别
        parent: '',
        address: '', // 住址
        hobby: '', // 爱好
        introduce: '', // 介绍
      },
      // 表单验证规则
      detailFormRules: {
        name: [
          { required: true, message: '姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符之间', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '性别', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符之间', trigger: 'blur' }
        ],
        parent: [
          { required: false, message: '父母', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
        ],
        address: [
          { required: false, message: '住址', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ],
        hobby: [
          { required: false, message: '爱好', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ],
        introduce: [
          { required: false, message: '介绍', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ]
      },
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .el-form {
    padding: 0 450px 30px 100px;

    .el-form-item {
      font-weight: 600;

      ::v-deep .el-input__inner {
        font-weight: 500;
        color: #777;
      }
    }

    ::v-deep .el-textarea__inner {
      font-weight: 500;
      height: 100px;
    }

    .el-button {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>