<template>
  <div class="edit-content">
    <p class="inform-title">我的信息</p>
    <v-divider class="mb-4"></v-divider>
    <form>
      <dl class="dl1">
        <dt>昵称:</dt>
        <dd class="dd1">
          <input type="text" maxlength="10" class="nickname" v-model="mynickname"/>
        </dd>
      </dl>
      <dl>
        <dt class="mt-3">性别:</dt>
        <dd class="dd2">
          <v-radio-group v-model="row" row>
            <v-radio label="男" value="male" color="secondary"></v-radio>
            <v-radio label="女" value="female" color="secondary"></v-radio>
            <v-radio label="保密" value="secret" color="secondary"></v-radio>
          </v-radio-group>
        </dd>
      </dl>
      <dl class="dl3">
        <dt>院系:</dt>
        <dd class="dd3">
          <v-select :items="colleges" class="select3" color="secondary" v-model="mycollege"></v-select>
        </dd>
      </dl>
      <dl class="dl3 mt-3">
        <dt>年级:</dt>
        <dd class="dd3">
          <v-select :items="grades" class="select3" color="secondary" v-model="mygrade"></v-select>
        </dd>
      </dl>
      <v-btn flat color="white" class="savebtn" @click="save">保存</v-btn>
      <p class="attentiontext">报名活动需要填写以上信息</p>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      row: null,
      colleges: ['经管大类', '计算机工程与科学学院', '中欧机械系', '应用数学系'],
      grades:['大一','大二','大三','大四'],
      mynickname:'',
      mycollege:'',
      mygrade:''
    }),
    methods:{
      save:function(){
        console.log({
          nickname:this.mynickname,
          sex:this.row,
          college:this.mycollege,
          grade:this.mygrade
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

  .dl1 {
    padding-bottom: 5px;
  }
  dl{
    clear: both;
    display: block;
    overflow: hidden;
  }
  dt {
    float: left;
    width: 85px;
    height: 31px;
    padding: 6px 10px 0 0;
    text-align: right;
    color: #a1a1a1;
    font-size: 16px;
  }

  .dd1 {
    float: left;
    width: 640px;
    height: 32px;
    margin-left: 10px;
  }

  .nickname {
    width: 208px;
    height: 34px;
    border: 1px solid #d3d3d3;
    border-radius: 3px;
    padding: 6px 8px;
    color: #999;
    line-height: 18px;
    font-size: 14px;
    outline:none;
  }
  .nickname:focus{
    border: 1px solid #FE9246;
  }
  .dd2 {
    float: left;
    width: 640px;
    height: 64px;
    margin-left: 10px;
  }
  .dl3{
    height: 37px;
  }
  .dd3{
    float: left;
    width: 640px;
    height: 64px;
    margin-left: 10px;
  }
  .select3{
    margin-top: 0;
    width: 208px;
  }
  .select3>>>.v-select__selection{
    color: #999;
  }
  .savebtn{
    background: #FE9246!important;
    margin: 20px 140px 10px 140px;
  }
  .attentiontext{
    margin-left: 100px;
    color: #2196f3;
  }
</style>
