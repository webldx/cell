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
    <el-form label-position="top" label-width="80px" :model="formData">
      <el-tabs @tab-click="handleTabClick" tab-position="left" style="margin-top: 15px">
        <el-tab-pane label="基本信息">
          <!-- 基本信息 -->
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 多级下拉框 -->
            <el-cascader
              @change="handleChange"
              clearable
              expand-trigger="hover"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
              v-model="selectedOptions">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 步骤条高亮显示
      active: 0,
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        // 以为','分割的分类列表
        goods_cat: ''
      },
      // 绑定多级下拉框的数据
      options: [],
      // 绑定下拉框中的options
      selectedOptions: []
    };
  },
  created() {
    this.loadOptions();
  },
  methods: {
    //  点击tab栏时候执行的方法 默认会有一个参数
    handleTabClick(tab) {
      // console.log(tab);
      this.active = tab.index - 0;
    },
    // 加载多级下拉框中的数据
    async loadOptions() {
      const response = await this.$Http.get(`categories?type=3`);
      // console.log(response);
      this.options = response.data.data;
    },
    // 多级下拉框发生改变的时候
    handleChange() {
      console.log(this.selectedOptions);
      if (this.selectedOptions.length !== 3) {
        // 提示 并且将数组清空
        this.$message.warning('请选择商品的三级分类');
        this.selectedOptions.length = 0;
      }
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
