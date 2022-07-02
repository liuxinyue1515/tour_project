<template>
<!-- 导游创建服务 -->
  <div id="create-service">
    <el-form ref="form" :model="form">
      <el-form-item label="景点名称">
        <el-input v-model="form.aName" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="活动时间(单位: 分钟)"
        prop="temDuration"
        :rules="[
          { required: true, message: '活动时间不能为空' },
          { type: 'number', message: '活动时间必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.temDuration"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="集合点">
        <el-input v-model="form.temMeetingpoint" disabled></el-input>
      </el-form-item>
      <el-form-item label="解散点">
        <el-input v-model="form.temDispoint" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="temPrice"
        :rules="[
          { required: true, message: '价格不能为空' },
          { type: 'number', message: '价格必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.temPrice"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="最少人数"
        prop="temMinNum"
        :rules="[
          { required: true, message: '最少人数不能为空' },
          { type: 'number', message: '最少人数必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.temMinNum"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        label="人数上限"
        prop="temMaxNum"
        :rules="[
          { required: true, message: '人数上限不能为空' },
          { type: 'number', message: '人数上限必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.temMaxNum"
          autocomplete="off"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="导游用户名">
        <el-input v-model="form.gNickname" disabled></el-input>
      </el-form-item>
      <el-form-item label="导游邮箱">
        <el-input v-model="form.gEmail" disabled></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-col :span="9">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="startdatetime"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="景点描述:">
        <el-input
          type="textarea"
          v-model="form.temDescription"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doCreate">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateService",
  data() {
    return {
      form: {},
      startdatetime: "",
    };
  },
  methods: {
    doCreate() {
      if (this.startdatetime !== "") {
        this.axios({
          method: "post",
          url: "/project",
          data: JSON.stringify({
            pstartTime: new Date(this.startdatetime),
            temId: this.$route.query.temId,
          }),
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }).then((resp) => {
          if (resp.data.code === 200000) {
            this.$notify({
              message: "上传成功",
              type: "success",
            });
          } else {
            this.$notify({
              message: "上传失败",
              type: "error",
            });
          }
        });
      } else {
        this.$notify({
          message: "起始时间不得为空",
          type: "warning",
        });
      }
    },
  },
  mounted() {
    this.axios({
      method: "get",
      url: "/template/" + this.$route.query.temId,
    }).then((resp) => {
      if (resp.data.code === 200000) {
        this.form = resp.data.data;
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
.el-form /deep/ {
  margin: 10px auto;
  border: 1px solid DarkTurquoise;
}
.el-form-item /deep/ {
  margin: 5px auto;
  width: 50%;
}
.el-form-item__label /deep/ {
  color: Grey;
}
</style>