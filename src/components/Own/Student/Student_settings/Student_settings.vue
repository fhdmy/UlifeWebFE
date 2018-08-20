<template>
  <v-content style="background:white;">
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="openfile_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      打开文件失败！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="information_valid" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      个人信息未填完整！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="user_existed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      用户名已存在！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper">
      <Student-toolbar :avatar="img" :name="name"></Student-toolbar>
    </div>
    <div class="edit-wrapper">
      <Student-options :opt="opt"></Student-options>
      <Student-detail v-show="opt=='detail'" :mynickname.sync="name" :mycollege.sync="college" :mygrade.sync="grade" :userurl="userurl"
        :row.sync="gender" @information_valid="information_valid" @getuser_existed="getuser_existed"></Student-detail>
      <Student-avator v-show="opt=='avatar'" :userurl="userurl" :imgsrc.sync="img" @getopenfile_failed="getopenfile_failed" @getrequest_failed="getrequest_failed"></Student-avator>
      <Student-head-img v-show="opt=='head_img'" :userurl="userurl" :imgsrc.sync="bg_img" @getopenfile_failed="getopenfile_failed" @getrequest_failed="getrequest_failed"></Student-head-img>
      <Student-account v-show="opt=='account'"></Student-account>
      <Student-privacy-settings v-show="opt=='settings'" :userurl="userurl" :isfavpublic.sync="is_fav_public" :ishistorypublic.sync="is_history_public"
        :iswatchedorgspublic.sync="is_watched_orgs_public" :isvisitorpublic.sync="is_visitor_public" @getrequest_failed="getrequest_failed"></Student-privacy-settings>
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
    props: ['opt'],
    data: () => ({
      request_failed:false,
      openfile_failed:false,
      information_valid:false,
      user_existed:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      userurl: '',
      img: '', //avatar
      name: '', //nickname
      college: '',
      grade: '',
      gender: '',
      is_visitor_public: true,
      is_fav_public: true,
      is_history_public: true,
      is_watched_orgs_public: true,
      bg_img: '/src/assets/stuownbg.jpg'
    }),
    created: function () {
      this.userurl = localStorage.getItem("user_url");
      this.img = sessionStorage.getItem("avatar");
      this.$http({
        method: 'get',
        url: this.userurl,
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.name = res.data.nickname;
        this.college = res.data.college;
        this.grade = res.data.grade;
        this.gender = res.data.gender;
        this.is_visitor_public = res.data.is_visitor_public;
        this.is_fav_public = res.data.is_fav_public;
        this.is_history_public = res.data.is_history_public;
        this.is_watched_orgs_public = res.data.is_watched_orgs_public;
        if(res.data.bg_img!=null){
          this.bg_img = "http://222.186.36.156:8000" + res.data.bg_img + '.thumbnail.1.jpg';
        }
      }).catch((error)=>{
        console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
      });
    },
    computed: {

    },
    methods: {
      getrequest_failed(){
        this.request_failed=true;
      },
      getopenfile_failed(){
        this.openfile_failed=true;
      },
      getuser_existed(){
        this.user_existed=true;
      },
      getinformation_valid(){
        this.information_valid=true;
      }
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .edit-wrapper {
    width: 1063px;
    height: auto;
    margin: 64px auto 0 auto;
    background: white;
    padding-top: 25px;
  }

</style>
