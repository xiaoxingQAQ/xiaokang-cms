/* 菜单管理 */
<template>
  <div>
    <!-- card 1 -->
    <Card class="card_1">
      <span slot="leftTitle">通话设置</span>
      <div class="main" slot="main">
        <el-row>
          <div class="left">
            <span>使用4G流量</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1"
              :key="index"
              class="switch"
              @click="change_1(index)"
              :class="{ active: currentIndex_1 == index }"
              :disabled="currentIndex_1 == index"
              :loading="loading_1"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
        <el-row>
          <div class="left">
            <span>屏蔽陌生来电</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1"
              :key="index"
              class="switch"
              @click="change_2(index)"
              :class="{ active: currentIndex_2 == index }"
              :disabled="currentIndex_2 == index"
              :loading="loading_2"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
        <el-row>
          <div class="left">
            <span>自动接听来电</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1"
              :key="index"
              class="switch"
              @click="change_3(index)"
              :class="{ active: currentIndex_3 == index }"
              :disabled="currentIndex_3 == index"
              :loading="loading_3"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
      </div>
    </Card>

    <!-- card 2 -->
    <Card class="card_2">
      <span slot="leftTitle">屏幕设置</span>
      <div class="main" slot="main">
        <el-row>
          <div class="left">
            <span>免打扰时段</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_2_a"
              :key="index"
              class="switch"
              @click="change_4(index)"
              :class="{ active: currentIndex_4 == index }"
              :disabled="currentIndex_4 == index"
              :loading="loading_4"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="25">
          <div class="left">
            <span>屏幕亮度</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_2_b"
              :key="index"
              class="switch"
              @click="change_5(index)"
              :class="{ active: currentIndex_5 == index }"
              :disabled="currentIndex_5 == index"
              :loading="loading_5"
            >
              {{ item.title }}
            </a-button>
          </div>
          </el-col>
          <el-col :span="25">
          <div class="left">
            <span>屏保模式</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_2_c"
              :key="index"
              class="switch"
              @click="change_6(index)"
              :class="{ active: currentIndex_6 == index }"
              :disabled="currentIndex_6 == index"
              :loading="loading_6"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-col>
        </el-row>
      </div>
    </Card>

    <!-- card 3-->
    <Card class="card_2">
      <span slot="leftTitle">“稍后提醒”再响间隔（分钟）</span>
      <div class="main" slot="main">
        <el-row>
          <div class="left">
            <span>稍后再响间隔</span></span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_3"
              :key="index"
              class="switch"
              @click="change_7(index)"
              :class="{ active: currentIndex_7 == index }"
              :disabled="currentIndex_7 == index"
              :loading="loading_7"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

export default {
  components: {
    Card,
  },
  data() {
    return {
      loading_1: false,
      loading_2: false,
      loading_3: false,
      loading_4: false,
      loading_5: false,
      loading_6: false,
      loading_7: false,
      currentIndex_1: 0,
      currentIndex_2: 0,
      currentIndex_3: 0,
      currentIndex_4: 0,
      currentIndex_5: 0,
      currentIndex_6: 0,
      currentIndex_7: 0,
      arr_1: [
        { id: 1, title: '是' },
        { id: 2, title: '否' },
      ],
      arr_2_a: [
        { id: 1, title: '20:00-06:00' },
        { id: 2, title: '关闭' },
      ],
      arr_2_b: [
        { id: 1, title: '正常' },
        { id: 2, title: '高亮' },
        { id: 3, title: '护眼' },
      ],
      arr_2_c: [
        { id: 1, title: '日历' },
        { id: 2, title: '相册' },
        { id: 3, title: '随机' },
      ],
      arr_3: [
        { id: 1, title: '1分钟' },
        { id: 2, title: '5分钟' },
        { id: 3, title: '10分钟' },
        { id: 4, title: '15分钟' },
        { id: 5, title: '20分钟' },
        { id: 6, title: '25分钟' },
        { id: 7, title: '30分钟' },
      ]
    }
  },
  methods: {
    change_1(index) {
      this.currentIndex_1 = index
      this.loading_1 = true
    },
    change_2(index) {
      this.currentIndex_2 = index
      this.loading_2 = true
    },
    change_3(index) {
      this.currentIndex_3 = index
      this.loading_3 = true
    },
    change_4(index) {
      this.currentIndex_4 = index
      this.loading_4 = true
    },
    change_5(index) {
      this.currentIndex_5 = index
      this.loading_5 = true
    },
    change_6(index) {
      this.currentIndex_6 = index
      this.loading_6 = true
    },
    change_7(index) {
      this.currentIndex_7 = index
      this.loading_7 = true
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;

.el-row {
  display: flex;
  align-items: center;

  .left {
    font-weight: 500;
    font-size: 20px;
  }
  .right {
    margin-left: 25px;
  }
}

.switch {
  margin-right: 10px !important;
  width: 100px;
  font-weight: 500;
}

.card_1 {
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.card_2 {
  .el-row:first-child {
    margin-bottom: 20px;
  }
  .el-col {
    display: flex;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}

.active {
  color: #fff !important;
  background-color: @color1 !important;
  border: transparent !important;
}
</style>