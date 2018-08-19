<template>
  <v-toolbar color="white elevation-0">
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link :to="{ name: 'org_own', params: {opt:'abstract'}}"><v-btn flat class="subheading">简介</v-btn></router-link>
      <router-link :to="{ name: 'org_own', params: {opt:'create_activities'}}"><v-btn flat class="subheading">创建活动</v-btn></router-link>
      <router-link :to="{ name: 'org_own', params: {opt:'draft'}}"><v-btn flat class="subheading">草稿箱</v-btn></router-link>
      <router-link :to="{ name: 'org_own', params: {opt:'my_activities'}}"><v-btn flat class="subheading">我的活动</v-btn></router-link>
      <router-link :to="{ name: 'org_own', params: {opt:'org_signup'}}"><v-btn flat class="subheading">报名</v-btn></router-link>
      <router-link :to="{ name: 'org_own', params: {opt:'org_msg'}}"><v-btn flat class="subheading">消息</v-btn></router-link>
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
          case 'abstract':
            return 16;
          case 'create_activities':
            return 108;
          case 'draft':
            return 200;
          case 'my_activities':
            return 292;
          case 'org_signup':
            return 385;
          case 'org_msg':
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
