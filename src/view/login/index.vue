<template>
  <div id="mylogin">
     <div class="login">
     <div class="logo">
       <img src="./images/login_logo.png"  alt="">
     </div>
<!-- 表单 -->
  <el-form :model="form" 
    ref="form" 
    :rules="rules"
    status-icon
    class="demo-ruleForm">
    <el-form-item prop='mobile' >
    <el-input v-model="form.mobile" placeholder="请输入手机号码"></el-input>
  </el-form-item>
<!-- 使用布局layout 分开输入框和按钮 -->
<el-form-item prop="code">
  <el-row :gutter="20">
  <el-col :span="14"><div class="grid-content bg-purple"><el-input v-model="form.code" placeholder="请输入验证码"></el-input></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple" ><el-button :disabled="btndisabled" @click="timeID">{{btntext}} </el-button></div></el-col>
  </el-row>
</el-form-item>

<!-- 多选按钮 -->
 
    <el-form-item prop="agree">
    <el-checkbox-group v-model="form.agree">
      <el-checkbox v-model="form.agree" name="agree">我已阅读并同意<a href="javascript:void(0)">用户协议</a> 和 <a href="javascript:void(0)">隐私条款</a></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

<!-- 登录按钮 -->
  <el-form-item>
    <el-button type="primary" :loading="isSubmit" style="width:100%" @click="submitForm('form')">{{msg}}</el-button>
  </el-form-item>
</el-form>
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 登录字样
      msg:"登录",
      // 登录loading
      isSubmit:false,
      // 定义初始
      btntext:'获取验证码',
      //是否禁用按钮
      btndisabled:false,
      //这个是饿了么表单对象 数据
      form:{
        code:'246810',
        mobile:'13911111111',
        agree:false,
      },
      // 这里饿了么 定义的规则
      rules:{
         //定义手机规则
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern:'0?(13|14|15|17|18|19)[0-9]{9}',min:11,max:11,message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          //定义验证码规则
           code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min:6,max:6,message: '请输入6位验证码', trigger: 'blur' }
          ],
          //定义勾选框规则
          agree: [
            {pattern:/true/, message: '请勾选协议条款~', trigger: 'change' }
          ]
      }
    }
    
  },
  methods:{
    // 倒计时验证码
    timeID(){
      // 当点击按钮时候 disabled 绑定的值  btndisabled 改为true 按钮被锁定
      this.btndisabled = true;
      //定义一个sec 记录时间
      let sec = 60;
      //点击后 挖坑btntext 的 获取验证码 改为 还有60秒
      this.btntext = '还有60秒'
      // 定义一个计时器
      let timeID = setInterval(()=>{
         sec--; //开始作倒计时
         this.btntext = '还有' + sec + "秒"; //将btntext 改为  倒计时时间 进行倒数
         if(sec == 0 ){  //如果sec倒数到0时 就摧毁计时器
           clearInterval(timeID)
           this.btntext = '获取验证码';
           this.btndisabled = false;
         }
      },1000)
      
    },
    // 点击登录按钮 验证是否全部勾选和填空 如果通过 就发送请求
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {  
           this.isSubmit = true;
           this.msg = '登录中...'
           this.$axios.post('/mp/v1_0/authorizations',{
               mobile:this.form.mobile,
               code:this.form.code
           }).then(data =>{
               window.console.log(data)
               this.$message.success('登录成功!')
              //  存vuex时候也把本地存储存进去
              //  window.localStorage.setItem('userInfo',JSON.stringify(data.data.data))

              //  把数据也存到vuex中
               this.$store.commit('changeUserInfo',data.data.data)
               
               this.$router.push('./home')
           }).catch(()=>{
             this.$message.error('账号或验证码错误!')
              this.isSubmit = false;
           })
          } 
        });
      }
  }
}
</script>

<style lang = "less" scoped>
 #mylogin{
    background: url(./images/login_bg.jpg) no-repeat center / cover ;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login{
      width: 380px;
      background:white;
      padding: 20px 40px;
    }
    .logo{
      text-align: center;
      padding: 20px;
       img{
         width: 150px;
       }
    }
 }
</style>