/* 技能中心 */
<template>
  <div class="wrapper">
    <div class="tabs-nav">
      <div
        v-for="(item, index) in tabs_nav"
        :key="item.id"
        @click="btnClick(index)"
      >
        <span :class="{ active: currentIndex == index }">
          <slot :name="item.name"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['indey'],
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
    if (this.index == 0) {
      this.currentIndex = this.indey
      return
    }

    this.$emit('onChange', this.currentIndex)
  },
  mounted() {
    this.$bus.$on('handle', () => {
      this.currentIndex = 1;
      // 传数据给父组件
      this.$emit('onChange', this.currentIndex)
    })
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index
      sessionStorage.setItem('tabsIndex', JSON.stringify(this.currentIndex))

      // 传数据给父组件
      this.$emit('onChange', this.currentIndex)
    },
    selected() {
      let tabsIndex = JSON.parse(sessionStorage.getItem('tabsIndex'));
      if (!tabsIndex) return

      this.currentIndex = tabsIndex
    }
  },

}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  font-weight: 600;
  .tabs-nav {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 65px;

    color: #000;
    > div {
      display: flex;
      align-items: center;
      padding: 10px 0;
      transition: all 0.3s;
      span {
        border-bottom: 2px solid transparent;
        transition: all 0.3s;
      }
    }
    > div:hover {
      color: #40a0ff83;
      cursor: pointer;
    }
  }

  .active {
    color: #409eff;
    border-bottom: 2px dashed #409eff !important;
  }
}
</style>