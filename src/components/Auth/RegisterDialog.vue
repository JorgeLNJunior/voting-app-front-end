<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="hidden-sm-and-down" color="primary" v-bind="attrs" v-on="on">
        Criar uma conta
      </v-btn>
    </template>
    <RegisterCard />
  </v-dialog>
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
