// router.js
import { createRouter, createWebHistory } from 'vue-router'; // Import specific functions
import AppHome from './components/AppHome.vue';
import AppAbout from './components/AppAbout.vue';
import KakapoApp from './components/KakapoApp.vue';

const routes = [
  { path: '/', component: AppHome },
  { path: '/about', component: AppAbout },
  { path: '/kakapo', component: KakapoApp, name: 'kakapo'},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
