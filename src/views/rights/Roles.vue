<template>
  <el-card class="card">
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <!-- 按钮 -->
    <el-button type="success" style="margin-top: 10px; margin-bottom: 10px">添加角色</el-button>
    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 一级权限 -->
          <el-row v-for="level1 in scope.row.children" :key="level1.id">
            <el-col :span="4">
              <!-- 显示一级权限的名字 -->
              <el-tag @close="handleClose(scope.row, level1.id)" closable>{{ level1.authName }}</el-tag>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="4">
                  <!-- 显示二级权限的名称 -->
                  <el-tag @close="handleClose(scope.row, level2.id)" closable type="success">
                    {{ level2.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag class="level3" closable type="warning"  @close="handleClose(scope.row, level3.id)"
                    v-for="level3 in level2.children" :key="level3.id">
                    {{ level3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!-- 如果没有权限 -->
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="300">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="300">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <!-- 分配权限按钮 -->
          <el-button @click="handleOpenDialog(scope.row)" size="mini" type="success" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限分配弹出层 -->
    <el-dialog title="权限分配" :visible.sync="dialogVisible">
      <!--
        data :绑定到树上的数据
        props:告诉树上的节点要展示的属性是哪个,子节点对应的属性是哪个
        如果要使用 default-checked-keys,必须要设置tree的node-key给每一个自己点设置一个唯一的值
        default-checked-keys 设置树上的哪些节点被选中
      -->
      <el-tree
        ref="tree"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKeys"
        :data="data"
        :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRights">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      data: [],
      defaultProps: {
      // 树上的节点绑定对象的属性
        label: 'authName',
        // 对象的子节点绑定对象的属性
        children: 'children'
      },
      checkedKeys: [],
      // 记录当前角色的id
      currentRoleId: -1
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$Http.get('roles');
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        // 如果成功时将数据进行赋值
        // console.log(response.data);
        this.tableData = response.data.data;
      } else {
        // console.log(msg);
        this.$message.error(msg);
      }
    },
    // 角色权限标签删除按钮的点击事件
    async handleClose(user, levelId) {
      // console.log(user);
      // console.log(levelId);
      const response = await this.$Http.delete(`roles/${user.id}/rights/${levelId}`);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        // 当成功的时候将角色对象的权限进行重新赋值
        user.children = response.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    // 点击权限分配 显示对话框
    async handleOpenDialog(role) {
      this.dialogVisible = true;
      const response = await this.$Http.get('rights/tree');
      // console.log(response);
      this.data = response.data.data;

      // 设置当前角色所拥有的权限被选中
      // 当角色role作用有的三级权限id
      const arr = [];
      // 将一级权限进行遍历
      role.children.forEach((level1) => {
        level1.children.forEach((level2) => {
          level2.children.forEach((level3) => {
            arr.push(level3.id);
          });
        });
      });
      this.checkedKeys = arr;
      // console.log(arr);
      // 记录当前角色的id
      this.currentRoleId = role.id;
    },
    // 点击确定按钮时,发送请求
    async handleSetRights() {
      // 获取到树上选中的和半选中的id
      const arr1 = this.$refs.tree.getCheckedKeys();
      const arr2 = this.$refs.tree.getHalfCheckedKeys();

      const arr3 = [...arr1, ...arr2];
      const rids = arr3.join(',');
      // 发送请求
      const response = await this.$Http.post((`roles/${this.currentRoleId}/rights`), { rids: rids });
      // console.log(response);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.dialogVisible = false;
        this.loadData();
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

.level3 {
  margin: 0 5px 5px 0;
}
</style>
