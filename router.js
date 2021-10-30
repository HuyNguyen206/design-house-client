import Vue from 'vue'
import Router from 'vue-router'
import index from "~/pages/index";
import login from "~/pages/auth/login";
import register from "~/pages/auth/register";
import verify from "~/pages/auth/verify";
import resend from "~/pages/auth/resend-verify-email";
import reset from "~/pages/password/reset-password";
import resetEmail from "~/pages/password/reset-email-password";

Vue.use(Router)
const routes = [
  {
    path:'/',
    name:'index',
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
  }
];

export function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}