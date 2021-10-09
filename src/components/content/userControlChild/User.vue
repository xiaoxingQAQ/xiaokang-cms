<template>
  <div class="wrapper">
    <!-- <Card>
      <span slot="leftTitle">用户选择</span>
      <div slot="main">
        <a-form-model
          layout="inline"
          :model="SearchForm"
          @submit="onSearch"
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
    </Card> -->

    <Card>
      <span slot="leftTitle">用户列表</span>
      <div slot="main">
        <DataRow @onChange="getUserList" @Change="" types="string"></DataRow>

        <!-- 表格 -->
        <a-table
          :loading="loading"
          :columns="columns"
          :data-source="tabData"
          :pagination="true"
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

import { getUserList, getActive } from '@/network/home';
import { getDate } from '@/utils/getDate'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Card,
    DataRow
  },
  data() {
    return {
      loading: false,
      // 搜索表单对象
      // SearchForm: {
      //   memberID: '',
      //   equipmentID: '',
      //   startdate: '',
      //   enddate: '',
      //   pageIndex: '1',
      //   pageSize: '9999999',
      // },
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
          dataIndex: 'pubDate',
          key: 'pubDate',
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
      tabData: [],
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    ...mapMutations('user', ['User_ID']),
    // 获取 用户列表数据
    getUserList(index = 0) {
      if (index == 0) {
        this.tabData = []
        this.getActiveRanking()
      } else {
        this.tabData = []
        this.getActivate()
      }
    },
    // 获取 活跃排名数据
    getActiveRanking() {
      let tabData_s = JSON.parse(sessionStorage.getItem('tabData_1'));
      if (tabData_s) {
        if (tabData_s.length != 0) {
          this.tabData = tabData_s
        }
      }
      if (this.tabData.length == 0)
        this.loading = true

      const memberID = '';
      const equipmentID = '';
      const startdate = getDate(-6) + ''
      const enddate = getDate(0) + ''
      const pageIndex = 1;
      const pageSize = 9999999;
      const type = '2';
      const data = {
        equipmentID,
        memberID,
        pageIndex,
        pageSize,
        startdate,
        enddate,
        type
      }
      // 发送请求 获取活跃排名数据
      getUserList(data).then(({ data, code }) => {
        if (code != 1) {
          this.loading = false
          return this.$message.error('获取数据失败')
        }
        data.forEach((item, index) => {
          const key = index;
          const memberID = item.memberID;
          const equipmentID = item.equipmentID;
          const counts = item.counts;
          const pubDate = item.pubDate;
          this.tabData.push({
            key,
            memberID,
            equipmentID,
            counts,
            pubDate
          })
        });
        // 去重
        this.tabData = _.uniqBy(this.tabData, 'memberID')
        this.loading = false
        // 写入本地存储
        sessionStorage.setItem('tabData_1', JSON.stringify(this.tabData))
      })
    },
    // 获取 最新激活数据
    getActivate() {
      let tabData_s = JSON.parse(sessionStorage.getItem('tabData_2'));
      if (tabData_s) {
        if (tabData_s.length != 0) {
          this.tabData = tabData_s
        }
      }
      if (this.tabData.length == 0) this.loading = true

      const memberID = this.memberID;
      const equipmentID = '';
      const startdate = getDate(-7) + ''
      const enddate = getDate(0) + ''
      const pageIndex = 1;
      const pageSize = 10;
      const type = '1';
      const data = {
        equipmentID,
        memberID,
        pageIndex,
        pageSize,
        startdate,
        enddate,
        type
      }

      // 发送请求 获取用户列表数据
      getUserList(data).then(({ data, code }) => {
        if (code != 1) {
          this.loading = false
          return this.$message.error('获取数据失败')
        }
        data.forEach((item, index) => {
          const key = index;
          const memberID = item.memberID;
          const equipmentID = item.equipmentID;
          const counts = item.counts;
          const pubDate = item.pubDate;
          this.tabData.push({
            key,
            memberID,
            equipmentID,
            counts,
            pubDate
          })
        });
        // 去重
        this.tabData = _.uniqBy(this.tabData, 'memberID')
        this.loading = false
        // 写入本地存储
        sessionStorage.setItem('tabData_2', JSON.stringify(this.tabData))
      })
    },
    // 点击查看 用户 详情信息
    goDetail(record) {
      const equipmentID_user = record.equipmentID
      const memberID_user = record.memberID
      this.User_ID(record)

      sessionStorage.setItem('equipmentID_user', JSON.stringify(equipmentID_user))
      sessionStorage.setItem('memberID_user', JSON.stringify(memberID_user))
      this.$emit('onChange')
    },
    // 点击查询
    // onSearch() {
    // },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .btn {
    width: 90px;
    font-weight: 500;
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>