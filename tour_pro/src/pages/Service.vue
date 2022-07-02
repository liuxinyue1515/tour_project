<template>
  <div id="service">
    <el-descriptions border>
      <el-descriptions-item label="导游名">{{
        info.gNickname
      }}</el-descriptions-item>
      <el-descriptions-item label="导游邮箱">{{
        info.gEmail
      }}</el-descriptions-item>
      <el-descriptions-item label="服务景点">{{
        info.aName
      }}</el-descriptions-item>
      <el-descriptions-item label="价格">
        <el-tag size="small">{{ info.temPrice }}RMB</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="集合点">{{
        info.temMeetingpoint
      }}</el-descriptions-item>
      <el-descriptions-item label="解散点">{{
        info.temDispoint
      }}</el-descriptions-item>
      <el-descriptions-item label="持续时间"
        >{{ info.temDuration }} 分钟</el-descriptions-item
      >
      <el-descriptions-item label="最少人数">{{
        info.temMinNum
      }}</el-descriptions-item>
      <el-descriptions-item label="人数上限">{{
        info.temMaxNum
      }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{
        info.pStartTime
      }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{
        info.pEndTime
      }}</el-descriptions-item>
      <el-descriptions-item label="当前人数">{{
        info.pNum
      }}</el-descriptions-item>
      <el-descriptions-item label="服务介绍">{{
        info.temDescription
      }}</el-descriptions-item>
    </el-descriptions>
    <el-row>
      <el-button type="primary" plain v-if="user.isTour" @click="buy"
        >购买服务</el-button
      >
      <el-button
        type="primary"
        plain
        v-else-if="!(user.isGuide || user.fromAdmin) && user.isLogin"
        @click="buy"
        >购买服务</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Service",
  data() {
    return {
      info: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    buy() {
      this.axios({
        method: "post",
        url: "/tourist/project",
        data: JSON.stringify({
          pid: this.$route.query.pId,
          tid: this.user.uid,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.$notify({
            message: "订购成功",
            type: "success",
          });
        } else {
          this.$notify({
            message: resp.data.msg,
            type: "error",
          });
        }
      });
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/project/" + this.$route.query.pId,
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.info = resp.data.data;
      } else {
        this.$notify({
          message: "请求失败",
          type: "error",
        });
      }
    });
  },
};
</script>

<style scoped>
.el-descriptions {
  margin-top: 10px;
}
.el-button {
  margin: 3px 3px;
}
</style>