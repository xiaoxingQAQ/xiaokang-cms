/* 知识库 */
<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 200px">
      <el-tab-pane class="tabs_1" label="问答管理">
        <Answer />
      </el-tab-pane>
      <el-tab-pane label="知识雷达">
        <Radar />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Radar from '@/components/content/repositoryChild/Radar'
import Answer from '@/components/content/repositoryChild/Answer'
export default {
  components: {
    Radar,
    Answer
  }
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
