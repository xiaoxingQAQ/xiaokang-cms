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
</style>
