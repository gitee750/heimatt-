<template>
  <el-container class="container">
    <!-- 左边 -->
    <el-aside width="500px" class="aside">
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>

        <el-form-item label="媒体简介">
          <el-input v-model="form.intro" size="small" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="头条号id">
          <el-input :value="form.id + ''" size="small" disabled></el-input>
        </el-form-item>

        <el-form-item label="绑定手机">
          <el-input v-model="form.mobile" size="small" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存更新</el-button>
        </el-form-item>
      </el-form>
    </el-aside>
    <!-- 右边 -->
    <!-- 下面action 默认提交的是post请求 不能修改  所以用:http-request改变他默认提交 类型function -->
    <el-main class="main">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
        :show-file-list="false"
        :http-request="isRequest"
      >
        <img v-if="form.photo" :src="form.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        intro: "",
        id: "",
        mobile: "",
        email: "",
        photo: ""
      }
    };
  },
  methods: {

    //ajax默认不能传图片
    //   要上传图片必须用到FormData对象
    isRequest(config) {
      //   window.console.log(config.file)
      let fm = new FormData();

      //   参数1 接口叫什么就什么
      //   参数2 真正要上传的数据
      fm.append("photo", config.file);
      // 使用axios发送get请求
      this.$axios
        .patch("/mp/v1_0/user/photo", fm)
        .then(data => {
          window.console.log(data);
          this.form.photo = data.data.data.photo;
        })
        .catch(() => {});
    },
    //   保存更新
    save() {
      // 使用axios发送get请求
      this.$axios
        .patch("/mp/v1_0/user/profile", this.form)
        .then(() => {
          this.$message.success("保存成功");
          this.$store.commit('changeUserInfo',this.form)
        })
        .catch(() => {
          this.$message.error("保存失败");
        });
    }
  },
  created() {
    // 使用axios发送get请求
    this.$axios
      .get("/mp/v1_0/user/profile")
      .then(data => {
        window.console.log(data);
        this.form = data.data.data;
      })
      .catch(() => {});
  }
};
</script>

<style lang="less">
.container {
  padding: 10px;
  height: 105%;
  .aside {
    background: #fff;
    border-radius: 10px 0px 0px 10px;
    padding: 10px;
    overflow: hidden;
  }
  .main {
    background: #fff;
    border-radius: 0px 10px 10px 0px;
    padding-left: 50px;
  }
}
// 这里是element上传 的样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>