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
              <div style="margin-bottom: 5px">{{ systemName }}</div>
            </div>
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="" />
            </div>
          </div>

          <div class="list">
            <div @click="">
              <i class="iconfont icon-shezhi2"></i>
              <span>修改资料</span>
            </div>
            <div @click="">
              <i class="iconfont icon-suo"></i>
              <span>修改密码</span>
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
      isShow: false,
      isCollapse: true,
    }
  },
  watch: {
    '$route'(to, from) {
      this.$refs.NavBar.selected()
      sessionStorage.setItem('tabsIndex', JSON.stringify(0))
    }
  },
  computed: {
    ...mapState('user', ['username', 'systemIcon', 'systemName']),
    showAsideA() {
      const path = this.$route.path;
      const APath = '/allocation';
      const SPath = '/skill';
      const R_1Path = '/repository';
      const R_2Path = '/radio';
      const GPath = '/goodHealth';
      const EPath = '/edition';

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
        case EPath:
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
      const CPath = '/callSettings';
      const RPath = '/restSettings';

      switch (path) {
        case MPath:
          return true
        case CPath:
          return true
        case RPath:
          return true
      }
    },
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
    }
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
    }
    .slide-fade-leave-active {
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
      transform: translateX(5px);
      opacity: 0;
    }

    .via {
      position: absolute;
      top: 10px;
      left: 80px;
      z-index: 9;
      width: 190px;
      height: 180px;

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
          margin-top: 10px;
          cursor: pointer;
          span {
            margin-left: 12px;
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