import Vue from 'vue'
import App from './App.vue'
import ellipsis from './ellipsis.vue';

Vue.component(ellipsis.name, ellipsis);

new Vue({
  el: '#app',
  render: h => h(App)
})
