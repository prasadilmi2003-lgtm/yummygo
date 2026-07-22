import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import SpecialOffersView from '../views/SpecialOffersView.vue'
import TodayOffersView from '../views/TodayOffersView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import TrackOrderView from '../views/TrackOrderView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/browse-menu',
      name: 'BrowseMenu',
      component: MenuView,
    },
    {
      path: '/today-offers',
      name: 'TodayOffers',
      component: TodayOffersView,
    },
    {
      path: '/special-offers',
      name: 'SpecialOffers',
      component: SpecialOffersView,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: CheckoutView,
    },
    {
      path: '/track-order',
      name: 'TrackOrder',
      component: TrackOrderView,
    },
  ],
})

export default router