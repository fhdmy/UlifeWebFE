<template>
  <div class="register-bg" @keyup.13="finish()">
    <p class="text-md-center text-lg-center text-xl-center title register-ulife">忘记密码</p>
    <div class="register1-wrapper">
      <v-container>
        <v-layout row wrap>
          <v-flex xl6 md6 lg6>
            <p class="Ulife display-3 text-md-center text-lg-center text-xl-center">Ulife</p>
            <v-divider vertical class="register-divider"></v-divider>
          </v-flex>
          <v-flex xl6 md6 lg6>
            <v-text-field solo label="请输入新密码" prepend-icon="lock" clearable class="input1" type="password" v-model="pwd" :rules="[rules.required,rules.pwd]"></v-text-field>
            <v-text-field solo label="请确认新密码" prepend-icon="verified_user" clearable class="input2" type="password" v-model="confirmpwd" :rules="[rules.required,rules.confirm(confirmpwd,pwd)]"></v-text-field>
            <v-btn color="primary register-confirm" @click="finish()">完成</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p class="text-md-center text-lg-center text-xl-center subheading register-tosignin">已有账号？<router-link to="/Login">  立即登录</router-link></p>
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
      pwd:'',
      confirmpwd:'',
      rules:{
      required:value => !!value || '不能为空！',
      pwd:value=>{
          var t;
          if(value.length<6 || value.length>17)
            t=false;
          else
            t=true;
          return t || '密码长度请大于6位小于18位！';
        },
        confirm:(value,pwd)=>{
          var t;
          if(value!=pwd)
            t=false;
          else
            t=true;
          return t || '密码不一致！';
        }
      }
    }),
    methods:{
      finish:function(){
        this.$http.post('/account/change-passwd/',{
          phone_number:sessionStorage.getItem("phone"),
          new_passwd:this.pwd
        }).then((res)=>{
          this.clearsession();
          this.$router.push('/Login');
        }).catch(function (error) {
          alert("网络传输故障!");
        });
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
    margin-top: 30px;
  }
  .register-tosignin{
    margin-top: 20px;
    color: white;
    opacity: 0.7;
  }
  .register-tosignin a{
    color:#FE9246;
  }
</style>
