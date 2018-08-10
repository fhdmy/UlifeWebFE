<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Orgtoolbar :avatar="img"></Orgtoolbar>
    </div>
    <img :src="parallaxpath" class="large-img"/>
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
      <Orginform :class="{'informfixed':fixed}" :name="name" :attention="attention" :stars="stars" :acts="acts" :visits="visits" :mine="mine" :orgurl="orgurl" :list="lists" :bg_img="parallaxpath"></Orginform>
      <div class="asinform" v-if="fixed"></div>
      <Inform v-show="item=='inform'" :mine="mine" :lists="lists"></Inform>
      <Draft v-show="item=='draft'"></Draft>
      <Create v-show="item=='create'" :org_name="name"></Create>
      <Orgmyact v-show="item=='myact'"></Orgmyact>
      <Mysignup v-show="item=='mysignup'"></Mysignup>
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
      parallaxpath: '',
      img: '',
      name: '',
      item: 'inform',
      offsetTop: 0,
      attention: 10,
      stars:5,
      acts: 16,
      mine:true,
      visits:[],
      orgurl:'',
      lists:[],
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
        this.stars=res.data.stars;
        var url=res.data.url;
        this.lists=JSON.parse(res.data.demonstration);
        url=url.split("/");
        this.orgurl=url[5];
        // 访客
        var user=res.data.user;
        user=user.split("/");
        this.$http({
          method: 'get',
          url: '/message/visitings/?watcher=' + user[5],
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.length; k++) {
            // 是学生
            if(res.data[k].target.student!=null){
              this.$set(this.visits, k, {
                avatar: res.data[k].target.student.avatar,
                name: res.data[k].target.student.nickname,
                url: res.data[k].target.student.url,
                number: k
              });
            }
            // 是组织
            if(res.data[k].target.org!=null){
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
        if (k >=664) {
          return true;
        }
        else
          return false;
      },
      display:function(){
        var k = this.offsetTop;
        if(k<589){
          return 'block';
        }
        else
          return 'none';
      }
    },
    methods: {
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

  .owntoolbar-wrapper{
    margin-top: -6px;
    width:100%;
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
  .large-img{
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height:100%;
    max-width:100%;
  }
</style>
