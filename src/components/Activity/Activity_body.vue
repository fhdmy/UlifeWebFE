<template>
  <div class="Homemaincontent-wrapper">
    <div class="rough-introduction">
      <p>{{introduction}}</p>
        <v-icon class="ml-4 pl-2 iconfont icon-time subheading" color="orange"></v-icon><span class="mx-1">时间：</span><span class="mr-2">{{date}}</span><span>{{time}}</span>
        <v-icon class="ml-4 iconfont icon-xiangmudidian subheading" color="deep-purple "></v-icon><span class="mx-1">地点：</span><span>{{place}}</span>
        <v-icon class="ml-4 iconfont icon-whatshot subheading" color="red lighten-1"></v-icon><span class="mx-1">形式：</span><span>{{type}}</span>
        <v-icon class="ml-4 iconfont icon-ganxingqu subheading" color="light-green accent-3"></v-icon><span class="mx-1">兴趣：</span><span>{{interest}}</span>
    </div>
    <div class="text-maincontent">
      <div v-for="i in lists" :key="i.number">
        <p v-if="i.type=='title'" class="content-title">{{i.inner}}</p>
        <p v-if="i.type=='text'" class="content-text">{{i.inner}}</p>
        <img v-if="i.type=='img'" v-lazy="i.inner" class="content-img"/>
      </div>
      <v-divider></v-divider>
      <router-link to="/"><p class="mt-3 report">举报</p></router-link>
    </div>
    <div class="comment-wrapper">
      <div class="comment-inner" v-for="(c,i) in customlists" :key="i">
        <div class="comment-top">
          <a @click="openhomepage(item.url,item.type)">
            <v-avatar>
              <img :src="c.img" />
            </v-avatar>
          </a>
          <p class="top-name mr-3 ml-3">{{c.name}}</p>
          <p class="top-date">评论于{{c.date}}</p>
        </div>
        <div class="comment-text">
          {{c.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['introduction','date','time','place','type','interest','lists','customlists'],
    data: () => ({

    }),
    methods: {
     openhomepage:function(url,type){ 
        var id=url.split("/");
        id=id[5];
        if(type=='student'){
          let routeData = this.$router.resolve({name:'student_display',params:{opt:'collect',stu_id:id}});
          window.open(routeData.href, '_blank');
        }
        else if(type=='org'){
          let routeData = this.$router.resolve({name:'org_display',params:{opt:'abstract',org_id:id}});
          window.open(routeData.href, '_blank');
        }
      }
    }
  }

</script>

<style scoped>
  .Homemaincontent-wrapper {
    margin-top: 25px;
    width: 761.19px;
    background: white;
    float: left;
    margin-bottom: 150px;
  }
  .rough-introduction{
    margin:25px;
    padding:15px;
    border: 1px dashed #666;
  }
  .rough-introduction>p{
    word-break:break-all;
  }
  .text-maincontent{
    margin:0 25px;
  }
  .content-title{
    color: #222;
    font-weight: 400;
    line-height: 50px;
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 25px;
  }
  .content-text{
    margin:25px 0;
    word-break:break-word;
    word-wrap:break-word;
    font-size: 15px;
    line-height: 28px;
    color: #444;
    margin-top: 0;
    margin-bottom: 25px;
  }
  .content-img{
    width: 711.19px;
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 25px;
  }
  .report{
    margin-left: 680px;
    color: #999;
  }
  .report:hover{
    color: #E03636;
  }
  .comment-wrapper{
    margin:50px 25px 50px 25px;
  }
  .comment-inner{
    width: 100%;
    position: relative;
  }
  .comment-top{
    height: 40px;
    width: 100%;
    background: #f6f6f6;
    margin:40px 0 25px 0;
  }
  .v-avatar{
    float: left;
    margin-top: -10px;
    margin-left: 20px;
  }
  .top-name{
    float: left;
    color: #636363;
    margin-top: 10px;
  }
  .top-date{
    float: left;
    color: #999;
    font-size: 8px;
    margin-top: 13px;
  }
  .comment-text{
    width: 100%;
    color: #666;
    word-break:break-word;
    word-wrap:break-word;
  }
</style>
