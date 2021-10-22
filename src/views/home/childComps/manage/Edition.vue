/* 系统版本 */
<template>
  <div class="wrapper">
    <transition
      name="slide-fade"
      v-if="!isChange"
    >
      <Info @onChange="onChange" />
    </transition>
    <transition
      name="slide-fade"
      v-else="isChange"
    >
      <Setting @onChange="onChange" />
    </transition>
  </div>
</template>

<script>
import Info from '@/components/content/editionChild/Info'
import Setting from '@/components/content/editionChild/Setting'

export default {
  components: {
    Info,
    Setting
  },
  data() {
    return {
      isChange: false,
    }
  },
  methods: {
    onChange() {
      this.isChange = !this.isChange
    },

  },
}
</script>

<style lang="less" scoped>
::v-deep .el-tabs--left {
  height: 100% !important;
}

::v-deep .el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
  margin-right: 15px;
  width: 60px;
}

// 动画
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
  opacity: 0.1;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  opacity: 0.1;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0.1;
}
</style>