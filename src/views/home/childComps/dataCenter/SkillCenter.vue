<template>
  <div class="wrapper">
    <TabsNav :indey="currentIndex" @onChange="onChange" class="tabs_nav">
      <span class="top" slot="top">技能数据</span>
      <span slot="center">技能问答</span>
    </TabsNav>

    <SkillData v-if="currentIndex == 0" class="Margin_left" />
    <SkillAnswer v-else-if="currentIndex == 1" class="Margin_left" />
  </div>
</template>

<script>
import SkillData from '@/components/content/skillCenterChild/SkillData'
import SkillAnswer from '@/components/content/skillCenterChild/SkillAnswer'

import TabsNav from '@/components/content/tabsNav/TabsNav'

export default {
  components: {
    TabsNav,
    SkillData,
    SkillAnswer
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  created() {
    if (sessionStorage.getItem('tabsIndex')) return
    this.currentIndex = JSON.parse(sessionStorage.getItem('tabsIndex'));
  },
  methods: {
    onChange(index) {
      this.currentIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
</style>