<template>
  <v-app-bar app color="transparent" flat hide-on-scroll>
    <v-app-bar-nav-icon @click="$store.navigationDrawer = !$store.navigationDrawer"></v-app-bar-nav-icon>
    <h1 class="ml-2">VotingApp</h1>
    <h1></h1>
    <v-spacer></v-spacer>
    <LoginDialog class="mr-4 hidden-sm-and-down"/>
    <RegisterDialog class="hidden-sm-and-down" />
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
    //
  })
}
</script>

<style>

</style>
