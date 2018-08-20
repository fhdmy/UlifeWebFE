<template>
  <div class="rank-wrapper">
    <input type="file" hidden ref="selecttopimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="topimgchange"
    />
    <input type="file" hidden ref="selectimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange" multiple/>
    <v-dialog v-model="brief" persistent max-width="500px">
      <div class="menu-div" slot="activator" @click="changedata">
        <v-icon>{{items[0].iconname}}</v-icon>
        <span>{{items[0].text}}</span>
      </div>
      <v-card @keyup.13="sendbrieftoparent()">
        <v-card-title>
          <span class="headline">活动简介</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date0" lazy transition="scale-transition"
                  offset-y full-width min-width="290px">
                  <v-text-field slot="activator" label="时间" readonly v-model="date0"></v-text-field>
                  <v-date-picker v-model="date0" @input="$refs.menu.save(date0)"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field value="12:30:00" type="time" suffix="PST" v-model="time0"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="地点" required v-model="place0"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="forms" label="形式" v-model="selectedform0"></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select :items="interests" label="兴趣" v-model="selectedinterest0"></v-select>
              </v-flex>
              <v-flex xs12>
                <v-textarea name="input-7-1" label="活动简介" value="在这里简要介绍本次活动" v-model="brieftext0"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="deletebriefdata">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click="sendbrieftoparent">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="myrequire" persistent max-width="500px">
      <div class="menu-div" slot="activator">
        <v-icon>{{items[1].iconname}}</v-icon>
        <span>{{items[1].text}}</span>
      </div>
      <v-card @keyup.13="sendrequiretoparent()">
        <v-card-title>
          <span class="headline">报名需求</span>
        </v-card-title>
        <v-card-text class="pb-0">
          <div class="text-wrapper" v-for="(opt,i) in opts" :key="i">
            <v-text-field label="您可以在这里输入额外的报名需求" v-model="opts[i].inner" v-if="opts[i].type=='text'"></v-text-field>
            <div class="delete" @click="deleteopt(i)" v-if="opts[i].type=='text'">删除</div>
            <v-text-field label="输入选择框（标题）" v-model="opts[i].title" v-if="opts[i].type=='select'" class="select-field"></v-text-field>
            <div class="delete" @click="addselectinner(i)" v-if="opts[i].type=='select'">添加选项</div>
            <div class="delete" @click="deleteopt(i)" v-if="opts[i].type=='select'">删除</div>
            <div v-for="(sel,k) in opt.inner" :key="k" v-if="opt.type=='select'">
              <v-text-field label="输入选择框（选项）" v-model="opts[i].inner[k]" class="select-field"></v-text-field>
              <div class="delete" @click="deleteselect(i,k)" v-if="opts[i].type=='select'">删除</div>
            </div>
          </div>
          <div>
            <div class="addopt" @click="addopt">添加输入框</div>
            <div class="addselect" @click="addselect">添加选择框</div>
            <div style="clear:both;"></div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="blue darken-1" flat @click="deleterequiredata">关闭</v-btn> -->
          <v-btn color="blue darken-1" flat @click="sendrequiretoparent">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="menu-addimg menu-div" slot="activator" @click="addtopimg">
      <v-icon>{{items[2].iconname}}</v-icon>
      <span>{{items[2].text}}</span>
    </div>
    <div class="menu-addimg menu-div" slot="activator" @click="addimg">
      <v-icon>{{items[3].iconname}}</v-icon>
      <span>{{items[3].text}}</span>
    </div>
    <v-dialog v-model="insertphase" persistent max-width="500px">
      <div class="menu-div" slot="activator" ref="inserttitle">
        <v-icon>{{items[4].iconname}}</v-icon>
        <span>{{items[4].text}}</span>
      </div>
      <v-card @keyup.13="sendparsetoparent()">
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
    <v-dialog v-model="textdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <div class="menu-div" slot="activator" ref="inserttext">
          <v-icon>{{items[5].iconname}}</v-icon>
          <span>{{items[5].text}}</span>
        </div>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="deletetext()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>文本编辑</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="textsave()" >保存</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <textarea class="text-textarea" :style="{'height':calheight}" v-model="textinput" placeholder="从这里开始你的活动正文"></textarea>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
  export default {
    props: [
      "brieftext0", "brieftext",
      "selectedinterest0", "selectedinterest",
      "place0", "place",
      "date0", "date",
      "time0", "time",
      "selectedform0", "selectedform",
      "opts",
      'imgparam', 'imglocaldisplay', 'head_imgparam'
    ],
    data: () => ({
      brief: false,
      menu: false,
      myrequire: false,
      insertphase: false,
      selectedparsetext: '',
      textdialog:false,
      textinput:'',
      reedit: false,
      forms: ['比赛', '分享', '互动'],
      interests: ['游戏', '影视', '棋牌', '文化艺术', '运动/户外', '学术科技', '社会科学', '公益', '实践'],
      items: [{
          iconname: 'label',
          text: '活动简介',
        },
        {
          iconname: 'face',
          text: '报名需求',
        },
        {
          iconname: 'photo_library',
          text: '更改头图',
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
      ]
    }),
    computed:{
      calheight:function(){
        var screenheight=document.documentElement.clientHeight;
        return (screenheight-90)+'px!important';
      },
    },
    methods: {
      changedata: function () {
        if (this.date0 == "") {
          this.date0 = this.date,
            this.time0 = this.time,
            this.place0 = this.place,
            this.selectedform0 = this.selectedform;
          this.selectedinterest0 = this.selectedinterest;
          this.brieftext0 = this.brieftext;
        } else
          return;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      addtopimg: function () {
        this.$refs.selecttopimg.click();
      },
      save: function (date) {
        this.$refs.menu.save(date)
      },
      addopt: function () {
        this.opts.push({
          type: 'text',
          inner: ''
        });
      },
      addselect: function () {
        this.opts.push({
          type: 'select',
          title: '',
          inner: []
        });
      },
      addselectinner(i) {
        this.opts[i].inner.push('');
      },
      deleteopt: function (r) {
        this.opts.splice(r, 1);
      },
      deleteselect: function (i, k) {
        this.opts[i].inner.splice(k, 1);
      },
      deletebriefdata: function () {
        this.date0 = '',
          this.time0 = '',
          this.place0 = '',
          this.selectedform0 = '';
        this.selectedinterest0 = '';
        this.brieftext0 = '';
        this.brief = false;
      },
      deleteparsedata: function () {
        this.selectedparsetext = '';
        this.reedit = false;
        this.insertphase = false;
      },
      sendbrieftoparent: function () {
        this.date = this.date0,
          this.time = this.time0,
          this.place = this.place0,
          this.selectedform = this.selectedform0;
        this.selectedinterest = this.selectedinterest0;
        this.brieftext = this.brieftext0;
        this.$emit("sentbrief", {
          date: this.date,
          time: this.time,
          place: this.place,
          selectedform: this.selectedform,
          selectedinterest: this.selectedinterest,
          brieftext: this.brieftext
        });
        this.brief = false;
      },
      sendrequiretoparent: function () {
        this.$emit("sentrequire", this.opts);
        this.myrequire = false;
      },
      sendparsetoparent: function () {
        if (this.selectedparsetext.length > 20) {
          this.$emit("getoverwrite");
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
      imgchange: function (e) {
        var files = e.target.files;
        var len = this.imglocaldisplay.length;
        for (let k = 0; k < files.length; k++) {
          this.imgparam.set('file' + (k + len), files[files.length - k - 1]); //通过append向form对象添加数据//神tm反向顺序！！
          if (!this.imgparam.get('file' + (k + len))) {
            this.$emit("getopenfile_failed");
            return;
          } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
          this.$set(this.imglocaldisplay, len + k, window.URL.createObjectURL(files[files.length - k - 1])); //本地预览;//神tm反向顺序！！
          this.$emit("sentimg", k);
        }
        e.target.value = null; //解决change无效
      },
      topimgchange: function (e) {
        var file = e.target.files[0];
        this.head_imgparam.set('file', file); //通过append向form对象添加数据
        if (!this.head_imgparam.get('file')) {
          this.$emit("getopenfile_failed");
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        var head_img = window.URL.createObjectURL(e.target.files[0]); //本地预览;
        this.$emit("senttopimg", head_img);
        e.target.value = null; //解决change无效
      },
      clickaddparse: function (title) {
        this.selectedparsetext = title;
        this.$refs.inserttitle.click();
        this.reedit = true;
      },
      textsave:function(){
        if(this.textinput!=""){
          if(this.reedit)
            this.$emit("reedittextsave",this.textinput);
          else
            this.$emit("textsave",this.textinput);
        } 
        this.textinput="";
        this.reedit=false;
        this.textdialog = false;
      },
      deletetext:function(){
        this.textdialog = false;
        this.reedit = false;
        this.textinput="";
      },
      clickaddtext: function (text) {
        this.textinput=text;
        this.$refs.inserttext.click();
        this.reedit = true;
      },
    }
  }

</script>

<style scoped>
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
    margin-left: 15px;
    margin-top: 22px;
    display: inline-block;
  }

  .addopt {
    color: #FE9246;
    cursor: pointer;
    padding-left: 24px;
    font-size: 18px;
    width: 120px;
    margin-top: 15px;
    float:left;
  }

  .addselect {
    color: #FE9246;
    cursor: pointer;
    padding-left: 24px;
    font-size: 18px;
    width: 120px;
    margin-top: 15px;
    float: left;
  }

  .text-wrapper {
    width: 400px;
    min-height: 50px;
    padding-left: 24px;
  }

  .text-wrapper>>>.v-input {
    width: 300px;
    height: 34px;
    display: inline-block;
  }

  .text-wrapper>>>.select-field {
    width: 225px;
  }

  .text-textarea{
    width: 100%;
    margin-top:0!important;
    border: solid 0px;
    outline:none;
    font-size: 16px;
    word-break: break-all;
  }
</style>
