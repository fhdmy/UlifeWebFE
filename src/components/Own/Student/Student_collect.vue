<template>
  <div class="signup-wrapper">
    <v-icon color="primary" class="mr-2 today-icon iconfont icon-shoucang"></v-icon>
    <span class="title" v-if="!mine">TA的收藏</span>
    <span class="title" v-if="mine">我的收藏</span>
    <p v-if="acts.length==0 && is_fav_public" style="color:#FE9246;margin:200px 0 0 290px;font-size:30px;">这里空空哒！</p>
    <p v-if="!is_fav_public" style="color:#FE9246;margin:200px 0 0 245px;font-size:30px;">这是人家的小秘密啦！</p>
    <div class="Homemaincontent-mainwrapper" :class="{'tohide':!is_fav_public}">
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
        <v-dialog v-model="dialog" max-width="290" v-if="mine">
          <v-card>
            <v-card-text>你确定要删除它？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">点错了</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false,deleteitem(i)">删除</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="close-div" v-if="hover[index] && mine">
          <v-icon class="close-icon" @click.stop="dialog = true,i=index">close</v-icon>
        </div>
        <div class="act-cardd-media">
          <a @click="openact(act.acturl)">
            <img v-lazy="act.head_img" class="anim" :class="{'v-imglarger':act.isover}" />
          </a>
        </div>
        <v-card-title primary-title class="pb-2">
          <a @click="openact(act.acturl)">
            <h3 class="title mb-2 actname">{{act.heading}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.date}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.location}}
            </div>
          </a>
          <img src="/src/assets/finished.png" class="finishedimg" v-if="act.is_ended" />
          <a @click="openorg(act.org_id)">
            <v-avatar color="grey lighten-4 ml-3" size="60">
              <img v-lazy="act.orgavatar">
            </v-avatar>
          </a>
        </v-card-title>
      </v-card>
      <div style="clear:both;"></div>
    </div>
    <div class="text-md-center text-lg-center text-xl-center pt-1 pb-4">
      <a @click="getmorecollectacts">显示更多</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['mine', 'acts','is_fav_public'],
    data: () => ({
      dialog: false,
      hover: [],
      i: 0
    }),
    methods: {
      largerimg: function (i) {
        this.acts[i].isover = true;
        this.hover[i] = true;
      },
      smallerimg: function (i) {
        this.acts[i].isover = false;
        this.hover[i] = false;
      },
      deleteitem: function (i) {
        this.$http({
          method: 'delete',
          url: this.acts[i].bookmarkingurl,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.acts.splice(i, 1);
        }).catch(function (error) {
          console.log(error.response);
          this.$emit("getrequest_failed");
        });
      },
      getmorecollectacts: function () {
        this.$emit("sendmorecollectacts", true);
      },
      openact:function(url){ 
        let routeData = this.$router.resolve({name:'activity',params:{opt:url}});
        window.open(routeData.href, '_blank');
      },
      openorg:function(org_id){
        let routeData = this.$router.resolve({name:'org_display',params:{opt:'abstract',org_id:org_id}});
        window.open(routeData.href, '_blank');
      }
    }
  }

</script>

<style scoped>
  .act-cardd-media {
    height: 193px;
    width: 343.09px;
    overflow: hidden; 
  }

  .tohide{
    visibility: hidden;
  }

  .act-cardd-media img {
    width: 343.09px;
    height: 193px;
    max-width: 100%;
    max-width: 100%;
    cursor: pointer;
  }

  .finishedimg {
    position: absolute;
    bottom: 0;
    right: 64px;
    z-index: 2;
    height: 80px;
    width: 80px;
    max-height: 100%;
    max-width: 100%;
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
    height: 20px;
    width: 270px;
    display:block;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
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

  .signup-wrapper {
    float: left;
    width: 771.5px;
    margin-left: 25px;
    background: white;
    margin-top: 25px;
  }

  .close-div {
    position: absolute;
    z-index: 2;
    right: 0;
    width: 24px;
    height: 24px;
    background: rgba(2, 2, 2, 0.1);
  }

  .close-icon {
    color: white;
  }

  .v-dialog__content>>>.v-dialog .v-card {
    width: 100%;
    height: 100%;
    margin: 0;
  }

</style>
