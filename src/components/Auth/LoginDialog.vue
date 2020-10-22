<template>
  <div>
    <v-dialog width="600" origin="top" overlay-opacity="0.6">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined v-bind="attrs" v-on="on">
        Entrar
      </v-btn>
    </template>
    <LoginCard />
  </v-dialog>
  </div>
</template>

<script>

import LoginCard from './LoginCard'

export default {
  name: 'RegisterDialog',
  components: {
    LoginCard
  },
  data: () => ({
    //
  })
}
</script>
