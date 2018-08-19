<template>
  <v-toolbar color="white elevation-0">
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link :to="{ name: 'org_display', params: {opt:'abstract'}}"><v-btn flat class="subheading">简介</v-btn></router-link>
      <router-link :to="{ name: 'org_display', params: {opt:'dynamatic'}}"><v-btn flat class="subheading">动态</v-btn></router-link>
      <div class="bottom-icon" :style="{'transform':'translate('+calmove+'px,0)'}"></div>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down right-items">
      <v-btn flat class="subheading toolbar-btn"><v-icon class="toolbar-icon" color="primary">error_outline</v-icon><span>举报</span></v-btn>
      <v-btn flat class="subheading toolbar-btn"><v-icon class="toolbar-icon" color="light-green lighten-1">share</v-icon><span>分享</span></v-btn>
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
          case 'dynamatic':
            return 104;
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
  .right-items{
    position: absolute;
    right: -290px;
  }
  .toolbar-btn>>>.v-btn__content{
    display: block;
  }
  .toolbar-icon{
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
  }
</style>
