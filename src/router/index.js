import { createRouter, createWebHistory } from 'vue-router'
// Если alias @ не настроен — используй относительный путь:
// import HomePage from '../pages/HomePage.vue'


const routes = [
//   { path: '/', name: 'home', component: HomePage },
  { path: '/contacts', name: 'contacts', component: () => import('@/pages/Contacts.vue') },
  { path: '/services', name: 'services', component: () => import('@/pages/Services.vue') },
  { path: '/portfolio', name: 'portfolio', component: () => import('@/pages/Portfolio.vue') },
  { path: '/albums', name: 'albums', component: () => import('@/pages/Albums.vue') },
  
{ path: '/albums/:id', name: 'grid', component: () => import('@/pages/Grid.vue'), props: true },

]

const router = createRouter({
  history: createWebHistory(), // history-режим
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
