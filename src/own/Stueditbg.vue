<template>
  <div class="edit-content">
    <input type="file" hidden ref="mybg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange"/>
    <p class="inform-title">我的背景</p>
    <v-divider class="mb-4"></v-divider>
      <img :src="imgsrc"/>
    <br/>
    <v-btn flat color="white" class="selectimg" @click="clickbg">选择图片</v-btn>
  </div>
</template>

<script>
  export default {
    props:["userurl","imgsrc"],
    data: () => ({
 
    }),
    methods:{
      clickbg:function(){
        this.$refs.mybg.click();
      },
      imgchange:function(){
        if(typeof(FileReader)!='undefined'){
          var file=this.$refs.mybg.files[0];
          var reader=new FileReader();
          reader.readAsDataURL(file);
          reader.onload=(e)=>{
            // 发送数据到服务器
            this.$http({
              method: 'patch',
              url: this.userurl,
              headers: {
                "Authorization": "Token " + localStorage.getItem("token")
              },
              data: {
                bg_img:reader.result
              }
            }).then((res) => {
              // 成功则改变本地view
              this.imgsrc = reader.result;
            }).catch(function (error) {
              alert("传输故障，注册失败！");
            });
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
