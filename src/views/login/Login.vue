<template>
  <div class="wrapper">
    <header>
      <img src="@/assets/images/logo.png" alt="" />
    </header>

    <main>
      <div class="img-wrapper">
        <div>
          <img src="@/assets/images/image.png" alt="" />
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
              <a-button
                :loading="loading"
                class="btn"
                type="primary"
                @click="login"
                >登录</a-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>

    <!-- <div class="footer">
      <div>Copyright 2021</div>
    </div> -->
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
        const account = this.loginForm.username;
        const password = this.loginForm.password
        const data ={
          account,
          password
        }
        this.cancel()
        // 发送请求 登录
        login(data).then(res => {
          console.log('res: ', res);
          if (!res) return this.$message.error('未知错误')
          console.log('登录', res);
          if (res.code != 0) {
            this.loading = false
            return this.$message.warning({
              message: '用户名或密码错误',
              offset: 46,
              duration: '700',
            })
          }

          this.loading = false
          this.$message.success({
            message: '登录成功',
            offset: 72,
            duration: '700',
          })
          const userInfo = {
            id: res.data.id,
            memberID: res.data.menberId,
            username: res.data.username,
            account: res.data.account,
            password: res.data.password,
            phone: res.data.phone,
            email: res.data.email,
            nickName: res.data.nickName,
            sex: res.data.sex
          }
          this.User_Login(userInfo)
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          window.sessionStorage.setItem('token', JSON.stringify('token'))
          this.$router.push('/')
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/background.png');
  background-size: 100%;
  overflow: hidden;

  .btn {
    width: 90px;
    font-weight: 500;
    color: #fff;
    border: transparent;
  }

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
        transform: translate(16%, -8%);
      }
    }

    .login_box {
      position: absolute;
      top: 50%;
      left: 50%;

      width: 25%;
      height: 30%;
      min-width: 380px;
      min-height: 350px;
      border-radius: 5px;
      border-radius: 12px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
      transform: translate(30%, -45%);

      .title {
        width: 100%;
        height: 130px;
        line-height: 130px;
        text-align: center;
        color: #ccc;
        font-size: 25px;
      }
    }

    .login_form {
      width: 100%;
      padding: 5% 30px;
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
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 72px;
    border-top: 1px solid #d8d8d870;
    color: #d8d8d8;
    background: #fff;
  }
}
</style>
