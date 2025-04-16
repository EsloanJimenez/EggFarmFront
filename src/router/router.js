import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/Orders.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/Inventory.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/Products.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('../views/Customers.vue'),
      meta: {
        requiresAuth: true,
        roleId: 2
      }
    }, {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresAuth) && !token)
    next({ path: '/' });
  else if (token && (to.path === '/'))
    next({ path: '/orders' });
  else if (to.meta.role && to.meta.role !== userRole)
    next('/orders');
  else
    next();
});

export default router