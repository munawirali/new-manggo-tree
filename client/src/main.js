// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import firebaseDB from 'firebase'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBJ_uOv1Q6Wk9LMnMFsh7tgRtTvp7cTa2E',
  authDomain: 'new-manggo-tree.firebaseapp.com',
  databaseURL: 'https://new-manggo-tree.firebaseio.com',
  projectId: 'new-manggo-tree',
  storageBucket: 'new-manggo-tree.appspot.com',
  messagingSenderId: '426419023879'
}

Vue.prototype.$db = firebaseDB.initializeApp(config).database().ref('new_manggo_tree')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
