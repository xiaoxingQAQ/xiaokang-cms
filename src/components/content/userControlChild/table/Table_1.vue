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
      <!-- <span slot="tag_a" slot-scope="text, record, index">
        <el-tag v-if="record.emptyRemindNum === 0" type="success">正常</el-tag>
        <el-tag v-else-if="record.emptyRemindNum === 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="record.emptyRemindNum === 2" type="danger">偏低</el-tag>
      </span>
      <span slot="tag_b" slot-scope="text, record, index">
        <el-tag v-if="record.afterRemindNum == 0" type="success">正常</el-tag>
        <el-tag v-else-if="record.afterRemindNum == 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="record.afterRemindNum == 2" type="danger">偏低</el-tag>
      </span>
      <span slot="tag_c" slot-scope="text, record, index">
        <el-tag effect="dark" v-if="record.remindNum == 0" type="success">正常</el-tag>
        <el-tag effect="dark" v-else-if="record.remindNum == 1" type="warning">偏高</el-tag>
        <el-tag effect="dark" v-else-if="record.remindNum == 2" type="danger">偏低</el-tag>
      </span> -->
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
    Table_1_a(val) {
      this.Table_1_a = val
    }
  },
  data() {
    return {
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
          dataIndex: 'emptyRemindNum',
           key: 'emptyRemindNum',
        },
        // {
        //   title: '空腹状态',
        //   dataIndex: 'emptyRemindNum',
        //   key: 'tag_a',
        //   scopedSlots: { customRender: 'tag_a' },
        // },
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
          dataIndex: 'afterRemindNum',
          key: 'afterRemindNum',
        },
        {
          title: '整体状态',
          dataIndex: 'remindNum',
          key: 'remindNum',
        },
        // {
        //   title: '餐后状态',
        //   dataIndex: 'afterRemindNum',
        //   key: 'tag_b',
        //   scopedSlots: { customRender: 'tag_b' },
        // },
        // {
        //   title: '整体状态',
        //   dataIndex: 'remindNum',
        //   key: 'tag_c',
        //   scopedSlots: { customRender: 'tag_c' },
        // },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
</style>