<template>
  <v-content style="background: white;" v-scroll="onScroll">
    <v-snackbar v-model="snackbar1" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      保存成功！
      <v-btn color="pink" flat @click="snackbar1 = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      发表成功！
      <v-btn color="pink" flat @click="snackbar2 = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper">
      <Orgtoolbar :avatar="avatar"></Orgtoolbar>
    </div>
    <img :src="parallaxpath" class="large-img" ref="topimgreader" />
    <!-- <div :style="{'background':'url('+parallaxpath+')'}" class="large-img" ref="topimgreader"/></div> -->
    <div class="add-topimg-wrapper">
      <div class="add-topimg-inner">
        <v-icon size="64" color="secondary" class="add-icon" @click="addimg" :class="{'hidden':havetopimg}">photo</v-icon>
        <input type="file" hidden ref="selectimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="changetopimg" />
        <div class="add-topimgtext" :class="{'hidden':havetopimg}">
          <span>设置活动头图</span>
          <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
        </div>
        <div style="clear:both;"></div>
      </div>
      <v-text-field v-model="title" :rules="rules" counter="25" box label="填写活动标题" class="add-acttitle"></v-text-field>
    </div>
    <div class="main-wrapper">
      <Createleft :gotdata="computeddata" @sentoldtext="getoldtext" @sentdeletetext="getdeletetext" @sentreedit="getreedit"></Createleft>
      <Createright ref="rightchild" @sentbrief="getbrief" @sentrequire="getrequire" @sentparse="getparse" @sentimg="getimg" @senttopimg="gettopimg"
        @senttext="gettext" @reeditparse="getreeditfromright"></Createright>
      <div style="clear:both;"></div>
    </div>
    <div class="previeworsubmit">
      <v-btn class="preview" flat @click="openpreview">预览</v-btn>
      <v-btn class="save" flat @click="savetodraft">保存</v-btn>
      <v-btn class="submit" flat @click="publicact">发表活动</v-btn>
    </div>
    <div class="side-slider" :style=" {'left':slide}">
      <v-btn @click="moveleft" class="sort-btn">
        <v-icon class="slide-leftbutton">keyboard_arrow_left</v-icon>
        <span>顺序编辑器</span>
      </v-btn>
      <div class="slide-content">
        <div class="explain-text">拖拽调整照片或文字顺序</div>
        <!-- <div class="slide-btn">
          <v-btn flat class="slide-cancel">取消</v-btn>
          <v-btn flat class="slide-save">保存</v-btn>
          <div style="clear:both;"></div>
        </div> -->
        <div class="slide-sortwrapper">
          <div class="box-wrapper" v-for="(box,i) in computeddata" :key="i" @mouseover="mouseoverbox(i)" @mouseout="mouseoutbox(i)">
            <div class="slide-left-btn" @click="slideleftchange(i)" v-if="slidebtn[i]"></div>
            <div class="slide-right-btn" @click="sliderightchange(i)" v-if="slidebtn[i]"></div>
            <v-icon v-if="box.title=='' && box.img==''" class="slide-text">subject</v-icon>
            <img :src="box.img" class="img" v-if="box.img!=''" />
            <v-icon v-if="box.title!=''" class="slide-title">format_list_bulleted</v-icon>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div class="slide-show">
          <!-- <div class="slide-showbox" :class="{'slide-showbox-active':mouseoverbox}"> -->
          <div class="slide-showbox">
            <p class="slideshow-textbox" v-if="slidetext!=''">{{slidetext}}</p>
            <img :src="slideimg" class="slideshow-img" v-if="slideimg!=''" />
            <p class="slideshow-title" v-if="slidetitle!=''">{{slidetitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0)">
      <i class="iconfont icon-jiantou-copy-copy-copy"></i>
    </v-btn>
    <Footer></Footer>
  </v-content>
</template>

<script>
  // import Vue from 'vue'
  export default {
    data: () => ({
      y: 'top',
      snackbar1: false,
      snackbar2: false,
      color: '#E03636',
      mode: '',
      timeout: 2000,
      acturl: '',
      url1: '',
      parallaxpath: '/src/assets/createdefault.jpg',
      avatar: '',
      title: '',
      offsetTop: 0,
      slide: '100%',
      rules: [
        v => v.length <= 25 || 'Max 25 characters'
      ],
      panel: false,
      selectedform: '',
      selectedinterest: '',
      place: '',
      time: '00:00',
      brieftext: '',
      selectedparsetext: '',
      date: '2018-08-05',
      requires: [],
      parse: '',
      text: '',
      cal: 0,
      key: 0,
      img: [],
      computeddata: [],
      reedititem: 0,
      // slide
      slidetitle: '',
      slidetext: '',
      slideimg: '',
      disX: 0,
      disY: 0,
      slidebtn: [],
      mousemoveflag: false,
      org:''
    }),
    computed: {
      havetopimg: function () {
        if (this.parallaxpath == '/src/assets/createdefault.jpg') {
          return false;
        } else
          return true;
      }
    },
    created: function () {
      this.url1 = localStorage.getItem("org_url");
      this.avatar=sessionStorage.getItem("avatar");
      this.org=sessionStorage.getItem("createactorigin");
    },
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      changetopimg: function () {
        if (typeof (FileReader) != 'undefined') {
          var image_holder = this.$refs.topimgreader;
          var file = this.$refs.selectimg.files[0];
          // console.log(file);
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            // console.log(reader.result);
            // image_holder.innerHTML='<img src="'+reader.result+'" alt=""/>';
            this.parallaxpath = reader.result;
          }
        } else {
          alert("抱歉，你的浏览器不支持 FileReader");
        }
      },
      moveleft: function () {
        if (this.panel == false) {
          // if(this.text!=''){
          //   this.$set(this.computeddata ,this.cal,{
          //     title:'',
          //     text:this.text,
          //     img:'',
          //     number:this.cal
          //   });
          //   this.cal++;
          // }
          // this.text="";
          // this.textjudge++;
          var w = window.screen.availWidth;
          w -= 1440;
          this.slide = w + 'px';
          this.panel = true;
        } else {
          this.slide = '100%';
          this.panel = false;
        }
      },
      getbrief: function (d) {
        this.date = d.date,
          this.time = d.time,
          this.place = d.place,
          this.selectedform = d.selectedform;
        this.selectedinterest = d.selectedinterest;
        this.brieftext = d.brieftext;
      },
      getrequire: function (d) {
        this.requires = d;
      },
      getparse: function (d) {
        // if(this.text!=''){
        //   this.$set(this.computeddata,this.cal,{
        //     title:'',
        //     text:this.text,
        //     img:'',
        //     number:this.cal
        //   });
        //   this.cal++;
        // }
        // this.text="";
        // this.textjudge++;
        this.parse = d;
        this.$set(this.computeddata, this.cal, {
          title: d,
          text: '',
          img: '',
          number: this.cal,
          key: this.key
        });
        this.cal++;
        this.key++;
      },
      gettext: function (d) {
        this.$set(this.computeddata, this.cal, {
          title: '',
          text: '',
          img: '',
          number: this.cal,
          key: this.key
        });
        this.cal++;
        this.key++;
      },
      getimg: function (d) {
        // if(this.text!=''){
        //   this.$set(this.computeddata,this.cal,{
        //     title:'',
        //     text:this.text,
        //     img:'',
        //     number:this.cal
        //   });
        //   this.cal++;
        // }
        // this.text="";
        // this.textjudge++;
        this.img = d;
        this.$set(this.computeddata, this.cal, {
          title: '',
          text: '',
          img: d,
          number: this.cal,
          key: this.key
        });
        this.cal++;
        this.key++;
      },
      gettopimg: function (d) {
        this.parallaxpath = d;
      },
      getoldtext: function (d, i, k) {
        this.$set(this.computeddata, i, {
          title: '',
          text: d,
          img: '',
          number: i,
          key: k
        });
      },
      mouseoverbox: function (i) {
        var target = this.computeddata[i];
        if (target.title != '') {
          this.slidetitle = target.title;
          this.slidetext = '';
          this.slideimg = '';
        } else if (target.title == '' && target.img == '') {
          this.slidetext = target.text;
          this.slidetitle = '';
          this.slideimg = '';
        } else if (target.img != '') {
          this.slidetitle = '';
          this.slidetext = '';
          this.slideimg = target.img;
        }
        this.slidebtn[i] = true;
      },
      mouseoutbox: function (i) {
        this.slidebtn[i] = false;
      },
      slideleftchange: function (i) {
        var temp = {
          title: this.computeddata[i].title,
          text: this.computeddata[i].text,
          img: this.computeddata[i].img,
          number: i,
          key: this.computeddata[i].key
        };
        this.computeddata[i].title = this.computeddata[i - 1].title;
        this.computeddata[i].text = this.computeddata[i - 1].text;
        this.computeddata[i].img = this.computeddata[i - 1].img;
        this.computeddata[i].key = this.computeddata[i - 1].key;
        this.computeddata[i - 1].title = temp.title;
        this.computeddata[i - 1].text = temp.text;
        this.computeddata[i - 1].img = temp.img;
        this.computeddata[i - 1].key = temp.key;
        this.mouseoverbox(i);
      },
      sliderightchange: function (i) {
        var temp = {
          title: this.computeddata[i].title,
          text: this.computeddata[i].text,
          img: this.computeddata[i].img,
          number: i,
          key: this.computeddata[i].key
        };
        this.computeddata[i].title = this.computeddata[i + 1].title;
        this.computeddata[i].text = this.computeddata[i + 1].text;
        this.computeddata[i].img = this.computeddata[i + 1].img;
        this.computeddata[i].key = this.computeddata[i + 1].key;
        this.computeddata[i + 1].title = temp.title;
        this.computeddata[i + 1].text = temp.text;
        this.computeddata[i + 1].img = temp.img;
        this.computeddata[i + 1].key = temp.key;
        this.mouseoverbox(i);
      },
      getdeletetext: function (d) {
        this.computeddata.splice(d, 1);
        for (let k = 0; k < this.computeddata.length; k++) {
          this.computeddata[k].number = k;
        }
        this.cal--;
      },
      getreedit: function (d) {
        this.reedititem = d;
        this.$refs.rightchild.clickaddparse(this.computeddata[d].title);
      },
      getreeditfromright: function (d) {
        this.computeddata[this.reedititem].title = d;
      },
      savetodraft: function () {
        // if(this.title=='' || this.date=='' || this.time=='' || this.place=='' || this.selectedform=='' || this.selectedinterest=='' || this.brieftext==''){
        //   alert("信息未填写完整！");
        //   return;
        // }
        if(this.title==''){
          alert("请填写标题！");
          return;
        }
        if (this.acturl == '') {//如果创建新活动
          this.$http({
            method: 'post',
            url: "/activity/activities/",
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              start_at: this.date + 'T' + this.time + ':00.000000Z',
              location: this.place,
              _type: this.selectedform,
              hobby: this.selectedinterest,
              description: this.brieftext,
              owner: this.url1,
              heading: this.title,
              requirement: JSON.stringify(this.requires),
              head_img: this.parallaxpath,
              demonstration: JSON.stringify(this.computeddata)
            }
          }).then((res) => {
            this.acturl=res.data.url;
            this.snackbar1=true;
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
        else{//如果已存在活动（id）
          this.$http({
            method: 'patch',
            url:this.acturl,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              start_at: this.date + 'T' + this.time + ':00.000000Z',
              location: this.place,
              _type: this.selectedform,
              hobby: this.selectedinterest,
              description: this.brieftext,
              owner: this.url1,
              heading: this.title,
              requirement: JSON.stringify(this.requires),
              head_img: this.parallaxpath,
              demonstration: JSON.stringify(this.computeddata)
            }
          }).then((res) => {
            this.snackbar1=true;
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
      },
      publicact: function () {
        if (this.title == '' || this.date == '' || this.time == '' || this.place == '' || this.selectedform == '' ||
          this.selectedinterest == '' || this.brieftext == '') {
          alert("信息未填写完整！");
          return;
        }
        if (this.acturl == '') {//如果创建新活动
          this.$http({
            method: 'post',
            url: "/activity/activities/",
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              start_at: this.date + 'T' + this.time + ':00.000000Z',
              location: this.place,
              _type: this.selectedform,
              hobby: this.selectedinterest,
              description: this.brieftext,
              owner: this.url1,
              heading: this.title,
              requirement: JSON.stringify(this.requires),
              head_img: this.parallaxpath,
              demonstration: JSON.stringify(this.computeddata),
              want_to_be_allowed_to_publish:true,
              // 审核已过
              is_published:true
            }
          }).then((res) => {
            this.acturl=res.data.url;
            this.snackbar2=true;
            sessionStorage.removeItem("createactorigin");
            setTimeout(() => {
              this.$router.push({ name: 'orgown', params: {opt:'create'}});
            }, 2000);
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
        else{//如果已存在活动（id）
          this.$http({
            method: 'patch',
            url:this.acturl,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: {
              start_at: this.date + 'T' + this.time + ':00.000000Z',
              location: this.place,
              _type: this.selectedform,
              hobby: this.selectedinterest,
              description: this.brieftext,
              owner: this.url1,
              heading: this.title,
              requirement: JSON.stringify(this.requires),
              head_img: this.parallaxpath,
              demonstration: JSON.stringify(this.computeddata),
              want_to_be_allowed_to_publish:true,
              // 审核已过
              is_published:true
            }
          }).then((res) => {
            this.snackbar2=true;
            sessionStorage.removeItem("createactorigin");
            setTimeout(() => {
              this.$router.push({ name: 'orgown', params: {opt:'create'}});
            }, 2000);
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
      },
      openpreview:function(){
      var myDate = new Date();
      sessionStorage.setItem("preview",JSON.stringify({
          parallaxpath:this.parallaxpath,
          avatar:this.avatar,
          name:this.org,
          title:this.title,
          launchdate:myDate.getFullYear()+'-'+myDate.getMonth()+'-'+myDate.getDate(),
          isfinished:false,
          stars:5,
          introduction:this.brieftext,
          date:this.date,
          time:this.time,
          place:this.place,
          type:this.selectedform,
          interest:this.selectedinterest,
          lists:this.computeddata
      }));
      let routeData=this.$router.resolve({path:'/Orgactview'});
      window.open(routeData.href, '_blank');
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

  .previeworsubmit {
    width: 1063px;
    margin: 50px auto 150px auto;
    height: 70px;
  }

  .preview {
    width: 130px;
    height: 60px;
    border: 1px solid #bbbbbb;
    border-radius: 50px;
    font-size: 18px;
    color: #FE9246;
    margin-left: 300px;
    margin-right: 30px;
  }

  .save {
    width: 130px;
    height: 60px;
    border: 1px solid #bbbbbb;
    border-radius: 50px;
    font-size: 18px;
    color: #FE9246;
    margin-right: 30px;
  }

  .submit {
    background: #FE9246 !important;
    width: 170px;
    height: 60px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    font-size: 18px;
    color: white;
  }

  .large-img {
    margin-top: 64px;
    width: 100%;
    height: 600px;
    max-width: 100%;
    max-height: 100%;
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

  .add-acttitle {
    width: 1063px;
    margin: 235px auto 0 auto;
  }

  .add-acttitle>>>.v-input__slot {
    background: white;
  }

  .add-acttitle>>>input {
    color: #666 !important;
  }

  .side-slider {
    position: fixed;
    top: 0;
    z-index: 20;
    height: 100%;
    width: 1440px;
    background: white;
    -webkit-transition: all 350ms ease-out;
    -moz-transition: all 350ms ease-out;
    transition: all 350ms ease-out;
  }

  .side-slider .sort-btn {
    width: 80px;
    height: 170px;
    background-color: rgba(129, 130, 131, .95) !important;
    margin-top: 28%;
    margin-left: -75px;
    position: relative;
    -webkit-transition: all 300ms ease-out;
    -moz-transition: all 300ms ease-out;
    transition: all 300ms ease-out;
  }

  .side-slider .sort-btn:hover {
    -webkit-transform: translate(-5px, 0);
    -ms-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
  }

  .side-slider>>>.slide-leftbutton {
    position: absolute;
    left: -10px;
    font-size: 56px;
    color: white !important;
  }

  .side-slider>>>span {
    writing-mode: vertical-lr;
    font-size: 20px;
    color: white;
    padding-left: 15px;
  }

  .slide-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }

  .explain-text {
    font-size: 22px;
    color: #666;
    margin-top: 30px;
    margin-left: 30px;
    float: left;
  }

  .slide-btn {
    float: right;
    margin-top: 30px;
    margin-right: 60px;
  }

  /* .slide-cancel{
    background: #eee!important;
    color: #666;
  }
  .slide-cancel:hover{
    background: #FE9246!important;
    color: white;
  }
  .slide-save{
    background: #FE9246!important;
    color: white;
  }
  .slide-save:hover{
    background: #E03636!important;
  } */

  .slide-sortwrapper {
    width: 100%;
    height: 70%;
    float: left;
    padding: 20px 30px 0 30px;
    overflow-y: scroll;
  }

  .box-wrapper {
    width: 85px;
    height: 85px;
    float: left;
    margin-right: 15px;
    margin-bottom: 15px;
    border: 1px solid #bbb;
    cursor: pointer;
    position: relative;
  }

  .box-wrapper:hover {
    border: 1px solid #FE9246;
  }

  .img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border: 1px solid #bbb;
  }

  .img:hover {
    border: 1px solid #FE9246;
  }

  .slide-text,
  .slide-title {
    width: 100%;
    height: 100%;
    font-size: 76px;
    color: #ccc;
    border: 1px solid #bbb;
  }

  .slide-text:hover,
  .slide-title:hover {
    border: 1px solid #FE9246;
  }

  .slide-show {
    width: 100%;
    height: 30%;
    float: left;
    padding: 0 30px;
  }

  .slide-showbox {
    width: 320px;
    height: 180px;
    margin: 0 auto;
    border: 2px solid #FE9246;
  }

  .slide-showbox-active {
    border: 2px solid #FE9246;
  }

  .slideshow-textbox {
    width: 100%;
    height: 85%;
    padding: 7%;
    font-size: 15px;
    color: #444;
    overflow: hidden;
    word-break: break-all;
  }

  .slideshow-img {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }

  .slideshow-title {
    width: 100%;
    height: 85%;
    padding: 7%;
    color: #222;
    font-size: 24px !important;
    font-weight: 400;
    overflow: hidden;
  }

  .hidden {
    visibility: hidden;
  }

  .slide-left-btn {
    background-image: url(/src/assets/btn-left.png);
    background-size: cover;
    cursor: pointer;
    position: absolute;
    top: 35%;
    left: 0;
    width: 20px;
    height: 30px;
  }

  .slide-right-btn {
    background-image: url(/src/assets/btn-right.png);
    background-size: cover;
    cursor: pointer;
    position: absolute;
    top: 35%;
    right: 0;
    width: 20px;
    height: 30px;
  }

</style>
