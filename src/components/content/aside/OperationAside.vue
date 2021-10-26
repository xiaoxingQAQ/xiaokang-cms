<template>
  <div class="allocation-aside">
    <div class="el-menu" :default-active="activeIndex">
      <div
        v-for="(item, index) in menuList"
        :key="item.id"
        :index="item.id + ''"
        @click="goNext(index)"
        class="el-menu-item"
        :class="{ active: activeIndex == index }"
      >
        <i
          :class="[
            'iconfont',
            item.icon,
            { active_text: activeIndex == index },
          ]"
        >
          <span>{{ item.title }}</span>
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '0',
      menuList: [ // 侧边栏数据
        { id: 0, title: '消息推送', icon: 'icon-xiaoxi' },
        { id: 1, title: '用户管理', icon: 'icon-renyuan1' },
        { id: 2, title: '运营管理', icon: 'icon-transform' },
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
          if (this.$route.path == '/operation') return
          this.$router.push('/operation')
          break;
        case '1':
          this.activeIndex = indey
          if (this.$route.path == '/userControl') return
          this.$router.push('/userControl')
          break;
        case '2':
          this.activeIndex = indey
          if (this.$route.path == '/operationControl') return
          this.$router.push('/operationControl')
          break;
      }
    },
    selected() {
      let path = this.$route.path;
      let operation = '/operation';
      let operationU = '/userControl';
      let operationO = '/operationControl'

      switch (path) {
        case operation:
          this.activeIndex = '0'
          break;
        case operationU:
          this.activeIndex = '1'
          break;
        case operationO:
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

  .active {
    color: #409eff;
    background-color: #edf4fc;
  }
  .active_text {
    color: #409eff;
  }
}
</style>