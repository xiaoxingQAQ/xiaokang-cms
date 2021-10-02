/* 系统版本 */
<template>
  <div class="wrapper">
    <TabsNav @onChange="onChange" class="tabs_nav">
      <span slot="top">版本推送</span>
      <span slot="center">版本信息</span>
    </TabsNav>

    <SystemUpdata v-if="currentIndex == 0" class="Margin_left" />
    <Info v-if="currentIndex == 1" class="Margin_left" />
  </div>
</template>

<script>
import SystemUpdata from '@/components/content/editionChild/SystemUpdata'
import Info from '@/components/content/editionChild/Info'
import TabsNav from '@/components/content/tabsNav/TabsNav'

export default {
  components: {
    SystemUpdata,
    Info,
    TabsNav
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    onChange(index) {
      this.currentIndex = index
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
</style>