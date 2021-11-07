import Vue from 'vue'
import Router from 'vue-router'
import index from "~/pages/index";
import login from "~/pages/auth/login";
import register from "~/pages/auth/register";
import verify from "~/pages/auth/verify";
import resend from "~/pages/auth/resend-verify-email";
import reset from "~/pages/password/reset-password";
import resetEmail from "~/pages/password/reset-email-password";
import create from "~/pages/user/designs/create";
import edit from "~/pages/user/designs/edit";
import profile from "~/pages/user/setting/profile";
import IndexDashboard from "~/pages/user/setting/index";
import password from "~/pages/user/setting/password";
import design from "~/pages/user/setting/design";
import Search from "~/pages/user/designs/Search";
import detail from "~/pages/user/designs/detail";

Vue.use(Router)
const routes = [
  {
    path:'/',
    name:'home',
    component:index
  },
  {
    path:'/login',
    name:'login',
    component:login
  },
  {
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/verification/verify/:id',
    name:'email.verify',
    component:verify
  },
  {
    path:'/verification/email/resend',
    name:'email.verify.resend',
    component:resend
  },
  {
    path:'/password/reset',
    name:'password.reset',
    component:reset
  },
  {
    path:'/password/email/reset-pass',
    name:'password.email',
    component:resetEmail
  },
  {
    path:'/user/designs/upload',
    name:'user.design.upload',
    component:create
  },
  {
    path:'/user/designs/edit/:id',
    name:'user.design.edit',
    component:edit
  },
  {
    path:'/settings',
    name:'setting',
    component:IndexDashboard,
    children:[
      {
        path: 'profile',
        name: 'setting.profile',
        component: profile
      },
      {
        path: 'password',
        name: 'setting.password',
        component: password
      },
      {
        path: 'design',
        name: 'setting.designs',
        component: design
      }
    ]
  },
  {
    path:'/designs',
    name:'designs.search',
    component:Search
  },
  {
    path:'/designs/:slug',
    name:'designs.detail',
    component:detail
  }

];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}
