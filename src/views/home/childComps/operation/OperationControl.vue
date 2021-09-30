/* 运营管理 */
<template>
  <div class="wrapper">
    <Card>
      <span slot="leftTitle">运营管理</span>

      <div slot="rightTitle">
        <el-button type="primary" @click="AddDialogVisible = true"
          >新增</el-button
        >
        <el-button type="danger" @click="clearContent">删除</el-button>
      </div>

      <div slot="main">
        <a-table
          :loading="false"
          :columns="columns"
          :data-source="tabData"
          @change="tabChange"
          :pagination="false"
          :row-selection="removeRowSelection"
        >
          <div slot="image" slot-scope="text, record">
            <a-button @click="preview" class="btn">预览</a-button>
          </div>
        </a-table>
      </div>
    </Card>

    <!-- 图片预览的 弹出框 -->
    <a-modal
      v-model="imageDialogVisible"
      :footer="null"
      @ok="imageDialogVisible = false"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

    <!-- 新建的Dialog -->
    <el-dialog
      class="addDialog"
      title="新增"
      center
      :visible.sync="AddDialogVisible"
    >
      <header>
        <span>上传图片：</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </header>
      <main>
        <span>名称：</span>
        <el-input
          v-model="message"
          placeholder="请输入名称"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          autocomplete="off"
        ></el-input>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddDialogVisible = false"
          >确 定</el-button
        >
      </div>
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
      imageUrl: '', // 图片的url
      message: '', // 名称的input值
      AddDialogVisible: false,
      imageDialogVisible: false, // 预览图片的 Dialog
      columns: [
        {
          title: '名称',
          dataIndex: 'title',
          key: 'title',
          width: '70%'
        },
        {
          title: '图片',
          dataIndex: 'image',
          key: 'image',
          scopedSlots: { customRender: 'image' },
          width: '20%'
        },
      ],
      tabData: [
        {
          key: 1,
          title: 'Luck',
        },
        {
          key: 2,
          title: 'Luck',
        },
        {
          key: 3,
          title: 'Luck',
        },
      ],
    }
  },
  computed: {
    // 选中的 tr
    removeRowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

        },
      };
    },
  },
  methods: {
    // 点击预览图片
    preview() {
      this.imagedialogVisible = true
    },
    // 表格发生变化 执行
    tabChange() { },
    // 点击关闭 图片预览Dialog
    imageHandleClose() { },
    // 点击删除 删除选中的表格内容
    clearContent() {

    },
    // 图片上传之前
    beforeUpload(file) {
      const isImage = file.type === 'image/jpeg' || '/image/png' || 'image/jp2';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error('只能上传图片');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 图片上传完成
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.wrapper {
  .btn {
    width: 90px;
    font-weight: 500;
    color: #fff;
    background-color: @color1;
    border: transparent;
  }
  .addDialog {
    font-weight: 500;
    header {
      display: flex;
      padding: 0 0 30px;
      .avatar-uploader {
        width: 150px;
        height: 150px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        background-color: #e0e0e013;
        overflow: hidden;
        .avatar {
          width: 150px;
          height: 150px;
          display: block;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 150px;
          height: 150px;
          line-height: 150px;
          text-align: center;
        }
      }
      .avatar-uploader:hover {
        border-color: #409eff;
      }
    }

    main {
      padding-left: 24px;
      display: flex;
      span {
        width: 50px;
      }
    }
  }
}
</style>