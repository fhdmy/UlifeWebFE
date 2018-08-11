<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Stutoolbar :avatar="img"></Stutoolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Stuowntoolbar :itembottom="item"></Stuowntoolbar>
        <v-avatar size="100">
          <img :src="img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Stuinform :class="{'informfixed':fixed}" :name="name" :attention="attention" :rollin="attmax" :trust="trust" :mine="mine"
        :watcher="watcher" :visits="visits"></Stuinform>
      <div class="asinform" v-if="fixed"></div>
      <Signup v-show="item=='signup'" :acts="signupacts" @getmoresignupacts="getmoresignupacts"></Signup>
      <Trends v-show="item=='trends'" :acts="trendacts" @getmoretrendsacts="getmoretrendsacts"></Trends>
      <Collect v-show="item=='collect'" :mine="mine" :acts="collects" @sendmorecollectacts="sendmorecollectacts"></Collect>
      <Historyview v-show="item=='historyview'" :acts="historyvi" @sendmoreviewacts="sendmoreviewacts"></Historyview>
      <Historyattend v-show="item=='historyattend'" :mine="mine" :acts="historyatt" @getmoreattendacts="getmoreattendacts"></Historyattend>
      <Stumsg v-show="item=='stumsg'"></Stumsg>
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
      item: 'signup',
      offsetTop: 0,
      attention: 0,
      trust: 100,
      mine: true,
      watcher: [],
      visits: [],
      signupacts: [],
      moresignupacts:'',
      signupmax:0,
      presentsignup:0,
      historyatt: [],
      moreatt:'',
      attmax:0,
      presentatt:0,
      historyvi: [], //历史参加的数组
      moreview: '',
      presentview: 0,
      viewmax: 0,
      collects: [],
      morecollects: '',
      presentcollects:0,
      collectmax:0,
      trendacts:[],
      trendmax:0,
      presenttrend:0,
      moretrend:''
    }),
    created: function () {
      switch (this.opt) {
        case 'signup':
          this.item = 'signup';
          break;
        case 'trends':
          this.item = 'trends';
          break;
        case 'collect':
          this.item = 'collect';
          break;
        case 'historyview':
          this.item = 'historyview';
          break;
        case 'stumsg':
          this.item = 'stumsg';
          break;
      }
      this.img = sessionStorage.getItem("avatar");
      var user_url = localStorage.getItem("user_url");
      user_url = user_url.split("/");
      var id = user_url[3];
      // homepage个人信息
      this.$http({
        method: 'get',
        url: '/account/student-homepage/' + id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.parallaxpath = res.data.bg_img;
        this.name = res.data.nickname;
        this.trust = res.data.credit;
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
      // 关注
      this.$http({
        method: 'get',
        url: '/account/watchings/?watcher=' + id,
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        for (let k = 0; k < res.data.length; k++) {
          var org_url=res.data[k].target.url;
          var org_id=org_url.split("/");
          org_id=org_id[5];
          this.$set(this.watcher, k, {
            orgavatar: res.data[k].target.avatar,
            orgname: res.data[k].target.org_name,
            orgurl: org_url,
            number: k,
            orgid:org_id
          });
        }
        this.attention = res.data.length;
        // 动态
        this.axiostrends(id);
      }).catch(function (error) {
        alert("网络传输故障！");
      });

      // 报名
      this.axiossignup(id);
      // 历史参加
      this.axioshistoryattend(id);
      // 历史浏览
      this.axioshistoryview(id);
      // 收藏
      this.axioscollect(id);
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
      axiossignup: function (id) {
        var myDate = new Date();
        myDate = myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDate();
        this.$http({
          method: 'get',
          url: '/activity/participations/?student=' + id + '&activity__start_at__lt=' + myDate,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].activity.url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.signupacts, k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].activity.is_ended,
            });
          }
          this.moresignupacts = res.data.next;
          this.presentsignup=res.data.results.length;
          this.signupmax = res.data.count;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      axioshistoryattend: function (id) {
        var myDate = new Date();
        myDate = myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDate();
        this.$http({
          method: 'get',
          url: '/activity/participations/?student=' + id + '&activity__start_at__gt=' + myDate,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].activity.url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.historyatt, k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5],
            });
            this.moreatt = res.data.next;
            this.presentatt=res.data.results.length;
            this.attmax = res.data.count;
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      axioshistoryview: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/browsering-histories/?watcher=' + id,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].target.url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.historyvi, k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].target.is_ended,
            });
            this.moreview = res.data.next;
            this.presentview=res.data.results.length;
            this.viewmax=res.data.count;
          }
        }).catch(function (error) {
          alert("网络传输故障！");
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
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.collects, k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].target.is_ended,
              bookmarkingurl:res.data.results[k].url
            });
            this.morecollects = res.data.next;
            this.presentcollects=res.data.results.length;
            this.collectmax=res.data.count;
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      axiostrends: function (id) {
        var ids="";
        for(let j=0;j<this.watcher.length;j++){
          if(j==this.watcher.length-1){
            ids=ids+this.watcher[j].orgid;
            break;
          }
          ids=ids+this.watcher[j].orgid+',';
        }
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner__in' + ids,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.trendacts, k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].is_ended,
            });
            this.moretrend = res.data.next;
            this.presenttrend=res.data.results.length;
            this.trendmax=res.data.count;
          }
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      chooseitem: function (e) {
        switch (e) {
          case 'signup':
            this.item = 'signup';
            break;
          case 'trends':
            this.item = 'trends';
            break;
          case 'collect':
            this.item = 'collect';
            break;
          case 'historyview':
            this.item = 'historyview';
            break;
          case 'historyattend':
            this.item = 'historyattend';
            break;
          case 'stumsg':
            this.item = 'stumsg';
            break;
        }
      },
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      sendmoreviewacts: function () {
        if (this.viewmax == this.presentview) {
          alert("已经没有更多活动啦！");
          return;
        }
        this.$http({
          method: 'get',
          url: this.moreview,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].target.url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.historyvi, this.presentview + k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].target.is_ended,
            });
          }
          this.moreview=res.data.next;
          this.presentview += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      sendmorecollectacts: function () {
        if (this.collectmax == this.presentcollects) {
          alert("已经没有更多活动啦！");
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
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.collects, this.presentcollects + k, {
              head_img: res.data.results[k].target.head_img,
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: res.data.results[k].target.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].target.is_ended,
            });
          }
          this.morecollects=res.data.next;
          this.presentcollects += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoreattendacts: function () {
        if (this.attmax == this.presentatt) {
          alert("已经没有更多活动啦！");
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
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.historyatt, this.presentatt + k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5]
            });
          }
          this.moreatt=res.data.next;
          this.presentatt+= res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoresignupacts: function () {
        if (this.signupmax == this.presentsignup) {
          alert("已经没有更多活动啦！");
          return;
        }
        this.$http({
          method: 'get',
          url: this.moresignupacts,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].activity.url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.signupacts, this.presentsignup + k, {
              head_img: res.data.results[k].activity.head_img,
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: res.data.results[k].activity.owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended:res.data.results[k].activity.is_ended,
            });
          }
          this.moresignupacts=res.data.next;
          this.presentsignup+= res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
      getmoretrendsacts: function () {
        if (this.trendmax == this.presenttrend) {
          alert("已经没有更多活动啦！");
          return;
        }
        this.$http({
          method: 'get',
          url: this.moretrend,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.trendacts, this.presenttrend + k, {
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
          this.moretrend=res.data.next;
          this.presenttrend += res.data.results.length;
        }).catch(function (error) {
          alert("网络传输故障！");
        });
      },
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
