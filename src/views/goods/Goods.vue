<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 搜索按钮 -->
    <el-row class="row">
      <el-col :span="24">
        <el-input clearable style="width: 300px" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="$router.push('/goods/add')" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table stripe border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table >
    <!-- 表格分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // 后加 在发送请求的时候,,将当前定义的pagenum与pagesize一同发送
      const response = await this.$Http.get(`/goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.goods;
        // 后加-->将获取总条数复值给total
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页事件 每页条数发生变化的时候
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 当前页发生变化的时候
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.row {
  margin: 10px 0 10px 0;
}

.el-main {
  line-height : 20px;
}
/* 将格子里面的文字进行强制换行 */
.el-table .cell {
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
