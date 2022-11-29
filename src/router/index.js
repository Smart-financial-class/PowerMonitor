// 1. 定义路由组件.
import * as VueRouter from 'vue-router'
// 也可以从其他文件导入
import HomePage from '../components/HomePage.vue'
import LowPower from '../components/LowPower.vue'
import CarInfo from '../components/CarInfo.vue'
import Statistics from '../components/Statistics.vue'
import Day from '../components/paper/day.vue'
import Month from '../components/paper/month.vue'
import Year from '../components/paper/year.vue'
import MapPage from '../components/MapPage.vue'


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/lowpower', component: LowPower },
  { path: '/carinfo', component: CarInfo },
  {
    path: '/statistics',
    component: Statistics,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: '',
        name: 'Day',
        component: Day,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'month',
        name: 'Month',
        component: Month,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'year',
        name: 'Year',
        component: Year,
      },
    ],
  },
  { path: '/map', component: MapPage },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes // `routes: routes` 的缩写
})

export default router
