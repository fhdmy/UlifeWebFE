<template>
  <div class="signup-wrapper">
    <v-icon color="primary" class="mr-2 today-icon">mail_outline</v-icon>
    <span class="title">我的消息</span>
    <div class="Homemaincontent-mainwrapper">
      <v-list two-line>
        <template v-for="(item,index) in items">
          <v-list-tile :key="index+100" avatar>
            <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}" :key="index">
            <v-list-tile-avatar>
              <img :src="item.avatar">
            </v-list-tile-avatar>
            </router-link>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title>{{ item.headline }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="item.divider" :key="index"></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          avatar: '/src/assets/suselogo.jpg',
          title: '经济学院学生会',
          headline: '2018-02-11',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          divider: true
        },
        {
          avatar: '/src/assets/xnick.jpg',
          title: '系统消息',
          headline: '2018-02-11',
          subtitle: "to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
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

</style>
