<template>
  <v-app>
    <AppBar></AppBar>
    <NavgationDrawer />
    <router-view></router-view>
  </v-app>
</template>

<script>

import AppBar from './components/AppBar'
import NavgationDrawer from './components/NavgationDrawer'

export default {
  name: 'App',
  components: {
    AppBar,
    NavgationDrawer
  },
  data: () => ({
    //
  })
}
</script>
