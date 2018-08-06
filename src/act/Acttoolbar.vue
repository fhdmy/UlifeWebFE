<template>
  <v-toolbar color="white elevation-0" height="70">
    <div v-if="fixed" class="display-1 fixed-title">{{title}}</div>
    <div class="toolbar-content">
      <div class="my-2">
        <span class="mr-5 subheading">{{org}}</span>
        <span class="launchdate">发表于：{{launchdate}}</span>
      </div>
      <span v-if="!isfinished" class="subheading">未结束</span>
      <span v-if="isfinished" class="subheading mr-3">已结束</span>
      <v-icon v-for="i in wholestar" :key="i" color="primary">star</v-icon>
      <v-icon v-for="k in 2*halfstar" :key="k+10" color="primary">star_half</v-icon>
      <v-icon v-for="j in nostar" :key="j+20" color="primary">star_border</v-icon>
    </div>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat class="subheading toolbar-signinbtn">报名</v-btn>
      <v-btn flat class="subheading toolbar-btn" @click="collect"><v-icon :class="{'toolbar-icon':true,'iconfont':true,'icon-wujiaoxing':!collected,'icon-star_full':collected}" color="primary"></v-icon><span>收藏</span></v-btn>
      <v-menu open-on-hover bottom offset-y nudge-left="30">
        <v-btn slot="activator" flat class="subheading toolbar-btn"><v-icon class="toolbar-icon" color="light-green lighten-1">share</v-icon><span>分享</span></v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="chooseshare(index)">
            <v-icon class="iconfont shareicon" :class="item.name" :style="{'color':item.color}"></v-icon>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script> 
  export default {
    props:['org','launchdate','isfinished','stars','fixed','title'],
    data:()=>({
      collected:false,
      items:[
        {
          name:'icon-weibo',
          color:'rgb(249, 110, 118)'
        },
        {
          name:'icon-qunfengqqkongjian',
          color:'#ffce00'
        },
        {
          name:'icon-weixin-copy',
          color:'rgb(125, 210, 57)'
        }
      ]
    }),
    computed:{
      wholestar:function(){
        return parseInt(this.stars)*10/10;
      },
      halfstar:function(){
        return this.stars-parseInt(this.stars)*10/10;
      },
      nostar:function(){
        return 5-this.wholestar-2*this.halfstar;
      }
    },
    methods:{
      collect:function(){
        if(this.collected){
          this.collected=false;
        }
        else{
          this.collected=true;
        }
      },
      chooseshare:function(i){
        // 微博
        if(i==0){

        }
        // qq空间
        else if(i==1){
          this.$http.post('https://graph.qq.com/share/add_share',{
            title:'QQ空间',
            url:'http://www.qzone.com/ ',
            site:'Ulife',
            fromurl:'http://baidu.com'
          }).then((res)=>{
            console.log(res);
          }).catch(function(error){
            alert("网络传输故障!");
          });
        }
        // 微信朋友圈
        else{

        }
      }
    }
  }

</script>

<style scoped>
.v-toolbar__items{
  position: absolute;
  right: 0;
}
.toolbar-btn{
  border-right: 1px solid rgb(232, 232, 230);
}
.toolbar-btn>>>.v-btn__content{
  display: block;
}
.toolbar-icon{
  display: block;
  margin-top: 10px;
  margin-bottom: 5px;
}
.toolbar-signinbtn{
  background:#2196f3!important;
  color: white;
  width: 120px;
  font-size: 20px!important;
}
.toolbar-content{
  margin-left: 120px;
  height: 70px;
}
.launchdate{
  color: #666;
}
.fixed-title{
  margin-right: -70px;
  color: #E03636;
}
.v-menu__content{
  width:144px;
}
.v-menu__content>>>.v-list{
  padding: 0;
  height: 48px;
}
.v-menu__content>>>.v-list div{
  width: 48px;
  float: left;
}
.v-menu__content>>>.v-list__tile{
  padding:0;
  width: 48px;
}
.shareicon{
  width: 48px;
  height: 48px;
}
</style>
