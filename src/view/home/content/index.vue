<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{Heartitle}}</span>
      </div>
      <el-form ref="form" :model="form" label-width="55px" :rules="rules">
        <div class="title">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="内容">
          <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <div class="boxCover">
          <Cover v-for = "(item,index) in form.cover.type" :key="item" @image-current="form.cover.images[index] = $event"></Cover>
          </div>
        </el-form-item>
        <!-- 这里用到了子传父   和  父传子-->
        <el-form-item label="频道">
          <channel @current-change="form.channel_id = $event" :id="form.channel_id"></channel>
        </el-form-item>

        <el-button size="small" @click="draft()">草稿</el-button>
        <el-button type="primary" size="small" @click="send()">{{btn}}</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 这里导入富文本
import { quillEditor } from "vue-quill-editor";
// 导入封装的频道组件
import channel from "../components/channel";
// 导入图片加载框事件
import Cover from '../content/components/cover'
export default {
  name: "contents",
  components: {
    quillEditor,
    channel,
    Cover
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        channel_id: "",
        cover: {
          type: '',
          images: []
        }
      },
      Heartitle: "发表文章",
      btn: "发布",

      // 这里判断点发布的时候 不要触发离开那个提示 用了开关思想
      isSend: false,
      // 定义规则
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度 5 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //  点击发布按钮  发送请求到后端 提交数据
    send() {
      //这里传个参数 isDraft false 就是存为草稿  true就是发布  如果不传默认是true 发布
      //这里判断一下是修改按钮的组件还是发表文章的组件 然后发请求一个是发布 一个是修改
      if (this.$route.name === "edit") {
        const id = this.$route.params.id;
        // 使用axios发送get请求
        this.$axios
          .put(`/mp/v1_0/articles/${id}`, this.form)
          .then(() => {
            this.$message.success("修改成功");
            this.isSend = true;
            this.$store.state.ActiveIndex = "/content";
            this.$router.push("/article");
          })
          .catch(() => {
            this.$message.error("修改失败");
          });
      } else {
        // 使用axios发送get请求
        this.$axios
          .post("/mp/v1_0/articles", this.form)
          .then(() => {
            //   window.console.log(data);
            this.$message.success("新增成功");
            this.isSend = true;
            this.$router.push("/article");
          })
          .catch(() => {
            this.$message.error("新增的内容不能为空");
          });
      }
    },
    // 草稿
    draft() {
      this.$axios
        .post("/mp/v1_0/articles", this.form, {
          params: {
            draft: true //这里是文档中的Query--draft
          }
        })
        .then(() => {
          //   window.console.log(data);
          this.$message.success("新增成功");
          this.isSend = true;
          this.$router.push("/article");
        })
        .catch(() => {
          this.$message.error("新增的内容不能为空");
        });
    }
  },
  watch: {
    // 侦听器
    "$route.name"() {
      if (this.$route.name === "edit") {
        this.Heartitle = "修改文章";
        this.btn = "修改";
      } else {
        this.Heartitle = "发表文章";
        this.btn = "发表";
        this.title = "";
        this.content = "";
        this.channel_id = "";
      }
    }
  },
  created() {
    // 因为created只调用一次 (组件还在没被销毁) 所以改变 发表 修改字体 和按钮 不可取  这时候得用侦听器
    //因为内容列表和发布文章的修改按钮是公用一个组件  点击修改按钮时候才获取到id 所以用作判断 不然点击内容列表地址栏
    //   里面没有值会报错
    if (this.$route.name === "edit") {
      this.Heartitle = "修改文章";
      this.btn = "修改";
      // 使用axios发送get请求
      const id = this.$route.params.id;
      this.$axios
        .get(`/mp/v1_0/articles/${id}`)
        .then(data => {
          window.console.log(data);
          this.form = data.data.data;
        })
        .catch(() => {});
    }
  },
  // 导航守卫  离开导航之前触发
  beforeRouteLeave(to, from, next) {
    if (this.isSend) {
      next();
    } else {
      if ((this.form.title != "") | (this.form.content != "")) {
        this.$confirm("页面存在改变内容,请问是否离开?", "是否离开")
          .then(() => {
            next();
          })
          .catch(() => {});
      } else {
        next();
      }
    }
  }
};
</script>

<style lang="less">
.content {
  margin: 30px;
  .title {
    padding-right: 50%;
  }
}
.ql-editor {
  height: 400px;
}

.boxCover{
  width: 600px;
  display: flex;
  justify-content:space-between;
}
</style>