<template>
  <v-toolbar color="white elevation-0">
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link :to="{ name: 'studisplay', params: {opt:'collect'}}"><v-btn flat class="subheading">收藏</v-btn></router-link>
      <router-link :to="{ name: 'studisplay', params: {opt:'historyattend'}}"><v-btn flat class="subheading">历史参加</v-btn></router-link>
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
          case 'collect':
            return 16;
          case 'historyattend':
            return 109;
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
