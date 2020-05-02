import Vue from 'vue'
import VueRouter from 'vue-router';

import App from './App.vue'
import Drafter from './pages/Drafter.vue';
import Hero from './pages/Hero.vue';
import Manager from './pages/Manager.vue';
import Map from './pages/Map.vue';
import Role from './pages/Role.vue';

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
      { path: '/manager/map', component: Map },
      { path: '/manager/map/:id', component: Map },
      { path: '/manager/role', component: Role },
      { path: '/manager/role/:id', component: Role },
    ]
  })
}).$mount('#app');
