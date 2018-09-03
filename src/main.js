// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// 引入路由控件
import router from './router';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
// 引入插件模块
import MyHttp from '@/plugins/MyHttp';
// 注册element插件
Vue.use(Element);

// 注册 MyHttp 插件
Vue.use(MyHttp);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
