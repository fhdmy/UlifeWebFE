<template>
  <div class="menu-wrapper">
    <div v-for="(item,i) in items" :key="i" :class="{'isactive':activejudge(item.path)}">
      <router-link :to="{name:'student_settings',params:{opt:item.path}}">
        <v-icon :class="item.iconname" class="iconfont"></v-icon>
        <span>{{item.text}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props:['opt'],
    data: () => ({
      items:[
        {
          iconname:'icon-info-1-copy',
          text:'我的信息',
          path:'detail'
        },
        {
          iconname:'icon-touxiang',
          text:'我的头像',
          path:'avatar'
        },
        {
          iconname:'icon-beijingtupian',
          text:'我的背景',
          path:'head_img'
        },
        {
          iconname:'icon-anquan',
          text:'账号安全',
          path:'account'
        },
        {
          iconname:'icon-yinsicelve',
          text:'隐私设置',
          path:'settings'
        }
      ]
    }),
    methods:{
      activejudge:function(path){
        if(path==this.opt)
          return true;
        else 
          return false;
      }
    }
  }

</script>

<style scoped>
  .menu-wrapper {
    width: 220px;
    height: 220px;
    background: white;
    float:left;
  }
  .menu-wrapper>div{
    line-height: 46px;
    margin-bottom:8px;
  }
  .menu-wrapper>div:hover{
    background:#dddddd;
  }
  .menu-wrapper>div a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .menu-wrapper>div span{
    color: #666;
    font-size: 14px;
  }
  .menu-wrapper>div i{
    color: #666;
    font-size: 24px;
    margin:0 10px 0 24px;
    position: relative;
    top: 5px;
  }
  .isactive{
    background:#FE9246!important;
  }
  .isactive span,.isactive i{
    color: white!important; 
  }
</style>
