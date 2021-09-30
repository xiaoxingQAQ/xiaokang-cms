<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created() {
    this.Init_User()
  },
  methods: {
    ...mapMutations('user', ['Init_User']),    
  },
}
</script>

<style lang="less">
</style>
