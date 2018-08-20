<template>
  <div class="register-bg" @keyup.13="login()">
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="account_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      账号或密码错误！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <p class="text-md-center text-lg-center text-xl-center title register-ulife">Ulife欢迎您</p>
    <div class="register1-wrapper">
      <v-container>
        <v-layout row wrap>
          <v-flex xl6 md6 lg6>
            <p class="Ulife display-3 text-md-center text-lg-center text-xl-center">Ulife</p>
            <v-divider vertical class="register-divider"></v-divider>
          </v-flex>
          <v-flex xl6 md6 lg6>
            <v-text-field solo label="请输入手机号或组织名称" prepend-icon="account_circle" clearable class="input1" v-model="number" :rules="[rules.required]"></v-text-field>
            <v-text-field solo label="请输入账号密码" prepend-icon="lock" clearable class="input2" type="password" v-model="pwd" :rules="[rules.required,rules.pwd]"></v-text-field>
            <router-link to="/forgetpwd_firststep" class="login-toforgetpwd">忘记密码</router-link>
            <a class="justlogout" @click="logout">我只想注销</a>
            <v-btn color="primary register-confirm" @click="login">登录</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-md-center text-lg-center text-xl-center subheading register-tosignin">没有账号？
      <router-link to="/register_firststep"> 立即注册</router-link>
    </p>
    <router-link to="/">
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5">
        <v-icon>home</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
  export default {
    data: () => ({
      number: "",
      pwd: "",
      request_failed:false,
      account_failed:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      rules: {
        required: value => !!value || '不能为空！',
        pwd: value => {
          var t;
          if (value.length < 6 || value.length > 18)
            t = false;
          else
            t = true;
          return t || '密码长度请大于6位！';
        }
      }
    }),
    methods: {
      login: function () {
        if (this.rules.pwd(this.pwd) == true && this.rules.required(this.pwd) == true && this.rules.required(this.number) ==
          true) {
          const pattern = /^1(3|4|5|7|8)\d{9}$/;
          if (pattern.test(this.number)) {
            // 普通用户
            this.$http.post('/account/login/', {
              username: this.number,
              password: this.pwd
            }).then((res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("user_url", res.data.profile_url);
              localStorage.removeItem("org_url");
              this.$router.push('/');
            }).catch((error)=>{
              // console.log(error.response.data.non_field_errors[0]);
              if (error.response.data.non_field_errors[0] == "Unable to log in with provided credentials.") {
                this.account_failed=true;
              } else {
                console.log(error.response);
                this.request_failed=true;
              }
            });
          } else {
            // 组织用户
            this.$http.post('/account/org-login/', {
              username: this.number,
              password: this.pwd
            }).then((res) => {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("org_url", res.data.profile_url);
              localStorage.removeItem("user_url");
              this.$router.push('/');
            }).catch((error)=>{
              // console.log(error.response.data.non_field_errors[0]);
              if (error.response.data.non_field_errors[0] == "Unable to log in with provided credentials.") {
                this.account_failed=true;
              } else {
                console.log(error.response);
                this.request_failed=true;
              }
            });
          }
        }
      },
      logout: function () {
        localStorage.clear();
        this.$router.push('/');
      }
    }
  }

</script>

<style scoped>
  .register-bg {
    width: 100%;
    height: 100%;
    background: url(/src/assets/registerbg.png);
    background-size: cover;
  }

  .register-ulife {
    color: white;
    opacity: 0.7;
    text-align: center;
    margin-top: 110px;
    margin-bottom: -130px;
  }

  .register1-wrapper {
    width: 760px;
    height: 350px;
    border-radius: 10px;
    margin: 160px auto 0 auto;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .Ulife {
    color: white;
    margin-top: 110px;
    margin-bottom: 110px;
  }

  .flex {
    position: relative;
  }

  .register-divider {
    background: rgb(136, 97, 97);
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: -5px;
  }

  .input1 {
    width: 300px;
    /* margin: 20px auto 0 auto; */
    margin: 40px auto 0 auto;
  }

  .input2 {
    width: 300px;
    margin: 10px auto 0 auto;
  }

  .v-input>>>.v-input__slot {
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2);
  }

  .v-input>>>.v-icon {
    color: white;
  }

  .v-input>>>.v-input__slot input {
    color: white;
    margin-left: 10px;
  }

  .v-input>>>.v-label {
    color: #999999;
    margin-left: 10px;
  }

  .register-confirm {
    border-radius: 50px;
    width: 267px;
    margin-left: 62px;
    margin-top: 9px;
  }

  .register-tosignin {
    margin-top: 20px;
    color: white;
    opacity: 0.7;
  }

  .register-tosignin a {
    color: #FE9246;
  }

  .login-toforgetpwd {
    float: right;
    margin-right: 32px;
  }

  .justlogout {
    float: right;
    margin-right: 20px;
  }

</style>
