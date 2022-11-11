import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'login',
    meta:{ layout: 'empty'},
    component:()=> import('../views/V-Login.vue')
  },
  {
    path:'/categories',
    name:'categories',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Categories.vue')
  },
  {
    path:'/register',
    name:'register',
    meta:{ layout: 'empty'},
    component:()=> import('../views/V-Register.vue')
  },
  {
    path:'/record',
    name:'record',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Record.vue')
  },
  {
    path:'/profile',
    name:'profile',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Profile.vue')
  },
  {
    path:'/planning',
    name:'planning',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Planning.vue')
  },
  {
    path:'/',
    name:'home',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Home.vue')
  },
  {
    path:'/history',
    name:'history',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-History.vue')
  },
  {
    path:'/detail-record',
    name:'detail-record',
    meta:{ layout: 'main'},
    component:()=> import('../views/V-Detail-record.vue')
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

