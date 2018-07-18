<template>
  <v-content style="background: white;" v-scroll="onScroll">
    <div class="elevation-1 white home-toolbar-wrapper">
      <Toolbar></Toolbar>
    </div>
    <img :src="parallaxpath" class="large-img" />
    <div class="add-topimg-wrapper">
      <div class="add-topimg-inner">
        <v-icon size="64" color="secondary" class="add-icon" @click="addimg">photo</v-icon>
        <input type="file" hidden ref="selectimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="changetopimg"/>
        <div class="add-topimgtext">
          <span>设置活动头图</span>
          <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
        </div>
        <div style="clear:both;"></div>
      </div>
      <v-text-field v-model="title" :rules="rules" counter="25" box label="填写活动标题" class="add-acttitle"></v-text-field>
    </div>
    <div class="main-wrapper">
      <Createleft></Createleft>
      <Createright></Createright>
      <div style="clear:both;"></div>
    </div>
    <div class="previeworsubmit">
      <v-btn class="preview" flat>预览</v-btn>
      <v-btn class="submit" flat>发表活动</v-btn>
    </div>
    <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0, easing)">
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <Footer></Footer>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
      parallaxpath: '/src/assets/createdefault.jpg',
      img: '/src/assets/suselogo.jpg',
      title: '',
      org: '经济学院学生会',
      offsetTop: 0,
      rules:[
        v => v.length <= 25 || 'Max 25 characters'
      ]
    }),
    computed: {

    },
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      changetopimg:function(){
        alert(this.$refs.selectimg.value);
      }
    }
  }

</script>

<style scoped>
  .home-toolbar-wrapper {
    width: 100%;
    position: fixed;
    z-index: 5;
  }

  .main-wrapper {
    width: 1063px;
    margin: 0 auto;
    height: auto;
    position: relative;
  }
  .previeworsubmit{
    width: 1063px;
    margin: 50px auto 150px auto;
    height: 70px;
  }
  .preview{
    width: 130px;
    height: 60px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    font-size: 18px;
    color: #FE9246;
    margin-left:340px;
    margin-right:30px;
  }
  .submit{
    background: #FE9246!important;
    width: 170px;
    height: 60px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    font-size: 18px;
    color:white;
  }
  .large-img {
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-height: 100%;
    max-width: 100%;
  }

  .add-topimg-wrapper {
    width: 100%;
    position: absolute;
    top: 260px;
    height: 390px;
  }

  .add-topimg-inner {
    margin: 0 auto;
    width: 580px;
  }

  .add-topimg-inner i {
    float: left;
    margin-left: 80px;
  }

  .add-topimgtext {
    float: left;
    margin-left: 15px;
  }

  .add-topimgtext span {
    font-size: 20px;
    color: #333;
  }

  .add-topimgtext p {
    margin-top: 8px;
    font-size: 16px;
    color: #666;
  }

  .add-icon {
    cursor: pointer;
  } 
  .add-acttitle{
    width: 1063px;
    margin: 235px auto 0 auto;
  }
  .add-acttitle>>>.v-input__slot{
    background: white;
  }
  .add-acttitle>>>input{
    color: #666!important;
  }
</style>
