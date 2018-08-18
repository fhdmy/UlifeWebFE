<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Toolbar v-if="usertype=='none'"></Toolbar>
      <Stutoolbar v-if="usertype=='user'" :avatar="avatarurl"></Stutoolbar>
      <Orgtoolbar v-if="usertype=='org'" :avatar="avatarurl"></Orgtoolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Orgdisplaytoolbar :itembottom="item" :mine="mine"></Orgdisplaytoolbar>
        <v-avatar size="100">
          <img :src="org_img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Orginform :class="{'informfixed':fixed}" :name="name" :attention="attention" :stars="stars" :acts="activity_count" :visits="visits"
        :mine="false" :org_id="org_id"></Orginform>
      <div class="asinform" v-if="fixed"></div>
      <Inform v-show="item=='inform'" :mine="mine" :lists="lists"></Inform>
      <Orgtrends v-show="item=='trends'" :acts="myacts" @getmoretrends="getmoretrends"></Orgtrends>
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
    props: ['opt', 'org_id'],
    data: () => ({
      usertype: 'none',
      avatarurl: '',
      org_img: '',
      parallaxpath: '/src/assets/stuownbg.jpg',
      name: '',
      item: 'inform',
      offsetTop: 0,
      attention: 0,
      stars: 5,
      mine: false,
      visits: [],
      lists: [],
      targetid: 0,
      myacts: [],
      myactsmax: 0,
      presentmyacts: 0,
      moremyacts: '',
      activity_count: 0
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
        case 'inform':
          this.item = 'inform';
          break;
        case 'trends':
          this.item = 'trends';
          // 我的活动
          this.axiosmyacts(this.org_id);
          break;
      }

      // homepage个人信息
      this.$http({
        method: 'get',
        url: '/account/org-visitor-homepage/' + this.org_id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.parallaxpath = "http://222.186.36.156:8000"+res.data.bg_img;
        this.org_img = "http://222.186.36.156:8000"+res.data.avatar;
        this.attention = res.data.watcher_count;
        this.name = res.data.org_name;
        this.stars = res.data.stars;
        this.activity_count = res.data.activity_count;
        this.lists = JSON.parse(res.data.demonstration);
        var url = res.data.user;
        url = url.split("/");
        this.targetid = url[5];
        // 访客
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
                number: k,
                type:'student'
              });
            }
            // 是组织
            if (res.data[k].watcher.org != null) {
              this.$set(this.visits, k, {
                avatar: "http://222.186.36.156:8000"+res.data[k].watcher.org.avatar,
                name: res.data[k].watcher.org.org_name,
                url: res.data[k].watcher.org.url,
                number: k,
                type:'org'
              });
            }
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
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
   
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
      }).catch(function (error) {
        alert("网络传输故障！");
      });
    },
    watch: {
      '$route' (to, from) {
        switch (to.params.opt) {
          case 'inform':
            this.item = 'inform';
            break;
          case 'trends':
            this.item = 'trends';
            // 我的活动
            this.axiosmyacts(this.org_id);
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
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended: res.data.results[k].is_ended,
            });
          }
          this.moremyacts = res.data.next;
          this.presentmyacts = res.data.results.length;
          this.myactsmax = res.data.count;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoretrends: function () {
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
      chooseitem: function (e) {
        switch (e) {
          case 'inform':
            this.item = 'inform';
            break;
          case 'trends':
            this.item = 'trends';
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
