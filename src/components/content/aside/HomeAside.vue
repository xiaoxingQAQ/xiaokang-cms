<template>
  <div class="home-aside active" :default-active="activeIndex">
    <el-menu>
      <el-menu-item index="1">
        <i class="iconfont icon-house1">
          <span>平台首页</span>
        </i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
}
</script>

<style lang="less" scoped>
.home-aside {
  box-sizing: border-box;
  width: 80px !important;
  background: #fff;

  .el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translate(0, 18px);
      font-size: 25px;
      span {
        font-size: 12px;
        transform: translate(0, -30px);
      }
    }
  }

  .el-menu--collapse {
    width: 80px;
  }
}

::v-deep .el-menu-item {
  i {
    color: #409eff;
  }
  background: #ecf5ff;
}
</style>