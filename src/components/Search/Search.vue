<template>
  <v-content style="background: #f3f4f5;">
    <div class="elevation-1 white home-toolbar-wrapper">
      <Visitor-toolbar v-if="usertype=='none'" :content="content"></Visitor-toolbar>
      <Student-toolbar v-if="usertype=='user'" :avatar="avatarurl" :content="content"></Student-toolbar>
      <Org-toolbar v-if="usertype=='org'" :avatar="avatarurl" :content="content"></Org-toolbar>
    </div>
    <div style="margin:80px auto 16px auto;width:1063px;color:#666;">首页 > 搜索</div>
    <div class="search-choose-wrapper">
      <Search-classify :target="target" :time="time" :type="type" :interest="interest" :content="content" :rank="rank"></Search-classify>
    </div>
    <div class="home-maincontent-wrapper">
      <Search-result @sendrank="sendrank" :target="target" :acts="searchacts" @sendmoreacts="sendmoreacts"></Search-result>
      <Org-rank></Org-rank>
      <Activity-rank></Activity-rank>
      <div style="clear:both;"></div>
    </div>
    <v-btn fixed dark fab bottom right color="primary" class="mr-5 mb-5" @click="$vuetify.goTo(0)">
      <i class="iconfont icon-jiantou-copy-copy-copy"></i>
    </v-btn>
    <Footer></Footer>
  </v-content>
</template>

<script>
  export default {
    props: ['target', 'time', 'type', 'interest', 'content'],
    data: () => ({
      usertype: 'none',
      avatarurl: '',
      rank: '综合排序',
      searchacts: [],
      moreacts: '',
      presentacts: 0,
      actmax: 0
    }),
    created: function () {
      // toolbar
      var url0 = localStorage.getItem("user_url");
      var url1 = localStorage.getItem("org_url");
      if (url0 != null) {
        this.usertype = 'user';
      } else if (url1 != null) {
        this.usertype = 'org';
      }
      this.avatarurl = sessionStorage.getItem("avatar");

      // 发送请求
      this.sendaxios(this.target, this.content, this.time, this.type, this.interest, this.rank);
    },
    watch: {
      '$route' (to, from) {
        this.searchacts=[];
        this.sendaxios(to.params.target, to.params.content, to.params.time, to.params.type, to.params.interest, to.params.rank);
      },
      rank: function (val) {
        this.$router.push({
          name: 'search',
          params: {
            target: this.target,
            time: this.time,
            type: this.type,
            interest: this.interest,
            opt: this.rank,
            content: this.content
          }
        });
      }
    },
    methods: {
      sendaxios: function (target, content, time, type, interest, rank) {
        var fuc_content, fuc_time, fuc_type, fuc_hobby, fuc_opt;
        switch (time) {
          case ('全部'):
            fuc_time = '';
            break;
          case ('一天内'):
            fuc_time = 'start_at__days_ago=一天内&';
            break;
          case ('一周内'):
            fuc_time = 'start_at__days_ago=一周内&';
            break;
          case ('一个月内'):
            fuc_time = 'start_at__days_ago=一个月内&';
            break;
          case ('休息日'):
            fuc_time = 'start_at__week_day__in=6,7&';
            break;
          case ('工作日'):
            fuc_time = 'start_at__week_day__in=1,2,3,4,5&';
            break;
          case ('寒暑假'):
            fuc_time = 'start_at__month_day__in=1,2,7,8&';
            break;
        }
        fuc_content = (content == '无') ? '' : ('search=' + content + '&');
        fuc_type = (type == '全部') ? '' : ('_type=' + type + '&');
        fuc_hobby = (interest == '全部') ? '' : ('hobby=' + interest + '&');
        switch (rank) {
          case ('综合排序'):
            fuc_opt = 'ordering=is_ended,-browsering_count,-start_at';
            break;
          case ('时间排序'):
            fuc_opt = '';
            break;
          case ('浏览最多'):
            fuc_opt = 'ordering=-browsering_count';
            break;
        }
        // 如果目标是活动
        if (this.target == "活动") {
          this.$http({
            method: 'get',
            url: '/activity/activities/?' + fuc_content + fuc_time + fuc_type + fuc_hobby + fuc_opt,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            }
          }).then((res) => {
            for (let k = 0; k < res.data.results.length; k++) {
              // 设置数组
              var actid = res.data.results[k].url;
              actid = actid.split("/");
              var orgurl = res.data.results[k].owner.url;
              orgurl = orgurl.split("/");
              var org_id = orgurl[5];
              var computeddate = res.data.results[k].start_at.split('T');
              this.$set(this.searchacts, k, {
                head_img: res.data.results[k].head_img,
                heading: res.data.results[k].heading,
                date: computeddate[0],
                location: res.data.results[k].location,
                orgavatar: "http://222.186.36.156:8000"+res.data.results[k].owner.avatar,
                isover: false,
                acturl: actid[5],
                org_id: org_id,
                is_ended: res.data.results[k].is_ended
              });
              this.moreacts = res.data.next;
              this.presentacts = res.data.results.length;
              this.actmax = res.data.count;
            }
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        } else if (this.target == '组织') {
          this.$http({
            method: 'get',
            url: '/account/orgs/?' + fuc_content,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            }
          }).then((res) => {
            for (let k = 0; k < res.data.length; k++) {
              // 设置数组
              var orgurl = res.data[k].url;
              orgurl = orgurl.split("/");
              var org_id = orgurl[5];
              this.$set(this.searchacts, k, {
                avatar: "http://222.186.36.156:8000"+res.data[k].avatar,
                org_name: res.data[k].org_name,
                org_id: org_id,
              });
              // this.moreacts = res.data.next;
              // this.presentacts = res.data.length;
              // this.actmax = res.data.count;
            }
          }).catch(function (error) {
            alert("网络传输故障！");
          });
        }
      },
      sendrank(d) {
        this.rank = d;
      },
      sendmoreacts: function (d) {
        if (this.actmax == this.presentacts) {
          alert("已经没有更多活动啦！");
          return;
        }
        this.$http({
          method: 'get',
          url: this.moreacts,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          for (let k = 0; k < res.data.results.length; k++) {
            // 设置数组
            var actid = res.data.results[k].url;
            actid = actid.split("/");
            var computeddate = res.data.results[k].start_at.split('T');
            this.$set(this.searchacts, this.presentacts + k, {
              head_img: res.data.results[k].head_img,
              heading: res.data.results[k].heading,
              date: computeddate[0],
              location: res.data.results[k].location,
              orgavatar: "http://222.186.36.156:8000"+res.data.results[k].owner.avatar,
              isover: false,
              acturl: actid[5],
              is_ended: res.data.results[k].is_ended,
            });
          }
          this.moreacts = res.data.next;
          this.presentacts += res.data.results.length;
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

  .search-choose-wrapper {
    width: 1063px;
    background: white;
    margin: 15px auto 0 auto;
  }

  .home-maincontent-wrapper {
    width: 1063px;
    height: auto;
    margin: 0 auto 150px auto;
    position: relative;
  }

</style>
