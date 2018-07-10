<template>
    <v-content style="background: #f3f4f5;" v-scroll="onScroll">
      <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity}">
        <Stutoolbar></Stutoolbar>
      </div>
      <v-parallax :src="parallaxpath" height="600"></v-parallax>
      <div class="elevation-1 white" :class="{'isfixed':fixed}">
        <div class="middle-wrapper">
          <Stuowntoolbar :itembottom="item"></Stuowntoolbar>
          <v-avatar size="100"><img :src="img" :alt="name"></v-avatar>
        </div>
      </div>
      <div class="stuown-mainwrapper">
        <Stuinform :class="{'informfixed':fixed}"></Stuinform>
        <div class="asinform" v-if="fixed"></div>
        <div v-if="fixed" style="height:64px;"></div>
        <Signup v-if="item=='signup'"></Signup>
        <Trends v-if="item=='trends'"></Trends>
        <Collect v-if="item=='collect'"></Collect>
        <Historyview v-if="item=='historyview'"></Historyview>
        <Historyattend v-if="item=='historyattend'"></Historyattend>
        <Stumsg v-if="item=='stumsg'"></Stumsg>
        <div style="clear:both;"></div>
      </div>
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0, easing)">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <Footer></Footer>
    </v-content>
</template>

<script>
  export default {
    props:['opt'],
    data:()=>({
      parallaxpath:'/src/assets/stuownbg.jpg',
      img:'/src/assets/xnick.jpg',
      name:'Xnick',
      item:'signup',
      offsetTop: 0,
    }),
    created:function(){
      switch(this.opt){
        case 'signup':
          this.item='signup';
          break;
        case 'trends':
          this.item='trends';
          break;
        case 'collect':
          this.item='collect';
          break;
        case 'historyview':
          this.item='historyview';
          break;
        case 'stumsg':
          this.item='stumsg';
          break;
      }
    },
    watch:{
      '$route' (to, from) {
        this.item=to.params.opt;
      }
    },
    computed:{
      toolbaropacity:function(){
        var k=this.offsetTop;
        if(k<350){
          return 1;
        }
        else{
          k=2.4-k/250;
          return k;
        }
      },
      fixed:function(){
        var k=this.offsetTop;
        if(k>=664){
          return true;
        }
      }
    },
    methods:{
      chooseitem:function(e){
        switch(e){
          case 'signup':
            this.item='signup';
            break;
          case 'trends':
            this.item='trends';
            break;
          case 'collect':
            this.item='collect';
            break;
          case 'historyview':
            this.item='historyview';
            break;
          case 'historyattend':
            this.item='historyattend';
            break;
          case 'stumsg':
            this.item='stumsg';
            break;
        }
      },
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
  .informfixed{
    position: fixed;
    z-index: 6;
    top: 64px;
    width: 100%;
  }
  .asinform{
    width: 266.41px;
    height: 560px;
    background: white;
    float:left;
    margin-top: 1px;
  }
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  .v-parallax{
    margin-top: 64px;
  }
  .middle-wrapper{
    width:1063px;
    margin: 0 auto;
    position: relative;
  }
  .v-avatar{
    position: absolute;
    top:10px;
    left: 85px;
    z-index: 100;
  }
  .stuown-mainwrapper{
    width:1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }
</style>
