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
      <Student-toolbar :avatar="img"></Student-toolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
      <div class="middle-wrapper">
        <Student-own-toolbar :itembottom="item"></Student-own-toolbar>
        <v-avatar size="100">
          <img :src="img">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Student-information :class="{'informfixed':fixed}" :name="name" :attention="watching_count" :rollin="participation_count" :trust="trust" :mine="mine"
        :watcher="watcher" :visits="visits" :is_visitor_public="true" :is_watched_orgs_public="true"
      ></Student-information>
      <div class="asinform" v-if="fixed"></div>
      <Student-signup v-show="item=='student_signup'" :acts="signupacts" @getmoresignupacts="getmoresignupacts"></Student-signup>
      <Student-dynamic v-show="item=='dynamatic'" :acts="trendacts" @getmoretrendsacts="getmoretrendsacts"></Student-dynamic>
      <Student-collect v-show="item=='collect'" :mine="mine" :acts="collects" @sendmorecollectacts="sendmorecollectacts" :is_fav_public="true" @getrequest_failed="getrequest_failed"></Student-collect>
      <Student-history-view v-show="item=='historyview'" :acts="historyvi" @sendmoreviewacts="sendmoreviewacts" :stu_id="stu_id" @getrequest_failed="getrequest_failed"></Student-history-view>
      <Student-history-attend v-show="item=='historyattend'" :mine="mine" :acts="historyatt" @getmoreattendacts="getmoreattendacts" :stu_id="stu_id" :is_history_public="true" @getrequest_failed="getrequest_failed"></Student-history-attend>
      <Student-msg v-show="item=='student_msg'"></Student-msg>
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
      request_failed:false,
      no_more_acts:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      parallaxpath: '',
      img: '',
      name: '',
      item: 'student_signup',
      offsetTop: 0,
      attention: 0,
      trust: 100,
      mine: true,
      watcher: [],
      visits: [],
      signupacts: [],
      moresignupacts: '',
      signupmax: 0,
      presentsignup: 0,
      historyatt: [],
      moreatt: '',
      attmax: 0,
      presentatt: 0,
      historyvi: [], //历史参加的数组
      moreview: '',
      presentview: 0,
      viewmax: 0,
      collects: [],
      morecollects: '',
      presentcollects: 0,
      collectmax: 0,
      trendacts: [],
      trendmax: 0,
      presenttrend: 0,
      moretrend: '',
      stu_id: 0,
      participation_count:0,
      watching_count:0
    }),
    created: function () {
      this.img = sessionStorage.getItem("avatar");
      var user_url = localStorage.getItem("user_url");
      user_url = user_url.split("/");
      this.stu_id = user_url[3];
      switch (this.opt) {
        case 'student_signup':
          this.item = 'student_signup';
          // 报名
          this.axiossignup(this.stu_id);
          break;
        case 'dynamatic':
          this.item = 'dynamatic';
          break;
        case 'collect':
          this.item = 'collect';
          // 收藏
          this.axioscollect(this.stu_id);
          break;
        case 'historyview':
          this.item = 'historyview';
          // 历史浏览
          this.axioshistoryview(this.stu_id);
          break;
        case 'historyattend':
          this.item = 'historyattend';
          // 历史参加
          this.axioshistoryattend(this.stu_id);
          break;
        case 'student_msg':
          this.item = 'student_msg';
          break;
      }
      // homepage个人信息
      this.$http({
        method: 'get',
        url: '/account/student-homepage/' + this.stu_id + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        if(res.data.bg_img!=null){
          this.parallaxpath ="http://222.186.36.156:8000" + res.data.bg_img + '.thumbnail.2.jpg';
        }
        else{
          this.parallaxpath ='/src/assets/stuownbg.jpg';
        }
        this.participation_count=res.data.participation_count;
        this.watching_count=res.data.watching_count;
        this.name = res.data.nickname;
        this.trust = res.data.credit;
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
                avatar: "http://222.186.36.156:8000"+res.data[k].watcher.student.avatar + '.thumbnail.1.jpg',
                name: res.data[k].watcher.student.nickname,
                url: res.data[k].watcher.student.url,
                number: k,
                type:'student'
              });
            }
            // 是组织
            if (res.data[k].watcher.org != null) {
              this.$set(this.visits, k, {
                avatar:"http://222.186.36.156:8000" + res.data[k].watcher.org.avatar + '.thumbnail.1.jpg',
                name: res.data[k].watcher.org.org_name,
                url: res.data[k].watcher.org.url,
                number: k,
                type:'org'
              });
            }
          }
        }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      }).catch((error)=>{
         console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
      });
      // 关注
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
            orgavatar: "http://222.186.36.156:8000"+res.data[k].target.avatar + '.thumbnail.1.jpg',
            orgname: res.data[k].target.org_name,
            orgurl: org_url,
            number: k,
            orgid: org_id
          });
        }
        this.attention = res.data.length;
        // 动态
        this.axiostrends(this.stu_id);
      }).catch((error)=>{
         console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
      });
    },
    watch: {
      '$route' (to, from) {
        switch (to.params.opt) {
          case 'student_signup':
            this.item = 'student_signup';
            // 报名
            this.axiossignup(this.stu_id);
            break;
          case 'dynamatic':
            this.item = 'dynamatic';
            break;
          case 'collect':
            this.item = 'collect';
            // 收藏
            this.axioscollect(this.stu_id);
            break;
          case 'historyview':
            this.item = 'historyview';
            // 历史浏览
            this.axioshistoryview(this.stu_id);
            break;
          case 'historyattend':
            this.item = 'historyattend';
            // 历史参加
            this.axioshistoryattend(this.stu_id);
            break;
          case 'student_msg':
            this.item = 'student_msg';
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
      axiossignup: function (id) {
        this.$http({
          method: 'get',
          url: '/activity/participations/?student=' + id + '&activity__is_ended=False',
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
            this.$set(this.signupacts, k, {
              head_img: res.data.results[k].activity.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].activity.is_ended,
            });
          }
          this.moresignupacts = res.data.next;
          this.presentsignup = res.data.results.length;
          this.signupmax = res.data.count;
        }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
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
              head_img: res.data.results[k].activity.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar + '.thumbnail.2.jpg',
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
            var orgurl=res.data.results[k].target.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.historyvi, k, {
              head_img: res.data.results[k].target.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].target.owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].target.is_ended,
            });
            this.moreview = res.data.next;
            this.presentview = res.data.results.length;
            this.viewmax = res.data.count;
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
              head_img: res.data.results[k].target.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].target.owner.avatar + '.thumbnail.2.jpg',
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
      axiostrends: function (id) {
        var ids = "";
        for (let j = 0; j < this.watcher.length; j++) {
          if (j == this.watcher.length - 1) {
            ids = ids + this.watcher[j].orgid;
            break;
          }
          ids = ids + this.watcher[j].orgid + ',';
        }
        this.$http({
          method: 'get',
          url: '/activity/activities/?owner__in=' + ids,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var orgurl=res.data.results[k].owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.trendacts, k, {
              head_img: res.data.results[k].head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].is_ended,
            });
            this.moretrend = res.data.next;
            this.presenttrend = res.data.results.length;
            this.trendmax = res.data.count;
          }
        }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      sendmoreviewacts: function () {
        if (this.viewmax == this.presentview) {
          this.no_more_acts=true;
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
            var orgurl=res.data.results[k].target.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].target.start_at.split('T');
            this.$set(this.historyvi, this.presentview + k, {
              head_img: res.data.results[k].target.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].target.owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].target.is_ended,
            });
          }
          this.moreview = res.data.next;
          this.presentview += res.data.results.length;
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
              head_img: res.data.results[k].target.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].target.heading,
              date: computeddate[0],
              location: res.data.results[k].target.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].target.owner.avatar + '.thumbnail.2.jpg',
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
              head_img: res.data.results[k].activity.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar + '.thumbnail.2.jpg',
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
      getmoresignupacts: function () {
        if (this.signupmax == this.presentsignup) {
          this.no_more_acts=true;
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
            var orgurl=res.data.results[k].activity.owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].activity.start_at.split('T');
            this.$set(this.signupacts, this.presentsignup + k, {
              head_img: res.data.results[k].activity.head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].activity.heading,
              date: computeddate[0],
              location: res.data.results[k].activity.location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].activity.owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].activity.is_ended,
            });
          }
          this.moresignupacts = res.data.next;
          this.presentsignup += res.data.results.length;
        }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      getmoretrendsacts: function () {
        if (this.trendmax == this.presenttrend) {
          this.no_more_acts=true;
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
            var orgurl=res.data.results[k].owner.url;
            orgurl=orgurl.split("/");
            var org_id=orgurl[5];
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.trendacts, this.presenttrend + k, {
              head_img: res.data.results[k].head_img + '.thumbnail.0.jpg',
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar:"http://222.186.36.156:8000"+ res.data.results[k].owner.avatar + '.thumbnail.2.jpg',
              isover: false,
              acturl: actid[5],
              org_id:org_id,
              is_ended: res.data.results[k].is_ended,
            });
          }
          this.moretrend = res.data.next;
          this.presenttrend += res.data.results.length;
        }).catch((error)=>{
           console.log(error.response);
            if(!this.request_failed){
              this.request_failed=true;
            }
        });
      },
      getrequest_failed:function(){
        this.request_failed=true;
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
