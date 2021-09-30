<template>
  <div class="wrapper">
    <header>
      <img src="@/assets/images/logo.png" alt="" />
    </header>

    <main>
      <div class="img-wrapper">
        <div>
          <img src="@/assets/images/show.png" alt="" />
        </div>
      </div>
      <!-- 登录 -->
      <div class="login_container">
        <div class="login_box">
          <div class="title">
            <span>欢迎登录系统</span>
          </div>

          <!-- 登录表单区域 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                prefix-icon="iconfont icon-user"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                prefix-icon="iconfont icon-suo1"
                @keyup.enter.native="login"
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button :loading="loading" type="primary" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>

    <footer>
      <span> Copyright 2021 </span>
    </footer>
  </div>
</template>

<script>
import { login } from '@/network/login'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: ''
      },
      /* 表单验证规则 */
      loginFormRules: {
        username: [
          { required: true, message: '昵称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations('user', ['User_Login']),
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.loading = true
        const data = this.loginForm;

        login(data).then(res => {
          if (!res) return this.$message.error('未知错误')
          console.log(res);
          if (res.code != 1) {
            this.loading = false
            return this.$message.warning({
              message: '登录失败',
              offset: 46,
            })
          }

          this.loading = false
          this.$message.success({
            message: '登录成功',
            offset: 72,
          })

          this.User_Login({
            memberID: res.data.id
          })
          window.sessionStorage.setItem('memberID', JSON.stringify(res.data.id))
          window.sessionStorage.setItem('token', JSON.stringify(res.data.key))
          this.$router.push('/home')
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/background.png');
  background-size: 100%;
  overflow: hidden;

  header {
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    padding-left: 54px;
    padding-top: 40px;

    img {
      display: block;
      width: 20%;
    }
  }

  main {
    width: 100%;
    .img-wrapper {
      padding: 22px 80px 0 0;
      width: 53%;
      min-width: 650px;
      height: 520px;

      img {
        width: 85%;
        transform: translate(16%, 8%);
      }
    }

    .login_box {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 30%;
      height: 40%;
      min-width: 300px;
      min-height: 350px;
      border-radius: 5px;
      border-radius: 12px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      transform: translate(30%, -45%);

      .title {
        width: 100%;
        height: 150px;
        line-height: 150px;
        text-align: center;
        color: #ccc;
        font-size: 25px;
      }
    }

    .login_form {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;

      ::v-deep .el-input__inner {
        font-weight: 500;
        color: #777;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 72px;
    border-top: 1px solid #d8d8d870;
    color: #d8d8d8;
    line-height: 72px;
    text-align: center;
  }
}
</style>
