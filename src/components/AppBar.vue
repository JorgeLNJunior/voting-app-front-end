<template>
  <v-app-bar app color="transparent" flat hide-on-scroll>
    <v-app-bar-nav-icon @click="$store.navigationDrawer = !$store.navigationDrawer"></v-app-bar-nav-icon>
    <h1 class="ml-2">VotingApp</h1>
    <h1></h1>
    <v-spacer></v-spacer>
    <v-btn class="mr-4 hidden-sm-and-down" outlined @click="logStore()">Entrar</v-btn>
    <RegisterDialog class="hidden-sm-and-down" />
  </v-app-bar>
</template>

<script>

import RegisterDialog from './Auth/RegisterDialog'

export default {
  name: 'AppBar',
  components: {
    RegisterDialog
  },
  data: () => ({
    //
  })
}
</script>

<style>

</style>
