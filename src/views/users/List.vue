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
        <el-input v-model="searchValue" clearable style="width: 300px" placeholder="请输入内容">
          <el-button @click="handleSeach" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="addUserDialogFormVisible=true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
      <el-table-column prop="create_time" label="时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <!-- 渲染用户状态按钮 -->
          <el-switch @change="hanleChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <!-- 渲染用户操作按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editUserDialogFormVisible" type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <!-- 给删除按钮添加点击事件并且将当前行的id传过去 -->
          <el-button @click="handleDelete(scope.row.id)" type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页样式  后来改变数据 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog @close="handleClose" title="修改用户" :visible.sync="addUserDialogFormVisible">
      <el-form ref="from" :rules="rules" label-width="80px" :model="formData">
        <el-form-item prop="username" label="用户名">
          <!-- prop 用来匹配下面数据定义的验证方式 直接传入参数就可以 -->
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户的对话框 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 将原来死数据删掉,将表单绑定的属性留下
      tableData: [],
      loading: true,
      pagenum: 1,
      pagesize: 2,
      total: 0,
      searchValue: '',
      // 控制添加用户页面的显示与影藏
      addUserDialogFormVisible: false,
      // 绑定添加用户页面的表单对象
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.loadData();
  },
  // 创建一个方法,发送请求,获取数据
  methods: {
    async loadData() {
      // 在一开始请求的时候就得将变量重新赋值
      this.loading = true;
      // 获取token
      const token = sessionStorage.getItem('token');
      // 设置请求头
      this.$Http.defaults.headers.common['Authorization'] = token;
      // 发送请求       将后来添加的数据也进行传参进行发送数据
      const response = await this.$Http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      // console.log(response);
      this.loading = false;
      // 将数据进行结构
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        // 当获取到数据的时候设置总条数
        this.total = response.data.data.total;
        this.tableData = response.data.data.users;
      } else {
        console.log(msg);
      }
    },
    // 当数量发生变化时触发的事件
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
    },
    // 页码发生改变的时候
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
    },
    // 点击手速按钮的时候发送请求
    handleSeach() {
      this.loadData();
    },
    // 删除按钮的点击事件,并且将id进行接收
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 当点击确定按钮的时候执行
        const response = await this.$Http.delete(`users/${id}`);
        // console.log(response);
        // 将返回值进行结构
        const { meta: { msg, status } } = response.data;
        if (status === 200) {
          this.$message.success(msg);
          // 处理问题
          if (this.pagenum > 1 && this.tableData.length === 1) {
            this.pagenum--;
          }
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 改变用户状态
    async hanleChange(user) {
      console.log(user);
      // 发送异步请求
      const response = await this.$Http.put(`users/${user.id}/state/${user.mg_state}`);
      // 将获取的用户信息进行结构
      const { meta: { msg, status } } = response.data;
      // 进行判断
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 添加用户点击确定时
    handleAdd() {
      // 表单验证
      this.$refs.from.validate(async (valid) => {
        if (!valid) {
          this.$message.warning('验证失败');
          return;
        }
        // 验证成功，发送异步请求
        const response = await this.$http.post('users', this.formData);
        // 获取数据，判断添加是否成功
        const { meta: { status, msg } } = response.data;
        if (status === 201) {
          // 成功
          // 提示
          this.$message.success(msg);
          // 刷新表格
          this.loadData();
          // 关闭对话框
          this.addUserDialogFormVisible = false;
        } else {
          // 失败
          this.$message.error(msg);
        }
      });
    },
    // 关闭对话框时清空文本框
    handleClose() {
      // 清空文本框
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    }
  }

  /* loadData() {
    // 设置token,首先从本地中获取token
    // const token = sessionStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    // 设置请求头
    this.$Http.defaults.headers.common['Authorization'] = token;
    // 发送请求     路径  传入参数
    this.$Http.get('users?pagenum=1&pagesize=10')
      .then((response) => {
        console.log(response);
        // 将获取的数据进行结构并进行判断
        const { meta: { msg, status } } = response.data;
        if (status === 200) {
          this.tableData = response.data.data.users;
        } else {
          console.log(msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } */
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

.el-pagination {
  margin: 15px 0;
}
</style>
