<template>
  <div class="rank-wrapper">
    <p class="text-md-center text-lg-center text-xl-center mt-4 title font-weight-bold mb-2">相关活动</p>
    <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
      <div class="act-cardd-media">
        <router-link to="/Appact">
          <img :src="act.actimgpath" class="anim" :class="{'v-imglarger':act.isover}" />
        </router-link>
      </div>
      <v-card-title primary-title class="pb-1 pt-2">
        <router-link to="/Appact">
          <h3 class="subheading mb-1 actname">{{act.actname}}</h3>
          <div class="headline-leftcontent body-2">
            <v-icon class="mr-1" size="15">schedule</v-icon>{{act.acttime}}
            <v-icon class="ml-2 mr-1" size="15">place</v-icon>{{act.actplace}}</div>
        </router-link>
        <v-avatar color="grey lighten-4 ml-3" size="40">
          <img :src="act.orgimgpath" :alt="act.orgname">
        </v-avatar>
      </v-card-title>
    </v-card>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      acts: [{
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/suse.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover: false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/g20.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover: false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/success.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover: false
        },
         {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/g20.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover: false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/success.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover: false
        }
      ]
    }),
    methods: {
      largerimg: function (i) {
        this.acts[i].isover=true;
      },
      smallerimg: function (i) {
        this.acts[i].isover=false;
      }
    }
  }

</script>

<style scoped>
  .rank-wrapper {
    width: 266.41px;
    height: auto;
    background: white;
    float: right;
    margin-top: 25px;
    margin-bottom: 150px;
  }
  .rank-wrapper>p {
    color: #333;
    opacity: 0.7;
  }
  .act-cardd-media {
    height: 149.86px;
    width: 266.41px;
    overflow: hidden;
  }

  .act-cardd-media img {
    width: 266.41px;
    height: 149.86px;
    max-width: 100%;
    max-width: 100%;
    cursor: pointer;
  }

  .anim {
    -webkit-transition: all 1200ms ease-out;
    -moz-transition: all 1200ms ease-out;
    transition: all 1200ms ease-out;
  }

  .v-card>>>.v-imglarger {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }

  .v-card {
    float: left;
    position: relative;
    width: 266.41px;
    margin-left: 0;
    margin-top: 25px;
  }

  .actname {
    color: #323232;
    font-family: Arial, Helvetica, sans-serif !important;
  }

  .v-avatar {
    position: absolute;
    right: 0;
    bottom: 5px;
    cursor: pointer;
  }

  .headline-leftcontent {
    color: #333;
    opacity: 0.9;
  }

</style>
