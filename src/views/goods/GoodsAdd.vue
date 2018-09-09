<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- alert -->
    <el-alert class="alert" :clearable="false" title="添加商品信息" type="warning" show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps align-center :active="active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab栏 -->
    <el-tabs @click="handleClick" tab-position="left" style="margin-top: 15px">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    //  点击tab栏时候执行的方法 默认会有一个参数
    handleClick(tab) {
      console.log(tab);
    }
  }
};
</script>

<style>
.alert {
  margin: 10px 0 10px 0;
}

.el-main {
  line-height: 20px;
}
</style>
