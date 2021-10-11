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
          :loading="loading"
          :columns="columns"
          :data-source="tabData"
          @change="tabChange"
          :pagination="false"
          :row-selection="removeRowSelection"
        >
          <div slot="image" slot-scope="text, record">
            <a-button
              @click="
                imageDialogVisible = true
                showPictureFn(record)
              "
              class="btn"
              >预览</a-button
            >
          </div>
        </a-table>
      </div>
    </Card>

    <!-- 图片预览的 弹出框 -->
    <el-dialog
      class="addDialog"
      title="预览"
      center
      :visible.sync="imageDialogVisible"
    >
      <!-- <img :src="pubPicture" alt="" class="image" /> -->
      <img width="100%" :src="pubPicture" alt="" />
    </el-dialog>

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
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div
            slot="file"
            slot-scope="{ file }"
            :on-success="dialogImageUrlAdd(file)"
          >
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
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
        <el-button
          type="primary"
          @click="
            AddDialogVisible = false
            submitPicture()
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Card from '@/components/content/card/Card'
import { getOperation, addOperation } from '@/network/home'

export default {
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      imageUrl: '', // 图片的url
      message: '', // 名称的input值
      AddDialogVisible: false,
      imageDialogVisible: false, // 预览图片的 Dialog
      pubPicture: '',

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      handlePicturePreviewed: true, // 如果新增了一张图片，则隐藏

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
        }
      ],
      tabData: []
    }
  },
  created() {
    this.getDataFn()
  },
  computed: {
    // 选中的 tr
    removeRowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
          )
        }
      }
    }
  },
  watch: {
    disabled(val, oldVal) {
      console.log('我触发了', val, oldVal)
    }
  },
  methods: {
    getDataFn() {
      this.tabData = ''
      // 获取列表数据
      this.loading = true

      
      getOperation().then(({ data, code }) => {
        console.log('data: ', data);

        if (code != 0) {
          this.loading = false
          return this.$message.error('获取数据失败')
        }
  
        res.data.forEach((item, index) => {
          const key = index
          const id = item.id
          const name = item.name
          const url = item.url
          this.tabData.push({
            key,
            id,
            name,
            url
          })
        })
        this.loading = false

        console.log('this.tabData', this.tabData)
      })
    },
    dialogImageUrlAdd(file) {
      // 上传之前添加图片地址
      this.dialogImageUrl = file.url
    },
    showPictureFn(record) {
      // 获取对应下标的图片地址
      this.pubPicture = record.attachmentUrl
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
      console.log(files)
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 点击预览图片
    preview() {
      this.imagedialogVisible = true
    },
    // 表格发生变化 执行
    tabChange() { },
    // 点击关闭 图片预览Dialog
    imageHandleClose() { },
    // 点击删除 删除选中的表格内容
    clearContent() { },

    submitPicture() {
      console.log(this.message, this.dialogImageUrl)
    }
  }
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
