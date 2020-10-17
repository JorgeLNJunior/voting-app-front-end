import Vue from 'vue'

const store = Vue.observable({
  navigationDrawer: false
})

Vue.prototype.$store = store

export default store
