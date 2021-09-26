/* 数据中心页面 */
<template>
  <div class="container">

    <TabsNav @onChange="onChange" class="tabs_nav">
      <span slot="top">设备数据</span>
      <span slot="center">历史消息</span>
      <span slot="bottom">版本分布</span>
    </TabsNav>

    <Data v-if="currentIndex == 0" class="Margin_left" />
    <History v-if="currentIndex == 1" class="Margin_left" />
    <Edition v-else-if="currentIndex == 2" class="Margin_left" />
  </div>
</template>

<script>
import Data from '@/components/content/dataCenterChild/Data'
import History from '@/components/content/dataCenterChild/History'
import Edition from '@/components/content/dataCenterChild/Edition'

import TabsNav from '@/components/content/tabsNav/TabsNav'


export default {
  components: {
    Data,
    History,
    Edition,
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
.container {
  ::v-deep .el-tabs--left {
    height: 100% !important;
  }

  ::v-deep .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    margin-right: 15px;
    width: 60px;
  }
}
</style>
