// -----------路由配置--------------
import Vue from 'vue'
// 因为 vue原型拿不到 new Vue（） 一个对象也不行  最后办法为导包
import store from '../store/index'
// 导包
import VueRouter from 'vue-router'
// 在vue用包vueRouter
Vue.use(VueRouter)
// 导入路由模版链接
import Login from '../view/login/index.vue'
import Home  from '../view/home/index.vue'
import Article from '../view/home/article/index.vue'
import Content from '../view/home/content/index.vue'
import Comment from '../view/home/comment/index.vue'
import Account from '../view/home/account/index.vue'
import Matter from '../view/home/matter/index.vue'
import Index from '../view/home/index/index.vue'
import Echarts from '../view/home/echarts/echarts.vue'
// 定义路由规则
const routes = [{
    path:'/login',
    component:Login
},{
    path:'/home',
    redirect:'/index',
    component:Home,
    children:[{ path:'/article',component:Article},
              { path:'/content',component:Content},  
              { path:'/edit/:id',component:Content,name:'edit'},
              { path:'/comment',component:Comment},
              { path:'/account',component:Account} ,
              { path:'/matter',component:Matter},
              { path:'/index', component:Index}, 
              { path:'/echarts', component:Echarts} 
]
},{
    path:'/',
    redirect:'/login'
}]
// 将routes 放Vuerouter上并且挂载到vue实例上去
const router = new VueRouter({
    routes
})

// 这里配合前置 后置守卫 实现进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//设置导航前置守卫 拦截非拿到本地存储 而跳转到的页面

router.beforeEach((to,from,next) =>{
    //进度条
    nprogress.start();
    if(to.path == '/login'){
        next();
    }else{
        let str = window.localStorage.getItem('userInfo');
        if(str){
            next();
        }else{
            Vue.prototype.$message.error('请先登录')
            router.push('/login')
            // next('/login')
        }
        
    }
})

//导航后置守卫
router.afterEach((to) => {
    // ...导航进去之后 进度条
    // 模拟网络延迟
    setTimeout(()=>{
        nprogress.done();
    },500)

    store.commit('changeActive',to.path)
  })

// 因为Vue实例在main.js里面 所有暴露出去
export default router;