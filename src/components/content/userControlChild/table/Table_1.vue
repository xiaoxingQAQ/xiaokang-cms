<template>
  <div class="wrapper">
    <a-table
      v-if="!isChange"
      :columns="columns_1"
      :data-source="Table_1"
      :loading="loading"
      :pagination="true"
    >
      <template slot="tag" slot-scope="text, record, index">
        <el-tag type="success" v-if="status">已读</el-tag>
        <el-tag type="danger" v-else>未读</el-tag>
      </template>
    </a-table>

    <a-table
      v-else
      :columns="columns_2"
      :data-source="Table_1_a"
      :loading="loading"
      :pagination="true"
    >
      <template slot="tag_1" slot-scope="text, record, index">
        <el-tag v-if="type_1 == 0" type="success">正常</el-tag>
        <el-tag v-else-if="type_1 == 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="type_1 == 2" type="danger">偏低</el-tag>
      </template>
      <template slot="tag_2" slot-scope="text, record, index">
        <el-tag v-if="type_2 == 0" type="success">正常</el-tag>
        <el-tag v-else-if="type_2 == 1" type="warning">偏高</el-tag>
        <el-tag v-else-if="type_2 == 2" type="danger">偏低</el-tag>
      </template>
      <template slot="tag_3" slot-scope="text, record, index">
        <el-tag effect="dark" v-if="type_3 == 0" type="success">正常</el-tag>
        <el-tag effect="dark" v-else-if="type_3 == 1" type="warning">偏高</el-tag>
        <el-tag effect="dark" v-else-if="type_3 == 2" type="danger">偏低</el-tag>
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
  data() {
    return {
      type: null,
      isChange: false,
      loading: false,
      columns_1: [
        {
          title: '收缩压',
          dataIndex: 'systolic',
          key: 'systolic',
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
          title: '状态',
          key: 'tag',
          scopedSlots: { customRender: 'tag' },
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
  computed: {
    status() {
      let status = this.Table_1[0].statusID
      //  0绿色，1黄色 2红色
      if (status == 1) {
        return true
      } else {
        return false
      }
    },
    type_1() {
      //  0绿色，1黄色 2红色
      let type = this.Table_1_a[0].emptyRemindNum
      return type
    },
    type_2() {
      //  0绿色，1黄色 2红色 
      //  正常、偏高、偏低
      let type = this.Table_1_a[0].afterRemindNum
      return type
    },
    type_3() {
      //  0绿色，1黄色 2红色 
      //  正常、偏高、偏低
      let type = this.Table_1_a[0].remindNum
      return type
    }
  },
}
</script>

<style lang="less" scoped>
</style>