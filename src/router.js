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
      redirect: { name: 'shop' },
      children: [
        {
          name: 'product',
          path: ':id',
          component: require('~/views/SingleProduct').default
        }
      ]
    }
  ]
});
