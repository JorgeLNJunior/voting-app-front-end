<template>
  <v-app-bar app color="transparent" flat hide-on-scroll>
    <h1 class="ml-2">VotingApp</h1>
    <h1></h1>
    <v-spacer></v-spacer>
    <v-btn class="mr-4 hidden-sm-and-down" outlined>Entrar</v-btn>
    <RegisterDialog />
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
    formActive: false
  })
}
</script>

<style>

</style>
