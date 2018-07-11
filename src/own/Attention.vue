<template>
  <div class="attention">
    <div class="attention-wrapper">
      <div class="attention-inner" :style="{transform:'translate('+move+'px'+',0)',width:w+'px'}">
        <div class="attention-col text-md-center text-lg-center text-xl-center" v-for="item in items" :key="item.number" v-if="isdouble(item.number)">
          <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}">
            <v-avatar size="40" class="mb-1">
              <img :src="item.imgsrc" />
            </v-avatar>
            <p class="attention-name">{{item.name}}</p>
          </router-link>
          <router-link :to="{name:'orgdisplay',params:{opt:'inform'}}">
            <v-avatar size="40" class="mb-1">
              <img :src="nextimg(item.number)" v-if="nextimg(item.number)!='none'" />
            </v-avatar>
            <p class="attention-name">{{nextname(item.number)}}</p>
          </router-link>
        </div>
      </div>
    </div>
    <v-btn flat class="attention-left-btn" small @click="leftchange"><v-icon>keyboard_arrow_left</v-icon></v-btn>
    <v-btn flat class="attention-right-btn" small @click="rightchange"><v-icon>keyboard_arrow_right</v-icon></v-btn>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
  export default {
    props:['items'],
    data: () => ({
      move:0,
      calculate:0
    }),
    computed:{
      transform:function(){
        return {transform:translate(this.move+"px",0)};
      },
      movejudge:function(){
        var n=this.items.length/2+this.items.length%2;
        if(this.calculate>(n-3) || this.calculate==(n-3)){
          if(this.calculate==0){
            return 0;
          }
          return 1;
        }
        if(this.calculate==0){
          return -1;
        }
      },
      w:function(){
        var n=this.items.length/2+this.items.length%2;
        return n*71.03;
      }
    },
    methods: {
      isdouble: function (n) {
        if (n % 2 == 0) {
          return true;
        } else {
          return false;
        }
      },
      nextimg: function (n) {
        if (n + 1 < this.items.length)
          return this.items[n + 1].imgsrc;
        else
          return 'none';
      },
      nextname: function (n) {
        if (n + 1 < this.items.length)
          return this.items[n + 1].name;
      },
      leftchange:function(){
        if(this.movejudge==-1 || this.movejudge==0)
          return;
        this.move+=71.03;
        this.calculate--;
      },
      rightchange:function(){
        if(this.movejudge==1 || this.movejudge==0)
          return;
        this.move-=71.03;
        this.calculate++;
      }
    }
  }

</script>

<style scoped>
  .attention{
    width: 100%;
    height: 200px;
    position: relative;
  }
  .attention-wrapper {
    width: 80%;
    height: 160px;
    overflow: hidden;
    position: relative;
    margin-left: 10%;
  }

  .attention-inner {
    height: 100%;
    overflow: hidden;
    -webkit-transition: all 200ms ease-out;
    -moz-transition: all 200ms ease-out;
    transition: all 200ms ease-out;
  }

  .attention-col {
    float: left;
    width: 71.03px;
    height: 100%;
  }

  .attention-name {
    color: #ff7200;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding:0 8px;
  }

  .attention-left-btn {
    /* position: absolute;
    top: 100%;
    left: 30px; */
    float: left;
    margin-left: 30px;
    background: #efefef!important;
    color: #666;
  }

  .attention-right-btn {
    /* position: absolute;
    top: 100%;
    right: 30px; */
    float: right;
    margin-right: 30px;
    background: #efefef!important;
    color: #666;
  }
  .attention-left-btn:hover{
    background: #E03636!important;
    color: white;
  }
  .attention-right-btn:hover{
    background: #E03636!important;
    color: white;
  }

</style>
