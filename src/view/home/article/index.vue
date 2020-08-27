<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <!-- 单选状态选择 -->
          <el-radio-group v-model="form.radio">
            <el-radio label="">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>


        <!-- 频道选择 -->
        <!-- <el-form-item label="频道">
          <el-select v-model="form.pindao" placeholder="请选择频道">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option> 
          </el-select>
        </el-form-item> -->
        <el-form-item label="频道">
        <channel @current-change = "form. channel_id = $event"></channel>
        </el-form-item>

        <!-- 时间选择器 -->
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <!-- 筛选按钮 -->
        <el-button type="primary" @click="doserach">筛选</el-button>
      </el-form>
    </div>

    <!-- 卡片下面部分 -->
    <p>共找到{{ Allpage }}条符合条件的内容</p>
    <!-- 文章列表的渲染 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="cover.images[0]" label="封面" width="200">
        <template slot-scope="scope">
          <!-- {{scope.row.cover.images[0]}} -->
          <img style="width:60px; height:60px" v-for="item in scope.row.cover.images" :key="item.id" :src="item" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 1" type="info">{{scope.row.status | formStatus}}</el-tag>
          <el-tag v-if="scope.row.status == 0">{{scope.row.status | formStatus}}</el-tag>
          <el-tag v-if="scope.row.status == 2" type="warning">{{scope.row.status | formStatus}}</el-tag>
          <el-tag v-if="scope.row.status == 3" type="danger">{{scope.row.status | formStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-button size="mini" type="primary" @click="$router.push(`/edit/${scope.row.id}`)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 显示分页数据 -->
    <div class="block">
    <el-pagination
      @current-change="PageChang"
      background
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="Allpage">
    </el-pagination>
    </div>
  </el-card>
  
</template>
<script>
// 导入频道组件
import channel from '../components/channel'
export default {
  name:"aritcle",
  components:{
    channel
  },
  data() {
    return {
      // 筛选的数据
      form: {
        name: "",
        radio: "",
        channel_id: "",
        date:""
      },
      // 频道数据存储
      channelList: [],
      // 文章数据存储
      tableData: [],
      // 总数
      Allpage:0,
      // 页容量 = 总数/pageSize=10 显示下面总共多少页
      pageSize:10,
      // 当前页
      currentPage:0
      
    };
  },
  methods:{
    // 封装 请求文章的数据             因为2个位置都要用到 所以封装
    loadData(page){
    // let token = JSON.parse(window.localStorage.getItem("userInfo")).token;
    this.$axios
      .get("/mp/v1_0/articles", {
        // 因为有权限 所以返回了401错误
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // get请求的参数
        params: {
          page: page,
          per_page: 10
        }
      })
      .then(data => {
        window.console.log(data);
        this.tableData = data.data.data.results;
        this.Allpage = data.data.data.total_count;
      });
    },

    // 点击分页的按钮能显示出点的那一页
    PageChang(page){
    // alert(page)
    // 获取点击文章的页码
    this.loadData(page)
    },

    // 点击筛选按钮发送请求 查询选择的信息
    doserach(){
    // let token = JSON.parse(window.localStorage.getItem("userInfo")).token;
    this.$axios
      .get("/mp/v1_0/articles", {
        // // 因为有权限 所以返回了401错误
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        // get请求的参数
        params: {
          // 将form选择取到的数据 发送请求到后端
          // 这里有个bug 就是选全部的时候传了个空值 但是给的文档里面说不传 就是返回全部 但是现在有个问题
          // 就是传了个空字符串 所以报错
          // 坑点2：这里用的是全等=== 不能用 ==  因为 0 == "" 所以你点草稿的时候传的是0 也会给undefined（相当于不传）
          status:this.form.radio === "" ? undefined : this.form.radio,  //传状态数据(全部"",审核0 ...)
          channel_id:this.form.pindao === "" ? undefined : this.form.pindao, //传频道数据
          // 这里为什么不用上述 因为 不给的时候 ""[0] 就为undefined111
          begin_pubdate:this.form.date[0],  //传开始日期和结束日期
          end_pubdate:this.form.date[1],
          page: 1,
          per_page: 10
        }
      })
      .then(data => {
        window.console.log(data);
        this.tableData = data.data.data.results;
        this.Allpage = data.data.data.total_count;
      });    
    },
    
    // 删除按钮  发送请求到后端删除数据 然后在重新请求数据 实现页面刷新
    deleteRow(id){
        // window.console.log(id)
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求去后台删除信息

          // // 获取token
          // let token = JSON.parse(window.localStorage.getItem("userInfo")).token;  //有没有发现每次都要获取token权限发请求
                                                                                  // 这样代码比较繁琐 在main.js用axios里面的请求拦截器
                                                                                  // 拦截全部下来加token 在发送给后端
          // 使用axios发送delete请求
          this.$axios.delete(`/mp/v1_0/articles/${id}`
        //     // 发送消息头 权限设置
        //      headers: {
        //      Authorization: `Bearer ${token}`
        // }
          ).then(data => {
          window.console.log(data)
          // 删除成功后信息弹框
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadData(this.currentPage)      //这里重新获取数据更新 实现删除更新列表  然后currentPage是当前点击的页码         
          }).catch(() => {
            this.$message({
            type: 'info',
            message: '删除失败!'
          });                   
          });
          
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消删除'
          });          
        });
    }
  },
  created() {
    // // 获取频道信息（因为单独封装了频道组件 所以放到频道组件里去）
    // this.$axios.get("/mp/v1_0/channels").then(data => {
    //   window.console.log(data);
    //   this.channelList = data.data.data.channels;
    // });
    // 获取第一页的文章数据
    this.loadData(1);
    
  },
  //过滤器显示状态码名字
  filters:{
    formStatus(val){
      switch(val){
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2 :
          return '审核通过'
        case 3 :
          return '审核失败'
      }
    }
  }
};
</script>

<style>
</style>