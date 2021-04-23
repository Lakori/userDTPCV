// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router/index'
import Vuelidate from 'vuelidate'
import VueMask from 'v-mask'
import { baseUrl } from './configAnalyzer/index.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import Loading from 'vue-loading-overlay';

import 'vue-loading-overlay/dist/vue-loading.css';




// todo
// cssVars()
Vue.use(Loading);
Vue.use(VueSweetalert2);
const BASE_URL = baseUrl();
Vue.prototype.$BASE_URL = BASE_URL;
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueMask);
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
