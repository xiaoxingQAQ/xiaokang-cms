/* 设备配置页面 */
<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">设备数据</span>
      <div slot="main" v-if="detailForm.name == ''">
        <el-row class="loading">
          <a-spin size="large" tip="Loading...">
            <div class="spin-content"></div>
          </a-spin>
        </el-row>
      </div>
      <div v-else slot="main">
        <el-form
          ref="detailFormRef"
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

          <el-form-item label="性别：" prop="sex">
            <el-input v-model.trim="detailForm.sex"></el-input>
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
          </el-form-item>
          <el-button type="primary" :loading="loading" @click="submit"
            >保存</el-button
          >
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getCharacter, submitCharacter } from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
      loading: false,
      // 表单数据
      detailForm: {
        memberID: '',
        name: '',
        age: '',
        sex: '', // 性别
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
        sex: [
          { required: true, message: '性别', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符之间', trigger: 'blur' }
        ],
        parent: [
          { required: true, message: '父母', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '住址', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ],
        hobby: [
          { required: true, message: '爱好', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '介绍', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符之间', trigger: 'blur' }
        ]
      },
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    // 获取数据
    getData() {
      const memberID = this.memberID
      this.detailForm.memberID = memberID

      const data = {
        memberID
      }
      this.cancel()
      // 发送请求
      getCharacter(data).then(res => {
        if (!res) return
        console.log(res.data);
        if (res.code != 0) return this.$message.error('获取数据失败')
        const Form = res.data
        this.detailForm = {
          name: Form.name.trim(),
          age: Form.age.trim(),
          sex: Form.sex.trim(),
          parent: Form.parent.trim(),
          address: Form.address.trim(),
          hobby: Form.hobby.trim(),
          introduce: Form.introduce.trim(),
        }
      })
    },
    // 点击保存 提交
    submit() {
      this.$refs.detailFormRef.validate(valid => {
        console.log(valid);
        if (!valid) return
        this.loading = true
        const data = this.detailForm
        this.cancel()
        // 发送请求
        submitCharacter(data).then(res => {
          if (!res) return
          console.log(res.data);
          if (res.code != 0) return this.$message.error('修改失败')

          this.$message.success('修改成功')
          this.loading = false
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .loading {
    ::v-deep .ant-spin-nested-loading > div > .ant-spin {
      background-color: #fff !important;
    }
    .spin-content {
      background-color: #fff;
      padding: 220px;
    }
  }
  .el-form {
    padding: 0 0 30px 100px;

    ::v-deep .el-input__inner,
    ::v-deep .el-textarea__inner {
      width: 40% !important;
      font-weight: 500;
    }

    .el-form-item {
      font-weight: 600;

      ::v-deep .el-input__inner {
        color: #777;
      }
    }

    ::v-deep .el-textarea__inner {
      height: 100px;
    }

    .el-button {
      position: absolute;
      left: 43.5%;
    }
  }
}
</style>