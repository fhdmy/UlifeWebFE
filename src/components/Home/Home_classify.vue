<template>
  <v-container class="pt-3 pb-3 px-0">
    <v-layout row wrap>
      <v-flex xl3 lg3 md3>
        <!-- <v-icon color="blue darken-1" small class="mr-1 ml-3">schedule</v-icon> -->
        <v-icon color="blue darken-1" small class="mr-1 ml-3 iconfont icon-time"></v-icon>
        <span class="title">时间</span>
        <div class="choose-content-wrapper ml-3">
        <div class="choose-content-inner mt-3 ml-4">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'一天内',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">一天内</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'一周内',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">一周内</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'一个月内',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">一个月内</router-link>
          </div>
        </div>
        <div class="choose-content-inner mt-3 ml-4">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'weekday',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">休息日</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'workday',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">工作日</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'holiday',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}">寒暑假</router-link>
          </div>
        </div>
        <v-divider vertical class="v-divider-time"></v-divider>
        </div>
      </v-flex>
      <v-flex xl2 lg2 md2>
        <!-- <v-icon color="deep-purple lighten-3" small class="mr-1">whatshot</v-icon> -->
        <v-icon color="deep-purple lighten-3" small class="mr-1 iconfont icon-whatshot"></v-icon>
        <span class="title">形式</span>
        <div class="choose-content-wrapper">
        <div class="choose-content-inner mt-3 ml-4">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'比赛',interest:'全部',opt:'综合排序',content:'无'}}">比赛</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'分享',interest:'全部',opt:'综合排序',content:'无'}}">分享</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'互动',interest:'全部',opt:'综合排序',content:'无'}}">互动</router-link>
          </div>
        </div>
        <v-divider vertical class="v-divider-method"></v-divider>
        </div>
      </v-flex>
      <v-flex xl4 lg4 md4>
        <!-- <v-icon color="light-green accent-3" small class="mr-1">accessibility_new</v-icon> -->
        <v-icon color="light-green accent-3" small class="mr-1 iconfont icon-ganxingqu"></v-icon>
        <span class="title">兴趣</span>
        <div class="choose-content-bigwrapper">
        <div class="choose-content-inner mt-3 ml-4">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'游戏',opt:'综合排序',content:'无'}}">游戏</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'影视',opt:'综合排序',content:'无'}}">影视</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'棋牌',opt:'综合排序',content:'无'}}">棋牌</router-link>
          </div>
        </div>
        <div class="choose-content-inner mt-3 ml-4">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'文化艺术',opt:'综合排序',content:'无'}}">文化艺术</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'运动/户外',opt:'综合排序',content:'无'}}">运动/户外</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'学术科技',opt:'综合排序',content:'无'}}">学术科技</router-link>
          </div>
        </div>
        <div class="choose-content-inner mt-3 ml-5">
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'社会科学',opt:'综合排序',content:'无'}}">社会科学</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'公益',opt:'综合排序',content:'无'}}">公益</router-link>
          </div>
          <div class="mb-2">
            <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'实践',opt:'综合排序',content:'无'}}">实践</router-link>
          </div>
        </div>
        <v-divider vertical></v-divider>
        </div>
      </v-flex>
      <v-flex xl3 lg3 md3>
        <div class="p-for-search text-md-center text-lg-center text-xl-center title font-weight-bold">详 细 搜 索</div>
        <div class="text-md-center text-lg-center text-xl-center mt-2"><v-icon x-large class="iconfont icon-jiantou"></v-icon></div>
        <router-link :to="{ name: 'search', params: {target:'活动',time:'全部',type:'全部',interest:'全部',opt:'综合排序',content:'无'}}"><div class="text-md-center text-lg-center text-xl-center"><v-btn depressed class="bt-2" color="primary" large>点我</v-btn></div></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data: () => ({

    })
  }

</script>
<style scoped>
  a {
    color: black;
  }
  a:hover{
    color:#E03636;
  }
  .container{
    margin: 0!important;
    width: 1063px;
    max-width: 1063px;
  }
  .choose-content-wrapper{
    width:190px;
    height: 100px;
  }
  .choose-content-bigwrapper{
    width:340px;
    height: 100px;
  }
  .choose-content-inner {
    float: left;
    width: 70px;
    height: 80px;
  }
  .v-divider{
    float:right;
  }
  .v-divider-time{
    margin-right: -25px;
  }
  .v-divider-method{
    margin-right: 70px;
  }
  .p-for-search{
    color: #333;
    opacity: 0.7;
  }
</style>
