<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-radio-group v-model="radio1" @change="menuChanghe">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      <el-upload
        class="upload-demo"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        style="float:right"
        :headers="header"
        name="image"
        :on-success="isok"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in list" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" style="margin-bottom:20px; height:180px">
          <img
            :src="item.url"
              class="image"
              style="height:80%;width:100%"
          />
          <div style="background-color:#f4f5f6" class="box1">
            <el-tooltip class="item" effect="dark" :content="`${item.is_collected ? '取消收藏' : '收藏'}`" placement="top">
              <el-button @click="dochange(item)" :icon="`el-icon-star-${item.is_collected ? 'on' : 'off'}`" type="text"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button icon="el-icon-delete" type="text" @click="doDelect(item)"></el-button>
            </el-tooltip>

            
          </div>
           </el-card>
      </el-col>
    </el-row>
    <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size=12
    @current-change="changePage">
  </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      radio1: "全部",
      list:[],
      total:0,
      page:1,

      header:{
        Authorization: `Bearer ${this.$store.state.userInfo.token}`
      }
    };
  },
  methods:{

    // 上传成功进行页面刷新
    isok(){
      this.loadDate(this.page)
    },
    //点击收藏按钮显示收藏的东西
    menuChanghe(){
      this.loadDate()
    },
    // 点击删除按钮
    doDelect(item){
       // 使用axios发送get请求
       this.$axios.delete(`/mp/v1_0/user/images/${item.id}`).then(() => {
                 this.loadDate(this.page)            
       }).catch(() => {
                             
       });
    },
    // 点击图标按钮取消和收藏
    dochange(item){
      item.is_collected = !item.is_collected
      // 使用axios发送get请求
      this.$axios.put(`/mp/v1_0/user/images/${item.id}`,{
        collect:item.is_collected
      }).then(data => {
                window.console.log(data)            
      }).catch(() => {
                            
      });
    },
    // 点击分页发送请求
    changePage(page){
      this.page = page
      this.loadDate(page)
    },
    // 封装
    loadDate(page = 1){
       this.$axios.get('/mp/v1_0/user/images',{
      params:{
        collect:this.radio1 != '全部' ? true : false,
        page,
        per_page:12
      }
    }).then(data => {
                window.console.log(data)  
                this.list = data.data.data.results;  
                this.total = data.data.data.total_count;   
    }).catch(() => {
                          
    });
    }
  },
  created(){
   this.loadDate()
  }
};
</script>

<style>
.box1{
  display: flex;
  justify-content: space-around;
}
.el-card__body{
  height: 100%;
}
</style>