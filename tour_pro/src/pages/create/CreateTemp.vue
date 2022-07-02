<template>
<!-- 导游创建模板表单 -->
  <div id="create-temp">
    <el-form ref="form" :model="form">
      <el-form-item label="景点名称">
        <el-input :value="tourName" disabled></el-input>
      </el-form-item>
      <el-form-item
        label="活动时间(单位: 分钟)"
        prop="time"
        :rules="[
          { type: 'number', message: '活动时间必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.time"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="集合点">
        <el-input v-model="form.place_start"></el-input>
      </el-form-item>
      <el-form-item label="解散点">
        <el-input v-model="form.place_end"></el-input>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="money"
        :rules="[
          { type: 'number', message: '价格必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.money"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="最少人数"
        prop="min"
        :rules="[
          { type: 'number', message: '最少人数必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.min"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="人数上限"
        prop="max"
        :rules="[
          { type: 'number', message: '人数上限必须为数字值' },
        ]"
      >
        <el-input
          type="age"
          v-model.number="form.max"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="景点描述:">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="create">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CreateTemp",
  data() {
    return {
      form: {
        time: "",
        place_start: "",
        place_end: "",
        money: "",
        min: "",
        max: "",
        desc: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    tourName() {
      return this.$route.query.aName;
    },
  },
  methods: {
    create() {
      this.axios({
        method: "post",
        url: "/template",
        data: JSON.stringify({
          aid: this.$route.query.aId,
          gid: this.user.uid,
          temDescription: this.form.desc,
          temDispoint: this.form.place_end,
          temDuration: this.form.time,
          temMaxNum: this.form.max,
          temMeetingpoint: this.form.place_start,
          temMinNum: this.form.min,
          temPrice: this.form.money,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((resp) => {
        if (resp.data.code === 200000) {
          this.$notify({
            message: resp.data.msg,
            type: "success",
          });
          this.form.time = ""
          this.form.place_start = ""
          this.form.place_end = ""
          this.form.money = ""
          this.form.min = ""
          this.form.max = ""
          this.form.desc = ""
        } else {
          this.$notify({
            message: resp.data.msg,
            type: "error",
          });
        }
      });
    },
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