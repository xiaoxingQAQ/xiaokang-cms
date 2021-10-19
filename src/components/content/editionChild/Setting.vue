<template>
  <div>
    <!-- 返回 -->
    <el-row class="back" :gutter="10">
      <el-col :span="6">
        <i class="el-icon-back" @click="goBack">&nbsp返回</i>
      </el-col>
    </el-row>
    <!-- card 1 -->
    <Card class="card_1">
      <span slot="leftTitle">通话设置</span>
      <div class="main" slot="main">
        <el-row>
          <div class="left">
            <span>可添加联系人的数量</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1_a"
              :key="index"
              class="switch"
              type="primary"
              @click="change_1()"
              :class="{ active: currentIndex_1 == index }"
              :disabled="index == 0"
              :loading="loading_1"
            >
              {{ item.title }}
            </a-button>
          </div>
        </el-row>
        <el-row>
          <div class="left">
            <span>通话时长</span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1_b"
              :key="index"
              type="primary"
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
            <span>留言数量</span></span>
          </div>
          <div class="right">
            <a-button
              v-for="(item, index) in arr_1_c"
              :key="index"
               type="primary"
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

  <!-- 修改可添加联系人的数量 -->
  <el-dialog
    title="提示"
    :visible.sync="visible_1"
    width="30%"
    :before-close="handleClose_1">
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible_1 = false">取 消</el-button>
      <el-button type="primary" @click="visible_1 = false">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 修改通话时长 -->
   <el-dialog
    title="提示"
    :visible.sync="visible_2"
    width="30%"
    :before-close="handleClose_2">
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible_2 = false">取 消</el-button>
      <el-button type="primary" @click="visible_2 = false">确 定</el-button>
    </span>
  </el-dialog>

  <!-- 修改留言数量 -->
   <el-dialog
    title="提示"
    :visible.sync="visible_3"
    width="30%"
    :before-close="handleClose_3">
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible_3 = false">取 消</el-button>
      <el-button type="primary" @click="visible_3 = false">确 定</el-button>
    </span>
  </el-dialog>
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
      visible_1: false,
      visible_2: false,
      visible_3: false,
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
      arr_1_a: [
        { id: 1, title: '100' },
        { id: 2, title: '修改', },
      ],
      arr_1_b: [
        { id: 1, title: '200' },
        { id: 2, title: '修改', },
      ],
      arr_1_c: [
        { id: 1, title: '100' },
        { id: 2, title: '修改', },
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
    // 返回上一级
    goBack() {
      this.$emit('onChange')
    },
    // 修改可添加联系人的数量
    change_1() {
      this.visible_1 = true
    },
    handleClose_1() {

    },

    // 修改通话时长
    change_2(index) {
      this.visible_2 = true
    },
    handleClose_2() { },

    // 修改留言数量
    change_3(index) {
      this.visible_3 = true
    },
    handleClose_3() { },


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

.back {
  i {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
  }
  i:hover {
    color: #409eff;
  }
}
// 内容区
.el-row {
  display: flex;
  align-items: center;

  .left {
    font-weight: 500;
    font-size: 18px;
  }
  .right {
    margin-left: 25px;
  }
}

.switch {
  margin-right: 10px !important;
  margin-bottom: 5px;
  width: 100px;
  font-weight: 500;
  overflow: hidden;
}

.button {
  margin-right: 10px !important;
  margin-bottom: 5px;
  width: 100px;
  font-weight: 500;
  overflow: hidden;
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