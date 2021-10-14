<template>
  <div class="wrapper">
    <a-table
      :columns="columns"
      :data-source="Table_2"
      :loading="loading"
      :pagination="pagination"
      @change="handleChange"
    >
    {{pagination}}
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
      pagination: {
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: false,
      },
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
  created() {
    
  },
  methods: {
    handleChange() {

    }
  },
}
</script>

<style lang="less" scoped>
</style>