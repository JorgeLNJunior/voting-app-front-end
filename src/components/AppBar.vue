<template>
  <v-app-bar app color="transparent" flat hide-on-scroll>
    <v-app-bar-nav-icon @click="$store.navigationDrawer = !$store.navigationDrawer"></v-app-bar-nav-icon>
    <h1 class="ml-2">VotingApp</h1>
    <h1></h1>
    <v-spacer></v-spacer>
    <LoginDialog class="mr-4 hidden-sm-and-down" v-if="!isLoged" />
    <RegisterDialog class="hidden-sm-and-down" v-if="!isLoged" />
  </v-app-bar>
</template>

<script>

import RegisterDialog from './Auth/RegisterDialog'
import LoginDialog from './Auth/LoginDialog'

export default {
  name: 'AppBar',
  components: {
    RegisterDialog,
    LoginDialog
  },
  data: () => ({
    isLoged: false
  }),
  created () {
    if (!localStorage.getItem('AUTH_TOKEN')) {
      this.isLoged = false
      return
    }
    this.isLoged = true
  }
}
</script>

<style>

</style>
