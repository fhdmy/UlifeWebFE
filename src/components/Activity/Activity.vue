<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
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
        <a @click="openorg(org_id)">
          <v-avatar size="120" v-if="!fixed">
            <img :src="img" :alt="org">
          </v-avatar>
        </a>
        <p class="act-title display-1" v-if="!fixed">{{title}}</p>
        <Activity-toolbar :org="org" :launchdate="launchdate" :isfinished="is_ended" :stars="stars" :fixed="fixed" :title="title"
          :collected="collected" :participation="participation" :routerid="routerid" :acturl="opt" :collecturl="collecturl"
          :participationurl="participationurl" :requires="requires" :is_ended="is_ended" :usertype="usertype"></Activity-toolbar>
      </div>
    </div>
    <div v-if="fixed" style="height:70px;"></div>
    <div class="main-wrapper">
      <Activity-body :introduction="introduction" :date="date" :time="time" :place="place" :type="type" :interest="interest" :lists="lists"
        :customlists="customlists"></Activity-body>
      <Related></Related>
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
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 2000,
      collecturl: '',
      routerid: 0,
      participation: false,
      participationurl: '',
      collected: false,
      username: '',
      avatarurl: '',
      usertype: 'none',
      parallaxpath: '',
      img: '/src/assets/defaultavatar.png',
      title: '',
      requires: [],
      org: '',
      org_id: '',
      launchdate: '',
      stars: 5,
      introduction: '',
      date: '',
      time: '',
      place: '',
      type: '',
      interest: '',
      lists: [],
      is_ended: false,
      customlists: [{
          name: 'Xnick',
          img: '/src/assets/xnick.jpg',
          date: '2018-03-19',
          content: '看到很多参加一日游来L岛的都说L岛很小，一天就能玩完、骑车20分钟环岛，我表示他们真的有走完L岛、有get到它的精髓吗？L岛在我看来一点也不小，我们3天都没有骑遍它。德 阿让 、三连滩、Anse severs、Anse Patates、Anse Grosse，每个海滩都很美，都有自己的风格。'
        },
        {
          name: '小变态',
          img: '/src/assets/head.jpg',
          date: '2018-05-10',
          content: '从主岛去P岛可以选择坐船或者是小飞机。因为船票和机票价格差不多，加上很多人说坐船会吐到怀疑人生，所以我们订的内飞往返1166/人。 塞舌尔 航空官网和各大线上平台都可以购票。有人说便宜的时候可以订到400多一张的机票，确实有这样的价格，但是时间都是不好的，要么很早要么很晚，黄金时间的票价不会这么便宜。'
        },
        {
          name: 'Xnick',
          img: '/src/assets/xnick.jpg',
          date: '2018-03-19',
          content: '看到很多参加一日游来L岛的都说L岛很小，一天就能玩完、骑车20分钟环岛，我表示他们真的有走完L岛、有get到它的精髓吗？L岛在我看来一点也不小，我们3天都没有骑遍它。德 阿让 、三连滩、Anse severs、Anse Patates、Anse Grosse，每个海滩都很美，都有自己的风格。'
        },
        {
          name: '小变态',
          img: '/src/assets/head.jpg',
          date: '2018-05-10',
          content: '从主岛去P岛可以选择坐船或者是小飞机。因为船票和机票价格差不多，加上很多人说坐船会吐到怀疑人生，所以我们订的内飞往返1166/人。 塞舌尔 航空官网和各大线上平台都可以购票。有人说便宜的时候可以订到400多一张的机票，确实有这样的价格，但是时间都是不好的，要么很早要么很晚，黄金时间的票价不会这么便宜。'
        }
      ],
      offsetTop: 0
    }),
    created: function () {
      // toolbar
      var url0 = localStorage.getItem("user_url");
      var url1 = localStorage.getItem("org_url");
      if (url0 != null) {
        this.usertype = 'user';
        var user_url = localStorage.getItem("user_url");
        user_url = user_url.split("/");
        this.routerid = user_url[3];
      } else if (url1 != null) {
        this.usertype = 'org';
        var user_url = localStorage.getItem("org_url");
        user_url = user_url.split("/");
        this.routerid = user_url[3];
      }
      this.avatarurl = sessionStorage.getItem("avatar");

      // 获取活动内容
      this.$http({
        method: 'get',
        url: 'activity/activity-demo/' + this.opt + '/',
        // headers: {
        //   "Authorization": "Token " + localStorage.getItem("token")
        // }
      }).then((res) => {
        var computeddate = res.data.created_at.split('T');
        var computedstart = res.data.start_at.split('T');
        var comutedstarttime = computedstart[1].split(':');
        this.parallaxpath = res.data.head_img + '.thumbnail.2.jpg';
        if (res.data.owner.avatar != null) {
          this.img = "http://222.186.36.156:8000" + res.data.owner.avatar +'.thumbnail.3.jpg';
        }
        this.org = res.data.owner.org_name;
        this.title = res.data.heading;
        var orgurl = res.data.owner.url;
        orgurl = orgurl.split("/");
        this.org_id = orgurl[5];
        this.launchdate = computeddate[0];
        this.introduction = res.data.description;
        this.date = computedstart[0];
        this.time = comutedstarttime[0] + ':' + comutedstarttime[1];
        this.place = res.data.location;
        this.type = res.data._type;
        this.interest = res.data.hobby;
        this.lists = JSON.parse(res.data.demonstration);
        this.requires = JSON.parse(res.data.requirement);
        this.is_ended = res.data.is_ended;
      }).catch((error)=>{
        console.log(error.response);
        if (!this.request_failed) {
          this.request_failed = true;
        }
      });

      // 添加历史浏览
      if (localStorage.getItem("token") != null) {
        this.$http({
          method: 'post',
          url: 'activity/browsering-histories/',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          },
          data: {
            watcher: parseInt(this.routerid),
            target: parseInt(this.opt)
          }
        }).then((res) => {

        }).catch((error)=>{
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      }

      // 是否报名
      if (this.usertype == 'user') {
        this.$http({
          method: 'get',
          url: 'activity/participation-actdemo/?student=' + this.routerid + '&activity=' + this.opt,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.participation = res.data.length == 0 ? false : true;
          if (this.participation)
            this.participationurl = res.data[0].url;
        }).catch((error)=>{
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
        // 是否收藏
        this.$http({
          method: 'get',
          url: 'activity/bookmarking-actdemo/?watcher=' + this.routerid + '&target=' + this.opt,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.collected = res.data.length == 0 ? false : true;
          if (this.collected)
            this.collecturl = res.data[0].url;
        }).catch((error)=>{
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      }
      if (this.usertype == 'org') {
        this.participation = false;
        this.collected = false;
      }
    },
    computed: {
      toolbaropacity: function () {
        var k = this.offsetTop;
        if (k < 320) {
          return 1;
        } else {
          k = 2.4 - k / 220;
          return k;
        }
      },
      fixed: function () {
        var k = this.offsetTop;
        if (k >= 664) {
          return true;
        }
      },
      display: function () {
        var k = this.offsetTop;
        if (k < 584) {
          return 'block';
        } else
          return 'none';
      }
    },
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      openorg: function (org_id) {
        let routeData = this.$router.resolve({
          name: 'org_display',
          params: {
            opt: 'abstract',
            org_id: org_id
          }
        });
        window.open(routeData.href, '_blank');
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

  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .middle-wrapper {
    width: 1063px;
    margin: 0 auto;
    position: relative;
  }

  .v-avatar {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -80px;
    z-index: 4;
  }

  .act-title {
    position: absolute;
    top: 0;
    left: 170px;
    margin-top: -70px;
    color: white;
    font-weight: bold;
    z-index: 4;
  }

  .main-wrapper {
    width: 1063px;
    margin: 0 auto;
    height: auto;
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
