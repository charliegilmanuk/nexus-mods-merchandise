import Vue from 'vue';
import Router from 'vue-router';
import helpers from '~/mixins/helpers';

Vue.use(Router);

const router = new Router({
  // export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'shop' }
    },
    {
      name: 'shop',
      path: '/shop',
      component: require('~/views/Shop').default,
      meta: {
        title: 'Shop'
      }
    },
    {
      path: '/products',
      redirect: { name: 'shop' }
    },
    {
      name: 'product',
      path: '/products/:id',
      component: require('~/views/SingleProduct').default
    },
    {
      name: 'admin',
      path: '/admin',
      redirect: { name: 'admin.products' }
    },
    {
      name: 'admin.products',
      path: '/admin/products',
      component: require('~/views/admin/Products').default,
      meta: {
        title: 'Products Admin'
      },
      children: [
        {
          name: 'admin.products.create',
          path: 'create',
          component: require('~/views/admin/Product').default,
          meta: {
            title: 'New Product'
          }
        },
        {
          name: 'admin.products.edit',
          path: ':id',
          component: require('~/views/admin/Product').default,
          meta: {
            title: 'Edit Product'
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.title)) {
    helpers.methods.appTitle(to.meta.title);
  }
  next();
});

export default router;
