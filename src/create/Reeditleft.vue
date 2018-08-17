<template>
  <div class="Homemaincontent-wrapper">
    <div class="textarea-wrapper">
      <div class="textarea-inner" v-for="(d,i) in gotdata" :key="d.key" @mouseover="mouseoverbox(i)" @mouseout="mouseoutbox(i)">
        <v-icon class="reediticon" v-if="texticon[i] && d.type=='title'" @click="sentreedit(i)">colorize</v-icon>
        <v-icon class="clearicon" v-if="texticon[i] && d.type=='title'" @click="sentdeletetext(i)">delete_outline</v-icon>
        <v-icon class="textclearicon" v-if="texticon[i] && d.type=='text'" @click="sentdeletetext(i)">delete_outline</v-icon>
        <div class="imgeidtdiv" v-if="texticon[i] && d.type=='img'">
          <v-icon class="imgreediticon" @click="rotateimg(i)">refresh</v-icon>
          <v-icon class="imgclearicon" @click="sentdeletetext(i)">delete_outline</v-icon>
        </div>
        <div class="text-box" contenteditable="plaintext-only" v-if="d.type=='text'" placeholder="从这里开始你的活动正文" @input="oldhandleInput($event,i,d.key)">{{origintext[i]}}</div>
        <img v-lazy="imglocaldisplay[i]" class="img" v-if="d.type=='img'" />
        <p class="title" v-if="d.type=='title'">{{d.inner}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['gotdata', 'deleted','imglocaldisplay'],
    data: () => ({
      oldcontent: '',
      texticon: [],
      origintext: []
    }),
    created: function () {
      for (let k = 0; k < this.gotdata.length; k++) {
        if(this.gotdata[k].type=='text'){
          this.$set(this.origintext, k, this.gotdata[k].inner);
        }
      }
    },
    watch: {
      deleted: function (val) {
        for (let k = 0; k < this.gotdata.length; k++) {
          if(this.gotdata[k].type=='text'){
            this.$set(this.origintext, k, this.gotdata[k].inner);
          }
        }
      }
    },
    methods: {
      handleInput($event) {
        this.content = $event.target.innerText;
        // this.$emit("senttext",this.content);
      },
      oldhandleInput($event, i, k) {
        this.oldcontent = $event.target.innerText;
        this.$emit("sentoldtext", this.oldcontent, i, k);
      },
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
    color: #aaa;
    font-size: 30px;
  }

  .reediticon {
    position: absolute;
    top: 0px;
    right: 40px;
    cursor: pointer;
    color: #aaa;
    font-size: 30px;
  }

  .text-box {
    width: 100%;
    outline: none;
    line-height: 1.8;
    font-size: 15px;
    color: #444;
    overflow: hidden;
    padding: 0 0 25px 0;
  }

  div[contenteditable]:empty:before {
    content: attr(placeholder);
    color: #aaa;
  }

  div[contenteditable]:focus {
    content: none;
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
    color: #aaa;
    font-size: 30px;
  }

</style>
