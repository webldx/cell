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
          <a class="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <!-- 侧边栏 -->
        <el-menu default-active="1-1">
          <el-submenu index="1">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="1-1"><i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <!-- 显示的是父菜单的内容 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <!-- 菜单项 el-menu-item -->
              <el-menu-item index="2-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
              <el-menu-item index="2-2"><i class="el-icon-menu"></i>权限列表</el-menu-item>
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
              <el-menu-item index="3-2"><i class="el-icon-menu"></i>商品分类</el-menu-item>
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
