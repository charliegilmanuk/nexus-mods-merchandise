import Vue from 'vue';
import './plugins/vuetify';
import App from './App';
import router from './router';
import store from './store';
import helpers from './mixins/helpers';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

Vue.mixin(helpers);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
