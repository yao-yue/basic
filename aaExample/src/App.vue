<template>
  <div id="app">
    <component :is="showCom"></component>
  </div>
</template>


<script>
export default {
  name: "app",

  data() {
    return {
      showCom: "menulist"
    };
  },

  components: {
    menulist: () => import("./page/navMenu"),
    login: () => import("./page/passport/login")
  },

  mounted() {},
  
  methods: {
    //读取cookie：
    getCookie(name) {
      let arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
    }
  }
};
</script>

<style lang="scss">
 /* 去掉滚动条，同时能滚动*/
::-webkit-scrollbar{
  display:none;
}
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-color: #edf3fc !important;
}
#app {
  height: 100%;
}
//公共
.box {
  display: -webkit-box;
  display: box;
  display: -moz-box;
  /* 老版本 - 适配iOS 6-, Safari 3.1-6 */
  display: -webkit-flex;
  /* 新版本 - 适配Chrome */
  display: flex;
}
.el-menu-item.is-active {
  color: #21b5cc !important;
  border-left: 5px solid #21b5cc;
}

.el-tabs__header {
  background-color: #fff;
  padding: 8px 12px 12px;
  margin: 0 0 10px;
}
.el-tabs__item {
  font-size: 16px;
}
.el-tabs__item:hover {
  color: #21b5cc !important;
}
.el-tabs__item.is-active {
  color: #21b5cc !important;
}
.el-tabs__active-bar {
  background-color: #21b5cc !important;
}
.note-editor.note-frame {
  width: 80%;
}
.el-table td,
.el-table th {
  padding: 0;
}
.uploadShow  .el-upload{display: none;}
.el-table td > .cell {
  text-align: center;
  padding: 8px 0 !important;
}
.el-table td > .cell .pro-item {
  padding: 8px 0;
}
.el-table td > .cell .pro-item:first-child {
  padding-top: 0px;
}
.el-table td > .cell .pro-item:last-child {
  padding-bottom: 0px;
}
.el-table td > .cell .pro-item:not(:last-child) {
  border-bottom: 1px solid #ebeef5;
}
.el-table th > .cell {
  text-align: center;
  padding: 0px 4px !important;
  height: 40px;
  line-height: 40px;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #21b5cc;
  border-color: #21b5cc;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #21b5cc !important;
}
.el-pager li.active,
.el-pager li:hover {
  color: #21b5cc !important;
}
.el-tree-node__content {
  height: 50px !important;
}
.is-current {
  color: #21b5cc !important;
}
.is-expanded.is-current {
  color: #606266 !important;
  background-color: #fff !important;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #21b5cc !important;
  color: #fff !important;
}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .el-tree-node__expand-icon {
  color: #fff !important;
}
// .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content .btn_list .el-button--text{ color: #fff;}
.el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content
  .btn_list
  .el-button {
  background-color: #fff !important;
}
.el-tree--highlight-current
  .el-tree-node
  .el-tree-node__content
  .btn_list
  .el-button {
  background-color: #fff !important;
}

.el-tree-node__content {
  position: relative !important;
}
.dialog-con .picture {
  max-width: 300px;
  height: auto;
}
// 上传图片
.upload-demo {
  video {
    width: 178px;
  }
}
.avatar-uploader {
  .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px dashed #d9d9d9 !important;
      border-radius: 6px;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    video {
      width: 178px;
    }
  }
  .el-upload:hover {
    border-color: #20a0ff;
  }
  .up-tips {
    color: #fc0000;
  }
}
// .note-toolbar-wrapper.panel-default{
//   height: 0px!important;
// }
// 列表
.container {
  width: 100% !important;
  .el-dialog__header {
    background: #0099FF;
    .el-dialog__title {
      color: #ffffff;
    }
    button {
      display: none;
    }
  }
  .el-dialog__body, .el-dialog__footer {
    text-align: center;
    margin-top: 32px;
    span {
      width: 60%;
    }
  }
  .top {
    background-color: #fff;
    padding: 5px 12px;
    position: relative;
    p {
      font-size: 16px;
      margin: 0;
      height: 40px;
      line-height: 40px;
    }
    .el-button {
      position: absolute;
      right: 20px;
      top: 10px;
      padding: 8px 10px !important;
    }
  }
  .export-header {
    padding: 16px;
    // border-bottom:1px solid #dedede;
    background-color: #fff;
    form {
      display: inline-block;
      margin-left: 10px;
    }
    .export {
      cursor: pointer;
      padding: 9px 15px;
      font-family: Arial;
      font-size: 14px;
      line-height: 14px;
      border-radius: 4px;
      border: 1px solid #c4c4c4;
      color: #fff;
      background-color: #21b5cc;
      border-color: #21b5cc;
      display: inline-block;
    }
    .export:hover {
      background: #21b5cc;
      border-color: #21b5cc;
      color: #fff;
    }
  }
  .header {
    padding: 12px;
    background-color: #fff;
    .el-button {
      padding: 8px 10px;
      span {
        display: inline-block;
        a {
          display: inline-block;
        }
      }
    }
  }
  .input_modal {
    // height: 50px;
    // line-height: 50px;
    background-color: #fff;
    margin-top: 10px;
    .car_item {
      padding-right: 70px;
    }
    .input-item:first-child {
      margin-left: 36px;
    }
    .input-item {
      display: inline-block;
      margin-right: 20px;
      clear: both;
      height: 50px;
      line-height: 50px;
      position: relative;
      .el-input {
        width: 168px;
      }
      .el-input,
      .el-button,
      .el-select {
        height: 30px !important;
      }
      .el-input__inner {
        height: 30px !important;
      }
      .el-input__icon {
        line-height: 30px !important;
        height: 30px;
      }
      .el-date-editor .el-range-separator {
        line-height: 22px;
        width: 10%;
      }
      .el-button--medium {
        padding: 8px 10px !important;
      }
      .distpicker-address-wrapper {
        display: inline-block;
        height: 30px;
        position: relative;
        select {
          -webkit-appearance: none;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
          color: #606266;
          display: inline-block;
          font-size: inherit;
          height: 30px;
          line-height: 1;
          outline: 0;
          padding: 0 40px 0 20px;
          -webkit-transition: border-color 0.2s
            cubic-bezier(0.645, 0.045, 0.355, 1);
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          margin-right: 20px !important;
        }
        select:focus {
          border-color: #409eff;
        }
        .cret1 {
          position: absolute;
          left: 170px;
          top: 15px;
          width: 7px;
          height: 7px;
          border-right: 1px solid #c0c4cc;
          border-bottom: 1px solid #c0c4cc;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
          display: block;
        }
        .cret2 {
          position: absolute;
          right: 30px;
          top: 15px;
          width: 7px;
          height: 7px;
          border-right: 1px solid #c0c4cc;
          border-bottom: 1px solid #c0c4cc;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
      .car {
        position: absolute;
        left: 50px;
        top: 0px;
        height: 30px;
      }
    }
    .el-button {
      // position: absolute;
      padding: 0px;
      margin-top: 10px;
      width: 90px;
      height: 30px;
      margin-left: 34px;
    }
  }
  .table_con {
    background-color: #fff;
    padding: 10px;
    margin-top: 10px;
    .table_img {
      width: 100%;
      height: 100%;
      min-width: 100px;
      max-width: 168px;
      min-height: 60px;
      max-height: 100px;
      overflow: hidden;
      text-align: center;
    }
    .el-button--mini {
      padding: 8px !important;
      margin-left: 4px !important;
    }
    .el-button--mini:first-child {
      margin-left: 0px !important;
    }
    .avatar {
      width: 100%;
      height: 40px;
      overflow: hidden;
      text-align: center;
      img {
        width: 40px;
        height: 40px;
        display: inline-block;
        border-radius: 50%;
      }
    }
    .picture {
      width: 100%;
      height: 50px;
      overflow: hidden;
      text-align: center;
      img {
        width: auto;
        height: 50px;
        display: inline-block;
      }
    }
    .card {
      display: inline-block;
      height: 60px;
      img {
        height: 60px;
        width: auto;
      }
    }
    .banner {
      width: 100%;
      height: 80px;
      overflow: hidden;
      text-align: center;
      img {
        width: auto;
        height: 80px;
        display: inline-block;
      }
    }
  }
  .pagination {
    text-align: right;
    background-color: #fff;
    padding: 8px;
    display: block !important;
  }
  .el-button {
    margin-bottom: 10px;
  }
  .pic {
    width: 100%;
    height: 40px;
    overflow: hidden;
    img {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
  }
}

//  编辑
.container_edit {
  .el-button--primary {

  }
  .square {
    width: 30px;
    height: 30px;
    padding: 0;
    border-radius: 50%;
    margin-left: 10px;
    background-color: #fc0000 !important;
    border: none !important;
  }
  .header {
    background-color: #fff;
    padding: 5px 12px;
    position: relative;
    p {
      font-size: 16px;
      margin: 0;
      height: 40px;
      line-height: 40px;
    }
    .el-button {
      position: absolute;
      right: 20px;
      top: 10px;
      padding: 8px 10px !important;
    }
  }
  .header_top {
    padding: 12px;
    background-color: #fff;
    .el-button {
      padding: 8px 10px;
      span {
        display: inline-block;
        a {
          display: inline-block;
        }
      }
    }
  }
  .main {
    margin-top: 10px;
    clear: both;
    background-color: #fff;
    padding: 16px;
    .el-input {
      width: 260px;
    }
    .el-select {
      width: 260px;
    }
    textarea {
      width: 400px;
    }
    .el-form-item {
      margin-bottom: 25px;
    }
    .modal-body {
      .note-image-input {
        display: block;
      }
    }
    .sub_title {
      height: 40px;
      line-height: 40px;
      margin-left: 50px;
      font-weight: 600;
      padding-left: 10px;
      border-left: 4px solid #21b5cc;
      margin-top: 20px;
      margin-bottom: 10px;
      .el-button {
        margin-left: 20px;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
      }
    }
    .table {
      margin-left: -70px;
    }
  }
  .rich_text {
    padding: 20px;
    width: 415px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    line-height: auto !important;
  }
}
.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
}
// 详情
.container_detail {
  .el-button--primary {
    background-color: #21b5cc !important;
    border: 1px solid #21b5cc;
  }
  &.order {
    .list {
      overflow: hidden;
    }
    .list-item {
      width: 50%;
      float: left;
      .item {
        &.avatar {
          .item-key {
            height: 132px;
            line-height: 132px;
          }
          .item-value {
            height: 132px;
            line-height: 132px;
          }
        }
      }
      .item-key {
        height: 30px;
        line-height: 30px;
      }
      .item-value {
        height: 30px;
        line-height: 30px;
        .el-input {
          width: 70%;
          height: 30px;
          input {
            height: 30px;
          }
        }
      }
      .title {
        .el-button {
          float: right;
          margin: 5px 50px;
        }
      }
      &:nth-child(3) {
        .item{
         border-left: 0;
        }
        .title {
          border-left: 0;
        }
      }
    }
  }
  .header {
    background-color: #fff;
    padding: 5px 12px;
    position: relative;
    p {
      font-size: 16px;
      margin: 0;
      height: 40px;
      line-height: 40px;
    }
    .el-button {
      position: absolute;
      right: 20px;
      top: 10px;
      padding: 8px 10px !important;
    }
  }
  .main {
    margin-top: 10px;
    background-color: #fff;
    padding: 16px;
    clear: both;
    .list {
      .img-lists {
        overflow: hidden;
        margin-bottom: 20px;
        .img-title {
          text-align: left;
          font-size: 14px;
          margin-top: 20px;
        }
        .img-list {
          float: left;
          margin-top: 10px;
          margin-right: 15%;
          &:nth-child(3) {
            float: right;
          }
          img {
            width: 230px;
            height: 230px;
            cursor: pointer;
          }
          .name {
            text-align: center;
            margin-top: 10px;
          }
        }
      }
      .title {
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        background-color: #f5f5f5;
        border: 1px solid #dedede;
        font-weight: 600;
      }
      .noborder-top {
        border-top: none;
      }
      .item {
        border: 1px solid #dedede;
        border-top: none;
        position: relative;
        padding-left: 180px;
        &.avatar{
          .item-key{
            line-height: 100px;
          }
        }
        .item-key {
          position: absolute;
          left: 0;
          top: 0;
          width: 160px;
          padding: 10px;
          text-align: right;
          box-sizing: content-box;
          font-size: 14px;
        }
        .item-value {
          min-height: 21px;
          padding: 10px;
          border-left: 1px solid #dedede;
          font-size: 14px;
          .avatar {
            width: 80px;
            height: 80px;
            margin: 10px;
            cursor: pointer;
          }
          section {
            display: inline-block;
            height: 40px;
            img {
              height: 36px;
              width: 36px;
              border-radius: 50%;
            }
          }
        }
      }
      .item-pic {
        .item-value {
          padding-left: 0;
          height: 100px;
          section {
            width: 100px;
            padding: 0 10px;
            text-align: center;
            float: left;
            height: 100px;
            overflow: hidden;
            text-align: center;
            img {
              min-height: 100px;
              min-width: 100px;
              display: inline-block;
              border-radius: 0;
            }
          }
        }
        .item_col_3 {
          display: inline-block;
          width: 33.3%;
        }
      }
    }
  }
}
.charge-dialog {
  .el-form {
    overflow: hidden;
  }
  .el-form-item {
    float: left;
    width: 50%;
    .el-input {
      width: 60%;
    }
  }
  .dialog-title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
    span {
      position: relative;
      top: -5px;
      margin: 0 5%;
      width: 15%;
      height: 1px;
      background-color: #333;
      display: inline-block;
    }
  }
}

.area-item {
  width: 100%;
  &:last-child {
    .area-list {
      border-bottom: 0;
    }
  }
  .area-list {
    width: 50%;
    border-bottom: 1px solid #ebeef5;
    &:nth-child(2n) {
      border-left: 1px solid #ebeef5;
    }
    .name {
      width: 50%;
      text-align: center;
      height: 50px;
      line-height: 50px;
      border-right: 1px solid #ebeef5;
    }
    .value {
      width: 50%;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
