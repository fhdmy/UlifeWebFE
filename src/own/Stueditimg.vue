<template>
  <div class="edit-content">
    <p class="inform-title">我的背景</p>
    <v-divider class="mb-4"></v-divider>
    <v-avatar size="130">
      <img :src="imgsrc"/>
    </v-avatar>
    <br/>
    <v-btn flat color="white" class="selectimg">选择图片</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      imgsrc:'/src/assets/xnick.jpg'
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
  .selectimg{
    background: #FE9246!important;
    margin: 40px 0 10px 0;
    width: 130px;
  }

</style>
