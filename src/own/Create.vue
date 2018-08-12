<template>
  <div class="create-wrapper">
    <v-btn color="primary" @click="create">创建活动</v-btn>
  </div>
</template>

<script>
  export default {
    props:['org_name'],
    data: () => ({
       
    }),
    methods: {
     create:function(){
       sessionStorage.setItem("createactorigin",this.org_name);
       this.$router.push('/Createact');
     }
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
