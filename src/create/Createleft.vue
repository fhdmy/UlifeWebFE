<template>
  <div class="Homemaincontent-wrapper">
    <div class="text-box" contenteditable="true" @input="handleInput" placeholder="从这里开始你的活动正文"></div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      content: ''
    }),
    methods: {
      handleInput($event){
      this.content = $event.target.innerText;
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
  .text-box{
    width: 100%;
    outline:none; 
    line-height: 1.8;
    font-size: 15px;
    color: #444;
    overflow: hidden;
    min-height:350px;
  }
  div[contenteditable]:empty:before{
    content: attr(placeholder);
    color: #aaa;
}
div[contenteditable]:focus{
    content:none;
}
</style>
