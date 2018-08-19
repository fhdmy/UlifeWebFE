<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout0" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="no_more_acts" :multi-line="mode === 'multi-line'" :timeout="timeout0" :top="y === 'top'" :vertical="mode === 'vertical'">
      已经没有更多活动啦
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="org_rejected" :multi-line="mode === 'multi-line'" :timeout="timeout0" :top="y === 'top'" :vertical="mode === 'vertical'">
      组织用户不能关注其他组织！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="not_login" :multi-line="mode === 'multi-line'" :timeout="timeout0" :top="y === 'top'" :vertical="mode === 'vertical'">
      请先登录账号！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="reedit_rejected" :multi-line="mode === 'multi-line'" :timeout="timeout0" :top="y === 'top'" :vertical="mode === 'vertical'">
      不能修改已结束的活动！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Org-toolbar :avatar="img"></Org-toolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Org-own-toolbar :itembottom="item"></Org-own-toolbar>
        <v-avatar size="100">
          <img :src="img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Org-information :class="{'informfixed':fixed}" :name="name" :attention="watcher_count" :stars="stars" :acts="activity_count"
        :visits="visits" :mine="mine" :orgurl="orgurl" :list="lists" :bg_img="parallaxpath" @getrequest_failed="getrequest_failed"
        @getnot_login="getnot_login" @getorg_rejected="getorg_rejected"  
      ></Org-information>
      <div class="asinform" v-if="fixed"></div>
      <Org-abstract v-show="item=='abstract'" :mine="mine" :lists="lists"></Org-abstract>
      <Org-draft v-show="item=='draft'" :acts="draft" @getmoredraftacts="getmoredraftacts" :org_name="name" @getrequest_failed="getrequest_failed"></Org-draft>
      <Org-create-activity v-show="item=='create_activities'" :org_name="name"></Org-create-activity>
      <Org-my-activities v-show="item=='my_activities'" :acts="myacts" @getmoremyacts="getmoremyacts" :org_name="name"
       @getrequest_failed="getrequest_failed" @getreedit_rejected="getreedit_rejected"
       ></Org-my-activities>
      <Org-signup v-show="item=='org_signup'" :acts="signup" @getmoresignup="getmoresignup"></Org-signup>
      <Org-msg v-show="item=='org_msg'"></Org-msg>
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
    props: ['opt'],
    data: () => ({
      request_failed: false,
      no_more_acts: false,
      org_rejected:false,
      not_login:false,
      reedit_rejected:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      parallaxpath: '/src/assets/createdefault.jpg',
      img: '',
      name: '',
      item: 'inform',
      offsetTop: 0,
      attention: 10,
      stars: 5,
      mine: true,
      visits: [],
      orgurl: '',
      lists: [],
      draft: [],
      draftmax: 0,
      moredraft: '',
      presentdraft: 0,
      myacts: [],
      myactsmax: 0,
      presentmyacts: 0,
      moremyacts: '',
      signup: [],
      moresignup: '',
      signupmax: 0,
      presentsignup: 0,
      org_id: 0,
      watcher_count: 0,
      activity_count: 0
    }),
    created: function () {
      this.img = sessionStorage.getItem("avatar");
      var org_url = localStorage.getItem("org_url");
      org_url = org_url.split("/");
      this.org_id = org_url[3];
      switch (this.opt) {
        case 'abstract':
          this.item = 'abstract';
          break;
        case 'create_activities':
          this.item = 'create_activities';
          break;
        case 'draft':
          this.item = 'draft';
          // 草稿箱
          this.axiosdraft(this.org_id);
          break;
        case 'my_activities':
          this.item = 'my_activities';
          break;
        case 'org_signup':
          this.item = 'org_signup';
          // 报名
          this.axiossignup(this.org_id);
          break;
        case 'org_msg':
          this.item = 'org_msg';
          break;
      }
      // homepage个人信息
      this.$http({
        method: 'get',
        url: '/account/org-homepage/' + this.org_id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.watcher_count = res.data.watcher_count;
        this.activity_count = res.data.activity_count;
        if (res.data.bg_img != null) {
          this.parallaxpath = "http://222.186.36.156:8000" + res.data.bg_img;
        } else {
          this.parallaxpath = '/src/assets/stuownbg.jpg';
        }
        this.name = res.data.org_name;
        this.stars = res.data.stars;
        var url = res.data.url;
        this.lists = JSON.parse(res.data.demonstration);
        url = url.split("/");
        this.orgurl = url[5];
        // 访客
        var user = res.data.user;
        user = user.split("/");
        this.$http({
          method: 'get',
          url: '/message/visitings/?target=' + user[5],
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.length; k++) {
            // 是学生
            if (res.data[k].watcher.student != null) {
              this.$set(this.visits, k, {
                avatar: "http://222.186.36.156:8000" + res.data[k].watcher.student.avatar,
                name: res.data[k].watcher.student.nickname,
                url: res.data[k].watcher.student.url,
                number: k,
                type: 'student'
              });
            }
            // 是组织
            if (res.data[k].watcher.org != null) {
              this.$set(this.visits, k, {
                avatar: "http://222.186.36.156:8000" + res.data[k].watcher.org.avatar,
                name: res.data[k].watcher.org.org_name,
                url: res.data[k].watcher.org.url,
                number: k,
                type: 'org'
              });
            }
          }
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      }).catch(function (error) {
        console.log(error.response);
        if (!this.request_failed) {
          this.request_failed = true;
        }
      });
      // 我的活动
      this.axiosmyacts(this.org_id);
    },
    watch: {
      '$route' (to, from) {
        switch (to.params.opt) {
          case 'abstract':
            this.item = 'abstract';
            break;
          case 'create_activities':
            this.item = 'create_activities';
            break;
          case 'draft':
            this.item = 'draft';
            // 草稿箱
            this.axiosdraft(this.org_id);
            break;
          case 'my_activities':
            this.item = 'my_activities';
            break;
          case 'org_signup':
            this.item = 'org_signup';
            // 报名
            this.axiossignup(this.org_id);
            break;
          case 'org_msg':
            this.item = 'org_msg';
            break;
        }
      }
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
      axiosdraft: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner=' + id + '&is_published=False&ordering=-created_at',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.draft, k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moredraft = res.data.next;
          this.presentdraft = res.data.results.length;
          this.draftmax = res.data.count;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      axiosmyacts: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner=' + id + '&is_published=True&ordering=-created_at',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.myacts, k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended: res.data.results[k].is_ended,
            });
          }
          this.moremyacts = res.data.next;
          this.presentmyacts = res.data.results.length;
          this.myactsmax = res.data.count;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      axiossignup: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner=' + id + '&is_ended=False&is_published=True',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.signup, k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
            });
          }
          this.moresignup = res.data.next;
          this.presentsignup = res.data.results.length;
          this.signupmax = res.data.count;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      getmoredraftacts: function () {
        if (this.draftmax == this.presentdraft) {
          this.no_more_acts = true;
          return;
        }
        this.$http({
          method: 'get',
          url: this.moredraft,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.draft, this.presentdraft + k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moredraft = res.data.next;
          this.presentdraft += res.data.results.length;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      getmoremyacts: function () {
        if (this.myactsmax == this.presentmyacts) {
          this.no_more_acts = true;
          return;
        }
        this.$http({
          method: 'get',
          url: this.moremyacts,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.myacts, this.presentmyacts + k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moremyacts = res.data.next;
          this.presentmyacts += res.data.results.length;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      getmoresignup: function () {
        if (this.signupmax == this.presentsignup) {
          this.no_more_acts = true;
          return;
        }
        this.$http({
          method: 'get',
          url: this.moresignup,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.signup, this.presentsignup + k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000" + res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moresignup = res.data.next;
          this.presentsignup += res.data.results.length;
        }).catch(function (error) {
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      getrequest_failed(d) {
        if (!this.request_failed) {
          this.request_failed = true;
        }
      },
      getnot_login(){
        this.not_login=true;
      },
      getorg_rejected(){
        this.org_rejected=true;
      },
      getgetreedit_rejected(){
        this.getreedit_rejected=true;
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
    height: 520px;
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

  .owntoolbar-wrapper {
    margin-top: -6px;
    width: 100%;
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

</style>
