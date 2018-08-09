<template>
  <div class="carousel-wrapper">
    <div class="carousel-left-btn" @click="carouselleftchange"></div>
    <div class="carousel-right-btn" @click="carouselrightchange"></div>
    <ul class="carousel-list">
      <li v-for="(imgsrc,i) in carouselcontainer" :key="i" class="carousel-item is-anim" :class="calclass(i)">
        <a @click="openact(imgsrc.acturl)">
          <img :src="imgsrc.head_img" class="carousel-img" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  var timer;
  export default {
    props:['carouselcontainer'],
    data: () => ({
      // imgsrcs: [{
      //     path: '/src/assets/activitydisplay.jpg',
      //     number: 0,
      //   },
      //   {
      //     path: '/src/assets/ISHARE.jpg',
      //     number: 1
      //   },
      //   {
      //     path: '/src/assets/g20.jpg',
      //     number: 2
      //   },
      //   {
      //     path: '/src/assets/suse.jpg',
      //     number: 3
      //   },
      //   {
      //     path: '/src/assets/success.jpg',
      //     number: 4
      //   }
      // ]
    }),
    created: function () {
      timer=setInterval(this.carouselrightchange, 5000);
    },
    methods: {
      calclass: function (i) {
        return 'carousel-slider-item-' + String(this.carouselcontainer[i].number);
      },
      carouselleftchange: function () {
        var k;
        for(k=0;k<5;k++){
          this.carouselcontainer[k].number--;
          if(this.carouselcontainer[k].number==-1){
            this.carouselcontainer[k].number=4;
          }
        }
        clearInterval(timer);
        timer=setInterval(this.carouselrightchange, 5000);
      },
      carouselrightchange: function () {
        var k;
        for(k=0;k<5;k++){
          this.carouselcontainer[k].number++;
          if(this.carouselcontainer[k].number==5){
            this.carouselcontainer[k].number=0;
          }
        }
        clearInterval(timer);
        timer=setInterval(this.carouselrightchange, 5000);
      },
      openact:function(url){ 
        let routeData = this.$router.resolve({name:'appact',params:{opt:url}});
        window.open(routeData.href, '_blank');
      }
    }
  }

</script>

<style>
  .carousel-wrapper {
    float: left;
    margin-top: 25px;
    width: 761.19px;
    height: 345.58px;
    position: relative;
  }

  .carousel-list {
    overflow: hidden;
    list-style: none;
    position: relative;
    padding-left: 0;
    width: 100%;
    height: 100%;
  }

  .carousel-item {
    width: 80%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
  }

  .carousel-item a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .carousel-left-btn {
    background-image: url(../assets/btn-left.png);
    cursor: pointer;
    position: absolute;
    top: 40%;
    left: 0;
    width: 30px;
    height: 50px;
    z-index: 2;
  }

  .carousel-right-btn {
    background-image: url(../assets/btn-right.png);
    cursor: pointer;
    position: absolute;
    top: 40%;
    right: 0;
    width: 30px;
    height: 50px;
    z-index: 2;
  }

  .carousel-img {
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  .carousel-item.is-anim {
    -webkit-transition: all 500ms ease-out;
    -moz-transition: all 500ms ease-out;
    transition: all 500ms ease-out;
  }

  .carousel-slider-item-0 {
    -webkit-transform: translate(37.65%, 0) scale(0.81);
    -ms-transform: translate(37.65%, 0) scale(0.81);
    transform: translate(37.65%, 0) scale(0.81);
    z-index: -1;
    opacity: 0;
  }

  .carousel-slider-item-1 {
    -webkit-transform: translate(25.15%, 0) scale(0.81);
    -ms-transform: translate(25.15%, 0) scale(0.81);
    transform: translate(25.15%, 0) scale(0.81);
    transform-origin: 100% 50%;
    opacity: 0.8;
  }

  .carousel-slider-item-2 {
    -webkit-transform: translate(12.5%, 0) scale(1.24);
    -ms-transform: translate(12.5%, 0) scale(1);
    transform: translate(12.5%, 0) scale(1);
    z-index: 3;
  }

  .carousel-slider-item-3 {
    -webkit-transform: translate(0px, 0) scale(0.81);
    -ms-transform: translate(0px, 0) scale(0.81);
    transform: translate(0px, 0) scale(0.81);
    transform-origin: 0% 50%;
    z-index: 1;
    opacity: 0.8;
  }

  .carousel-slider-item-4 {
    -webkit-transform: translate(-12.35%, 0) scale(0.81);
    -ms-transform: translate(-12.35%, 0) scale(0.81);
    transform: translate(-12.35%, 0) scale(0.81);
    z-index: -1;
    opacity: 0;
  }

</style>
