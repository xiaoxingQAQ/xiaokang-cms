<template>
  <div class="container">
    <Card>
      <span slot="leftTitle">用户选择</span>
      <div slot="main">
        <a-form-model
          layout="inline"
          :model="SearchForm"
          @submit="search"
          @submit.native.prevent
        >
          <a-form-model-item>
            <a-input v-model="SearchForm.memberID" placeholder="用户账号">
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input v-model="SearchForm.equipmentID" placeholder="设备编码">
              <a-icon
                slot="prefix"
                type="android"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" html-type="submit" :disabled="false">
              查询
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </Card>

    <Card>
      <span slot="leftTitle">用户列表</span>
      <div slot="main">
        <DataRow types="string"></DataRow>

        <!-- 表格 -->
        <a-table
          :loading="false"
          :columns="columns"
          :data-source="tabData"
          :pagination="false"
        >
          <div slot="operate" slot-scope="text, record">
            <a-button @click="goDetail(record)" class="btn">查看</a-button>
          </div>
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import DataRow from '@/components/content/dateRow/DateRow'

export default {
  components: {
    Card,
    DataRow
  },
  data() {
    return {
      // 搜索表单对象
      SearchForm: {
        memberID: '',
        equipmentID: '',
      },
      columns: [
        {
          title: '用户账号',
          dataIndex: 'memberID',
          key: 'memberID',
          ellipsis: true,
          width: '30%'
        },
        {
          title: '设备ID',
          dataIndex: 'equipmentID',
          key: 'equipmentID',
          ellipsis: true,
          width: '20%'
        },
        {
          title: '请求次数',
          dataIndex: 'counts',
          key: 'counts',
          width: '10%'
        },
        {
          title: '激活时间',
          dataIndex: 'date',
          key: 'date',
          width: '20%'
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          scopedSlots: { customRender: 'operate' },
          width: '20%'
        }
      ],
      tabData: [
        {
          key: 1,
          memberID: '14343245432',
          equipmentID: '83848434398',
          counts: '200',
          date: '2019-12-08',
        },
        {
          key: 2,
          memberID: '143243243244',
          equipmentID: '83848434398',
          counts: '200',
          date: '2019-12-08',
        },
        {
          key: 3,
          memberID: '324324324321',
          equipmentID: '83848434398',
          counts: '200',
          date: '2019-12-08',
        },
      ],
    }
  },
  methods: {
    // 点击查询
    search() { },
    // 点击查看用户 详情信息
    goDetail(record) {
      this.$emit('onChange')
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.container {
  .btn {
    width: 90px;
    font-weight: 500;
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>