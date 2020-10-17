<template>
  <div>
    <v-dialog width="600" origin="top" overlay-opacity="0.6">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        Criar conta
      </v-btn>
    </template>
    <RegisterCard />
  </v-dialog>
  </div>
</template>

<script>

import RegisterCard from './RegisterCard'

export default {
  name: 'RegisterDialog',
  components: {
    RegisterCard
  },
  data: () => ({ }),
  props: {
    isActive: Boolean
  }
}
</script>
