import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

//Pages
const Page404 = () => import('@/views/customPages/Page404')
const Page500 = () => import('@/views/customPages/Page500')
const Login = () => import('@/views/customPages/Login')
const Register = () => import('@/views/customPages/Register')
const Home = () => import('@/views/customPages/Home')
const UserProfile = () => import('@/views/customPages/UserProfile')
const Subscribes = () => import('@/views/customPages/Subscribes')
const Confirm = () => import('@/views/customPages/Confirm')
const CreateCustomer = () => import('@/views/customPages/CreateCustomer')


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect:'/login',
      name: '',
      component: DefaultContainer,
      children: [
        {
          path: 'home',
          name: 'Главная',
          component: Home
        },
        {
          path: 'profile',
          name: 'Профиль',
          component: UserProfile,
        },
        {
          path: 'subscribes',
          name: 'Подписки',
          component: Subscribes,
        },
      ]
    },
    {
      path: '/createCustomer',
      name: 'CreateCustomer',
      component: CreateCustomer,

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
  ]
})
