<template>
  <div class="login-wrap">
    <el-form
      :model="formData"
      label-position="top"
      label-width="80px"
      class="login-form">
      <h2>用户登陆</h2>
      <el-form-item label="用户名" >
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input @keyup.enter.native="handleLogin" v-model="formData.password" type="password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin" class="login-btn" type="primary">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      const response = await this.$Http.post('login', this.formData);
      const {meta: { msg, status }} = response.data;
      console.log(response.data);
      if (status === 200) {
        // 使用组件中的弹框进行提醒
        this.$message.success(msg);
        // (重要) 在登录成功的时候将token记录一下
        // 将用户token 记录到sessionStorage
        sessionStorage.setItem('token', response.data.data.token);
        this.$router.push('/');
      } else {
        this.$message.error(msg);
        console.log(msg);
      }
    }
  }
  /* handleLogin() {
    // console.log(this.formData);
    this.$Http.post('login', this.formData)
      .then((response) => {
        // 将对象结构赋值
        const {meta: { msg, status }} = response.data;
        console.log(response);
        if (status === 200) {
          // 使用组件中的弹框进行提醒
          this.$message.success(msg);

          // (重要) 在登录成功的时候将token记录一下
          // 将用户token 记录到sessionStorage
          sessionStorage.setItem('token', response.data.data.token);
          this.$router.push('/');
        } else {
          this.$message.error(msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } */
};

</script>

<style>
.login-wrap {
  background-color: pink;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
}

.login-btn {
  width: 400px;
}
</style>
