<template>
  <div class="Homemaincontent-wrapper">
    <div class="textarea-wrapper">
      <div class="textarea-inner" v-for="(d,i) in gotdata" :key="d.key" @mouseover="mouseoverbox(i)" @mouseout="mouseoutbox(i)">
        <v-icon class="reediticon iconfont icon-bianji" v-if="texticon[i] && d.type=='title'" @click="sentreedit(i)"></v-icon>
        <v-icon class="clearicon iconfont icon-shanchu" v-if="texticon[i] && d.type=='title'" @click="sentdeletetext(i)"></v-icon>
        <v-icon class="reedittexticon iconfont icon-bianji" v-if="texticon[i] && d.type=='text'" @click="reedittext(i)"></v-icon>
        <v-icon class="textclearicon iconfont icon-shanchu" v-if="texticon[i] && d.type=='text'" @click="sentdeletetext(i)"></v-icon>
        <div class="imgeidtdiv" v-if="texticon[i] && d.type=='img'">
          <v-icon class="imgreediticon" @click="rotateimg(i)">refresh</v-icon>
          <v-icon class="imgclearicon iconfont icon-shanchu" @click="sentdeletetext(i)"></v-icon>
        </div>
        <p class="text-box" v-if="d.type=='text'">{{d.inner}}</p>
        <img v-lazy="imglocaldisplay[i]" class="img" v-if="d.type=='img'" />
        <p class="title" v-if="d.type=='title'">{{d.inner}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['gotdata', 'imglocaldisplay'],
    data: () => ({
      texticon: [],
    }),
    methods: {
      mouseoverbox: function (i) {
        this.$set(this.texticon, i, true);
      },
      mouseoutbox: function (i) {
        this.$set(this.texticon, i, false);
      },
      sentdeletetext: function (i) {
        this.$emit("sentdeletetext", i);
      },
      sentreedit: function (i) {
        this.$emit("sentreedit", i);
      },
      reedittext:function(i){
        this.$emit("sentreedittext",i);
      },
      rotateimg: function (i) {

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
    z-index: 0;
  }

  .textarea-inner {
    position: relative;
    z-index: 3;
  }

  .clearicon {
    position: absolute;
    top: 0px;
    right: 0;
    cursor: pointer;
    color: #777;
    font-size: 26px;
  }

  .reediticon {
    position: absolute;
    top: 0px;
    right: 40px;
    cursor: pointer;
    color: #777;
    font-size: 26px;
  }

  .reedittexticon{
    position: absolute;
    bottom: 0px;
    right:40px;
    cursor: pointer;
    color:#777;
    font-size: 26px;
  }
  
  .text-box {
    width: 100%;
    line-height: 1.8;
    font-size: 15px;
    color: #444;
    padding: 0 0 25px 0;
    margin: 0;
  }

  .textarea-wrapper {
    width: 100%;
    height: auto;
  }

  .img {
    width: 100%;
    height: auto;
    padding: 0 0 25px 0;
  }

  /* .rotate90{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg); 	
    -moz-transform:rotate(90deg); 	
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg); 
  } */

  .title {
    color: #222;
    font-size: 24px !important;
    font-weight: 400;
    padding: 0 0 25px 0;
    margin-bottom: 0;
  }

  .imgeidtdiv {
    position: absolute;
    background: rgba(2, 2, 2, 0.6);
    top: 0px;
    right: 0;
    width: 70px;
    padding: 2px;
  }

  .imgclearicon {
    cursor: pointer;
    color: #ddd;
    font-size: 20px;
  }

  .imgreediticon {
    cursor: pointer;
    color: #ddd;
    font-size: 20px;
    margin-right: 10px;
    margin-left: 7px;
  }

  .textclearicon {
    position: absolute;
    bottom: 0px;
    right: 0;
    cursor: pointer;
    color: #777;
    font-size: 26px;
  }

</style>
