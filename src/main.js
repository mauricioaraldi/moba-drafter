import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import Manager from './pages/Manager.vue';
import Drafter from './pages/Drafter.vue';
import Hero from './pages/Hero.vue';

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router: new VueRouter({
    mode: 'history',
    routes: [
      { path: '', component: Drafter },
      { path: '/manager', component: Manager },
      { path: '/manager/hero', component: Hero },
      { path: '/manager/hero/:id', component: Hero },
    ]
  })
}).$mount('#app');
