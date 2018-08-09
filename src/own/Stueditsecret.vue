<template>
  <div class="edit-content">
    <v-snackbar v-model="snackbar" :multi-line="mode === 'multi-line'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
      保存成功！
      <v-btn color="pink" flat @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <p class="inform-title">隐私设置</p>
    <v-divider class="mb-4"></v-divider>
    <form>
      <dl>
        <dt>是否公开个人信息:</dt>
        <dd>
          <v-switch v-model="isfavpublic"></v-switch>
        </dd>
      </dl>
       <dl>
        <dt>是否公开个人收藏:</dt>
        <dd>
          <v-switch v-model="isprofilepublic"></v-switch>
        </dd>
      </dl>
      <dl>
        <dt>是否公开历史参加活动:</dt>
        <dd>
          <v-switch v-model="ishistorypublic"></v-switch>
        </dd>
      </dl>
      <v-btn flat color="white" class="savebtn" @click="save">保存</v-btn>
    </form>
  </div>
</template>

<script>
  export default {
    props:['userurl','isfavpublic','isprofilepublic','ishistorypublic'],
    data: () => ({
      y: 'top',
      snackbar: false,
      color: '#E03636',
      mode: '',
      timeout: 2000
      // fav:this.isfavpublic,
      // pro:this.isprofilepublic,
      // his:this.ishistorypublic
    }),
    // watch:{
    //   isfavpublic:function(){
    //     this.fav=this.isfavpublic;
    //   },
    //   isprofilepublic:function(){
    //     this.pro=this.isprofilepublic;
    //   },
    //   ishistorypublic:function(){
    //     this.his=this.ishistorypublic;
    //   }
    // },
    watch:{
      isfavpublic:function(val){
        this.$emit("update:isfavpublic",val);
      },
      isprofilepublic:function(val){
        this.$emit("update:isprofilepublic",val);
      },
      ishistorypublic:function(val){
        this.$emit("update:ishistorypublic",val);
      }
    },
    methods:{
      save:function(){
        this.$http({
          method: 'patch',
          url: this.userurl,
          headers: {
            "Authorization": "Token " + localStorage.getItem("token")
          },
          data: {
            is_fav_public: this.isfavpublic,
            is_history_public: this.ishistorypublic,
            is_profile_public: this.isprofilepublic,
          }
        }).then((res) => {
          this.snackbar=true;
        }).catch(function (error) {
          alert("网络传输故障!");
        });
      }
    }
  }

</script>

<style scoped>
  .edit-content {
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    width: 743px;
  }

  .inform-title {
    font-size: 24px;
    color: #444;
  }
  dl{
    clear: both;
    display: block;
    overflow: hidden;
  }
  dt {
    float: left;
    width: 185px;
    height: 31px;
    padding: 20px 10px 0 0;
    text-align: right;
    color: #a1a1a1;
    font-size: 16px;
  }
  dd{
    float:left;
    width: 300px;
    margin-left: 5px
  }
  .savebtn{
    background: #FE9246!important;
    margin: 20px 140px 10px 140px;
  }
</style>
