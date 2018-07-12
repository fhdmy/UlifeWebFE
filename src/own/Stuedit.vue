<template>
  <v-content style="background:white;">
    <div class="elevation-1 white home-toolbar-wrapper">
      <Stutoolbar></Stutoolbar>
    </div>
    <div class="edit-wrapper">
      <Editmenu :opt="opt"></Editmenu>
      <Stueditinform v-if="opt=='myinform'"></Stueditinform>
      <Stueditimg v-if="opt=='myimg'"></Stueditimg>
      <Stueditbg v-if="opt=='mybg'"></Stueditbg>
      <Stueditacc v-if="opt=='accountsecurity'"></Stueditacc>
      <Stueditsecret v-if="opt=='settings'"></Stueditsecret>
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
    props:['opt'],
    data: () => ({
      img: '/src/assets/xnick.jpg',
      name: 'Xnick',
    }),
    computed: {
      
    },
    methods: {
      
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  .edit-wrapper{
    width: 1063px;
    height:auto;
    margin: 64px auto 0 auto;
    background: white;
    padding-top: 25px;
  }
</style>
