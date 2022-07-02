<template>
  <div id="login">
    <Role @click.native="change('tour')" v-show="role === ''">
      <img src="../assets/imgs/游客登陆.png" alt="游客登陆" />
      <el-button type="success">游客登陆</el-button>
    </Role>
    <span class="divider"></span>
    <Role @click.native="change('guide')" v-show="role === ''">
      <img src="../assets/imgs/导游登陆.png" alt="导游登陆" />
      <el-button type="info">导游登陆</el-button>
    </Role>
    <span class="divider"></span>
    <Role @click.native="change('manage')" v-show="role === ''">
      <img src="../assets/imgs/管理员登陆.png" alt="管理员登陆" />
      <el-button>管理员登陆</el-button>
    </Role>
    <transition name="loginframe">
      <LoginFrame v-show="role !== ''" :role="role"></LoginFrame>
    </transition>
  </div>
</template>

<script>
import Role from "../components/Role.vue";
import LoginFrame from "../components/LoginFrame.vue";

export default {
  name: "Login",
  components: {
    Role,
    LoginFrame,
  },
  data() {
    return {
      role: "",
    };
  },
  methods: {
    change(roleName) {
      this.role = roleName;
    },
  },
};
</script>

<style scoped>
#login {
  padding-top: 20px;
  display: flex;
  justify-content: center;

  min-height: 100vh;
}
/* 加载动画 */
.loginframe-enter-active {
  animation: login 0.5s linear;
}

.loginframe-leave-active {
  animation: login 0.5s linear reverse;
}

.divider {
  padding: 20px;
}

@keyframes login {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>