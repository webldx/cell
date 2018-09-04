<template>
  <!-- 头部 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="">
        </el-col>
        <el-col class="middle" :span="19">
          <span>电商后台管理项目</span>
        </el-col>
        <el-col :span="1">
          <!-- 设置退出按钮的点击事件 -->
          <a class="logout" href="#" @click.prevent="handleLogout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <!-- 侧边栏  只有一个子菜单打开   将index作为path进行路径跳转      -->
        <el-menu :unique-opened="true" :router="true" style="height: 100%" default-active="0">
          <el-submenu index="1">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="/users"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="/roles"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="/rights"><i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="3-1"><i class="el-icon-menu"></i>商品列表</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-menu"></i>分类参数</el-menu-item>
              <el-menu-item index="3-3"><i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="4-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="5-1"><i class="el-icon-menu"></i>数据列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

  // 因为页面以上来就是显示主页面,所以在一上来的时候就得验证一下是否有token
  beforeCreate() {
    // 获取本地中的token
    const token = sessionStorage.getItem('token');
    // 判断token是否存在,如果不存在返回结果就是null
    if (!token) {
      // 如果token不存在 进行弹框提示
      this.$message.warning('请先登录');
      // 并进行页面跳转
      this.$router.push('/login');
    }
  },
  // 设置方法
  methods: {
    handleLogout() {
      // 当点击的时候将本地session清除
      sessionStorage.removeItem('token');
      // 并作出提示
      this.$message.success('退出成功');
      // 清除之后进行页面跳转
      this.$router.push('/login');
    }
  }

};
</script>

<style>
.middle {
  text-align: center;
  font-size: 24px;
  color: #fff;
}

.logout {
  text-decoration: none;
  color: orange;
}

.el-container {
  height: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>
