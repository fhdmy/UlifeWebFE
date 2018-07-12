<template>
  <div class="edit-content">
    <p class="inform-title">隐私设置</p>
    <v-divider class="mb-4"></v-divider>
    <form>
      <dl>
        <dt>是否公开个人信息:</dt>
        <dd>
          <v-switch v-model="inform"></v-switch>
        </dd>
      </dl>
       <dl>
        <dt>是否公开个人收藏:</dt>
        <dd>
          <v-switch v-model="collect"></v-switch>
        </dd>
      </dl>
      <dl>
        <dt>是否公开历史参加活动:</dt>
        <dd>
          <v-switch v-model="historyact"></v-switch>
        </dd>
      </dl>
      <v-btn flat color="white" class="savebtn">保存</v-btn>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      row: null,
      colleges: ['经管大类', '计算机工程与科学学院', '中欧机械系', '应用数学系'],
      grades:['大一','大二','大三','大四'],
      inform: true,
      collect:true,
      historyact:true
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
