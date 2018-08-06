<template>
  <v-content style="background:white;">
    <div class="elevation-1 white home-toolbar-wrapper">
      <Stutoolbar :avatar="img" :name="name"></Stutoolbar>
    </div>
    <div class="edit-wrapper">
      <Editmenu :opt="opt"></Editmenu>
      <Stueditinform v-show="opt=='myinform'" :mynickname.sync="name" :mycollege.sync="college" :mygrade.sync="grade" :userurl="userurl" :row.sync="gender"></Stueditinform>
      <Stueditimg v-show="opt=='myimg'" :userurl="userurl" :imgsrc.sync="img"></Stueditimg>
      <Stueditbg v-show="opt=='mybg'" :userurl="userurl" :imgsrc.sync="bg_img"></Stueditbg>
      <Stueditacc v-show="opt=='accountsecurity'"></Stueditacc>
      <Stueditsecret v-show="opt=='settings'" :userurl="userurl" :isfavpublic.sync="is_fav_public" :ishistorypublic.sync="is_history_public" :isprofilepublic.sync="is_profile_public"></Stueditsecret>
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
    props:['opt'],
    data: () => ({
      userurl:'',
      img: '',//avatar
      name: '',//nickname
      college:'',
      grade:'',
      gender:'',
      is_fav_public:true,
      is_history_public:true,
      is_profile_public:true,
      bg_img:''
    }),
    created:function(){
      this.userurl = localStorage.getItem("user_url");
      this.$http({
        method:'get',
        url:this.userurl,
        headers:{
          "Authorization":"Token " + localStorage.getItem("token")
        }
      }).then((res)=>{
            this.name=res.data.nickname;
            this.img=res.data.avatar;
            this.college=res.data.college;
            this.grade=res.data.grade;
            this.gender=res.data.gender;
            this.is_fav_public=res.data.is_fav_public;
            this.is_history_public=res.data.is_history_public;
            this.is_profile_public=res.data.is_profile_public;
            this.bg_img=res.data.bg_img;
      }).catch(function (error) {
          alert("传输故障，注册失败！");
      });
    },
    computed: {
      
    },
    methods: {
      // getbg:function(d){
      //   this.bg_img=d;
      // },
      // getimg:function(d){
      //   this.img=d;
      // }
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  .edit-wrapper{
    width: 1063px;
    height:auto;
    margin: 64px auto 0 auto;
    background: white;
    padding-top: 25px;
  }
</style>
