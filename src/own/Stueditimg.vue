<template>
  <div class="edit-content">
    <input type="file" hidden ref="myimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange"/>
    <p class="inform-title">我的头像</p>
    <v-divider class="mb-4"></v-divider>
    <v-avatar size="130">
      <img :src="imgsrc"/>
    </v-avatar>
    <br/>
    <v-btn flat color="white" class="selectimg" @click="clickimg">选择图片</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      imgsrc:'/src/assets/xnick.jpg'
    }),
    methods:{
      clickimg:function(){
        this.$refs.myimg.click();
      },
      imgchange:function(){
        if(typeof(FileReader)!='undefined'){
          var file=this.$refs.myimg.files[0];
          var reader=new FileReader();
          reader.readAsDataURL(file);
          reader.onload=(e)=>{
            this.imgsrc=reader.result;
          }
        }
        else{
          alert("抱歉，你的浏览器不支持 FileReader");
        }
      }
    }
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
