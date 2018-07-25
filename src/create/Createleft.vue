<template>
  <div class="Homemaincontent-wrapper">
    <div class="textarea-wrapper">
      <div class="textarea-inner" v-for="(d,i) in gotdata" :key="d.key" @mouseover="mouseoverbox(i)"  @mouseout="mouseoutbox(i)">
        <v-icon class="reediticon" v-if="texticon[i]">colorize</v-icon>
        <v-icon class="clearicon" v-if="texticon[i]" @click="sentdeletetext(i)">delete_outline</v-icon>
        <div class="text-box" contenteditable="true" @input="oldhandleInput($event,i,d.key)" v-if="d.img=='' && d.title==''" placeholder="从这里开始你的活动正文"></div>
        <img :src="d.img" class="img" v-if="d.img!=''"/>
        <p class="title" v-if="d.title!=''">{{d.title}}</p>
      </div>
      <!-- <div class="text-box" contenteditable="true" @input="handleInput" placeholder="从这里开始你的活动正文" v-if="gotdata.length==0" ref="content"></div>
      <div class="text-box" contenteditable="true" @input="handleInput" v-if="gotdata.length!=0" ref="content"></div> -->
    </div>
  </div>
</template>

<script>
  export default {
    props:['gotdata'],
    data: () => ({
      oldcontent:'',
      texticon:[]
      // content:''
    }),
    methods: {
      handleInput($event) {
        this.content = $event.target.innerText;
        // this.$emit("senttext",this.content);
      },
      oldhandleInput($event,i,k) {
        this.oldcontent=$event.target.innerText;
        this.$emit("sentoldtext",this.oldcontent,i,k);
      },
      mouseoverbox:function(i){
        this.$set(this.texticon,i,true);
      },
      mouseoutbox:function(i){
        this.$set(this.texticon,i,false);
      },
      sentdeletetext:function(i){
        this.$emit("sentdeletetext",i);
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
  .textarea-inner{
    position: relative;
    z-index: 10;
  }
  .clearicon{
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;
    color:#aaa;
    font-size: 30px;
  }
  .reediticon{
    position: absolute;
    top: 20px;
    right:40px;
    cursor: pointer;
    color:#aaa;
    font-size: 30px;
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
