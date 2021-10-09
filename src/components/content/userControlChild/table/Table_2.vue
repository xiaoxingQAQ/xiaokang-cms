<template>
  <div class="wrapper">
    <a-table
      :columns="columns"
      :data-source="Table_2"
      :loading="loading"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
   props: {
    Table_2: {
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
          title: '药品名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '用量',
          dataIndex: 'piecesOneTime',
          key: 'piecesOneTime',
        },
        {
          title: '服用时间',
          dataIndex: 'planTime',
          key: 'planTime',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>