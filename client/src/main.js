// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import 'vuetify/dist/vuetify.min.css';
import store from '@/store/store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.filter('formatDate', value => (value ? moment(String(value)).format('DD/MM/YYYY') : ''));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
