<template>
  <v-content style="background: white;" v-scroll="onScroll">
    <v-snackbar v-model="snackbar1" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      保存成功！
      <v-btn color="pink" flat @click="snackbar1 = false">关闭</v-btn>
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
          <span>设置背景图片</span>
          <p>图片建议选择尺寸大于1680px的高清大图，如相机原图</p>
        </div>
        <div style="clear:both;"></div>
      </div>
    </div>
    <div class="main-wrapper">
      <Reeditleft :gotdata="computeddata" @sentoldtext="getoldtext" @sentdeletetext="getdeletetext" @sentreedit="getreedit" :deleted="deleted"
        :imglocaldisplay="imglocaldisplay" :draftflag="true"></Reeditleft>
      <Createinformright ref="rightchild" @sentavatar="getavatar" @sentparse="getparse" @sentimg="getimg" @senttopimg="gettopimg"
        @senttext="gettext" @reeditparse="getreeditfromright" :avatar0="avatar" :imgparam="imgparam" :imglocaldisplay="imglocaldisplay"></Createinformright>
      <div style="clear:both;"></div>
    </div>
    <div class="previeworsubmit">
      <v-btn class="submit" flat @click="savetodraft">保存</v-btn>
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
            <v-icon v-if="box.type=='text'" class="slide-text">subject</v-icon>
            <img :src="imglocaldisplay[i]" class="img" v-if="box.type=='img'" />
            <v-icon v-if="box.type=='title'" class="slide-title">format_list_bulleted</v-icon>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div class="slide-show">
          <!-- <div class="slide-showbox" :class="{'slide-showbox-active':mouseoverbox}"> -->
          <div class="slide-showbox">
            <p class="slideshow-textbox" v-if="slidetype=='text'">{{slideinner}}</p>
            <img v-lazy="slideinner" class="slideshow-img" v-if="slidetype=='img'" />
            <p class="slideshow-title" v-if="slidetype=='title'">{{slideinner}}</p>
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
    props: ['opt'],
    data: () => ({
      y: 'top',
      snackbar1: false,
      snackbar2: false,
      color: '#E03636',
      mode: '',
      timeout: 2000,
      url1: '',
      parallaxpath: '/src/assets/createdefault.jpg',
      avatar: '',
      org: '',
      offsetTop: 0,
      slide: '100%',
      panel: false,
      selectedparsetext: '',
      parse: '',
      text: '',
      cal: 0,
      key: 0,
      img: [],
      computeddata: [],
      reedititem: 0,
      // slide
      slideinner: '',
      slidetype: '',
      disX: 0,
      disY: 0,
      slidebtn: [],
      mousemoveflag: false,
      deleted: false,
      imgparam: null,
      imglocaldisplay: []
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
      this.imgparam = new FormData(); //创建form对象
      this.avatar = sessionStorage.getItem("avatar");
      this.url1 = localStorage.getItem("org_url");
      if (JSON.parse(sessionStorage.getItem("lists")) != null) {
        this.computeddata = JSON.parse(sessionStorage.getItem("lists"));
        for(let k=0;k<this.computeddata.length;k++){
          if(this.computeddata[k].type=='text'){
            this.imgparam.append("file" + k, 'text');
            this.$set(this.imglocaldisplay, k, 'text');
          }
          else if(this.computeddata[k].type=='title'){
            this.imgparam.append("file" + k, 'title');
            this.$set(this.imglocaldisplay, k, 'title');
          }
          else{
            this.imgparam.append("file" + k, 'img');
            this.$set(this.imglocaldisplay, k,this.computeddata[k].inner);
          }
        }
      }
      if (sessionStorage.getItem("bg_img") != null) {
        this.parallaxpath = sessionStorage.getItem("bg_img");
      }
      this.cal = this.computeddata.length;
      this.key = this.cal;
    },
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      changetopimg: function (e) {
        var file = e.target.files[0];
        var param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        if (!param.get('file')) {
          alert("打开文件失败！");
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        var head_img = window.URL.createObjectURL(e.target.files[0]); //本地预览;
        this.$http({
          method: 'post',
          url: '/account/user-bg-img-upload/',
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem("token")
          },
          data: param
        }).then((res) => {
          this.parallaxpath = head_img;
        }).catch(function (error) {
          alert("传输故障，注册失败！");
        });
      },
      moveleft: function () {
        if (this.panel == false) {
          var w = window.screen.availWidth;
          w -= 1440;
          this.slide = w + 'px';
          this.panel = true;
        } else {
          this.slide = '100%';
          this.panel = false;
        }
      },
      getparse: function (d) {
        this.parse = d;
        this.$set(this.computeddata, this.cal, {
          type: 'title',
          inner: d,
          number: this.cal,
          key: this.key
        });
        var len = this.imglocaldisplay.length;
        this.imgparam.set("file" + len, 'title');
        this.$set(this.imglocaldisplay, len, 'title'); //本地预览;
        this.cal++;
        this.key++;
      },
      gettext: function (d) {
        this.$set(this.computeddata, this.cal, {
          type: 'text',
          inner: '',
          number: this.cal,
          key: this.key
        });
        var len = this.imglocaldisplay.length;
        this.imgparam.set("file" + len, 'text');
        this.$set(this.imglocaldisplay, len, 'text'); //本地预览;
        this.cal++;
        this.key++;
      },
      getimg: function (d) {
        this.$set(this.computeddata, this.cal, {
          type: 'img',
          inner: '',
          number: this.cal,
          key: this.key
        });
        this.cal++;
        this.key++;
      },
      getavatar: function (d) {
        this.avatar = d;
      },
      gettopimg: function (d) {
        this.parallaxpath = d;
      },
      getoldtext: function (d, i, k) {
        this.$set(this.computeddata, i, {
          type: 'text',
          inner: d,
          number: i,
          key: k
        });
      },
      mouseoverbox: function (i) {
        var target = this.computeddata[i];
        if (target.type == 'title') {
          this.slideinner = target.inner;
          this.slidetype = 'title';
        } else if (target.type == 'text') {
          this.slideinner = target.inner;
          this.slidetype = 'text';
        } else if (target.type == 'img') {
          this.slideinner = this.imglocaldisplay[i];
          this.slidetype = 'img';
        }
        this.slidebtn[i] = true;
      },
      mouseoutbox: function (i) {
        this.slidebtn[i] = false;
      },
      slideleftchange: function (i) {
        var temp = {
          type: this.computeddata[i].type,
          inner: this.computeddata[i].inner,
          number: i,
          key: this.computeddata[i].key,
          img: this.imglocaldisplay[i],
          imgparam: this.imgparam.get("file" + i)
        };
        this.computeddata[i].type = this.computeddata[i - 1].type;
        this.computeddata[i].inner = this.computeddata[i - 1].inner;
        this.imglocaldisplay[i] = this.imglocaldisplay[i - 1]; //图片本地预览
        this.computeddata[i].key = this.computeddata[i - 1].key;
        this.computeddata[i - 1].type = temp.type;
        this.computeddata[i - 1].inner = temp.inner;
        this.imglocaldisplay[i - 1] = temp.img; //图片本地预览
        this.computeddata[i - 1].key = temp.key;
        this.imgparam.set("file" + i, this.imgparam.get("file" + (i - 1)));
        this.imgparam.set("file" + (i - 1), temp.imgparam);
        this.mouseoverbox(i);
      },
      sliderightchange: function (i) {
        var temp = {
          type: this.computeddata[i].type,
          inner: this.computeddata[i].inner,
          number: i,
          key: this.computeddata[i].key,
          img: this.imglocaldisplay[i],
          imgparam: this.imgparam.get("file" + i)
        };
        this.computeddata[i].type = this.computeddata[i + 1].type;
        this.computeddata[i].inner = this.computeddata[i + 1].inner;
        this.imglocaldisplay[i] = this.imglocaldisplay[i + 1]; //图片本地预览
        this.computeddata[i].key = this.computeddata[i + 1].key;
        this.computeddata[i + 1].type = temp.type;
        this.computeddata[i + 1].inner = temp.inner;
        this.imglocaldisplay[i + 1] = temp.img; //图片本地预览
        this.computeddata[i + 1].key = temp.key;
        this.imgparam.set("file" + i, this.imgparam.get("file" + (i + 1)));
        this.imgparam.set("file" + (i + 1), temp.imgparam);
        this.mouseoverbox(i);
      },
      getdeletetext: function (d) {
        this.computeddata.splice(d, 1);
        for (let k = 0; k < this.computeddata.length; k++) {
          this.computeddata[k].number = k;
        }
        this.imglocaldisplay.splice(d, 1);
        this.imgparam.set("file" + d,"none");
        var len = 0;
        while(this.imgparam.get("file"+len)){
          len++;
        }
        for(let k=d+1;k<len;k++){
          var temp=this.imgparam.get("file"+(k-1));
          this.imgparam.set("file"+(k-1),this.imgparam.get("file"+k));
          this.imgparam.set("file"+k,temp);
        }//因为imgparam无法彻底删除key
        this.cal--;
        this.deleted = !this.deleted;
      },
      getreedit: function (d) {
        this.reedititem = d;
        this.$refs.rightchild.clickaddparse(this.computeddata[d].inner);
      },
      getreeditfromright: function (d) {
        this.computeddata[this.reedititem].inner = d;
      },
      savetodraft: function () {
        this.$http({
          method: 'post',
          url: '/account/org-demo-upload/',
          headers: {
            "Authorization": "Token " + localStorage.getItem("token"),
            "Content-Type": 'multipart/form-data'
          },
          data: this.imgparam
        }).then((res) => {
          var j=0;
          for(let k=0;k<this.computeddata.length;k++){
            if(this.computeddata[k].type=="img" && this.computeddata[k].inner.length==0){
              this.computeddata[k].inner="http://222.186.36.156:8000"+res.data.l_img[j++];
            }
          }
          //将数组发送给后端
          this.$http({
            method: 'patch',
            url: this.url1,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data:{
              demonstration:JSON.stringify(this.computeddata)
            }
          }).then((res) => {
            this.snackbar1 = true;
            setTimeout(() => {
              sessionStorage.removeItem("lists");
              sessionStorage.removeItem("bg_img");
              sessionStorage.setItem("avatar", this.avatar);
              this.$router.push({
                name: 'orgown',
                params: {
                  opt: 'inform'
                }
              });
            }, 2000);
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }).catch(function (error) {
          alert("网络传输故障！");
        });
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

  .submit {
    background: #FE9246 !important;
    width: 130px;
    height: 60px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    font-size: 18px;
    color: white;
    margin-left: 320px;
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
    top: 330px;
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
