import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

import tooltipDirective from '@/directives/tooltip.directive'
import Loader from '@/components/app/Loader'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import 'materialize-css/dist/js/materialize.min'
import VueMeta from 'vue-meta'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.config.productionTip = false
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)

Vue.directive('tooltip', tooltipDirective)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)


firebase.initializeApp({
  apiKey: "AIzaSyDHnAkcbdGvcGsRWW-nE6cZ2waWXt3FUB4",
  authDomain: "vue-test-crm-4aecd.firebaseapp.com",
  projectId: "vue-test-crm-4aecd",
  storageBucket: "vue-test-crm-4aecd.appspot.com",
  messagingSenderId: "609592053175",
  appId: "1:609592053175:web:90a679a066a2821c54ac32",
  measurementId: "G-X0ENFB4T2Q"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  
})

