import Vue from 'vue'
import Vuex from 'vuex'
// 使用Vuex
Vue.use(Vuex)


const store = new Vuex.Store({
    
    state :{
        ActiveIndex:"",
        userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
    },
    mutations:{
        changeUserInfo(state,obj){
            // state.userInfo.name = obj.name
            // state.userInfo.photo = obj.photo
            // state.userInfo.intro = obj.intro
            // state.userInfo.email = obj.email
            // state.userInfo.mobile = obj.mobile
            // if(obj.token){
            //     state.userInfo.token = obj.token
            // }
            // 优化上面  这里有个函数 Object.assign() 就是把最新对象的值 覆盖到旧对象的值 没有的就添加 有的还留着 就是总和起来
            Object.assign(state.userInfo,obj)  //这优化牛逼
           

            window.localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        },

        //改变  changeActive
        changeActive(state,active){
           state.ActiveIndex = active
        }
    }
})

export default store;