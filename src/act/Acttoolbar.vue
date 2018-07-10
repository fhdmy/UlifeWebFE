<template>
  <v-toolbar color="white elevation-0" height="70">
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
      <v-btn flat class="subheading toolbar-signinbtn">报名</v-btn>
      <v-btn flat class="subheading toolbar-btn"><v-icon class="toolbar-icon" color="primary">star_border</v-icon><span>收藏</span></v-btn>
      <v-btn flat class="subheading toolbar-btn"><v-icon class="toolbar-icon" color="light-green lighten-1">share</v-icon><span>分享</span></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script> 
  export default {
    props:['org','launchdate','isfinished','stars','fixed','title'],
    data:()=>({

    }),
    computed:{
      wholestar:function(){
        return parseInt(this.stars)*10/10;
      },
      halfstar:function(){
        return this.stars-parseInt(this.stars)*10/10;
      },
      nostar:function(){
        return 5-this.wholestar-2*this.halfstar;
      }
    }
  }

</script>

<style scoped>
.v-toolbar__items{
  position: absolute;
  right: 0;
}
.toolbar-btn{
  border-right: 1px solid rgb(232, 232, 230);
}
.toolbar-btn>>>.v-btn__content{
  display: block;
}
.toolbar-icon{
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
}
.toolbar-signinbtn{
  background:#2196f3!important;
  color: white;
  width: 120px;
  font-size: 20px!important;
}
.toolbar-content{
  margin-left: 120px;
  height: 70px;
}
.launchdate{
  color: #666;
}
.fixed-title{
  margin-right: -70px;
  color: #E03636;
}
</style>
