/* 技能管理 */
<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">语音技能</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="data"
          :loading="loading"
          :pagination="false"
        >
          <template slot="switch" slot-scope="text, record, index">
            <a-switch
              :loading="switchLoading"
              :checked="text.checked"
              @change="(checked) => onChange(checked, text, index)"
            />
          </template>
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getSkillList, changeSwitch } from '@/network/home'
import { mapState } from 'vuex'

export default {
  components: {
    Card,
  },
  data() {
    return {
      switchLoading: false,
      loading: false, // 加载动画
      columns: [
        {
          title: '技能',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '开关',
          key: 'switch',
          scopedSlots: { customRender: 'switch' },
        },
      ],
      data: [],
    }
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const memberID = this.memberID
      const data = {
        memberID
      }
      this.loading = true
      this.cancel()
      // 发送请求
      getSkillList(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('获取数据失败')

        res.data.forEach((item, index) => {
          let key = index
          let title = item.title
          let description = item.description
          let checked = item.enable == '1' ? true : false
          let id = item.id
          this.data.push({
            key,
            title,
            description,
            checked,
            id
          })
        });
        this.loading = false
      })
    },
    onChange(checked, text, index) {
      const memberID = this.memberID;
      let id = text.id
      let enable = checked ? '1' : '0';
      console.log('enable: ', enable);
      const data = {
        id,
        memberID,
        enable
      }

      this.switchLoading = true
      this.cancel()
      // 发送请求
      changeSwitch(data).then(res => {
        if (!res) return
        if (res.code != 0) return this.$message.error('关闭失败')

        this.$message.success({
          message: res.data,
          offset: 46
        })
        this.switchLoading = false

        this.data.forEach((item, indey) => {
          if (index == indey) {
            item.checked = !item.checked
          }
        });
      })
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  ::v-deep .ant-table-thead > tr > th {
    text-align: center;
    color: #fff;
    background-color: #73c4fc;
  }
  ::v-deep .ant-table-row-level-0 {
    text-align: center;
  }
  ::v-deep .ant-table-row-level-0:nth-child(2n) {
    background-color: #fcae7312;
  }
}
</style>