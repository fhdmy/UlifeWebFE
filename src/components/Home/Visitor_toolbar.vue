<template>
  <v-toolbar color="white elevation-0">
    <v-snackbar v-model="download_app" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      敬请期待！
      <v-btn color="pink" flat @click="download_app = false">关闭</v-btn>
    </v-snackbar>
    <v-toolbar-title><router-link to="/" class="display-1 primary--text">Ulife</router-link></v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link to="/"><v-btn flat class="subheading">首页</v-btn></router-link>
      <v-btn flat class="subheading">下载APP</v-btn>
      <div class="search-wrapper">
        <v-text-field label="搜索" single-line class="my-3 ml-5" @click="changecolor" @blur="backcolor" ref="searchinput" v-model="value" @keyup.13="keyuptoAppsearch()"></v-text-field>
        <v-icon class="icon-search" ref="iconsearch" :class="{'colorprimary':isprimary}" @click="toAppsearch">search</v-icon>
      </div>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down toolbar-right">
      <router-link to="/login"><v-btn flat class="subheading">登录</v-btn></router-link>
      <router-link to="/register_firststep"><v-btn flat class="subheading">注册</v-btn></router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script> 
  export default {
    props:['content'],
    data:()=>({
      isprimary:false,
      value: '',
      download_app:false,
      y: 'top',
      color: '#E03636',
      mode: '',
      timeout: 3000
    }),
    created:function(){
      if(this.content=='无' || this.content==undefined){
        this.value=='';
      }
      else
        this.value = this.content;
    },
    methods:{
      changecolor:function(){
        this.isprimary=true;
      },
      backcolor:function(){
        this.isprimary=false;
      },
      toAppsearch:function(){
        this.$refs.searchinput.focus();
        this.changecolor();
        this.$router.push({ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'全部',opt:'综合排序',content:(this.value=='')?'无':this.value}});
      },
      keyuptoAppsearch:function(){
        this.$router.push({ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'全部',opt:'综合排序',content:(this.value=='')?'无':this.value}});
      }
    }
  }

</script>

<style scoped>
  a{
    color: black;
    height: 100%;
  }
  .v-toolbar {
    width: 1063px;
    margin: 0 auto;
  }

  .v-toolbar>>>.v-toolbar__content {
    padding: 0;
  }

  .v-toolbar .v-toolbar__content .v-toolbar__title {
    margin-left: 0;
    margin-right: 2%;
  }

  .toolbar-right {
    position: absolute;
    right: 0;
  }
  .v-input>>>.v-input__append-inner{
    cursor: pointer;
  }
  .search-wrapper{
    position: relative;
  }
  .v-input>>>input{
    margin-right: 26px;
    width:140px;
  }
  .icon-search{
    position: absolute;
    right: 0;
    top:22px;
    cursor: pointer;
  }
  .colorprimary{
    color:#E03636;
  }
</style>
