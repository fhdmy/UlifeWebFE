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
      <Maincontent :actcontainer.sync="actcontainer" @sendmoreacts="sendmoreacts"></Maincontent>
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
      carouselcontainer: [],
      moreacts: '',
      presentacts: 0,
      actmax: 0
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
          var userurl=res.data.user;
          userurl=userurl.split("/");
          localStorage.setItem("uid",userurl[5]);
          if(res.data.avatar!=null){
            this.avatarurl = "http://222.186.36.156:8000" + res.data.avatar;
          }
          else{
            this.avatarurl ="/src/assets/defaultavatar.png";
          }
          this.username = res.data.nickname;
          if (sessionStorage.getItem("avatar") == null) {
            this.snackbar = true;
          }
          sessionStorage.setItem("avatar", this.avatarurl);
        }).catch(function (error) {
          if(error.response.data.detail=="Invalid token"){
            this.type="none";
            localStorage.removeItem("token");
          }
          else{
            alert("网络传输故障！");
          }
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
          var userurl=res.data.user;
          userurl=userurl.split("/");
          localStorage.setItem("uid",userurl[5]);
          if(res.data.avatar!=null){
            this.avatarurl = "http://222.186.36.156:8000" + res.data.avatar;
          }
          else{
            this.avatarurl ="/src/assets/defaultavatar.png";
          }
          this.username = res.data.org_name;
          if (sessionStorage.getItem("avatar") == null) {
            this.snackbar = true;
          }
          sessionStorage.setItem("avatar", this.avatarurl);
        }).catch(function (error) {
          if(error.response.data.detail=="Invalid token"){
            this.type="none";
            localStorage.removeItem("token");
          }
          else{
            alert("网络传输故障！");
          }
        });
      }

      // 获取活动
      this.$http({
        method: 'get',
        url: '/activity/activities/?ordering=-created_at&is_published=True',
        // headers: {
        //   "Authorization": "Token " + localStorage.getItem("token")
        // }
      }).then((res) => {
        for (let k = 0; k < res.data.results.length; k++) {
          // 设置数组
          var actid = res.data.results[k].url;
          actid = actid.split("/");
          var orgurl=res.data.results[k].owner.url;
          orgurl=orgurl.split("/");
          var org_id=orgurl[5];
          var computeddate = res.data.results[k].start_at.split('T');
          this.$set(this.actcontainer, k, {
            head_img: res.data.results[k].head_img,
            heading: res.data.results[k].heading,
            date: computeddate[0],
            location: res.data.results[k].location,
            orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
            isover: false,
            acturl: actid[5],
            org_id:org_id,
            is_ended:res.data.results[k].is_ended
          });
          this.moreacts = res.data.next;
          this.presentacts = res.data.results.length;
          this.actmax = res.data.count;
        }
      }).catch(function (error) {
        alert("网络传输故障！");
      });

      //滚播图片
      this.$http({
        method: 'get',
        url: '/activity/activity-homepaged/',
        // headers: {
        //   "Authorization": "Token " + localStorage.getItem("token")
        // }
      }).then((res) => {
        for (let k = 0; k < res.data.length; k++) {
          var actid = res.data[k].url;
          actid = actid.split("/");
          this.$set(this.carouselcontainer, k, {
            head_img: res.data[k].head_img,
            number: k,
            acturl: actid[5]
          });
        }
      }).catch(function (error) {
        alert("网络传输故障！");
      });
    },
    methods: {
      sendmoreacts: function (d) {
        if (this.actmax == this.presentacts) {
          alert("已经没有更多活动啦！");
          return;
        }
        this.$http({
          method: 'get',
          url: this.moreacts,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.actcontainer, this.presentacts + k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].is_ended,
            });
          }
          this.moreacts = res.data.next;
          this.presentacts += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
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
