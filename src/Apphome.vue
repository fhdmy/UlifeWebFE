<template>
  <v-content style="background: #f3f4f5;">
    <v-snackbar v-model="snackbar" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      欢迎回来，{{username}}！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper">
      <Toolbar v-if="type=='none'"></Toolbar>
      <Stutoolbar v-if="type=='user'" :avatar="avatarurl"></Stutoolbar>
      <Orgtoolbar v-if="type=='org'" :avatar="avatarurl"></Orgtoolbar>
      <!--<Orgtoolbar></Orgtoolbar>
        <Admintoolbar v-if="user.type=='admin'"></Admintoolbar> -->
    </div>
    <div class="home-topshow-wrapper">
      <Carousel :carouselcontainer="carouselcontainer"></Carousel>
      <Orgcommend></Orgcommend>
    </div>
    <div class="home-choose-wrapper">
      <Choose></Choose>
    </div>
    <div class="home-maincontent-wrapper">
      <Maincontent :actcontainer.sync="actcontainer"></Maincontent>
      <Rank></Rank>
      <Actrank></Actrank>
      <div style="clear:both;"></div>
    </div>
    <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0)">
      <!-- <v-icon>keyboard_arrow_up</v-icon> -->
      <i class="iconfont icon-jiantou-copy-copy-copy"></i>
    </v-btn>
    <Footer></Footer>
  </v-content>
</template>

<script>
  export default {
    // beforeRouteEnter (to, from, next) {
    //   // toolbar
    //   var url0 = localStorage.getItem("user_url");
    //   var url1 = localStorage.getItem("org_url");
    //   if (url0 != null) {
    //     this.type = 'user';
    //     // 普通用户
    //     this.$http({
    //       method: 'get',
    //       url: url0,
    //       headers: {
    //         "Authorization": "Token " + localStorage.getItem("token")
    //       }
    //     }).then((res) => {
    //       next((vm)=>{vm.avatarurl = res.data.avatar;
    //       vm.username = res.data.nickname;
    //       if(sessionStorage.getItem("avatar")==null){
    //         vm.snackbar = true;
    //       }
    //       sessionStorage.setItem("avatar", vm.avatarurl)});
    //     }).catch(function (error) {
    //       next(error);
    //     });
    //   } else if (url1 != null) {
    //     this.type = 'org';
    //     // 组织用户
    //     this.$http({
    //       method: 'get',
    //       url: url1,
    //       headers: {
    //         "Authorization": "Token " + localStorage.getItem("token")
    //       }
    //     }).then((res) => {
    //       next((vm)=>{vm.avatarurl = res.data.avatar;
    //       vm.username = res.data.org_name;
    //       if(sessionStorage.getItem("avatar")==null){
    //         vm.snackbar = true;
    //       }
    //       sessionStorage.setItem("avatar", vm.avatarurl)});
    //     }).catch(function (error) {
    //       alert("网络传输故障！");
    //     });
    //   }
    // },
    data: () => ({
      type: 'none',
      avatarurl: '',
      username: '',
      y: 'top',
      snackbar: false,
      color: '#E03636',
      mode: '',
      timeout: 3000,
      actcontainer: [],
      carouselcontainer:[]
    }),
    created: function () {
      // toolbar
      var url0 = localStorage.getItem("user_url");
      var url1 = localStorage.getItem("org_url");
      if (url0 != null) {
        this.type = 'user';
        // 普通用户
        this.$http({
          method: 'get',
          url: url0,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.avatarurl = res.data.avatar;
          this.username = res.data.nickname;
          if(sessionStorage.getItem("avatar")==null){
            this.snackbar = true;
          }
          sessionStorage.setItem("avatar", this.avatarurl);
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      } else if (url1 != null) {
        this.type = 'org';
        // 组织用户
        this.$http({
          method: 'get',
          url: url1,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.avatarurl = res.data.avatar;
          this.username = res.data.org_name;
          if(sessionStorage.getItem("avatar")==null){
            this.snackbar = true;
          }
          sessionStorage.setItem("avatar", this.avatarurl);
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      }

      // 获取活动
      this.$http({
        method: 'get',
        url: '/activity/activities/?ordering=-created_at',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        for (let k = 0; k < 8 && k < res.data.length; k++) {
          // 设置数组
          var actid=res.data[k].url;
          actid=actid.split("/");
          var computeddate=res.data[k].start_at.split('T');
          this.$set(this.actcontainer, k, {
            head_img: res.data[k].head_img,
            heading: res.data[k].heading,
            date: computeddate[0],
            location: res.data[k].location,
            orgavatar:res.data[k].owner.avatar,
            isover: false,
            acturl:actid[5]
          });
        }
      }).catch(function (error) {
        alert("网络传输故障！");
      });

      //滚播图片
      this.$http({
          method: 'get', 
          url: '/activity/activities/?is_homepaged=True',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0;k < res.data.length; k++) {
            var actid=res.data[k].url;
            actid=actid.split("/");
            this.$set(this.carouselcontainer, k, {
              head_img: res.data[k].head_img,
              number:k,
              acturl:actid[5]
            });
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
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
    position: relative;
  }

  .home-maincontent-wrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

</style>
