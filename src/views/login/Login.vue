<template>
  <div class="container">
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
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/background.png');
  background-size: 100%;

  header {
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    padding-left: 54px;
    padding-top: 40px;

    img {
      display: block;
      width: 325px;
      height: 80px;
    }
  }
  main {
    width: 100%;
    .img-wrapper {
      padding: 50px 80px 0 0;
      width: 50%;
      height: 520px;

      img {
        width: 85%;
        transform: translate(25%, 8%);
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
        font-size: 30px;
      }
    }

    .login_form {
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
    }

    .btns {
      display: flex;
      justify-content: flex-end;
    }
  }
  footer {
    width: 100%;
    height: 0px;
  }
}
</style>
