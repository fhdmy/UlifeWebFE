<template>
  <div class="rank-wrapper">
    <input type="file" hidden ref="selecttopimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="topimgchange"/>
    <input type="file" hidden ref="selectimg" accept="image/png, image/jpeg, image/gif, image/jpg" @change="imgchange" multiple/>
    <!-- <div ref="imageholder"> </div> (测试用的)-->
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
                  <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="date0" lazy transition="scale-transition" offset-y full-width min-width="290px">
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
          <v-card-text>
              <div class="text-wrapper" v-for="(opt,i) in opts" :key="i">
                <v-text-field label="您可以在这里输入额外的报名需求" v-model="opts[i]"></v-text-field>
                <div class="delete" @click="deleteopt(i)">删除</div>
              </div>
            <div class="addopt" @click="addopt">添加选项</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
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
      <div class="menu-addimg menu-div" slot="activator" @click="addtext">
          <v-icon>{{items[5].iconname}}</v-icon>
          <span>{{items[5].text}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['imgparam','imglocaldisplay','head_imgparam'], //用于展示
    data: () => ({
      brief:false,
      date: null,
      date0: null,
      menu: false,
      myrequire:false,
      insertphase:false,
      selectedform:'',
      selectedform0:'',
      selectedinterest:'',
      selectedinterest0:'',
      place:'',
      place0:'',
      time:'',
      time0:'',
      brieftext:'',
      brieftext0:'',
      selectedparsetext:'',
      reedit:false,
      forms:['比赛', '分享', '互动'],
      opts:[''],
      interests:['游戏','影视','棋牌','文化艺术','运动/户外','学术科技','社会科学','公益','实践'],
      items:[
        {
          iconname:'label',
          text:'活动简介',
        },
        {
          iconname:'face',
          text:'报名需求',
        },
         {
          iconname:'photo_library',
          text:'更改头图',
        },
        {
          iconname:'photo',
          text:'插入图片',
          path:'insertimg'
        },
        {
          iconname:'format_list_bulleted',
          text:'插入标题',
          path:'insertphase'
        },
        {
          iconname:'subject',
          text:'插入文本',
          path:'inserttext'
        }
      ]
    }),
    methods:{
      changedata:function(){
        this.date0=this.date,
        this.time0=this.time,
        this.place0=this.place,
        this.selectedform0=this.selectedform;
        this.selectedinterest0=this.selectedinterest;
        this.brieftext0=this.brieftext;
      },
      addimg: function () {
        this.$refs.selectimg.click();
      },
      addtopimg:function(){
        this.$refs.selecttopimg.click();
      },
      save:function(date) {
        this.$refs.menu.save(date)
      },
      addopt:function(){
        this.opts.push('');
      },
      deleteopt:function(r){
        this.opts.splice(r,1);
      },
      deletebriefdata:function(){
        this.date0='',
        this.time0='',
        this.place0='',
        this.selectedform0='';
        this.selectedinterest0='';
        this.brieftext0='';
        this.brief = false;
      },
      deleteparsedata:function(){
        this.selectedparsetext='';
        this.reedit=false;
        this.insertphase = false;
      },
      sendbrieftoparent:function(){
        this.date=this.date0,
        this.time=this.time0,
        this.place=this.place0,
        this.selectedform=this.selectedform0;
        this.selectedinterest=this.selectedinterest0;
        this.brieftext=this.brieftext0;
        this.$emit("sentbrief",{
          date:this.date,
          time:this.time,
          place:this.place,
          selectedform:this.selectedform,
          selectedinterest:this.selectedinterest,
          brieftext:this.brieftext
        });
        this.brief = false;
      },
      sendrequiretoparent:function(){
        this.$emit("sentrequire",this.opts);
        this.myrequire = false;
      },
      sendparsetoparent:function(){
        if(this.selectedparsetext.length>20){
          alert("超过字数啦！");
          return;
        }
        if(this.selectedparsetext!=''){
          if(this.reedit){
            this.$emit("reeditparse",this.selectedparsetext);
            this.selectedparsetext="";
            this.reedit=false;
            this.insertphase = false;
            return;
          }
          this.$emit("sentparse",this.selectedparsetext);
          this.selectedparsetext="";
        }
        this.insertphase = false;
      },
      imgchange:function(e){
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
        }
        e.target.value=null;//解决change无效
      },
      topimgchange:function(e){
        var file = e.target.files[0];
        this.head_imgparam.set('file', file); //通过append向form对象添加数据
        if (!this.head_imgparam.get('file')) {
          alert("打开文件失败！");
          return;
        } //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        var head_img = window.URL.createObjectURL(e.target.files[0]); //本地预览;
        this.$emit("senttopimg", head_img);
      },
      addtext:function(){
        this.$emit("senttext",true);
      },
      clickaddparse:function(title){
        this.selectedparsetext=title;
        this.$refs.inserttitle.click();
        this.reedit=true;
      }
    }
  }
</script>

<style scoped>
  .rank-wrapper {
    width: 266.41px;
    height: 336px;
    background: white;
    float:right;
    margin-top: 25px;
  }
  .rank-wrapper>>>.v-dialog__container{
    width: 70%;
    float:right;
  }
  .v-card>>>.v-card__title{
    padding-bottom: 0!important;
  }
  .rank-wrapper>>>.menu-addimg{
    width: 70%;
    float:right;
  }
  .rank-wrapper .menu-div{
    line-height: 46px;
    margin-bottom:8px;
    cursor: pointer;
  }
  .rank-wrapper .menu-div:hover{
    background:#dddddd;
  }
  .rank-wrapper .menu-div a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .rank-wrapper .menu-div span{
    color: #666;
    font-size: 18px;
  }
  .rank-wrapper .menu-div i{
    color: #FE9246;
    font-size: 28px;
    margin:0 10px 0 24px;
    position: relative;
    top: 5px;
  }
  .v-dialog__content>>>textarea{
    margin-top: 10px;
    resize: none;
    color: #666!important;
    height: 180px;
  }
  .delete{
    color: #FE9246;
    cursor: pointer;
    margin-left: 30px;
    margin-top: 22px; 
    display: inline-block;
  }
  .addopt{
    color: #FE9246;
    cursor: pointer;
    padding-left: 24px;
    font-size: 18px;
    width: 110px;
    margin-top: 15px;
  }
  .text-wrapper{
    width: 400px;
    height: 50px;
    padding-left: 24px;
  }
  .text-wrapper>>>.v-input{
    width: 300px;
    display: inline-block;
  }
</style>