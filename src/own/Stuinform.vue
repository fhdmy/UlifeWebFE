<template>
  <div class="inform-wrapper">
    <p class="text-md-center text-lg-center text-xl-center stuname">{{name}}</p>
    <div class="three-wrapper">
      <div class="first-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{attention}}</p>
        <p class="bottom-text">关注</p>
      </div>
      <div class="second-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{rollin}}</p>
        <p class="bottom-text">参与</p>
      </div>
      <div class="third-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{trust}}%</p>
        <p class="bottom-text">信誉</p>
      </div>
      <div style="clear:both;"></div>
    </div>
    <router-link :to="{name:'stuedit',params:{opt:'myinform'}}"><v-btn flat class="fill-inform" v-if="mine">填写个人信息</v-btn></router-link>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="mine">我的关注</p>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="!mine">TA的关注</p>
    <Attention :items="items"></Attention>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="mine">我的访客</p>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="!mine">TA的访客</p>
    <Attention :items="items"></Attention>
  </div>
</template>

<script>
  export default {
    props:['name','attention','rollin','trust','items','mine'],
    data: () => ({

    })
  }

</script>

<style scoped>
  .inform-wrapper {
    width: 266.41px;
    height: 840px;
    background: white;
    float:left;
    margin-top: 1px;
  }
  .stuname{
    margin-top:68px;
    font-weight: lighter;
    font-size: 20px;
  }
  .three-wrapper{
    height: 62px;
    width: 100%;
    border-top: 1px solid#e2e2e2;
    border-bottom: 1px solid#e2e2e2;
    position: relative;
  }
  .first-inner{
    width: 33.33%;
    height: 100%;
    border-right: 1px solid#e2e2e2;
    float: left;
  }
  .second-inner{
    width: 33.33%;
    height: 100%;
    border-right: 1px solid#e2e2e2;
    float: left;
  }
  .third-inner{
    width: 33.33%;
    height: 100%;
    float: left;
  }
  .top-number{
    font-size: 20px;
    margin: 0;
    padding-top: 6px;
    color: #666;
    font-weight: bold;
  }
  .bottom-text{
    margin:0;
    color: #444;
  }
  .fill-inform{
    background: #efefef!important;
    color: #666;
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    border-radius: 5px;
  }
  .fill-inform:hover{
    background: #E03636!important;
    color: white;
  }
</style>
