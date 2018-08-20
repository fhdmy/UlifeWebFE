<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="no_more_acts" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      已经没有更多活动啦
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Visitor-toolbar v-if="usertype=='none'"></Visitor-toolbar>
      <Student-toolbar v-if="usertype=='user'" :avatar="avatarurl"></Student-toolbar>
      <Org-toolbar v-if="usertype=='org'" :avatar="avatarurl"></Org-toolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Student-display-toolbar :itembottom="item"></Student-display-toolbar>
        <v-avatar size="100">
          <img :src="img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Student-information :class="{'informfixed':fixed}" :name="name" :attention="watching_count" :rollin="participation_count" :trust="trust"
        :watcher="watcher" :visits="visits" :mine="mine" :is_visitor_public="is_visitor_public" :is_watched_orgs_public="is_watched_orgs_public"></Student-information>
      <div class="asinform" v-if="fixed"></div>
      <Student-collect v-show="item=='collect'" :mine="false" :acts="collects" @sendmorecollectacts="sendmorecollectacts" :is_fav_public="is_fav_public"></Student-collect>
      <Student-history-attend v-show="item=='historyattend'" :mine="false" :acts="historyatt" @getmoreattendacts="getmoreattendacts" :stu_id="0"
        :is_history_public="is_history_public"></Student-history-attend>
      <div style="clear:both;"></div>
    </div>
    <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0)">
      <i class="iconfont icon-jiantou-copy-copy-copy"></i>
    </v-btn>
    <Footer></Footer>
  </v-content>
</template>

<script>
  export default {
    props: ['opt', 'stu_id'],
    data: () => ({
      request_failed:false,
      no_more_acts:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      avatarurl: '/src/assets/default.png',
      usertype: 'none',
      parallaxpath: '/src/assets/stuownbg.jpg',
      img: '/src/assets/defaultavatar.png',
      name: '',
      item: 'signup',
      offsetTop: 0,
      trust: 100,
      mine: false,
      visits: [],
      watcher: [],
      collects: [],
      morecollects: '',
      presentcollects: 0,
      collectmax: 0,
      historyatt: [],
      moreatt: '',
      attmax: 0,
      presentatt: 0,
      is_visitor_public: true,
      is_fav_public: true,
      is_history_public: true,
      is_watched_orgs_public: true,
      targetid: 0,
      participation_count: 0,
      watching_count: 0,
    }),
    created: function () {
      // toolbar
      var url0 = localStorage.getItem("user_url");
      var url1 = localStorage.getItem("org_url");
      if (url0 != null) {
        this.usertype = 'user';
      } else if (url1 != null) {
        this.usertype = 'org';
      }
      this.avatarurl = sessionStorage.getItem("avatar");

      switch (this.opt) {
        case 'collect':
          this.item = 'collect';
          // 收藏
          this.axioscollect(this.stu_id);
          break;
        case 'historyattend':
          this.item = 'historyattend';
          // 历史参加
          this.axioshistoryattend(this.stu_id);
          break;
      }

      // 目标用户信息
      this.$http({
        method: 'get',
        url: '/account/student-visitor-homepage/' + this.stu_id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        var targeturl = res.data.user;
        targeturl = targeturl.split("/");
        this.targetid = targeturl[5];
        this.parallaxpath ="http://222.186.36.156:8000"+ res.data.bg_img;
        this.watching_count = res.data.watching_count;
        this.participation_count = res.data.participation_count;
        this.name = res.data.nickname;
        this.trust = res.data.credit;
        this.img = "http://222.186.36.156:8000"+res.data.avatar;
        this.is_visitor_public = res.data.is_visitor_public;
        this.is_fav_public = res.data.is_fav_public;
        this.is_history_public = res.data.is_history_public;
        this.is_watched_orgs_public = res.data.is_watched_orgs_public;
        // 访客
        if (this.is_visitor_public) {
          this.$http({
            method: 'get',
            url: '/message/visitings/?target=' + this.targetid,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            }
          }).then((res) => {
            for (let k = 0; k < res.data.length; k++) {
              // 是学生
              if (res.data[k].watcher.student != null) {
                this.$set(this.visits, k, {
                  avatar: "http://222.186.36.156:8000"+res.data[k].watcher.student.avatar,
                  name: res.data[k].watcher.student.nickname,
                  url: res.data[k].watcher.student.url,
                  number: k
                });
              }
              // 是组织
              if (res.data[k].watcher.org != null) {
                this.$set(this.visits, k, {
                  avatar:"http://222.186.36.156:8000"+ res.data[k].watcher.org.avatar,
                  name: res.data[k].watcher.org.org_name,
                  url: res.data[k].watcher.org.url,
                  number: k
                });
              }
            }
          }).catch((error)=>{
            console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
          });
        }
        //记录访客
        if (this.targetid != localStorage.getItem("uid") && localStorage.getItem("uid") != null) { //如果不是自己访问自己或者未登录访问
          this.$http({
            method: 'post',
            url: '/message/visitings/',
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              'watcher': localStorage.getItem("uid"),
              'target': this.targetid
            }
          }).then((res) => {
          }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
          });
        }
      }).catch((error)=>{
        console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
      });
      // 关注
      if (this.is_watched_orgs_public) {
        this.$http({
          method: 'get',
          url: '/account/watchings/?watcher=' + this.stu_id,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.length; k++) {
            var org_url = res.data[k].target.url;
            var org_id = org_url.split("/");
            org_id = org_id[5];
            this.$set(this.watcher, k, {
              orgavatar: "http://222.186.36.156:8000"+res.data[k].target.avatar,
              orgname: res.data[k].target.org_name,
              orgurl: org_url,
              number: k,
              orgid: org_id
            });
          }
        }).catch((error)=>{
          console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      }
    },
    watch: {
      '$route' (to, from) {
        switch (to.params.opt) {
          case 'collect':
            this.item = 'collect';
            // 收藏
            this.axioscollect(this.stu_id);
            break;
          case 'historyattend':
            this.item = 'historyattend';
            // 历史参加
            this.axioshistoryattend(this.stu_id);
            break;
        }
      },
    },
    computed: {
      toolbaropacity: function () {
        var k = this.offsetTop;
        if (k < 350) {
          return 1;
        } else {
          k = 2.4 - k / 250;
          return k;
        }
      },
      fixed: function () {
        var k = this.offsetTop;
        if (k >= 664) {
          return true;
        } else
          return false;
      },
      display: function () {
        var k = this.offsetTop;
        if (k < 589) {
          return 'block';
        } else
          return 'none';
      }
    },
    methods: {
      axioshistoryattend: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/participations/?student=' + id + '&activity__is_ended=True',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].activity.url;
            actid = actid.split("/");
            var orgurl=res.data.results[k].activity.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.historyatt, k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5],
              org_id:org_id
            });
            this.moreatt = res.data.next;
            this.presentatt = res.data.results.length;
            this.attmax = res.data.count;
          }
        }).catch((error)=>{
          console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      axioscollect: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/bookmarkings/?watcher=' + id,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].target.url;
            actid = actid.split("/");
            var orgurl=res.data.results[k].target.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.collects, k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar:"http://222.186.36.156:8000"+ res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].target.is_ended,
              bookmarkingurl: res.data.results[k].url
            });
            this.morecollects = res.data.next;
            this.presentcollects = res.data.results.length;
            this.collectmax = res.data.count;
          }
        }).catch((error)=>{
          console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      sendmorecollectacts: function () {
        if (this.collectmax == this.presentcollects) {
          this.no_more_acts=true;
          return;
        }
        this.$http({
          method: 'get',
          url: this.morecollects,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].target.url;
            actid = actid.split("/");
            var orgurl=res.data.results[k].target.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.collects, this.presentcollects + k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].target.is_ended,
            });
          }
          this.morecollects = res.data.next;
          this.presentcollects += res.data.results.length;
        }).catch((error)=>{
          console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      getmoreattendacts: function () {
        if (this.attmax == this.presentatt) {
          this.no_more_acts=true;
          return;
        }
        this.$http({
          method: 'get',
          url: this.moreatt,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].activity.url;
            actid = actid.split("/");
            var orgurl=res.data.results[k].activity.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.historyatt, this.presentatt + k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5],
              org_id:org_id
            });
          }
          this.moreatt = res.data.next;
          this.presentatt += res.data.results.length;
        }).catch((error)=>{
          console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

</script>

<style scoped>
  .isfixed {
    position: fixed;
    z-index: 7;
    top: 0;
    width: 100%;
  }

  .informfixed {
    position: fixed;
    z-index: 6;
    top: 64px;
    width: 266.41px;
  }

  .asinform {
    width: 266.41px;
    height: 810px;
    background: white;
    float: left;
    margin-top: 1px;
  }

  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .v-parallax {
    margin-top: 64px;
  }

  .middle-wrapper {
    width: 1063px;
    margin: 0 auto;
    position: relative;
  }

  .v-avatar {
    position: absolute;
    top: 10px;
    left: 85px;
    z-index: 100;
  }

  .stuown-mainwrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

  .large-img {
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height: 100%;
    max-width: 100%;
  }

  .owntoolbar-wrapper {
    margin-top: -6px;
    width: 100%;
  }

</style>
