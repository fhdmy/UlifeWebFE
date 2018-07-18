<template>
  <div class="rank-wrapper">
    <input type="file" hidden ref="selectimg" multiple accept="image/png, image/jpeg, image/gif, image/jpg"/>
    <div v-for="(item,i) in items" :key="i" @click="action(item.path)">
      <v-icon>{{item.iconname}}</v-icon>
      <span>{{item.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items:[
        {
          iconname:'label',
          text:'活动简介',
          path:'brief'
        },
        {
          iconname:'face',
          text:'报名需求',
          path:'require'
        },
        {
          iconname:'photo',
          text:'插入图片',
          path:'insertimg'
        },
        {
          iconname:'format_list_bulleted',
          text:'插入段落',
          path:'insertphase'
        }
      ]
    }),
    methods:{
      action:function(path){
        switch(path){
          case 'brief':
            break;
          case 'require':
            break;
          case 'insertimg':
            this.$refs.selectimg.click();
            break;
          case 'insertphase':
            break;
        }
      }
    }
  }

</script>

<style scoped>
  .rank-wrapper {
    width: 266.41px;
    height: 336px;
    background: white;
    float:right;
    margin-top: 25px;
  }
  .rank-wrapper>div{
    line-height: 46px;
    margin-bottom:8px;
    cursor: pointer;
  }
  .rank-wrapper>div:hover{
    background:#dddddd;
  }
  .rank-wrapper>div a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .rank-wrapper>div span{
    color: #666;
    font-size: 18px;
  }
  .rank-wrapper>div i{
    color: #FE9246;
    font-size: 28px;
    margin:0 10px 0 24px;
    position: relative;
    top: 5px;
  }
</style>
