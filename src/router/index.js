import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/location',
    name: 'Location',
    component: () => import('../components/Location/Location.vue')
  },    
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
