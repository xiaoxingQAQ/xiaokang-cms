<template>
  <div class="container">
    <a-table
      :columns="columns"
      :data-source="tabData"
      :loading="loading"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      columns: [
        
      ],
      tabData: [
        
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>