<template>
  <v-card shaped>
    <v-card-title>Criar Conta</v-card-title>
    <v-card-text>
      <v-row no-gutters justify="center">
        <v-col cols="6">
          <v-form ref="form" lazy-validation v-model="states.valid">
            <v-text-field label="Nome" prepend-icon="account_box" v-model="user.name"
              :rules="[rules.name.required, rules.name.max]">
            </v-text-field>
            <v-text-field label="Email" prepend-icon="email" type="email"
              v-model="user.email" :rules="[rules.email.required, rules.email.max, rules.email.email]">
            </v-text-field>
            <v-text-field label="Senha" prepend-icon="lock" type="password"
              v-model="user.password" :rules="[rules.password.required, rules.password.min, rules.password.max]">
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center" no-gutters>
        <v-col cols="3">
          <v-btn class="mb-5" color="primary" right @click="register()" :loading="states.registerBtnLoad" :disabled="!states.valid">Criar Conta</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

import Auth from '../../services/api/Auth'

export default {
  name: 'RegisterCard',
  data: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    },
    states: {
      registerBtnLoad: false,
      valid: true
    },
    rules: {
      name: {
        required: value => !!value || 'Obrigatório',
        max: value => value.length <= 50 || 'Deve ter no máximo de 40 caracteres'
      },
      email: {
        required: value => !!value || 'Obrigatório',
        max: value => value.length <= 50 || 'Deve ter no máximo de 50 caracteres',
        email: value => {
          const patern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return patern.test(value) || 'Email inválido'
        }
      },
      password: {
        required: value => !!value || 'Obrigatório',
        min: value => value.length >= 6 || 'Deve ter no mínimo 6 caracteres',
        max: value => value.length <= 20 || 'Deve ter no máximo 20 caracteres'
      }
    }
  }),
  methods: {
    register () {
      if (!this.$refs.form.validate()) {
        return false
      }
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

<style>

</style>
