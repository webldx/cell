// 1.引入axios
import axios from 'axios';
// 引用加载动画组件
import { Loading } from 'element-ui';

const MyHttp = {};

MyHttp.install = function(Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

  // 由于这个变量在请求拦截中和在响应拦截中都要使用
  let loadingInstance = null;
  // Add a request interceptor
  // 添加请求的拦截器
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 1.在请求发送之前，添加请求头token
    // 如果当前请求的地址是/login的时候，不给请求头加token
    // console.log(config.headers);
    // console.log(config.url);
    if (config.url !== 'login') {
      const token = sessionStorage.getItem('token');
      // 设置请求头
      config.headers.Authorization = token;
    };

    // 2.发送请求之前加载loading;
    // this.$loading() this是undefined
    // 显示加载提示
    loadingInstance = Loading.service();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  // 添加响应的拦截器
  axios.interceptors.response.use(function (response) {
    // 影藏加载提示
    loadingInstance.close();
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  Vue.prototype.$Http = axios;
};

export default MyHttp;
