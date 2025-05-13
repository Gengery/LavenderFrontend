import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegisterPage from '@/views/Unauthorized/RegisterPage.vue'
import BookingPage from '@/views/Unauthorized/BookingPage.vue'
import LoginPage from '@/views/Unauthorized/LoginPage.vue'
import AdminReservationsPage from '@/views/Admin/AdminReservationsPage.vue'
import AdminReviewsPage from '@/views/Admin/AdminReviewsPage.vue'
import LayoutRowUnauthorized from '@/components/layouts/LayoutRowUnauthorized.vue'
import HomePage from '@/views/Unauthorized/HomePage.vue'
import LayoutRowAdmin from '@/components/layouts/LayoutRowAdmin.vue'
import LayoutForMenuAdmin from '@/components/layouts/LayoutForMenuAdmin.vue'
import AdminMenuTags from '@/views/Admin/AdminMenuTags.vue'
import PositionViewPage from '@/views/Menu/PositionViewPage.vue'
import MenuPositionAddingPage from '@/views/Admin/MenuPositionAddingPage.vue'
import MenuPositionsPage from '@/views/Common/MenuPositionsPage.vue'
import LayoutRowCustomer from '@/components/layouts/LayoutRowCustomer.vue'
import MyReservationsPage from '@/views/Authorized/MyReservationsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomePage",
    component: LayoutRowUnauthorized,
    children: [
      {
        path: '/',
        component: HomePage
      },
      {
        path: "/menu",
        component: MenuPositionsPage
      },
      {
        path: '/position/:positionId',
        name: 'UnauthorizedPosition',
        component: PositionViewPage,
        props: true
      },
      {
        path: "/register",
        name: "RegisterPage",
        component: RegisterPage
      },
      {
        path: "/reservation",
        name: "BookingPage",
        component: BookingPage
      },
      {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
      }
    ]
  },
  {
    path: "/admin",
    component: LayoutRowAdmin,
    children: [
      {
        path: "reservations",
        name: "AdminReservationsPage",
        component: AdminReservationsPage
      },
      {
        path: "reviews",
        name: "AdminReviewsPage",
        component: AdminReviewsPage
      },
      {
        path: "menu",
        name: "AdminMenuPage",
        component: LayoutForMenuAdmin,
        children: [
          {
            path: 'positions',
            name: 'AdminMenuPositionsPage',
            component: MenuPositionsPage
          },
          {
            path: 'tags',
            name: 'AdminMenuTags',
            component: AdminMenuTags
          },
          {
            path: 'position/:positionId',
            name: 'AdminMenuPositionPage',
            component: PositionViewPage,
            props: true 
          },
          {
            path: 'positions/:chapterId/add',
            name: 'PositionAddingPage',
            component: MenuPositionAddingPage,
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/customer',
    component: LayoutRowCustomer,
    children:[
      {
        path: 'menu',
        component: MenuPositionsPage
      },
      {
        path: 'reservation',
        component: BookingPage
      },
      {
        path: 'my-reservations',
        component: MyReservationsPage
      },
      {
        path: 'position/:positionId',
        component: PositionViewPage,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
