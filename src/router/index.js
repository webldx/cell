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

import Categories from '@/views/goods/Categories';
// 将elementUI组件进行引入
import { Message } from 'element-ui';
// 将商品列表组件进行引入
import Goods from '@/views/goods/Goods';
Vue.use(Router);

const router = new Router({
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
        }, {
          name: 'categories',
          path: '/categories',
          component: Categories
        }, {
          name: 'goods',
          path: '/goods',
          component: Goods
        }
      ]
    }
  ]
});

// 设置路由的前置守卫
router.beforeEach((to, from, next) => {
  // 如果跳转到的地方有 login 进向下执行
  if (to.name === 'login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      router.push('/login');
      Message.warning('请先登录');
    }
  }
});

export default router;
