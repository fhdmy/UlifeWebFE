<template>
    <v-content style="background: #f3f4f5;" v-scroll="onScroll">
      <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
        <Orgtoolbar :avatar="opt.avatar" :name="opt.name"></Orgtoolbar>
      </div>
      <img :src="opt.parallaxpath" class="large-img"/>
      <div class="elevation-1 white" :class="{'isfixed':fixed,'owntoolbar-wrapper':true}">
        <div class="middle-wrapper">
          <v-avatar size="120" v-if="!fixed"><img :src="opt.avatar"></v-avatar>
          <p class="act-title display-1" v-if="!fixed">{{opt.title}}</p>
          <Actviewtoolbar :org="opt.name" :launchdate="opt.launchdate" :isfinished="opt.isfinished" :stars="opt.stars" :fixed="fixed" :title="opt.title"></Actviewtoolbar>
        </div>
      </div>
      <div v-if="fixed" style="height:70px;"></div>
      <div class="main-wrapper">
         <Show :introduction="opt.introduction" :date="opt.date" :time="opt.time" :place="opt.place" :type="opt.type" :interest="opt.interest" :lists="opt.lists" :customlists="customlists"></Show>
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
    props:['opt'],
    data:()=>({
      customlists:[],
      offsetTop:0
    }),
    computed:{
      toolbaropacity:function(){
        var k=this.offsetTop;
        if(k<320){
          return 1;
        }
        else{
          k=2.4-k/220;
          return k;
        }
      },
      fixed:function(){
        var k=this.offsetTop;
        if(k>=664){
          return true;
        }
      },
      display:function(){
        var k = this.offsetTop;
        if(k<584){
          return 'block';
        }
        else
          return 'none';
      }
    },
    methods:{
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

</script>

<style scoped>
  .isfixed{
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
  .middle-wrapper{
    width:1063px;
    margin: 0 auto;
    position: relative;
  }
  .v-avatar{
    position: absolute;
    top:0;
    left:0;
    margin-top: -80px;
    z-index: 4;
  }
  .act-title{
    position: absolute;
    top:0;
    left:170px;
    margin-top: -70px;
    color: white;
    font-weight: bold;
    z-index: 4;
  }
  .main-wrapper{
    width: 1063px;
    margin: 0 auto;
    height: auto;
    position: relative;
  }
  .large-img{
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height:100%;
    max-width:100%;
  }

  .owntoolbar-wrapper{
    margin-top: -6px;
    width:100%;
  }
</style>
