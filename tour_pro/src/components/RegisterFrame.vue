<template>
<!-- 注册框 -->
  <div id="register-frame">
    <form>
      <div class="wrapper">
        <div class="input-data">
          <input
            type="text"
            id="uName"
            name="uName"
            required
            autocomplete="off"
            v-model="person.account"
          />
          <div class="underline"></div>
          <label for="uName">用户名</label>
        </div>
        <br />
        <div class="input-data">
          <input
            type="password"
            id="uPassword"
            name="uPassword"
            required
            autocomplete="off"
            v-model="person.password"
          />
          <div class="underline"></div>
          <label for="uPassword">您的密码</label>
        </div>
        <br />
        <div class="input-data">
          <input
            type="password"
            id="check"
            required
            autocomplete="off"
            v-model="person.checkPassword"
          />
          <div class="underline"></div>
          <label for="check">再次输入密码</label>
        </div>
        <br />
        <div class="input-data">
          <input
            type="text"
            id="uphone"
            name="uphone"
            required
            autocomplete="off"
            v-model="person.email"
          />
          <div class="underline"></div>
          <label for="uphone">您的邮箱</label>
        </div>
        <input
          type="submit"
          value="注册"
          id="submit"
          name="submit"
          @click.prevent="register"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterFrame",
  props: ["role"],
  data() {
    return {
      person: {
        account: "",
        password: "",
        checkPassword: "",
        email: "",
      },
    };
  },
  methods: {
    register() {
      if (
        this.person.account !== "" &&
        this.person.email !== "" &&
        this.person.password !== "" &&
        this.person.password === this.person.checkPassword
      ) {
        if (this.role === "tour") {
          this.axios({
            method: "post",
            url: "/tourist/register",
            data: JSON.stringify({
              taccount: this.person.account,
              temail: this.person.email,
              tnickname: this.person.account,
              tpassword: this.person.password,
            }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.$notify({
                message: "游客注册成功",
                type: "success",
              });
              this.$router.push({
                name: "login",
              });
            } else {
              this.$notify({
                message: resp.data.msg,
                type: "error",
              });
            }
          });
        } else if (this.role === "guide") {
          this.axios({
            method: "post",
            url: "/guide/register",
            data: JSON.stringify({
              gaccount: this.person.account,
              gemail: this.person.email,
              gnickname: this.person.account,
              gpassword: this.person.password,
            }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.$notify({
                message: "导游注册成功",
                type: "success",
              });
              this.$router.push({
                name: "login",
              });
            } else {
              this.$notify({
                message: resp.data.msg,
                type: "error",
              });
            }
          });
        }

        this.person.account = "";
        this.person.email = "";
        this.person.password = "";
        this.person.checkPassword = "";

        return true;
      } else {
        if (this.person.password !== this.person.checkPassword) {
          alert("前后密码输入不一致, 请重新输入");
        }
        return false;
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

.wrapper {
  width: 450px;
  background-color: #fff;

  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  border-radius: 8px;
}

.wrapper .input-data {
  position: relative;
  width: 100%;
  height: 40px;
}

.wrapper .input-data input {
  width: 100%;
  height: 100%;
  border: none;
  font-size: 16px;
  border-bottom: 2px solid #c0c0c0;
}
.wrapper .input-data input:focus ~ label,
.wrapper .input-data input:valid ~ label {
  transform: translateY(-25px);
  font-size: 2px;
  color: #2c6fdb;
}
.wrapper .input-data label {
  position: absolute;
  bottom: 10px;
  left: 0px;
  color: #808080;
  pointer-events: none;
  transition: all 0.3s ease;
}

.wrapper .input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
  background-color: #2c6fdb;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.wrapper .input-data input:focus ~ .underline,
.wrapper .input-data input:valid ~ .underline {
  transform: scaleX(1);
}

form > .wrapper > input {
  float: left;
  margin-top: 10px;
}

#submit {
  width: 50px;
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
}
</style>