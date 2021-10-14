/* 客服信息 */
<template>
  <div>
    <Card>
      <span slot="leftTitle">客服信息</span>

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
      
    }
  },
  created() {
    
  },
  methods: {
    // 获取客服信息
  },
}
</script>

<style lang="less" scoped>

</style>