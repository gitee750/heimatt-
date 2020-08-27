<template>
 <div class="comment">
   <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="标题" width="180"></el-table-column>
    <el-table-column prop="comment_status" label="评论状态" width="180" align="center">
      <template slot-scope="scope">{{scope.row.comment_status ? "正常" : "关闭"}}</template>
    </el-table-column>
    <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
    <el-table-column prop="fans_comment_count" label="评论粉丝数" align="center"></el-table-column>
    <!-- 评论滑钮 -->
    <el-table-column prop="address" label="允许评论" align="center">
      <template slot-scope="scope">
        <el-switch v-model="scope.row.comment_status" active-color="#13ce66" inactive-color="#ff4949" @change="isComment(scope.row.id,$event)"></el-switch>
      </template>
    </el-table-column>
    <!-- 修改按钮 -->
    <el-table-column prop="address" label="操作" align="center">
      <el-button type="primary" plain size="mini">修改</el-button>
    </el-table-column>
  </el-table>

 <!-- 分页 -->
 <!-- :current-page.sync = "page" 这里+ sync 是因为异步 -->
  <div class="block">
    <el-pagination
      @size-change = "sizePage"
      @current-change="pagechange"
      :current-page.sync = "page"   
      :page-sizes="[10, 15, 20, 30]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count">
    </el-pagination>
  </div>
 </div>
</template>

<script>
export default {
  name:"comment",
  data() {
    return {
      tableData: [],
      total_count:0,
      page:1
    };
  },
  methods:{
    // 这里是滑动按钮发送请求
    isComment(id,val){
      // window.console.log(id)
      // window.console.log(val)
      // 使用axios发送get请求
      this.$axios.put('/mp/v1_0/comments/status',{
        allow_comment:val  //这里传的是 按钮点击后 是true还是false
      },{
        params:{
          article_id: '' + id    //这里是对象 字符串拼接会自动调用toString  或者 你直接id.toString
        }
      }).then(() => {
          this.$message.success('修改成功')                   
      }).catch(() => {
          this.$message.error('修改失败')                                    
      });
    },
    // 这里是页面改变事件
    pagechange(page){
      window.console.log(page)
      this.TableDate(page)
    },
    // 这里是页容量点击 一页多少条
    sizePage(size){
      this.TableDate(this.page,size);
    },

    // 封装
    TableDate(page,size = 10){
      // 使用axios发送get请求
    this.$axios
      .get("/mp/v1_0/articles", {
        params: {
          page,
          per_page: size,
          response_type: "comment"
        }
      })
      .then(data => {
        window.console.log(data);
        this.tableData = data.data.data.results;
        this.total_count = data.data.data.total_count
      })
      .catch(() => {});
    },
  },

  created() {
    // 页面一进来就发请求
    // 使用axios发送get请求
   this.TableDate(1)
  }
};
</script>

<style scoped>
 .comment{
   height: 100%;
   padding: 15px;
 }
</style>