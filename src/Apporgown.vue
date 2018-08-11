<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Orgtoolbar :avatar="img"></Orgtoolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Orgowntoolbar :itembottom="item"></Orgowntoolbar>
        <v-avatar size="100">
          <img :src="img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Orginform :class="{'informfixed':fixed}" :name="name" :attention="attention" :stars="stars" :acts="myactsmax" :visits="visits"
        :mine="mine" :orgurl="orgurl" :list="lists" :bg_img="parallaxpath"></Orginform>
      <div class="asinform" v-if="fixed"></div>
      <Inform v-show="item=='inform'" :mine="mine" :lists="lists"></Inform>
      <Draft v-show="item=='draft'" :acts="draft" @getmoredraftacts="getmoredraftacts"></Draft>
      <Create v-show="item=='create'" :org_name="name"></Create>
      <Orgmyact v-show="item=='myact'" :acts="myacts" @getmoremyacts="getmoremyacts"></Orgmyact>
      <Mysignup v-show="item=='mysignup'" :acts="signup" @getmoresignup="getmoresignup"></Mysignup>
      <Orgmsg v-show="item=='orgmsg'"></Orgmsg>
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
      parallaxpath: '/src/assets/stuownbg.jpg',
      img: '/src/assets/defaultavatar.png',
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
      myacts:[],
      myactsmax:0,
      presentmyacts:0,
      moremyacts:'',
      signup:[],
      moresignup:'',
      signupmax:0,
      presentsignup:0
    }),
    created: function () {
      switch (this.opt) {
        case 'inform':
          this.item = 'inform';
          break;
        case 'create':
          this.item = 'create';
          break;
        case 'draft':
          this.item = 'draft';
          break;
        case 'myact':
          this.item = 'myact';
          break;
        case 'mysignup':
          this.item = 'mysignup';
          break;
        case 'orgmsg':
          this.item = 'orgmsg';
          break;
      }

      this.img = sessionStorage.getItem("avatar");
      var org_url = localStorage.getItem("org_url");
      org_url = org_url.split("/");
      var id = org_url[3];
      // homepage个人信息
      this.$http({
        method: 'get',
        url: '/account/org-homepage/' + id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.parallaxpath = res.data.bg_img;
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
          url: '/message/visitings/?watcher=' + user[5],
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.length; k++) {
            // 是学生
            if (res.data[k].target.student != null) {
              this.$set(this.visits, k, {
                avatar: res.data[k].target.student.avatar,
                name: res.data[k].target.student.nickname,
                url: res.data[k].target.student.url,
                number: k
              });
            }
            // 是组织
            if (res.data[k].target.org != null) {
              this.$set(this.visits, k, {
                avatar: res.data[k].target.org.avatar,
                name: res.data[k].target.org.org_name,
                url: res.data[k].target.org.url,
                number: k
              });
            }
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      }).catch(function (error) {
        alert("网络传输故障！");
      });

      // 草稿箱
      this.axiosdraft(id);
      // 我的活动
      this.axiosmyacts(id);
      // 报名
      this.axiossignup(id);
    },
    watch: {
      '$route' (to, from) {
        this.item = to.params.opt;
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
          url: '/activity/activities/?owner=' + id + '&is_published=False',
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moredraft = res.data.next;
          this.presentdraft = res.data.results.length;
          this.draftmax = res.data.count;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      axiosmyacts: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner=' + id + '&is_published=True',
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].is_ended,
            });
          }
          this.moremyacts = res.data.next;
          this.presentmyacts = res.data.results.length;
          this.myactsmax = res.data.count;
        }).catch(function (error) {
          alert("网络传输故障！");
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
            });
          }
          this.moresignup = res.data.next;
          this.presentsignup = res.data.results.length;
          this.signupmax = res.data.count;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoredraftacts: function () {
        if (this.draftmax == this.presentdraft) {
          alert("已经没有更多活动啦！");
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moredraft = res.data.next;
          this.presentdraft += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoremyacts: function () {
        if (this.myactsmax == this.presentmyacts) {
          alert("已经没有更多活动啦！");
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moremyacts = res.data.next;
          this.presentmyacts += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoresignup: function () {
        if (this.signupmax == this.presentsignup) {
          alert("已经没有更多活动啦！");
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
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moresignup = res.data.next;
          this.presentsignup += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      chooseitem: function (e) {
        switch (e) {
          case 'inform':
            this.item = 'inform';
            break;
          case 'create':
            this.item = 'create';
            break;
          case 'draft':
            this.item = 'draft';
            break;
          case 'myact':
            this.item = 'myact';
            break;
          case 'mysignup':
            this.item = 'mysignup';
            break;
          case 'orgmsg':
            this.item = 'orgmsg';
            break;
        }
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
    height: 840px;
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
