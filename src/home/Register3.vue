<template>
  <div class="register-bg">
    <p class="text-md-center text-lg-center text-xl-center title register-ulife">注册Ulife</p>
    <div class="register1-wrapper">
      <v-container>
        <v-layout row wrap>
          <v-flex xl6 md6 lg6>
            <p class="Ulife display-3 text-md-center text-lg-center text-xl-center">Ulife</p>
            <v-divider vertical class="register-divider"></v-divider>
          </v-flex>
          <v-flex xl6 md6 lg6>
            <v-text-field solo label="请输入昵称" prepend-icon="account_circle" clearable class="input1"></v-text-field>
            <v-text-field solo label="请输入密码" prepend-icon="lock" clearable class="input2" type="password"></v-text-field>
            <v-text-field solo label="请确认密码" prepend-icon="verified_user" clearable class="input2" type="password"></v-text-field>
            <v-select :items="items" label="来自什么组织的宣传" solo class="input3" dark></v-select>
            <router-link to="/"><v-btn color="primary register-confirm">注册</v-btn></router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-md-center text-lg-center text-xl-center subheading register-tosignin">已有账号？
      <router-link to="/Login"> 立即登录</router-link>
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
      items: ['无组织', '经济学院学生会', '计算机学院学生会', '上大车协','上大电竞社']
    })
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
    width:267px;
    margin:10px 0 0 62px;
  }

  .v-input>>>.v-input__slot {
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2)!important;
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
