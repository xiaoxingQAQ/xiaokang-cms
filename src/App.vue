<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
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
  transition: all 0.6s ease;
  opacity: 0.8;
}
.slide-fade-leave-active {
  transition: all 0.6s ease-in-out;
  opacity: 0.3;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate(-80px);
  opacity: 0.1;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
