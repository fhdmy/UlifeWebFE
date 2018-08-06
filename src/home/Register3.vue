<template>
  <div class="register-bg" @keyup.13="register()">
    <p class="text-md-center text-lg-center text-xl-center title register-ulife">注册Ulife</p>
    <div class="register1-wrapper">
      <v-container>
        <v-layout row wrap>
          <v-flex xl6 md6 lg6>
            <p class="Ulife display-3 text-md-center text-lg-center text-xl-center">Ulife</p>
            <v-divider vertical class="register-divider"></v-divider>
          </v-flex>
          <v-flex xl6 md6 lg6>
            <v-text-field solo label="请输入昵称" prepend-icon="account_circle" clearable class="input1" v-model="username" :rules="[rules.required,rules.username]"></v-text-field>
            <v-text-field solo label="请输入密码" prepend-icon="lock" clearable class="input2" type="password" v-model="pwd" :rules="[rules.required,rules.pwd]"></v-text-field>
            <v-text-field solo label="请确认密码" prepend-icon="verified_user" clearable class="input2" type="password" v-model="confirmpwd"
              :rules="[rules.required,rules.confirm(confirmpwd,pwd)]"></v-text-field>
            <v-select :items="items" label="来自什么组织的宣传" solo class="input3" dark v-model="select" :rules="[rules.required]"></v-select>
            <v-btn color="primary register-confirm" @click="register">注册</v-btn>
            <Retext></Retext>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-md-center text-lg-center text-xl-center subheading register-tosignin">已有账号？
      <router-link to="/Login">立即登录</router-link>
    </p>
    <router-link to="/">
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="clearsession">
        <v-icon>
          home
        </v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
  import {
    SHA256
  } from '../webtoolkit.sha256.js'
  export default {
    data: () => ({
      // items: ['无组织', '经济学院学生会', '计算机学院学生会','上大车协','上大电竞社'], 
      items: [],
      username: '',
      pwd: '',
      confirmpwd: '',
      select: '',
      rules: {
        required: value => !!value || '不能为空！',
        username: value => {
          var t;
          if (value.length < 4 || value.length > 14)
            t = false;
          else
            t = true;
          return t || '昵称长度在4-14位！';
        },
        pwd: value => {
          var t;
          if (value.length < 6 || value.length > 17)
            t = false;
          else
            t = true;
          return t || '密码长度请大于6位小于18位！';
        },
        confirm: (value, pwd) => {
          var t;
          if (value != pwd)
            t = false;
          else
            t = true;
          return t || '密码不一致！';
        }
      }
    }),
    created: function () {
      this.$http.get('/account/orgs/', {}).then((res) => {
        for (let k = 0; k < res.data.length; k++) {
          this.$set(this.items, k, res.data[k].org_name);
        }
      }).catch(function (error) {
        alert(
          "传输故障，注册失败！");
      });
    },
    methods: {
      register: function () {
        if (this.rules.username(this.username) == true && this.rules.pwd(this.pwd) == true && this.rules.confirm(this
            .confirmpwd, this.pwd) == true && this.rules.required(this.confirmpwd) == true && this.rules.required(
            this.pwd) == true && this.rules.required(this.username) == true && this.rules.required(this.select) ==
          true) {
          var number = sessionStorage.getItem('number');
          var phone = sessionStorage.getItem('phone');
          this.$http.post('/account/signup/', {
            student_no: number,
            phone_number: phone,
            // username:SHA256(this.username), // password:SHA256(this.pwd), // college:SHA256(this.select) 
            username: this.username,
            raw_passwd: this.pwd,
            invited_by_org: this.select
          }).then((res) => {
            this.clearsession();
            localStorage.setItem("user_url", res.data.profile_url);
            localStorage.removeItem("org_url");
            localStorage.setItem("token", res.data.token);
            // localStorage.setItem("username",this.username); 
            this.$router.push('/');
          }).catch(function (error) {
            // console.log(error.response); 
            if (error.response.data == "Nickname already exists") {
              alert("用户名已存在！");
            }
            //if (error.response.data == "Phone number already exists") {
            // alert("手机号已被注册！"); 
            //} 
            else {
              alert("网络传输故障!");
            }
          })
        }
      },
      clearsession: function () {
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("number");
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
    height: 500px;
    border-radius: 10px;
    margin: 160px auto 0 auto;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
    position: relative;
  }

  .Ulife {
    color: white;
    margin-top: 190px;
    margin-bottom: 190px;
  }

  .flex {
    position: relative;
  }

  .register-divider {
    background: rgb(136, 97, 97);
    opacity: 0.5;
    position: absolute;
    right: 0;
    top: 0;
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

  .input3 {
    width: 267px;
    margin: 10px 0 0 62px;
  }

  .v-input>>>.v-input__slot {
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2) !important;
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
    margin-top: 10px;
  }

  .register-tosignin {
    margin-top: 20px;
    color: white;
    opacity: 0.7;
  }

  .register-tosignin a {
    color: #FE9246;
  }

  .register2-getconfirm {
    float: right;
    color: #E03636;
    margin: 0 32px 0 0;
    cursor: pointer;
  }
</style>
