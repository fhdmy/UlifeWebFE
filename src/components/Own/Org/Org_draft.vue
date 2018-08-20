<template>
  <div class="signup-wrapper">
    <v-icon color="primary" class="mr-2 today-icon iconfont icon-boxxiangzi"></v-icon>
    <span class="title">我的草稿箱</span>
    <p v-if="acts.length==0" style="color:#FE9246;margin:200px 0 0 290px;font-size:30px;">这里空空哒！</p>
    <div class="Homemaincontent-mainwrapper">
      <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text>你确定要删除它？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">点错了</v-btn>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false,deleteitem(i)">删除</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-card class="elevation-1" v-for="(act,index) in acts" :key="index" @mouseover="largerimg(index)" @mouseout="smallerimg(index)">
        <div class="close-div" v-if="hover[index]">
          <v-icon class="close-icon" @click.stop="dialog = true,i=index">close</v-icon>
        </div>
        <div class="act-cardd-media">
          <a @click="edit(act.acturl)">
            <img :src="act.head_img" class="anim" :class="{'v-imglarger':act.isover}" />
          </a>
        </div>
        <v-card-title primary-title class="pb-2">
          <a @click="edit(act.acturl)">
            <h3 class="title mb-2 actname">{{act.heading}}</h3>
            <div class="headline-leftcontent">
              <v-icon class="mr-1 iconfont icon-time subheading"></v-icon>{{act.date}}
              <v-icon class="ml-2 mr-1 iconfont icon-xiangmudidian subheading"></v-icon>{{act.location}}
            </div>
          </a>
          <v-avatar color="grey lighten-4 ml-3" size="60">
            <img :src="act.orgavatar">
          </v-avatar>
        </v-card-title>
      </v-card>
      <div style="clear:both;"></div>
    </div>
    <div class="text-md-center text-lg-center text-xl-center pt-1 pb-4">
      <a @click="getmoredraftacts">显示更多</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['acts', 'org_name'],
    data: () => ({
      dialog: false,
      i: 0,
      hover: []
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
          url: '/activity/activities/' + this.acts[i].acturl + '/',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          this.acts.splice(i, 1);
        }).catch((error)=>{
          console.log(error.response);
          this.$emit("getrequest_failed");
        });
      },
      getmoredraftacts: function () {
        this.$emit("getmoredraftacts", true);
      },
      edit: function (url) {
        sessionStorage.setItem("editactorigin", this.org_name);
        this.$router.push({
          name: 'reedit',
          params: {
            opt: url
          }
        });
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
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
