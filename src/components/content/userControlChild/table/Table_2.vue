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
        {
          title: '药品名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '用量',
          dataIndex: 'dosage',
          key: 'dosage',
        },
        {
          title: '服用时间',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      tabData: [
        {
          key: 1,
          name: '1',
          dosage: '好好',
          date: '2019-12-08',
        },
        {
          key: 2,
          name: '2',
          dosage: '都是',
          date: '2019-12-08',
        },
        {
          key: 3,
          name: '3',
          dosage: '好好',
          date: '2019-12-08',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>