<template>
    <v-content style="background: #f3f4f5;">
      <div class="elevation-1 white home-toolbar-wrapper">
        <Toolbar></Toolbar>
      </div>
      <div style="margin:80px auto 16px auto;width:1063px;color:#666;">首页 > 搜索</div>
      <div class="search-choose-wrapper">
        <Searchchoose :target="target" :time="time" :type="type" :interest="interest"></Searchchoose>
      </div>
      <div class="home-maincontent-wrapper">
        <Searchkey></Searchkey>
        <Rank></Rank>
         <Actrank></Actrank>
        <div style="clear:both;"></div>
      </div>
      <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0, easing)">
        <i class="iconfont icon-jiantou-copy-copy-copy"></i>
      </v-btn>
      <Footer></Footer>
    </v-content>
</template>

<script>
  export default {
    props:['target','time','type','interest']
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .search-choose-wrapper {
    width: 1063px;
    background: white;
    margin: 15px auto 0 auto;
  }

  .home-maincontent-wrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

</style>
