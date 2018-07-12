<template>
  <div class="edit-content">
    <p class="inform-title">我的头像</p>
    <v-divider class="mb-4"></v-divider>
      <img :src="imgsrc"/>
    <br/>
    <v-btn flat color="white" class="selectimg">选择图片</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      imgsrc:'/src/assets/stuownbg.jpg'
    })
  }

</script>

<style scoped>
  .edit-content {
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    width: 743px;
  }

  .inform-title {
    font-size: 24px;
    color: #444;
  }
  img{
    width: 500px;
    height: 157.65px;
    max-height: 100%;
    max-width: 100%;
  }
  .selectimg{
    background: #FE9246!important;
    margin: 40px 0 10px 0;
    width: 130px;
  }

</style>
