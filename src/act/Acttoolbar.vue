<template>
  <v-toolbar color="white elevation-0" height="70">
    <v-dialog v-model="dialog" max-width="290" v-if="!is_ended">
      <v-card>
        <v-card-text>你确定要取消报名？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">点错了</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false,cancelsignup()">取消报名</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="fixed" class="display-1 fixed-title">{{title}}</div>
    <div class="toolbar-content">
      <div class="my-2">
        <span class="mr-5 subheading">{{org}}</span>
        <span class="launchdate">发表于：{{launchdate}}</span>
      </div>
      <span v-if="!isfinished" class="subheading">未结束</span>
      <span v-if="isfinished" class="subheading mr-3">已结束</span>
      <v-icon v-for="i in wholestar" :key="i" color="primary">star</v-icon>
      <v-icon v-for="k in 2*halfstar" :key="k+10" color="primary">star_half</v-icon>
      <v-icon v-for="j in nostar" :key="j+20" color="primary">star_border</v-icon>
    </div>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-dialog v-model="signin" persistent max-width="500px" v-if="!participation && !is_ended">
        <v-btn flat class="subheading toolbar-signinbtn" slot="activator">报名</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">活动报名</span>
          </v-card-title>
          <v-card-text class="px-4 pt-0">
            <v-text-field :label="require" required v-model="answers[i]" v-for="(require,i) in requires" :key="i"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="signin = false,answers=[]">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click.native="signin = false" @click="signup">报名</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn flat class="subheading toolbar-signinbtn" v-if="!participation && is_ended">报名</v-btn>
      <v-btn flat class="subheading toolbar-signinbtn participation" v-if="participation" @click.stop="dialog = true">已报名</v-btn>
      <v-btn flat class="subheading toolbar-btn" @click="collect">
        <v-icon :class="{'toolbar-icon':true,'iconfont':true,'icon-wujiaoxing':!collected,'icon-star_full':collected}" color="primary"></v-icon>
        <span>收藏</span>
      </v-btn>
      <v-menu open-on-hover bottom offset-y nudge-left="30">
        <v-btn slot="activator" flat class="subheading toolbar-btn">
          <v-icon class="toolbar-icon" color="light-green lighten-1">share</v-icon>
          <span>分享</span>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="chooseshare(index)">
            <v-icon class="iconfont shareicon" :class="item.name" :style="{'color':item.color}"></v-icon>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    props: ['org', 'launchdate', 'isfinished', 'stars', 'fixed', 'title', 'participation', 'collected', 'routerid',
      'acturl', 'collecturl','requires','participationurl','is_ended'
    ],
    data: () => ({
      dialog: false,
      signin: false,
      answers: [],
      items: [{
          name: 'icon-weibo',
          color: 'rgb(249, 110, 118)'
        },
        {
          name: 'icon-qunfengqqkongjian',
          color: '#ffce00'
        },
        {
          name: 'icon-weixin-copy',
          color: 'rgb(125, 210, 57)'
        }
      ]
    }),
    computed: {
      wholestar: function () {
        return parseInt(this.stars) * 10 / 10;
      },
      halfstar: function () {
        return this.stars - parseInt(this.stars) * 10 / 10;
      },
      nostar: function () {
        return 5 - this.wholestar - 2 * this.halfstar;
      }
    },
    methods: {
      collect: function () {
        if(localStorage.getItem("token")==null){
          alert("请先登录账号！");
          return;
        }
        if (!this.collected) {
          this.$http({
            method: 'post',
            url: '/activity/bookmarkings/',
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              watcher: parseInt(this.routerid),
              target: parseInt(this.acturl)
            }
          }).then((res) => {
            this.collecturl=res.data.url;
            this.collected = true;
            alert("收藏成功！");
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        } else {
          this.$http({
            method: 'delete',
            url: this.collecturl,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              watcher: parseInt(this.routerid),
              target: parseInt(this.acturl)
            }
          }).then((res) => {
            this.collected = false;
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
      },
      signup: function () {
        if(localStorage.getItem("token")==null){
          alert("请先登录账号！");
          return;
        }
        if(this.answers.length!=this.requires.length){
          alert("报名信息不完整！");
          return;
        }
        for(let k=0;k<this.requires.length;k++){
          if(this.answers[k]==""){
            alert("报名信息不完整！");
            return;
          }
        }
        this.$http({
            method: 'post',
            url: '/activity/participations/',
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              activity:parseInt(this.acturl),
              student:parseInt(this.routerid),
              forms:JSON.stringify(this.answers) 
            }
          }).then((res) => {
            this.participationurl=res.data.url;
            this.participation=true;
            alert("报名成功！");
          }).catch(function (error) {
            alert("网络传输故障！");
          });
      },
      cancelsignup: function () {
        this.$http({
            method: 'delete',
            url: this.participationurl,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              activity:parseInt(this.acturl),
              student:parseInt(this.routerid)
            }
          }).then((res) => {
            this.participation=false;
          }).catch(function (error) {
            alert("网络传输故障！");
          });
      },
      chooseshare: function (i) {
        // 微博
        if (i == 0) {

        }
        // qq空间
        else if (i == 1) {
          this.$http.post('https://graph.qq.com/share/add_share', {
            title: 'QQ空间',
            url: 'http://www.qzone.com/ ',
            site: 'Ulife',
            fromurl: 'http://baidu.com'
          }).then((res) => {
            console.log(res);
          }).catch(function (error) {
            alert("网络传输故障!");
          });
        }
        // 微信朋友圈
        else {

        }
      }
    }
  }

</script>

<style scoped>
  .v-toolbar__items {
    position: absolute;
    right: 0;
  }

  .toolbar-btn {
    border-right: 1px solid rgb(232, 232, 230);
  }

  .toolbar-btn>>>.v-btn__content {
    display: block;
  }

  .toolbar-icon {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .toolbar-signinbtn {
    background: #2196f3 !important;
    color: white;
    width: 120px;
    height: 70px;
    font-size: 20px !important;
  }

  .toolbar-content {
    margin-left: 120px;
    height: 70px;
  }

  .launchdate {
    color: #666;
  }

  .fixed-title {
    margin-right: -70px;
    color: #E03636;
  }

  .v-menu__content {
    width: 144px;
  }

  .v-menu__content>>>.v-list {
    padding: 0;
    height: 48px;
  }

  .v-menu__content>>>.v-list div {
    width: 48px;
    float: left;
  }

  .v-menu__content>>>.v-list__tile {
    padding: 0;
    width: 48px;
  }

  .shareicon {
    width: 48px;
    height: 48px;
  }

  .participation {
    background: #999 !important;
    color: white;
  }

  .v-toolbar__items>>>.v-dialog__container {
    width: 120px;
  }

</style>
