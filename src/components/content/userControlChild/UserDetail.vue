<template>
  <div class="wrapper" v-if="isShow">
    <!-- 返回 -->
    <el-row class="back" :gutter="10">
      <el-col :span="6">
        <i class="el-icon-back" @click="goBack">&nbsp返回</i>
      </el-col>
    </el-row>
    <!-- 用户信息 -->
    <Card class="card">
      <span slot="leftTitle">用户信息</span>
      <main slot="main">
        <el-form :model="{}">
          <div class="left">
            <el-form-item label="用户账号：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
            <el-form-item label="激活日期：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
            <el-form-item label="系统版本：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
          </div>

          <div class="right">
            <el-form-item label="联系方式：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
            <el-form-item label="设备编码：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
            <el-form-item label="所属地区：">
              <el-input disabled v-model="userForm"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </main>
    </Card>
    <!-- 导航菜单 -->
    <el-row class="nav">
      <a-button
        v-for="(item, index) in dateArr"
        :key="index"
        @click="changeTable(index, item)"
        class="changeBtn"
        :class="{ active: currentIndex == index }"
        >{{ item }}</a-button
      >
    </el-row>

    <!-- 数据表格 -->
    <Card class="card_2">
      <span slot="leftTitle">{{ title }}</span>

      <!-- 体征数据的右侧按钮 -->
      <div v-show="currentIndex == 0" slot="rightTitle">
        <a-button
          v-for="(item, index) in dataArr_2"
          :key="index"
          @click="changeData(index)"
          class="changeBtn"
          :class="{ active: currentIndex_2 == index }"
          >{{ item }}</a-button
        >
      </div>
      <!-- 标签管理的右侧按钮 -->
      <div v-show="currentIndex == 3" slot="rightTitle">
        <el-button type="primary" @click="AddDialogVisible = true"
          >新增标签</el-button
        >
        <el-button type="danger" @click="clearContent">删除标签</el-button>
      </div>

      <div slot="main">
        <!-- 自定义时间 -->
        <DateRow v-show="currentIndex !== 3" class="selectDate" />
        <!-- 数据表格 -->
        <Table_1 v-show="currentIndex == 0" />
        <Table_2 v-show="currentIndex == 1" />
        <Table_3 v-show="currentIndex == 2" />
        <Table_4 v-show="currentIndex == 3" />
      </div>
    </Card>
    <!-- 新建的Dialog -->
    <el-dialog
      class="addDialog"
      title="新增标签"
      center
      :visible.sync="AddDialogVisible"
    >
      <main>
        <span>问题：</span>
        <el-input
          v-model="message"
          placeholder="请输入问题"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
        ></el-input>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import DateRow from '@/components/content/dateRow/DateRow'
import Table_1 from '@/components/content/userControlChild/table/Table_1'
import Table_2 from '@/components/content/userControlChild/table/Table_2'
import Table_3 from '@/components/content/userControlChild/table/Table_3'
import Table_4 from '@/components/content/userControlChild/table/Table_4'

export default {
  components: {
    Card,
    DateRow,
    Table_1,
    Table_2,
    Table_3,
    Table_4
  },
  data() {
    return {
      message: '', // 问题的 input值
      AddDialogVisible: false,
      title: '体征数据',
      dataArr_2: ['血压', '血糖'],
      currentIndex_2: 0,
      currentIndex: 0,
      dateArr: ['体征数据', '近期用药', '常用技能', '标签管理'],
      userForm: '11', // 用户表单对象
      isShow: true,
    }
  },
  methods: {
    // 返回上一级
    goBack() {
      this.isShow = false
      this.$emit('onChange')
    },
    // 点击展示不同的表格
    changeTable(index, title) {
      this.currentIndex = index
      this.title = title
    },
    // 点击切换 血压 or 血糖
    changeData(index) {
      this.currentIndex_2 = index
    },
    // 点击删除 删除选中的表格内容
    clearContent() { },
    // 新增标签Dialog 点击 确定
    submit() {
      if (!this.message) return this.$message.info('问题不能为空')
      
    },
    // 点击取消按钮 关闭对话框
    closeAddDialog() {
      this.message = '';
      this.AddDialogVisible = false
    }
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
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
  .card {
    main {
      .el-form {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-form-item {
          display: flex;
          font-weight: 500;
          .el-input {
            width: 300px;
          }
        }

        ::v-deep .el-form-item__label {
          color: #999;
        }
      }
    }
  }

  .nav {
    margin-bottom: 25px;
    .changeBtn {
      margin-right: 10px !important;
      width: 90px;
      font-weight: 500;
    }
  }

  .card_2 {
    .changeBtn {
      margin-right: 10px !important;
      width: 90px;
      font-weight: 500;
    }
    .selectDate {
      margin-bottom: 30px !important;
    }
  }

  .addDialog {
    font-weight: 500;
    main {
      padding-left: 24px;
      display: flex;
      span {
        width: 50px;
      }
    }
  }

  .active {
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
}
</style>