<template>
  <div class="Homemaincontent-wrapper">
    <v-icon color="primary" class="mr-2 today-icon iconfont icon-icon"></v-icon>
    <span class="title">近期活动</span>
    <div class="Homemaincontent-mainwrapper">
      <v-card class="elevation-1" v-for="(act,index) in actcontainer" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
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
    props:['actcontainer'],
    data: () => ({

    }),
    methods: {
      largerimg: function (i) {
        this.actcontainer[i].isover=true;
        // this.$emit("update:actcontainer[i].isover",true);
      },
      smallerimg: function (i) {
        this.actcontainer[i].isover=false;
        // this.$emit("update:actcontainer[i].isover",false);
      },
      openact:function(url){ 
        let routeData = this.$router.resolve({name:'activity',params:{opt:url}});
        window.open(routeData.href, '_blank');
      },
      getmoreacts:function(){
        this.$emit("sendmoreacts",true);
      },
      openorg:function(org_id){
        let routeData = this.$router.resolve({name:'org_display',params:{opt:'abstract',org_id:org_id}});
        window.open(routeData.href, '_blank');
      }
    }
  }

</script>

<style scoped>
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
    height: 20px;
    width: 270px;
    display:block;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
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
