import Vue from 'vue'
import App from './App'
import store from './store/index.js'
// import './pages/apis/index.js'

Vue.config.productionTip = false
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
