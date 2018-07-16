import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import Toolbar from './home/Toolbar.vue'
import Footer from './home/Footer.vue'
import Carousel from './home/Carousel.vue'
import Choose from './home/Choose.vue'
import Orgcommend from './home/Orgcommend.vue'
import Maincontent from './home/Maincontent.vue'
import Rank from './home/Rank.vue'
import Login from './home/Login.vue'
import Apphome from './Apphome.vue'
import Appsearch from './Appsearch.vue'
import Register1 from './home/Register1.vue'
import Register2 from './home/Register2.vue'
import Register3 from './home/Register3.vue'
import Forgetpwd1 from './home/Forgetpwd1.vue'
import Forgetpwd2 from './home/Forgetpwd2.vue'
import Changephone1 from './home/Changephone1.vue'
import Changephone2 from './home/Changephone2.vue'
import Searchchoose from './search/Searchchoose.vue'
import Searchkey from './search/Searchkey.vue'
import Actrank from './home/Actrank.vue'
import Stutoolbar from './home/Stutoolbar.vue'
import Changeaccount from './home/Changeaccount.vue'
import Appstuown from './Appstuown.vue'
import Stuowntoolbar from './own/Stuowntoolbar.vue'
import Stuinform from './own/Stuinform.vue'
import Attention from './own/Attention.vue'
import Signup from './own/Signup.vue'
import Trends from './own/Trends.vue'
import Collect from './own/Collect.vue'
import Historyview from './own/Historyview.vue'
import Historyattend from './own/Historyattend.vue'
import Stumsg from './own/Stumsg.vue'
import Appact from './Appact.vue'
import Acttoolbar from './act/Acttoolbar.vue'
import Related from './act/Related.vue'
import Show from './act/Show.vue'
import Studisplay from './Studisplay.vue'
import Studisplaytoolbar from './own/Studisplaytoolbar.vue'
import Orgdisplay from './Orgdisplay.vue'
import Inform from './own/Inform.vue'
import Orginform from './own/Orginform.vue'
import Orgdisplaytoolbar from './own/Orgdisplaytoolbar.vue'
import Orgtoolbar from './home/Orgtoolbar.vue'
import Orgowntoolbar from './own/Orgowntoolbar.vue'
import Apporgown from './Apporgown.vue'
import Orgmsg from './own/Orgmsg.vue'
import Stuedit from './own/Stuedit.vue'
import Editmenu from './own/Editmenu.vue'
import Stueditinform from './own/Stueditinform.vue'
import Stueditimg from './own/Stueditimg.vue'
import Stueditacc from './own/Stueditacc.vue'
import Stueditsecret from './own/Stueditsecret.vue'
import Stueditbg from './own/Stueditbg.vue'
import Draft from './own/Draft.vue'
import Orgmyact from './own/Orgmyact.vue'
import Mysignup from './own/Mysignup.vue'
import Create from './own/Create.vue'
import Createact from './Createact.vue'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify, {
  theme: {  
    primary: '#E03636',
    secondary: '#FE9246',
    accent: "#2196f3",
    error: "#f44336",
    warning: "#ffeb3b"
  }
})
Vue.use(VueRouter)
Vue.component("Toolbar",Toolbar)
Vue.component("Footer",Footer)
Vue.component("Carousel",Carousel)
Vue.component("Orgcommend",Orgcommend)
Vue.component("Choose",Choose)
Vue.component("Maincontent",Maincontent)
Vue.component("Rank",Rank)
Vue.component("Login",Login)
Vue.component("Apphome",Apphome)
Vue.component('Register1',Register1)
Vue.component('Register2',Register2)
Vue.component('Register3',Register3)
Vue.component('Forgetpwd1',Forgetpwd1)
Vue.component('Forgetpwd2',Forgetpwd2)
Vue.component('Changephone1',Changephone1)
Vue.component('Changephone2',Changephone2)
Vue.component("Appsearch",Appsearch)
Vue.component("Searchchoose",Searchchoose)
Vue.component("Searchkey",Searchkey)
Vue.component("Actrank",Actrank)
Vue.component("Stutoolbar",Stutoolbar)
Vue.component("Changeaccount",Changeaccount)
Vue.component("Appstuown",Appstuown)
Vue.component("Stuowntoolbar",Stuowntoolbar)
Vue.component("Stuinform",Stuinform)
Vue.component("Attention",Attention)
Vue.component("Signup",Signup)
Vue.component("Trends",Trends)
Vue.component("Collect",Collect)
Vue.component("Historyview",Historyview)
Vue.component("Historyattend",Historyattend)
Vue.component("Stumsg",Stumsg)
Vue.component("Appact",Appact)
Vue.component("Acttoolbar",Acttoolbar)
Vue.component("Related",Related)
Vue.component("Show",Show)
Vue.component("Stuisplay",Studisplay)
Vue.component("Studisplaytoolbar",Studisplaytoolbar)
Vue.component("Orgdisplay",Orgdisplay)
Vue.component("Inform",Inform)
Vue.component("Orginform",Orginform)
Vue.component("Orgdisplaytoolbar",Orgdisplaytoolbar)
Vue.component("Orgtoolbar",Orgtoolbar)
Vue.component("Orgowntoolbar",Orgowntoolbar)
Vue.component("Apporgown",Apporgown)
Vue.component("Orgmsg",Orgmsg)
Vue.component("Stuedit",Stuedit)
Vue.component("Editmenu",Editmenu)
Vue.component("Stueditinform",Stueditinform)
Vue.component("Stueditimg",Stueditimg)
Vue.component("Stueditacc",Stueditacc)
Vue.component("Stueditsecret",Stueditsecret)
Vue.component("Stueditbg",Stueditbg)
Vue.component("Draft",Draft)
Vue.component("Orgmyact",Orgmyact)
Vue.component("Mysignup",Mysignup)
Vue.component("Create",Create)
Vue.component("Createact",Createact)

const routes = [
  { path: '/', component: Apphome},
  { path: '/Login', component: Login },
  { path: '/Register1', component: Register1 },
  { path: '/Register2', component: Register2 },
  { path: '/Register3', component: Register3 },
  { path: '/Forgetpwd1', component: Forgetpwd1 },
  { path: '/Forgetpwd2', component: Forgetpwd2 },
  { path: '/Changephone1', component: Changephone1 },
  { path: '/Changephone2', component: Changephone2 },
  { path: '/Appsearch/:target/:time/:type/:interest', component: Appsearch,name:'search',props:true},
  { path: '/Changeaccount', component: Changeaccount },
  { path: '/Appstuown/:opt', component: Appstuown,name:'stuown',props: true},
  { path: '/Appact', component: Appact },
  { path: '/Studisplay/:opt', component: Studisplay,name:'studisplay',props: true},
  { path: '/Orgdisplay/:opt', component: Orgdisplay,name:'orgdisplay',props: true},
  { path: '/Apporgown/:opt', component: Apporgown,name:'orgown',props: true},
  { path: '/Stuedit/:opt', component: Stuedit,name:'stuedit',props:true},
  { path: '/createact', component: Createact }
]
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

