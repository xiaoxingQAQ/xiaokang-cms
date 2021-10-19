<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created() {
    this.Init_User()
    this.Init_Edition_Info()
  },
  methods: {
    ...mapMutations('user', ['Init_User']),
    ...mapMutations('edition', ['Init_Edition_Info'])
  },
}
</script>

<style lang="less">
// 动画
.slide-fade-enter-active {
  transition: all 0.6s ease-in;
  opacity: 0.1;
}
.slide-fade-leave-active {
  transition: all 0.6s ease-in-out;
  opacity: 0.1;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate(-50px);
  opacity: 0.1;
}
</style>
