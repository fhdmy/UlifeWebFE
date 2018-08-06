<template>
  <div class="orgrcmd-wrapper">
    <p class="text-md-center text-lg-center text-xl-center mt-4 title font-weight-bold mb-4">每 周 · 组 织 推 荐</p>
    <div style="width:54px;margin:0 auto;">
    <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}">
      <v-avatar color="grey lighten-4" size="54">
        <img :src="orgimgpath" :alt="orgname">
      </v-avatar>
    </router-link>
    </div>
    <p class="mx-3 mt-2 mb-1">简介:</p>
    <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}">
      <p class="mx-3 org-content mb-0">{{orgcontent}}</p>
    </router-link>
    <v-btn depressed class="bt-1 ml-3">查看历史推荐</v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-btn depressed class="bt-2" slot="activator">了解推荐规则</v-btn>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>推荐规则</v-card-title>
          <v-card-text>
          组织推荐板块将通过每周推荐一个组织的形式帮助大家推广，同时为了能有更多的组织得到该机会，我们将不会选取在一个学期内已推广过的组织。推荐渠道分别为新加入组织、综合评比、关注人数以及官方推荐，仅前两者需要申请。
          <br/>
          <br/>
          Q&A：
          <br/>
          Q：请问如何申请？
          <br/>
          A：发送邮件至xxx@xxx.com，邮件名请设置为“推荐申请-新加入组织/综合评比”。
          <br/>
          <br/>
          Q：我们想通过新加入组织、综合评比申请，请问需要提供什么？
          <br/>
          A：（ml填）
          <br/>
          <br/>
          Q：请问如果有多个组织参与竞选，将如何选择哪？
          <br/>
          A：我们将通过一套完善的评比机制进行选择，很抱歉由于一定原因具体机制暂时无法透露。但显然组织更多高质量的大型活动并将材料提供给我们将有助于您的组织更加出众。
          <br/>
          <br/>
          Q：新加入组织评比的限制条件是什么？
          <br/>
          A：必须是在组织用户注册后的2个月之内哦。
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">了解</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
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
  color:  #333;
  opacity: 0.7;
}
span{
  color:#333;
  opacity: 0.65;
  cursor: pointer;
}
.bt-1{
  background-color: #67b9eb!important;
  width:106.56px;
  color:white;
}
.bt-2{
  background-color: #86d864!important;
  width:106.56px;
  color:white;
}
</style>
