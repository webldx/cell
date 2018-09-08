<template>
  <!-- 卡片 -->
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
    <!-- 表格 -->
    <template>
      <el-table
        stripe
        :data="tableData"
        border
        style="width: 100%; margin-top: 10px">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径" width="180"></el-table-column>
        <el-table-column prop="level" label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level === '0'">一级</span>
            <span v-else-if="scope.row.level === '1'">二级</span>
            <span v-else-if="scope.row.level === '2'">三级</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 表格中绑定的数据是一个数组
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$Http.get('rights/list');
      const { meta: { msg, status } } = response.data;
      // console.log(response);
      if (status === 200) {
        this.tableData = response.data.data;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.el-main {
  line-height: 20px;
}
</style>
