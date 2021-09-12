<template>
  <el-container class="home-container">
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
              <div>admin</div>
              <div style="margin-bottom: 5px">系统管理员</div>
            </div>
            <div class="avatar">
              <img src="@/assets/images/avatar.png" alt="" />
            </div>
          </div>
          <div class="list">
            <div>
              <i class="iconfont icon-shezhi2"></i>
              <span>修改资料</span>
            </div>
            <div>
              <i class="iconfont icon-suo"></i>
              <span>修改密码</span>
            </div>
            <div>
              <i class="iconfont icon-logout"></i>
              <span>退出账号</span>
            </div>
          </div>
        </div>
      </transition>
      <!-- 导航栏 -->
      <NavBar class="NavBar" />
      <div class="btn">
        <el-button size="mini" class="toggle-button" type="info"
          >退出</el-button
        >
      </div>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
        <HomeAside />
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
import NavBar from '@/components/content/nav-bar/NavBar'
import HomeAside from '@/components/content/aside/HomeAside'

export default {
  components: {
    HomeAside,
    NavBar,
  },
  data() {
    return {
      isShow: false,
      isCollapse: true,
    }
  },
  methods: {
    showInfo() {
      this.isShow = !this.isShow
    },
  }
}
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  height: 100%;

  .el-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding-left: 16px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    font-weight: bold;

    .NavBar {
      transform: translate(-8%);
    }

    .icon-user {
      position: absolute;
      top: 9px;
      left: 26px;
      font-size: 30px;
      color: #fffafa;
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

    .slide-fade-enter-active {
      transition: all 0.2s ease;
    }
    .slide-fade-leave-active {
      transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
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
    width: 80px !important;
    background: #fff;
  }

  .el-main {
    background: #eaedf1;
  }
}

.active {
  background: #ecf5ff;
}
</style>