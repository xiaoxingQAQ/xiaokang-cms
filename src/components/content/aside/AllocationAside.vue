<template>
  <div class="allocation-aside">
    <div class="el-menu" :default-active="activeIndex">
      <div
        v-for="(item, index) in menuList"
        :key="item.id"
        :index="item.id + ''"
        @click="goNext(item.id)"
        class="el-menu-item"
        :class="{active: activeIndex == index}"
      >
        <i :class="['iconfont', item.icon, {active_text: activeIndex == index}]">
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
        { id: 0, title: '人设管理', icon: 'icon-jiaose' },
        { id: 1, title: '技能管理', icon: 'icon-jineng' },
        { id: 2, title: '知识库', icon: 'icon-ziyuan' },
        { id: 3, title: '收音机', icon: 'icon-shebei1' },
        { id: 4, title: '养生知识', icon: 'icon-yangsheng' },
        { id: 5, title: '健康顾问', icon: 'icon-guwen' },
      ],
    }
  },
  created() {
    this.selected()
  },
  methods: {
    goNext(index) {
      let path = this.$route.path
      const indey = index + '';
      switch (indey) {
        case '0':
          this.activeIndex = indey
          // 点击之后 如果 当前路由 和 将要跳转的路由 相同 那么阻止跳转
          // 否则 放行
          if (path == '/allocation') return
          this.$router.push('/allocation')
          break;
        case '1':
          this.activeIndex = indey
          if (path == '/skill') return
          this.$router.push('/skill')
          break;
        case '2':
          this.activeIndex = indey
          if (path == '/repository') return
          this.$router.push('/repository')
          break;
        case '3':
          this.activeIndex = indey
          if (path == '/radio') return
          this.$router.push('/radio')
          break;
        case '4':
          this.activeIndex = indey
          if (path == '/goodHealth') return
          this.$router.push('/goodHealth')
          break;
        case '5':
          this.activeIndex = indey
          if (path == '/counselor') return
          this.$router.push('/counselor')
          break;
      }
    },
    selected() {
      let path = this.$route.path;
      let allocation = '/allocation';
      let allocationS = '/skill';
      let allocationR_1 = '/repository';
      let allocationR_2 = '/radio'
      let allocationG = '/goodHealth'
      let allocationC = '/counselor'

      switch (path) {
        case allocation:
          this.activeIndex = '0'
          break;
        case allocationS:
          this.activeIndex = '1'
          break;
        case allocationR_1:
          this.activeIndex = '2'
          break;
        case allocationR_2:
          this.activeIndex = '3'
          break;
        case allocationG:
          this.activeIndex = '4'
          break;
        case allocationC:
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

  .active {
    color: #409eff;
    background-color: #edf4fc;
  }
  .active_text {
    color: #409eff;
  }
}
</style>