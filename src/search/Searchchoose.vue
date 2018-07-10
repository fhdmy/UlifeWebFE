<template>
  <div class="searchchoose-wrapper">
    <v-container>
      <div class="mb-3">
        <router-link :to="{ name: 'search', params: {target:'act',time:'all',type:'all',interest:'all'}}"><span class="ml-4 subheading option" :class="{'isactive':disabled==false}">活动</span></router-link>
        <span class="mx-3">|</span>
        <router-link :to="{ name: 'search', params: {target:'org',time:'none',type:'none',interest:'none'}}"><span class="subheading option" :class="{'isactive':disabled==true}">组织</span></router-link>
      </div>
      <div class="searchtime">
        <span class="searchchoose-title ml-4 mr-3">时间</span>
        <span class="ml-3">|</span>
        <span class="searchchoose-text ml-3" v-for="ti in times" :key="ti.number">
          <router-link :to="{ name: 'search', params: {target:'act',time:ti.par,type:chosentype,interest:choseninterest}}" :class="{'isactive':chosentime==ti.par,'isdisabled':disabled}">{{ti.name}}</router-link>
          <span class="searchchoose-divider ml-3" v-if="ti.number!=6">|</span>
        </span>
      </div>
      <div class="mt-3">
        <span class="searchchoose-title ml-4 mr-3">形式</span>
        <span class="ml-3">|</span>
        <span class="searchchoose-text ml-3" v-for="ty in types" :key="ty.number">
          <router-link :to="{ name: 'search', params: {target:'act',time:chosentime,type:ty.par,interest:choseninterest}}" :class="{'isactive':chosentype==ty.par,'isdisabled':disabled}">{{ty.name}}</router-link>
          <span class="searchchoose-divider ml-3" v-if="ty.number!=3">|</span>
        </span>
      </div>
      <div class="mt-3">
        <span class="searchchoose-title ml-4 mr-3">兴趣</span>
        <span class="ml-3">|</span>
        <span class="searchchoose-text ml-3" v-for="i in interests" :key="i.number">
          <router-link :to="{ name: 'search', params: {target:'act',time:chosentime,type:chosentype,interest:i.par}}" :class="{'isactive':choseninterest==i.par,'isdisabled':disabled}">{{i.name}}</router-link>
          <span class="searchchoose-divider ml-3" v-if="i.number!=9">|</span>
        </span>
      </div>
    </v-container>
  </div>
</template>

<script>
  export default {
    props:['target','time','type','interest'],
    data: () => ({
      times: [{
          name: '全部',
          number: 0,
          par:'all'
        },
        {
          name: '一天内',
          number: 1,
          par:'day'
        },
        {
          name: '一周内',
          number: 2,
          par:'week'
        },
        {
          name: '一个月内',
          number: 3,
          par:'month'
        },
        {
          name: '休息日',
          number: 4,
          par:'weekday'
        },
        {
          name: '工作日',
          number: 5,
          par:'workday'
        },
        {
          name: '寒暑假',
          number: 6,
          par:'holiday'
        }
      ],
      types: [{
          name: '全部',
          number: 0,
          par:'all'
        },
        {
          name: '比赛',
          number: 1,
          par:'match'
        },
        {
          name: '分享',
          number: 2,
          par:'share'
        },
        {
          name: '互动',
          number: 3,
          par:'interact'
        },
      ],
      interests: [{
          name: '全部',
          number: 0,
          par:'all'
        },
        {
          name: '游戏',
          number: 1,
          par:'game'
        },
        {
          name: '影视',
          number: 2,
          par:'film'
        },
        {
          name: '棋牌',
          number: 3,
          par:'chess'
        },
        {
          name: '文化艺术',
          number: 4,
          par:'culture'
        },
        {
          name: '运动/户外',
          number: 5,
          par:'exercise'
        },
        {
          name: '学术科技',
          number: 6,
          par:'tech'
        },
        {
          name: '社会科学',
          number: 7,
          par:'social'
        },
        {
          name: '公益',
          number: 8,
          par:'public'
        },
        {
          name: '实践',
          number: 9,
          par:'practice'
        }
      ],
      chosentime:'all',
      chosentype:'all',
      choseninterest:'all',
      disabled:false
    }),
    created:function(){
      var t=this.target;
      var ti=this.time;
      var ty=this.type;
      var i=this.interest;
      this.chosentime=ti;
      this.chosentype=ty;
      this.choseninterest=i;
      if(t=='org')
        this.disabled=true;
      else
        this.disabled=false;
    },
    watch:{
      '$route' (to, from) {
        if(to.params.target=='org')
          this.disabled=true;
        else 
          this.disabled=false;
        this.chosentime=to.params.time;
        this.chosentype=to.params.type;
        this.choseninterest=to.params.interest;
      }
    },
    methods: {
      
    }
  }

</script>

<style scoped>
  .searchchoose-wrapper {
    height: 100%;
    width: 100%;
  }

  .searchchoose-text a{
    color: #666;
    cursor: pointer;
  }

  .searchchoose-text a:hover {
    color: #E03636;
  }

  .isactive {
    color: #E03636!important;
  }

  .searchchoose-wrapper .container .isdisabled {
    pointer-events: none;
    opacity: 0.7;
    color: #666;
  }

  .searchchoose-divider {
    color: #cccccc;
  }

  .option {
    cursor: pointer;
    color: #000;
  }
  .option:hover{
    color:#E03636;
  }

</style>
