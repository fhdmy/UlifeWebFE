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
    <v-snackbar v-model="request_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      网络传输故障！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="openfile_failed" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      打开文件失败！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="overwrite" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      超过字数啦！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="information_valid" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      信息未填写完整！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="head_img_valid" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      活动封面未设置！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-snackbar v-model="heading_valid" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      请填写标题！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <div class="elevation-1 white home-toolbar-wrapper">
      <Org-toolbar :avatar="avatar"></Org-toolbar>
    </div>
    <img :src="parallaxpath" class="large-img" ref="topimgreader" />
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
      <Reedit-body :gotdata="computeddata" @sentdeletetext="getdeletetext" @sentreedit="getreedit" @sentreedittext="sentreedittext" 
        :imglocaldisplay="imglocaldisplay"></Reedit-body>
      <Reedit-options ref="rightchild" @sentbrief="getbrief" @sentrequire="getrequire" @sentparse="getparse" @sentimg="getimg"
        @senttopimg="gettopimg" @reeditparse="getreeditfromright" :brieftext="brieftext" :brieftext0="brieftext"
        :selectedinterest="selectedinterest" :selectedinterest0="selectedinterest" :place="place" :place0="place" :date="date"
        :date0="date" :time="time" :time0="time" :selectedform="selectedform" :selectedform0="selectedform" :opts="requires"
        :imgparam="imgparam" :imglocaldisplay="imglocaldisplay" :head_imgparam="head_imgparam" :class="{'isfixed':fixed}" @getopenfile_failed="getopenfile_failed"
        @getoverwrite="getoverwrite" @textsave="textsave" @reedittextsave="reedittextsave"
        ></Reedit-options>
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
          <div class="slide-showbox">
            <p class="slideshow-textbox" v-if="slidetype=='text'">{{slideinner}}</p>
            <img :src="slideinner" class="slideshow-img" v-if="slidetype=='img'" />
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
  export default {
    props: ['opt'],
    data: () => ({
      y: 'top',
      snackbar1: false,
      snackbar2: false,
      request_failed: false,
      openfile_failed: false,
      overwrite: false,
      information_valid: false,
      head_img_valid: false,
      heading_valid: false,
      color: '#E03636',
      mode: '',
      timeout: 2000,
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
      requires: [{
        type: 'text',
        inner: ''
      }],
      parse: '',
      text: '',
      cal: 0,
      key: 0,
      img: [],
      computeddata: [],
      reedititem: 0,
      slidetype: '',
      slideinner: '',
      disX: 0,
      disY: 0,
      slidebtn: [],
      mousemoveflag: false,
      org: '',
      actid: 0,
      imgparam: null,
      imglocaldisplay: [],
      head_imgparam: null,
      acturl: '',
      textinput:'',
    }),
    computed: {
      havetopimg: function () {
        if (this.parallaxpath == '/src/assets/createdefault.jpg') {
          return false;
        } else
          return true;
      },
      fixed: function () {
        var k = this.offsetTop;
        if (k >= 599) {
          return true;
        } else
          return false;
      }
    },
    created: function () {
      this.url1 = localStorage.getItem("org_url");
      this.avatar = sessionStorage.getItem("avatar");
      this.org = sessionStorage.getItem("editactorigin");
      this.imgparam = new FormData(); //创建form对象
      this.head_imgparam = new FormData();
      // 获得信息
      this.$http({
        method: 'get',
        url: '/activity/activities/' + this.opt + '/',
        headers: {
          "Authorization": "Token " + localStorage.getItem("token")
        }
      }).then((res) => {
        this.acturl = res.data.url;
        var url = this.acturl.split("/");
        this.actid = url[5];
        var computeddate = res.data.created_at.split('T');
        var computedstart = res.data.start_at.split('T');
        var comutedstarttime = computedstart[1].split(':');
        if (res.data.head_img != null) {
          this.parallaxpath = res.data.head_img;
        }
        this.head_imgparam.set("file", "img");
        if (res.data.demonstration != null) {
          this.computeddata = JSON.parse(res.data.demonstration);
          // 设置formdata对象和localdisplay数组
          for (let k = 0; k < this.computeddata.length; k++) {
            if (this.computeddata[k].type == 'text') {
              this.imgparam.append("file" + k, 'text');
              this.$set(this.imglocaldisplay, k, 'text');
            } else if (this.computeddata[k].type == 'title') {
              this.imgparam.append("file" + k, 'title');
              this.$set(this.imglocaldisplay, k, 'title');
            } else {
              this.imgparam.append("file" + k, 'img');
              this.$set(this.imglocaldisplay, k, this.computeddata[k].inner);
            }
            this.computeddata[k].key=k;
            this.key++;
          }
        }
        this.brieftext = res.data.description;
        this.title = res.data.heading;
        this.selectedinterest = res.data.hobby;
        this.place = res.data.location;
        this.date = computedstart[0];
        this.time = comutedstarttime[0] + ':' + comutedstarttime[1];
        this.selectedform = res.data._type;
        this.requires = JSON.parse(res.data.requirement);
        this.cal = this.computeddata.length;
      }).catch((error)=>{
        console.log(error.response);
        if (!this.request_failed) {
          this.request_failed = true;
        }
      });
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
        this.head_imgparam.set('file', file); //通过append向form对象添加数据
        if (!this.head_imgparam.get('file')) {
          this.openfile_failed = true;
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        var head_img = window.URL.createObjectURL(e.target.files[0]); //本地预览;
        this.parallaxpath = head_img;
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
      gettopimg: function (d) {
        this.parallaxpath = d;
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
        this.imgparam.set("file" + d, "none");
        var len = 0;
        while (this.imgparam.get("file" + len)) {
          len++;
        }
        for (let k = d + 1; k < len; k++) {
          var temp = this.imgparam.get("file" + (k - 1));
          this.imgparam.set("file" + (k - 1), this.imgparam.get("file" + k));
          this.imgparam.set("file" + k, temp);
        } //因为imgparam无法彻底删除key
        this.cal--;
      },
      getreedit: function (d) {
        this.reedititem = d;
        this.$refs.rightchild.clickaddparse(this.computeddata[d].inner);
      },
      getreeditfromright: function (d) {
        this.computeddata[this.reedititem].inner = d;
      },
      savetodraft: function () {
        if (this.title == '') {
          this.heading_valid = true;
          return;
        }
        // 头图
        if (this.parallaxpath == "/src/assets/createdefault.jpg") {
          this.head_img_valid = true;
          return;
        }
        if (this.head_imgparam.get("file") == "img") {
          this.save_mainrequest(this.parallaxpath);
        } else {
          var head_img_url;
          this.$http({
            method: 'post',
            url: '/activity/act-head-img-upload/',
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: this.head_imgparam
          }).then((res) => {
            head_img_url = "http://222.186.36.156:8000" + res.data.bg_img;
            this.save_mainrequest(head_img_url);
          }).catch((error)=>{
            console.log(error.response);
            if (!this.request_failed) {
              this.request_failed = true;
            }
          });
        }
      },
      publicact: function () {
        if (this.title == '' || this.date == '' || this.time == '' || this.place == '' || this.selectedform ==
          '' ||
          this.selectedinterest == '' || this.brieftext == '') {
          this.information_valid = true;
          return;
        }
        if (this.parallaxpath == "/src/assets/createdefault.jpg") {
          this.head_img_valid = true;
          return;
        }
        if (this.head_imgparam.get("file") == "img") {
          this.public_mainrequest(this.parallaxpath);
        } else {
          var head_img_url;
          this.$http({
            method: 'post',
            url: '/activity/act-head-img-upload/',
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data: this.head_imgparam
          }).then((res) => {
            head_img_url = "http://222.186.36.156:8000" + res.data.bg_img;
            this.public_mainrequest(head_img_url);
          }).catch((error)=>{
            console.log(error.response);
            if (!this.request_failed) {
              this.request_failed = true;
            }
          });
        }
      },
      save_mainrequest: function (head_img_url) {
        // 正文、需求、简介
        this.$http({
          method: 'post',
          url: "/activity/act-demo-upload/",
          headers: {
            "Authorization": "Token " + localStorage.getItem("token"),
            "Content-Type": 'multipart/form-data'
          },
          data: this.imgparam
        }).then((res) => {
          var j = 0;
          for (let k = 0; k < this.computeddata.length; k++) {
            if (this.computeddata[k].type == "img" && this.computeddata[k].inner.length == 0) {
              this.computeddata[k].inner = "http://222.186.36.156:8000" + res.data.l_img[j++] + '.thumbnail.0.jpg';
            }
          }
          this.$http({
            method: 'patch',
            url: this.acturl,
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
              head_img: head_img_url,
              key:this.key
            }
          }).then((res) => {
            this.snackbar1 = true;
          }).catch(function (error) {
            console.log(error.response);
            if (!this.request_failed) {
              this.request_failed = true;
            }
          });
        }).catch((error)=>{
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      public_mainrequest(head_img_url) {
        // 正文、需求、简介
        this.$http({
          method: 'post',
          url: "/activity/act-demo-upload/",
          headers: {
            "Authorization": "Token " + localStorage.getItem("token"),
            "Content-Type": 'multipart/form-data'
          },
          data: this.imgparam
        }).then((res) => {
          var j = 0;
          for (let k = 0; k < this.computeddata.length; k++) {
            if (this.computeddata[k].type == "img" && this.computeddata[k].inner.length == 0) {
              this.computeddata[k].inner = "http://222.186.36.156:8000" + res.data.l_img[j++] + '.thumbnail.0.jpg';
            }
          }
          this.$http({
            method: 'patch',
            url: this.acturl,
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
              demonstration: JSON.stringify(this.computeddata),
              head_img: head_img_url,
              want_to_be_allowed_to_publish: true,
              key:this.key,
              is_published: true //开挂  以后删除
            }
          }).then((res) => {
            this.snackbar2 = true;
            setTimeout(() => {
              this.$router.push({
                name: 'org_own',
                params: {
                  opt: 'draft'
                }
              });
            }, 2000);
          }).catch((error)=>{
            console.log(error.response);
            if (!this.request_failed) {
              this.request_failed = true;
            }
          });
        }).catch((error)=>{
          console.log(error.response);
          if (!this.request_failed) {
            this.request_failed = true;
          }
        });
      },
      openpreview: function () {
        var myDate = new Date();
        sessionStorage.setItem("preview", JSON.stringify({
          parallaxpath: this.parallaxpath,
          avatar: this.avatar,
          name: this.org,
          title: this.title,
          launchdate: myDate.getFullYear() + '-' + myDate.getMonth() + '-' + myDate.getDate(),
          isfinished: false,
          stars: 5,
          introduction: this.brieftext,
          date: this.date,
          time: this.time,
          place: this.place,
          type: this.selectedform,
          interest: this.selectedinterest,
          lists: this.computeddata
        }));
        sessionStorage.setItem("previewimg", JSON.stringify(this.imglocaldisplay));
        let routeData = this.$router.resolve({
          path: '/activity_preview'
        });
        window.open(routeData.href, '_blank');
      },
      textsave:function(d){
        this.$set(this.computeddata, this.cal, {
          type: 'text',
          inner: d,
          number: this.cal,
          key: this.key
        });
        var len = this.imglocaldisplay.length;
        this.imgparam.set("file" + len, 'text');
        this.$set(this.imglocaldisplay, len, 'text'); //本地预览;
        this.cal++;
        this.key++;
      },
      sentreedittext:function(d){
        this.reedititem = d;
        this.$refs.rightchild.clickaddtext(this.computeddata[d].inner);
      },
      reedittextsave:function(d){
        this.computeddata[this.reedititem].inner = d;
      },
      getoverwrite:function(){
        this.overwrite=true;
      },
      getopenfile_failed(){
        this.openfile_failed=true;
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

  .isfixed {
    position: fixed;
    z-index: 7;
    top: 68px;
    margin-left: 796.59px;
    width: 100%;
  }

</style>
