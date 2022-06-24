import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import App from '@/App.vue'
import {message} from "ant-design-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: App,
    children: [
      {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {title: '登陆-WPS账号'}
      },
      {
        name: 'register',
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        meta: {title: '注册-WPS账号'}
      },
      {
        name: 'form-list',
        path: '/form-list',
        component: () => import('@/views/form-list/index.vue'),
        meta: {title: '金山表单'}
      },
      {
        name: 'new-form-create',
        path: '/new-form-create',
        component: () => import('@/views/new-form-create/index.vue'),
        meta: {title: '金山表单'},
        children: [
          {
            name: 'preview',
            path: 'preview',
            component: () => import("@/views/new-form-create/PreviewCom/index.vue"),
            meta: {title: '金山表单'},
          },
          {
            name: 'edit',
            path: 'edit',
            component: () => import("@/views/new-form-create/EditForm/index.vue"),
            meta: {title: '金山表单'},
          },
        ]
      },
      {
        name: 'exam-result',
        path: '/exam-result',
        component: () => import("@/views/exam-result/index.vue"),
        meta: {title: '表单结果'},
        children: [
          {
            name: 'detail',
            path: 'detail/:id',
            component: () => import("@/views/exam-result/ExamResultDetailCom/index.vue"),
            meta: {title: '表单结果'},
          },
          {
            name: 'problem',
            path: 'problem/:id',
            component: () => import('@/views/exam-result/ExamResultProblemCom.vue'),
            meta: {title: '表单结果'},
          },
          {
            name: 'share',
            path: 'share/:id',
            component: () => import('@/views/exam-result/ExamResultShareCom.vue'),
            meta: {title: '表单结果'},
          }
        ]
      },
      {
        name: 'write',
        path: '/write/:id',
        component: () => import('@/views/write/index.vue'),
        meta: {title: '填写表单'},
      },
      {
        name: 'user-center',
        path: '/user-center',
        component: () => import('@/views/user-center/index.vue'),
        meta: {title: '个人中心'}
      },
      {
        name: 'success',
        path: '/success/:id',
        component: () => import("@/views/write/success/index.vue"),
        meta: {title: '填写表单'},
      },
      {
        path: '/',
        redirect: '/form-list',
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'write' && to.name !== 'success') {
    window.document.title = to.meta.title as string
    const isLogin = sessionStorage.isLogin
    const {name} = to
    const isLoginOrRegister = (name === 'login' || name === 'register')
    if (!isLogin && !isLoginOrRegister) {
      message.warn('请先登陆！')
      next({name: 'login'})
    }
  }
  next()
})

export default router
