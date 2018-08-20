<template>
  <div class="inform-wrapper">
    <p class="text-md-center text-lg-center text-xl-center stuname">{{name}}</p>
    <div class="three-wrapper">
      <div class="first-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{attention}}</p>
        <p class="bottom-text">关注</p>
      </div>
      <div class="second-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{stars}}</p>
        <p class="bottom-text">评星</p>
      </div>
      <div class="third-inner text-md-center text-lg-center text-xl-center">
        <p class="top-number">{{acts}}</p>
        <p class="bottom-text">活动</p>
      </div>
      <div style="clear:both;"></div>
    </div>
    <a @click="fillorginform">
      <v-btn flat class="fill-inform" v-if="mine">填写组织信息</v-btn>
    </a>
    <v-btn flat :class="{'fill-inform':true,'fattention':!myattention}" v-if="!mine" @click="payattention()"><span v-if="myattention">已</span>关注</v-btn>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="mine">我的访客</p>
    <p class="text-md-center text-lg-center text-xl-center mt-5 subheading mb-2" v-if="!mine">TA的访客</p>
    <Visitors :items="visits" :is_visitor_public="true"></Visitors>
  </div>
</template>

<script>
  export default {
    props: ['name', 'attention', 'stars', 'acts', 'visits', 'mine', 'orgurl', 'list', 'bg_img', 'org_id'],
    data: () => ({
      myattention: false,
      attentionurl: ''
    }),
    created: function () {
      var url0 = localStorage.getItem("user_url");
      var url1 = localStorage.getItem("org_url");
      // 学生
      if (url0 != null) {
        var user_url = localStorage.getItem("user_url");
        user_url = user_url.split("/");
        var stu_id = user_url[3];
        this.$http({
          method: 'get',
          url: '/account/watching-status/?watcher=' + stu_id + '&target=' + this.org_id,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          }
        }).then((res) => {
          if (res.data.length == 0) {
            // 未关注
            this.myattention = false;
          } else {
            // 关注了
            this.attentionurl = res.data[0].url;
            this.myattention = true;
          }
        }).catch((error)=>{
          console.log(error.response);
          this.$emit("getrequest_failed");
        });
      }
      // 组织
      else if (url1 != null) {
        this.myattention = false;
      }
    },
    methods: {
      fillorginform: function () {
        sessionStorage.setItem("lists", JSON.stringify(this.list));
        sessionStorage.setItem("bg_img", this.bg_img);
        this.$router.push({
          name: 'org_edit',
          params: {
            opt: this.orgurl
          }
        });
      },
      payattention: function () {
        var url0 = localStorage.getItem("user_url");
        var url1 = localStorage.getItem("org_url");
        if (url1 != null) {
          this.$emit("getorg_rejected");
          return;
        }
        if (localStorage.getItem("token") == null) {
          this.$emit("getnot_login");
          return;
        }
        // 如果关注了
        if (this.myattention == true) {
          // 学生
          this.$http({
            method: 'delete',
            url: this.attentionurl,
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            }
          }).then((res) => {
            this.myattention = false;
          }).catch((error)=>{
            console.log(error.response);
            this.$emit("getrequest_failed");
          });
        }
        // 如果没有关注
        else if (this.myattention == false) {
          var user_url = localStorage.getItem("user_url");
          user_url = user_url.split("/");
          var stu_id = user_url[3];
          this.$http({
            method: 'post',
            url: '/account/watchings/',
            headers: {
              "Authorization": "Token " + localStorage.getItem("token")
            },
            data:{
              'watcher': stu_id, 
              'target': this.org_id
            }
          }).then((res) => {
            this.attentionurl = res.data.url;
            this.myattention = true;
          }).catch((error)=>{
            console.log(error.response);
            this.$emit("getrequest_failed");
          });
        }
      }
    }
  }

</script>

<style scoped>
  .inform-wrapper {
    width: 266.41px;
    height: 520px;
    background: white;
    float: left;
    margin-top: 1px;
  }

  .stuname {
    margin-top: 68px;
    font-weight: lighter;
    font-size: 20px;
  }

  .three-wrapper {
    height: 62px;
    width: 100%;
    border-top: 1px solid#e2e2e2;
    border-bottom: 1px solid#e2e2e2;
    position: relative;
  }

  .first-inner {
    width: 33.33%;
    height: 100%;
    border-right: 1px solid#e2e2e2;
    float: left;
  }

  .second-inner {
    width: 33.33%;
    height: 100%;
    border-right: 1px solid#e2e2e2;
    float: left;
  }

  .third-inner {
    width: 33.33%;
    height: 100%;
    float: left;
  }

  .top-number {
    font-size: 20px;
    margin: 0;
    padding-top: 6px;
    color: #666;
    font-weight: bold;
  }

  .bottom-text {
    margin: 0;
    color: #444;
  }

  .fill-inform {
    background: #efefef !important;
    color: #666;
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    border-radius: 5px;
  }

  .fill-inform:hover {
    background: #E03636 !important;
    color: white;
  }

  .fattention {
    background: #E03636 !important;
    color: white;
  }

</style>
