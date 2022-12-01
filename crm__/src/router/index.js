import { createRouter, createWebHistory } from 'vue-router';
import {getAuth} from 'firebase/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/V-Login.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Categories.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/V-Register.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Record.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Profile.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Planning.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Home.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-History.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/V-Detail-record.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next)=> {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  }
  else{
    next()
  }
})
export default router

