<template>
  <div class="wrapper">
    <a-table
      :columns="columns"
      :data-source="Table_1"
      :loading="loading"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    Table_1: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      columns: [
        
      ],
    }
  },
  created() {
    console.log();
  }
}
</script>

<style lang="less" scoped>
</style>