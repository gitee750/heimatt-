<template>
  <div>
    <div class="cover" @click="doOK">
      <img v-if="url" :src="url" class="avatar" />
      <div v-else>
        <h2>点击选择图片</h2>
        <i class="el-icon-picture-outline"></i>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="45%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="header"
            name="image"
            :on-success="isOKimage"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon">
            </i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <Media @change-Image="imageUrl = $event"></Media>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="TrueOK">确 定</el-button>
      </span>
      
    </el-dialog>
  </div>
</template>

<script>
import Media from "../components/media";
export default {
  components: {
    Media
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      imageUrl: "",
      url:"",
      header: {
        Authorization: `Bearer ${this.$store.state.userInfo.token}`
      }
    };
  },
  methods: {
    //   点击内置框确定的时候把图片赋值给外面
    TrueOK(){
        this.dialogVisible = false
        this.url = this.imageUrl
        
        this.$emit('image-current',this.url)

    },
    //获取到上传成功返回的钩子
    isOKimage(response) {
      window.console.log(response);
      this.imageUrl = response.data.url;
    },
    doOK() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.cover {
  width: 180px;
  height: 180px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-icon-picture-outline {
  font-size: 120px;
}
</style>