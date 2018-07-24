<template>
    <v-content style="background: #f3f4f5;">
      <v-snackbar v-model="snackbar" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
        欢迎回来，{{username}}！
        <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
      <div class="elevation-1 white home-toolbar-wrapper">
        <!-- <Toolbar v-if="userurl=='' && officialurl==''"></Toolbar>
        <Stutoolbar v-if="userurl!=''" :avatarurl="avatarurl" :username="username"></Stutoolbar>
        <Orgtoolbar v-if="officialurl!=''"></Orgtoolbar> -->
        <Orgtoolbar></Orgtoolbar>
        <!-- <Admintoolbar v-if="user.type=='admin'"></Admintoolbar> -->
      </div>
      <div class="home-topshow-wrapper">
        <Carousel></Carousel>
        <Orgcommend></Orgcommend>
      </div>
      <div class="home-choose-wrapper">
        <Choose></Choose>
      </div>
      <div class="home-maincontent-wrapper">
        <Maincontent></Maincontent>
        <Rank></Rank>
         <Actrank></Actrank>
        <div style="clear:both;"></div>
      </div>
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0, easing)">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <Footer></Footer>
    </v-content>
</template>

<script>
  export default {
    data:()=>({
      userurl:'',
      officialurl:'',
      avatarurl:'',
      username:'',
      y:'top',
      snackbar: false,
      color:'#E03636',
      mode: '',
      timeout: 3000,
    }),
    created:function(){
      var id=localStorage.getItem("id");
      this.$http({
        method:'get',
        url:"/api/users/" + id+"/",
        headers:{
          "Authorization":"Token " + localStorage.getItem("token")
        }
      }).then((res)=>{
        // console.log(res);
        //如果是普通用户
        if(res.data.realuser!=null){
          this.userurl=res.data.realuser;
        }
        // 获得信息
        this.$http({
          method:'get',
          url:this.userurl,
          headers:{
            "Authorization":"Token " + localStorage.getItem("token")
          }
        }).then((res)=>{
          // console.log(res);
          this.avatarurl=res.data.avatar;
          this.username=res.data.username;
        }).catch(function (error) {
          alert("传输故障，注册失败！");
        });
      }).catch(function (error) {
          alert("传输故障，注册失败！");
      });
      this.snackbar=true;
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .home-topshow-wrapper {
    width: 1063px;
    height: 370.578px;
    margin: 64px auto 0 auto;
  }

  .home-choose-wrapper {
    width: 1063px;
    background: white;
    margin: 25px auto 0 auto;
  }

  .home-maincontent-wrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

</style>
