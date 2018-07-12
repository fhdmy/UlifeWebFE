<template>
  <div class="menu-wrapper">
    <div v-for="(item,i) in items" :key="i" :class="{'isactive':activejudge(item.path)}">
      <router-link :to="{name:'stuedit',params:{opt:item.path}}">
        <v-icon>{{item.iconname}}</v-icon>
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
          iconname:'person_outline',
          text:'我的信息',
          path:'myinform'
        },
        {
          iconname:'face',
          text:'我的头像',
          path:'myimg'
        },
        {
          iconname:'laptop_mac',
          text:'我的背景',
          path:'mybg'
        },
        {
          iconname:'verified_user',
          text:'账号安全',
          path:'accountsecurity'
        },
        {
          iconname:'vpn_key',
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
    font-size: 28px;
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
