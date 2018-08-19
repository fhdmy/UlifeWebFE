import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import global_ from './components/Global.vue'
import App from './components/App.vue'
import Vuex from 'vuex'
import 'vuetify/dist/vuetify.min.css'

import Visitor_toolbar from './components/Home/Visitor_toolbar.vue'
import Footer from './components/Home/Footer.vue'
import Carousel from './components/Home/Carousel.vue'
import Home_classify from './components/Home/Home_classify.vue'
import Recommend_Org from './components/Home/Recommend_Org.vue'
import Latest_actitivties from './components/Home/Latest_actitivties.vue'
import Org_rank from './components/Home/Org_rank.vue'
import Home from './components/Home/Home.vue'
import Student_toolbar from './components/Home/Student_toolbar.vue'
import Org_toolbar from './components/Home/Org_toolbar.vue'
import Activity_rank from './components/Home/Activity_rank.vue'

import Login from './components/Account/Login.vue'
import Register_firststep from './components/Account/Register_firststep.vue'
import Register_secondstep from './components/Account/Register_secondstep.vue'
import Register_thirdstep from './components/Account/Register_thirdstep.vue'
import Forgetpwd_firststep from './components/Account/Forgetpwd_firststep.vue'
import Forgetpwd_secondstep from './components/Account/Forgetpwd_secondstep.vue'
import Changephone_firststep from './components/Account/Changephone_firststep.vue'
import Changephone_secondstep from './components/Account/Changephone_secondstep.vue'
import Changeaccount from './components/Account/Changeaccount.vue'
import Law_explaination from './components/Account/Law_explaination.vue'

import Search from './components/Search/Search.vue'
import Search_classify from './components/Search/Search_classify.vue'
import Search_result from './components/Search/Search_result.vue'

import Preview_toolbar from './components/Preview/Preview_toolbar.vue'
import Activity_preview from './components/Preview/Activity_preview.vue'
import Preview_body from './components/Preview/Preview_body.vue'

import Activity from './components/Activity/Activity.vue'
import Activity_toolbar from './components/Activity/Activity_toolbar.vue'
import Related from './components/Activity/Related.vue'
import Activity_body from './components/Activity/Activity_body.vue'

import Student_display from './components/Display/Student/Student_display.vue'
import Student_display_toolbar from './components/Display/Student/Student_display_toolbar.vue'
import Org_display from './components/Display/Org/Org_display.vue'
import Org_dynamic from './components/Display/Org/Org_dynamic.vue'
import Org_display_toolbar from './components/Display/Org/Org_display_toolbar.vue'

import Visitors from './components/Own/Visitors.vue'
import Activities from './components/Own/Activities.vue'
import Org_abstract from './components/Own/Org/Org_abstract.vue'
import Org_create_activity from './components/Own/Org/Org_create_activity.vue'
import Org_draft from './components/Own/Org/Org_draft.vue'
import Org_information from './components/Own/Org/Org_information.vue'
import Org_msg from './components/Own/Org/Org_msg.vue'
import Org_my_activities from './components/Own/Org/Org_my_activities.vue'
import Org_own_toolbar from './components/Own/Org/Org_own_toolbar.vue'
import Org_own from './components/Own/Org/Org_own.vue'
import Org_signup from './components/Own/Org/Org_signup.vue'

import Create_activity from './components/Own/Org/Create/Create_activity.vue'
import Create_body from './components/Own/Org/Create/Create_body.vue'
import Create_options from './components/Own/Org/Create/Create_options.vue'

import Org_edit from './components/Own/Org/Org_edit/Org_edit.vue'
import Org_edit_body from './components/Own/Org/Org_edit/Org_edit_body.vue'
import Org_edit_options from './components/Own/Org/Org_edit/Org_edit_options.vue'

import Reedit_body from './components/Own/Org/Reedit/Reedit_body.vue'
import Reedit from './components/Own/Org/Reedit/Reedit.vue'
import Reedit_options from './components/Own/Org/Reedit/Reedit_options.vue'

import Student_settings from './components/Own/Student/Student_settings/Student_settings.vue'
import Student_options from './components/Own/Student/Student_settings/Student_options.vue'
import Student_detail from './components/Own/Student/Student_settings/Student_detail.vue'
import Student_avator from './components/Own/Student/Student_settings/Student_avator.vue'
import Student_account from './components/Own/Student/Student_settings/Student_account.vue'
import Student_privacy_settings from './components/Own/Student/Student_settings/Student_privacy_settings.vue'
import Student_head_img from './components/Own/Student/Student_settings/Student_head_img.vue'

import Student_own from './components/Own/Student/Student_own.vue'
import Student_own_toolbar from './components/Own/Student/Student_own_toolbar.vue'
import Student_information from './components/Own/Student/Student_information.vue'
import Watch from './components/Own/Student/Watch.vue'
import Student_signup from './components/Own/Student/Student_signup.vue'
import Student_dynamic from './components/Own/Student/Student_dynamic.vue'
import Student_collect from './components/Own/Student/Student_collect.vue'
import Student_history_view from './components/Own/Student/Student_history_view.vue'
import Student_history_attend from './components/Own/Student/Student_history_attend.vue'
import Student_msg from './components/Own/Student/Student_msg.vue'


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
Vue.use(VueLazyload, {
  error: '/src/assets/error.png'
})
Vue.use(Vuex)

Vue.component("Visitor-toolbar",Visitor_toolbar)
Vue.component("Footer",Footer)
Vue.component("Carousel",Carousel)
Vue.component("Home-classify",Home_classify)
Vue.component("Recommend-Org",Recommend_Org)
Vue.component("Latest-actitivties",Latest_actitivties)
Vue.component("Org-rank",Org_rank)
Vue.component("Home",Home)
Vue.component("Student-toolbar",Student_toolbar)
Vue.component("Org-toolbar",Org_toolbar)
Vue.component("Activity-rank",Activity_rank)

Vue.component("Login",Login)
Vue.component("Register-firststep",Register_firststep)
Vue.component("Register-secondstep",Register_secondstep)
Vue.component("Register-thirdstep",Register_thirdstep)
Vue.component("Forgetpwd-firststep",Forgetpwd_firststep)
Vue.component("Forgetpwd-secondstep",Forgetpwd_secondstep)
Vue.component("Changephone-firststep",Changephone_firststep)
Vue.component("Changephone-secondstep",Changephone_secondstep)
Vue.component("Changeaccount",Changeaccount)
Vue.component("Law-explaination",Law_explaination)

Vue.component("Search",Search)
Vue.component("Search-classify",Search_classify)
Vue.component("Search-result",Search_result)

Vue.component("Preview-toolbar",Preview_toolbar)
Vue.component("Activity-preview",Activity_preview)
Vue.component("Preview-body",Preview_body)

Vue.component("Activity",Activity)
Vue.component("Activity-toolbar",Activity_toolbar)
Vue.component("Related",Related)
Vue.component("Activity-body",Activity_body)

Vue.component("Student-display",Student_display)
Vue.component("Student-display-toolbar",Student_display_toolbar)
Vue.component("Org-display",Org_display)
Vue.component("Org-dynamic",Org_dynamic)
Vue.component("Org-display-toolbar", Org_display_toolbar)

Vue.component("Visitors",Visitors)
Vue.component("Activities",Activities)
Vue.component("Org-abstract",Org_abstract)
Vue.component("Org-create-activity",Org_create_activity)
Vue.component("Org-draft",Org_draft)
Vue.component("Org-information",Org_information)
Vue.component("Org-msg",Org_msg)
Vue.component("Org-my-activities",Org_my_activities)
Vue.component("Org-own-toolbar",Org_own_toolbar)
Vue.component("Org-own",Org_own)
Vue.component("Org-signup",Org_signup)

Vue.component("Create-activity",Create_activity)
Vue.component("Create-body",Create_body)
Vue.component("Create-options",Create_options)

Vue.component("Org-edit",Org_edit)
Vue.component("Org-edit-body",Org_edit_body)
Vue.component("Org-edit-options",Org_edit_options)

Vue.component("Reedit-body",Reedit_body)
Vue.component("Reedit",Reedit)
Vue.component("Reedit-options",Reedit_options)

Vue.component("Student-settings",Student_settings)
Vue.component("Student-options",Student_options)
Vue.component("Student-detail",Student_detail)
Vue.component("Student-avator",Student_avator)
Vue.component("Student-account",Student_account)
Vue.component("Student-privacy-settings",Student_privacy_settings)
Vue.component("Student-head-img",Student_head_img)

Vue.component("Student-own",Student_own)
Vue.component("Student-own-toolbar",Student_own_toolbar)
Vue.component("Student-information",Student_information)
Vue.component("Watch",Watch)
Vue.component("Student-signup",Student_signup)
Vue.component("Student-dynamic",Student_dynamic)
Vue.component("Student-collect",Student_collect)
Vue.component("Student-history-view",Student_history_view)
Vue.component("Student-history-attend",Student_history_attend)
Vue.component("Student-msg",Student_msg)

const routes = [
  { path: '/', component: Home},
  { path: '/login', component: Login },
  { path: '/register_firststep', component: Register_firststep },
  { path: '/register_secondstep', component: Register_secondstep },
  { path: '/register_thirdstep', component: Register_thirdstep },
  { path: '/forgetpwd_firststep', component: Forgetpwd_firststep },
  { path: '/forgetpwd_secondstep', component: Forgetpwd_secondstep },
  { path: '/changephone_firststep', component: Changephone_firststep },
  { path: '/changephone_secondstep', component: Changephone_secondstep },
  { path: '/search/:target/:time/:type/:interest/:opt/:content', component: Search,name:'search',props:true},
  { path: '/changeaccount', component: Changeaccount },
  { path: '/student_own/:opt', component: Student_own,name:'student_own',props: true},
  { path: '/org_own/:opt', component: Org_own,name:'org_own',props: true},
  { path: '/activity/:opt', component: Activity,name:'activity',props: true },
  { path: '/student_display/:opt/:stu_id', component: Student_display,name:'student_display',props: true},
  { path: '/org_display/:opt/:org_id', component: Org_display,name:'org_display',props: true},
  { path: '/student_settings/:opt', component: Student_settings,name:'student_settings',props:true},
  { path: '/create_activity', component: Create_activity},
  { path: '/org_edit/:opt', component: Org_edit,name:'org_edit',props:true},
  { path: '/activity_preview', component: Activity_preview},
  { path: '/reedit/:opt', component: Reedit,name:'reedit',props:true},
]
const router = new VueRouter({
  mode: 'history',
  routes, // (缩写) 相当于 routes: routes
})
// router.beforeEach((to,from,next)=>{
  
//   next();
// })
Vue.prototype.GLOBAL = global_
axios.defaults.baseURL=global_.BASE_URL
Vue.prototype.$http = axios
// Vue.prototype.$http.interceptors.response.use(config => {
//   alert("1");
//   return config
// }, error => {
//   alert("2");
//   return Promise.reject(error)
// })
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

