<template>
  <div class="Homemaincontent-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">today</v-icon>
    <span class="title">搜索结果</span>
    <div class="searchrank" v-if="target=='活动'"><span class="rankinner" @click="chooserank(1)" :class="{'ischoosen':firstact}">综合排序</span><span class="mx-2">/</span><span class="rankinner" @click="chooserank(2)" :class="{'ischoosen':secondact}">时间排序</span><span class="mx-2">/</span><span class="rankinner" @click="chooserank(3)" :class="{'ischoosen':thirdact}">浏览最多</span></div>
    <div class="Homemaincontent-mainwrapper">
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)" v-if="target=='活动'">
        <div class="act-cardd-media">
          <a @click="openact(act.acturl)"><img v-lazy="act.head_img" class="anim" :class="{'v-imglarger':act.isover}"/></a>
        </div>
        <v-card-title primary-title class="pb-2">
          <a @click="openact(act.acturl)">
            <h3 class="title mb-2 actname">{{act.heading}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.date}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.location}}
            </div>
          </a>
          <img src="/src/assets/finished.png" class="finishedimg" v-if="act.is_ended"/>
          <a @click="openorg(act.org_id)">
          <v-avatar color="grey lighten-4 ml-3" size="60">
            <img v-lazy="act.orgavatar">
          </v-avatar>
          </a>
        </v-card-title>
      </v-card>
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)" v-if="target=='组织'">
        <div class="act-cardd-media">
          <a @click="openact(act.acturl)"><img v-lazy="act.head_img" class="anim" :class="{'v-imglarger':act.isover}"/></a>
        </div>
        <v-card-title primary-title class="pb-2">
          <a @click="openact(act.acturl)">
            <h3 class="title mb-2 actname">{{act.heading}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.date}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.location}}
            </div>
          </a>
          <img src="/src/assets/finished.png" class="finishedimg" v-if="act.is_ended"/>
          <a @click="openorg(act.org_id)">
          <v-avatar color="grey lighten-4 ml-3" size="60">
            <img v-lazy="act.orgavatar">
          </v-avatar>
          </a>
        </v-card-title>
      </v-card>
      <div style="clear:both;"></div>
    </div>
    <div class="text-md-center text-lg-center text-xl-center pt-1 pb-4">
      <a @click="getmoreacts">显示更多</a>
    </div>
  </div>
</template>

<script>
  export default {
    props:['target','acts'],
    data: () => ({
      firstact:true,
      secondact:false,
      thirdact:false,
      rank:'综合排序'
    }),
    methods: {
      largerimg: function (i) {
        this.acts[i].isover=true;
      },
      smallerimg: function (i) {
        this.acts[i].isover=false;
      },
      chooserank:function(n){
        switch(n){
          case 1:
            this.firstact=true;
            this.secondact=false;
            this.thirdact=false;
            this.rank='综合排序';
            break;
          case 2:
            this.firstact=false;
            this.secondact=true;
            this.thirdact=false;
            this.rank='时间排序';
            break;
          case 3:
            this.firstact=false;
            this.secondact=false;
            this.thirdact=true;
            this.rank='浏览最多';
            break;
        }
        this.$emit("sendrank",this.rank); 
      },
      openact:function(url){ 
        let routeData = this.$router.resolve({name:'appact',params:{opt:url}});
        window.open(routeData.href, '_blank');
      },
      getmoreacts:function(){
        this.$emit("sendmoreacts",true);
      },
      openorg:function(org_id){
        let routeData = this.$router.resolve({name:'orgdisplay',params:{opt:'inform',org_id:org_id}});
        window.open(routeData.href, '_blank');
      }
    }
  }

</script>

<style scoped>
  .rankinner{
    cursor: pointer;

  }

  .finishedimg{
    position: absolute;
    bottom: 0;
    right: 64px;
    z-index: 2;
    height: 80px;
    width: 80px;
    max-height: 100%;
    max-width:100%;
  }

  .rankinner:hover{
    color: #E03636;
  }
  .ischoosen{
    color: #E03636;
  }
  .searchrank{
    float: right;
    margin-top:25px;
    margin-right:25px;
    color: #666;
  }
  .act-cardd-media {
    height: 193px;
    width: 343.09px;
    overflow: hidden;
  }

  .act-cardd-media img {
    width: 343.09px;
    height: 193px;
    max-width: 100%;
    max-width: 100%;
    cursor: pointer;
  }

  .anim {
    -webkit-transition: all 1200ms ease-out;
    -moz-transition: all 1200ms ease-out;
    transition: all 1200ms ease-out;
  }

  .v-card>>>.v-imglarger {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }

  .today-icon {
    margin-left: 25px;
    margin-top: 25px;
  }

  .Homemaincontent-wrapper {
    margin-top: 25px;
    width: 761.19px;
    background: white;
    float: left;
  }

  .Homemaincontent-mainwrapper {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    min-height: 500px;
  }

  .v-card {
    float: left;
    position: relative;
    width: 343.1px;
    margin-left: 25px;
    margin-bottom: 25px;
  }

  .actname {
    color: #323232;
    font-family: Arial, Helvetica, sans-serif !important;
  }

  .v-avatar {
    position: absolute;
    right: 0;
    bottom: 5px;
    cursor: pointer;
  }

  .headline-leftcontent {
    color: #333;
    opacity: 0.9;
    margin-top: 12px;
  }

</style>
