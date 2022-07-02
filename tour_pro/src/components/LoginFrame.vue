<template>
<!-- 登陆框 -->
  <div id="login-frame">
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
          <label for="email">用户名</label>
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
          <label for="email">您的密码</label>
        </div>
        <input type="submit" value="登录" id="submit" @click.prevent="login" />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "LoginFrame",
  props: ["role"],
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      person: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    login() {
      if (this.person.account !== "" && this.person.password !== "") {
        if (this.role === "tour") {
          this.axios({
            method: "post",
            url: "/tourist/login",
            data: JSON.stringify({
              taccount: this.person.account,
              tpassword: this.person.password,
            }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.$notify({
                message: "游客登陆成功",
                type: "success",
              });
              this.setUser({
                username: resp.data.data.tNickname,
                email: resp.data.data.tEmail,
                uid: resp.data.data.tId,
                isLogin: true,
                isTour: true,
                isGuide: false,
                fromAdmin: false,
              });
              this.setLocal(this.user)
              this.$router.push({
                name: "home",
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
            url: "/guide/login",
            data: JSON.stringify({
              gaccount: this.person.account,
              gpassword: this.person.password,
            }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.$notify({
                message: "导游登陆成功",
                type: "success",
              });
              this.setUser({
                username: resp.data.data.gNickname,
                email: resp.data.data.gEmail,
                uid: resp.data.data.gId,
                isLogin: true,
                isTour: false,
                isGuide: true,
                fromAdmin: false,
              });
              this.setLocal(this.user)
              this.$router.push({
                name: "home",
              });
            } else {
              this.$notify({
                message: resp.data.msg,
                type: "error",
              });
            }
          });
        } else if (this.role === "manage") {
          this.axios({
            method: "post",
            url: "/admin/login",
            data: JSON.stringify({
              aaccount: this.person.account,
              apassword: this.person.password,
            }),
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }).then((resp) => {
            if (resp.data.code === 200000) {
              this.$notify({
                message: "管理员登陆成功",
                type: "success",
              });
              this.setUser({
                username: resp.data.data.aNickname,
                email: resp.data.data.aEmail,
                uid: resp.data.data.aId,
                isLogin: true,
                isTour: false,
                isGuide: false,
                fromAdmin: true,
              });
              this.setLocal(this.user)
              this.$router.push({
                name: "home",
              });
            } else {
              this.$notify({
                message: resp.data.msg,
                type: "error",
              });
            }
          });
        }
        return true;
      } else {
        return false;
      }
    },
    setLocal(user) {
      window.localStorage.setItem("username", user.username);
      window.localStorage.setItem("email", user.email);
      window.localStorage.setItem("uid", user.uid);
      window.localStorage.setItem("isLogin", user.isLogin);
      window.localStorage.setItem("isTour", user.isTour);
      window.localStorage.setItem("isGuide", user.isGuide);
      window.localStorage.setItem("fromAdmin", user.fromAdmin);
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