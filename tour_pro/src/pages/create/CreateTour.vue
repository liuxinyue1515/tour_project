<template>
<!-- 管理员导游创建景点 -->
  <div id="create-tour">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="景点名称:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="景点位置:">
        <el-input v-model="form.place"></el-input>
      </el-form-item>
      <el-form-item label="景点描述:">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="景区图片:">
        <input
          type="file"
          id="file"
          accept=".png"
          required
          @change="getFile($event)"
        /><br />
        <span class="tip"
          >(传入图片, 仅支持.png格式, 且图片大小不能超过1MB)</span
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.prevent="upload">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateTour",
  data() {
    return {
      form: {
        name: "",
        place: "",
        desc: "",
        img: "",
      },
      fileArr: [],
    };
  },
  methods: {
    getFile(event) {
      let file = event.target.files;
      for (let i = 0; i < file.length; i++) {
        let fileName = file[i].name;
        let idx = fileName.lastIndexOf(".");
        if (idx != -1) {
          let ext = fileName.substr(idx + 1).toLowerCase();
          let size = file[i].size / 1024 / 1024;
          if (ext != "png") {
            this.$notify({
              message: "非法文件类型",
              type: "warning",
            });
          } else if (size > 1) {
            this.$notify({
              message: "文件过大",
              type: "warning",
            });
          } else {
            if (this.fileArr.length !== 0) this.fileArr.pop();
            this.fileArr.push(file[i]);
          }
        } else {
          this.$notify({
            message: "已非法文件类型",
            type: "warning",
          });
        }
      }
    },
    upload() {
      if (this.form.name === "") {
        this.$notify({
          message: "景点名称不能为空",
          type: "warning",
        });
        return false;
      } else if (this.form.place === "") {
        this.$notify({
          message: "景点位置不能为空",
          type: "warning",
        });
        return false;
      } else if (this.form.desc === "") {
        this.$notify({
          message: "景点描述不能为空",
          type: "warning",
        });
        return false;
      } else if (this.form.name === "") {
        this.$notify({
          message: "景点名称不能为空",
          type: "warning",
        });
        return false;
      } else if (this.fileArr.length === 0) {
        this.$notify({
          message: "请上传图片",
          type: "warning",
        });
        return false;
      }
      let formData = new FormData();
      formData.append("img", this.fileArr[0]);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      this.axios
        .post("/upload/img", formData, config)
        .then((resp) => {
          if (resp.data.code === 200000) {
            this.form.img = resp.data.data;
            this.axios({
              method: "post",
              url: "/attraction",
              data: JSON.stringify({
                adescription: this.form.desc,
                alocation: this.form.place,
                aname: this.form.name,
                apicUrl: this.form.img,
              }),
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
              },
            }).then((resp) => {
              if (resp.data.code === 200000) {
                this.$notify({
                  message: "景点创建成功",
                  type: "success",
                });
                this.form.name = "";
                this.form.place = "";
                this.form.desc = "";
                this.form.img = "";
              } else {
                throw "景点创建失败";
              }
            });
          } else {
            throw "图片上传失败";
          }
        })
        .catch((reason) => {
          this.$notify({
            message: "上传出错",
            type: "error",
          });
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
.tip {
  font-size: 4px;
}
</style>