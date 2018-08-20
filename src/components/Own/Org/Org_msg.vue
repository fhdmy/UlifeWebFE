<template>
  <div class="signup-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">mail_outline</v-icon>
    <span class="title">我的消息</span>
    <div class="Homemaincontent-mainwrapper">
      <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-text>你确定要删除它？</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat="flat" @click="dialog = false">点错了</v-btn> 
              <v-btn color="green darken-1" flat="flat" @click="dialog = false,deleteitem(ii)">删除</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      <div v-for="(item,i) in items" :key="i" class="msg-content">
        <router-link :to="{name:'org_display',params:{opt:'abstract',org_id:'1'}}">
          <v-avatar size="50">
            <img :src="item.avatar" />
          </v-avatar>
        </router-link>
        <div class="msg-right">
          <router-link :to="{name:'org_display',params:{opt:'abstract',org_id:'1'}}">
            <span class="msg-title">{{item.title}}</span>
          </router-link>
          <span class="msg-sendt">发送了消息</span>
          <v-icon class="msg-close" @click.stop="dialog = true,ii=i">close</v-icon>
          <span class="msg-headline">{{item.headline}}</span>
          <div class="maincontent-wrapper">
            <p class="msg-content">{{item.subtitle}}</p>
          </div>
        </div>
        <div style="clear:both;"></div>
        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      dialog:false,
      ii:0,
      items: [{
          avatar: '/src/assets/suselogo.jpg',
          title: '经济学院学生会',
          headline: '2018-02-11',
          subtitle: "2018中国人眼中的丝绸之路丝绸之路旅游推广联盟、 清华大学媒介调查实验室和马蜂窝旅游邀你一起参与：【 2018 中国人眼中的丝绸之路旅游十佳】 系列评选活动。精品游记带你探索丝路精华、 见证丝路繁盛！4 月20日 - 5 月20日， 为你眼中十佳的特色旅游城市、 旅游品牌活动、 旅游景区、 特色旅游酒店、 特色旅游美食、 旅游商品、 旅行游记投票吧！ ",
          divider: true
        },
        {
          avatar: '/src/assets/xnick.jpg',
          title: '系统消息',
          headline: '2018-02-11',
          subtitle: "斯巴鲁带你横跨险峻，纵越巅峰在西藏高原，你翻越过什么最险公路？在荒野路上，你经历过什么刻骨瞬间？",
          divider: true
        },
        {
          avatar: '/src/assets/xnick.jpg',
          title: '系统消息',
          headline: '2018-02-11',
          subtitle: "Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
          divider: true
        }
      ]
    }),
    methods: {
      deleteitem:function(i){
        this.items.splice(i,1);
      }
    }
  }

</script>

<style scoped>
  .today-icon {
    margin-left: 25px;
    margin-top: 25px;
  }

  .Homemaincontent-mainwrapper {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 100%;
    min-height: 500px;
  }

  .signup-wrapper {
    float: left;
    width: 771.5px;
    margin-left: 25px;
    background: white;
    margin-top: 25px;
  }

  .msg-content {
    width: 100%;
    position: relative;
  }

  .v-avatar {
    float: left;
    margin-left: 20px;
    margin-top: 10px;
  }

  .msg-right {
    float: left;
    width: 680px;
    margin-top: 10px;
    margin-left: 20px;
  }

  .v-divider {
    position: absolute;
    bottom: 0;
  }

  .msg-title {
    color: #E03636;
  }

  .msg-sendt {
    color: #666;
  }

  .msg-headline {
    color: #666;
    float: right;
    margin-right: 10px;
  }

  .msg-close {
    float: right;
    margin-right: 65px;
    margin-top: -2px;
    cursor: pointer;
  }

  .msg-close:hover {
    color: #E03636;
  }

  .maincontent-wrapper {
    margin-right: 99px;
    min-height: 20px;
  }
  .msg-content{
    color: #999;
    font-size: 14px;
    margin-top: 10px; 
    word-break:break-word;
    word-wrap:break-word;
  }
</style>
