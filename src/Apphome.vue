<template>
    <v-content style="background: #f3f4f5;">
      <div class="elevation-1 white home-toolbar-wrapper">
        <!-- <Toolbar v-if="user.type=='none'"></Toolbar> -->
        <!-- <Stutoolbar v-if="user.type=='stu'"></Stutoolbar> -->
        <Stutoolbar></Stutoolbar>
        <!-- <Orgtoolbar v-if="user.type=='org'"></Orgtoolbar> -->
        <!-- <Admintoolbar v-if="user.type=='admin'"></Admintoolbar> -->
      </div>
      <div class="home-topshow-wrapper">
        <Carousel></Carousel>
        <Orgcommend></Orgcommend>
      </div>
      <div class="home-choose-wrapper">
        <Choose></Choose>
      </div>
      <div class="home-maincontent-wrapper">
        <Maincontent></Maincontent>
        <Rank></Rank>
         <Actrank></Actrank>
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
    data:()=>({
      user:{
        type:'none',
        username:'',
        img:''
      }
    })
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .home-topshow-wrapper {
    width: 1063px;
    height: 370.578px;
    margin: 64px auto 0 auto;
  }

  .home-choose-wrapper {
    width: 1063px;
    background: white;
    margin: 25px auto 0 auto;
  }

  .home-maincontent-wrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

</style>
