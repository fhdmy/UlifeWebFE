<template>
  <div class="rank-wrapper">
    <input type="file" hidden ref="selectavatar" accept="image/png, image/jpeg, image/gif, image/jpg" @change="avatarchange"
    />
    <input type="file" hidden ref="selecttopimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="topimgchange"
    />
    <input type="file" hidden ref="selectimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange" multiple/>
    <v-dialog v-model="openavatar" persistent max-width="500px">
      <div class="menu-div" slot="activator" ref="addavatar" @click="changeavatar">
        <v-icon>{{items[0].iconname}}</v-icon>
        <span>{{items[0].text}}</span>
      </div>
      <v-card>
        <v-card-text>
          <v-avatar size="130">
            <img :src="avatar0" />
          </v-avatar>
          <v-btn flat @click="addavatar" class="avatarbtn">{{items[0].text}}</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="openavatar = false" @click="deleteavatar">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click.native="openavatar = false" @click="sendavatartoparent">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="menu-addimg menu-div" slot="activator" @click="addtopimg">
      <v-icon>{{items[1].iconname}}</v-icon>
      <span>{{items[1].text}}</span>
    </div>
    <div class="menu-addimg menu-div" slot="activator" @click="addimg">
      <v-icon>{{items[2].iconname}}</v-icon>
      <span>{{items[2].text}}</span>
    </div>
    <v-dialog v-model="insertphase" persistent max-width="500px">
      <div class="menu-div" slot="activator" ref="inserttitle">
        <v-icon>{{items[3].iconname}}</v-icon>
        <span>{{items[3].text}}</span>
      </div>
      <v-card>
        <v-card-title>
          <span class="headline">插入标题</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-text-field label="请输入段落名称" counter="20" v-model="selectedparsetext"></v-text-field>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="deleteparsedata">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click="sendparsetoparent">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="menu-addimg menu-div" slot="activator" @click="addtext">
      <v-icon>{{items[4].iconname}}</v-icon>
      <span>{{items[4].text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['avatar0','imgparam','imglocaldisplay'], //用于展示
    data: () => ({
      avatar: '', //用于展示
      requestavatar: null, //用于发送请求
      openavatar: false,
      insertphase: false,
      selectedparsetext: '',
      reedit: false,
      forms: ['比赛', '分享', '互动'],
      interests: ['游戏', '影视', '棋牌', '文化艺术', '运动/户外', '学术科技', '社会科学', '公益', '实践'],
      items: [{
          iconname: 'label',
          text: '更换头像',
        },
        {
          iconname: 'photo_library',
          text: '更改背景',
        },
        {
          iconname: 'photo',
          text: '插入图片',
          path: 'insertimg'
        },
        {
          iconname: 'format_list_bulleted',
          text: '插入标题',
          path: 'insertphase'
        },
        {
          iconname: 'subject',
          text: '插入文本',
          path: 'inserttext'
        }
      ],
    }),
    created: function () {
      this.avatar = this.avatar0;
    },
    methods: {
      changeavatar: function () {
        if (this.avatar0 == "")
          this.avatar0 = this.avatar;
        else
          return;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      addtopimg: function () {
        this.$refs.selecttopimg.click();
      },
      addavatar: function () {
        this.$refs.selectavatar.click();
      },
      save: function (date) {
        this.$refs.menu.save(date)
      },
      deleteavatar: function () {
        setTimeout(() => {
          this.avatar0 = '';
        }, 100); //防止闪烁
      },
      deleteparsedata: function () {
        this.selectedparsetext = '';
        this.reedit = false;
        this.insertphase = false;
      },
      sendparsetoparent: function () {
        if (this.selectedparsetext.length > 20) {
          alert("超过字数啦！");
          return;
        }
        if (this.selectedparsetext != '') {
          if (this.reedit) {
            this.$emit("reeditparse", this.selectedparsetext);
            this.selectedparsetext = "";
            this.reedit = false;
            this.insertphase = false;
            return;
          }
          this.$emit("sentparse", this.selectedparsetext);
          this.selectedparsetext = "";
        }
        this.insertphase = false;
      },
      sendavatartoparent: function () {
        if(this.avatar0=='/src/assets/defaultavatar.png'){
          return;
        }
        this.$http({
          method: 'post',
          url: '/account/user-avatar-upload/',
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": "Token " + localStorage.getItem("token")
          },
          data: this.requestavatar
        }).then((res) => {
          this.avatar = this.avatar0;
          this.$emit("sentavatar", this.avatar);
        }).catch(function (error) {
          alert("传输故障，注册失败！");
        });
      },
      imgchange: function (e) {
        var files = e.target.files;
        var len=this.imglocaldisplay.length;
        for(let k=0;k<files.length;k++){
          this.imgparam.set('file'+(k+len), files[files.length-k-1]); //通过append向form对象添加数据//神tm反向顺序！！
          if (!this.imgparam.get('file'+(k+len))) {
            alert("打开文件失败！");
            return;
          } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          this.$set(this.imglocaldisplay,len+k,window.URL.createObjectURL(files[files.length-k-1]));//本地预览;//神tm反向顺序！！
          this.$emit("sentimg",k);
          for(let k=0;k<5;k++){
        }
        }
        e.target.value=null;//解决change无效
      },
      avatarchange: function (e) {
        var file = e.target.files[0];
        var param = new FormData(); //创建form对象
        param.append('file', file); //通过append向form对象添加数据
        if (!param.get('file')) {
          alert("打开文件失败！");
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.avatar0 = window.URL.createObjectURL(e.target.files[0]); //本地预览;
        this.requestavatar = param;
      },
      topimgchange: function (e) {
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
          this.$emit("senttopimg", head_img);
        }).catch(function (error) {
          alert("传输故障，注册失败！");
        });
      },
      addtext: function () {
        this.$emit("senttext", true);
      },
      clickaddparse: function (title) {
        this.selectedparsetext = title;
        this.$refs.inserttitle.click();
        this.reedit = true;
      }
    }
  }

</script>

<style scoped>
  .v-avatar {
    margin-left: 60px;
    margin-top: 25px;
  }

  .avatarbtn {
    background: #FE9246 !important;
    margin: 35px 0 10px 75px;
    width: 130px;
    color: white;
  }

  .rank-wrapper {
    width: 266.41px;
    height: 336px;
    background: white;
    float: right;
    margin-top: 25px;
  }

  .rank-wrapper>>>.v-dialog__container {
    width: 70%;
    float: right;
  }

  .v-card>>>.v-card__title {
    padding-bottom: 0 !important;
  }

  .rank-wrapper>>>.menu-addimg {
    width: 70%;
    float: right;
  }

  .rank-wrapper .menu-div {
    line-height: 46px;
    margin-bottom: 8px;
    cursor: pointer;
  }

  .rank-wrapper .menu-div:hover {
    background: #dddddd;
  }

  .rank-wrapper .menu-div a {
    display: block;
    width: 100%;
    height: 100%;
  }

  .rank-wrapper .menu-div span {
    color: #666;
    font-size: 18px;
  }

  .rank-wrapper .menu-div i {
    color: #FE9246;
    font-size: 28px;
    margin: 0 10px 0 24px;
    position: relative;
    top: 5px;
  }

  .v-dialog__content>>>textarea {
    margin-top: 10px;
    resize: none;
    color: #666 !important;
    height: 180px;
  }

  .delete {
    color: #FE9246;
    cursor: pointer;
    margin-left: 30px;
    margin-top: 22px;
    display: inline-block;
  }

  .addopt {
    color: #FE9246;
    cursor: pointer;
    padding-left: 24px;
    font-size: 18px;
    width: 110px;
    margin-top: 15px;
  }

  .text-wrapper {
    width: 400px;
    height: 50px;
    padding-left: 24px;
  }

  .text-wrapper>>>.v-input {
    width: 300px;
    display: inline-block;
  }

</style>
