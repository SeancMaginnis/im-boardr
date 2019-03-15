import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from 'bootstrap'
import 'material-design-icons/iconfont/material-icons.css'
import 'typeface-roboto/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'



Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("authenticate");
  },
  render: h => h(App)
}).$mount('#app')
