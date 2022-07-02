<template>
<!-- 管理服务 -->
  <div id="manage-service">
    <Role>
      <img src="../../assets/imgs/待审核.png" alt="待审核" />
      <el-button type="info" @click="change('unaudit')">待审核</el-button>
    </Role>
    <span class="divider"></span>
    <Role>
      <img src="../../assets/imgs/已通过.png" alt="已通过" />
      <el-button type="success" @click="change('audit')">已通过</el-button>
    </Role>
  </div>
</template>

<script>
import Role from '../../components/Role.vue'
export default {
  name: "ManageService",
  components: {
    Role
  },
  methods: {
    change(path) {
      this.$router.push({
        name: path
      })
    }
  }
};
</script>

<style scoped>
#manage-service {
  padding-top: 20px;
  display: flex;
  justify-content: center;

  min-height: 100vh;
}
.divider {
  padding: 20px;
}
</style>