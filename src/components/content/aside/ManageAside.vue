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
        { id: 0, title: '人员部门', icon: 'icon-renyuan' },
        { id: 1, title: '角色权限', icon: 'icon-renyuan1' },
        { id: 2, title: '菜单管理', icon: 'icon-caidan' },
        { id: 3, title: '字典管理', icon: 'icon-zidian' },
        { id: 4, title: '资源管理', icon: 'icon-ziyuan1' },
        { id: 5, title: '数据中台', icon: 'icon-shujuzhongtai1' },
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
          if (this.$route.path == '/home/manage') return
          this.$router.push('/home/manage')
          break;
        case '1':
          this.activeIndex = indey
          if (this.$route.path == '/home/role') return
          this.$router.push('/home/role')
          break;
        case '2':
          this.activeIndex = indey
          if (this.$route.path == '/home/menu') return
          this.$router.push('/home/menu')
          break;
        case '3':
          this.activeIndex = indey
          if (this.$route.path == '/home/dict') return
          this.$router.push('/home/dict')
          break;
        case '4':
          this.activeIndex = indey
          if (this.$route.path == '/home/resource') return
          this.$router.push('/home/resource')
          break;
        case '5':
          this.activeIndex = indey
          if (this.$route.path == '/home/data') return
          this.$router.push('/home/data')
          break;
      }
    },
    selected() {
      let path = this.$route.path;
      let manage = '/home/manage';
      let manageR1 = '/home/role';
      let manageM = '/home/menu'
      let manageD1 = '/home/dict'
      let manageR2 = '/home/resource'
      let manageD2 = '/home/data'

      switch (path) {
        case manage:
          this.activeIndex = '0'
          break;
        case manageR1:
          this.activeIndex = '1'
          break;
        case manageM:
          this.activeIndex = '2'
          break;
        case manageD1:
          this.activeIndex = '3'
          break;
        case manageR2:
          this.activeIndex = '4'
          break;
        case manageD2:
          this.activeIndex = '5'
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