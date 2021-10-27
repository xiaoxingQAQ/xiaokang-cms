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
        { id: 0, title: '设备中心', icon: 'icon-shebei3' },
        { id: 1, title: '技能中心', icon: 'icon-jineng-20' },
      ],
    }
  },
  created() {
    this.selected()
  },
  methods: {
    goNext(index) {
      const indey = index + '';
      switch (indey) {
        case '0':
          this.activeIndex = indey
          // 点击之后 如果 当前路由 和 将要跳转的路由 相同 那么阻止跳转
          // 否则 放行
          if (this.$route.path == '/dataCenter') return
          this.$router.push('/dataCenter')
          break;
        case '1':
          this.activeIndex = indey
          if (this.$route.path == '/skillCenter') return
          this.$router.push('/skillCenter')
          break;
      }
    },
    selected() {
      let path = this.$route.path
      let dataCenter = '/dataCenter';
      let dataCenterS = '/skillCenter';

      switch (path) {
        case dataCenter:
          this.activeIndex = '0'
          break;
        case dataCenterS:
          this.activeIndex = '1'
          break;
      }
    }
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