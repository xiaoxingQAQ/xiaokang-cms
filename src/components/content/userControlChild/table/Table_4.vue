<template>
  <div class="wrapper">
    <a-table
      :loading="false"
      :columns="columns"
      :data-source="tabData"
      @change="tabChange"
      :pagination="false"
      :row-selection="removeRowSelection"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '标签',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '创建时间',
          dataIndex: 'date',
          key: 'date',
          scopedSlots: { customRender: 'image' },
          width: '20%'
        },
      ],
      tabData: [
        {
          key: 1,
          title: 'Luck',
          date: '2019-12-08',
        },
        {
          key: 2,
          title: 'Luck',
          date: '2019-12-16',
        },
        {
          key: 3,
          title: 'Luck',
          date: '2019-12-22',
        },
      ],
    }
  },
  computed: {
    // 选中的 tr
    removeRowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        },
      };
    },
  },
  methods: {
    // 表格数据发生变化
    tabChange() {},
  },
}
</script>

<style lang="less" scoped>
</style>