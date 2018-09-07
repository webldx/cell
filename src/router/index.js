// 导入vue模块
import Vue from 'vue';
import Router from 'vue-router';
// 将登陆模块导入
import Login from '@/views/Login';
// 导入首页模块
import Home from '@/views/home';
// 导入用户模块
import UsersList from '@/views/users/List';
// 导入组件用户角色
import Rights from '@/views/rights/Rights';
// 导入角色列表组件
import Roles from '@/views/rights/Roles';
Vue.use(Router);

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }, {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: UsersList
        }, {
          name: 'rights',
          path: '/rights',
          component: Rights
        }, {
          name: 'roles',
          path: 'roles',
          component: Roles
        }
      ]
    }
  ]
});
