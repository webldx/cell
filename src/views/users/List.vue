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
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="150"></el-table-column>
      <el-table-column prop="create_time" label="时间"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 将原来死数据删掉,将表单绑定的属性留下
      tableData: []
    };
  },
  created() {
    this.loadData();
  },
  // 创建一个方法,发送请求,获取数据
  methods: {
    async loadData() {
      // 获取token
      const token = sessionStorage.getItem('token');
      // 设置请求头
      this.$Http.defaults.headers.common['Authorization'] = token;
      // 发送请求
      const response = await this.$Http.get('users?pagenum=1&pagesize=10');
      // 将数据进行结构
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.users;
      } else {
        console.log(msg);
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
  }

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
