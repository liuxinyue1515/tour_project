<template>
  <div id="register">
    <Role @click.native="change('tour')" v-show="role === ''">
      <img src="../assets/imgs/游客登陆.png" alt="游客登陆" />
      <el-button type="success">游客注册</el-button>
    </Role>
    <span class="divider"></span>
    <Role @click.native="change('guide')" v-show="role === ''">
      <img src="../assets/imgs/导游登陆.png" alt="导游登陆" />
      <el-button type="info">导游注册</el-button>
    </Role>
    <transition name="registerframe">
      <RegisterFrame v-show="role !== ''" :role="role"></RegisterFrame>
    </transition>
  </div>
</template>

<script>
import Role from "../components/Role.vue";
import RegisterFrame from "../components/RegisterFrame.vue";

export default {
  name: "Register",
  components: {
    Role,
    RegisterFrame,
  },
  data(){
    return {
      role: '',
    }
  },
  methods: {
    change(roleName) {
      this.role = roleName;
    }
  },
};
</script>

<style scoped>
#register {
  padding-top: 20px;
  display: flex;
  justify-content: center;

  min-height: 100vh;
}
.divider {
  padding: 20px;
}
/* 加载动画 */
.registerframe-enter-active {
  animation: register 0.5s linear;
}

.registerframe-leave-active {
  animation: register 0.5s linear reverse;
}

@keyframes register {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>