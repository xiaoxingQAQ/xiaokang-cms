<template>
  <div class="wrapper">
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
        <el-form v-model="userForm">
          <div class="left">
            <el-form-item label="用户名称：">
              <el-input disabled v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="激活日期：">
              <el-input disabled v-model="userForm.pubDate"></el-input>
            </el-form-item>
            <el-form-item label="系统版本：">
              <el-input disabled v-model="userForm.hardVersion"></el-input>
            </el-form-item>
          </div>

          <div class="right">
            <el-form-item label="联系方式：">
              <el-input disabled v-model="userForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="设备编码：">
              <el-input disabled v-model="userForm.mask"></el-input>
            </el-form-item>
            <el-form-item label="所属地区：">
              <el-input disabled v-model="userForm.cityIName"></el-input>
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
        :disabled="currentIndex == index"
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
          :disabled="currentIndex_2 == index"
          :class="{ active: currentIndex_2 == index }"
          >{{ item }}</a-button
        >
      </div>
      <!-- 标签管理的右侧按钮 -->
      <div v-show="currentIndex == 3" slot="rightTitle">
        <el-button type="primary" @click="showDialog">新增标签</el-button>
        <el-button type="danger" @click="clearContent" :loading="loading_2"
          >删除标签</el-button
        >
      </div>

      <div slot="main">
        <!-- 自定义时间 -->
        <DateRow
          @onChange="getBodyData_1"
          @Change="getBodyData_2"
          v-if="currentIndex === 0"
          class="selectDate"
        />
        <DateRow
          @onChange="getRecentDrug_1"
          @Change="getRecentDrug_2"
          v-else-if="currentIndex === 1"
          class="selectDate"
        />
        <DateRow
          @onChange="getCommonSkill_1"
          @Change="getCommonSkill_2"
          v-else-if="currentIndex === 2"
          class="selectDate"
        />
        <!-- 数据表格 -->
        <Table_1
          ref="Table_1"
          :Table_1="Table_1"
          :Table_1_a="Table_1_a"
          v-show="currentIndex == 0"
        />
        <Table_2 ref="Table_2" :Table_2="Table_2" v-show="currentIndex == 1" />
        <Table_3 ref="Table_3" :Table_3="Table_3" v-show="currentIndex == 2" />
        <Table_4 ref="Table_4" :Table_4="Table_4" v-show="currentIndex == 3" />
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
        <span class="problem">名称：</span>
        <el-input
          v-model="message"
          placeholder="请输入标签名称"
          autocomplete="off"
          ref="input"
          @keyup.enter.native="submit"
        ></el-input>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" :loading="loading_1" @click="submit"
          >确 定</el-button
        >
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

import {
  getUserDetail,
  getBodyData,
  getRecentDrug,
  getCommonSkill,
  getLabeList,
  addLabeList,
  deleteLabeList
} from '@/network/home'
import { getDate } from '@/utils/getDate'
import { mapState } from 'vuex'

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
      loading_1: false,
      loading_2: false,
      Table_1: [],
      Table_1_a: [],
      Table_2: [],
      Table_3: [],
      Table_4: [],
      message: '', // 问题的 input值
      AddDialogVisible: false,
      title: '体征数据',
      dataArr_2: ['血压', '血糖'],
      currentIndex_2: 0, // 血压，血糖
      currentIndex: 0,
      dateArr: ['体征数据', '近期用药', '常用技能'],
      userForm: {}, // 用户表单对象
    }
  },
  created() {
    this.getUserDetail()
  },
  mounted() {
    this.getBodyData_1()
  },
  computed: {
    ...mapState('user', ['equipmentID_user', 'memberID_user'])
  },
  methods: {
    // 获取 用户信息数据
    getUserDetail() {
      const memberID = this.memberID_user;
      console.log('memberID: ', memberID);
      const equipmentID = this.equipmentID_user;
      console.log('equipmentID: ', equipmentID);

      const data = {
        memberID,
        equipmentID
      }
      this.cancel()
      // 发送请求 
      getUserDetail(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('获取数据失败')
        let username = data.username;
        let pubDate = data.pubDate;
        let hardVersion = data.hardVersion;
        let phone = data.phone;
        let mask = data.mask;
        let cityIName = data.cityIName
        this.userForm = {
          username,
          pubDate,
          hardVersion,
          phone,
          mask,
          cityIName
        }
      })
    },
    // 获取 用户体征数据
    getBodyData_1(types = 0) {
      this.Table_1 = []
      this.$refs.Table_1.$data.loading = true
      const memberID = this.memberID_user;
      switch (types) {
        case 0:
          types = 7
          break;
        case 1:
          types = 14
          break;
        case 2:
          types = 30
          break;
      }
      const startdate = getDate(-(types - 1)) + ''
      const day = types
      const index = this.currentIndex_2
      let type;
      switch (index) {
        case 0:
          type = 'pressure'
          this.$refs.Table_1.$data.isChange = false
          const data_1 = {
            memberID,
            startdate,
            type,
            day
          }
          this.getBodyData_a(data_1)
          break;
        case 1:
          type = 'sugar'
          this.$refs.Table_1.$data.isChange = true
          const data_2 = {
            memberID,
            startdate,
            type,
            day
          }
          this.getBodyData_b(data_2)
          break;
      }
    },
    getBodyData_2(types, start_date) {
      this.$refs.Table_1.$data.loading = true
      const memberID = this.memberID_user;
      const startdate = start_date

      const day = types
      const index = this.currentIndex_2
      let type = null;
      switch (index) {
        case 0:
          type = 'pressure'
          this.$refs.Table_1.$data.isChange = false
          const data_1 = {
            memberID,
            startdate,
            type,
            day
          }
          this.getBodyData_a(data_1)
          break;
        case 1:
          type = 'sugar'
          this.$refs.Table_1.$data.isChange = true
          const data_2 = {
            memberID,
            startdate,
            type,
            day
          }
          this.getBodyData_b(data_2)
          break;
      }
    },
    // 获取体征数据
    getBodyData_a(data_1) {
      this.Table_1 = []
      // 发送请求 获取 用户体征数据
      getBodyData(data_1).then(({ data, code }) => {
        if (code != 0) {
          this.$refs.Table_1.$data.loading = false
          return this.$message.warning('暂无体征数据')
        }
        // 如果有
        data.forEach((item, index) => {
          let key = index
          let systolic = item.systolic + 'mmHg'; // 收缩压
          let diastolic = item.diastolic + 'mmHg'; // 舒张压
          let sequenceNo = item.sequenceNo;
          let statusID = item.statusID;
          let time = item.time
          this.Table_1.push({
            key,
            systolic,
            diastolic,
            sequenceNo,
            statusID,
            time
          })
        });

        this.$refs.Table_1.$data.loading = false
      })
    },
    getBodyData_b(data_2) {
      this.Table_1_a = []
      // 发送请求 获取 用户体征数据
      getBodyData(data_2).then(({ data, code }) => {
        if (code != 0) {
          this.$refs.Table_1.$data.loading = false
          return this.$message.warning('暂无体征数据')
        }
        console.log(data);
        // // 如果有
        data.forEach((item, index) => {
          let key = index;
          let avgAfterSugar = item.avgAfterSugar + 'mmol/L'; // 餐后血糖平均值
          let after = item.after + 'mmol/L'; // 餐后血糖
          let afterRemindNum = item.afterRemindNum // 餐后的状态码
          let afterRemindTitle = item.afterRemindTitle // 餐后 状态提醒

          let avgEmptySugar = item.avgEmptySugar + 'mmol/L' // 空腹血糖平均值腹
          let empty = item.empty + 'mmol/L' // 空腹的血糖
          let emptyRemindNum = item.emptyRemindNum // 空腹的状态码

          let remindNum = item.remindNum; // 整体状态
          this.Table_1_a.push({
            key,
            avgEmptySugar,
            avgAfterSugar,
            empty,
            after,
            afterRemindNum,
            emptyRemindNum,
            afterRemindTitle,
            remindNum
          })
        });

        this.$refs.Table_1.$data.loading = false
      })
    },
    // 获取 用户用药数据
    getRecentDrug_1(type = 0) {
      this.Table_2 = []
      this.$refs.Table_2.$data.loading = true
      const memberID = this.memberID_user;
      const pageIndex = 1;
      const pageSize = 999999;
      switch (type) {
        case 0:
          type = 7
          break;
        case 1:
          type = 14
          break;
        case 2:
          type = 30
          break;
      }
      const startdate = getDate(-(type - 1)) + ''
      let day = type

      const data = {
        memberID,
        startdate,
        day,
        pageIndex,
        pageSize
      }
      this.cancel()
      // 发送请求 获取用户用药数据
      getRecentDrug(data).then(({ data, code }) => {
        if (code != 0) {
          this.$refs.Table_2.$data.loading = false
          return this.$message.warning('该用户暂无用药数据')
        }
        this.$refs.Table_2.$data.pagination.total = data.total
        // 如果有
        data.records.forEach((item, index) => {
          const key = index;
          const name = item.name;
          const piecesOneTime = item.piecesOneTime;
          const planTime = item.planTime;
          this.Table_2.push({
            key,
            name,
            piecesOneTime,
            planTime
          })
        });
        this.$refs.Table_2.$data.loading = false
      })
    },
    getRecentDrug_2(type, start_date) {
      this.Table_2 = []
      this.$refs.Table_2.$data.loading = true
      const memberID = this.memberID_user;
      const pageIndex = 1;
      const pageSize = 999999;
      let startdate = start_date
      let day = type

      const data = {
        memberID,
        startdate,
        day,
        pageIndex,
        pageSize
      }
      this.cancel()
      // 发送请求 获取用户用药数据
      getRecentDrug(data).then(({ data, code }) => {
        if (code != 0) {
          this.$refs.Table_2.$data.loading = false
          return this.$message.warning('该用户暂无用药数据')
        }
        this.$refs.Table_2.$data.pagination.total = data.total
        // 如果有
        data.records.forEach((item, index) => {
          const key = index;
          const name = item.name;
          const piecesOneTime = item.piecesOneTime;
          const planTime = item.planTime;
          this.Table_2.push({
            key,
            name,
            piecesOneTime,
            planTime
          })
        });
        this.$refs.Table_2.$data.loading = false
      })
    },
    // 获取 用户常用技能
    getCommonSkill_1(type = 0) {
      this.Table_3 = []
      this.$refs.Table_3.$data.loading = true
      const memberID = this.memberID_user;
      const pageIndex = 1;
      const pageSize = 10;
      switch (type) {
        case 0:
          type = 7
          break;
        case 1:
          type = 14
          break;
        case 2:
          type = 30
          break;
      }
      let startdate = getDate(-(type - 1)) + ''
      let day = type

      const data = {
        memberID,
        startdate,
        day,
        pageIndex,
        pageSize
      }
      this.cancel()
      // 发送请求 获取 用户常用技能
      getCommonSkill(data).then(({ data, code }) => {
        console.log(data);
        if (code != 0) {
          this.$refs.Table_3.$data.loading = false
          return this.$message.warning('该用户暂无技能数据')
        }
        // 如果有
        data.forEach((item, index) => {
          const key = index;
          const title = item.title;
          const counts = item.counts;
          const time = item.time;
          this.Table_3.push({
            key,
            title,
            counts,
            time
          })
        });
        this.$refs.Table_3.$data.loading = false
      })
    },
    getCommonSkill_2(type, start_date) {
      this.Table_3 = []
      this.$refs.Table_3.$data.loading = true
      const memberID = this.memberID_user;
      const pageIndex = 1;
      const pageSize = 9999999;
      let startdate = start_date
      let day = type

      const data = {
        memberID,
        startdate,
        day,
        pageIndex,
        pageSize
      }
      this.cancel()
      // 发送请求 获取 用户常用技能
      getCommonSkill(data).then(({ data, code }) => {
        if (code != 0) {
          this.$refs.Table_3.$data.loading = false
          return this.$message.warning('该用户暂无技能数据')
        }
        // 如果有
        data.forEach((item, index) => {
          const key = index;
          const title = item.title;
          const counts = item.counts;
          const time = item.time;
          this.Table_2.push({
            key,
            title,
            counts,
            time
          })
        });
        this.$refs.Table_3.$data.loading = false
      })
    },
    // 返回上一级
    goBack() {
      this.$emit('onChange')
    },
    // 点击展示不同的表格
    changeTable(index, title) {
      this.$bus.$emit('changeType')
      this.currentIndex = index
      this.title = title
      switch (index) {
        case 0:
          this.getBodyData_1()
          break;
        case 1:
          this.getRecentDrug_1()
          break;
        case 2:
          this.getCommonSkill_1()
          break;
        case 3:
          this.getLabeList()
          break;
      }
    },
    // 用户体征数据 点击切换 血压 or 血糖
    changeData(index) {
      this.currentIndex_2 = index
      this.$bus.$emit('changeType')
      this.getBodyData_1()
    },
    showDialog() {
      this.AddDialogVisible = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    // 获取 用户标签列表
    getLabeList() {
      this.Table_4 = []
      this.$refs.Table_4.$data.loading = true
      const memberID = this.memberID_user
      const data = {
        memberID,
      }
      this.cancel()
      // 发送请求 获取 用户标签列表
      getLabeList(data).then(({ data, code }) => {
        console.log(data);
        if (code != 0) {
          this.$refs.Table_4.$data.loading = false
          return this.$message.warning('暂无标签数据')
        }
        data.forEach((item, index) => {
          const key = index;
          const id = item.id
          const name = item.name;
          const counts = item.counts
          this.Table_4.unshift({
            key,
            id,
            name,
            counts
          })
        })
        this.$refs.Table_4.$data.loading = false
      })
    },
    // 点击删除 删除选中的表格内容
    clearContent() {
      if (this.$refs.Table_4.$data.selectedRows.length == 0) {
        return this.$message.info('请选择您要删除的标签')
      }

      const arr = [];
      this.$refs.Table_4.$data.selectedRows.forEach(item => {
        arr.push(item.id)
      })
      const id = arr.join(',')
      console.log(id);
      const data = {
        id
      }
      this.cancel()
      // 发送请求 删除对应的
      deleteLabeList(data).then(res => {
        console.log('res: ', res);
        if (!res) return
        if (res.code != 0) return this.$message.error('删除失败')

        // 提示
        this.$message.success('删除成功')
        this.$refs.Table_4.$data.selectedRows.forEach(item => {
          this.Table_4.forEach((ele, index) => {
            if (item.id == ele.id) {
              this.Table_4.splice(index, 1)
            }
          })
        })
        // this.getLabeList()
        this.loading_2 = false
      })
    },
    // 新增标签Dialog 点击 确定
    submit() {
      if (!this.message) return this.$message.info('名称不能为空')
      const newArr = this.Table_4.filter(item => {
        return item.name == this.message
      })
      if (newArr.length != 0) {
        if (newArr[0].name = this.message) return this.$message.warning('名称重复')
      }
      this.loading_1 = true
      // 发送请求 保存
      const memberID = this.memberID_user;
      const name = this.message;
      const data = {
        memberID,
        name
      }
      this.cancel()
      addLabeList(data).then(({ data, code }) => {
        if (code != 0) {
          this.loading_1 = false
          return this.$message.error('添加失败')
        }
        this.$message.success('添加成功')
        this.getLabeList()
        this.closeAddDialog()
      })
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
        margin-top: 5px;
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