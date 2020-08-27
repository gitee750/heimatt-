<template>
   <el-card>
    <div slot="header" class="clearfix">
      <el-radio-group v-model="radio1" @change="menuChanghe">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
      
    </div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in list" :key="item.id">
        <el-card :body-style="{ padding: '0px' }" style="margin-bottom:20px; height:150px" class="my-card"
         :class="{checked: item === currentItem}"
         @click.native="doItem(item)"
        >
        <!-- 因为el-card 没有点击事件 所以用.native 获取到源生的div点击事件 -->
        <!-- 上面判断是否点击元素  因为是v-for  所以 item 是否===与被点击的事件  刚好点击事件起个名字currentItem 等于item点击的元素  @click.native="currentItem = item"-->
          <img
            :src="item.url"
              class="image"
              style="height:100%;width:100%"
          />
           </el-card>
      </el-col>
    </el-row>
    <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size=6
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
      currentItem:null,
      header:{
        Authorization: `Bearer ${this.$store.state.userInfo.token}`
      }
    };
  },
  methods:{

     doItem(item){
       this.currentItem = item
       this.$emit('change-Image',item.url)
     },
        //点击收藏按钮显示收藏的东西
       menuChanghe(){
      this.loadDate()
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
        per_page:6
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

<style lang="less" scoped>

.my-card{
  display: flex;
  justify-content: space-around;
  position: relative;
  &.checked::before{
     content:"";
     background-color: rgba(0, 0, 0, 0.4);
     width: 100%;
     height: 100%;
     position: absolute;
     background: url(https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1590427446&di=ce651a264abce6aec19912a7c3a9c534&src=http://pic.51yuansu.com/pic3/cover/01/04/90/5900f3d13e487_610.jpg);
     background-size: 50px;
     background-repeat: no-repeat;
     background-position: right top;
}
}
.el-card__body{
  height: 100%;
}
</style>