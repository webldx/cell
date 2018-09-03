// 导入vue模块
import Vue from 'vue';
import Router from 'vue-router';
// 将登陆模块导入
import Login from '@/views/Login';
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
