/* 系统版本 */
<template>
  <div class="container">
    <el-tabs tab-position="left" style="height: 200px">
      <el-tab-pane class="tabs_1" label="系统升级">
        <SystemUpdata />
      </el-tab-pane>
      <el-tab-pane label="版本日志">
        <Log />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SystemUpdata from '@/components/content/editionChild/SystemUpdata'
import Log from '@/components/content/editionChild/Log'

export default {
  components: {
    SystemUpdata,
    Log
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