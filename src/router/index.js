import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const VALID_CATEGORIES = ['matematika', 'ingatan', 'pengetahuan-alam', 'alam', 'pengetahuan-sosial', 'sosial']

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/kuis/:category',
    name: 'quiz',
    component: () => import('@/views/QuizView.vue'),
    props: true,
    beforeEnter: (to, from, next) => {
      const cat = to.params.category ? to.params.category.toLowerCase() : ''
      if (VALID_CATEGORIES.includes(cat)) {
        next()
      } else {
        next({ name: 'home' })
      }
    }
  },
  {
    path: '/hasil',
    name: 'result',
    component: () => import('@/views/ResultView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router

