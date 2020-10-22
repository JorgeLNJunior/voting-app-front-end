<template>
  <div>
    <v-btn color="error" @click="logout()">Sair</v-btn>
  </div>
</template>

<script>

import Auth from '../../services/api/Auth'

export default {
  name: 'LogoutBtn',
  methods: {
    logout () {
      Auth.logout()
      this.$router.go(0)
    }
  }
}
</script>

<style>

</style>
