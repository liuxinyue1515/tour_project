<template>
<!-- 管理员审核时查看景区详细信息 -->
  <div id="check-tour">
    <div class="head">
      <img :src="info.aPicUrl" :alt="info.aName" />
      <span>{{info.aName}}</span>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="introduce">
        <template slot="title">
          <div class="title">
            <span></span>
            景区介绍
          </div>
        </template>
        <form class="intro">
          <label>景点描述</label>
          <div>
            {{info.aDescription}}
          </div>
          <label>地理位置</label>
          <div>{{info.aLocation}}</div>
        </form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "CheckTour",
  data() {
    return {
      info: {},
      activeNames: ["introduce"],
      totalvalue: 9,
      colors: {
        3: "#99A9BF",
        6: { value: "#F7BA2A", excluded: true },
        9: "#FF9900",
      },
    };
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/attraction/" + this.$route.query.aId,
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.info = resp.data.data
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
.head > img {
  margin: 30px auto;
  width: 50%;
}
.head > span {
  margin-top: -45px;
  display: block;
  text-align: center;
  font-style: italic;
}
.title {
  background-color: GhostWhite;
  font-size: 20px;
  width: 100%;
  text-align: left;
  font-weight: bold;
  color: SlateGrey;
}
.title > span {
  border: 1px solid SkyBlue;
  margin-right: 4px;
}
.intro label {
  width: 100%;
  background-color: #f0f8ff;
  display: block;
  text-align: left;
  font-weight: bolder;
}
.intro div {
  font-weight: bold;
  text-align: left;
  margin-top: 4px;
  text-indent: 2em;
  padding: 20px;
}
</style>