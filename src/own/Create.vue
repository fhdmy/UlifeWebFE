<template>
  <div class="create-wrapper">
    <router-link to="/Createact"><v-btn color="primary">创建活动</v-btn></router-link>
  </div>
</template>

<script>
  export default {
    data: () => ({
       
    }),
    methods: {
     
    }
  }

</script>

<style scoped>
  .create-wrapper {
    float: left;
    width: 771.5px;
    height: 495px;
    margin-left: 25px;
    background: white;
    margin-top: 25px;
  }
  .v-btn{
    width: 300px;
    height:100px;
    border-radius: 50px;
    margin: 190px 230px;
    font-size: 24px;
  }
</style>
