import {RouteRecordRaw, createRouter,createWebHashHistory} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'login',
        component:() => import('@/views/Login.vue')
    },
    {
        path:'/home',
        name:'home',
        component:() => import('@/views/Home.vue')
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path=='/'){
      // 登录页直接放行
      next()
    }else{
      // 其他页，先验证token，再放行
      if(sessionStorage.getItem('token')){
        next()
      }else{
        alert('请先登录！')
        // 验证失败，跳回到登录页
        next('/')
      }
    }
  })

export default router;