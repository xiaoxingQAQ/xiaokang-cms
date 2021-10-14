<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">用户选择</span>
      <div slot="main">
        <a-form-model
          layout="inline"
          :model="SearchForm"
          @submit="onSearch"
          @submit.native.prevent
        >
          <a-form-model-item>
            <a-input
              v-model="SearchForm.memberID_user"
              placeholder="用户MemberID"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-input
              v-model="SearchForm.equipmentID_user"
              placeholder="设备编码"
            >
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
      SearchForm: {
        memberID_user: '',
        equipmentID_user: '',
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
    this.setData()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    ...mapMutations('user', ['User_ID']),
    // 页面加载获取 本地数据
    setData() {
      let User = JSON.parse(sessionStorage.getItem('User'));
      console.log('User: ', User);
      if (User instanceof Object) {
        this.tabData.push(User)
      }
    },
    // 获取 用户列表数据
    getUserList(index = 0) {
      if (index == 0) {
        this.tabData = []
        // 获取 活跃排名数据
        this.searchUser('2')
      } else {
        this.tabData = []
        // 获取 最新激活数据
        this.searchUser('1')
      }
    },
    // 查找用户
    searchUser(indey) {
      if (this.tabData.length == 0) this.loading = true

      const memberID = this.SearchForm.memberID_user;
      const equipmentID = this.SearchForm.equipmentID_user;

      if (indey == '0') {
        memberID = '';
        equipmentID = '';
        indey = ''
      }

      const startdate = getDate(-6) + ''
      const enddate = getDate(0) + ''
      const pageIndex = 1;
      const pageSize = 10;
      const type = indey;
      const data = {
        equipmentID,
        memberID,
        pageIndex,
        pageSize,
        startdate,
        enddate,
        type
      }
      this.cancel()
      // 发送请求 获取活跃排名数据 
      getUserList(data).then(({ data, code }) => {
        if (code != 0) {
          this.loading = false
          return this.$message.error('获取数据失败')
        }
        data.records.forEach((item, index) => {
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
      })
    },
    // 点击查看 用户 详情信息
    goDetail(record) {
      this.User_ID(record)
      this.$emit('onChange')
      // 写入本地存储
      sessionStorage.setItem('User', JSON.stringify(record))
    },
    // 点击查询
    onSearch() {
      if (this.SearchForm.memberID_user == '') return this.$message.warning('请完善表单')
      if (this.SearchForm.equipmentID_user == '') return this.$message.warning('请完善表单')
      this.searchUser('0')
    },
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