import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  Home = 'home',
  Products = 'products',
  Posters = 'posters',
  BusinessCards = 'businesscards',
  Flyers = 'flyers'
}

export const routePathMap: Record<RouteNames, string> = {
  [RouteNames.Home]: '/',
  [RouteNames.Products]: '/products',
  [RouteNames.Posters]: 'posters',
  [RouteNames.Flyers]: 'flyers',
  [RouteNames.BusinessCards]: 'businesscards'
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routePathMap.home,
      name: RouteNames.Home,
      redirect: routePathMap.products,
    },
    {
      path: routePathMap.products,
      name: RouteNames.Products,
      component: () => import('../views/Products.vue'),
      children: [
        {
          path: routePathMap.flyers,
          name: RouteNames.Flyers,
          component: () => import('../views/Flyers.vue')
        },
        {
          path: routePathMap.posters,
          name: RouteNames.Posters,
          component: () => import('../views/Posters.vue')
        },
        {
          path: routePathMap.businesscards,
          name: RouteNames.BusinessCards,
          component: () => import('../views/BusinessCards.vue')
        }
      ]
    }
  ]
});
