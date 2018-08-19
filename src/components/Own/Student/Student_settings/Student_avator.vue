<template>
  <div class="edit-content">
    <v-snackbar v-model="snackbar" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      更换成功！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <input type="file" hidden ref="myimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange" multiple/>
    <p class="inform-title">我的头像</p>
    <v-divider class="mb-4"></v-divider>
    <v-avatar size="130">
      <img :src="imgsrc" />
    </v-avatar>
    <br/>
    <v-btn flat color="white" class="selectimg" @click="clickimg">选择图片</v-btn>
  </div>
</template>

<script>
  export default {
    props: ['userurl', 'imgsrc'],
    data: () => ({
      y: 'top',
      snackbar: false,
      color: '#E03636',
      mode: '',
      timeout: 2000,
    }),
    // watch:{
    //   imgsrc:function(){
    //     this.img=this.imgsrc;
    //   }
    // },
    watch: {
      imgsrc: function (val) {
        this.$emit("update:imgsrc", val);
      }
    },
    methods: {
      clickimg: function () {
        this.$refs.myimg.click();
      },
      imgchange: function (e) {
        var file = e.target.files[0];
        var param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        if (!param.get('file')) {
          this.$emit("getopenfile_failed");
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        var winurl=window.URL.createObjectURL(e.target.files[0]);//本地预览
        this.$http({
          method: 'post',
          url: '/account/user-avatar-upload/',
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem("token")
          },
          data:param
        }).then((res) => {
          this.imgsrc=winurl;
          this.snackbar = true;
          sessionStorage.setItem("avatar",this.imgsrc);
        }).catch(function (error) {
          console.log(error.response);
          this.$emit("getrequest_failed");
        });
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

  .selectimg {
    background: #FE9246 !important;
    margin: 40px 0 10px 0;
    width: 130px;
  }

</style>
