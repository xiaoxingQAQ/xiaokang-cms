/* Home主要页面 */
<template>
  <div class="container">
    <el-row>
      <el-card class="box-card">
        <div class="box-container">
          <!-- 标题 -->
          <div class="Card1row">
            <div>
              <slot name="leftTitle"></slot>
            </div>
            <div>
              <slot name="rightTitle"></slot>
            </div>
          </div>
          <!-- 内容 -->
          <div class="content">
            <div>
              <div>
                <slot name="data_1"></slot>
              </div>
              <span>
                <slot name="title_1"></slot>
              </span>
            </div>

            <div>
              <div>
                <slot name="data_2"></slot>
              </div>
              <span>
                <slot name="title_2"></slot>
              </span>
            </div>

            <div>
              <div>
                <slot name="data_3"></slot>
              </div>
              <span>
                <slot name="title_3"></slot>
              </span>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@color1: #0cc;
@color2: #7f7f7f;
.container {
  margin-bottom: 30px;
  /* 卡片 */
  .box-card {
    box-sizing: border-box;
    padding: 10px;
    .Card1row {
      height: 50px;
      display: flex;
      justify-content: space-between;

      font-size: 16px;
      font-weight: bold;
      > div:nth-child(1) {
        color: @color2;
      }
      > div:last-child {
        color: @color1;
      }
    }
    /* 内容 */
    .content {
      width: 100%;
      display: flex;
      justify-content: space-around;
      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        // width: 395px;
        div {
          color: @color1;
          font-weight: bold;
          font-size: 44px;
          margin-bottom: 5px;
        }
        span {
          color: @color2;
          font-weight: bold;
        }
      }
    }
  }
}
</style>