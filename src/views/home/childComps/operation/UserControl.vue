/* 用户管理 */
<template>
  <div class="wrapper" >
    <transition name="fade-transform" mode="out-in" v-if="!isChange">
      <User @onChange="onChange" />
    </transition>
    <transition name="fade-transform" mode="out-in" v-else="isChange">
      <UserDetail @onChange="onChange" />
    </transition>
  </div>
</template>

<script>
import User from '@/components/content/userControlChild/User'
import UserDetail from '@/components/content/userControlChild/UserDetail'


export default {
  components: {
    User,
    UserDetail
  },
  created() {

  },
  data() {
    return {
      isChange: false,
    }
  },
  methods: {
    onChange() {
      this.isChange = !this.isChange
    },
  },
}
</script>

<style lang="less" scoped>
// 动画
.slide-fade-enter-active {
  transition: all 0.3s ease-in;
  opacity: 0.1;
}
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  opacity: 0.1;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0.1;
}
</style>