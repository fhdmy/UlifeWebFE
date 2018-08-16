<template>
  <div class="Homemaincontent-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">local_offer</v-icon>
    <span class="title" v-if="!mine">TA的简介</span>
    <span class="title" v-if="mine">我的简介</span>
    <div class="text-maincontent">
      <div v-for="i in lists" :key="i.number">
        <p v-if="i.title!=''" class="content-title">{{i.title}}</p>
        <p v-if="i.text!=''" class="content-text">{{i.text}}</p>
        <img v-if="i.img!=''" v-lazy="i.img" class="content-img"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['lists','mine'],
    data: () => ({

    }),
    methods: {
     
    }
  }

</script>

<style scoped>
  .today-icon {
    margin-left: 25px;
    margin-top: 25px;
  }
  .Homemaincontent-wrapper {
    float: left;
    width: 771.5px;
    margin-left: 25px;
    background: white;
    margin-top: 25px;
  }
  .text-maincontent{
    margin:25px 25px;
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
</style>
