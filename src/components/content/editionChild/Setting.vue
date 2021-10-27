<template>
  <div>
    <!-- 返回 -->
    <el-row
      class="back"
      :gutter="10"
    >
      <el-col :span="6">
        <i
          class="el-icon-back"
          @click="goBack"
        >&nbsp返回</i>
      </el-col>
    </el-row>
    <!-- card 1 -->
    <Card class="card_1">
      <span slot="leftTitle">通话设置</span>
      <div
        class="main"
        slot="main"
      >
        <el-row>
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
                :disabled="currentIndex_3 == index"
                :loading="loading_3"
              >
                {{ item.title }}
              </a-button>
            </div>
          </el-row>
        </el-row>

        <el-row style="margin-top: 20px;">
          <el-row>
            <div class="left">
              <span>使用4G流量</span>
            </div>
            <div class="right">
              <a-button
                v-for="(item, index) in arr_1"
                :key="index"
                class="switch"
                @click="change_a(index)"
                :class="{ active: currentIndex_a == index }"
                :disabled="currentIndex_a == index"
                :loading="loading_a"
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
                @click="change_b(index)"
                :class="{ active: currentIndex_b == index }"
                :disabled="currentIndex_b == index"
                :loading="loading_b"
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
                @click="change_c(index)"
                :class="{ active: currentIndex_c == index }"
                :disabled="currentIndex_c == index"
                :loading="loading_c"
              >
                {{ item.title }}
              </a-button>
            </div>
          </el-row>
        </el-row>
      </div>
    </Card>

    <!-- card 2 -->
    <Card class="card_2">
      <template #leftTitle>
        <span>屏幕设置</span>
      </template>

      <template #main>
        <div>
          <el-row>
            <el-col>
              <div class="left">
                <span>屏幕亮度</span>
              </div>
              <div class="right">
                <a-button
                  v-for="(item, index) in arr_2_a"
                  :key="index"
                  :type="item.type"
                  class="switch"
                  @click="change_4(item.id, index, item)"
                  :class="[{ unique: item.id == 1 }]"
                  :disabled="index == 0"
                  :loading="loading_4"
                >
                  {{ item.title }}
                </a-button>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <div class="left">
              <span>屏保模式</span>
            </div>
            <div class="right">
              <a-button
                v-for="(item, index) in arr_2_b"
                :key="index"
                :type="item.type"
                class="switch"
                @click="change_5(index)"
                :class="{ active: currentIndex_5 == index }"
                :loading="loading_5"
              >
                {{ item.title }}
              </a-button>
            </div>
          </el-row>

          <el-row>
            <div class="left">
              <span>免打扰时段</span>
            </div>
            <div class="right">
              <a-button
                v-for="(item, index) in arr_2_c"
                :key="index"
                :type="item.type"
                class="switch"
                @click="change_6(index)"
                :class="[{ active: currentIndex_6 == index }, { unique: index == 2 }]"
                :loading="loading_6"
              >
                {{ item.title }}
              </a-button>
            </div>
          </el-row>
        </div>
      </template>
    </Card>

    <!-- card 3-->
    <!-- <Card class="card_2">
      <span slot="leftTitle">“稍后提醒”再响间隔（分钟）</span>
      <div
        class="main"
        slot="main"
      >
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
    </Card> -->
    <!-- 通话设置 -->
    <!-- 修改可添加联系人的数量 -->
    <el-dialog
      title="设置可添加联系人的数量"
      :visible.sync="visible_1"
      width="30%"
      :before-close="handleClose_1"
    >
      <el-input
        v-model.trim="input_1"
        placeholder="请输入需要设置的数量"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_1">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_1"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改通话时长 -->
    <el-dialog
      title="设置通话时长"
      :visible.sync="visible_2"
      width="30%"
      :before-close="handleClose_2"
    >
      <el-input
        v-model.trim="input_2"
        placeholder="请输入需要设置的时长"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_2">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_2"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改留言数量 -->
    <el-dialog
      title="设置留言数量"
      :visible.sync="visible_3"
      width="30%"
      :before-close="handleClose_3"
    >
      <el-input
        v-model.trim="input_3"
        placeholder="请输入需要设置的数量"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_3">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_3"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改屏幕亮度 -->
    <el-dialog
      title="设置亮度值"
      :visible.sync="visible_4"
      width="30%"
      :before-close="handleClose_4"
    >
      <!-- <el-slider
        v-model="value_4"
        @change="handleChange_4"
        show-input
      >
      </el-slider> -->

      <el-select
        v-model="value_4"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <el-row
        v-if="value_4_a"
        class="row"
        :gutter="10"
      >
        <el-row :span="3">当前亮度值</el-row>
        <el-col :span="6">{{value_4_a}}</el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_4">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_4"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      title="新增亮度配置"
      :visible.sync="visible_4_a"
      width="30%"
      :before-close="handleClose_4_a"
    >
      <!-- <el-select
        v-model="value_4_a"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_4_a"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select> -->
      <el-input
        style="margin-bottom: 30px;"
        v-model.trim="input_4_a"
        placeholder="请输入亮度名称"
      ></el-input>
      <h4 class="weight">设置亮度值</h4>
      <el-slider
        v-model="value_4_a"
        @change="handleChange_4_a"
        show-input
      >
      </el-slider>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_4_a">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_4_a"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="提示"
      :visible.sync="visible_4_b"
      width="30%"
      :before-close="handleClose_4_b"
    >
      <el-select
        v-model="value_4_b"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_4_b"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>

      <el-row
        v-if="value_4_a"
        class="row"
        :gutter="10"
      >
        <el-row :span="3">当前亮度值</el-row>
        <el-col :span="6">{{value_4_a}}</el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_4_b">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_4_b"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改屏保模式 -->
    <!-- 新增 -->
    <el-dialog
      title="提示"
      :visible.sync="visible_5_a"
      width="30%"
      :before-close="handleClose_5_a"
    >
      <el-select
        v-model="value_5_a"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_5_a"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible_5_a = false">取 消</el-button>
        <el-button
          type="primary"
          @click="visible_5_a = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="提示"
      :visible.sync="visible_5_b"
      width="30%"
      :before-close="handleClose_5_b"
    >
      <el-select
        v-model="value_5_b"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_5_b"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible_5_b = false">取 消</el-button>
        <el-button
          type="primary"
          @click="visible_5_b = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改免打扰时段 -->
    <el-dialog
      title="免打扰时段设置"
      :visible.sync="visible_6"
      width="37%"
      :before-close="handleClose_6"
    >
      <el-time-select
        placeholder="起始时间"
        v-model="startTime_6"
        @change="onChange_6_a"
        :picker-options="{
      start: '01:00',
      step: '00:15',
      end: '23:59'
    }"
      >
      </el-time-select>
      <span style="margin: 0 5px;fontSize: 20px;">-</span>
      <el-time-select
        placeholder="结束时间"
        @change="onChange_6_b"
        v-model="endTime_6"
        :picker-options="{
      start: '01:00',
      step: '00:15',
      end: '23:59',
      minTime: startTime_6
    }"
      >
      </el-time-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleClose_6">取 消</el-button>
        <el-button
          type="primary"
          @click="handleOk_6"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      title="提示"
      :visible.sync="visible_6_a"
      width="30%"
      :before-close="handleClose_6_a"
    >
      <el-select
        v-model="value_6_a"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_6_a"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible_6_a = false">取 消</el-button>
        <el-button
          type="primary"
          @click="visible_6_a = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog
      title="免打扰时段设置"
      :visible.sync="visible_6_b"
      width="30%"
      :before-close="handleClose_6_b"
    >
      <el-select
        v-model="value_6_b"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options_6_b"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        >
        </el-option>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="visible_6_b = false">取 消</el-button>
        <el-button
          type="primary"
          @click="visible_6_b = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'

import {
  getNoDisturbing,
  addNoDisturbing,
  editNoDisturbing,
  getScreensaver,
  addScreensaver,
  editScreensaver,
  getLuminance,
  addLuminance,
  editLuminance,
  getCall,
  addCall,
  editCall,
  getLuminance_a,
  deleteLuminance,
  addLuminance_a
} from '@/network/home';
import { mapState } from 'vuex';

export default {
  components: {
    Card,
  },
  data() {
    return {
      status_5: '',
      ligth_4: null,

      startTime_6: '',
      endTime_6: '',

      value_4: '',
      value_4_a: 0,
      value_4_b: '',
      value_5_a: '',
      value_5_b: '',
      value_6_a: '',
      value_6_b: '',

      input_1: '',
      input_2: '',
      input_3: '',
      input_4_a: '',
      input_6: '',

      visible_1: false,
      visible_2: false,
      visible_3: false,
      visible_4: false,
      visible_4_a: false,
      visible_4_b: false,
      visible_5_a: false,
      visible_5_b: false,
      visible_6: false,
      visible_6_a: false,
      visible_6_b: false,

      loading_1: false,
      loading_a: false,
      loading_b: false,
      loading_c: false,
      loading_2: false,
      loading_3: false,
      loading_4: false,
      loading_5: false,
      loading_6: false,
      loading_7: false,

      currentIndex_1: 0,
      currentIndex_a: null,
      currentIndex_b: null,
      currentIndex_c: null,
      currentIndex_2: 0,
      currentIndex_3: 0,
      currentIndex_4: null,
      currentIndex_5: null,
      currentIndex_6: null,
      currentIndex_7: 0,

      options_4: [],
      options_4_a: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      options_4_b: [],
      options_5_a: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      options_5_b: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      options_6_a: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      options_6_b: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      arr_1: [
        { id: 1, title: '是' },
        { id: 2, title: '否' },
      ],

      arr_1_a: [
        { id: 1, title: '' },
        { id: 2, title: '修改', },
      ],
      arr_1_b: [
        { id: 1, title: '' },
        { id: 2, title: '修改', },
      ],
      arr_1_c: [
        { id: 1, title: '' },
        { id: 2, title: '修改', },
      ],

      arr_2_a: [
        { id: 0, title: '无', num: 50 },
        { id: 1, title: '设置' },
        { id: 2, title: '新增', type: 'primary' },
        { id: 3, title: '删除', type: 'danger' },
      ],
      arr_2_b: [
        { id: 1, title: '日历' },
        { id: 2, title: '相册' },
        { id: 3, title: '随机' },
        // { id: 4, title: '新增', type: 'primary' },
        // { id: 5, title: '删除', type: 'danger' },
      ],
      arr_2_c: [
        { id: 1, title: '20:00-06:00' },
        { id: 2, title: '关闭' },
        { id: 3, title: '自定义' },
        { id: 4, title: '新增', type: 'primary' },
        { id: 5, title: '删除', type: 'danger' },
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
  created() {
    // 通话设置
    this.getCall()
    // 屏幕亮度
    this.getLuminance()
    this.getLuminance_a()
    // 屏保模式
    this.getScreensaver()
    // 免打扰时段
    this.getNoDisturbing()
  },
  computed: {
    ...mapState('edition', ['edition_ID']),
  },
  methods: {
    /* 网络请求区域 */

    // 获取通话设置信息
    getCall() {
      this.loading_1 = true
      this.loading_2 = true
      this.loading_3 = true
      this.loading_a = true
      this.loading_b = true
      this.loading_c = true
      const versionId = this.edition_ID;
      const params = {
        versionId
      }
      // 发送请求
      getCall(params).then(({ data, code }) => {
        console.log('通话data: ', data);
        if (code != 0) return this.$message.error('获取通话')

        if (data.records.length == 0) {
          this.addCall()
        } else {
          const linkNum = data.records[0].linkNum;
          const talkTime = data.records[0].talkTime;
          const messageNum = data.records[0].messageNum;
          const useFourg = data.records[0].useFourg
          const shieldStrangeCall = data.records[0].shieldStrangeCall
          const automaticAnswerCall = data.records[0].automaticAnswerCall


          this.arr_1_a[0].title = linkNum + '个';
          this.arr_1_b[0].title = talkTime + '分钟';
          this.arr_1_c[0].title = messageNum + '条';
          this.currentIndex_a = useFourg;
          this.currentIndex_b = shieldStrangeCall;
          this.currentIndex_c = automaticAnswerCall;
        }
        this.loading_1 = false
        this.loading_2 = false
        this.loading_3 = false
        this.loading_a = false
        this.loading_b = false
        this.loading_c = false
      })
    },
    // 新增通话设置
    addCall() {
      const versionId = this.edition_ID;
      const linkNum = 200;
      const talkTime = 1000;
      const messageNum = 200;
      const useFourg = 1;
      const shieldStrangeCall = 1;
      const automaticAnswerCall = 1;
      const data = {
        versionId,
        linkNum,
        talkTime,
        messageNum,
        useFourg,
        shieldStrangeCall,
        automaticAnswerCall
      }
      // 发送请求
      addCall(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('默认配置设置失败')

        this.arr_1_a[0].title = 200 + '条';
        this.arr_1_b[0].title = 1000 + '分钟';
        this.arr_1_c[0].title = 200 + '条';
        this.currentIndex_a = 0;
        this.currentIndex_b = 0;
        this.currentIndex_c = 0;
      })
    },
    // 修改通话设置
    editCall(val, type) {
      this.loading_1 = true
      this.loading_2 = true
      this.loading_3 = true
      this.loading_a = true
      this.loading_b = true
      this.loading_c = true

      const versionId = this.edition_ID;
      let linkNum, talkTime, messageNum, useFourg, shieldStrangeCall, automaticAnswerCall;
      switch (type) {
        case 0:
          linkNum = val || '';
          break;
        case 1:
          talkTime = val || '';
          break;
        case 2:
          messageNum = val || '';
          break;
        case 3:
          useFourg = val
          break;
        case 4:
          shieldStrangeCall = val
          break;
        case 5:
          automaticAnswerCall = val
          break;
      }
      const data = {
        versionId,
        linkNum,
        talkTime,
        messageNum,
        useFourg,
        shieldStrangeCall,
        automaticAnswerCall
      }
      // 发送请求
      editCall(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('修改失败')

        this.$message.success('修改成功')
        this.loading_1 = false
        this.loading_2 = false
        this.loading_3 = false
        this.loading_a = false
        this.loading_b = false
        this.loading_c = false
        switch (type) {
          case 0:
            this.arr_1_a[0].title = val + '个';
            break;
          case 1:
            this.arr_1_b[0].title = val + '分钟';
            break;
          case 2:
            this.arr_1_c[0].title = val + '条';
            break;
        }
      })
    },
    // 获取免打扰时段信息
    getNoDisturbing() {
      this.loading_6 = true
      const versionId = this.edition_ID
      const params = {
        versionId
      }
      // 发送请求
      getNoDisturbing(params).then(({ data, code }) => {
        if (code != 0) return this.$message.error('获取免打扰配置信息失败')

        if (data.records.length == 0) {
          this.addNoDisturbing()
        } else {
          const status = data.records[0].status;
          const disturbNot = data.records[0].disturbNot;
          const arr = disturbNot.split('-');
          this.startTime_6 = arr[0];
          this.endTime_6 = arr[1];
          switch (status) {
            case 0:
              this.currentIndex_6 = 0
              this.startTime_6 = '20:00';
              this.endTime_6 = '06:00';
              break;
            case 1:
              this.currentIndex_6 = 1
              break;
            case 2:
              this.currentIndex_6 = 2
              break;
          }
        }
        this.loading_6 = false
      })
    },
    // 新增免打扰配置
    addNoDisturbing() {
      const versionId = this.edition_ID;
      const status = '0';
      const disturbNot = '20:00-06:00';
      const data = {
        versionId,
        status,
        disturbNot
      }
      // 发送请求
      addNoDisturbing(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('默认配置设置失败')

        this.currentIndex_6 = 0
      })
    },
    // 修改免打扰配置
    editNoDisturbing(status_1) {
      this.loading_6 = true
      const versionId = this.edition_ID;
      const status = status_1 + '';
      let disturbNot;
      if (this.currentIndex_6 == 0) {
        disturbNot = '20:00-6:00';
        console.log('disturbNot: ', disturbNot);
      } else if (this.currentIndex_6 == 2) {
        const startTime_6 = this.startTime_6;
        const endTime_6 = this.endTime_6;
        disturbNot = `${startTime_6}-${endTime_6}`
        console.log('disturbNot: ', disturbNot);
      }
      const data = {
        versionId,
        status,
        disturbNot
      }

      editNoDisturbing(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('修改失败')

        this.$message.success('修改成功')
        this.loading_6 = false
      })
    },

    // 获取屏保信息
    getScreensaver() {
      this.loading_5 = true
      const versionId = this.edition_ID
      const params = {
        versionId
      }
      // 发送请求
      getScreensaver(params).then(({ data, code }) => {
        console.log('屏保data: ', data);
        if (code != 0) return this.$message.error('获取屏保配置信息失败')
        if (data.records.length == 0) {
          this.addScreensaver()
        } else {
          const status = parseInt(data.records[0].status);
          this.status_5 = status;
          switch (status) {
            case 0:
              this.currentIndex_5 = 0
              break;
            case 1:
              this.currentIndex_5 = 1
              break;
            case 2:
              this.currentIndex_5 = 2
              break;
          }
        }
        this.loading_5 = false
      })
    },
    // 新增屏保信息
    addScreensaver() {
      const versionId = this.edition_ID;
      const status = '0';
      const pattern = 'calendar';
      const data = {
        versionId,
        status,
        pattern
      }
      // 发送请求
      addScreensaver(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('默认配置设置失败')

        this.currentIndex_5 = 0
      })
    },
    // 修改屏保信息
    editScreensaver(index) {
      this.loading_5 = true
      const versionId = this.edition_ID;
      const status = index + ''
      let pattern;
      if (this.currentIndex_5 == 0) {
        pattern = 'calendar';
      } else if (this.currentIndex_5 == 1) {
        pattern = 'photoAlbum ';
      } else if (this.currentIndex_5 == 2) {
        pattern = 'random';
      }
      const data = {
        versionId,
        pattern,
        status
      }

      editScreensaver(data).then(({ data, code }) => {
        console.log('data: ', data);
        if (code != 0) return this.$message.error('修改失败')

        this.$message.success('修改成功')
        this.currentIndex_5 = index
        this.loading_5 = false
      })
    },

    // 获取屏幕亮度信息
    getLuminance() {
      this.loading_4 = true
      this.options_4 = []
      this.options_4_b = []
      const versionId = this.edition_ID
      const params = {
        versionId
      }
      // 发送请求
      getLuminance(params).then(({ data, code }) => {
        console.log('亮度data: ', data);
        if (code != 0) return this.$message.error('获取屏幕亮度配置信息失败')

        if (data.records.length == 0) {
          // 新增屏幕亮度
          this.addLuminance(1)
        } else {
          data.records.forEach(item => {
            const id = item.id
            const light = item.light;
            const name = item.name;

            this.options_4.push({
              value: id,
              label: name,
              light
            })
            this.options_4_b.push({
              value: id,
              label: name,
              light
            })
          })
        }
        this.loading_4 = false
      })
    },
    // 获取屏幕亮度信息
    getLuminance_a() {
      const versionId = this.edition_ID
      const params = {
        versionId
      }

      // 发送请求
      getLuminance_a(params).then(({ data, code }) => {
        console.log('data_a: ', data);
        if (code != 0) return this.$message.error('获取数据失败')
        if (data.records.length == 0) {
          this.addLuminance_a()
          return this.arr_2_a[0].title = '无'
        }
        this.arr_2_a[0].title = data.records[0].name || '无'
        this.value_4 = data.records[0].name
        this.value_4_b = data.records[0].name
        this.value_4_a = Number(data.records[0].brightness)
      })
    },
    // 新增屏幕亮度列表
    addLuminance(type, item) {
      const versionId = this.edition_ID
      let data;
      if (type == 1) {
        const name = '正常'
        const light = '50';
        data = {
          versionId,
          name,
          light
        }
      } else {
        const light = item.light + '';
        const name = item.name;

        data = {
          versionId,
          light,
          name
        }
      }
      console.log(data);
      // 发送请求
      addLuminance(data).then(({ data, code }) => {
        console.log('data: ', data);
        if (code != 0) return this.$message.error('配置失败')
        this.$message.success('新增成功')
        this.getLuminance()
      })
    },
    addLuminance_a() {
      const versionId = this.edition_ID
      const name = '正常'
      const brightness = '50';
      const data = {
        versionId,
        name,
        brightness
      }
      // 发送请求
      addLuminance_a(data).then(({ data, code }) => {
        if (code != 0) return this.$message.error('配置失败')

        this.getLuminance_a()
      })
    },
    // 设置屏幕亮度
    editLuminance(item) {
      this.loading_4 = true
      const versionId = this.edition_ID
      const brightness = item.light + '';
      const name = item.label;
      const data = {
        versionId,
        name,
        brightness
      }
      // 发送请求
      editLuminance(data).then(({ data, code }) => {
        console.log('修改data: ', data);
        if (code != 0) return this.$message.error('修改失败')

        this.$message.success('修改成功')
        const newArr = this.options_4.filter(item => {
          if (item.value == this.value_4) {
            return item
          }
        })
        console.log(newArr);
        this.arr_2_a[0].title = newArr[0].label
        this.value_4_a = Number(newArr[0].light)
        this.loading_4 = false
      })
    },
    // 删除屏幕亮度信息
    deleteLuminance(ids) {
      const params = {
        ids
      }
      // 发送请求
      deleteLuminance(params).then(({ data, code }) => {
        if (code != 0) return this.$message.error('删除失败')

        this.$message.success('删除成功')
        this.getLuminance()
      })
    },

    /* 网络请求区域 */
    // 返回上一级
    goBack() {
      this.$emit('onChange')
    },
    // 修改可添加联系人的数量
    change_1() {
      this.visible_1 = true
    },
    handleClose_1() {
      this.input_1 = '';
      this.visible_1 = false
    },
    handleOk_1() {
      const val = parseInt(this.input_1);
      if (!val) return this.$message.info('您输入的内容为空')

      this.editCall(val, 0)
      this.handleClose_1()
    },

    // 修改通话时长
    change_2(index) {
      this.visible_2 = true
    },
    handleClose_2() {
      this.input_2 = '';
      this.visible_2 = false
    },
    handleOk_2() {
      const val = this.input_2;
      if (!val) return this.$message.info('您输入的内容为空')

      this.editCall(val, 1)
      this.handleClose_2()
    },

    // 修改留言数量
    change_3(index) {
      this.visible_3 = true
    },
    handleClose_3() {
      this.input_3 = '';
      this.visible_3 = false
    },
    handleOk_3() {
      const val = this.input_3;
      if (!val) return this.$message.info('您输入的内容为空')

      this.editCall(val, 2)
      this.handleClose_3()
    },
    // 通话设置2
    change_a(index) {
      this.currentIndex_a = index
      this.editCall(index, 3)
    },
    change_b(index) {
      this.currentIndex_b = index
      this.editCall(index, 4)
    },
    change_c(index) {
      this.currentIndex_c = index
      this.editCall(index, 5)
    },

    // 修改屏幕亮度
    change_4(index, indey, item) {
      switch (index) {
        case 1:
          this.visible_4 = true
          break;
        case 2:
          this.visible_4_a = true
          break;
        case 3:
          this.visible_4_b = true
          break;
      }

    },
    handleOk_4() {
      if (!this.value_4) return this.$message.info('请选择')
      console.log(this.options_4);
      const newArr = this.options_4.filter(item => {
        if (item.value == this.value_4) {
          return item
        }
      })
      console.log(newArr[0]);
      this.editLuminance(newArr[0])
      this.handleClose_4()
    },

    handleClose_4() {
      this.visible_4 = false
    },
    handleChange_4_a() {

    },
    handleOk_4_a() {
      const name = this.input_4_a;
      const light = this.value_4_a;
      console.log('light: ', light);
      if (!name) return this.$message.info('请完善表单')
      const newArr = this.options_4.filter(item => {
        return item.label == name
      })

      if (newArr.length != 0) {
        return this.$message.warning('名称重复')
      }

      if (light < 10) return this.$message.info('太暗了')
      const data = {
        name,
        light
      }
      // 新增 接口
      this.addLuminance(2, data);
      // 获取屏幕亮度信息
      this.getLuminance()
      // this.arr_2_a.splice(3, 0, obj)
      this.handleClose_4_a()
    },
    handleClose_4_a() {
      this.input_4_a = ''
      this.visible_4_a = false
    },
    handleOk_4_b() {
      if (!this.value_4_b) return this.$message.info('请选择')
      console.log('this.value_4_b: ', this.value_4_b);
      this.deleteLuminance(this.value_4_b + '')
      this.handleClose_4_b()
    },
    handleClose_4_b() {
      this.visible_4_b = false
    },

    change_5(index) {
      // if (index != 3 && index != 4) {
      //   this.currentIndex_5 = index
      // }

      this.editScreensaver(index)
      // switch (index) {
      //   // case 0:
      //   //   this.editScreensaver(index)
      //   //   break;
      //   // case 1:
      //   //   this.editScreensaver(index)
      //   //   break;
      //   // case 2:
      //   //   this.editScreensaver(index)
      //   //   break;
      //   // case 3:
      //   //   this.visible_5_a = true
      //   //   break;
      //   // case 4:
      //   //   this.visible_5_b = true
      //   //   break;
      // }
    },
    handleClose_5_a() {

    },
    handleClose_5_b() {

    },


    change_6(index) {
      if (index != 3 && index != 4) {
        this.currentIndex_6 = index
      }
      switch (index) {
        case 0:
          this.editNoDisturbing(index)
          break;
        case 1:
          this.editNoDisturbing(index)
          break;
        case 2:
          this.visible_6 = true
          break;
        case 3:
          this.visible_6_a = true
          break;
        case 4:
          this.visible_6_b = true
          break;
      }
    },
    onChange_6_a() {
      console.log(this.startTime_6);
    },
    onChange_6_b() {
      console.log(this.endTime_6);
    },
    handleClose_6() {
      this.visible_6 = false
    },
    handleOk_6() {
      if (!this.startTime_6 && !this.endTime_6) return this.$message.info('请设置完整的时间段')
      const index = this.currentIndex_6
      this.editNoDisturbing(index)
      this.handleClose_6()
    },

    handleClose_6_a() {

    },
    handleClose_6_b() {

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

.card_2 {
  .el-row:first-child {
    transform: translateX(18px);
    margin-bottom: 20px;
  }

  .el-row:nth-child(2) {
    transform: translateX(18px);

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

.weight {
  font-weight: 500px !important;
}

.active {
  color: #fff !important;
  background-color: @color1 !important;
  border: 1px solid transparent !important;
}

.unique {
  background-color: #67c23a;
  color: #fff;
}

.el-row {
  font-size: 18px;
}
.row {
  margin-top: 20px;
  transform: translateX(4px);
}

// ::v-deep .el-input__inner {
//   width: 80% !important;
// }
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 150px;
}
</style>