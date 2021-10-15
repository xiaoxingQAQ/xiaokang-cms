/* 客服信息 */
<template>
  <div>
    <Card>
      <span slot="leftTitle">客服信息</span>
      <div slot="main">
        <a-table
          :columns="columns"
          :data-source="tabData"
          :loading="loading"
          :pagination="false"
        >
          <template slot="image" slot-scope="text, record, index">
            <div>
              <img style="width: 70%" :src="text.imageUrl" alt="" />
            </div>
          </template>
          <template slot="edit" slot-scope="text, record, index"> </template>
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import { getServiceInfo } from '@/network/home'

export default {
  components: {
    Card,
  },
  data() {
    return {
      loading: false, // 加载动画
      columns: [
        {
          title: '图片',
          key: 'image',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: '客服名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
        },
        {
          title: '客服邮箱',
          dataIndex: 'serviceMail',
          key: 'serviceMail',
        },
        {
          title: '客服电话',
          dataIndex: 'servicePhone',
          key: 'servicePhone',
        },
        {
          title: '工作时间',
          dataIndex: 'serviceTime',
          key: 'serviceTime',
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: '编辑',
          key: 'edit',
          scopedSlots: { customRender: 'edit' },
        },
      ],
      tabData: [],
    }
  },
  created() {
    this.getServiceInfo()
  },
  methods: {
    // 获取客服信息
    getServiceInfo() {
      this.loading = true
      const data = {};
      getServiceInfo(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('获取数据失败')

        data.forEach((item, index) => {
          const key = index;
          const id = item.id;
          const imageUrl = item.imageUrl;
          const serviceName = item.serviceName
          const serviceMail = item.serviceMail; // 客服电子邮件
          const servicePhone = item.servicePhone; // 客服手机号
          const serviceTime = item.serviceTime; // 工作时间
          this.tabData.push({
            key,
            id,
            imageUrl,
            serviceName,
            serviceMail,
            servicePhone,
            serviceTime
          })
          this.loading = false
        });
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>