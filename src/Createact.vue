<template>
    <v-content style="background: #f3f4f5;" v-scroll="onScroll">
      <div class="elevation-1 white home-toolbar-wrapper">
        <Toolbar></Toolbar>
      </div>
      <img :src="parallaxpath" class="large-img"/>
      <div class="add-topimg-wrapper">
        <div class="add-topimg-inner">
          <router-link to="/"><v-icon size="64" color="secondary">photo</v-icon></router-link>
          <div class="add-topimgtext">
            <span>设置活动头图</span>
            <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
      <div class="main-wrapper">
         
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
      parallaxpath:'/src/assets/createdefault.jpg',
      img:'/src/assets/suselogo.jpg',
      title:'ISHARE',
      org:'经济学院学生会',
      offsetTop:0
    }),
    computed:{
      
    },
    methods:{
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  .main-wrapper{
    width: 1063px;
    margin: 0 auto;
    height: auto;
    position: relative;
  }
  .large-img{
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height:100%;
    max-width:100%;
  }
  .add-topimg-wrapper{
    width: 100%;
    position: absolute;
    top: 260px;
    height: 200px;
  }
  .add-topimg-inner{
    margin: 0 auto;
    width: 580px;
  }
  .add-topimg-inner i{
    float: left;
    margin-left: 100px;
  }
  .add-topimgtext{
    float: left;
    margin-left: 15px;
  }
  .add-topimgtext span{
    font-size: 20px;
    color: #333;
  }
  .add-topimgtext p{
    margin-top: 8px;
    font-size: 16px;
    color: #666;
  }
</style>
