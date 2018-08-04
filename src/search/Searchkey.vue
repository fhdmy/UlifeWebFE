<template>
  <div class="Homemaincontent-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">today</v-icon>
    <span class="title">搜索结果</span>
    <div class="searchrank"><span class="rankinner" @click="chooserank(1)" :class="{'ischoosen':firstact}">综合排序</span><span class="mx-2">/</span><span class="rankinner" @click="chooserank(2)" :class="{'ischoosen':secondact}">时间排序</span><span class="mx-2">/</span><span class="rankinner" @click="chooserank(3)" :class="{'ischoosen':thirdact}">浏览最多</span></div>
    <div class="Homemaincontent-mainwrapper">
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
        <div class="act-cardd-media">
          <router-link to="/Appact"><img :src="act.actimgpath" class="anim" :class="{'v-imglarger':act.isover}"/></router-link>
        </div>
        <v-card-title primary-title class="pb-2">
          <router-link to="/Appact">
            <h3 class="title mb-2 actname">{{act.actname}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.acttime}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.actplace}}
            </div>
          </router-link>
          <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}">
          <v-avatar color="grey lighten-4 ml-3" size="60">
            <img :src="act.orgimgpath" :alt="act.orgname">
          </v-avatar>
          </router-link>
        </v-card-title>
      </v-card>
      <div style="clear:both;"></div>
    </div>
    <div class="text-md-center text-lg-center text-xl-center pt-1 pb-4">
      <a>显示更多</a>
    </div>
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
          isover:false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/g20.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover:false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/success.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover:false
        },
        {
          actname: 'ISHARE真人图书馆',
          orgname: '经济学院学生会',
          orgimgpath: '/src/assets/suselogo.jpg',
          actimgpath: '/src/assets/ISHARE.jpg',
          acttime: '2018年1月5日',
          actplace: '东区平台',
          isover:false
        }
      ],
      firstact:true,
      secondact:false,
      thirdact:false
    }),
    methods: {
      largerimg: function (i) {
        this.acts[i].isover=true;
      },
      smallerimg: function (i) {
        this.acts[i].isover=false;
      },
      chooserank:function(n){
        switch(n){
          case 1:
            this.firstact=true;
            this.secondact=false;
            this.thirdact=false;
            break;
          case 2:
            this.firstact=false;
            this.secondact=true;
            this.thirdact=false;
            break;
          case 3:
            this.firstact=false;
            this.secondact=false;
            this.thirdact=true;
            break;
        } 
      }
    }
  }

</script>

<style scoped>
  .rankinner{
    cursor: pointer;

  }
  .rankinner:hover{
    color: #E03636;
  }
  .ischoosen{
    color: #E03636;
  }
  .searchrank{
    float: right;
    margin-top:25px;
    margin-right:25px;
    color: #666;
  }
  .act-cardd-media {
    height: 193px;
    width: 343.09px;
    overflow: hidden;
  }

  .act-cardd-media img {
    width: 343.09px;
    height: 193px;
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

  .today-icon {
    margin-left: 25px;
    margin-top: 25px;
  }

  .Homemaincontent-wrapper {
    margin-top: 25px;
    width: 761.19px;
    background: white;
    float: left;
  }

  .Homemaincontent-mainwrapper {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    min-height: 500px;
  }

  .v-card {
    float: left;
    position: relative;
    width: 343.1px;
    margin-left: 25px;
    margin-bottom: 25px;
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
    margin-top: 12px;
  }

</style>
