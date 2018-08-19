<template>
  <div class="register-bg" @keyup.13="nextpath()">
    <p class="text-md-center text-lg-center text-xl-center title register-ulife">注册Ulife</p>
    <div class="register1-wrapper">
      <v-container>
        <v-layout row wrap>
          <v-flex xl6 md6 lg6>
            <p class="Ulife display-3 text-md-center text-lg-center text-xl-center">Ulife</p>
            <v-divider vertical class="register-divider"></v-divider>
          </v-flex>
          <v-flex xl6 md6 lg6>
            <v-text-field solo label="请输入手机号" prepend-icon="account_circle" clearable class="input1" :rules="[rules.required,rules.number]" v-model="number"></v-text-field>
            <v-text-field solo label="请输入验证码" prepend-icon="verified_user" class="input2" v-model="cfmnumber"></v-text-field>
            <p class="register2-getconfirm">获得验证码</p>
            <v-btn color="primary register-confirm" @click="nextpath">下一步</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-md-center text-lg-center text-xl-center subheading register-tosignin">已有账号？<router-link to="/login">  立即登录</router-link></p>
    <router-link to="/">
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="clearsession">
        <v-icon>home</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script>
// import {SHA256} from '/src/webtoolkit.sha256.js'
  export default {
    data: () => ({
      number:'',
      cfmnumber:'',
      rules:{
        required:value => !!value || '不能为空！',
        number:value=>{
          const pattern = /^1(3|4|5|7|8)\d{9}$/;
          var t;
          if(pattern.test(value)==false)
            t=false;
          else
            t=true
          return t || '请输入11位手机号码';
        }
      }
    }),
    methods:{
      nextpath:function(){
        if(this.rules.number(this.number)==true && this.rules.required(this.number)==true){
          // var n=SHA256(this.number);
          sessionStorage.setItem("phone",this.number);
          this.$router.push('/register_thirdstep');
        }
      },
      clearsession:function(){
        sessionStorage.removeItem("phone");
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
  .register-ulife{
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
  .input1{
    width:300px;
    /* margin: 20px auto 0 auto; */
    margin: 40px auto 0 auto;
  }
  .input2{
    width:300px;
    margin: 10px auto 0 auto;
  }
  .v-input>>>.v-input__slot{
    border-radius: 50px;
    background:rgba(255, 255, 255, 0.2); 
  }
  .v-input>>>.v-icon{
    color:white;
  }
  .v-input>>>.v-input__slot input{
    color:white;
    margin-left: 10px;
  }
  .v-input>>>.v-label{
    color:#999999;
    margin-left: 10px;
  }
  .register-confirm{
    border-radius: 50px;
    width: 267px;
    margin-left: 62px;
    margin-top: 9px;
  }
  .register-tosignin{
    margin-top: 20px;
    color: white;
    opacity: 0.7;
  }
  .register-tosignin a{
    color:#FE9246;
  }
  .register2-getconfirm{
    float: right;
    color: #E03636;
    margin: 0 32px 0 0;
    cursor: pointer;
  }
</style>
