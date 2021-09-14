<template>
  <div>
    <ul class="menu">
      <li
        v-for="(item, index) in menuList"
        :key="item.id"
        :class="['menu-item', { active: currentIndex === index }]"
        @click="goNext(item.id)"
      >
        <div><i :class="['iconfont', item.icon]"></i></div>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { id: 0, title: '首页', icon: 'icon-house1' },
        { id: 1, title: '设备配置', icon: 'icon-science' },
        { id: 2, title: '数据中心', icon: 'icon-commission' },
        { id: 3, title: '产品运营', icon: 'icon-server1' },
        { id: 4, title: '系统管理', icon: 'icon-shezhi3' },
      ],
      currentIndex: 0,
    }
  },
  created() {
    this.selected()
  },
  methods: {
    goNext(index) {
      switch (index) {
        case 0:
          this.currentIndex = index
          if (this.$route.path == '/home/main') return
          this.$router.push('/home/main')
          break;
        case 1:
          this.currentIndex = index
          if (this.$route.path == '/home/allocation') return
          this.$router.push('/home/allocation')
          break;
        case 2:
          this.currentIndex = index
          if (this.$route.path == '/home/dataCenter') return
          this.$router.push('/home/dataCenter')
          break;
        case 3:
          this.currentIndex = index
          if (this.$route.path == '/home/operation') return
          this.$router.push('/home/operation')
          break;
        case 4:
          this.currentIndex = index
          if (this.$route.path == '/home/manage') return
          this.$router.push('/home/manage')
          break;

        default:
          break;
      }
    },
    selected() {
      let path = this.$route.path
      let home = '/home/main';

      let allocation = '/home/allocation';
      let allocationS = '/home/skill';
      let allocationR = '/home/repository';
      let allocationE = '/home/edition';

      let dataCenter = '/home/dataCenter';
      let dataCenterS = '/home/skillCenter';

      let operation = '/home/operation';
      let operationU = '/home/userControl';
      let operationO = '/home/operationControl'

      let manage = '/home/manage';
      let manageR1 = '/home/role';
      let manageM = '/home/menu'
      let manageD1 = '/home/dict'
      let manageR2 = '/home/resource'
      let manageD2 = '/home/data'
      /* 如果当前处于 xxx 路由就进行判断 否则不判断 */
      switch (path) {
        case home:
          this.currentIndex = 0
          break;

        case allocation:
          this.currentIndex = 1
          break;
        case allocationS:
          this.currentIndex = 1
          break;
        case allocationR:
          this.currentIndex = 1
          break;
        case allocationE:
          this.currentIndex = 1
          break;

        case dataCenter:
          this.currentIndex = 2
          break;
        case dataCenterS:
          this.currentIndex = 2
          break;

        case operation:
          this.currentIndex = 3
          break;
        case operationU:
          this.currentIndex = 3
          break;
        case operationO:
          this.currentIndex = 3
          break;

        case manage:
          this.currentIndex = 4
          break;
        case manageR1:
          this.currentIndex = 4
          break;
        case manageM:
          this.currentIndex = 4
          break;
        case manageD1:
          this.currentIndex = 4
          break;
        case manageR2:
          this.currentIndex = 4
          break;
        case manageD2:
          this.currentIndex = 4
          break;
      }
    },
  },
}
</script>

<style lang="less" scoped>
.menu {
  display: flex;
  align-items: center;
  margin-left: 15px;

  color: #333;

  .menu-item {
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    margin-right: 22px;
    width: 110px;
    height: 60px;
    color: #333;
    border-bottom: 2.5px solid transparent;
    cursor: pointer;
    transition: all 0.5s;

    div {
      position: relative;
      margin-right: 8px;
      width: 30px;
      height: 30px;

      border-radius: 6px;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fffafa;
      }
    }
  }
  .menu-item:nth-child(1) {
    div {
      background-color: #1e497b;
    }
  }
  .menu-item:nth-child(2) {
    div {
      background-color: #00af57;
    }
  }
  .menu-item:nth-child(3) {
    div {
      background-color: #9aba60;
    }
  }
  .menu-item:nth-child(4) {
    div {
      background-color: #47acc5;
    }
  }
  .menu-item:nth-child(5) {
    div {
      background-color: #ffac00;
    }
  }
  .menu-item:hover {
    background: #edf4fc !important;
  }
  .active {
    transition: all 0.5s;
    border-bottom: 2.5px solid #409eff;
    color: #409eff !important;
  }
}
</style>