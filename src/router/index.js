// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import RecommendationPage from '@/views/RecommendationPage.vue'
import CiudadPage from '@/views/CiudadPage.vue'
import LugarPage from '@/views/LugarPage.vue'
import { slugify } from '@/utils/utils.js'
import CarpetaPage from '@/views/CarpetaPage.vue'



const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/recommendations', name: 'Recommendations', component: RecommendationPage },
  { path: '/ciudad/:nombre', name: 'CiudadPage', component: CiudadPage },
  { path: '/ciudad/:nombre/lugar/:nombre_lugar', name: 'LugarPage', component: LugarPage },
  { path: '/carpeta/:nombre/', name: 'CarpetaPage', component: CarpetaPage },
  { path: '/carpeta/:nombre/lugar/:nombre_lugar', name: 'LugarPageCarpeta', component: LugarPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Global before guard to apply slugify to route params
router.beforeEach((to, from, next) => {
  // Transform all route params using slugify
  if (to.params) {
    for (const key in to.params) {
      if (to.params[key]) {
        to.params[key] = slugify(to.params[key]);
      }
    }
  }
  next();
});

export default router
