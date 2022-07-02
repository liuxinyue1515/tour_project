<template> 
  <!-- 父组件 -->
  <div id="app">
    <div class="head">景区导游系统</div>
    <Banner></Banner>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import Home from "./pages/Home.vue";
import Banner from "./components/Banner.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Home,
    Banner,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    toBoolean(str) {
      return str === "true" ? true : false;
    },
  },
  beforeMount() {
    let username = window.localStorage.getItem("username");
    let email = window.localStorage.getItem("email");
    let uid = window.localStorage.getItem("uid");
    let isLogin = this.toBoolean(window.localStorage.getItem("isLogin"));
    let isTour = this.toBoolean(window.localStorage.getItem("isTour"));
    let isGuide = this.toBoolean(window.localStorage.getItem("isGuide"));
    let fromAdmin = this.toBoolean(window.localStorage.getItem("fromAdmin"));

    this.$store.commit("setUser", {
      username,
      email,
      uid,
      isLogin,
      isTour,
      isGuide,
      fromAdmin,
    });
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.head {
  font-family: "微软雅黑";
  font-size: 40px;
  font-weight: bold;
  position: relative;
  top: -25px;
  color: SlateGray;
}
</style>
