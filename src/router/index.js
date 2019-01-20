import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Schedule from '@/components/Schedule'
import Addcourse from '@/components/Addcourse'
import Studyarea from '@/components/Studyarea'
import Credits from '@/components/Credits'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/schedule/addcourse',
      name: 'addcourse',
      component: Addcourse
    },
    {
      path: '/studyarea',
      name: 'studyarea',
      component: Studyarea
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    }
  ]
})
