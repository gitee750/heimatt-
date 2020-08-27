<template>
    <!-- 这里封装下拉选框  实现多个页面复用 -->
      <el-select v-model="id" placeholder="请选择频道" @change="$emit('current-change',id)">
        <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            channelList:[],
        }
    },
    created(){
    // 获取频道信息
    this.$axios.get("/mp/v1_0/channels").then(data => {
      window.console.log(data);
      this.channelList = data.data.data.channels;
    })
}
};
</script>

<style>
</style>