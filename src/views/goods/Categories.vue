<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-button @click="addDialogFormVisible = true" style="margin-top: 10px; margin-bottom: 10px" type="success" plain>添加分类</el-button>
    <!-- 表格 -->
    <el-table height="530" border stripe :data="tableData" style="width: 100%">
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
    <!-- 分页
      size-change 每页数量改变
      current-change 当前页改变
      current-page 绑定当前页
      page-sizes 下拉框显示的条数
      layout 所以功能
      total 总条数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addDialogFormVisible">
      <el-form
        label-width="80px"
        :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 多级下拉框 -->
          <!--
            options 提供展示的数据,是数组
            v-model 数据绑定,默认让谁显示,多级下拉框,绑定的是多个值
            change 选中项改变的时候执行
          -->
          <el-cascader
            change-on-select
            :options="options"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
      tableData: [],
      pagenum: 1,
      pagesize: 9,
      total: 0,
      // 添加分类对话框的显示与隐藏
      addDialogFormVisible: false,
      form: {
        cat_name: ''
      },
      // 绑定多级下拉框
      options: [],
      selectedOptions: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$Http.get(`categories?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.result;
        // 获取响应之后,设置total的值
        this.total = response.data.data.total;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 分页的方法
    handleSizeChange(val) {
      // 重新记录pagesize
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    }
    // 添加按钮的点击事件
    // addDialogFormVisible =
  }
};
</script>

<style>
.el-main {
  line-height: 30px;
}
</style>
