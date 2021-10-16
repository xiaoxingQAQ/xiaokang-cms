<template>
  <div class="allocation-aside">
    <el-menu :default-active="activeIndex">
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="item.id"
        :index="item.id + ''"
        @click="goNext(index)"
      >
        <i :class="['iconfont', item.icon]">
          <span>{{ item.title }}</span>
        </i>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      menuList: [ // 侧边栏数据
        { id: 0, title: '客服信息', icon: 'icon-kefu' },
        { id: 2, title: '其他配置', icon: 'icon-caidan' },
      ],
    }
  },
  created() {
    this.selected()
  },
  watch: {
    $route: {
      handler() {
        this.selected()
      },
      deep: true
    }
  },
  methods: {
    goNext(index) {
      const indey = index + '';
      switch (indey) {
        case '0':
          this.activeIndex = indey
          // 点击之后 如果 当前路由 和 将要跳转的路由 相同 那么阻止跳转
          // 否则 放行
          if (this.$route.path == '/service') return
          this.$router.replace('/service')
          break;
        case '1':
          this.activeIndex = indey
          if (this.$route.path == '/restSettings') return
          this.$router.replace('/restSettings')
          break;
      }
    },
    selected() {
      let path = this.$route.path;
      let manage = '/manage';
      let manageR = '/restSettings'

      switch (path) {
        case manage:
          this.activeIndex = '0'
          break;
        case manageR:
          this.activeIndex = '2'
          break;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.allocation-aside {
  box-sizing: border-box;
  width: 80px !important;
  min-height: 309px;
  background: #fff;

  .el-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    transition: all 0.5s;

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

  .el-menu-item.is-active {
    color: #409eff;
    background-color: #edf4fc;
  }
}
</style>