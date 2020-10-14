<template>
  <v-dialog width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="hidden-sm-and-down" color="primary" v-bind="attrs" v-on="on">
        Criar uma conta
      </v-btn>
    </template>
    <v-card shaped>
      <v-card-title>Criar Conta</v-card-title>
      <v-card-text>
        <v-row no-gutters justify="center">
          <v-col cols="6">
            <v-text-field label="Nome" prepend-icon="account_box" v-model="user.name"></v-text-field>
            <v-text-field label="Email" prepend-icon="email" type="email" v-model="user.email"></v-text-field>
            <v-text-field label="Senha" prepend-icon="lock" type="password" v-model="user.password"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-row justify="center" no-gutters>
          <v-col cols="3">
            <v-btn color="primary" right @click="register()" :loading="states.registerBtnLoad">Criar Conta</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import Auth from '../../services/api/Auth'

export default {
  name: 'RegisterDialog',
  data: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    },
    states: {
      registerBtnLoad: false
    }
  }),
  props: {
    isActive: Boolean
  },
  methods: {
    register () {
      this.states.registerBtnLoad = true
      Auth.register(this.user)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.states.registerBtnLoad = false
        })
    }
  }
}
</script>
