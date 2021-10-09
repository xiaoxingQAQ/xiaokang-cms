<template>
  <div class="wrapper">
    <a-table
      :columns="columns"
      :data-source="Table_3"
      :loading="loading"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    Table_3: {
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
        {
          title: '技能名称',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '使用次数',
          dataIndex: 'counts',
          key: 'counts',
        },
        {
          title: '使用时间',
          dataIndex: 'time',
          key: 'time',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>