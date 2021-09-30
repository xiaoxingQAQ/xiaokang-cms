<template>
  <div class="wrapper">
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
          title: '技能名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '使用次数',
          dataIndex: 'counts',
          key: 'counts',
        },
        {
          title: '使用时间',
          dataIndex: 'date',
          key: 'date',
        },
      ],
      tabData: [
        {
          key: 1,
          name: '1',
          counts: '好好',
          date: '2019-12-08',
        },
        {
          key: 2,
          name: '2',
          counts: '都是',
          date: '2019-12-08',
        },
        {
          key: 3,
          name: '3',
          counts: '好好',
          date: '2019-12-08',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>