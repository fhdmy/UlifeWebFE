<template>
  <div class="edit-content">
    <p class="inform-title">账号安全</p>
    <v-divider class="mb-4"></v-divider>
    <div>
      <span>更换手机绑定></span>
      <router-link to="/Changephone1"><v-btn flat color="white" class="btn">更换手机</v-btn></router-link>
    </div>
    <div>
      <span>更改密码></span>
      <router-link to="/Forgetpwd1"><v-btn flat color="white" class="btn">修改密码</v-btn></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      row: null,
      colleges: ['经管大类', '计算机工程与科学学院', '中欧机械系', '应用数学系'],
      grades:['大一','大二','大三','大四']
    })
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
  span{
    color: #a1a1a1;
    width: 105px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
    font-size: 16px;
  }
  .btn{
    background: #FE9246!important;
    margin: 10px 140px 10px 0px;
  }
</style>
