<template>
  <v-content style="background: #f3f4f5;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
      <Stutoolbar></Stutoolbar>
    </div>
    <img :src="parallaxpath" class="large-img"/>
    <div class="elevation-1 white" :class="{'isfixed':fixed}">
      <div class="middle-wrapper">
        <Studisplaytoolbar :itembottom="item"></Studisplaytoolbar>
        <v-avatar size="100">
          <img :src="img" :alt="name">
        </v-avatar>
      </div>
    </div>
    <div v-if="fixed" style="height:64px;"></div>
    <div class="stuown-mainwrapper">
      <Stuinform :class="{'informfixed':fixed}" :name="name" :attention="attention" :rollin="rollin" :trust="trust" :items="items" :mine="mine"></Stuinform>
      <div class="asinform" v-if="fixed"></div>
      <Collect v-if="item=='collect'"></Collect>
      <Historyattend v-if="item=='historyattend'"></Historyattend>
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
    props: ['opt'],
    data: () => ({
      parallaxpath: '/src/assets/stuownbg.jpg',
      img: '/src/assets/xnick.jpg',
      name: 'Xnick',
      item: 'signup',
      offsetTop: 0,
      attention: 10,
      rollin: 15,
      trust: 70,
      mine:false,
      items: [{
          number: 0,
          imgsrc: '/src/assets/suselogo.jpg',
          name: '经济学院学生会'
        },
        {
          number: 1,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        },
        {
          number: 2,
          imgsrc: '/src/assets/suselogo.jpg',
          name: '经济学院学生会'
        },
        {
          number: 3,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        },
        {
          number: 4,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        },
        {
          number: 5,
          imgsrc: '/src/assets/suselogo.jpg',
          name: '经济学院学生会'
        },
        {
          number: 6,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        },
        {
          number: 7,
          imgsrc: '/src/assets/suselogo.jpg',
          name: '经济学院学生会'
        },
        {
          number: 8,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        },
        {
          number: 9,
          imgsrc: '/src/assets/xnick.jpg',
          name: 'Xnick'
        }
      ]
    }),
    created: function () {
      switch (this.opt) {
        case 'collect':
          this.item = 'collect';
          break;
        case 'historyattend':
          this.item = 'historyattend';
          break;
      }
    },
    watch: {
      '$route' (to, from) {
        this.item = to.params.opt;
      }
    },
    computed: {
      toolbaropacity: function () {
        var k = this.offsetTop;
        if (k < 350) {
          return 1;
        } else {
          k = 2.4 - k / 250;
          return k;
        }
      },
      fixed: function () {
        var k = this.offsetTop;
        if (k >=664) {
          return true;
        }
        else
          return false;
      },
      display:function(){
        var k = this.offsetTop;
        if(k<589){
          return 'block';
        }
        else
          return 'none';
      }
    },
    methods: {
      chooseitem: function (e) {
        switch (e) {
          case 'collect':
            this.item = 'collect';
            break;
          case 'historyattend':
            this.item = 'historyattend';
            break;
        }
      },
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

</script>

<style scoped>
  .isfixed {
    position: fixed;
    z-index: 7;
    top: 0;
    width: 100%;
  }

  .informfixed {
    position: fixed;
    z-index: 6;
    top: 64px;
    width: 266.41px;
  }

  .asinform {
    width: 266.41px;
    height: 840px;
    background: white;
    float: left;
    margin-top: 1px;
  }

  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .v-parallax {
    margin-top: 64px;
  }

  .middle-wrapper {
    width: 1063px;
    margin: 0 auto;
    position: relative;
  }

  .v-avatar {
    position: absolute;
    top: 10px;
    left: 85px;
    z-index: 100;
  }

  .stuown-mainwrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }
  .large-img{
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height:100%;
    max-width:100%;
  }
</style>
