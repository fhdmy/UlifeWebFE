<template>
  <div class="Homemaincontent-wrapper">
    <div class="textarea-wrapper">
      <div class="textarea-inner" v-for="(d,i) in gotdata" :key="i">
        <div class="text-box" contenteditable="true" @input="oldhandleInput" v-if="d.text!=''">{{d.text}}</div>
        <img :src="d.img" class="img" v-if="d.img!=''"/>
        <p class="title" v-if="d.title!=''">{{d.title}}</p>
      </div>
      <div class="text-box" contenteditable="true" @input="handleInput" placeholder="从这里开始你的活动正文" v-if="gotdata.length==1" ref="content"></div>
      <div class="text-box" contenteditable="true" @input="handleInput" v-if="gotdata.length!=1" ref="content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['gotdata','textjudge'],
    data: () => ({
      oldcontent:'',//有问题!
      content:''
    }),
    watch:{
      textjudge:function(val){
        this.$refs.content.innerHTML="";
        this.content="";
      }
    },
    methods: {
      handleInput($event) {
        this.content = $event.target.innerText;
        this.$emit("senttext",this.content);
      },
      oldhandleInput($event) {
        this.oldcontent = $event.target.innerText;
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
  }

  .text-box {
    width: 100%;
    outline: none;
    line-height: 1.8;
    font-size: 15px;
    color: #444;
    overflow: hidden;
    padding: 20px 0;
  }

  div[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #aaa;
  }

  div[contenteditable]:focus {
    content: none;
  }
  .textarea-wrapper{
    width: 100%;
    height: auto;
  }
  .img{
    width: 100%;
    height: auto;
    padding: 20px 0;
  }
  .title{
    color: #222;
    font-size: 24px!important;
    font-weight:400;
    padding: 20px 0;
    margin-bottom: 0;
  }
</style>
