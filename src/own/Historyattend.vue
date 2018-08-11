<template>
  <div class="signup-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">face</v-icon>
    <span class="title">历史参加</span>
    <span class="clear" @click.stop="dialog = true" v-if="mine">清空</span>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text>你确定要清空吗？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false">点错了</v-btn> 
          <v-btn color="green darken-1" flat="flat" @click="dialog = false,clearall()">清空</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p v-if="acts.length==0" style="color:#FE9246;margin:200px 0 0 290px;font-size:30px;">这里空空哒！</p>
    <div class="Homemaincontent-mainwrapper">
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
        <div class="act-cardd-media">
          <router-link to="/Appact"><img :src="act.head_img" class="anim" :class="{'v-imglarger':act.isover}"/></router-link>
        </div>
        <v-card-title primary-title class="pb-2">
          <router-link to="/Appact">
            <h3 class="title mb-2 actname">{{act.heading}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.date}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.location}}
            </div>
          </router-link>
          <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}" :key="index">
          <v-avatar color="grey lighten-4 ml-3" size="60">
            <img :src="act.orgavatar">
          </v-avatar>
          </router-link>
        </v-card-title>
      </v-card>
      <div style="clear:both;"></div>
    </div>
    <div class="text-md-center text-lg-center text-xl-center pt-1 pb-4">
      <a @click="getmoreattendacts">显示更多</a>
    </div>
  </div>
</template>

<script>
  export default {
    props:["mine","acts"],
    data: () => ({
      dialog:false  
    }),
    methods: {
      largerimg: function (i) {
        this.acts[i].isover=true;
      },
      smallerimg: function (i) {
        this.acts[i].isover=false;
      },
      clearall:function(){
        this.acts.splice(0,this.acts.length);
      },
      getmoreattendacts:function(){
        this.$emit("getmoreattendacts",true);
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
  .signup-wrapper {
    float: left;
    width: 771.5px;
    margin-left: 25px;
    background: white;
    margin-top: 25px;
  }
  .clear{
    color: #2196f3;
    cursor: pointer;
    float: right;
    margin-top: 25px;
    margin-right: 34px;
  }
  .v-dialog__content>>>.v-dialog .v-card{
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>
