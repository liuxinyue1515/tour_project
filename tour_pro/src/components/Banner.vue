<template>
  <!-- 导航栏 -->
  <div id="banner">
    <div class="line"></div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#F0FFFF"
      :router="true"
    >
      <el-menu-item id="title" class="banned">逍遥游</el-menu-item>
      <el-menu-item index="/home">
        <img src="../assets/imgs/首页.png" alt="首页" />
        首页
      </el-menu-item>
      <el-menu-item index="tourlist">
        <img src="../assets/imgs/旅游景点.png" alt="旅游景点" />
        旅游景点
      </el-menu-item>
      <el-menu-item id="search" class="banned">
        <el-input placeholder="请输入景点名称" v-model="search" clearable>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click.native="searchTour"
          ></el-button>
        </el-input>
      </el-menu-item>
      <el-menu-item index="login" v-show="!user.isLogin">
        <img src="../assets/imgs/登陆.png" alt="登陆" />
        登陆
      </el-menu-item>
      <el-menu-item v-show="user.isLogin" @click.native="logout">
        <img src="../assets/imgs/登出.png" alt="登出" />
        登出
      </el-menu-item>
      <el-menu-item
        index="bought"
        :route="{ path: '/bought' }"
        v-show="user.isTour"
      >
        <img src="../assets/imgs/服务.png" alt="已购服务" />
        已购服务
      </el-menu-item>
      <el-menu-item
        index="plan"
        :route="{ path: '/plan' }"
        v-show="user.isTour"
      >
        <img src="../assets/imgs/计划.png" alt="收藏" />
        已收藏
      </el-menu-item>
      <el-menu-item index="register" v-show="!user.isLogin">
        <img src="../assets/imgs/注册.png" alt="注册" />
        注册
      </el-menu-item>
      <el-submenu index="create" v-show="user.isGuide || user.fromAdmin">
        <template slot="title">
          <img src="../assets/imgs/创建.png" alt="创建" />
          创建
        </template>
        <el-menu-item index="createtour">创建景点</el-menu-item>
        <el-menu-item
          index="createtemplate?pageNum=1&pageSize=20&aState=1"
          v-show="user.isGuide"
          >创建导游服务模板</el-menu-item
        >
      </el-submenu>
      <el-submenu index="manage" v-show="user.isGuide || user.fromAdmin">
        <template slot="title">
          <img src="../assets/imgs/管理.png" alt="管理" />
          管理
        </template>
        <el-menu-item index="managevisit" v-show="user.fromAdmin"
          >游客</el-menu-item
        >
        <el-menu-item index="manageguide" v-show="user.fromAdmin"
          >导游</el-menu-item
        >
        <el-menu-item index="managetour" v-show="user.fromAdmin"
          >景点</el-menu-item
        >
        <el-menu-item index="manageservice">导游服务</el-menu-item>
        <el-menu-item index="managetemplate" v-show="user.isGuide"
          >服务模板</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "Banner",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapState(["tourArr"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    ...mapMutations(["setTourArr"]),
    logout() {
      if (confirm("是否退出")) {
        this.setUser({
          username: "",
          email: "",
          uid: "",
          isLogin: false,
          isTour: false,
          isGuide: false,
          fromAdmin: false,
        });
        window.localStorage.clear();
        this.$notify({
          message: "已退出",
          type: "success",
        });
        this.$router.push({
          name: "login",
        });
      }
    },
    searchTour() {
      if (this.search.trim() !== this.$route.query.search) {
        this.$router.push({
          name: "tour-list",
          query: {
            search: this.search.trim(),
          },
        });
      }
      this.search = "";
    },
  },
};
</script>

<style scoped>
#banner {
  position: sticky;
  top: 0;
  z-index: 999;
}
.el-menu-demo {
  display: flex;
  justify-content: flex-start;
}
.el-menu--horizontal > .banned {
  border-bottom: none;
  text-decoration: none;
}
.el-menu--horizontal > .el-menu-item {
  flex-grow: 0.25;
}
#title {
  width: 10%;
  font-size: 40px;
  font-weight: bold;
  font-style: italic;
  color: LightBlue;
  letter-spacing: 4px;
}
#search,
#title {
  background-color: #f0ffff !important;
}
img {
  height: 30%;
  vertical-align: text-bottom;
}
</style>