import Vue from 'vue'
import Router from 'vue-router'

import QuestionList from './views/QuestionList'
import QuestionDetail from './views/QuestionDetail'
import Register from './views/Register'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import CreateQuestion from './views/CreateQuestion'
import QuestionEdit from './views/QuestionEdit'
import auth from './helpers/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: QuestionList
    },
    {
      path: '/questions/:question_id',
      name: 'question-detail',
      component: QuestionDetail
    },
    {
      path: '/register',
      name: 'auth-register',
      component: Register
    },
    {
      path: '/login',
      name: 'auth-login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: QuestionList
        },
        {
          path: 'new-question',
          name: 'new-question',
          component: CreateQuestion
        },
        {
          path: '/questions/:question_id/edit',
          name: 'question-edit',
          component: QuestionEdit
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
