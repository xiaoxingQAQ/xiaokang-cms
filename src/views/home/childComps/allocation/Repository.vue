/* 知识库 */
<template>
  <div class="container">
    <TabsNav @onChange="onChange" class="tabs_nav">
      <span slot="top">问答管理</span>
      <span slot="center">知识雷达</span>
    </TabsNav>
    
    <Answer v-if="currentIndex == 0" class="Margin_left" />

    <Radar v-if="currentIndex == 1" class="Margin_left" />
  </div>
</template>

<script>
import Radar from '@/components/content/repositoryChild/Radar'
import Answer from '@/components/content/repositoryChild/Answer'

import TabsNav from '@/components/content/tabsNav/TabsNav'

export default {
  components: {
    Radar,
    Answer,
    TabsNav,
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    onChange(index) {
      console.log('index',index);
      this.currentIndex = index
      console.log(index);
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
