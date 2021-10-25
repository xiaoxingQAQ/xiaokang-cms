<template>
  <el-container class="home-container container">
    <!-- 头部区域 -->
    <el-header>
      <div class="iconfont icon-user" @click="showInfo"></div>
      <div class="info-wrapper">
        <div class="info"></div>
        <div class="img-wrapper">
          <img src="../../assets/images/logo.png" alt="" />
        </div>
      </div>

      <!-- 隐藏内容 -->
      <transition name="slide-fade">
        <div class="via" v-show="isShow">
          <div>
            <div class="left">
              <div>{{ username }}</div>
              <div style="margin-bottom: 5px">{{ nickName }}</div>
            </div>
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="" />
            </div>
          </div>

          <div class="list">
            <div @click="detail">
              <i class="iconfont icon-shezhi2"></i>
              <span>查看/修改资料</span>
            </div>
            <div @click="dialogFormVisible = true">
              <i class="iconfont icon-suo"></i>
              <span>修改账号/密码</span>
            </div>
            <div @click="logout">
              <i class="iconfont icon-logout"></i>
              <span>退出账号</span>
            </div>
          </div>
        </div>
      </transition>
      <!-- 导航栏 -->
      <NavBar ref="NavBar" class="NavBar" />
      <div class="btn">
        <el-button size="mini" class="toggle-button" type="info" @click="logout"
          >退出</el-button
        >
      </div>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <HomeAside v-if="$route.path === '/main'" />
        <AllocationAside v-else-if="showAsideA" />
        <DataCenterAside v-else-if="showAsideD" />
        <OperationAside v-else-if="showAsideO" />
        <ManageAside v-else-if="showAsideM" />
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
    </el-container>

    <!-- 查看资料 -->
    <el-dialog title="资料" :visible.sync="visible" @close="handleCancel_2">
      <el-form :model="detailForm" ref="detailForm" :rules="detailRules">
        <el-form-item label="用户名：" prop="username" label-width="120px">
          <el-input
            v-model.trim="detailForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName" label-width="120px">
          <el-input
            v-model.trim="detailForm.nickName"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号：" prop="phone" label-width="120px">
          <el-input
            v-model.trim="detailForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email" label-width="120px">
          <el-input
            v-model.trim="detailForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel_2">取 消</el-button>
        <el-button type="primary" @click="handleOk_2">修 改</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogFormVisible"
      @close="handleCancel_1"
    >
      <el-form :model="Form" ref="Form" :rules="FormRules">
        <el-form-item label="账号：" prop="account" label-width="120px">
          <el-input v-model.trim="Form.account" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码：" prop="password_1" label-width="120px">
          <el-input
            type="password"
            v-model.trim="Form.password_1"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="password_2" label-width="120px">
          <el-input
            type="password"
            v-model.trim="Form.password_2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel_1">取 消</el-button>
        <el-button type="primary" @click="handleOk_1">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import NavBar from '@/components/content/navBar/NavBar'
import HomeAside from '@/components/content/aside/HomeAside'
import AllocationAside from '@/components/content/aside/AllocationAside'
import DataCenterAside from '@/components/content/aside/DataCenterAside'
import OperationAside from '@/components/content/aside/OperationAside'
import ManageAside from '@/components/content/aside/ManageAside'
import { mapState } from 'vuex'

import { editInfo } from '@/network/home';

export default {
  components: {
    NavBar,
    HomeAside,
    AllocationAside,
    DataCenterAside,
    OperationAside,
    ManageAside,
  },
  data() {
    return {
      username: '',
      nickName: '',
      visible: false,
      Form: { // 修改账号密码的表单
        account: '',
        password_1: '',
        password_2: ''
      },
      detailForm: {
        username: '',
        nickName: '',
        phone: '',
        email: '',
      },
      detailRules: {
        username: [
          { required: false, message: '请输入用户名', trigger: 'blur' },
        ],
        nickName: [
          { required: false, message: '请输入昵称', trigger: 'blur' },
        ],

        phone: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
        ],
      },
      dialogFormVisible: false,
      isShow: false,
      isCollapse: true,
      // 修改密码的表单 验证规则
      FormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password_1: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        password_2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.$refs.NavBar.selected()
      sessionStorage.setItem('tabsIndex', JSON.stringify(0))
    },

  },
  created() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if (userInfo instanceof Object) {
      this.username = this.userInfo.username;
      this.nickName = this.userInfo.nickName;
      this.detailForm = this.userInfo;
    }
  },
  computed: {
    ...mapState('user', ['memberID', 'userInfo']),
    showAsideA() {
      const path = this.$route.path;
      const APath = '/allocation';
      const SPath = '/skill';
      const R_1Path = '/repository';
      const R_2Path = '/radio';
      const GPath = '/goodHealth';
      const CPath = '/counselor';

      switch (path) {
        case APath:
          return true
        case SPath:
          return true
        case R_1Path:
          return true
        case R_2Path:
          return true
        case GPath:
          return true
        case CPath:
          return true
      }
    },
    showAsideD() {
      const path = this.$route.path;
      const DPath = '/dataCenter';
      const SPath = '/skillCenter';
      if (path == DPath) return true
      if (path == SPath) return true
    },
    showAsideO() {
      const path = this.$route.path;
      const APath = '/operation';
      const UPath = '/userControl';
      const OPath = '/operationControl';

      switch (path) {
        case APath:
          return true
        case UPath:
          return true
        case OPath:
          return true
      }
    },
    showAsideM() {
      const path = this.$route.path;
      const MPath = '/service';
      const EPath = '/edition';
      switch (path) {
        case MPath:
          return true
        case EPath:
          return true
      }
    },
  },
  mounted() {
  },
  methods: {
    showInfo() {
      this.isShow = !this.isShow
    },
    // 退出登录
    logout() {
      this.$confirm('此操作将注销登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已退出登录'
        });
        sessionStorage.clear()
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    // 处理保存修改密码
    handleOk_1() {
      this.$refs.Form.validate(valid => {
        if (!valid) return

        const id = this.userInfo.id;
        const account = this.Form.account;
        const password = this.Form.password_1;
        const password_2 = this.Form.password_2;
        if (password_2 !== password) return this.$message.warning('两次密码输入不一致')
        const data = {
          id,
          password
        }
        // 发送请求
        editInfo(data).then(({ data, code }) => {
          if (code != 0) return this.$message.error('修改失败')


          this.$message.success('修改成功')
          this.handleCancel_1()
        })
      })
    },
    // 处理取消
    handleCancel_1() {
      this.$refs.Form.resetFields()
      this.dialogFormVisible = false
      this.isShow = false
    },
    // 查看、修改资料
    detail() {
      this.visible = true
    },
    handleOk_2() {
      this.$refs.detailForm.validate(valid => {
        if (!valid) return

        const id = this.userInfo.id;
        const username = this.detailForm.username;
        const nickName = this.detailForm.nickName;
        const sex = this.detailForm.sex;
        const phone = this.detailForm.phone;
        const email = this.detailForm.email;

        const data = {
          id,
          username,
          nickName,
          sex,
          phone,
          email
        }
        // 发送请求
        editInfo(data).then(({ data, code }) => {
          if (code != 0) return this.$message.error('修改失败')

          this.$message.success('修改成功')
          this.nickName = this.detailForm.nickName;
          this.username = this.detailForm.username;
          sessionStorage.setItem('userInfo', JSON.stringify(this.detailForm))
          this.handleCancel_2()
        })
      })
    },
    handleCancel_2() {
      this.visible = false
      this.isShow = false
    },
  }
}
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  height: 100%;

  .el-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding-left: 16px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    font-weight: 700;

    .NavBar {
      transform: translate(-8%);
    }

    .icon-user {
      position: absolute;
      top: 7px;
      left: 26px;
      font-size: 30px;
      color: #fffafa;
      cursor: pointer;
    }

    .info-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info {
        margin-top: 4px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ffac00;
        box-shadow: 0 0 8px rgba(33, 56, 80, 0.3);
      }

      .img-wrapper {
        width: 70%;
        pointer-events: none;
        img {
          position: relative;
          z-index: 2;
          transform: translate(12%);
          max-width: 134px;
          max-height: 34px;
        }
      }
    }
    // 动画
    .slide-fade-enter-active {
      transition: all 0.3s ease;
      opacity: 0.9;
    }
    .slide-fade-leave-active {
      transition: all 0.3s ease-in-out;
      opacity: 0.3;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translate(-50px);
      opacity: 0.1;
    }

    .via {
      position: absolute;
      top: 10px;
      left: 80px;
      z-index: 9;
      width: 190px;

      background-color: rgb(251, 248, 248);
      box-shadow: 0 2px 10px rgba(51, 49, 49, 0.3);
      border-radius: 10px;
      translate: all 0.3s;

      > div:first-child {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        border-bottom: 2px solid #ccc;

        &::before {
          content: '';
          position: absolute;
          top: 16px;
          left: -16px;

          width: 0;
          height: 0;
          border: 8px solid;
          border-color: transparent rgb(251, 248, 248) transparent transparent;
        }
      }

      .list {
        padding: 8px 15px 15px;
        div {
          display: flex;
          margin-top: 15px;
          cursor: pointer;
          span {
            margin-left: 20px;
          }
        }
      }
    }

    .btn {
      line-height: 60px;
    }
    .toggle-button {
      line-height: 24px;
      text-align: center;
    }
  }

  .el-aside {
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;

    width: 80px !important;
    background: #fff;
  }

  .el-main {
    position: absolute;
    left: 0px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;

    margin-left: 80px;
    background: #eaedf1;
  }
}

.active {
  background: #ecf5ff;
}
</style>