import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuickSortView from '@/views/QuickSortView.vue'
import DijkstraView from '@/views/DijkstraView.vue'
import HanoiView from '@/views/HanoiView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/quick-sort', name: 'quick-sort', component: QuickSortView },
  { path: '/dijkstra', name: 'dijkstra', component: DijkstraView },
  { path: '/hanoi', name: 'hanoi', component: HanoiView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
