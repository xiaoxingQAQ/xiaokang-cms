/* 技能中心 */
<template>
  <div class="container">
    <div class="tabs-nav">
      <div
        v-for="(item, index) in tabs_nav"
        :key="item.id"
        :class="{ active: currentIndex == index }"
        @click="btnClick(index)"
      >
        <slot :name="item.name"></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tabs_nav: [
        { id: 0, name: 'top' },
        { id: 1, name: 'center' },
        { id: 2, name: 'bottom' }
      ],
      currentIndex: 0,
    }
  },
  created() {
    this.selected()
  },
  watch: {
    $route: {
      handler() {
        // 监听路由变化 如果路由发生变化 currentIndex 重置为 0
        let index = 0;
        this.currentIndex = index;
        sessionStorage.setItem('tabsIndex', JSON.stringify(index))
        // 传数据给父组件
        this.$emit('onChange', index)
      },
      deep: true
    }
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index
      sessionStorage.setItem('tabsIndex', JSON.stringify(index))

      // 传数据给父组件
      this.$emit('onChange', index)
    },
    selected() {
      let tabsIndex = JSON.parse(sessionStorage.getItem('tabsIndex'));
      if (!tabsIndex) return

      this.currentIndex = tabsIndex
      // 传数据给父组件
      this.$emit('onChange', tabsIndex)
    }
  },

}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  font-weight: 600;
  .tabs-nav {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 15px;
    width: 65px;
    > div {
      padding: 10px 0;
      transition: all 0.3s;
    }
    > div:hover {
      color: #40a0ff83;
      cursor: pointer;
    }
  }

  .active {
    color: #409eff;
  }
}
</style>