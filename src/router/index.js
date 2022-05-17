import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Todos from '@/components/Todos'
import Todo from '@/components/Todo'

Vue.use(Router)

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
  routes: [
    {
      path: '/',
      name: 'Todos',
      component: Todos
    },
    {
      path: '/todo/:id',
      name: 'Todo',
      component: Todo
    }
  ]
})
