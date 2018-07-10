<template>
  <div class="orgrcmd-wrapper">
    <p class="text-md-center text-lg-center text-xl-center mt-4 title font-weight-bold mb-4">每 周 · 组 织 推 荐</p>
    <div style="width:54px;margin:0 auto;">
    <v-avatar color="grey lighten-4" size="54">
      <img :src="orgimgpath" :alt="orgname">
    </v-avatar>
    </div>
    <p class="mx-3 mt-2 mb-1">简介:</p>
    <p class="mx-3 org-content mb-0">{{orgcontent}}</p>
    <v-btn depressed class="bt-1 ml-3">查看历史推荐</v-btn>
    <v-btn depressed class="bt-2">了解推荐规则</v-btn>
  </div>
</template>
<script>
  export default {
    data: () => ({
      orgname:'经济学院学生会',
      orgimgpath:'/src/assets/suselogo.jpg',
      orgcontent:'经济学院学生会.这是个非常有爱的大家庭,大家可以通过经济学院学生会认识许多朋友.我们定期举办类似ISHARE,商业英语大赛,就业讲座等活动,吸引了全校很多学生和老师,也在全校获得一定声誉.欢迎积极报名经济学院学生会的各项活动哟!'
    })
  }

</script>
<style scoped>
.orgrcmd-wrapper{
  float: left;
  margin-left: 35px;
  margin-top: 25px;
  width:266.41px;
  height:345.58px;
  background:white; 
}
.orgrcmd-wrapper>p{
  color: #333;
  opacity: 0.7;
}
.v-avatar{
  cursor: pointer;
}
.org-content{
  overflow:hidden;
  word-break:break-all;
  height: 37%;
  cursor: pointer;
}
span{
  color:#333;
  opacity: 0.65;
  cursor: pointer;
}
.bt-1{
  background-color: #67b9eb!important;
  width:40%;
  color:white;
}
.bt-2{
  background-color: #86d864!important;
  width:40%;
  color:white;
}
</style>
