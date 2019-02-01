import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
      component: require('~/views/admin/Products').default
    },
    {
      name: 'admin.products.create',
      path: '/admin/products/create',
      component: require('~/views/admin/Product').default
    },
    {
      name: 'admin.products.edit',
      path: '/admin/products/:id',
      component: require('~/views/admin/Product').default
    }
  ]
});
