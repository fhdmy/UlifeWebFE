<template>
  <div class="rank-wrapper">
    <p class="text-md-center text-lg-center text-xl-center mt-4 title font-weight-bold mb-0">排行榜</p>
    <v-list>
      <template v-for="(item, index) in items">
        <a @click="openorg(act.org_id)" :key="index">
        <v-list-tile avatar>
          <span>{{item.rank}}-</span>
          <v-list-tile-avatar>
            <img :src="item.imgsrc">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.orgname" class="body-2"></v-list-tile-title>
          </v-list-tile-content>
          <span class="ml-1">{{item.stars}}
            <!-- <v-icon color="primary" standard>star</v-icon> -->
            <v-icon color="primary" standard class="iconfont icon-star_full"></v-icon>
          </span>
        </v-list-tile>
        </a>
        <v-divider v-if="index + 1 < items.length" :key="item.rank+5"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    props:['acts'],
    data: () => ({
      items: [{
          rank: 1,
          imgsrc: '/src/assets/suselogo.jpg',
          orgname: '经济学院学生会',
          stars: 4.8
        },
        {
          rank: 2,
          imgsrc: '/src/assets/suselogo.jpg',
          orgname: '经济学院学生会',
          stars: 4.8
        },
        {
          rank: 3,
          imgsrc: '/src/assets/suselogo.jpg',
          orgname: '经济学院学生会',
          stars: 4.8
        },
        {
          rank: 4,
          imgsrc: '/src/assets/suselogo.jpg',
          orgname: '经济学院学生会',
          stars: 4.8
        },
        {
          rank: 5,
          imgsrc: '/src/assets/suselogo.jpg',
          orgname: '经济学院学生会',
          stars: 4.8
        }
      ]
    }),
    methods:{
      openorg:function(org_id){
        let routeData = this.$router.resolve({name:'org_display',params:{opt:'abstract',org_id:'1'}});
        window.open(routeData.href, '_blank');
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
  .v-list{
    cursor: pointer;
    padding-bottom: 0!important;
  }
  .v-list__tile__content{
    width: 108.41px;
  }
  .rank-wrapper>p {
    color: #333;
    opacity: 0.7;
  }
  .v-list>>>.v-list__tile:hover{
    background:#dddddd;
  }
  .v-list>>>.v-list__tile__title{
    color: black;
  }
  span{
    color: black;
  }
</style>
