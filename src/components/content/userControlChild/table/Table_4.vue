<template>
  <div class="wrapper">
    <a-table
      :rowKey="(record) => record.id"
      :loading="loading"
      :columns="columns"
      :data-source="Table_4"
      @change="tabChange"
      :pagination="true"
      :row-selection="removeRowSelection"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  props: {
    Table_4: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      loading: false,
      columns: [
        {
          title: '标签',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '次数',
          dataIndex: 'counts',
          key: 'counts',
        },
      ],
    }
  },
  computed: {
    // 选中的 tr
    removeRowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          this.selectedRowKeys = selectedRowKeys
          this.selectedRows = selectedRows
        },
      };
    },
  },
  methods: {
    // 表格数据发生变化
    tabChange() { },
  },
}
</script>

<style lang="less" scoped>
</style>