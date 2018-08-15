<template>
  <v-toolbar color="white elevation-0">
    <v-toolbar-title>
      <router-link to="/" class="display-1 primary--text">Ulife</router-link>
    </v-toolbar-title>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link to="/">
        <v-btn flat class="subheading">首页</v-btn>
      </router-link>
      <v-btn flat class="subheading">下载APP</v-btn>
      <div class="search-wrapper">
        <v-text-field label="搜索" single-line class="my-3 ml-5" @click="changecolor" @blur="backcolor" ref="searchinput" v-model="value"
          @keyup.13="keyuptoAppsearch()"></v-text-field>
        <v-icon class="icon-search" ref="iconsearch" :class="{'colorprimary':isprimary}" @click="toAppsearch">search</v-icon>
      </div>
    </v-toolbar-items>
    <v-toolbar-items class="hidden-sm-and-down toolbar-right">
      <router-link :to="{ name: 'orgown', params: {opt:'inform'}}">
      <v-menu open-on-hover offset-y top transition="slide-y-transition">
        <v-btn slot="activator" flat>
          <v-avatar size="36"><img :src="avatar"></v-avatar>
          <v-icon class="ml-1">keyboard_arrow_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index">
            <router-link :to="{ name: 'orgown', params: {opt:item.opt}}"><v-list-tile-title class="ml-1">{{ item.title }}</v-list-tile-title></router-link> 
          </v-list-tile>
        </v-list>
      </v-menu>
      </router-link>
      <router-link :to="{ name: 'orgown', params: {opt:'orgmsg'}}">
        <v-tooltip bottom><v-btn flat class="rightbtn" slot="activator"><v-icon>mail_outline</v-icon></v-btn><span>消息</span></v-tooltip>
      </router-link>
      <router-link to="/Changeaccount">
        <v-tooltip bottom><v-btn flat class="rightbtn" slot="activator"><v-icon>swap_horiz</v-icon></v-btn><span>切换账号/注销</span></v-tooltip>
      </router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    props:['avatar'],
    data: () => ({
      isprimary: false,
      value: '',
      topdistance:100,
      items: [
        {
          title: '创建活动',
          opt:'create'
        },
        {
          title: '草稿箱',
          opt:'draft'
        },
        {
          title: '我的活动',
          opt:'myact'
        },
        {
          title: '报名',
          opt:'mysignup'
        }
      ]
    }),
    methods: {
      changecolor: function () {
        this.isprimary = true;
      },
      backcolor: function () {
        this.isprimary = false;
      },
      toAppsearch: function () {
        this.$refs.searchinput.focus();
        this.changecolor();
        this.$router.push({ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'全部',opt:'综合排序',content:(this.value=='')?'无':this.value}});
      },
      keyuptoAppsearch: function () {
        this.$router.push({ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'全部',opt:'综合排序',content:(this.value=='')?'无':this.value}});
      }
    }
  }

</script>

<style scoped>
  .v-menu__content>>>.v-list{
    padding: 0;
  }
  .v-menu__content >>> .v-list__tile{
    padding-top: 12px;
  }
  .v-menu__content >>> .v-list__tile:hover{
    background:#dddddd;
  }
  .rightbtn{
    width: 56px;
    min-width: 56px;
    padding: 0;
  }
  .rightbtn>>>i{
    color: #666!important;
  } 
  .v-menu__content{
    margin-top: 50px;
  }
  a {
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

  .v-input>>>.v-input__append-inner {
    cursor: pointer;
  }

  .search-wrapper {
    position: relative;
  }

  .v-input>>>input {
    margin-right: 26px;
    width: 140px;
  }

  .icon-search {
    position: absolute;
    right: 0;
    top: 22px;
    cursor: pointer;
  }

  .colorprimary {
    color: #E03636;
  }

</style>
