import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import Manager from './pages/Manager.vue';
import Drafter from './pages/Drafter.vue';

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '', component: Drafter },
      { path: '/manager', component: Manager }
    ]
  })
}).$mount('#app');
