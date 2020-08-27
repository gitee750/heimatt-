import Vue from 'vue'

// 导入router跳转
import router from '../src/router/index'
// 导入全局axios请求
import Axios from 'axios'
import JSONbigint from 'json-bigint' //导入了JSON-bigint这个是切割数据分成2个数组存储
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
// //这里设置axios发送过来请求的时候数据过大 造成默认的JSON.string() 超过最大安全值 数据精确度改变 导致数据丢失
// // // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
Axios.defaults.transformResponse = [function (data) {
  // 对 data 进行任意转换处理
  // return data; 这里本来默认是return JSON.String(data) 不要 因为会造成数据的丢失
  // return JSONbigint(data);
  try{  //有时候为data为空 就进入catch里面返回数据   这里的data是所有请求返回的data值
    return JSONbigint.parse(data);
  }
  catch{
    return data;
  }
}],

// 给Axios 添加拦截器 给请求头加权限 不然每次发请求都要获取token权限 比较繁琐
// 请求之前拦截 （请求头拦截）
Axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let obj = JSON.parse(window.localStorage.getItem('userInfo'))
  if(obj){
     config.headers.Authorization = `Bearer ${obj.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 这里防止有人伪造token 然后通过地址栏跳转到另外一个页面
Axios.interceptors.response.use(function (response) {
  // window.console.log('响应成功')
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  // window.console.dir('响应失败',error)
  // return Promise.reject(error);
  if(error.response.status == 401){
    Vue.prototype.$message.error('请先登录')
    router.push('/login')
  }else{
    
  return Promise.reject(error);
  }
});

//这里不用暴露 因为已经加载到vue原型链上去了