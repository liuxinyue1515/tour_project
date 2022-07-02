// 组件资源共享

// 引入Vue核心库
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'

// 应用Vuex插件
Vue.use(Vuex)

// 准备actions对象——响应组件中用户的动作
const actions = {

}

// 准备mutations对象——修改state中的数据
const mutations = {
    setUser(state,value) {
        state.user.username = value.username
        state.user.email = value.email
        state.user.uid = value.uid
        state.user.isLogin = value.isLogin
        state.user.isTour = value.isTour
        state.user.isGuide = value.isGuide
        state.user.fromAdmin = value.fromAdmin
    },
    setTourArr(state, value) {
        state.tourArr = value
    }
}

// 准备state对象——保存具体的数据
const state = {
    user:{
        username: '',
        email: '',
        uid: '',
        isLogin: false,
        isTour: false,
        isGuide: false,
        fromAdmin: false
    },
    tourArr: [],
}

const getters = {

}

// 创建并暴露store
export default new Vuex.Store({	
    actions,	
    mutations,	
    state,
    getters
})