/* 产品运营页面 */
<template>
  <div class="wrapper">
    <!-- 外部卡片 -->
    <div class="el-card el-card box-card is-always-shadow" @click="handle">
      <h1>新建消息推送</h1>
    </div>

    <!-- Dialog 对话框 -->
    <a-modal
      width="800px"
      title="新建消息推送"
      v-model="visible"
      destroyOnClose
      @ok="sbumit"
      @cancel="cancel"
      class="modal"
      cancelText="取消"
      okText="确定"
      :confirmLoading="loading"
    >
      <!-- <a-row>
        <div class="aim">目标：</div>
      </a-row> -->
      <!-- 用户选择 -->
      <a-tabs default-active-key="1">
        <!-- <a-tab-pane key="1" tab="设备别名">
          <a-input
            type="string"
            placeholder="添加设备别名，按Enter键继续"
            @pressEnter="nextStep"
            v-model.trim="facilityValue"
            class="unique"
            size="large"
          />

          <el-tag
            v-for="(item, index) in facilityValueArr"
            :key="item"
            closable
            @close="handleClose(index)"
          >
            {{ item }}
          </el-tag>

          <a-row>
            <br />
            <div class="aim content">推送内容：</div>
          </a-row>
          <a-textarea placeholder="请输入推送内容" :rows="4" />
        </a-tab-pane> -->
        <a-tab-pane key="1" tab="推送所有人" force-render>
          <div class="aim content">推送内容：</div>
          <a-textarea
            v-model="message"
            placeholder="请输入推送内容"
            :rows="4"
            @keyup.enter.native="sbumit"
            :disabled="disabled"
          />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card';

import { addNews } from '@/network/home'
import { mapState } from 'vuex';

export default {
  components: {
    Card
  },
  data() {
    return {
      disabled: false,
      message: '',
      loading: false, // 确定按钮 loading
      visible: false, // 显示 or 隐藏
      // facilityValue: '', // 输入的设备编号value
      // facilityValueArr: [], // 输入的设备编号value 数组
    }
  },
  created() {
    // this.getFacility()
  },
  computed: {
    ...mapState('user', ['memberID'])
  },
  methods: {
    // 点击显示对话框
    handle() {
      this.visible = true
    },
    /* Entenr下一步 */
    // nextStep() {
    //   // 如果input框为空就 返回
    //   if (!this.facilityValue) return;
    //   if (this.facilityValueArr && this.facilityValueArr.length === 6)
    //     return this.$message.warning('最多只能添加6台设备');

    //   this.next();
    // },
    // next() {
    //   this.facilityValueArr.push(this.facilityValue);
    //   this.facilityValueArr = Array.from(new Set(this.facilityValueArr));
    //   // 给本地赋
    //   localStorage.setItem('facilityList', JSON.stringify(this.facilityValueArr));
    //   /* 清空input输入框 */
    //   this.facilityValue = '';
    // },
    // 过去localStorage里面的 设备别名数组
    // getFacility() {
    //   if (!localStorage.getItem('facilityList')) {
    //     // 如果没有
    //     localStorage.setItem('facilityList', '[]');
    //   } else {
    //     // 如果有
    //     this.facilityValueArr = JSON.parse(localStorage.getItem('facilityList'));
    //   }
    // },
    /* 删除对应的参数可选项 */
    // handleClose(index) {
    //   this.facilityValueArr.splice(index, 1);

    //   // 给本地赋值
    //   localStorage.setItem('facilityList', JSON.stringify(this.facilityValueArr));
    // },
    /* 点击确定回调 */
    sbumit() {
      if (!this.message) return this.$message.info('请输入推送内容')

      const memberID = this.memberID;
      const message = this.message;
      const data = {
        memberID,
        message
      }
      this.loading = true
      this.disabled = true
      this.$message.warning('正在推送')
      // 发送请求 添加系统提醒
      addNews(data).then(({ code, data }) => {
        if (code != 0) {
          this.loading = false
          this.disabled = false
          return this.$message.error('推送失败')
        }
        console.log('推送', data);
        this.$message.success('推送成功')
        this.loading = false
        this.message = ''
        this.disabled = false
        this.cancel()
      })
    },
    /* 点击右上角 叉 或 取消按钮 的回调 */
    cancel() {
      // localStorage.removeItem('facilityList');
      // this.facilityValueArr = []
      /* 清空input输入框 */
      // this.facilityValue = '';
      this.message = ''
      this.visible = false
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  .el-card {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 90%;
    padding: 40px 0;
    cursor: pointer;
    h1 {
      color: #00cccc;
      font-weight: 700;
    }
  }
}

.aim {
  padding-left: 2px;
  font-weight: bold;
}
.content {
  padding: 0 0 13px 2px;
  background-color: none;
}
.unique {
  margin-bottom: 5px;
}

::v-deep .ant-tabs-tab {
  font-weight: 500;
}
.el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>