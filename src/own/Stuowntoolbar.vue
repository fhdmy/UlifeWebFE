<template>
  <v-toolbar color="white elevation-0">
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link :to="{ name: 'stuown', params: {opt:'signup'}}"><v-btn flat class="subheading">报名</v-btn></router-link>
      <router-link :to="{ name: 'stuown', params: {opt:'trends'}}"><v-btn flat class="subheading">动态</v-btn></router-link>
      <router-link :to="{ name: 'stuown', params: {opt:'collect'}}"><v-btn flat class="subheading">收藏</v-btn></router-link>
      <router-link :to="{ name: 'stuown', params: {opt:'historyview'}}"><v-btn flat class="subheading">历史浏览</v-btn></router-link>
      <router-link :to="{ name: 'stuown', params: {opt:'historyattend'}}"><v-btn flat class="subheading">历史参加</v-btn></router-link>
      <router-link :to="{ name: 'stuown', params: {opt:'stumsg'}}"><v-btn flat class="subheading">消息</v-btn></router-link>
      <div class="bottom-icon" :style="{'transform':'translate('+calmove+'px,0)'}"></div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script> 
  export default {
    props:['itembottom'],
    data:()=>({

    }),
    computed:{
      calmove:function(){
        var m=this.itembottom;
        switch(m){
          case 'signup':
            return 16;
          case 'trends':
            return 104;
          case 'collect':
            return 192;
          case 'historyview':
            return 286;
          case 'historyattend':
            return 379;
          case 'stumsg':
            return 472;
        }
      }
    },
    methods:{
     
    }
  }

</script>

<style scoped>
  a{
    color: black;
    height: 100%;
  }
  .v-toolbar {
    width: 480px;
    margin: 0 auto;
  }

  .v-toolbar>>>.v-toolbar__content {
    padding: 0;
  }
  .bottom-icon{
    position:absolute;
    height: 4px;
    width: 56px;
    background: #E03636;
    top: 60px;
    left: 0;
    -webkit-transition: all 100ms ease-out;
    -moz-transition: all 100ms ease-out;
    transition: all 100ms ease-out;
  }
</style>
