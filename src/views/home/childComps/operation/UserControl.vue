/* 用户管理 */
<template>
  <div class="wrapper" >
    <transition name="slide-fade" v-if="!isChange">
      <User @onChange="onChange" />
    </transition>
    <transition name="slide-fade" v-else="isChange">
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
// .slide-fade-enter-active,
// .slide-fade-leave-active {
//   transition: all 0.2s ease;
// }

.slide-fade-enter,
.slide-fade-leave-to {
  // transform: translate(1200px);
  opacity: 0;
}
</style>