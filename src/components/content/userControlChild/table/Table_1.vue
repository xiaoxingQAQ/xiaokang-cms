<template>
  <div class="wrapper">
    <a-table
      v-if="!isChange"
      :columns="columns_1"
      :data-source="Table_1"
      :loading="loading"
      :pagination="true"
    >
    </a-table>

    <a-table
      v-else
      :columns="columns_2"
      :data-source="Table_1_a"
      :loading="loading"
      :pagination="true"
    >
      <template slot="tag_1" slot-scope="text, record, index">
        <el-tag v-if="record.emptyRemindNum === 0" type="success">正常</el-tag>
        <el-tag v-else-if="record.emptyRemindNum === 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="record.emptyRemindNum === 2" type="danger">偏低</el-tag>
      </template>
      <template slot="tag_2" slot-scope="text, record, index">
        <el-tag v-if="record.afterRemindNum == 0" type="success">正常</el-tag>
        <el-tag v-else-if="record.afterRemindNum == 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="record.afterRemindNum == 2" type="danger">偏低</el-tag>
      </template>
      <template slot="tag_3" slot-scope="text, record, index">
        <el-tag effect="dark" v-if="record.remindNum == 0" type="success">正常</el-tag>
        <el-tag effect="dark" v-else-if="record.remindNum == 1" type="warning">偏高</el-tag>
        <el-tag effect="dark" v-else-if="record.remindNum == 2" type="danger">偏低</el-tag>
      </template>
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
    },
    Table_1_a: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    Table_1_a() {
      console.log(this.Table_1_a);
    }
  },
  data() {
    return {
      type: null,
      isChange: false,
      loading: false,
      columns_1: [
        {
          title: '近7天的 收缩压均值',
          dataIndex: 'avgsystolic',
          key: 'avgsystolic',
        },
        {
          title: '收缩压',
          dataIndex: 'systolic',
          key: 'systolic',
        },
        {
          title: '近7天的 舒张压均值',
          dataIndex: 'avgdiastolic',
          key: 'avgdiastolic',
        },
        {
          title: '舒张压',
          dataIndex: 'diastolic',
          key: 'diastolic',
        },
        {
          title: '血压标准',
          dataIndex: 'sequenceNo',
          key: 'sequenceNo',
        },
        {
          title: '录入时间',
          dataIndex: 'time',
          key: 'time',
        },
      ],
      columns_2: [
        {
          title: '空腹血糖平均值',
          dataIndex: 'avgEmptySugar',
          key: 'avgEmptySugar',
        },
        {
          title: '空腹血糖',
          dataIndex: 'empty',
          key: 'empty',
        },
        {
          title: '空腹状态',
          key: 'tag_1',
          scopedSlots: { customRender: 'tag_1' },
        },


        {
          title: '餐后血糖平均值',
          dataIndex: 'avgAfterSugar',
          key: 'avgAfterSugar',
        },
        {
          title: '餐后血糖',
          dataIndex: 'after',
          key: 'after',
        },
        {
          title: '餐后状态',
          key: 'tag_2',
          scopedSlots: { customRender: 'tag_2' },
        },
        {
          title: '整体状态',
          key: 'tag_3',
          scopedSlots: { customRender: 'tag_3' },
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>