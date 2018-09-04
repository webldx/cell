<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 设置搜索框 -->
    <el-row class="row">
      <el-col :span="24">
        <el-input
          style="width: 300px"
          placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {

};
</script>

<style>
.box-card {
  height: 100%;
}

.row {
  margin: 15px 0;
}

.el-main {
  line-height: 30px;
}
</style>
