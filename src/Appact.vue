<template>
    <v-content style="background: #f3f4f5;" v-scroll="onScroll">
      <div class="elevation-1 white home-toolbar-wrapper" :style="{'opacity':toolbaropacity,'display':display}">
        <Toolbar></Toolbar>
      </div>
      <img :src="parallaxpath" class="large-img"/>
      <div class="elevation-1 white" :class="{'isfixed':fixed}">
        <div class="middle-wrapper">
          <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}"><v-avatar size="120" v-if="!fixed"><img :src="img" :alt="org"></v-avatar></router-link>
          <p class="act-title display-1" v-if="!fixed">{{title}}</p>
          <Acttoolbar :org="org" :launchdate="launchdate" :isfinished="isfinished" :stars="stars" :fixed="fixed" :title="title"></Acttoolbar>
        </div>
      </div>
      <div v-if="fixed" style="height:70px;"></div>
      <div class="main-wrapper">
         <Show :introduction="introduction" :date="date" :time="time" :place="place" :type="type" :interest="interest" :lists="lists" :customlists="customlists"></Show>
         <Related></Related>
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
      parallaxpath:'/src/assets/stuownbg.jpg',
      img:'/src/assets/suselogo.jpg',
      title:'ISHARE',
      org:'经济学院学生会',
      launchdate:'2018-02-13',
      isfinished:true,
      stars:4.5,
      introduction:'这是一个非常棒的活动，帮助大家学习，提升。在活动中认识很多很多朋友，所以一定要参加我们活动哟。ISHARE这是一个非常棒的活动，帮助大家学习，提升。在活动中认识很多很多朋友，所以一定要参加我们活动哟。',
      date:'2018-02-19',
      time:'15:00',
      place:'东区大楼',
      type:'互动',
      interest:'全部',
      lists:[
        {
          title:'地图上没有塞舌尔',
          text:'',
          img:'',
          number:0
        },
        {
          title:'',
          text:'从某种大角度来说，无非是继续完成我们“每年去2个国家”的约定，为彼此平淡无奇的生活充值续命；喧嚣的城市、厌倦的场景、疲惫的心，旅行似乎是我们唯一能抓住的救命稻草。从另一种小角度来说，作为两个资深海岛控，这些年走南闯北，几乎把我们想去的海岛都走了个遍，剩下的也就只有在世界海岛中排名NO.1的 大溪地 、NO.2的 塞舌尔 、NO.5的 斐济 和NO.7的 帕劳 了。',
          img:'',
          number:1
        },
        {
          title:'',
          text:'家里的墙上一直挂着小D送我的世界地图，依稀记得多年前他送给我时兴奋的模样：“你一定会喜欢这个礼物的。”我将它小心翼翼地钉在墙上，颇有一副指点 江山 之意，向小D比划着：“以后我们每去一个国家，就刮开一个，那就先去面积大的国家，例如 俄罗斯 ，这样刮开才有成就感。”可那时的我们又怎么知道，后来去的几乎都是岛国，以至于小到在地图上根本找不到。',
          img:'',
          number:2
        },
        {
          title:'',
          text:'家里的墙上一直挂着小D送我的世界地图，依稀记得多年前他送给我时兴奋的模样：“你一定会喜欢这个礼物的。”我将它小心翼翼地钉在墙上，颇有一副指点 江山 之意，向小D比划着：“以后我们每去一个国家，就刮开一个，那就先去面积大的国家，例如 俄罗斯 ，这样刮开才有成就感。”可那时的我们又怎么知道，后来去的几乎都是岛国，以至于小到在地图上根本找不到。',
          img:'',
          number:3
        },
        {
          title:'',
          text:'',
          img:'/src/assets/suse.jpg',
          number:4
        },
        {
          title:'',
          text:'世界顶级海岛、 英国 皇室的后花园、威廉王子的蜜月地、贝克汉姆的度假地、海岛中的法拉利……世人强行赋予了 塞舌尔 太多的标签，当撕去这个标签时，它其实只是一个无比自然淳朴的地方。',
          img:'',
          number:5
        },
        {
          title:'地图上没有塞舌尔',
          text:'',
          img:'',
          number:6
        },
        {
          title:'',
          text:'对于主岛—— 马埃岛 ，我们并不感兴趣。 马埃岛 的海不如 普拉兰 岛（P岛）和 拉迪格岛 （L岛），而首都 维多利亚 感觉上和 马尔代夫 的首都 马累 、 毛里求斯 的首都 路易港 很像，都是我们不太喜欢的旅行经历。因此我们决定直奔P岛和L岛， 塞舌尔 最美的海和精华也都在这里。',
          img:'',
          number:7
        },
        {
          title:'',
          text:'',
          img:'/src/assets/g20.jpg',
          number:8
        },
        {
          title:'',
          text:'从主岛去P岛可以选择坐船或者是小飞机。因为船票和机票价格差不多，加上很多人说坐船会吐到怀疑人生，所以我们订的内飞往返1166/人。 塞舌尔 航空官网和各大线上平台都可以购票。有人说便宜的时候可以订到400多一张的机票，确实有这样的价格，但是时间都是不好的，要么很早要么很晚，黄金时间的票价不会这么便宜。',
          img:'',
          number:9
        },
        {
          title:'',
          text:'看到很多参加一日游来L岛的都说L岛很小，一天就能玩完、骑车20分钟环岛，我表示他们真的有走完L岛、有get到它的精髓吗？L岛在我看来一点也不小，我们3天都没有骑遍它。德 阿让 、三连滩、Anse severs、Anse Patates、Anse Grosse，每个海滩都很美，都有自己的风格。',
          img:'',
          number:10
        },
      ],
      customlists:[
        {
          name:'Xnick',
          img:'/src/assets/xnick.jpg',
          date:'2018-03-19',
          content:'看到很多参加一日游来L岛的都说L岛很小，一天就能玩完、骑车20分钟环岛，我表示他们真的有走完L岛、有get到它的精髓吗？L岛在我看来一点也不小，我们3天都没有骑遍它。德 阿让 、三连滩、Anse severs、Anse Patates、Anse Grosse，每个海滩都很美，都有自己的风格。'
        },
        {
          name:'小变态',
          img:'/src/assets/head.jpg',
          date:'2018-05-10',
          content:'从主岛去P岛可以选择坐船或者是小飞机。因为船票和机票价格差不多，加上很多人说坐船会吐到怀疑人生，所以我们订的内飞往返1166/人。 塞舌尔 航空官网和各大线上平台都可以购票。有人说便宜的时候可以订到400多一张的机票，确实有这样的价格，但是时间都是不好的，要么很早要么很晚，黄金时间的票价不会这么便宜。'
        },
        {
          name:'Xnick',
          img:'/src/assets/xnick.jpg',
          date:'2018-03-19',
          content:'看到很多参加一日游来L岛的都说L岛很小，一天就能玩完、骑车20分钟环岛，我表示他们真的有走完L岛、有get到它的精髓吗？L岛在我看来一点也不小，我们3天都没有骑遍它。德 阿让 、三连滩、Anse severs、Anse Patates、Anse Grosse，每个海滩都很美，都有自己的风格。'
        },
        {
          name:'小变态',
          img:'/src/assets/head.jpg',
          date:'2018-05-10',
          content:'从主岛去P岛可以选择坐船或者是小飞机。因为船票和机票价格差不多，加上很多人说坐船会吐到怀疑人生，所以我们订的内飞往返1166/人。 塞舌尔 航空官网和各大线上平台都可以购票。有人说便宜的时候可以订到400多一张的机票，确实有这样的价格，但是时间都是不好的，要么很早要么很晚，黄金时间的票价不会这么便宜。'
        }
      ],
      offsetTop:0
    }),
    computed:{
      toolbaropacity:function(){
        var k=this.offsetTop;
        if(k<320){
          return 1;
        }
        else{
          k=2.4-k/220;
          return k;
        }
      },
      fixed:function(){
        var k=this.offsetTop;
        if(k>=664){
          return true;
        }
      },
      display:function(){
        var k = this.offsetTop;
        if(k<584){
          return 'block';
        }
        else
          return 'none';
      }
    },
    methods:{
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      }
    }
  }

</script>

<style scoped>
  .isfixed{
    position: fixed;
    z-index: 7;
    top: 0;
    width: 100%;
  }
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }
  .middle-wrapper{
    width:1063px;
    margin: 0 auto;
    position: relative;
  }
  .v-avatar{
    position: absolute;
    top:0;
    left:0;
    margin-top: -80px;
    z-index: 4;
  }
  .act-title{
    position: absolute;
    top:0;
    left:170px;
    margin-top: -70px;
    color: white;
    font-weight: bold;
    z-index: 4;
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
</style>
