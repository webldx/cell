<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-button style="margin-top: 10px; margin-bottom: 10px" type="success" plain>添加分类</el-button>
    <!-- 表格 -->
      <el-table border stripe :data="tableData" style="width: 100%">
        <el-table-column prop="cat_namae" label="分类名称" width="180">
          <template>
            <!--
              treeKey 作用是设置每一项的唯一标识3
              parentKey 绑定父级id的属性
              levelKey 绑定不同级别的属性
              indentSize 设置不同级别的缩进
              childKey 默认值是children,标示子节点的属性
            -->
            <el-table-tree-column
              treeKey="cat_id"
              parentKey="cat_pid"
              levelKey="cat_level"
              :indentSize="20"
              prop="cat_name"
              label="分类名称"
              width="300">
            </el-table-tree-column>
          </template>
        </el-table-column>
        <!-- 级别 -->
        <el-table-column prop="cat_level" label="级别" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.cat_level === 0">一级</span>
            <span v-else-if="scope.row.cat_level === 1">二级</span>
            <span v-else-if="scope.row.cat_level === 2">三级</span>
          </template>
        </el-table-column>
        <!-- 是否有效 -->
        <el-table-column width="200" prop="cat_deleted" label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.cat_cat_deleted ? '无效' : '有效'}}
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮点击事件 将弹框显示 -->
            <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            <!-- 给删除按钮添加点击事件并且将当前行的id传过去 -->
            <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
// 配置tree grid 局部组件
import ElTreeGrid from 'element-tree-grid';

export default {
  // 注册局部组件
  components: {
    'el-table-tree-column': ElTreeGrid
  },
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$Http.get('categories?pagenum=1&pagesize=10');
      // console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.result;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.el-main {
  line-height: 30px;
}
</style>
